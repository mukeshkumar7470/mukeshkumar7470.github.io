---
name: interview-qa-audit
description: >-
  Audits, deduplicates, and updates interview Q&A in mukeshkumar7470.github.io.
  Runs structure checks (What/Why/How), finds duplicate or overlapping questions,
  validates code formatting, and rebuilds interview-data.js. Use when the user
  asks to review interview answers, remove duplicates, verify content, update
  Q&A cards, or run the interview content agent.
---

# Interview Q&A Audit Agent

Edit **`js/interview-qa.js`** only (human-friendly template strings). Do not edit `js/interview-data.js`.

## Workflow

1. **Check first**
   ```bash
   node js/build-interview.js --check
   ```

2. **Fix duplicates** in `interview-qa.js` — merge overlapping cards, delete extras.

3. **Answer format**
   - `What?` / `Why?` / `How?` in both `en` and `hi`
   - Code in ` ```kotlin ` fences inside template strings
   - Roman Hindi tone for `hi`

4. **Build + validate**
   ```bash
   node js/build-interview.js --audit
   ```

5. **Update counts** in `interview.html` and `README.md` if total changed.

See `AGENTS.md` for the human manual-edit template.

Always run `--check` or `--audit` at the start and end of the task.
