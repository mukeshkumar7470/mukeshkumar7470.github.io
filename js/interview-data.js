/* Interview Q&A — Java, Kotlin, Android, DSA, Senior Architecture */
const INTERVIEW_QA = [
  {
    "id": "java",
    "label": "Java",
    "icon": "fa-brands fa-java",
    "items": [
      {
        "q": "Difference between == and .equals()?",
        "en": "== compares references for objects (values for primitives). .equals() compares logical equality when overridden. For strings use .equals() or Objects.equals().",
        "hi": "== object ka memory address compare karta hai; .equals() content compare karta hai jab override ho. String par hamesha .equals() use karo."
      },
      {
        "q": "Explain OOP pillars with Android relevance",
        "en": "Encapsulation hides state; inheritance reuses code; polymorphism is one interface many implementations; abstraction exposes essentials. Android uses listeners, AppCompatActivity, and private ViewModel fields.",
        "hi": "Encapsulation data protect; inheritance Activity extend; polymorphism RecyclerView adapters; abstraction interfaces/DAO. Modern Android mein composition zyada prefer."
      },
      {
        "q": "ArrayList vs LinkedList",
        "en": "ArrayList: array-backed, O(1) random access, slower middle insert. LinkedList: fast ends insert, slow random access. Android lists usually ArrayList.",
        "hi": "ArrayList index fast; LinkedList middle insert better par get slow. App mein zyada tar ArrayList/List."
      },
      {
        "q": "final, finally, and finalize()",
        "en": "final restricts variable/method/class. finally runs after try/catch for cleanup. finalize() is deprecated; use try-with-resources.",
        "hi": "final change band; finally cleanup; finalize GC ke liye unreliable — try-with-resources better."
      },
      {
        "q": "Checked vs Unchecked exceptions",
        "en": "Checked must be caught/declared (IOException). Unchecked extend RuntimeException (NPE). Kotlin/Android often use Result/sealed errors.",
        "hi": "Checked compile force catch; Unchecked bugs/logic errors. Android mein runtime + Result patterns common."
      },
      {
        "q": "String vs StringBuilder vs StringBuffer",
        "en": "String immutable. StringBuilder mutable, not thread-safe, faster. StringBuffer mutable, synchronized, slower.",
        "hi": "Loop concat ke liye StringBuilder; String har bar naya object. StringBuffer thread-safe rare use."
      },
      {
        "q": "HashMap internal working (brief)",
        "en": "Hash code maps to buckets; collisions use list/tree. O(1) average get/put. Proper hashCode() and equals() required.",
        "hi": "hashCode bucket decide; collision par list/tree. Galat hashCode sab ek bucket — slow."
      },
      {
        "q": "Interface vs Abstract class",
        "en": "Interface defines contract with default methods. Abstract class can have state and constructors. Prefer interface for capabilities.",
        "hi": "Interface can-do; abstract class shared state. Android listeners interface; composition over deep inheritance."
      },
      {
        "q": "What is garbage collection?",
        "en": "GC frees unreachable objects. Prevent leaks via reference management; do not rely on System.gc() in production.",
        "hi": "Reachable objects survive; leak jab reference unnecessary reh jaye. Android onTrimMemory low memory par."
      },
      {
        "q": "Java generics and type erasure",
        "en": "Generics give compile-time safety; erasure removes type info at runtime. Cannot new T() in Java without workarounds.",
        "hi": "Compile time type check; runtime par List<String> -> List. PECS: ? extends / ? super."
      },
      {
        "q": "synchronized vs volatile",
        "en": "synchronized: mutual exclusion + visibility. volatile: visibility only, not atomic compound ops. Prefer AtomicInteger or coroutines.",
        "hi": "synchronized ek thread block; volatile visibility — count++ safe nahi. Coroutines/Atomic better."
      },
      {
        "q": "Reflection — pros and cons",
        "en": "Runtime class inspection (Gson, Hilt). Cons: slow, ProGuard issues. Use keep rules for reflective libs.",
        "hi": "Frameworks use reflection; app code mein kam. R8 rules zaroori."
      },
      {
        "q": "Comparable vs Comparator",
        "en": "Comparable natural ordering (compareTo). Comparator external custom sort without changing class.",
        "hi": "Comparable default sort; Comparator alag orders. Kotlin sortedBy/compareBy."
      }
    ]
  },
  {
    "id": "kotlin",
    "label": "Kotlin",
    "icon": "fa-solid fa-code",
    "items": [
      {
        "q": "Why Kotlin over Java for Android?",
        "en": "Null safety, concision, coroutines, data classes, extensions, official Android support, Java interop.",
        "hi": "NPE kam, coroutines async, data class copy/equals free. Java code saath chal sakta hai migration mein."
      },
      {
        "q": "val vs var vs const",
        "en": "var mutable reference; val read-only reference (object may mutate); const compile-time constant.",
        "hi": "val reassign nahi; andar list mutate ho sakti hai. const top-level primitives/strings."
      },
      {
        "q": "data class, sealed class, object",
        "en": "data class: equals/hashCode/copy. sealed: exhaustive when for UI state. object: singleton.",
        "hi": "sealed UI state Loading/Success/Error; data class API models; object singleton/factory."
      },
      {
        "q": "What are coroutines vs threads?",
        "en": "Lightweight cooperative tasks; suspend without blocking threads. Use viewModelScope and dispatchers Main/IO/Default.",
        "hi": "Thread heavy; coroutine suspend se pool efficient. Structured concurrency — parent cancel child cancel."
      },
      {
        "q": "lateinit vs lazy",
        "en": "lateinit var initialized later (onCreate). lazy defers until first access. Avoid lateinit if not surely set.",
        "hi": "lateinit var baad mein set; lazy pehli access par compute. UninitializedPropertyAccessException risk."
      },
      {
        "q": "inline, reified, higher-order functions",
        "en": "inline copies body to avoid lambda allocation. reified keeps generic type at compile time with inline.",
        "hi": "Generics erase Java style; reified T::class possible. Performance + type checks."
      },
      {
        "q": "Null safety: ?, ?., ?:, !!",
        "en": "Nullable types, safe call, Elvis default, !! forces NPE — avoid !! in production.",
        "hi": "?. null par skip; ?: default; !! sirf jab 100% sure. Java interop platform types careful."
      },
      {
        "q": "let, run, with, apply, also",
        "en": "let(it, result); run/apply(this); with(this); also(it, returns object). apply for config, let for null checks.",
        "hi": "Scope functions concise; zyada mat use karo — readability first."
      },
      {
        "q": "open, public, internal visibility",
        "en": "Classes final by default; open for inheritance. internal is module-visible only.",
        "hi": "Kotlin default final; internal multi-module hide implementation."
      },
      {
        "q": "companion object and @JvmStatic",
        "en": "Companion is class-scoped singleton. @JvmStatic exposes true static methods to Java.",
        "hi": "Java static jaisa factory/constants; interop ke liye JvmStatic."
      },
      {
        "q": "Flow vs LiveData vs RxJava",
        "en": "Flow: coroutine streams with operators. LiveData: lifecycle-aware. RxJava powerful but verbose; many apps use Flow now.",
        "hi": "StateFlow UI state; SharedFlow one-time events; LiveData simple legacy UI."
      },
      {
        "q": "suspend function under the hood",
        "en": "Compiler CPS state machine; thread freed at suspension; resumes on correct dispatcher.",
        "hi": "suspend = callback transform; withContext dispatcher switch."
      },
      {
        "q": "init block vs constructors",
        "en": "Primary constructor in header; init for setup; secondary must delegate this(). Prefer defaults over many constructors.",
        "hi": "init validation; default params ek constructor enough."
      },
      {
        "q": "enum class vs sealed class for UI state",
        "en": "enum fixed constants; sealed carries per-state data and exhaustive when.",
        "hi": "Error(message) sealed mein easy; BLoC/MVVM state machines ke liye sealed best."
      },
      {
        "q": "Delegation: by lazy, class delegation",
        "en": "by lazy deferred init; class delegation implements interface by forwarding.",
        "hi": "by viewModels() delegation; interface Repo by impl forward."
      },
      {
        "q": "Platform types from Java",
        "en": "Java without nullability becomes String! — treat as nullable defensively.",
        "hi": "Android SDK Java APIs par safe call ya null check."
      }
    ]
  },
  {
    "id": "android",
    "label": "Android",
    "icon": "fa-brands fa-android",
    "items": [
      {
        "q": "Activity lifecycle (brief)",
        "en": "onCreate→onStart→onResume (interactive)→onPause→onStop→onDestroy. Save state in ViewModel/SavedStateHandle.",
        "hi": "Rotation par recreate; ViewModel config change survive karta hai process death alag."
      },
      {
        "q": "Activity vs Fragment",
        "en": "Activity is screen entry; Fragment reusable inside activity. Prefer single-activity + Navigation.",
        "hi": "Fragment tabs/bottom nav; single-activity scalable pattern."
      },
      {
        "q": "Explain MVVM in Android",
        "en": "Model=data/repo; View=UI; ViewModel survives rotation, exposes StateFlow/LiveData. No business logic in View.",
        "hi": "Repository SSOT; ViewModel API trigger; View observe only."
      },
      {
        "q": "LiveData vs StateFlow / SharedFlow",
        "en": "LiveData lifecycle-aware. StateFlow always has value. SharedFlow for one-time events (navigation/toast).",
        "hi": "State replay navigation bug avoid — events alag channel."
      },
      {
        "q": "Jetpack Compose vs XML",
        "en": "Compose declarative UI as functions of state. XML imperative layouts. Compose recommended for new UI.",
        "hi": "Recomposition state change par; remember/mutableStateOf."
      },
      {
        "q": "How does RecyclerView work?",
        "en": "ViewHolder recycles views; LayoutManager positions; DiffUtil for efficient updates.",
        "hi": "notifyDataSetChanged slow; ListAdapter+DiffUtil preferred."
      },
      {
        "q": "Explain Room Database",
        "en": "SQLite abstraction: Entity, Dao, Database. Flow support, migrations, compile-time SQL checks.",
        "hi": "Offline cache; Repository Room+network combine."
      },
      {
        "q": "What is ANR and how to avoid?",
        "en": "Main thread blocked ~5s. Use IO dispatcher, WorkManager, optimize UI work.",
        "hi": "Network/DB main thread par mat karo; StrictMode debug help."
      },
      {
        "q": "Four Android app components",
        "en": "Activity, Service, BroadcastReceiver, ContentProvider. Intents for navigation; WorkManager for deferrable work.",
        "hi": "Foreground service notification mandatory; background limits Android 8+."
      },
      {
        "q": "Dagger Hilt — why use it?",
        "en": "DI with scoped dependencies Singleton/ViewModel; easier testing with fake modules.",
        "hi": "Constructor @Inject; wrong scope leak/crash."
      },
      {
        "q": "Memory leaks — common causes",
        "en": "Static Activity ref, listeners not removed, coroutines without scope. Use viewModelScope, lifecycle-aware APIs.",
        "hi": "LeakCanary debug; Handler delayed message leak classic."
      },
      {
        "q": "Architecture layers UI to Data",
        "en": "UI→ViewModel→(UseCase)→Repository→API/Room. Dependencies point inward.",
        "hi": "Clean Architecture testable domain; aapke CV pattern match."
      },
      {
        "q": "Retrofit + OkHttp together",
        "en": "Retrofit maps API interfaces; OkHttp executes HTTP, interceptors, timeouts, logging.",
        "hi": "Auth interceptor chain; suspend Retrofit functions."
      },
      {
        "q": "ViewBinding vs DataBinding",
        "en": "ViewBinding type-safe views. DataBinding also binds observables in XML — heavier.",
        "hi": "findViewById avoid; Compose age par kam binding."
      },
      {
        "q": "Intent, PendingIntent, deep links",
        "en": "Intent starts/shares; PendingIntent for notifications/alarms; App Links verified URLs.",
        "hi": "Notification tap PendingIntent; Dynamic Links specific screen."
      },
      {
        "q": "Foreground vs Background services",
        "en": "Background restricted; use WorkManager or FGS with visible notification and declared type.",
        "hi": "GPS tracking FGS location type; battery policy follow."
      },
      {
        "q": "What is WorkManager?",
        "en": "Guaranteed deferrable background work with constraints; survives restarts.",
        "hi": "Sync queue; periodic cleanup; FCM background work enqueue."
      },
      {
        "q": "FCM push notification flow",
        "en": "Token to server; server sends FCM; FirebaseMessagingService handles. Channels Android 8+; permission Android 13+.",
        "hi": "Data vs notification message; token refresh server update."
      },
      {
        "q": "ProGuard / R8",
        "en": "Shrink, obfuscate, optimize APK. Keep rules for Gson/Retrofit/Hilt. Test release minify.",
        "hi": "Missing keep rules → Gson crash; mapping file deobfuscate."
      },
      {
        "q": "Security — storing tokens",
        "en": "EncryptedSharedPreferences/Keystore; HTTPS; no plain secrets in APK; verify payments server-side.",
        "hi": "Razorpay server verify mandatory; root par data risk."
      },
      {
        "q": "Unit vs Instrumentation tests",
        "en": "Unit: JVM ViewModel/repo with mocks. Instrumentation: device UI Espresso/Compose test.",
        "hi": "Pyramid — zyada unit, kam UI; runTest coroutines."
      },
      {
        "q": "DiffUtil and ListAdapter",
        "en": "DiffUtil minimal list updates; ListAdapter wraps DiffUtil in Adapter.",
        "hi": "areItemsSame/areContentsSame implement karo."
      },
      {
        "q": "Process death and state restoration",
        "en": "System kills process; use SavedStateHandle, persistence, not static Activity fields.",
        "hi": "ViewModel bhi process death par clear; Room important data."
      },
      {
        "q": "SharedPreferences vs DataStore",
        "en": "DataStore async and safer; SharedPreferences sync pitfalls. Encrypted for secrets.",
        "hi": "Preferences DataStore migration; sensitive Keystore."
      },
      {
        "q": "Navigation Component benefits",
        "en": "Nav graph, Safe Args, deep links, consistent back stack. Navigation Compose available.",
        "hi": "Manual FragmentTransaction bugs kam; go_router Flutter parallel."
      },
      {
        "q": "Razorpay payment integration (high level)",
        "en": "Server creates order; client checkout; verify signature on server; handle failure/retry.",
        "hi": "Client-only trust mat karo; activity recreate state handle."
      },
      {
        "q": "BLoC vs MVVM",
        "en": "BLoC: events in, states out via streams. MVVM: ViewModel observables. Both separate UI logic.",
        "hi": "Flutter BLoC; Android MVVM+StateFlow similar goals."
      },
      {
        "q": "Offline-first architecture",
        "en": "Show Room cache first; background sync; conflict policy defined. SK Agent offline cart example.",
        "hi": "UI local Flow observe; network update DB → UI refresh."
      },
      {
        "q": "Android 13+ notification permission",
        "en": "POST_NOTIFICATIONS runtime permission; request in context; handle denial.",
        "hi": "Promotional vs transactional channels alag strategy."
      },
      {
        "q": "Compose recomposition — avoid pitfalls",
        "en": "Avoid heavy work in composable; use remember, derivedStateOf, stable keys in LazyColumn.",
        "hi": "State hoist; immutable state single source."
      },
      {
        "q": "System design: e-commerce module",
        "en": "Modules auth/catalog/cart/checkout; Repository; Paging; Razorpay server verify; FCM order status; offline cart policy.",
        "hi": "Zila jaisa break karo; non-functional latency/error states bolo."
      },
      {
        "q": "APK vs AAB?",
        "en": "AAB is Play upload format; Play serves optimized split APKs per device.",
        "hi": "Chhota user download; mandatory Play upload format."
      },
      {
        "q": "dp vs px?",
        "en": "dp density-independent; px physical pixels. Always use dp/sp in UI.",
        "hi": "Different screens consistent size — dp use."
      },
      {
        "q": "Context types",
        "en": "Application Context long-lived; Activity Context themed for UI. Avoid Activity leak in singletons.",
        "hi": "Singleton mein ApplicationContext careful — UI theme nahi."
      },
      {
        "q": "Activity launchMode",
        "en": "standard, singleTop, singleTask, singleInstance control back stack and duplicates.",
        "hi": "Deep link duplicate activity fix singleTop/Task."
      },
      {
        "q": "Gradle product flavors",
        "en": "productFlavors dev/prod; buildTypes debug/release; different API URLs per flavor.",
        "hi": "BuildConfig BASE_URL alag environment."
      }
    ]
  },
  {
    "id": "dsa",
    "label": "DSA for Android",
    "icon": "fa-solid fa-chart-line",
    "items": [
      {
        "q": "Why DSA for Android interviews?",
        "en": "Efficient lists, search, caching; Easy-Medium LeetCode plus Android context in answers.",
        "hi": "O(n) vs O(n²) samajhna — badi list/filter ke liye zaroori."
      },
      {
        "q": "Two Sum approach",
        "en": "HashMap complement target-num; one pass O(n) time O(n) space.",
        "hi": "map[value]=index; brute O(n²) pehle bolo phir optimize."
      },
      {
        "q": "Valid Anagram / frequency counting",
        "en": "Count chars int[26] or HashMap; compare O(n).",
        "hi": "Frequency pattern common — groupBy Kotlin."
      },
      {
        "q": "Sliding window — longest unique substring",
        "en": "Two pointers + set/map last index; O(n).",
        "hi": "Fixed vs variable window templates yaad karo."
      },
      {
        "q": "Binary search — when applicable",
        "en": "Sorted array O(log n); find first/last, rotated array variants.",
        "hi": "mid = left+(right-left)/2; monotonic property dhundho."
      },
      {
        "q": "Merge intervals",
        "en": "Sort by start; merge overlapping O(n log n).",
        "hi": "Booking slots overlap same pattern."
      },
      {
        "q": "BFS vs DFS use cases",
        "en": "BFS shortest unweighted; DFS paths/cycles. O(V+E).",
        "hi": "BFS level-order; DFS dependencies topological sort."
      },
      {
        "q": "Cycle in linked list",
        "en": "Floyd tortoise hare; O(1) space.",
        "hi": "Slow 1x fast 2x — cycle mein meet."
      },
      {
        "q": "Reverse linked list iterative",
        "en": "prev curr next pointers O(n) O(1) space.",
        "hi": "Pointer practice basic interview."
      },
      {
        "q": "Valid parentheses with stack",
        "en": "Push open; pop match close; end empty stack.",
        "hi": "Stack undo/navigation analogy."
      },
      {
        "q": "Sliding window maximum (deque)",
        "en": "Monotonic deque indices; amortized O(n).",
        "hi": "Hard pattern — decreasing deque maintain."
      },
      {
        "q": "Group anagrams HashMap",
        "en": "Key sorted string or freq signature; group lists.",
        "hi": "Custom key design skill."
      },
      {
        "q": "DP climbing stairs / Fibonacci",
        "en": "dp[i]=dp[i-1]+dp[i-2]; optimize two vars O(1) space.",
        "hi": "Overlapping subproblems + optimal substructure pehchano."
      },
      {
        "q": "Tree max depth",
        "en": "Recursive 1+max(left,right) DFS O(n).",
        "hi": "ViewGroup hierarchy analogy."
      },
      {
        "q": "Top K elements (heap)",
        "en": "Min-heap size K for largest K; O(n log k).",
        "hi": "Nearest K stores top rated products."
      }
    ]
  },
  {
    "id": "architecture",
    "label": "Senior Architecture",
    "icon": "fa-solid fa-sitemap",
    "items": [
      {
        "q": "Architect large Flutter + Android org",
        "en": "Feature modules, shared core, contracts, MVVM/BLoC, CI/CD, feature flags.",
        "hi": "Team size par modules; ADR decisions document."
      },
      {
        "q": "Single source of truth practically",
        "en": "UI observes Repository/Room Flow; network updates DB; no duplicate authoritative state.",
        "hi": "Cart state ek jagah; conflict policy explicit."
      },
      {
        "q": "API versioning and backward compatibility",
        "en": "v1/v2 APIs, nullable fields, feature flags, min supported version force update when needed.",
        "hi": "ignoreUnknown fields; breaking change par force update rare."
      },
      {
        "q": "Idempotency in payments and orders",
        "en": "Unique client order IDs; server idempotency keys; verify before success UI.",
        "hi": "Double tap pay duplicate charge na ho."
      },
      {
        "q": "Paging 3 vs manual pagination",
        "en": "PagingSource chunks, retry, Room RemoteMediator; better memory UX.",
        "hi": "Zila catalog jaisa; LoadState handle."
      },
      {
        "q": "Multi-module dependency rules",
        "en": "Features depend core not each other; api vs implementation; no cycles; interface modules.",
        "hi": "PR review wrong dependency direction."
      },
      {
        "q": "Testability at scale",
        "en": "DI interfaces, fakes, runTest, Turbine; test pyramid many unit few E2E.",
        "hi": "CI unit mandatory; blind 100% coverage nahi."
      },
      {
        "q": "Observability crashes ANR performance",
        "en": "Crashlytics, Performance, custom logs; staged rollout metrics.",
        "hi": "Crash-free users %; PII log mat bhejo."
      },
      {
        "q": "Security architecture fintech/gov",
        "en": "Pinning, encrypted storage, server auth, OWASP, obfuscation, compliance reviews.",
        "hi": "eNagarpalika data minimization session timeout."
      },
      {
        "q": "Offline-first vs network-first decision",
        "en": "Offline for field/poor network; network-first real-time prices; stale indicator hybrid.",
        "hi": "Product requirement drive — SK Agent offline example."
      },
      {
        "q": "One-time UI events problem",
        "en": "Do not use StateFlow for navigation; SharedFlow/Channel/UiEffect consumed once.",
        "hi": "Rotation par double navigate classic bug."
      },
      {
        "q": "Java to Kotlin migration at scale",
        "en": "Module-by-module; new code Kotlin; interop annotations; tests first; no big-bang.",
        "hi": "ShopKirana story measurable crash reduction."
      },
      {
        "q": "Compose vs Views coexistence",
        "en": "Gradual Compose screens; ComposeView/AndroidView interop; shared design tokens.",
        "hi": "Strangler pattern ek screen ek time."
      },
      {
        "q": "CI/CD pipeline for mobile",
        "en": "Lint, unit tests, release AAB, secure signing, Play internal track, Test Lab optional.",
        "hi": "PR fast checks; secrets encrypted CI."
      },
      {
        "q": "System design: feed or municipal app",
        "en": "Clarify requirements; UI→VM→Repo→API+Cache; paging; images CDN; offline policy; failure modes; metrics.",
        "hi": "2 min requirements; trade-offs bolo; gov accessibility locale."
      }
    ]
  }
];
