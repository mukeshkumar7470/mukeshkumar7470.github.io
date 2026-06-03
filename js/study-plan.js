/**
 * Study Plan Flowchart — Animated decision-tree flowchart
 * for the Interview Prep page.
 */
(function () {
  'use strict';

  /* ─── Plan Data ─────────────────────────────────────────── */
  const PLANS = {
    '5day': {
      title: '⚡ 5-Day Crash Plan',
      desc: 'Interview within a week — high-impact topics with daily decision checkpoints',
      nodes: [
        {
          id: 's', type: 'start', color: 'mint',
          label: 'Interview in ≤ 7 Days'
        },
        {
          id: 'd0', type: 'step', color: 'mint', icon: 'fa-clipboard-list',
          label: 'Day 0 — Evening Setup',
          tasks: [
            'Write your 90-sec "Tell me about yourself" script',
            'Pick 2 best projects — write STAR outline for each',
            'Open interview.html → skim Behavioral & HR tab',
            'List your 5 strongest skills with proof examples'
          ]
        },
        {
          id: 'c0', type: 'decision',
          q: 'Can you speak your intro fluently without reading?',
          yes: 'Day 1 →', no: 'Practice 3× more in front of mirror'
        },
        {
          id: 'd1', type: 'step', color: 'blue', icon: 'fa-mug-hot',
          label: 'Day 1 — Java + OOP',
          tasks: [
            'Java tab: HashMap internals, ArrayList vs LinkedList, exceptions',
            'OOP tab: inheritance, polymorphism, Parcelable vs Serializable',
            'Speak 8 answers aloud without reading',
            'TTS listen 30 min · write 3 flashcards on weak spots'
          ]
        },
        {
          id: 'c1', type: 'decision',
          q: 'Can you explain Parcelable vs Serializable clearly?',
          yes: 'Day 2 →', no: 'Re-read How section · write 1 flashcard'
        },
        {
          id: 'd2', type: 'step', color: 'purple', icon: 'fa-code',
          label: 'Day 2 — Kotlin',
          tasks: [
            'Null safety, data class, sealed class, extension functions',
            'Coroutines: launch vs async, dispatchers, cancellation',
            'Flow, StateFlow, SharedFlow — cold vs hot',
            'Practice mock one-liners: StateFlow vs SharedFlow, coroutines vs threads'
          ]
        },
        {
          id: 'c2', type: 'decision',
          q: 'Can you explain coroutines end-to-end in 60 seconds?',
          yes: 'Day 3 →', no: 'Re-read Why + How sections · speak 3 more times'
        },
        {
          id: 'd3', type: 'step', color: 'android', icon: 'fa-mobile-screen',
          label: 'Day 3 — Android Core',
          tasks: [
            'Activity + Fragment lifecycle, configuration change',
            'ViewModel, LiveData, StateFlow binding to UI',
            'Room, Retrofit, Hilt — each in 2 sentences',
            'Draw from memory: UI → ViewModel → Repository → API/Room',
            'Project Pitch #1 — 3-min STAR timed'
          ]
        },
        {
          id: 'c3', type: 'decision',
          q: 'MVVM diagram from memory + Project Pitch under 3 min?',
          yes: 'Day 4 →', no: 'Draw 3 more times · redo pitch with timer'
        },
        {
          id: 'd4', type: 'step', color: 'dsa', icon: 'fa-sitemap',
          label: 'Day 4 — DSA + Architecture',
          tasks: [
            'DSA: HashMap, two pointers, stack, LRU Cache, BFS/DFS',
            'State time + space complexity for all 5 patterns aloud',
            'Architecture: Repository, SSOT, idempotency in Razorpay',
            'Project Pitch #2 + whiteboard MVVM'
          ]
        },
        {
          id: 'c4', type: 'decision',
          q: '5 DSA patterns with complexity + architecture story ready?',
          yes: 'Day 5 →', no: 'Re-do DSA · 1 pattern per 30 min'
        },
        {
          id: 'd5', type: 'step', color: 'hr', icon: 'fa-user-tie',
          label: 'Day 5 — Behavioral + Mock',
          tasks: [
            'Read full Behavioral & HR tab — speak every answer aloud',
            '45-min mock: 5 HR + 10 rapid-fire tech + 1 DSA problem',
            'Write 3 questions for the panel',
            'Check logistics: route/link, dress, resume prints, ID',
            'STOP — no new topics after 8 PM',
            'Sleep 7–8 hours'
          ]
        },
        {
          id: 'c5', type: 'decision',
          q: 'Mock complete, panel questions ready, logistics confirmed?',
          yes: 'Interview day! →', no: 'Revisit fumbled answers · speak again once'
        },
        {
          id: 'e', type: 'end', color: 'mint',
          label: '✅ Interview Ready'
        }
      ]
    },

    '1month': {
      title: '📅 1-Month Plan',
      desc: 'All 7 tabs covered once · 3 mocks · solid project bank',
      nodes: [
        {
          id: 's', type: 'start', color: 'mint',
          label: 'Interview in 2–6 Weeks'
        },
        {
          id: 'w0', type: 'step', color: 'mint', icon: 'fa-wrench',
          label: 'Week 0 — Setup',
          tasks: [
            'Audit CV — every line must be explainable',
            'Write 3 project STAR scripts (SK Agent, eNagarpalika, Netlink)',
            'List 5 strengths with proof · 1 honest weakness + fix plan',
            'Research target company — 5 bullet facts'
          ]
        },
        {
          id: 'w1', type: 'step', color: 'blue', icon: 'fa-mug-hot',
          label: 'Week 1 — Java + OOP + Kotlin Start',
          tasks: [
            'D1–2: Java tab — collections, exceptions, threads',
            'D3–4: OOP tab — inheritance, polymorphism, encapsulation',
            'D5–6: Kotlin basics — null safety, data class, sealed class',
            'D7: Coroutines part 1 — launch, async, dispatchers',
            'Weekend quiz: speak 20 answers aloud without reading'
          ]
        },
        {
          id: 'c1', type: 'decision',
          q: 'Week 1 quiz: 20 answers fluent without reading?',
          yes: 'Week 2 →', no: 'Identify weak answers · re-read + speak 3× each'
        },
        {
          id: 'w2', type: 'step', color: 'purple', icon: 'fa-code',
          label: 'Week 2 — Kotlin Deep + Android Start',
          tasks: [
            'D8–9: Coroutines + Flow + StateFlow + cancellation deep dive',
            'D10–11: Android lifecycle, ViewModel, MVVM diagram',
            'D12–13: Room, Retrofit, OkHttp interceptors',
            'D14: Project Pitch #1 recorded + replayed · Mock #1 (30 min)'
          ]
        },
        {
          id: 'c2', type: 'decision',
          q: 'Project pitch under 3 min + Mock #1 done?',
          yes: 'Week 3 →', no: 'Rewrite STAR · practice timed · fix weak Q'
        },
        {
          id: 'w3', type: 'step', color: 'android', icon: 'fa-mobile-screen',
          label: 'Week 3 — Android Advanced + DSA',
          tasks: [
            'D15–16: Hilt, WorkManager, Compose mention, FCM',
            'D17–18: Testing pyramid, BroadcastReceiver, FileProvider',
            'D19–21: DSA full tab — HashMap, window, BFS, LRU, heap',
            'D22: Architecture intro — MVVM vs Clean vs BLoC comparison'
          ]
        },
        {
          id: 'c3', type: 'decision',
          q: '5 DSA patterns with time/space complexity stated?',
          yes: 'Week 4 →', no: 'Re-do DSA day · 30 min per pattern'
        },
        {
          id: 'w4', type: 'step', color: 'hr', icon: 'fa-user-tie',
          label: 'Week 4 — Architecture + HR + Mocks',
          tasks: [
            'D23–24: Architecture — SSOT, Paging 3, API versioning, idempotency',
            'D25–26: Behavioral & HR — all 15+ questions aloud',
            'D27: Mock #2 — 45 min full panel simulation',
            'D28: Fix every topic fumbled in Mock #2',
            'D29: Mock #3 — company-specific prep',
            'D30: LIGHT only — flashcards, no new topics'
          ]
        },
        {
          id: 'c4', type: 'decision',
          q: '3 mocks done · 3 panel questions ready · logistics set?',
          yes: 'Interview ready! →', no: 'One more mock + fix weak list'
        },
        {
          id: 'e', type: 'end', color: 'mint',
          label: '✅ Month Complete — Interview Ready'
        }
      ]
    },

    '3month': {
      title: '🗓️ 3-Month Mastery Plan',
      desc: 'Deep retention · 4 full mocks · senior-level architecture readiness',
      nodes: [
        {
          id: 's', type: 'start', color: 'mint',
          label: 'No Date Yet / Career Growth'
        },
        {
          id: 'm0', type: 'step', color: 'mint', icon: 'fa-wrench',
          label: 'Setup — Week 0',
          tasks: [
            'Audit CV top-to-bottom — every line explainable',
            '3 project STAR scripts written (SK Agent, eNagarpalika, Netlink)',
            'Weakness list with fix-in-progress plan',
            'Target role + company research'
          ]
        },
        {
          id: 'm1', type: 'step', color: 'blue', icon: 'fa-book',
          label: 'Month 1 — Foundation (Weeks 1–4)',
          tasks: [
            'Week 1: Java tab + OOP tab — 15 answers written',
            'Week 2: Kotlin syntax, null safety, sealed class, extensions',
            'Week 3: Coroutines + Flow deep dive — 2-min spoken answer',
            'Week 4: Android lifecycle, MVVM, ViewModel → Mock #1 (30 min)'
          ]
        },
        {
          id: 'c1', type: 'decision',
          q: 'Mock #1 passed with 70%+ fluency?',
          yes: 'Month 2 →', no: 'Note weak list · add to Month 2 start'
        },
        {
          id: 'm2', type: 'step', color: 'android', icon: 'fa-mobile-screen',
          label: 'Month 2 — Production Android + DSA (Weeks 5–8)',
          tasks: [
            'Week 5: Room, Retrofit, offline-first — ShopKirana STAR polished',
            'Week 6: Hilt, testing pyramid, CI/CD gap study',
            'Week 7: DSA full tab — 2 problems coded per week',
            'Week 8: Architecture full tab — Mock #2 (45 min)'
          ]
        },
        {
          id: 'c2', type: 'decision',
          q: 'Mock #2 done + architecture questions clear?',
          yes: 'Month 3 →', no: '2 extra days on weak architecture topics'
        },
        {
          id: 'm3', type: 'step', color: 'hr', icon: 'fa-trophy',
          label: 'Month 3 — Senior Readiness (Weeks 9–12)',
          tasks: [
            'Week 9: Flutter BLoC + Clean Arch — map to Android MVVM answers',
            'Week 10: Payments, security, Play/App Store release stories',
            'Week 11: Full Behavioral & HR tab + Mock #3 (60 min)',
            'Week 12: Weak-area sprint + Mock #4 final + interview-day protocol'
          ]
        },
        {
          id: 'c3', type: 'decision',
          q: 'Mock #4 done — fluent on 80%+ questions?',
          yes: 'Mastery achieved! →', no: '1 more day on top 3 weak topics'
        },
        {
          id: 'e', type: 'end', color: 'mint',
          label: '🏆 3-Month Mastery Complete'
        }
      ]
    },

    'working': {
      title: '💼 Working Professional Plan',
      desc: 'Currently employed · prep in evenings & weekends only · 45–60 min/day · 6-week realistic timeline',
      nodes: [
        {
          id: 's', type: 'start', color: 'mint',
          label: 'Currently Working — Prep After Hours'
        },
        {
          id: 'w0', type: 'step', color: 'mint', icon: 'fa-calendar-check',
          label: 'Week 0 — Honest Setup (1 Weekend)',
          tasks: [
            'Accept reality: only 45–60 min/day on weekdays, 2–3 hr on weekends',
            'Audit CV — every line must be explainable under stress',
            'Write 2 project STAR scripts (your strongest: SK Agent or eNagarpalika)',
            'Install interview.html as PWA on phone — study on commute',
            'Set a daily calendar reminder: "Interview prep 9 PM"'
          ]
        },
        {
          id: 'c0', type: 'decision',
          q: 'Calendar reminder set + 2 project STAR outlines written?',
          yes: 'Week 1 →', no: 'Do this first — without a system it won\'t happen'
        },
        {
          id: 'w1', type: 'step', color: 'blue', icon: 'fa-mug-hot',
          label: 'Week 1 — Java + OOP (Evenings Only)',
          tasks: [
            'Mon: Java tab — 3 Q per evening, What only (15 min)',
            'Tue: Java tab — 3 more Q + speak aloud once each',
            'Wed: OOP tab — inheritance, polymorphism (20 min)',
            'Thu: OOP tab — Parcelable, encapsulation (20 min)',
            'Fri: TTS listen on commute — review week\'s flashcards',
            'Weekend: speak 10 Java+OOP answers aloud without reading (45 min)'
          ]
        },
        {
          id: 'c1', type: 'decision',
          q: 'Weekend: 10 Java/OOP answers spoken fluently?',
          yes: 'Week 2 →', no: 'Spend extra weekend session on weak answers'
        },
        {
          id: 'w2', type: 'step', color: 'purple', icon: 'fa-code',
          label: 'Week 2 — Kotlin (Evenings + Weekend)',
          tasks: [
            'Mon–Tue: Kotlin basics — null safety, data class, sealed class',
            'Wed–Thu: Coroutines — launch, async, dispatchers, cancellation',
            'Fri: TTS commute — Flow + StateFlow + SharedFlow listen',
            'Weekend Sat: Kotlin deep dive — speak coroutines end-to-end 3×',
            'Weekend Sun: REST DAY or light TTS only — no new topics'
          ]
        },
        {
          id: 'c2', type: 'decision',
          q: 'Can you explain coroutines in 60 sec without pausing?',
          yes: 'Week 3 →', no: 'Re-read Why + How · repeat once more on Monday'
        },
        {
          id: 'w3', type: 'step', color: 'android', icon: 'fa-mobile-screen',
          label: 'Week 3 — Android Core (Evenings + Weekend)',
          tasks: [
            'Mon–Tue: Lifecycle, ViewModel, MVVM — draw diagram on paper',
            'Wed: Room + Retrofit basics (20 min)',
            'Thu: Hilt — why DI, @Inject, @HiltAndroidApp (20 min)',
            'Fri: TTS listen — Android section',
            'Weekend: Project Pitch #1 — 3-min STAR timed · record on phone · fix weak parts'
          ]
        },
        {
          id: 'c3', type: 'decision',
          q: 'Project Pitch #1 under 3 min + MVVM diagram from memory?',
          yes: 'Week 4 →', no: 'Redo pitch · draw diagram 3 more times'
        },
        {
          id: 'w4', type: 'step', color: 'dsa', icon: 'fa-sitemap',
          label: 'Week 4 — DSA (Evenings) + Architecture (Weekend)',
          tasks: [
            'Mon: HashMap — two sum, anagram (20 min)',
            'Tue: Two pointers — palindrome, sliding window (20 min)',
            'Wed: Stack — valid parentheses + LRU Cache concept (20 min)',
            'Thu: BFS/DFS basics + complexity aloud (20 min)',
            'Fri: TTS commute — DSA section',
            'Weekend: Architecture tab — MVVM vs Clean, SSOT, idempotency in Razorpay'
          ]
        },
        {
          id: 'c4', type: 'decision',
          q: '5 DSA patterns with time/space + architecture story ready?',
          yes: 'Week 5 →', no: 'Saturday: re-do weak DSA pattern (30 min each)'
        },
        {
          id: 'w5', type: 'step', color: 'hr', icon: 'fa-user-tie',
          label: 'Week 5 — Behavioral & HR (Evenings + Weekend Mock)',
          tasks: [
            'Mon–Tue: Behavioral tab — Tell me about yourself, strengths, weakness',
            'Wed: STAR stories — conflict, mistake, deadline pressure',
            'Thu: "Why this company?" + "Where in 3–5 years?" aloud',
            'Fri: Write 3 questions for the panel',
            'Weekend Sat: Mock #1 — 45 min full panel (HR + tech + 1 DSA)',
            'Weekend Sun: Fix every fumbled answer from mock'
          ]
        },
        {
          id: 'c5', type: 'decision',
          q: 'Mock #1 done — fluent on 70%+ questions?',
          yes: 'Week 6 →', no: 'Spend extra Sunday on weak list only'
        },
        {
          id: 'w6', type: 'step', color: 'practice', icon: 'fa-trophy',
          label: 'Week 6 — Final Sprint (Low Intensity)',
          tasks: [
            'Mon–Wed evenings: ONLY revisit your top 3 weak topics (20 min/day)',
            'Thu: Mock #2 — 30 min focused (HR + 8 tech rapid-fire)',
            'Fri: LIGHT only — flashcards, TTS commute, no new topics',
            'Night before interview: clothes ready, route confirmed, ID + resume printed',
            'Morning of interview: 8 one-liners aloud — MVVM, Hilt, coroutines, Retrofit, StateFlow, Repository, BLoC, Room'
          ]
        },
        {
          id: 'c6', type: 'decision',
          q: '2 mocks done · logistics confirmed · 8 one-liners spoken?',
          yes: 'Interview day! →', no: 'One final 20-min review · then stop'
        },
        {
          id: 'e', type: 'end', color: 'mint',
          label: '✅ Working Pro — Interview Ready'
        }
      ]
    }
  };

  /* ─── Daily Decision Loop ─────────────────────────────── */
  const DAILY_LOOPS = {
    default: [
      { step: 1, color: 'blue',    icon: 'fa-book-open',  label: 'Morning · 30 min',  desc: 'Read 5 Q&A — What section only' },
      { step: 2, color: 'purple',  icon: 'fa-headphones', label: 'Midday · 30 min',   desc: 'TTS listen — alternate English / Hindi' },
      { step: 3, color: 'android', icon: 'fa-microphone', label: 'Evening · 45 min',  desc: 'Speak answers aloud — Why + How + project link' },
      { step: 4, color: 'dsa',     icon: 'fa-pen',        label: 'Night · 10 min',    desc: 'Write 3 flashcards on today\'s weak spots' },
    ],
    working: [
      { step: 1, color: 'purple',  icon: 'fa-train-subway', label: 'Commute · 20 min',  desc: 'TTS listen — English or Hindi voice' },
      { step: 2, color: 'blue',    icon: 'fa-sun',          label: 'Lunch · 15 min',    desc: 'Read 2–3 Q (What only) — no pressure' },
      { step: 3, color: 'android', icon: 'fa-moon',         label: '9 PM · 40 min',     desc: 'Speak answers + project link · no phone' },
      { step: 4, color: 'dsa',     icon: 'fa-bed',          label: 'Before sleep · 5 min', desc: '1 flashcard only · then rest' },
    ]
  };

  /* ─── State ────────────────────────────────────────────── */
  const STORAGE_KEY = 'spf-progress-v2';
  let activePlan = '5day';
  let progress = {};

  function loadProgress() {
    try { progress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { progress = {}; }
  }

  function saveProgress() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch (e) {}
  }

  function isDone(planKey, nodeId) {
    return !!(progress[planKey] && progress[planKey][nodeId]);
  }

  function toggleDone(planKey, nodeId) {
    if (!progress[planKey]) progress[planKey] = {};
    progress[planKey][nodeId] = !progress[planKey][nodeId];
    saveProgress();
  }

  /* ─── Rendering ────────────────────────────────────────── */
  function colorIcon(color) {
    const map = {
      mint: '#6ee7b7', blue: '#38bdf8', purple: '#a78bfa',
      android: '#6ee7b7', dsa: '#fb923c', arch: '#2dd4bf',
      hr: '#f87171', practice: '#fbbf24', yellow: '#fbbf24'
    };
    return map[color] || '#6ee7b7';
  }

  function createStartEnd(node, planKey) {
    const done = isDone(planKey, node.id);
    const div = document.createElement('div');
    div.className = 'spf-node spf-node--cap spf-enter' + (done ? ' spf-done' : '');
    div.dataset.id = node.id;
    div.innerHTML = `<span class="spf-cap-label">${node.label}</span>`;
    return div;
  }

  function createStepNode(node, planKey) {
    const done = isDone(planKey, node.id);
    const c = colorIcon(node.color || 'mint');
    const div = document.createElement('div');
    div.className = 'spf-node spf-node--step spf-enter' + (done ? ' spf-done' : '');
    div.dataset.id = node.id;
    div.style.setProperty('--spf-c', c);

    const tasksHtml = (node.tasks || []).map(t =>
      `<li class="spf-task-item"><i class="fa-solid fa-circle-dot"></i><span>${t}</span></li>`
    ).join('');

    div.innerHTML = `
      <div class="spf-step-header">
        <span class="spf-step-icon"><i class="fa-solid ${node.icon || 'fa-circle'}"></i></span>
        <strong class="spf-step-label">${node.label}</strong>
        <span class="spf-done-badge" aria-label="Completed"><i class="fa-solid fa-circle-check"></i></span>
        <button class="spf-expand-btn" aria-expanded="false" aria-label="Toggle details">
          <i class="fa-solid fa-chevron-down"></i>
        </button>
      </div>
      <div class="spf-step-body" hidden>
        <ul class="spf-task-list">${tasksHtml}</ul>
        <button class="spf-complete-btn" type="button">
          <i class="fa-solid ${done ? 'fa-rotate-left' : 'fa-check'}"></i>
          <span>${done ? 'Mark Incomplete' : 'Mark Complete'}</span>
        </button>
      </div>`;

    div.querySelector('.spf-expand-btn').addEventListener('click', () => {
      const body = div.querySelector('.spf-step-body');
      const btn = div.querySelector('.spf-expand-btn');
      const open = !body.hidden;
      body.hidden = open;
      btn.setAttribute('aria-expanded', String(!open));
      div.classList.toggle('spf-expanded', !open);
    });

    div.querySelector('.spf-complete-btn').addEventListener('click', () => {
      toggleDone(planKey, node.id);
      const nowDone = isDone(planKey, node.id);
      div.classList.toggle('spf-done', nowDone);
      const btn = div.querySelector('.spf-complete-btn');
      btn.querySelector('i').className = `fa-solid ${nowDone ? 'fa-rotate-left' : 'fa-check'}`;
      btn.querySelector('span').textContent = nowDone ? 'Mark Incomplete' : 'Mark Complete';
      updateProgress(planKey);
    });

    return div;
  }

  function createDecisionNode(node) {
    const div = document.createElement('div');
    div.className = 'spf-node spf-node--decision spf-enter';
    div.dataset.id = node.id;

    div.innerHTML = `
      <div class="spf-decision-wrap">
        <div class="spf-diamond-shape">
          <span class="spf-diamond-icon"><i class="fa-solid fa-code-branch"></i></span>
        </div>
        <p class="spf-decision-q">${node.q}</p>
        <div class="spf-decision-branches">
          <div class="spf-branch spf-branch--yes">
            <i class="fa-solid fa-check-circle"></i>
            <strong>Yes</strong>
            <small>${node.yes}</small>
          </div>
          <div class="spf-branch spf-branch--no">
            <i class="fa-solid fa-rotate-left"></i>
            <strong>No</strong>
            <small>${node.no}</small>
          </div>
        </div>
      </div>`;

    return div;
  }

  function createConnector(dashed) {
    const div = document.createElement('div');
    div.className = 'spf-connector' + (dashed ? ' spf-connector--dashed' : '');
    div.innerHTML = '<div class="spf-connector-line"></div><div class="spf-connector-arrow"></div>';
    return div;
  }

  function renderFlowchart(planKey) {
    const plan = PLANS[planKey];
    const canvas = document.getElementById('spfFlowchart');
    if (!canvas || !plan) return;

    canvas.innerHTML = '';

    plan.nodes.forEach((node, i) => {
      let el;
      if (node.type === 'start' || node.type === 'end') {
        el = createStartEnd(node, planKey);
      } else if (node.type === 'decision') {
        el = createDecisionNode(node);
      } else {
        el = createStepNode(node, planKey);
      }

      canvas.appendChild(el);

      if (i < plan.nodes.length - 1) {
        canvas.appendChild(createConnector(false));
      }
    });

    updateProgress(planKey);
    scheduleEntrance();
    renderDailyLoop(planKey);
  }

  function renderDailyLoop(planKey) {
    const wrap = document.getElementById('spfDailyLoop');
    const title = document.querySelector('.spf-daily-title');
    if (!wrap) return;
    wrap.innerHTML = '';

    if (title) {
      title.innerHTML = planKey === 'working'
        ? '<i class="fa-solid fa-briefcase"></i> Daily loop for working professionals'
        : '<i class="fa-solid fa-repeat"></i> Daily study loop — repeat every day';
    }

    const loop = DAILY_LOOPS[planKey] || DAILY_LOOPS.default;
    loop.forEach((item, i) => {
      const c = colorIcon(item.color);
      const div = document.createElement('div');
      div.className = 'spf-loop-step spf-enter';
      div.style.setProperty('--spf-c', c);
      div.style.animationDelay = (i * 0.12) + 's';
      div.innerHTML = `
        <span class="spf-loop-num">${item.step}</span>
        <span class="spf-loop-icon"><i class="fa-solid ${item.icon}"></i></span>
        <div>
          <strong>${item.label}</strong>
          <span>${item.desc}</span>
        </div>`;
      wrap.appendChild(div);

      if (i < DAILY_LOOP.length - 1) {
        const sep = document.createElement('div');
        sep.className = 'spf-loop-sep';
        sep.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        wrap.appendChild(sep);
      }
    });
  }

  /* ─── Progress bar ─────────────────────────────────────── */
  function updateProgress(planKey) {
    const plan = PLANS[planKey];
    const fill = document.getElementById('spfProgressFill');
    const label = document.getElementById('spfProgressLabel');
    if (!fill || !label || !plan) return;

    const steps = plan.nodes.filter(n => n.type === 'step');
    const done = steps.filter(n => isDone(planKey, n.id)).length;
    const pct = steps.length ? Math.round((done / steps.length) * 100) : 0;

    fill.style.width = pct + '%';
    label.textContent = `${done} / ${steps.length} stages complete`;

    if (pct === 100) {
      fill.classList.add('spf-progress-fill--complete');
    } else {
      fill.classList.remove('spf-progress-fill--complete');
    }
  }

  /* ─── Entrance animation ───────────────────────────────── */
  function scheduleEntrance() {
    const nodes = document.querySelectorAll('.spf-enter');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('spf-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      nodes.forEach((el, i) => {
        el.style.transitionDelay = (i * 0.06) + 's';
        io.observe(el);
      });
    } else {
      nodes.forEach(el => el.classList.add('spf-visible'));
    }
  }

  /* ─── Reset button ─────────────────────────────────────── */
  function handleReset() {
    const btn = document.getElementById('spfResetBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!confirm('Reset all progress for this plan?')) return;
      delete progress[activePlan];
      saveProgress();
      renderFlowchart(activePlan);
    });
  }

  /* ─── Init ─────────────────────────────────────────────── */
  function init() {
    const container = document.getElementById('studyPlanFlowchart');
    if (!container) return;

    loadProgress();

    document.querySelectorAll('.spf-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activePlan = btn.dataset.plan;
        document.querySelectorAll('.spf-tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const desc = document.getElementById('spfPlanDesc');
        if (desc) desc.textContent = PLANS[activePlan].desc;

        renderFlowchart(activePlan);
      });
    });

    handleReset();
    renderFlowchart(activePlan);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
