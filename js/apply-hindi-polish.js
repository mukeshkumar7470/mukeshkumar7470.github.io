/**
 * Apply readable Hindi formatting to all interview Q&A sources.
 * Run: node js/apply-hindi-polish.js
 */
const fs = require("fs");
const path = require("path");
const { toReadableHindi } = require("./hindi-readable");

const sources = [
  path.join(__dirname, "deep-qa-content.js"),
  path.join(__dirname, "deep-qa-extra.js"),
];

function polishSource(filePath) {
  const fullPath = path.resolve(filePath);
  delete require.cache[fullPath];
  const categories = require(fullPath);
  let count = 0;

  categories.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.hi) {
        item.hi = toReadableHindi(item.hi, item.en);
        count += 1;
      }
    });
  });

  const banner = filePath.includes("content")
    ? "Deep interview answers — Java (readable Hindi)."
    : "Deep interview answers — Kotlin, Android, DSA, Senior Architecture.";

  const header =
    filePath.includes("content")
      ? `/**\n * ${banner}\n * Used by generate-interview-data.js\n */\nmodule.exports = `
      : `/**\n * ${banner}\n * Used by generate-interview-data.js\n */\nmodule.exports = `;

  const body = JSON.stringify(categories, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"');

  fs.writeFileSync(fullPath, header + body + ";\n", "utf8");
  return count;
}

let total = 0;
sources.forEach((src) => {
  total += polishSource(src);
  console.log("Polished", src);
});
console.log("Updated", total, "Hindi answers");
