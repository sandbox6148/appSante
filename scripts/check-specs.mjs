#!/usr/bin/env node
/**
 * check-specs — consistency checks on the specs/ folder (see docs/conventions.md).
 *
 * Checks:
 *  1. every relative Markdown link in the repo resolves to an existing file;
 *  2. every UC file has a valid front matter (id matches file name, allowed status, version);
 *  3. every UC file is listed in the catalogue with the same status;
 *  4. every UC with a status beyond `identifié` has a file;
 *  5. RG-/MSG-/T- identifiers inside a UC carry that UC's number and are unique;
 *  6. for UCs in status `livré`, every T-###-## has an automated test named after it
 *     (only when src/ or tests/ exist);
 *  7. ADR files are named ADR-###-*.md and declare a status.
 *
 * No dependencies. Exit code 1 when at least one error is found.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve, relative, sep } from "node:path";

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), "..");
const UC_DIR = join(ROOT, "specs", "use-cases");
const ADR_DIR = join(ROOT, "specs", "adr");
const CATALOGUE = join(UC_DIR, "catalogue.md");
const ALLOWED_STATUS = [
  "identifié",
  "en rédaction",
  "prêt",
  "en implémentation",
  "livré",
  "à synchroniser",
  "abandonné",
];
const IGNORED_DIRS = new Set(["node_modules", ".git", "dist", "coverage", "test-results", "playwright-report"]);

const errors = [];
const warnings = [];
const error = (file, msg) => errors.push(`${relative(ROOT, file)}: ${msg}`);
const warn = (file, msg) => warnings.push(`${relative(ROOT, file)}: ${msg}`);

function walk(dir, predicate, acc = []) {
  for (const entry of readdirSync(dir)) {
    if (IGNORED_DIRS.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, predicate, acc);
    else if (predicate(full)) acc.push(full);
  }
  return acc;
}

// ---------- 1. links ----------
function checkLinks() {
  const mdFiles = walk(ROOT, (f) => f.endsWith(".md"));
  const linkRe = /\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  for (const file of mdFiles) {
    const text = readFileSync(file, "utf8");
    for (const m of text.matchAll(linkRe)) {
      let target = m[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      target = target.split("#")[0];
      if (!target) continue;
      const path = resolve(dirname(file), decodeURI(target));
      if (!existsSync(path)) error(file, `broken link → ${m[1]}`);
    }
  }
}

// ---------- front matter ----------
function parseFrontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim();
  }
  return data;
}

// ---------- catalogue ----------
function parseCatalogue() {
  const rows = new Map();
  if (!existsSync(CATALOGUE)) {
    error(CATALOGUE, "catalogue not found");
    return rows;
  }
  const text = readFileSync(CATALOGUE, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\|\s*\*\*(UC-\d{3})\*\*\s*\|(.*)\|\s*$/);
    if (!m) continue;
    const cells = m[2].split("|").map((c) => c.trim());
    // columns after ID: titre, objectif, dépend de, complexité, priorité, statut
    const status = cells[cells.length - 1].replace(/`/g, "");
    if (rows.has(m[1])) error(CATALOGUE, `${m[1]} listed twice`);
    rows.set(m[1], { status, title: cells[0].replace(/\*\*/g, "") });
    if (!ALLOWED_STATUS.includes(status)) error(CATALOGUE, `${m[1]} has unknown status « ${status} »`);
  }
  if (rows.size === 0) error(CATALOGUE, "no UC row found (expected rows starting with | **UC-###** |)");
  return rows;
}

