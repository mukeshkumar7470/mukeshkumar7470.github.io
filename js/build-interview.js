/**
 * Interview content pipeline.
 *   node js/build-interview.js              → compact interview-data.js
 *   node js/build-interview.js --pretty     → readable JSON output
 *   node js/build-interview.js --normalize  → add What/Why/How headers to sources
 *   node js/build-interview.js --polish     → Hindi readability pass on sources
 */
const fs = require("fs");
const path = require("path");
const { normalizeAnswerText, hasExplicitWwh } = require("./wwh-structure");
const { toReadableHindi } = require("./hindi-readable");

const ROOT = __dirname;
const SOURCES = ["deep-qa-content.js", "deep-qa-extra.js", "deep-qa-behavioral.js"];
const args = new Set(process.argv.slice(2));

function sourcePath(name) {
  return path.join(ROOT, name);
}

function loadSource(name) {
  const full = sourcePath(name);
  delete require.cache[full];
  return require(full);
}

function writeSource(name, categories) {
  const banner = name.includes("content")
    ? "Java + OOP"
    : name.includes("behavioral")
      ? "Behavioral & HR (Infosys / mock)"
      : "Kotlin, Android, DSA, Senior Architecture";
  const header = `/**\n * Deep interview answers — ${banner}.\n * Edit then: node js/build-interview.js\n */\nmodule.exports = `;
  const body = JSON.stringify(categories, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"');
  fs.writeFileSync(sourcePath(name), header + body + ";\n", "utf8");
}

function normalizeSources() {
  let updated = 0;
  SOURCES.forEach((name) => {
    const categories = loadSource(name);
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        let changed = false;
        if (item.en && !hasExplicitWwh(item.en)) {
          const next = normalizeAnswerText(item.en);
          if (next !== item.en) {
            item.en = next;
            changed = true;
          }
        }
        if (item.hi && !hasExplicitWwh(item.hi)) {
          const next = normalizeAnswerText(item.hi);
          if (next !== item.hi) {
            item.hi = next;
            changed = true;
          }
        }
        if (changed) updated += 1;
      });
    });
    writeSource(name, categories);
    console.log("Normalized source:", name);
  });
  console.log("WWH normalize:", updated, "items updated");
}

function polishSources() {
  let count = 0;
  SOURCES.forEach((name) => {
    const categories = loadSource(name);
    categories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.hi) {
          item.hi = toReadableHindi(item.hi, item.en);
          count += 1;
        }
      });
    });
    writeSource(name, categories);
    console.log("Polished Hindi:", name);
  });
  console.log("Hindi polish:", count, "answers");
}

function generateData() {
  const qa = SOURCES.flatMap((name) => loadSource(name));
  const pretty = args.has("--pretty");
  const json = pretty ? JSON.stringify(qa, null, 2) : JSON.stringify(qa);
  const out =
    "/* Generated — do not edit. Run: node js/build-interview.js */\nconst INTERVIEW_QA = " +
    json +
    ";\n";
  const outPath = path.join(ROOT, "interview-data.js");
  fs.writeFileSync(outPath, out, "utf8");
  const total = qa.reduce((s, c) => s + c.items.length, 0);
  const kb = (Buffer.byteLength(out, "utf8") / 1024).toFixed(1);
  console.log(`Generated ${total} questions → interview-data.js (${kb} KB${pretty ? ", pretty" : ", compact"})`);
}

if (args.has("--normalize")) normalizeSources();
if (args.has("--polish")) polishSources();
generateData();
