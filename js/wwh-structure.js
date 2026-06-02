/**
 * Shared What / Why / How parsing (Node build + browser interview page).
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.WwhStructure = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function splitParagraphs(text) {
    if (!text) return [];
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  function parseExplicitSections(text) {
    const parts = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
    const sections = { what: [], why: [], how: [] };
    let current = null;

    parts.forEach((part) => {
      const firstLine = part.split("\n")[0].trim();
      const body = part.includes("\n") ? part.slice(part.indexOf("\n") + 1).trim() : "";
      const inline = !body && part.length > 0;

      if (/^what\?$/i.test(firstLine)) {
        current = "what";
        const content = inline ? part.replace(/^what\?\s*/i, "").trim() : body;
        if (content) sections.what.push(content);
        return;
      }
      if (/^why\?$/i.test(firstLine)) {
        current = "why";
        const content = inline ? part.replace(/^why\?\s*/i, "").trim() : body;
        if (content) sections.why.push(content);
        return;
      }
      if (/^how\?$/i.test(firstLine)) {
        current = "how";
        const content = inline ? part.replace(/^how\?\s*/i, "").trim() : body;
        if (content) sections.how.push(content);
        return;
      }

      if (current) sections[current].push(part);
      else sections.what.push(part);
    });

    const result = [];
    ["what", "why", "how"].forEach((key) => {
      if (sections[key].length) {
        result.push({ key, content: sections[key].join("\n\n") });
      }
    });
    return result.length >= 2 ? result : null;
  }

  function isHowParagraph(p) {
    return /^(Interview|Practical|Real pattern|Migration|When to mention|Common trap|Android practice|Best practice|Choose by|Interview tip|Under the hood|Production|Modern|Use cases|Fix:|Tools:|Migration path|Anti-pattern|Compared to|vs |Pitfalls|Caution|Order:|Debugging|Real pattern)/i.test(
      p
    );
  }

  function inferSections(text) {
    const paras = splitParagraphs(text);
    if (!paras.length) return [];

    const howStart = paras.findIndex(isHowParagraph);
    let howParas = [];
    let core = paras;

    if (howStart >= 0) {
      howParas = paras.slice(howStart);
      core = paras.slice(0, howStart);
    } else if (paras.length >= 4) {
      howParas = [paras[paras.length - 1]];
      core = paras.slice(0, -1);
    } else if (paras.length === 3) {
      return [
        { key: "what", content: paras[0] },
        { key: "why", content: paras[1] },
        { key: "how", content: paras[2] },
      ];
    }

    if (core.length === 1) {
      const only = core[0];
      if (howParas.length) {
        return [
          { key: "what", content: only },
          { key: "how", content: howParas.join("\n\n") },
        ];
      }
      return [{ key: "what", content: only }];
    }

    if (core.length === 2) {
      return [
        { key: "what", content: core[0] },
        { key: "why", content: core[1] },
        ...(howParas.length ? [{ key: "how", content: howParas.join("\n\n") }] : []),
      ];
    }

    const what = core[0];
    const whyEnd = howParas.length ? core.length : core.length - 1;
    const why = core.slice(1, whyEnd).join("\n\n");
    const result = [
      { key: "what", content: what },
      { key: "why", content: why },
    ];
    if (howParas.length) {
      result.push({ key: "how", content: howParas.join("\n\n") });
    } else if (core.length > 2) {
      result.push({ key: "how", content: core[core.length - 1] });
    }
    return result;
  }

  function sectionsToExplicitText(sections) {
    const labels = { what: "What?", why: "Why?", how: "How?" };
    return ["what", "why", "how"]
      .map((key) => {
        const sec = sections.find((s) => s.key === key);
        if (!sec || !sec.content.trim()) return "";
        return `${labels[key]}\n\n${sec.content.trim()}`;
      })
      .filter(Boolean)
      .join("\n\n");
  }

  function normalizeAnswerText(text) {
    if (!text || !text.trim()) return text;
    if (parseExplicitSections(text)) return text;
    const inferred = inferSections(text);
    if (!inferred.length) return text;
    return sectionsToExplicitText(inferred);
  }

  function hasExplicitWwh(text) {
    return parseExplicitSections(text) !== null;
  }

  return {
    splitParagraphs,
    parseExplicitSections,
    inferSections,
    sectionsToExplicitText,
    normalizeAnswerText,
    hasExplicitWwh,
  };
});
