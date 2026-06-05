/**
 * Interview Q&A build + check.
 *
 *   node js/build-interview.js          → regenerate interview-data.js
 *   node js/build-interview.js --check  → validate only (no rebuild)
 *   node js/build-interview.js --pretty → readable JSON output
 */
const fs = require("fs");
const path = require("path");
const { hasExplicitWwh } = require("./wwh-structure");

const ROOT = __dirname;
const SOURCE = "interview-qa.js";
const args = new Set(process.argv.slice(2));

function loadQa() {
  const full = path.join(ROOT, SOURCE);
  delete require.cache[full];
  return require(full);
}

function generateData() {
  const qa = loadQa();
  const pretty = args.has("--pretty");
  const json = pretty ? JSON.stringify(qa, null, 2) : JSON.stringify(qa);
  const out =
    "/* Generated — do not edit. Edit js/interview-qa.js then run: node js/build-interview.js */\n" +
    "const INTERVIEW_QA = " +
    json +
    ";\n";
  fs.writeFileSync(path.join(ROOT, "interview-data.js"), out, "utf8");
  const total = qa.reduce((s, c) => s + c.items.length, 0);
  const kb = (Buffer.byteLength(out, "utf8") / 1024).toFixed(1);
  console.log(`Built ${total} questions → interview-data.js (${kb} KB${pretty ? ", pretty" : ""})`);
  return total;
}

function normalizeTitle(q) {
  return String(q || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(q) {
  return new Set(
    normalizeTitle(q)
      .split(" ")
      .filter((w) => w.length > 2)
  );
}

function jaccard(a, b) {
  const A = tokenSet(a);
  const B = tokenSet(b);
  if (!A.size && !B.size) return 1;
  let inter = 0;
  A.forEach((w) => {
    if (B.has(w)) inter += 1;
  });
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}

function countFencePairs(text) {
  return (String(text || "").match(/```/g) || []).length;
}

function collectEntries(qa) {
  const entries = [];
  qa.forEach((cat) => {
    cat.items.forEach((item, index) => {
      entries.push({
        categoryId: cat.id,
        categoryLabel: cat.label,
        index,
        q: item.q,
        en: item.en || "",
        hi: item.hi || "",
        norm: normalizeTitle(item.q),
      });
    });
  });
  return entries;
}

function checkEntry(entry) {
  const issues = [];
  if (!entry.en.trim()) issues.push("missing-en");
  if (!entry.hi.trim()) issues.push("missing-hi");
  if (entry.en.trim() && !hasExplicitWwh(entry.en)) issues.push("en-no-wwh");
  if (entry.hi.trim() && !hasExplicitWwh(entry.hi)) issues.push("hi-no-wwh");
  if (countFencePairs(entry.en) % 2 !== 0) issues.push("en-unclosed-code-fence");
  if (countFencePairs(entry.hi) % 2 !== 0) issues.push("hi-unclosed-code-fence");
  return issues;
}

function runCheck(qa, generatedTotal) {
  const entries = collectEntries(qa);
  const exactDups = [];
  const byNorm = new Map();
  entries.forEach((e) => {
    if (!byNorm.has(e.norm)) byNorm.set(e.norm, []);
    byNorm.get(e.norm).push(e);
  });
  byNorm.forEach((list, norm) => {
    if (list.length > 1) exactDups.push({ norm, list });
  });

  const similar = [];
  for (let i = 0; i < entries.length; i += 1) {
    for (let j = i + 1; j < entries.length; j += 1) {
      const a = entries[i];
      const b = entries[j];
      if (a.norm === b.norm) continue;
      const score = jaccard(a.q, b.q);
      if (score >= 0.72) similar.push({ a, b, score });
    }
  }
  similar.sort((x, y) => y.score - x.score);

  const entryIssues = entries
    .map((e) => ({ entry: e, issues: checkEntry(e) }))
    .filter((x) => x.issues.length);

  console.log("\n=== Interview Q&A check ===\n");
  console.log(`Total questions: ${entries.length}`);
  console.log(`Source: ${SOURCE}`);

  const dataPath = path.join(ROOT, "interview-data.js");
  if (!fs.existsSync(dataPath)) {
    console.log("\n--- Build --- missing interview-data.js (run without --check)");
  } else if (generatedTotal != null && generatedTotal !== entries.length) {
    console.log(`\n--- Build --- count mismatch: source=${entries.length} generated=${generatedTotal}`);
  } else {
    console.log("\n--- Build --- OK");
  }

  if (exactDups.length) {
    console.log("\n--- Duplicate titles ---");
    exactDups.forEach(({ norm, list }) => {
      console.log(`  "${norm}"`);
      list.forEach((e) => console.log(`    - [${e.categoryLabel}] ${e.q}`));
    });
  } else {
    console.log("\n--- Duplicate titles --- none");
  }

  if (similar.length) {
    console.log("\n--- Similar titles (review) ---");
    similar.slice(0, 10).forEach(({ a, b, score }) => {
      console.log(`  ${(score * 100).toFixed(0)}%  [${a.categoryLabel}] "${a.q}"`);
      console.log(`       ↔ [${b.categoryLabel}] "${b.q}"`);
    });
  } else {
    console.log("\n--- Similar titles --- none");
  }

  if (entryIssues.length) {
    console.log("\n--- Issues ---");
    entryIssues.slice(0, 15).forEach(({ entry, issues }) => {
      console.log(`  [${entry.categoryLabel}] ${entry.q}: ${issues.join(", ")}`);
    });
  } else {
    console.log("\n--- Issues --- none");
  }

  const fail =
    exactDups.length ||
    entryIssues.some((x) =>
      x.issues.some((i) => i.includes("unclosed") || i.includes("missing-en") || i.includes("no-wwh"))
    );

  console.log(fail ? "\nResult: FAIL\n" : "\nResult: PASS\n");
  return fail ? 1 : 0;
}

if (args.has("--check")) {
  process.exit(runCheck(loadQa()));
}

const total = generateData();
if (args.has("--audit")) {
  process.exit(runCheck(loadQa(), total));
}
