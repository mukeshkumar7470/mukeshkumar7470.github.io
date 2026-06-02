(function () {
  "use strict";

  if (typeof INTERVIEW_QA === "undefined") return;

  const listEl = document.getElementById("interviewList");
  const searchEl = document.getElementById("interviewSearch");
  const countEl = document.getElementById("interviewCount");
  const tabsEl = document.getElementById("interviewTabs");
  const expandAllBtn = document.getElementById("interviewExpandAll");
  const collapseAllBtn = document.getElementById("interviewCollapseAll");

  if (!listEl) return;

  const STORAGE_CAT = "interview-active-category";
  const bodyCache = new Map();
  const itemById = new Map();

  let activeCategory = "all";
  let expandAll = false;
  let listHooksBound = false;
  let ttsListBound = false;
  let hydrateQueue = null;

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function formatAnswer(text, lang) {
    if (typeof InterviewAnswerFormat !== "undefined") {
      return InterviewAnswerFormat.formatAnswer(text, lang);
    }
    if (!text) return "";
    return text
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");
  }

  function indexItems() {
    itemById.clear();
    INTERVIEW_QA.forEach((cat) => {
      cat.items.forEach((item, index) => {
        const globalId = `${cat.id}-${index + 1}`;
        itemById.set(globalId, {
          ...item,
          categoryId: cat.id,
          categoryLabel: cat.label,
          categoryIcon: cat.icon,
          num: index + 1,
          globalId,
        });
      });
    });
  }

  function getAllItems() {
    return Array.from(itemById.values());
  }

  function matchesQuery(item, query) {
    if (!query) return true;
    const hay = `${item.q} ${item.en} ${item.hi} ${item.categoryLabel}`.toLowerCase();
    return hay.includes(query);
  }

  function renderVisualBlock(item) {
    if (typeof InterviewVisuals !== "undefined") {
      return InterviewVisuals.renderVisual(item.q, item.categoryId);
    }
    return "";
  }

  function ttsBtn(mode, label, icon) {
    if (typeof InterviewTTS !== "undefined") {
      return InterviewTTS.ttsButton(mode, label, icon);
    }
    return "";
  }

  function ttsSupported() {
    return typeof InterviewTTS !== "undefined" && InterviewTTS.supported();
  }

  function buildBodyHtml(item) {
    const cached = bodyCache.get(item.globalId);
    if (cached) return cached;

    const visual = renderVisualBlock(item);
    const ttsOn = ttsSupported();
    const ttsBlock = ttsOn
      ? `
          <div class="iqa-tts-row" role="group" aria-label="Listen to this question">
            <span class="iqa-tts-row-label"><i class="fa-solid fa-headphones"></i> Listen</span>
            ${ttsBtn("question", "Question", "fa-solid fa-circle-question")}
            ${ttsBtn("en", "English", "fa-solid fa-volume-high")}
            ${ttsBtn("hi", "Hindi", "fa-solid fa-language")}
            ${ttsBtn("all", "All", "fa-solid fa-play")}
          </div>`
      : "";

    const html = `
          ${visual}
          ${ttsBlock}
          <div class="iqa-body-layout">
            <section class="iqa-answer-panel">
              <div class="iqa-answer-head iqa-en">
                <h4><i class="fa-solid fa-microphone"></i> Interview answer</h4>
                <div class="iqa-answer-head-actions">
                  ${ttsOn ? ttsBtn("en", "Listen English", "fa-solid fa-volume-high") : ""}
                  <span class="iqa-answer-badge">English · What → Why → How</span>
                </div>
              </div>
              <div class="iqa-answer-content iqa-en">${formatAnswer(item.en, "en")}</div>
            </section>
            <section class="iqa-answer-panel">
              <div class="iqa-answer-head iqa-hi">
                <h4><i class="fa-solid fa-book-open"></i> Deep explanation</h4>
                <div class="iqa-answer-head-actions">
                  ${ttsOn ? ttsBtn("hi", "Listen Hindi", "fa-solid fa-language") : ""}
                  <span class="iqa-answer-badge">Hindi · क्या → क्यों → कैसे</span>
                </div>
              </div>
              <div class="iqa-answer-content iqa-hi">${formatAnswer(item.hi, "hi")}</div>
            </section>
          </div>`;

    bodyCache.set(item.globalId, html);
    return html;
  }

  function hydrateItem(details) {
    const body = details.querySelector(".iqa-body");
    if (!body || body.dataset.hydrated === "1") return;

    const item = itemById.get(details.dataset.id);
    if (!item) return;

    body.innerHTML = buildBodyHtml(item);
    body.dataset.hydrated = "1";
    delete body.dataset.lazy;

    if (typeof InterviewAnswerFormat !== "undefined") {
      InterviewAnswerFormat.bindScrollChips(body);
    }
    if (details.open && typeof InterviewVisuals !== "undefined") {
      InterviewVisuals.playItemAnimation(details);
    }
  }

  function bindListHooks() {
    if (listHooksBound) return;
    listHooksBound = true;

    listEl.addEventListener(
      "toggle",
      (e) => {
        const details = e.target;
        if (!details.classList?.contains("iqa-item") || !details.open) return;
        hydrateItem(details);
      },
      true
    );
  }

  function cancelHydrateQueue() {
    if (hydrateQueue) {
      cancelAnimationFrame(hydrateQueue);
      hydrateQueue = null;
    }
  }

  function scheduleHydrateOpenItems() {
    cancelHydrateQueue();
    const pending = Array.from(listEl.querySelectorAll('.iqa-item[open] .iqa-body[data-lazy="1"]'));
    if (!pending.length) return;

    let i = 0;
    const batch = 4;

    function step() {
      const slice = pending.slice(i, i + batch);
      slice.forEach((body) => {
        const details = body.closest(".iqa-item");
        if (details) hydrateItem(details);
      });
      i += batch;
      if (i < pending.length) {
        hydrateQueue = requestAnimationFrame(step);
      } else {
        hydrateQueue = null;
      }
    }

    hydrateQueue = requestAnimationFrame(step);
  }

  function renderAccordionShell(item) {
    const openAttr = expandAll ? " open" : "";
    const ttsOn = ttsSupported();

    return `
      <details class="iqa-item" data-category="${item.categoryId}" data-id="${item.globalId}"${openAttr}>
        <summary class="iqa-summary">
          <span class="iqa-num">${item.num}</span>
          <span class="iqa-title">${escapeHtml(item.q)}</span>
          <span class="iqa-cat-badge">${escapeHtml(item.categoryLabel)}</span>
          ${
            ttsOn
              ? `<span class="iqa-summary-tts">${ttsBtn("question", "Listen question", "fa-solid fa-volume-high")}</span>`
              : ""
          }
          <i class="fa-solid fa-chevron-down iqa-chevron" aria-hidden="true"></i>
        </summary>
        <div class="iqa-body" data-lazy="1" aria-busy="true">
          <p class="iqa-body-placeholder">Open to load answer, visual, and listen controls…</p>
        </div>
      </details>
    `;
  }

  function renderGrouped(categories, query) {
    if (typeof InterviewTTS !== "undefined" && InterviewTTS.isPlaying()) {
      InterviewTTS.stop();
    }
    cancelHydrateQueue();

    let total = 0;
    let html = "";

    categories.forEach((cat) => {
      const filtered = cat.items
        .map((item, index) => {
          const globalId = `${cat.id}-${index + 1}`;
          return itemById.get(globalId);
        })
        .filter((item) => item && matchesQuery(item, query));

      if (!filtered.length) return;

      total += filtered.length;
      html += `
        <div class="iqa-group" data-group="${cat.id}">
          <h3 class="iqa-group-title">
            <i class="${cat.icon}"></i> ${escapeHtml(cat.label)}
            <span class="iqa-group-count">${filtered.length}</span>
          </h3>
          <div class="iqa-group-list">
            ${filtered.map(renderAccordionShell).join("")}
          </div>
        </div>
      `;
    });

    listEl.innerHTML = html || `<p class="iqa-empty">No questions match your search. Try another keyword.</p>`;
    listEl.dataset.allCategories = activeCategory === "all" ? "true" : "false";
    if (countEl) {
      countEl.textContent = total
        ? `${total} question${total === 1 ? "" : "s"} shown`
        : "0 questions";
    }

    if (typeof InterviewVisuals !== "undefined") {
      InterviewVisuals.bindVisualAnimations(listEl);
    }
    if (expandAll) {
      scheduleHydrateOpenItems();
    }
  }

  function render() {
    const query = (searchEl?.value || "").trim().toLowerCase();
    const cats =
      activeCategory === "all"
        ? INTERVIEW_QA
        : INTERVIEW_QA.filter((c) => c.id === activeCategory);
    renderGrouped(cats, query);
  }

  function setActiveCategory(catId) {
    activeCategory = catId;
    try {
      sessionStorage.setItem(STORAGE_CAT, catId);
    } catch (_) {
      /* ignore */
    }
  }

  function buildTabs() {
    if (!tabsEl) return;
    const total = getAllItems().length;
    let html = `<button type="button" class="interview-tab${activeCategory === "all" ? " active" : ""}" data-cat="all">All <span>${total}</span></button>`;
    INTERVIEW_QA.forEach((cat) => {
      const active = activeCategory === cat.id ? " active" : "";
      html += `<button type="button" class="interview-tab${active}" data-cat="${cat.id}">
        <i class="${cat.icon}"></i> ${cat.label} <span>${cat.items.length}</span>
      </button>`;
    });
    tabsEl.innerHTML = html;

    tabsEl.querySelectorAll(".interview-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        tabsEl.querySelectorAll(".interview-tab").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        setActiveCategory(btn.dataset.cat);
        render();
      });
    });
  }

  function restoreCategory() {
    try {
      const saved = sessionStorage.getItem(STORAGE_CAT);
      if (saved && (saved === "all" || INTERVIEW_QA.some((c) => c.id === saved))) {
        activeCategory = saved;
      }
    } catch (_) {
      /* ignore */
    }
  }

  if (searchEl) {
    let debounce;
    searchEl.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(render, 200);
    });
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      if (typeof InterviewTTS !== "undefined") InterviewTTS.stop();
      expandAll = true;
      render();
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      if (typeof InterviewTTS !== "undefined") InterviewTTS.stop();
      expandAll = false;
      render();
    });
  }

  if (typeof InterviewTTS !== "undefined") {
    InterviewTTS.bindToolbar();
    if (!ttsListBound) {
      InterviewTTS.bindList(listEl);
      ttsListBound = true;
    }
  }

  indexItems();
  bindListHooks();
  restoreCategory();
  buildTabs();
  render();
})();
