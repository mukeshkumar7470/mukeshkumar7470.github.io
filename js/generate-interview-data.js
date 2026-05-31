const fs = require("fs");
const path = require("path");

const qa = [
  ...require("./deep-qa-content"),
  ...require("./deep-qa-extra"),
];

const out =
  "/* Interview Q&A — deep answers (Java, Kotlin, Android, DSA, Architecture) */\nconst INTERVIEW_QA = " +
  JSON.stringify(qa, null, 2) +
  ";\n";

fs.writeFileSync(path.join(__dirname, "interview-data.js"), out, "utf8");
const total = qa.reduce((s, c) => s + c.items.length, 0);
console.log("Generated", total, "questions with deep answers");
