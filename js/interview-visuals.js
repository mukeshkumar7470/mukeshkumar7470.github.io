/* Visual animation templates for interview Q&A */
(function (global) {
  "use strict";

  const RULES = [
    [/==|\.equals|equals\(\)/i, "equals"],
    [/oop|encapsulation|inheritance|polymorphism|abstraction/i, "oop"],
    [/arraylist|linkedlist/i, "array-list"],
    [/final|finally|finalize/i, "final-flow"],
    [/checked|unchecked|exception/i, "exception"],
    [/stringbuilder|stringbuffer|^string vs/i, "string-build"],
    [/hashmap|hash map/i, "hashmap"],
    [/interface vs abstract|abstract class/i, "interface"],
    [/garbage|gc\b/i, "gc"],
    [/generic|erasure|pecs/i, "generics"],
    [/synchronized|volatile/i, "threads"],
    [/reflection/i, "reflection"],
    [/comparable|comparator/i, "sort"],
    [/why kotlin|kotlin over java/i, "kotlin-logo"],
    [/val vs var|const/i, "val-var"],
    [/data class|sealed|object/i, "sealed"],
    [/coroutine|suspend/i, "coroutine"],
    [/lateinit|lazy/i, "lazy"],
    [/inline|reified/i, "inline"],
    [/\?\.|null safety|!!/i, "null-safety"],
    [/let, run|scope function/i, "scope"],
    [/visibility|open, public/i, "visibility"],
    [/companion|jvmsstatic/i, "companion"],
    [/flow vs|livedata|sharedflow|rxjava/i, "flow"],
    [/lifecycle/i, "lifecycle"],
    [/activity vs fragment|fragment/i, "fragment"],
    [/mvvm/i, "mvvm"],
    [/compose/i, "compose"],
    [/recyclerview|diffutil|listadapter/i, "recycler"],
    [/room/i, "room"],
    [/anr/i, "anr"],
    [/components|activity, service/i, "components"],
    [/hilt|dagger/i, "hilt"],
    [/memory leak|leak/i, "leak"],
    [/retrofit|okhttp/i, "retrofit"],
    [/intent|pendingintent|deep link/i, "intent"],
    [/workmanager/i, "workmanager"],
    [/fcm|push|notification/i, "fcm"],
    [/proguard|r8/i, "r8"],
    [/security|token|encrypt/i, "security"],
    [/unit test|instrumentation/i, "testing"],
    [/offline|cache|sync/i, "offline"],
    [/razorpay|payment/i, "payment"],
    [/bloc vs|bloc/i, "bloc"],
    [/navigation component|nav graph/i, "navigation"],
    [/paging/i, "paging"],
    [/two sum/i, "two-sum"],
    [/anagram|frequency/i, "frequency"],
    [/sliding window/i, "sliding"],
    [/binary search/i, "binary-search"],
    [/merge interval/i, "merge-interval"],
    [/bfs|dfs/i, "bfs-dfs"],
    [/linked list|cycle/i, "linked-list"],
    [/parentheses|stack/i, "stack"],
    [/deque|window maximum/i, "deque"],
    [/dynamic programming|climbing|fibonacci/i, "dp"],
    [/tree|depth/i, "tree"],
    [/heap|top k/i, "heap"],
    [/single source|ssot/i, "ssot"],
    [/idempotency|payment/i, "idempotent"],
    [/multi-module|dependency rule/i, "modules"],
    [/ci\/cd|pipeline/i, "cicd"],
    [/system design/i, "system-design"],
    [/apk|aab/i, "apk"],
    [/context types|launchmode|flavor/i, "android-misc"],
    [/dsa|leetcode|algorithm/i, "dsa-intro"],
    [/architect|scal/i, "arch-scale"],
  ];

  const DEFAULT_BY_CAT = {
    java: "default-java",
    kotlin: "default-kotlin",
    android: "default-android",
    dsa: "default-dsa",
    architecture: "default-arch",
  };

  function resolveVisualType(q, categoryId) {
    for (const [re, type] of RULES) {
      if (re.test(q)) return type;
    }
    return DEFAULT_BY_CAT[categoryId] || "default-android";
  }

  const VISUALS = {
    equals: `
      <div class="vis-equals">
        <div class="vis-box vis-ref"><span>A</span><small>== same address</small></div>
        <div class="vis-vs">VS</div>
        <div class="vis-box vis-eq"><span>A'</span><small>.equals() same content</small></div>
      </div>`,
    oop: `
      <div class="vis-oop">
        <span class="vis-pillar vis-p1">Encapsulation</span>
        <span class="vis-pillar vis-p2">Inheritance</span>
        <span class="vis-pillar vis-p3">Polymorphism</span>
        <span class="vis-pillar vis-p4">Abstraction</span>
      </div>`,
    "array-list": `
      <div class="vis-array-list">
        <div class="vis-array"><i></i><i></i><i class="vis-active"></i><i></i></div>
        <div class="vis-linked"><span></span><span></span><span></span><span></span></div>
      </div>`,
    "final-flow": `
      <div class="vis-try-finally">
        <div class="vis-try">try</div>
        <div class="vis-arrow-down"></div>
        <div class="vis-finally">finally ✓</div>
      </div>`,
    exception: `
      <div class="vis-exception">
        <div class="vis-checked">Checked → catch/throws</div>
        <div class="vis-unchecked">Unchecked → RuntimeException</div>
      </div>`,
    "string-build": `
      <div class="vis-string-build">
        <span class="vis-chunk">A</span><span class="vis-chunk">B</span><span class="vis-chunk vis-add">+ C</span>
        <div class="vis-result">StringBuilder</div>
      </div>`,
    hashmap: `
      <div class="vis-hashmap">
        <div class="vis-bucket"><span class="vis-key k1"></span></div>
        <div class="vis-bucket vis-collide"><span class="vis-key k2"></span><span class="vis-key k3"></span></div>
        <div class="vis-bucket"><span class="vis-key k4"></span></div>
      </div>`,
    interface: `
      <div class="vis-interface">
        <div class="vis-contract">«interface»</div>
        <div class="vis-impl vis-i1">Class A</div>
        <div class="vis-impl vis-i2">Class B</div>
      </div>`,
    gc: `
      <div class="vis-gc">
        <div class="vis-obj vis-alive"></div>
        <div class="vis-obj vis-alive"></div>
        <div class="vis-obj vis-dead"></div>
        <div class="vis-sweep">GC</div>
      </div>`,
    generics: `
      <div class="vis-generics">
        <div class="vis-compile">Compile: List&lt;String&gt;</div>
        <div class="vis-erasure">Runtime: List</div>
      </div>`,
    threads: `
      <div class="vis-threads">
        <div class="vis-thread t1"></div>
        <div class="vis-lock">🔒 synchronized</div>
        <div class="vis-thread t2"></div>
      </div>`,
    reflection: `
      <div class="vis-reflection">
        <div class="vis-class-box">Class</div>
        <div class="vis-scan">scan → invoke</div>
      </div>`,
    sort: `
      <div class="vis-sort">
        <div class="vis-bar b1"></div><div class="vis-bar b2"></div><div class="vis-bar b3"></div>
        <div class="vis-bar b4 vis-sorted"></div>
      </div>`,
    "kotlin-logo": `
      <div class="vis-kotlin">
        <div class="vis-k">K</div>
        <div class="vis-arrow">→ Android</div>
      </div>`,
    "val-var": `
      <div class="vis-val-var">
        <div class="vis-val">val 🔒</div>
        <div class="vis-var">var ↻</div>
      </div>`,
    sealed: `
      <div class="vis-sealed">
        <div class="vis-state s-loading">Loading</div>
        <div class="vis-state s-success">Success</div>
        <div class="vis-state s-error">Error</div>
      </div>`,
    coroutine: `
      <div class="vis-coroutine">
        <div class="vis-thread-pool">Thread pool</div>
        <div class="vis-co co1"></div>
        <div class="vis-co co2"></div>
        <div class="vis-co co3"></div>
        <div class="vis-suspend">suspend ⏸</div>
      </div>`,
    lazy: `
      <div class="vis-lazy">
        <div class="vis-touch">first access</div>
        <div class="vis-compute">compute…</div>
        <div class="vis-cached">cached ✓</div>
      </div>`,
    inline: `
      <div class="vis-inline">
        <div class="vis-call-site">call site</div>
        <div class="vis-expand">inline expand</div>
      </div>`,
    "null-safety": `
      <div class="vis-null">
        <div class="vis-chain">user?.profile?.name</div>
        <div class="vis-fallback">?: "Guest"</div>
      </div>`,
    scope: `
      <div class="vis-scope">
        <span>let</span><span>run</span><span>apply</span><span>also</span>
      </div>`,
    visibility: `
      <div class="vis-visibility">
        <div class="vis-module">module</div>
        <div class="vis-internal">internal</div>
        <div class="vis-public">public</div>
      </div>`,
    companion: `
      <div class="vis-companion">
        <div class="vis-outer">Class</div>
        <div class="vis-inner">companion object</div>
      </div>`,
    flow: `
      <div class="vis-flow">
        <div class="vis-emitter">emit</div>
        <div class="vis-stream">───●───●───▶</div>
        <div class="vis-collector">collect</div>
      </div>`,
    lifecycle: `
      <div class="vis-lifecycle">
        <span class="lc onCreate">onCreate</span>
        <span class="lc onStart">onStart</span>
        <span class="lc onResume active">onResume</span>
        <span class="lc onPause">onPause</span>
        <span class="lc onStop">onStop</span>
      </div>`,
    fragment: `
      <div class="vis-fragment">
        <div class="vis-activity">Activity</div>
        <div class="vis-frags"><span>F1</span><span>F2</span><span>F3</span></div>
      </div>`,
    mvvm: `
      <div class="vis-mvvm">
        <div class="vis-layer vis-view">View</div>
        <div class="vis-arrow">observe ↑</div>
        <div class="vis-layer vis-vm">ViewModel</div>
        <div class="vis-arrow">→</div>
        <div class="vis-layer vis-model">Repository</div>
      </div>`,
    compose: `
      <div class="vis-compose">
        <div class="vis-state">state</div>
        <div class="vis-recompose">@Composable recompose</div>
      </div>`,
    recycler: `
      <div class="vis-recycler">
        <div class="vis-pool">Recycled pool</div>
        <div class="vis-rows"><i></i><i class="vis-bind"></i><i></i></div>
      </div>`,
    room: `
      <div class="vis-room">
        <div class="vis-ui">UI</div>
        <div class="vis-dao">DAO</div>
        <div class="vis-sqlite">SQLite</div>
      </div>`,
    anr: `
      <div class="vis-anr">
        <div class="vis-main blocked">Main ⛔</div>
        <div class="vis-io free">IO ✓</div>
      </div>`,
    components: `
      <div class="vis-components">
        <span>Activity</span><span>Service</span><span>Receiver</span><span>Provider</span>
      </div>`,
    hilt: `
      <div class="vis-hilt">
        <div class="vis-graph">DI Graph</div>
        <div class="vis-inject">@Inject</div>
      </div>`,
    leak: `
      <div class="vis-leak">
        <div class="vis-activity">Activity ✕</div>
        <div class="vis-static-ref">static ref ⚠</div>
      </div>`,
    retrofit: `
      <div class="vis-retrofit">
        <div class="vis-api">Retrofit</div>
        <div class="vis-chain">Interceptor chain</div>
        <div class="vis-ok">OkHttp</div>
      </div>`,
    intent: `
      <div class="vis-intent">
        <div class="vis-src">App A</div>
        <div class="vis-intent-arrow">Intent →</div>
        <div class="vis-dst">Screen B</div>
      </div>`,
    workmanager: `
      <div class="vis-work">
        <div class="vis-queue">Queue</div>
        <div class="vis-worker">Worker</div>
        <div class="vis-done">✓</div>
      </div>`,
    fcm: `
      <div class="vis-fcm">
        <div class="vis-server">Server</div>
        <div class="vis-cloud">FCM</div>
        <div class="vis-device">Device</div>
      </div>`,
    r8: `
      <div class="vis-r8">
        <div class="vis-src-code">.jar</div>
        <div class="vis-shrink">R8 shrink</div>
        <div class="vis-apk">APK</div>
      </div>`,
    security: `
      <div class="vis-security">
        <div class="vis-lock">🔐 Keystore</div>
        <div class="vis-https">HTTPS</div>
      </div>`,
    testing: `
      <div class="vis-testing">
        <div class="vis-unit">Unit (many)</div>
        <div class="vis-ui">UI (few)</div>
      </div>`,
    offline: `
      <div class="vis-offline">
        <div class="vis-room-db">Room</div>
        <div class="vis-sync">sync ⇄</div>
        <div class="vis-api">API</div>
      </div>`,
    payment: `
      <div class="vis-payment">
        <div class="vis-app">App</div>
        <div class="vis-rzp">Razorpay</div>
        <div class="vis-server">Server verify ✓</div>
      </div>`,
    bloc: `
      <div class="vis-bloc">
        <div class="vis-event">Event</div>
        <div class="vis-bloc-box">BLoC</div>
        <div class="vis-state">State</div>
      </div>`,
    navigation: `
      <div class="vis-nav">
        <span class="vis-nav-a">A</span><span class="vis-nav-b">B</span><span class="vis-nav-c">C</span>
      </div>`,
    paging: `
      <div class="vis-paging">
        <div class="vis-page p1"></div><div class="vis-page p2"></div><div class="vis-page p3"></div>
      </div>`,
    "two-sum": `
      <div class="vis-two-sum">
        <div class="vis-nums"><span>2</span><span>7</span><span>11</span></div>
        <div class="vis-map">Map: 7→1</div>
        <div class="vis-target">target 9 ✓</div>
      </div>`,
    frequency: `
      <div class="vis-frequency">
        <span class="vis-char">a</span><span class="vis-char">b</span><span class="vis-char">a</span>
        <div class="vis-count">a:2 b:1</div>
      </div>`,
    sliding: `
      <div class="vis-sliding">
        <div class="vis-window"></div>
        <div class="vis-track">a b c d e f</div>
      </div>`,
    "binary-search": `
      <div class="vis-binary">
        <div class="vis-range vis-left"></div>
        <div class="vis-mid">mid</div>
        <div class="vis-range vis-right"></div>
      </div>`,
    "merge-interval": `
      <div class="vis-intervals">
        <div class="vis-int i1"></div>
        <div class="vis-int i2 vis-merge"></div>
        <div class="vis-int i3"></div>
      </div>`,
    "bfs-dfs": `
      <div class="vis-bfs-dfs">
        <div class="vis-node root">R</div>
        <div class="vis-level"><span></span><span></span></div>
      </div>`,
    "linked-list": `
      <div class="vis-linked-cycle">
        <span class="vis-node"></span><span class="vis-node"></span><span class="vis-node vis-cycle"></span>
      </div>`,
    stack: `
      <div class="vis-stack">
        <div class="vis-push">push (</div>
        <div class="vis-stack-box"></div>
        <div class="vis-pop">pop )</div>
      </div>`,
    deque: `
      <div class="vis-deque">
        <div class="vis-dq-window"></div>
        <div class="vis-dq-items">1 3 5 2 7</div>
      </div>`,
    dp: `
      <div class="vis-dp">
        <div class="vis-dp-cell c1">1</div>
        <div class="vis-dp-cell c2">2</div>
        <div class="vis-dp-cell c3">3</div>
      </div>`,
    tree: `
      <div class="vis-tree">
        <div class="vis-root"></div>
        <div class="vis-children"><span></span><span></span></div>
      </div>`,
    heap: `
      <div class="vis-heap">
        <div class="vis-heap-top">max</div>
        <div class="vis-heap-nodes"><span></span><span></span></div>
      </div>`,
    ssot: `
      <div class="vis-ssot">
        <div class="vis-repo">Repository</div>
        <div class="vis-ui1">UI</div>
        <div class="vis-ui2">UI</div>
      </div>`,
    idempotent: `
      <div class="vis-idempotent">
        <div class="vis-tap">tap ×2</div>
        <div class="vis-id">same orderId</div>
        <div class="vis-once">1 charge</div>
      </div>`,
    modules: `
      <div class="vis-modules">
        <div class="vis-feat">feature</div>
        <div class="vis-core">core</div>
      </div>`,
    cicd: `
      <div class="vis-cicd">
        <span>PR</span><span>→</span><span>CI</span><span>→</span><span>Play</span>
      </div>`,
    "system-design": `
      <div class="vis-system">
        <div class="vis-sd-ui">UI</div>
        <div class="vis-sd-api">API</div>
        <div class="vis-sd-db">DB/CDN</div>
      </div>`,
    "dsa-intro": `
      <div class="vis-dsa">
        <div class="vis-big-o">O(n) → O(log n)</div>
      </div>`,
    "arch-scale": `
      <div class="vis-scale">
        <div class="vis-team">teams</div>
        <div class="vis-modules-many"><span></span><span></span><span></span></div>
      </div>`,
    "android-misc": `
      <div class="vis-misc">
        <div class="vis-dp-unit">dp/sp</div>
        <div class="vis-screen"></div>
      </div>`,
    apk: `
      <div class="vis-apk-aab">
        <div class="vis-aab">AAB</div>
        <div class="vis-split">→ APK splits</div>
      </div>`,
    "default-java": `<div class="vis-default"><i class="fa-brands fa-java"></i><div class="vis-pulse-ring"></div></div>`,
    "default-kotlin": `<div class="vis-default"><span class="vis-k-big">K</span><div class="vis-pulse-ring"></div></div>`,
    "default-android": `<div class="vis-default"><i class="fa-brands fa-android"></i><div class="vis-pulse-ring"></div></div>`,
    "default-dsa": `<div class="vis-default"><i class="fa-solid fa-chart-line"></i><div class="vis-pulse-ring"></div></div>`,
    "default-arch": `<div class="vis-default"><i class="fa-solid fa-sitemap"></i><div class="vis-pulse-ring"></div></div>`,
  };

  const LABELS = {
    equals: "Reference (==) vs content (.equals())",
    oop: "Four OOP pillars",
    "array-list": "Array vs linked structure",
    "final-flow": "try → finally flow",
    exception: "Checked vs unchecked",
    "string-build": "Building strings efficiently",
    hashmap: "Buckets & collisions",
    interface: "Interface → implementations",
    gc: "Unreachable objects collected",
    generics: "Compile-time → erasure",
    threads: "Thread synchronization",
    reflection: "Runtime class inspection",
    sort: "Ordering elements",
    "kotlin-logo": "Kotlin → Android",
    "val-var": "val locked vs var mutable",
    sealed: "Sealed UI states",
    coroutine: "Lightweight tasks on thread pool",
    lazy: "Compute on first access",
    inline: "Inline at call site",
    "null-safety": "Safe calls & Elvis",
    scope: "Scope functions",
    visibility: "Visibility layers",
    companion: "Companion object",
    flow: "Cold/hot stream flow",
    lifecycle: "Activity lifecycle",
    fragment: "Fragments inside Activity",
    mvvm: "MVVM data flow",
    compose: "State → recomposition",
    recycler: "View recycling",
    room: "UI → DAO → SQLite",
    anr: "Keep main thread free",
    components: "Android components",
    hilt: "Dependency injection",
    leak: "Avoid memory leaks",
    retrofit: "Retrofit + OkHttp",
    intent: "Intent navigation",
    workmanager: "Background work queue",
    fcm: "Push notification path",
    r8: "Shrink & obfuscate",
    security: "Secure storage & transport",
    testing: "Test pyramid",
    offline: "Offline-first sync",
    payment: "Payment verification flow",
    bloc: "Event → State (BLoC)",
    navigation: "Navigation graph",
    paging: "Paged loading",
    "two-sum": "HashMap complement lookup",
    frequency: "Character frequency",
    sliding: "Sliding window",
    "binary-search": "Binary search halves",
    "merge-interval": "Merge overlapping intervals",
    "bfs-dfs": "Tree/graph traversal",
    "linked-list": "Linked list nodes",
    stack: "Stack push/pop",
    deque: "Monotonic deque window",
    dp: "DP building solutions",
    tree: "Tree structure",
    heap: "Top-K with heap",
    ssot: "Single source of truth",
    idempotent: "Idempotent payment",
    modules: "Feature → core modules",
    cicd: "CI/CD pipeline",
    "system-design": "System layers",
    "dsa-intro": "Complexity improvement",
    "arch-scale": "Scale with modules",
    "android-misc": "Android units & config",
    apk: "AAB to device APKs",
    "default-java": "Java concept",
    "default-kotlin": "Kotlin concept",
    "default-android": "Android concept",
    "default-dsa": "DSA pattern",
    "default-arch": "Architecture pattern",
  };

  const TEACHING_OVERRIDES = {
    mvvm: {
      diagram: "User action\n   |\n   v\nView/Compose -> ViewModel -> UseCase/Repository -> API/Room\n   ^              |\n   |              v\n   +--------- StateFlow/LiveData",
      analogy: "Think of MVVM like a restaurant: View is the waiter, ViewModel is the order manager, Repository is the kitchen/store room. The waiter should not cook food; the View should not contain business logic.",
      mistakes: ["Putting API calls directly in Activity/Fragment", "Exposing MutableStateFlow to the UI", "Holding Activity context inside ViewModel"],
      example: "class OrdersViewModel(\n    private val repo: OrdersRepository\n) : ViewModel() {\n    private val _state = MutableStateFlow<UiState>(UiState.Loading)\n    val state: StateFlow<UiState> = _state\n\n    fun loadOrders() = viewModelScope.launch {\n        _state.value = UiState.Success(repo.getOrders())\n    }\n}",
      storyboard: ["User taps refresh", "ViewModel starts coroutine", "Repository loads cache/API", "ViewModel emits UiState", "UI re-renders"],
    },
    coroutine: {
      diagram: "Main thread:  UI work only\n              |\n              | launch\n              v\nCoroutine ---- suspend ---- resumes later\n              |\n              v\nIO thread: network / Room / file",
      analogy: "A coroutine is like ordering tea at a counter: you do not block the counter while tea is prepared. You step aside, and the counter serves others until your tea is ready.",
      mistakes: ["Using GlobalScope for screen work", "Doing blocking calls on Dispatchers.Main", "Forgetting cancellation and error handling"],
      example: "viewModelScope.launch {\n    _state.value = UiState.Loading\n    val result = withContext(Dispatchers.IO) {\n        repository.fetchProfile()\n    }\n    _state.value = UiState.Success(result)\n}",
      storyboard: ["Launch in viewModelScope", "Switch to IO dispatcher", "Suspend during network wait", "Resume with result", "Update UI state on Main"],
    },
    hashmap: {
      diagram: "key -> hashCode() -> bucket index\n                     |\n                     v\n            [bucket] -> equals() check -> value",
      analogy: "HashMap is like a hotel key rack. The room number takes you close to the key, but the label confirms the exact key.",
      mistakes: ["Overriding equals() without hashCode()", "Using mutable objects as keys", "Assuming HashMap keeps insertion order"],
      example: "data class UserKey(val id: String)\n\nval cache = HashMap<UserKey, User>()\ncache[UserKey(\"42\")] = user\nval sameUser = cache[UserKey(\"42\")]",
      storyboard: ["Calculate hash", "Jump to bucket", "Handle collision if present", "Use equals() to confirm key", "Return value"],
    },
    lifecycle: {
      diagram: "onCreate -> onStart -> onResume\n   ^                       |\n   |                       v\nonDestroy <- onStop <- onPause",
      analogy: "Activity lifecycle is like a shop: created, opened, serving customers, paused for interruption, closed, and finally destroyed.",
      mistakes: ["Starting camera/location in onCreate and never stopping", "Saving important state only in fields", "Ignoring process death"],
      example: "override fun onStart() {\n    super.onStart()\n    locationClient.start()\n}\n\noverride fun onStop() {\n    locationClient.stop()\n    super.onStop()\n}",
      storyboard: ["Activity is created", "UI becomes visible", "User interacts", "Another screen covers it", "Release heavy resources"],
    },
    payment: {
      diagram: "App -> Server: create order\nApp -> Razorpay: checkout(orderId)\nRazorpay -> App: paymentId/signature\nApp -> Server: verify signature\nServer -> App: success/failure",
      analogy: "Payment flow is like a bank cheque: the customer shows a receipt, but the shop confirms it with the bank before marking the order paid.",
      mistakes: ["Trusting client callback without server verification", "Creating duplicate orders on retry", "Not handling cancelled/failed callbacks"],
      example: "fun onPaymentSuccess(paymentId: String, signature: String) {\n    viewModelScope.launch {\n        val verified = repo.verifyPayment(paymentId, signature)\n        _state.value = if (verified) Paid else PaymentFailed\n    }\n}",
      storyboard: ["Create order on backend", "Open checkout UI", "Receive callback", "Verify on server", "Show final state"],
    },
    "two-sum": {
      diagram: "nums:  [2, 7, 11]\ntarget: 9\nfor 2 -> need 7\nmap has 7? no -> store 2\nfor 7 -> need 2\nmap has 2? yes -> answer",
      analogy: "Two Sum is like finding two grocery items that exactly match your budget. You remember previous prices so you do not re-check everything.",
      mistakes: ["Using nested loops when O(n) is expected", "Storing after checking in the wrong order for same index", "Returning values instead of indices when interviewer asks indices"],
      example: "fun twoSum(nums: IntArray, target: Int): IntArray {\n    val seen = HashMap<Int, Int>()\n    nums.forEachIndexed { i, n ->\n        seen[target - n]?.let { return intArrayOf(it, i) }\n        seen[n] = i\n    }\n    return intArrayOf()\n}",
      storyboard: ["Read current number", "Calculate complement", "Check HashMap", "Return pair if found", "Otherwise store current"],
    },
    "binary-search": {
      diagram: "low -------- mid -------- high\nif target < mid: keep left half\nif target > mid: keep right half",
      analogy: "Binary search is like opening a dictionary near the middle and repeatedly throwing away the half that cannot contain the word.",
      mistakes: ["Using binary search on unsorted/non-monotonic data", "Wrong loop condition causing infinite loop", "mid = (low + high) / 2 overflow in some languages"],
      example: "fun binarySearch(a: IntArray, target: Int): Int {\n    var l = 0; var r = a.lastIndex\n    while (l <= r) {\n        val mid = l + (r - l) / 2\n        when {\n            a[mid] == target -> return mid\n            a[mid] < target -> l = mid + 1\n            else -> r = mid - 1\n        }\n    }\n    return -1\n}",
      storyboard: ["Pick middle", "Compare target", "Discard half", "Repeat", "Return index or -1"],
    },
    flow: {
      diagram: "Repository emits Flow\n        |\n        v\nViewModel stateIn/shareIn\n        |\n        v\nUI collectWithLifecycle",
      analogy: "Flow is like a water pipeline: data comes when collected, and operators are filters attached to the pipe.",
      mistakes: ["Collecting Flow without lifecycle awareness", "Using StateFlow for one-time navigation events", "Forgetting catch/retry around network streams"],
      example: "val uiState = repository.observeOrders()\n    .map { orders -> UiState.Success(orders) }\n    .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5000), UiState.Loading)",
      storyboard: ["Repository creates stream", "Operators transform data", "ViewModel exposes state", "UI collects", "Lifecycle stops collection safely"],
    },
    room: {
      diagram: "Entity <-> DAO <-> RoomDatabase <-> SQLite\n   ^                              |\n   +--------- Flow<List<T>> -------+",
      analogy: "Room is like a librarian: you ask through DAO methods, and the librarian safely reads/writes the SQLite shelves.",
      mistakes: ["Running DB work on main thread", "Changing schema without migration", "Putting business logic inside DAO"],
      example: "@Dao\ninterface OrderDao {\n    @Query(\"SELECT * FROM orders ORDER BY createdAt DESC\")\n    fun observeOrders(): Flow<List<OrderEntity>>\n}",
      storyboard: ["Define Entity", "Write DAO query", "Room validates SQL", "Repository observes Flow", "UI updates from database"],
    },
  };

  const CATEGORY_TEACHING = {
    java: {
      diagram: "Input object -> method/collection -> behavior\n       |              |\n       v              v\n equals/hash/thread  correctness",
      analogy: "Java concepts are like the engine parts under Android. Users do not see them, but if they are wrong the app overheats.",
      mistakes: ["Memorizing definitions without practical examples", "Ignoring equals/hashCode contracts", "Forgetting thread-safety and memory implications"],
      example: "val names = listOf(\"A\", \"B\")\nval unique = names.toSet()\nprintln(unique.contains(\"A\"))",
      storyboard: ["Identify concept", "State contract", "Show Android use", "Mention trade-off", "Give safe practice"],
    },
    kotlin: {
      diagram: "Kotlin feature -> safer syntax -> cleaner Android code\n      |                 |              |\n null safety       coroutines      data/sealed",
      analogy: "Kotlin is like a smart assistant in the IDE: it prevents many mistakes before the app reaches production.",
      mistakes: ["Overusing !!", "Using GlobalScope", "Making everything mutable with var"],
      example: "data class User(val id: String, val name: String)\nval displayName = user.name.ifBlank { \"Guest\" }",
      storyboard: ["Pick Kotlin feature", "Explain safety/productivity", "Show Android pattern", "Warn about misuse", "Give concise code"],
    },
    android: {
      diagram: "User -> UI -> ViewModel -> Repository -> API/DB\n  ^                                      |\n  +--------------- state ----------------+",
      analogy: "An Android app is like a delivery system: UI takes the order, ViewModel coordinates, Repository talks to warehouse/API.",
      mistakes: ["Putting all logic in Activity", "Blocking main thread", "Ignoring lifecycle/process death"],
      example: "lifecycleScope.launch {\n    repeatOnLifecycle(Lifecycle.State.STARTED) {\n        viewModel.state.collect { render(it) }\n    }\n}",
      storyboard: ["User action", "UI delegates", "ViewModel updates state", "Data layer responds", "UI renders result"],
    },
    dsa: {
      diagram: "Problem -> pattern -> data structure -> complexity\n             |          |             |\n          TwoSum     HashMap        O(n)",
      analogy: "DSA is like choosing the right vehicle: bicycle for short paths, truck for heavy data, train for repeated route.",
      mistakes: ["Jumping to code without clarifying input/output", "Not explaining complexity", "Ignoring edge cases"],
      example: "fun isEmptyList(items: List<Int>?) = items.isNullOrEmpty()",
      storyboard: ["Clarify input/output", "Start brute force", "Pick pattern", "Optimize", "Discuss complexity"],
    },
    architecture: {
      diagram: "Feature module -> Domain contract -> Data implementation\n       |                 |                 |\n      UI              UseCase          API/Room",
      analogy: "Architecture is like city planning: roads, zones, and rules make the city scalable instead of chaotic.",
      mistakes: ["Creating modules without boundaries", "Skipping observability/testing", "Adding abstractions with no purpose"],
      example: "interface OrdersRepository {\n    fun observeOrders(): Flow<List<Order>>\n    suspend fun syncOrders()\n}",
      storyboard: ["Clarify constraints", "Choose boundaries", "Define data flow", "Plan testing/monitoring", "Explain trade-offs"],
    },
  };

  function getTeaching(type, categoryId) {
    return TEACHING_OVERRIDES[type] || CATEGORY_TEACHING[categoryId] || CATEGORY_TEACHING.android;
  }

  function renderList(items) {
    return items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  }

  function renderStoryboard(steps) {
    return steps
      .map((step, index) => `
        <li>
          <span>${index + 1}</span>
          <p>${escapeHtml(step)}</p>
        </li>
      `)
      .join("");
  }

  function renderTeachingPanel(type, categoryId) {
    const teaching = getTeaching(type, categoryId);
    return `
      <div class="iqa-visual-teaching">
        <div class="iqa-teach-card iqa-diagram-card">
          <h5><i class="fa-solid fa-diagram-project"></i> ASCII diagram</h5>
          <pre>${escapeHtml(teaching.diagram)}</pre>
        </div>
        <div class="iqa-teach-card">
          <h5><i class="fa-solid fa-earth-asia"></i> Real-world analogy</h5>
          <p>${escapeHtml(teaching.analogy)}</p>
        </div>
        <div class="iqa-teach-card">
          <h5><i class="fa-solid fa-triangle-exclamation"></i> Common mistakes</h5>
          <ul>${renderList(teaching.mistakes)}</ul>
        </div>
        <div class="iqa-teach-card">
          <h5><i class="fa-solid fa-code"></i> Kotlin example</h5>
          <pre><code>${escapeHtml(teaching.example)}</code></pre>
        </div>
        <div class="iqa-teach-card iqa-story-card">
          <h5><i class="fa-solid fa-film"></i> Step-by-step animation storyboard</h5>
          <ol>${renderStoryboard(teaching.storyboard)}</ol>
        </div>
      </div>`;
  }

  function renderVisual(q, categoryId) {
    const type = resolveVisualType(q, categoryId);
    const stage = VISUALS[type] || VISUALS["default-android"];
    const label = LABELS[type] || "Concept visual";
    return `
      <div class="iqa-visual" data-visual="${type}">
        <div class="iqa-visual-head">
          <i class="fa-solid fa-circle-play"></i>
          <span>Animated visual</span>
          <small>${escapeHtml(label)}</small>
        </div>
        <div class="vis-stage vis-play">${stage}</div>
        ${renderTeachingPanel(type, categoryId)}
      </div>`;
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  let animationsBound = false;

  function playItemAnimation(details) {
    const stage = details.querySelector(".vis-stage");
    if (stage) {
      stage.classList.remove("vis-play");
      void stage.offsetWidth;
      stage.classList.add("vis-play");
    }
    details.querySelectorAll(".iqa-text p").forEach((p, i) => {
      p.style.animationDelay = `${0.08 * i}s`;
      p.classList.add("iqa-para-in");
    });
  }

  function stopItemAnimation(details) {
    const stage = details.querySelector(".vis-stage");
    if (stage) stage.classList.remove("vis-play");
    details.querySelectorAll(".iqa-para-in").forEach((p) => {
      p.classList.remove("iqa-para-in");
      p.style.animationDelay = "";
    });
  }

  function bindVisualAnimations(root) {
    if (!root || animationsBound) return;
    animationsBound = true;

    root.addEventListener(
      "toggle",
      (e) => {
        const details = e.target;
        if (!details.classList?.contains("iqa-item")) return;
        if (details.open) playItemAnimation(details);
        else stopItemAnimation(details);
      },
      true
    );
  }

  global.InterviewVisuals = {
    renderVisual,
    bindVisualAnimations,
    playItemAnimation,
    resolveVisualType,
  };
})(typeof window !== "undefined" ? window : global);
