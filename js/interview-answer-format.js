/**
 * Rich answer formatting: What / Why / How cards + readable paragraphs.
 */
(function (global) {
  "use strict";

  const SECTION_DEFS = [
    {
      key: "what",
      markers: /^what\?$/i,
      labelEn: "What",
      labelHi: "क्या",
      subEn: "Definition & concept",
      subHi: "परिभाषा और concept",
      icon: "fa-circle-question",
      css: "iqa-wwh-what",
    },
    {
      key: "why",
      markers: /^why\?$/i,
      labelEn: "Why",
      labelHi: "क्यों",
      subEn: "Reason & context",
      subHi: "कारण और context",
      icon: "fa-lightbulb",
      css: "iqa-wwh-why",
    },
    {
      key: "how",
      markers: /^how\?$/i,
      labelEn: "How",
      labelHi: "कैसे",
      subEn: "How it works & practice",
      subHi: "कैसे काम करता है",
      icon: "fa-gears",
      css: "iqa-wwh-how",
    },
  ];

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function splitParagraphs(text) {
    if (!text) return [];
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
  }

  /** Explicit What? / Why? / How? blocks in source text */
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
    return /^(Interview|Practical|Real pattern|Migration|When to mention|Common trap|Android practice|Best practice|Choose by|Interview tip)/i.test(
      p
    );
  }

  /** Infer What / Why / How from paragraph flow */
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

    if (core.length === 3 && !howParas.length) {
      return [
        { key: "what", content: core[0] },
        { key: "why", content: core[1] },
        { key: "how", content: core[2] },
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
    } else if (core.length > 3) {
      result.push({ key: "how", content: core[core.length - 1] });
    }
    return result;
  }

  function isCodeLine(line) {
    return /^\s*(val |var |fun |class |interface |object |import |package |@|if \(|for \(|try |catch |private |public |void |int |String|List<|Mutable|suspend |viewModelScope|data class)/.test(
      line
    );
  }

  function isFlowLine(line) {
    return /→|->/.test(line) && line.length < 120;
  }

  function formatFlow(line) {
    const steps = line
      .split(/\s*(?:→|->)\s*/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (steps.length < 2) return null;
    return `<div class="iqa-flow">${steps
      .map(
        (step, i) =>
          `<span class="iqa-flow-step">${escapeHtml(step)}</span>${i < steps.length - 1 ? '<span class="iqa-flow-arrow" aria-hidden="true">→</span>' : ""}`
      )
      .join("")}</div>`;
  }

  function formatLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return "";

    const flow = formatFlow(trimmed);
    if (flow) return flow;

    if (isCodeLine(trimmed)) {
      return `<pre class="iqa-inline-code"><code>${escapeHtml(trimmed)}</code></pre>`;
    }

    if (/^(Example|Output|Problems in|Other problems|Compared to|Order:|Memory:|Kotlin code)/i.test(trimmed)) {
      const colon = trimmed.indexOf(":");
      if (colon >= 0) {
        return `<p class="iqa-sublead"><strong>${escapeHtml(trimmed.slice(0, colon + 1))}</strong> ${escapeHtml(trimmed.slice(colon + 1).trim())}</p>`;
      }
      return `<p class="iqa-sublead"><strong>${escapeHtml(trimmed)}</strong></p>`;
    }

    if (/^[-•]\s+/.test(trimmed)) {
      return `<li>${escapeHtml(trimmed.replace(/^[-•]\s+/, ""))}</li>`;
    }

    return `<p>${escapeHtml(trimmed)}</p>`;
  }

  function formatSectionBody(content) {
    const lines = content.split("\n");
    let html = "";
    let inList = false;

    lines.forEach((line) => {
      const piece = formatLine(line);
      if (piece.startsWith("<li>")) {
        if (!inList) {
          html += "<ul class=\"iqa-bullet-list\">";
          inList = true;
        }
        html += piece;
      } else {
        if (inList) {
          html += "</ul>";
          inList = false;
        }
        html += piece;
      }
    });
    if (inList) html += "</ul>";
    return html;
  }

  function renderSectionCard(section, lang) {
    const def = SECTION_DEFS.find((d) => d.key === section.key) || SECTION_DEFS[0];
    const label = lang === "hi" ? def.labelHi : def.labelEn;
    const sub = lang === "hi" ? def.subHi : def.subEn;

    return `
      <article class="iqa-wwh-card ${def.css}" id="">
        <header class="iqa-wwh-card-head">
          <span class="iqa-wwh-icon" aria-hidden="true"><i class="fa-solid ${def.icon}"></i></span>
          <div class="iqa-wwh-titles">
            <h5 class="iqa-wwh-label">${escapeHtml(label)}</h5>
            <span class="iqa-wwh-sub">${escapeHtml(sub)}</span>
          </div>
        </header>
        <div class="iqa-wwh-body">${formatSectionBody(section.content)}</div>
      </article>
    `;
  }

  function renderNav(sections, lang) {
    const chips = sections
      .map((s) => {
        const def = SECTION_DEFS.find((d) => d.key === s.key);
        const label = lang === "hi" ? def.labelHi : def.labelEn;
        return `<a class="iqa-wwh-chip iqa-wwh-chip-${s.key}" href="#${s.key}" data-scroll="${s.key}">${escapeHtml(label)}</a>`;
      })
      .join("");
    return `<nav class="iqa-wwh-nav" aria-label="Answer sections">${chips}</nav>`;
  }

  function formatAnswer(text, lang) {
    if (!text) return "";

    const explicit = parseExplicitSections(text);
    const sections = explicit || inferSections(text);

    if (!sections.length) return "";

    if (sections.length === 1 && sections[0].key === "what") {
      return `<div class="iqa-structured iqa-structured-single">${renderSectionCard(sections[0], lang)}</div>`;
    }

    return `
      <div class="iqa-structured">
        ${renderNav(sections, lang)}
        <div class="iqa-wwh-grid">
          ${sections.map((s) => renderSectionCard(s, lang)).join("")}
        </div>
      </div>
    `;
  }

  function bindScrollChips(root) {
    if (!root) return;
    root.querySelectorAll(".iqa-wwh-chip[data-scroll]").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        e.preventDefault();
        const key = chip.dataset.scroll;
        const card = chip.closest(".iqa-structured")?.querySelector(`.iqa-wwh-${key}`);
        card?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    });
  }

  global.InterviewAnswerFormat = {
    formatAnswer,
    bindScrollChips,
  };
})(typeof window !== "undefined" ? window : global);