// ---------- UC files ----------
function checkUseCases(catalogue) {
  const ucFiles = existsSync(UC_DIR)
    ? readdirSync(UC_DIR).filter((f) => /^UC-\d{3}-.+\.md$/.test(f)).map((f) => join(UC_DIR, f))
    : [];
  const seen = new Set();
  const testIndex = buildTestIndex();

  for (const file of ucFiles) {
    const text = readFileSync(file, "utf8");
    const fileId = file.split(sep).pop().slice(0, 6);
    const fm = parseFrontMatter(text);
    if (!fm) {
      error(file, "missing front matter");
      continue;
    }
    if (fm.id !== fileId) error(file, `front matter id « ${fm.id} » ≠ file name « ${fileId} »`);
    if (!ALLOWED_STATUS.includes(fm.statut)) error(file, `unknown status « ${fm.statut} »`);
    if (!/^\d+\.\d+$/.test(fm.version ?? "")) error(file, `version « ${fm.version} » must look like 1.0`);
    if (!fm.titre) error(file, "missing titre");
    if (seen.has(fileId)) error(file, `duplicate UC file for ${fileId}`);
    seen.add(fileId);

    const row = catalogue.get(fileId);
    if (!row) error(file, `${fileId} is not in the catalogue`);
    else if (row.status !== fm.statut)
      error(file, `status « ${fm.statut} » ≠ catalogue « ${row.status} » — update both in the same commit`);

    const num = fileId.slice(3);
    for (const prefix of ["RG", "MSG", "T"]) {
      const re = new RegExp(`\\b${prefix}-(\\d{3})-(\\d{2})\\b`, "g");
      const ids = new Set();
      const bodyDefs = text.matchAll(new RegExp(`\\*\\*(${prefix}-\\d{3}-\\d{2})\\*\\*`, "g"));
      for (const d of bodyDefs) {
        if (ids.has(d[1])) error(file, `${d[1]} defined twice`);
        ids.add(d[1]);
      }
      for (const m of text.matchAll(re)) {
        if (prefix === "RG" && m[0].startsWith("RG-D")) continue;
        if (m[1] !== num) error(file, `${m[0]} carries another UC number (expected ${prefix}-${num}-xx)`);
      }
    }

    if (fm.statut === "livré" && testIndex !== null) {
      const tests = new Set([...text.matchAll(/\*\*(T-\d{3}-\d{2})\*\*/g)].map((m) => m[1]));
      for (const t of tests) {
        if (!testIndex.has(t)) error(file, `${t} has no automated test named after it (UC is « livré »)`);
      }
    }
  }

  for (const [id, row] of catalogue) {
    if (row.status !== "identifié" && !seen.has(id)) error(CATALOGUE, `${id} is « ${row.status} » but has no UC file`);
  }
}

function buildTestIndex() {
  const dirs = ["src", "tests"].map((d) => join(ROOT, d)).filter(existsSync);
  if (dirs.length === 0) return null;
  const index = new Set();
  for (const d of dirs) {
    for (const f of walk(d, (p) => /\.(test|spec)\.[cm]?[jt]sx?$/.test(p))) {
      for (const m of readFileSync(f, "utf8").matchAll(/T-\d{3}-\d{2}/g)) index.add(m[0]);
    }
  }
  return index;
}

// ---------- ADR ----------
function checkAdrs() {
  if (!existsSync(ADR_DIR)) return;
  for (const f of readdirSync(ADR_DIR)) {
    if (f.startsWith("_") || !f.endsWith(".md")) continue;
    const file = join(ADR_DIR, f);
    if (!/^ADR-\d{3}-.+\.md$/.test(f)) error(file, "ADR file must be named ADR-###-sujet.md");
    const text = readFileSync(file, "utf8");
    const st = text.match(/\|\s*\*\*Statut\*\*\s*\|\s*([^|]+)\|/);
    if (!st) error(file, "missing « Statut » row");
    else if (!/(proposé|accepté|remplacé|abandonné)/.test(st[1])) error(file, `unknown ADR status « ${st[1].trim()} »`);
    if (/proposé/.test(st?.[1] ?? "")) warn(file, "ADR still « proposé »");
  }
}

checkLinks();
const catalogue = parseCatalogue();
checkUseCases(catalogue);
checkAdrs();

for (const w of warnings) console.log(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);
console.log(`\ncheck-specs: ${catalogue.size} UC in catalogue, ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
