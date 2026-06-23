/**
 * Interview Q&A — edit this file only (human-friendly template strings).
 *
 *   node js/build-interview.js          → regenerate interview-data.js
 *   node js/build-interview.js --check  → validate structure + duplicates
 *
 * Each answer needs What? / Why? / How? in en and hi. Code in ```kotlin fences.
 */
module.exports = [
  {
    id: "java",
    label: "Java",
    icon: "fa-brands fa-java",
    items: [
    {
      q: "What is Java?",
      en: `What?

Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle). It is widely used to build web, desktop, mobile (especially Android), enterprise, cloud, and embedded applications. Java programs are compiled to bytecode (.class files) and executed on the Java Virtual Machine (JVM), which makes them platform-independent — "Write Once, Run Anywhere" (WORA).

Key characteristics (GeeksforGeeks):
- Object-oriented: classes, objects, inheritance, polymorphism, encapsulation, abstraction
- Platform independent via JVM on Windows, Linux, macOS, and more
- Robust and secure: strong memory management, garbage collection, and exception handling
- Multithreading and rich standard libraries (java.lang, java.util, java.io, java.net, etc.)

Why?

Java is popular because it balances simplicity, performance, and a mature ecosystem. The JVM gives portability without recompiling for every OS. Large organizations (banks, e-commerce, streaming) rely on Java for scalable backends. On mobile, Android historically used Java (and still supports it alongside Kotlin). Open-source libraries and frameworks (Spring, Hibernate) speed up enterprise and web development.

How?

Classic "Hello World" (GeeksforGeeks):

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
\`\`\`

Execution flow:
1. Save source as HelloWorld.java
2. javac compiles it to HelloWorld.class (bytecode)
3. JVM loads the .class file, interprets bytecode, and uses JIT (Just-In-Time) compilation to optimize hot paths into native machine code

Common uses: Android apps, Spring/Spring Boot web APIs, desktop GUI (JavaFX/Swing), big data (Hadoop), IoT, and cloud services on AWS/Azure/GCP.`,
      hi: `What?

Java ek high-level, object-oriented programming language hai jo Sun Microsystems (ab Oracle) ne develop ki. Iska use web, desktop, mobile (khaaskar Android), enterprise, cloud, aur embedded apps banane ke liye hota hai. Java code pehle bytecode (.class) mein compile hota hai aur phir Java Virtual Machine (JVM) par chalta hai — isliye ek baar likho, har OS par chalao (Write Once, Run Anywhere).

GeeksforGeeks ke hisaab se main points:
- Object-oriented: classes, objects, inheritance, polymorphism, encapsulation, abstraction
- JVM ki wajah se platform independent (Windows, Linux, macOS, etc.)
- Robust aur secure: memory management, garbage collection, exception handling
- Multithreading aur badi standard libraries (java.util, java.io, java.net, etc.)

Why?

Java simple syntax, strong ecosystem, aur scalability ke liye famous hai. JVM se har OS par same bytecode chal sakta hai bina alag compile kiye. Banks, e-commerce, streaming backends Java par depend karte hain. Android mein bhi Java (aur ab Kotlin ke sath) core role rakhta hai. Spring, Hibernate jaise frameworks development fast karte hain.

How?

GeeksforGeeks style Hello World:

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
\`\`\`

Execution flow:
1. Source file HelloWorld.java save karo
2. javac se HelloWorld.class (bytecode) banta hai
3. JVM .class load karke interpret karta hai; JIT frequently run hone wale code ko native machine code mein optimize karta hai

Common uses: Android apps, Spring web APIs, desktop GUI, big data (Hadoop), IoT, aur cloud (AWS/Azure/GCP).`
    },
    {
      q: "Difference between == and .equals()?",
      en: `What?

== is a comparison operator, whereas .equals() is a method defined in the java.lang.Object class.
- == performs reference comparison (checks if both references point to the exact same object in memory) for objects, and value comparison for primitives (like int, char, boolean).
- .equals() performs content comparison (checks if the logical values/contents of two objects are equal).

Why?

If a class does not override the .equals() method, it inherits the default implementation from the Object class, which behaves exactly like == (reference comparison). When overriding .equals(), you must also override hashCode() to maintain the general contract: "If two objects are equal according to the equals() method, then calling hashCode() on each must produce the same integer result." Failing to do so breaks collections like HashMap, HashSet, and Hashtable.

How?

In Java, always use .equals() for string and object content comparisons:

\`\`\`java
String s1 = new String("GFG");
String s2 = new String("GFG");
System.out.println(s1 == s2);      // false (different memory references)
System.out.println(s1.equals(s2)); // true (same logical content)
\`\`\`

In Kotlin, == is structural equality (which calls .equals() under the hood), and === is referential equality (which behaves like Java ==).`,
      hi: `What?

== ek comparison operator hai, jabki .equals() ek method hai jo java.lang.Object class mein defined hai.
- == references ya memory addresses ko compare karta hai (reference comparison) objects ke liye, aur values ko compare karta hai primitives (jaise int, boolean) ke liye.
- .equals() objects ke logical content ko compare karta hai (content comparison).

Why?

Agar aapki custom class .equals() ko override nahi karti, to use default Object class ka implementation milta hai jo bilkul == ki tarah (reference comparison) kaam karta hai. Jab bhi .equals() override karein, hashCode() ko bhi override karna zaroori hai, warna HashMap aur HashSet jaise collections sahi se kaam nahi karenge.

How?

Java mein String aur objects ke content ko compare karne ke liye hamesha .equals() use karein:

\`\`\`java
String s1 = new String("GFG"). String s2 = new String("GFG"). System.out.println(s1 == s2). // false (alag memory reference)
System.out.println(s1.equals(s2)). // true (same logical content)
\`\`\`.

Kotlin mein == structural equality (jo under the hood .equals() call karta hai) ke liye use hota hai, aur === referential equality (memory address comparison) ke liye use hota hai.`
    },
    {
      q: "Explain OOP pillars with Android relevance",
      en: `What?

Object-Oriented Programming (OOP) is built on four core pillars: Encapsulation, Inheritance, Polymorphism, and Abstraction.

Why?

In Android development, these pillars are crucial for managing the complexity of UI, background processing, and data layers. They enable clean architecture, modularity, testability, and separation of concerns.

How?

- Encapsulation (Data Hiding): Hiding internal state and exposing behavior. In Android, ViewModels keep MutableStateFlow private and expose only read-only StateFlow to the UI to prevent unauthorized state mutation.
- Inheritance (Code Reusability): Creating a child class from a parent class ("IS-A" relationship). In Android, custom activities inherit from AppCompatActivity or custom views inherit from ConstraintLayout to reuse system behaviors.
- Polymorphism (Many Forms): One interface, multiple implementations. In Android, OnClickListener is polymorphic—different buttons implement the same interface but perform different actions.
- Abstraction (Hiding Complexity): Showing only essential details. In Retrofit, you define interfaces with annotations (@GET, @POST). Retrofit hides the complex HTTP connection, request/response parsing, and thread dispatching under the hood.`,
      hi: `What?

Object-Oriented Programming (OOP) ke char main pillars hain: Encapsulation, Inheritance, Polymorphism, aur Abstraction.

Why?

Android development mein, in pillars ka use karke hum complex UI, background processing, aur data layers ko manage karte hain. Yeh clean architecture, modularity, testability, aur separation of concerns ko enable karte hain.

How?

- Encapsulation (Data Hiding): Internal state ko hide karna aur methods ke zariye expose karna. Android mein, ViewModels apne MutableStateFlow ko private rakhte hain aur UI ko sirf read-only StateFlow expose karte hain takki UI state ko direct mutate na kar sake.
- Inheritance (Code Reusability): Ek class ke features doosri class mein use karna ("IS-A" relationship). Android mein, custom activities AppCompatActivity se inherit karti hain aur custom views ConstraintLayout se inherit karte hain takki system behaviors ko reuse kiya ja sake.
- Polymorphism (Many Forms): Ek interface, multiple implementations. Android mein, OnClickListener polymorphic hai. Alag-alag buttons same interface implement karte hain lekin alag-alag actions perform karte hain.
- Abstraction (Hiding Complexity): Complex logic ko hide karna aur sirf zaroori details dikhana. Retrofit mein, hum simple annotations (@GET, @POST) ke sath interfaces define karte hain. Retrofit under the hood complex HTTP connections, parsing, aur threading ko handle karta hai.`
    },
    {
      q: "ArrayList vs LinkedList",
      en: `What?

ArrayList and LinkedList are both implementations of the List interface in Java, but they use different underlying data structures.
- ArrayList is backed by a dynamic array that automatically resizes when it fills up.
- LinkedList is backed by a doubly-linked list where each element is a node containing data and pointers to the next and previous nodes.

Why?

- Random Access: ArrayList is O(1) because it uses array indices. LinkedList is O(N) because it must traverse the list from the beginning or end.
- Insertion/Deletion: ArrayList is O(N) for middle insertions because it has to shift elements. LinkedList is O(1) for inserting or deleting at a known node (but O(N) to find that node first).
- Memory Overhead: ArrayList is memory efficient (only stores elements and indices). LinkedList has high memory overhead because each node stores two references (next and previous pointers).

How?

In Android development, ArrayList is almost always preferred for RecyclerView adapters, API responses, and local caches because of O(1) random access and CPU cache locality.

\`\`\`kotlin
val products = ArrayList<Product>() // Perfect for RecyclerView binding
\`\`\`

Use LinkedList (or ArrayDeque which is usually better) for Queue/Deque operations:

\`\`\`kotlin
val taskQueue: Queue<Runnable> = LinkedList() // O(1) add/remove from ends
\`\`\``,
      hi: `What?

ArrayList aur LinkedList dono Java ke List interface ke implementations hain, lekin dono ka internal data structure alag hota hai.
- ArrayList ek dynamic array par based hai jo full hone par automatically resize ho jata hai.
- LinkedList ek doubly-linked list par based hai jahan har element ek node hota hai jisme data aur next/previous nodes ke pointers hote hain.

Why?

- Random Access: ArrayList mein O(1) time lagta hai kyunki yeh array index use karta hai. LinkedList mein O(N) lagta hai kyunki poori list traverse karni padti hai.
- Insertion/Deletion: ArrayList mein middle insertion/deletion O(N) hota hai kyunki elements ko shift karna padta hai. LinkedList mein O(1) hota hai agar aapke paas us node ka reference ho.
- Memory Overhead: ArrayList memory-efficient hai. LinkedList mein har node ke sath next aur previous pointers store karne ka extra memory overhead hota hai.

How?

Android mein, RecyclerView adapters, API responses, aur local caches ke liye hamesha ArrayList ko prefer kiya jata hai kyunki isme O(1) random access aur better CPU cache locality milti hai.

\`\`\`kotlin
val products = ArrayList<Product>() // RecyclerView binding ke liye best
\`\`\`.

Queue ya Deque operations ke liye LinkedList (ya ArrayDeque) use karein:

\`\`\`kotlin
val taskQueue: Queue<Runnable> = LinkedList() // End se add/remove karne ke liye O(1)
\`\`\`.`
    },
    {
      q: "final, finally, and finalize()",
      en: `What?

These are three distinct concepts in Java with entirely different purposes:
- final is a keyword used to apply restrictions.
- finally is a block used for exception handling.
- finalize() is a protected method of the java.lang.Object class.

Why?

- final: Used to make a variable constant (cannot be reassigned), a method un-overrideable, or a class un-inheritable (e.g., String is a final class).
- finally: Used to guarantee execution of cleanup code (like closing streams, database connections, or cursors). It executes even if an exception is thrown or a return statement is encountered in the try-catch block.
- finalize(): Called by the Garbage Collector before reclaiming an object's memory. It is highly unreliable, deprecated, and should never be used for resource cleanup.

How?

\`\`\`java
final int x = 10; // Value cannot be changed
\`\`\`

Guaranteed cleanup using finally block:

\`\`\`java
Cursor cursor = null;
try {
    cursor = db.query(...);
} finally {
    if (cursor != null) cursor.close();
}
\`\`\`

In modern Java/Android, prefer try-with-resources (Java) or Kotlin's .use {} extension over manual finally blocks:

\`\`\`kotlin
contentResolver.openInputStream(uri)?.use { stream ->
    // Stream is automatically closed when block exits
}
\`\`\``,
      hi: `What?

Yeh teeno Java ke alag-alag concepts hain jinka aapas mein koi relation nahi hai:

- Final ek keyword hai jo restrictions lagane ke liye use hota hai.
- Finally ek block hai jo exception handling (try-catch) ke sath use hota hai.
- Finalize() ek protected method hai jo java.lang.Object class mein defined hai.

Why?

- Final: Variable ko constant banane (reassign nahi ho sakta), method overriding ko rokne, aur class inheritance ko block karne ke liye use hota hai.
- Finally: Cleanup code (jaise streams, database connections, ya cursors ko close karna) execute karne ki guarantee deta hai. Yeh try ya catch block mein return statement hone par bhi execute hota hai.
- Finalize(): Garbage Collector dwara object ko memory se delete karne se pehle call kiya jata tha. Yeh unreliable aur deprecated hai, isliye resource cleanup ke liye iska use kabhi nahi karna chahiye.

How?

\`\`\`java
final int x = 10. // Value change nahi ho sakti
\`\`\`.

Guaranteed cleanup ke liye finally block:

\`\`\`java
Cursor cursor = null. Try { cursor = db.query(..). } finally { if (cursor != null) cursor.close(). }
\`\`\`.

Modern Java/Android mein, manual finally ke bajay try-with-resources (Java) ya Kotlin ke .use {} extension ka use karein jo resources ko automatically close kar deta hai:

\`\`\`kotlin
contentResolver.openInputStream(uri)?.use { stream ->
    // Stream automatically close ho jayega
}
\`\`\``
    },
    {
      q: "Checked vs Unchecked exceptions",
      en: `What?

- Checked Exceptions: Exceptions that are checked at compile-time (e.g., IOException, FileNotFoundException, SQLException). The compiler forces the developer to handle them using try-catch or declare them in the method signature using throws.
- Unchecked Exceptions: Exceptions that are checked at runtime (e.g., NullPointerException, ArithmeticException, IndexOutOfBoundsException). They extend RuntimeException and do not require compile-time handling.

Why?

Checked exceptions represent recoverable conditions that are outside the program's direct control (e.g., network failure, missing file). Unchecked exceptions represent programming errors or bugs that should be fixed in code.

How?

Handling Checked Exception (Java forces this):

\`\`\`java
try {
    FileInputStream file = new FileInputStream("file.txt");
} catch (FileNotFoundException e) {
    // Recoverable logic
}
\`\`\`

Unchecked Exception (programming bug):

\`\`\`kotlin
val list = listOf(1, 2)
val item = list[5] // Throws IndexOutOfBoundsException at runtime
\`\`\`

Note: Kotlin does not have checked exceptions. All exceptions are unchecked, which reduces boilerplate and encourages modern error handling patterns like returning Result or Either types.`,
      hi: `What?

- Checked Exceptions: Yeh compile-time par check hoti hain (jaise IOException, FileNotFoundException). Compiler force karta hai ki aap inhe try-catch se handle karein ya method signature mein throws declare karein.
- Unchecked Exceptions: Yeh runtime par check hoti hain (jaise NullPointerException, ArithmeticException). Yeh RuntimeException ko extend karti hain aur inhe compile-time par handle karna mandatory nahi hota.

Why?

Checked exceptions un situations ko represent karti hain jo program ke control se bahar hain aur jinse recover kiya ja sakta hai (jaise network down hona ya file missing hona). Unchecked exceptions programming errors ya code bugs ko represent karti hain jinhe code change karke fix kiya jana chahiye.

How?

Checked Exception handling (Java forces this):

\`\`\`java
try { FileInputStream file = new FileInputStream("file.txt"). } catch (FileNotFoundException e) { // Recoverable logic
}
\`\`\`.

Unchecked Exception (programming bug):

\`\`\`kotlin
val list = listOf(1, 2)
val item = list[5] // Runtime par IndexOutOfBoundsException throw karega
\`\`\`.

Note: Kotlin mein checked exceptions nahi hoti hain. Saari exceptions unchecked hoti hain, jisse boilerplate code kam hota hai aur modern error handling (jaise Result class) ko badhava milta hai.`
    },
    {
      q: "String vs StringBuilder vs StringBuffer",
      en: `What?

These are classes used to represent and manipulate sequences of characters in Java.
- String is immutable (cannot be modified).
- StringBuilder is mutable and non-synchronized (not thread-safe).
- StringBuffer is mutable and synchronized (thread-safe).

Why?

- String is Immutable: Any modification (like concatenation in a loop) creates a new String object in the heap/String Constant Pool, leading to high memory allocation and Garbage Collection pressure (O(N^2) complexity).
- StringBuilder is Mutable: It modifies the same character buffer in-place, making it extremely fast and memory-efficient for string manipulations in a single thread.
- StringBuffer is Thread-safe: Its methods are synchronized, but this synchronization adds locking overhead, making it slower than StringBuilder.

How?

Avoid string concatenation in loops:

\`\`\`java
// BAD: Creates 1000 temporary String objects
String s = "";
for (int i = 0; i < 1000; i++) s += i;

// GOOD: Modifies a single buffer in-place
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) sb.append(i);
String result = sb.toString();
\`\`\`

In Kotlin, use buildString {} which uses StringBuilder under the hood:

\`\`\`kotlin
val result = buildString {
    for (i in 0 until 1000) append(i)
}
\`\`\``,
      hi: `What?

Yeh teeno Java mein character sequences ko represent aur manipulate karne ke liye classes hain:

- String immutable (un-changeable) hai.
- StringBuilder mutable aur non-synchronized (not thread-safe) hai.
- StringBuffer mutable aur synchronized (thread-safe) hai.

Why?

- String Immutable hai: Isme koi bhi change (jaise loop mein concatenation) heap memory/String Constant Pool mein naya String object bana deta hai, jisse memory waste hoti hai aur GC par load badhta hai (O(N^2) complexity).
- StringBuilder Mutable hai: Yeh same character buffer ko in-place modify karta hai, jisse string operations bahut fast aur memory-efficient hote hain single-thread mein.
- StringBuffer Thread-safe hai: Iske methods synchronized hote hain, lekin locking overhead ke karan yeh StringBuilder se slow hota hai.

How?

Loop ke andar string concatenation se bachein:

\`\`\`java
// BAD: 1000 temporary String objects banenge
String s = "";
for (int i = 0; i < 1000; i++) s += i;

// GOOD: Single buffer mein modify hoga
StringBuilder sb = new StringBuilder(). For (int i = 0. I < 1000. I aur aur ) sb.append(i). String result = sb.toString(). \`\`\`.

Kotlin mein buildString {} use karein jo under the hood StringBuilder hi use karta hai:

\`\`\`kotlin
val result = buildString { for (i in 0 until 1000) append(i)
}
\`\`\`.`
    },
    {
      q: "HashMap internal working (brief)",
      en: `What?

HashMap is a hashing-based collection that stores data in Key-Value pairs. It is backed by an array of Nodes (also called buckets).

Why?

It provides O(1) average-time complexity for basic operations like get() and put(), which is made possible by its hashing technique.

How?

Under the hood working:
1. Hashing: When you call put(key, value), HashMap calculates the hash of the key using hash(key).
2. Index Calculation: It maps the hash to a bucket index using index = hash & (n - 1) (where n is the array capacity).
3. Node Structure: Each bucket contains a Node with four fields: int hash, K key, V value, and Node<K,V> next.
4. Collision Handling: If two keys map to the same bucket index (collision), they are stored as a linked list in that bucket.
5. Java 8 Optimization (Treeification): If the linked list size in a bucket exceeds a threshold of 8 (TREEIFY_THRESHOLD) and the total map capacity is at least 64, the linked list is converted into a Red-Black Tree. This improves the worst-case search time from O(N) to O(log N).
6. Rehashing/Resizing: When the number of entries exceeds the threshold (capacity * load_factor, default load factor is 0.75), the capacity is doubled, and all elements are rehashed into the new larger array.`,
      hi: `What?

HashMap ek hashing-based collection hai jo data ko Key-Value pairs mein store karta hai. Yeh internal roop se Nodes (buckets) ke ek array par kaam karta hai.

Why?

Yeh basic operations jaise get() aur put() ke liye average O(1) time complexity provide karta hai, jo iski hashing technique ke karan possible hai.

How?

HashMap ki internal working:
1. Hashing: Jab aap put(key, value) call karte hain, to key ka hashcode calculate kiya jata hai.
2. Index Calculation: Hash value ko array index mein map kiya jata hai: index = hash & (n - 1) (jahan n array ki capacity hai).
3. Node Structure: Har bucket mein ek Node hota hai jisme char fields hote hain: int hash, K key, V value, aur Node<K,V> next.
4. Collision Handling: Agar do keys same index par map hoti hain (collision), to unhe usi bucket mein ek linked list ke roop mein store kiya jata hai.
5. Java 8 Optimization (Treeification): Agar kisi bucket mein linked list ki size 8 (TREEIFY_THRESHOLD) se zyada ho jati hai aur total capacity 64 aur ho, to linked list ko Red-Black Tree mein convert kar diya jata hai. Isse worst-case search time O(N) se sudhar kar O(log N) ho jata hai.
6. Resizing: Jab map mein entries threshold (capacity * load_factor, default load factor 0.75) se zyada ho jati hain, to array size double ho jati hai aur saare elements ko naye array mein rehash kiya jata hai.`
    },
    {
      q: "Interface vs Abstract class",
      en: `What?

Abstraction hides implementation details and exposes only the essential contract.

- Abstract Class: A partially implemented class (abstract keyword) that cannot be instantiated. It can have instance fields, constructors, and both abstract and concrete methods.
- Interface: A pure behavior contract. Before Java 8 it held only abstract methods; from Java 8+ it supports default and static methods; from Java 9+ private methods too. In Kotlin, interfaces can declare properties but cannot hold mutable instance state.

Why?

- Abstract Class: Use when closely related types share identity, state, and reusable code ("IS-A" relationship). Example: BaseActivity with shared onCreate layout wiring.
- Interface: Use when unrelated types must expose the same capability ("CAN-DO" relationship). Example: Clickable, Serializable, PaymentProcessor.

How?

Key differences:
1. Inheritance: One abstract class per class; multiple interfaces allowed.
2. State: Abstract classes hold instance fields; interfaces cannot hold instance state (Java fields are public static final).
3. Constructors: Abstract classes can define constructors; interfaces cannot.
4. Access modifiers: Abstract class members can be private/protected/public; interface members are public by default.
5. Default methods: Modern interfaces (Java 8+, Kotlin) may ship default implementations, but still without instance state.

\`\`\`kotlin
interface Clickable {
    fun onClick() // capability contract — no shared state
}

abstract class BaseActivity : AppCompatActivity() {
    abstract val layoutResId: Int
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layoutResId)
    }
}

abstract class BaseViewModel {
    val isLoading = MutableStateFlow(false) // shared state
    abstract fun loadData()
}
\`\`\`

Interview one-liner: "Abstract class for shared structure and state among related types; interface for capability contracts across unrelated types — a class extends one abstract class but can implement many interfaces."`,
      hi: `What?

Abstraction ka matlab hai complex implementation chhupana aur bahar sirf zaroori contract dikhana.

- Abstract Class: Semi-implemented class jiska direct object nahi banaya ja sakta. Isme instance variables, constructors, aur abstract/concrete dono methods ho sakte hain.
- Interface: Pure behavior contract jo capabilities define karta hai. Java 8+ se default/static methods, Java 9+ se private methods bhi ho sakte hain. Kotlin mein properties declare ho sakti hain par mutable instance state nahi.

Why?

- Abstract Class: Jab closely related classes ke beech common identity, state, aur code share karna ho ("IS-A"). Jaise BaseActivity mein shared onCreate layout setup.
- Interface: Jab alag-alag unrelated classes ko same capability deni ho ("CAN-DO"). Jaise Clickable, Serializable, PaymentProcessor.

How?

Key differences:
1. Inheritance: Abstract class sirf ek extend hoti hai; interfaces multiple implement ho sakte hain.
2. State: Abstract class mein instance fields ho sakte hain; interface mein instance state nahi.
3. Constructors: Abstract class mein constructor ho sakta hai; interface mein nahi.
4. Access modifiers: Abstract class private/protected members rakh sakti hai; interface members default public hote hain.
5. Default methods: Modern interfaces default implementation de sakte hain, par bina instance state ke.

\`\`\`kotlin
interface Clickable {
    fun onClick() // capability contract — shared state nahi
}

abstract class BaseActivity : AppCompatActivity() {
    abstract val layoutResId: Int
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(layoutResId)
    }
}

abstract class BaseViewModel {
    val isLoading = MutableStateFlow(false) // shared state
    abstract fun loadData()
}
\`\`\`

Interview one-liner: "Related types ke liye shared structure/state → abstract class; unrelated types ke liye capability contract → interface. Ek class ek abstract class extend karti hai par kai interfaces implement kar sakti hai."`
    },
    {
      q: "What is garbage collection?",
      en: `What?

Garbage Collection (GC) is the automatic process in Java/Android of reclaiming heap memory by destroying objects that are no longer reachable from any GC Roots (such as active thread stacks, static references, JNI global references).

Why?

It prevents manual memory management errors (like double-free or dangling pointers in C++) and ensures that the application has sufficient memory to run.

How?

Generational Hypothesis: Most objects die young. Therefore, the heap is divided into:
1. Young Generation: Where new objects are allocated (Eden space, Survivor spaces S0/S1). Minor GC runs here frequently.
2. Old (Tenured) Generation: Where long-lived objects are promoted after surviving multiple GC cycles. Major GC runs here less frequently but is more expensive.

Android ART (Android Runtime): Uses a highly optimized Concurrent Copying (CC) collector that performs garbage collection concurrently with application threads, minimizing Stop-The-World (STW) pauses to prevent UI stutter (jank) during scrolling.

Memory Leaks: Occur when an object is no longer needed by the app, but a GC Root still holds a strong reference to it, preventing the GC from reclaiming its memory.

You can request garbage collection using System.gc(), but it is only a suggestion; the JVM/ART decides when to actually run it.`,
      hi: `What?

Garbage Collection (GC) ek automatic process hai jo heap memory se un objects ko destroy karke memory free karti hai jo ab kisi bhi GC Roots (jaise active thread stacks, static references, JNI references) se reachable nahi hain.

Why?

Yeh developers ko manual memory clearance (jaise C aur aur mein delete) ke jhanjhat se bachata hai aur memory leaks aur application crashes ko rokta hai.

How?

Generational Hypothesis: Zyadatar objects jaldi mar jate hain. Isliye heap ko divide kiya jata hai:
1. Young Generation: Naye objects Eden space mein bante hain. Minor GC yahan jaldi-jaldi chalta hai.
2. Old Generation: Jo objects Minor GC survive karte hain, unhe Old Generation mein promote kiya jata hai. Major GC yahan kam chalta hai kyunki yeh costly hota hai.

Android ART (Android Runtime): Ek optimized Concurrent Copying (CC) collector use karta hai jo application threads ke sath background mein chalta hai, takki Stop-The-World (STW) pauses na hon aur UI smooth scroll kare.

Memory Leaks: Tab hote hain jab app ko kisi object ki zaroorat nahi hoti, par koi GC Root uska strong reference hold karke rakhta hai, jisse GC use clean nahi kar pata.

Aap System.gc() call karke GC request kar sakte hain, par yeh sirf ek suggestion hai. JVM/ART kab run karega yeh unpar depend karta hai.`
    },
    {
      q: "Java generics and type erasure",
      en: `What?

- Generics: Introduce compile-time type safety, allowing classes, interfaces, and methods to be parameterized by types (e.g., List<String>).
- Type Erasure: The process where the compiler removes all generic type information at compile-time and replaces it with raw types (like Object) and inserts appropriate type casts. This ensures backward compatibility with older JVM versions that do not support generics.

Why?

Generics prevent runtime ClassCastException by catching type mismatches at compile-time. Type erasure is the mechanism that allows this feature to run on a standard JVM without changing the bytecode format.

How?

Consequences of Type Erasure:
- You cannot use instanceof with generic types: if (list instanceof List<String>) is illegal.
- You cannot instantiate a generic type directly: new T() is illegal.
- Gson/Retrofit Trap: Because of type erasure, List<User> becomes raw List at runtime. To parse a generic list, Gson requires a TypeToken to capture the generic type information at compile-time:
  \`\`\`java
  Type type = new TypeToken<List<User>>(){}.getType();
  List<User> list = gson.fromJson(jsonString, type);
  \`\`\`
- PECS Rule (Producer Extends, Consumer Super):
  - Use ? extends T (Producer) when you only read from the collection.
  - Use ? super T (Consumer) when you only write to the collection.`,
      hi: `What?

- Generics: Compile-time type safety provide karte hain, jisse classes aur methods parameterized types (jaise List<String>) accept kar sakein.
- Type Erasure: Ek process hai jisme compiler compile-time par saari generic type information ko remove kar deta hai aur use raw types (jaise Object) se replace kar deta hai, takki purane JVM versions ke sath backward compatibility bani rahe.

Why?

Generics runtime par ClassCastException ko rokne ke liye compile-time safety dete hain. Type erasure is safety ko bina JVM bytecode format badle run karne mein help karta hai.

How?

Type Erasure ke effects:

- Aap instanceof generic types ke sath use nahi kar sakte: list instanceof List<String> illegal hai.
- Aap direct generic object nahi bana sakte: new T() illegal hai.
- Gson/Retrofit Trap: Type erasure ke karan List<User> runtime par raw List ban jata hai. Isliye Gson ko parse karne ke liye TypeToken chahiye hota hai jo compile-time type ko capture karta hai:
\`\`\`java.

Type type = new TypeToken<List<User>>(){}.getType().

List<User> list = gson.fromJson(jsonString, type).
\`\`\`.
- PECS Rule (Producer Extends, Consumer Super): hota hai.
- Read-only collections ke liye ? extends T (Producer) use karein.
- Write-only collections ke liye ? super T (Consumer) use karein.`
    },
    {
      q: "synchronized vs volatile",
      en: `What?

These are keywords in Java used to handle multi-threading concurrency issues:
- synchronized is used for mutual exclusion (locking) and visibility.
- volatile is used only for visibility.

Why?

In multi-threaded environments, threads can cache variables locally in CPU registers/caches. This causes Visibility issues (one thread updates a variable, but another thread doesn't see the update) and Atomicity issues (multiple threads modify a variable concurrently, causing race conditions).

How?

- volatile: Forces threads to read and write the variable directly from/to the main memory, ensuring all threads see the most up-to-date value. However, it does not guarantee atomicity (e.g., count++ is not atomic and still suffers from race conditions).
  \`\`\`java
  private volatile boolean isRunning = true; // Safe visibility flag
  \`\`\`
- synchronized: Locks an object or class. Only one thread can enter the synchronized block/method at a time, ensuring both mutual exclusion (atomicity) and visibility (changes made inside are flushed to main memory upon exit).
  \`\`\`java
  private int count = 0;
  public synchronized void increment() {
      count++; // Thread-safe atomicity and visibility
  }
  \`\`\`
- In modern Android/Kotlin, prefer higher-level synchronization tools like AtomicInteger, ConcurrentHashMap, Kotlin Coroutines with Mutex, or thread-safe state emitters like StateFlow.`,
      hi: `What?

Yeh dono Java mein multi-threading concurrency issues ko handle karne ke liye keywords hain:

- Synchronized mutual exclusion (locking) aur visibility dono deta hai.
- Volatile sirf visibility ki guarantee deta hai.

Why?

Multi-threaded programs mein threads variables ko apne local CPU cache mein store kar lete hain, jisse Visibility issues (ek thread ke changes doosre ko nahi dikhte) aur Atomicity issues (multiple threads ek sath variable change karke data corrupt kar dete hain) hote hain.

How?

- Volatile: Variable ko direct main memory se read/write karne par majboor karta hai, jisse visibility fix ho jati hai. Par yeh atomicity nahi deta (jaise count aur aur volatile hone par bhi thread-safe nahi hai).
\`\`\`java.

Private volatile boolean isRunning = true. // visibility flag.
\`\`\`.
- Synchronized: Ek object ya class ko lock kar deta hai. Ek time par sirf ek thread synchronized block mein enter kar sakta hai, jisse atomicity aur visibility dono milti hain.
\`\`\`java.

Private int count = 0.

Public synchronized void increment() { count aur aur. } // thread-safe.
\`\`\`.
- Modern Android/Kotlin mein higher-level tools jaise AtomicInteger, ConcurrentHashMap, ya Coroutines ke Mutex aur StateFlow ko prefer kiya jata hai.`
    },
    {
      q: "Reflection — pros and cons",
      en: `What?

Reflection is an API in Java that allows inspecting, modifying, and invoking classes, interfaces, constructors, methods, and fields at runtime, even if they are private.

Why?

It powers major libraries and frameworks:
- Gson/Moshi: Inspects class fields to map JSON keys.
- Retrofit: Inspects interface annotations (@GET, @POST) to construct HTTP requests.
- Dagger/Hilt: Traditionally used reflection (though modern DI uses compile-time annotation processing to avoid it).

How?

Example of calling a private method:

\`\`\`java
Method method = MyClass.class.getDeclaredMethod("privateMethod");
method.setAccessible(true);
method.invoke(objectInstance);
\`\`\`

Pros: Extremely flexible; enables dynamic framework behavior and code inspection.

Cons:
1. Performance Overhead: Much slower because JVM cannot optimize reflective calls, and it requires resolving types dynamically.
2. Security Restrictions: Can be blocked by security managers.
3. Breaks Encapsulation: Accesses private internals, which can lead to instability if internal library code changes.
4. Obfuscation (R8/ProGuard) Issues: R8 renames classes and fields to shrink APK size. If you access a field reflectively by name, it will fail in release builds unless kept explicitly in proguard-rules.pro:
   \`\`\`proguard
   -keep class com.example.models.** { *; }
   \`\`\``,
      hi: `What?

Reflection Java ka ek API hai jo runtime par classes, methods, constructors, aur fields ko inspect, modify, aur invoke karne ki permission deta hai, chahe woh private hi kyun na hon.

Why?

Yeh major libraries ko power karta hai:

- Gson/Moshi: JSON keys ko class fields se map karne ke liye reflection use karte hain.
- Retrofit: Interfaces ke annotations (@GET, @POST) ko runtime par inspect karke HTTP requests banata hai.
- Hilt/Dagger: Compile-time code generation use karte hain par reflection ka alternative provide karte hain.

How?

Private method ko call karna:

\`\`\`java
Method method = MyClass.class.getDeclaredMethod("privateMethod"). Method.setAccessible(true). Method.invoke(objectInstance). \`\`\`.

- Pros: Bahut flexible hai. Runtime par dynamic library behaviors aur inspection ko enable karta hai.
- Cons: hota hai.
1. Performance Overhead: Bahut slow hota hai kyunki JVM reflective calls ko optimize nahi kar sakta.
2. Breaks Encapsulation: Private data access karne se library updates ke waqt code break ho sakta hai.
3. Obfuscation (R8/ProGuard) Issues: R8 release build mein classes aur fields ko rename kar deta hai. Agar aap name se reflectively access karenge to crash ho jayega, jab tak aap proguard-rules.pro mein keep rules na likhein:
\`\`\`proguard.
-keep class com.example.models.** { *. }.
\`\`\`.`
    },
    {
      q: "Comparable vs Comparator",
      en: `What?

These are interfaces used to sort objects in Java:
- Comparable is used to define the natural sorting order of a class.
- Comparator is used to define custom sorting orders.

Why?

- Comparable: Implemented by the class itself. It has a single method: compareTo(T o). It is used when there is one obvious way to sort the objects (e.g., sorting Employees by ID).
- Comparator: Implemented in a separate class or inline. It has a method: compare(T o1, T o2). It is used when you want multiple different sorting criteria (e.g., sorting Employees by Name, or by Salary) without modifying the original class.

How?

Comparable (Natural Order):

\`\`\`java
class Employee implements Comparable<Employee> {
    int id;
    public int compareTo(Employee other) {
        return this.id - other.id; // Ascending by ID
    }
}
\`\`\`

Comparator (Custom Order):

\`\`\`java
class NameComparator implements Comparator<Employee> {
    public int compare(Employee e1, Employee e2) {
        return e1.name.compareTo(e2.name); // Sort by Name
    }
}
\`\`\`

In Kotlin, sorting is highly idiomatic using extension functions:

\`\`\`kotlin
val sortedByPrice = productList.sortedBy { it.price }
val sortedByNameAndPrice = productList.sortedWith(compareBy({ it.name }, { it.price }))
\`\`\``,
      hi: `What?

Yeh dono Java mein objects ko sort karne ke liye interfaces hain:

- Comparable class ka natural sorting order define karta hai.
- Comparator custom ya multiple sorting orders define karta hai.

Why?

- Comparable: Class khud implement karti hai iske single method compareTo(T o) ke zariye. Yeh tab use hota hai jab sorting ka ek hi standard tareeqa ho (jaise Employees ko unki ID se sort karna).
- Comparator: Ek alag class ya inline implement kiya jata hai compare(T o1, T o2) method ke zariye. Yeh tab use hota hai jab aapko multiple criteria par sort karna ho (jaise Employee ko name, salary, ya date se sort karna) bina original class ko modify kiye.

How?

Comparable (Natural Order):

\`\`\`java
class Employee implements Comparable<Employee> { int id. Public int compareTo(Employee other) { return this.id - other.id. // ID ascending }
}
\`\`\`.

Comparator (Custom Order):

\`\`\`java
class NameComparator implements Comparator<Employee> { public int compare(Employee e1, Employee e2) { return e1.name.compareTo(e2.name). // Name ascending }
}
\`\`\`.

Kotlin mein sorting extension functions se bahut simple aur readable ho jati hai:

\`\`\`kotlin
val sortedByPrice = productList.sortedBy { it.price }
val sortedByNameAndPrice = productList.sortedWith(compareBy({ it.name }, { it.price }))
\`\`\`.`
    },
    {
      q: "ThreadPoolExecutor & Executors working",
      en: `What?

ThreadPoolExecutor is a core class in Java's concurrency framework (java.util.concurrent) that manages a pool of worker threads to execute tasks asynchronously. It decouples task submission from task execution.

Why?

Creating a new thread for every background task is extremely expensive in terms of memory and CPU overhead. It can easily lead to OutOfMemoryError on mobile devices. A thread pool solves this by reusing a fixed or dynamic set of pre-allocated threads, limiting resource consumption and managing a queue of waiting tasks.

How?

Key Parameters of ThreadPoolExecutor:
1. corePoolSize: The minimum number of threads kept alive in the pool, even if they are idle.
2. maximumPoolSize: The maximum number of threads allowed in the pool.
3. keepAliveTime: The time idle threads (exceeding corePoolSize) wait before being terminated.
4. workQueue: A BlockingQueue holding tasks before execution (e.g., LinkedBlockingQueue, ArrayBlockingQueue, SynchronousQueue).
5. RejectedExecutionHandler: Handles tasks that cannot be executed when the queue is full and threads reach maximumPoolSize (e.g., AbortPolicy, CallerRunsPolicy, DiscardPolicy, DiscardOldestPolicy).

Under the Hood Working:
- When a task is submitted:
  1. If active threads < corePoolSize, a new thread is created immediately.
  2. If active threads >= corePoolSize, the task is placed into the workQueue.
  3. If the queue is full and active threads < maximumPoolSize, a new thread is created to run the task.
  4. If the queue is full and active threads >= maximumPoolSize, the task is rejected using the RejectedExecutionHandler.

In modern Android, avoid creating raw thread pools. Use Kotlin Coroutines with Dispatchers.IO (which is backed by an optimized, shared thread pool) or WorkManager for persistent background tasks.`,
      hi: `What?

ThreadPoolExecutor Java ke concurrency framework (java.util.concurrent) ka ek core class hai jo background tasks ko asynchronously run karne ke liye worker threads ke ek pool ko manage karta hai. Yeh task submission ko task execution se alag karta hai.

Why?

Har background task ke liye naya thread banana CPU aur memory ke liye bahut costly hota hai. Mobile devices par isse OutOfMemoryError ho sakta hai. Thread pool is problem ko solve karta hai pehle se bane threads ko reuse karke aur waiting tasks ko ek queue mein manage karke.

How?

ThreadPoolExecutor ke main parameters:
1. corePoolSize: Pool mein minimum active threads ki sankhya jo hamesha alive rehte hain.
2. maximumPoolSize: Pool mein allowed maximum threads ki sankhya.
3. keepAliveTime: Jab threads corePoolSize se zyada ho jate hain, to idle threads kitni der wait karne ke baad terminate honge.
4. workQueue: Ek BlockingQueue jo tasks ko execute hone se pehle hold karti hai (jaise LinkedBlockingQueue, ArrayBlockingQueue).
5. RejectedExecutionHandler: Jab queue full ho aur threads maximumPoolSize tak pahunch jayein, to naye tasks ko reject karne ka policy (jaise AbortPolicy, CallerRunsPolicy).

Under the Hood Working:

- Jab koi task submit hota hai:
1. Agar active threads < corePoolSize hain, to naya thread banta hai.
2. Agar active threads >= corePoolSize hain, to task workQueue mein jata hai.
3. Agar queue full hai aur active threads < maximumPoolSize hain, to naya thread banta hai.
4. Agar active threads >= maximumPoolSize hain, to task reject ho jata hai.

Modern Android mein raw thread pools banane se bachein. Kotlin Coroutines ke Dispatchers.IO ya persistent background tasks ke liye WorkManager ka use karein.`
    },
    {
      q: "Java Memory Model & GC Algorithms",
      en: `What?

The Java Memory Model (JMM) defines how threads interact through memory and divides memory into Stack (thread-local, fast, stores local variables and method calls) and Heap (shared across threads, stores all objects). The Heap is further divided into Young Generation (Eden, Survivor spaces S0/S1) and Old/Tenured Generation.

Why?

Understanding JMM and GC is crucial for preventing memory leaks, optimizing memory allocations, and avoiding UI stutter (jank) on Android. If memory fills up, the Garbage Collector has to run, which can pause application threads and cause frame drops.

How?

Garbage Collection Flow:
1. New objects are allocated in the Eden space.
2. When Eden fills, a Minor GC runs. Active objects are moved to Survivor spaces (S0/S1).
3. After surviving multiple GC cycles (defined by MaxTenuringThreshold), objects are promoted to the Old Generation.
4. When the Old Generation fills, a Major GC runs, which is much slower and more resource-intensive.

GC Algorithms (GeeksforGeeks standard):
1. Serial GC: Single-threaded collector. Pauses all application threads (Stop-The-World). Good for simple command-line tools.
2. Parallel GC (Throughput Collector): Uses multiple threads for garbage collection to increase throughput, but still has Stop-The-World pauses.
3. G1 (Garbage-First) GC: Divides the heap into equal-sized regions and reclaims regions with the most garbage first, minimizing pause times. Default in modern JVMs.
4. ZGC (Z Garbage Collector): Ultra-low pause time collector (< 1ms) that performs almost all garbage collection work concurrently with application threads, handling massive heaps easily.

Android ART (Android Runtime): ART uses custom concurrent copying collectors optimized for mobile devices. It performs collection concurrently with the app to prevent UI stutter (jank) during scrolling.`,
      hi: `What?

Java Memory Model (JMM) define karta hai ki threads memory ke sath kaise interact karte hain. Yeh memory ko Stack (thread-local, fast, local variables aur method calls ke liye) aur Heap (shared, saare objects ke liye) mein divide karta hai. Heap ko aage Young Generation (Eden, Survivor spaces S0/S1) aur Old/Tenured Generation mein divide kiya jata hai.

Why?

Android par memory leaks ko rokne, memory allocation ko optimize karne, aur UI jank (stutter) se bachne ke liye JMM aur GC ko samajhna zaroori hai. Jab memory full hoti hai, to GC ko run hona padta hai, jisse app threads pause ho sakte hain aur frame drops hote hain.

How?

Garbage Collection Flow:
1. Naye objects Eden space mein bante hain.
2. Eden bharne par Minor GC chalta hai, aur active objects Survivor spaces (S0/S1) mein shift hote hain.
3. Kai GC cycles survive karne ke baad (threshold: MaxTenuringThreshold), objects Old Generation mein promote ho jate hain.
4. Old Generation bharne par Major GC chalta hai, jo slow aur costly hota hai.

GC Algorithms:
1. Serial GC: Single-threaded collector hai jo saare threads ko pause karta hai (Stop-The-World). Chhoti CLI apps ke liye useful hai.
2. Parallel GC: Garbage collection ke liye multiple threads use karta hai throughput badhane ke liye, par isme bhi Stop-The-World pauses hote hain.
3. G1 GC: Heap ko equal regions mein divide karta hai aur sabse pehle us region ko clear karta hai jisme sabse zyada garbage ho (Garbage-First).
4. ZGC: Ultra-low pause time collector (< 1ms) hai jo background mein application threads ke sath chalta hai aur bade heaps ko safely manage karta hai.

Android ART (Android Runtime): ART mobile ke liye optimized concurrent copying collectors use karta hai jo background mein chalte hain takki scroll karte waqt UI stutter (jank) na ho.`
    },
    {
      q: "Strong, Soft, Weak, and Phantom References",
      en: `What?

Java references define the relationship between the Garbage Collector (GC) and objects in heap memory. There are four types of references:
1. Strong Reference (Default): \`MyClass obj = new MyClass()\`. The GC will never collect this object as long as it is strongly reachable.
2. Soft Reference: \`SoftReference<MyClass> softRef = new SoftReference<>(obj)\`. Collected only when JVM runs out of memory (useful for memory-sensitive caches).
3. Weak Reference: \`WeakReference<MyClass> weakRef = new WeakReference<>(obj)\`. Collected during the very next GC cycle, regardless of memory availability.
4. Phantom Reference: \`PhantomReference<MyClass> phantomRef = new PhantomReference<>(obj, queue)\`. Used to track when an object has been finalized and is about to be reclaimed, allowing safe post-mortem cleanup.

Why?

Using only strong references leads to memory leaks on Android. For example, if a long-running background thread or singleton holds a strong reference to an Activity, the GC cannot collect the Activity even after it is destroyed, leaking massive amounts of memory (including its entire view hierarchy and bitmaps).

How?

Use \`WeakReference\` to hold references to short-lived UI components (like Activity or View) inside long-lived objects (like Handlers, AsyncTasks, or static helper classes):

\`\`\`kotlin
class MyHandler(activity: MainActivity) : Handler(Looper.getMainLooper()) {
    private val activityRef = WeakReference(activity)

    override fun handleMessage(msg: Message) {
        val activity = activityRef.get()
        if (activity != null && !activity.isFinishing) {
            activity.updateUI()
        }
    }
}
\`\`\``,
      hi: `What?

Java references Garbage Collector (GC) aur heap objects ke beech ke relationship ko define karti hain. Yeh char types ki hoti hain:
1. Strong Reference (Default): \`MyClass obj = new MyClass()\`. Jab tak strong reference active hai, GC ise kabhi delete nahi karega.
2. Soft Reference: \`SoftReference<MyClass> softRef = new SoftReference<>(obj)\`. GC ise tabhi delete karta hai jab JVM ke paas memory bilkul khatam hone wali ho (caches ke liye best).
3. Weak Reference: \`WeakReference<MyClass> weakRef = new WeakReference<>(obj)\`. Agle hi GC cycle mein ise delete kar diya jata hai, chahe memory available ho ya nahi.
4. Phantom Reference: \`PhantomReference<MyClass> phantomRef = new PhantomReference<>(obj, queue)\`. Iska use sirf yeh track karne ke liye hota hai ki object kab memory se reclaim hone wala hai takki cleanup kiya ja sake.

Why?

Android par sirf strong references use karne se memory leaks hote hain. Agar koi long-running background thread ya static class kisi Activity ka strong reference hold kar le, to Activity destroy hone ke baad bhi GC use clear nahi kar payega, jisse heavy memory leak hoga.

How?

Short-lived UI components (jaise Activity ya View) ko long-lived structures (jaise Handlers, custom listeners) ke andar hamesha \`WeakReference\` mein wrap karke rakhein:

\`\`\`kotlin
class MyHandler(activity: MainActivity) : Handler(Looper.getMainLooper()) { private val activityRef = WeakReference(activity)
Override fun handleMessage(msg: Message) { val activity = activityRef.get() if (activity != null && !activity.isFinishing) { activity.updateUI() } }
}
\`\`\`.`
    },
    {
      q: "Serialization vs Parcelable",
      en: `What?

Serialization and Parcelable are mechanisms used to convert complex objects into a format that can be transmitted across processes (IPC) or saved to disk.
- Serializable: A standard Java interface that uses reflection under the hood. It is a marker interface (no methods to implement).
- Parcelable: An Android-specific interface where the developer must manually write the marshalling/unmarshalling code (or use \`@Parcelize\` in Kotlin).

Why?

Serializable is extremely slow on Android because it uses Java reflection to inspect the class structure and creates thousands of temporary objects, leading to heavy GC overhead. Parcelable is optimized specifically for Android IPC (Binder) and is up to 10x faster because the serialization logic is explicitly written and compiled.

How?

In modern Kotlin, use the \`@Parcelize\` annotation from the \`kotlinx-parcelize\` plugin to auto-generate the Parcelable boilerplate at compile-time, giving you both speed and clean code:

\`\`\`kotlin
@Parcelize
data class User(val id: String, val name: String) : Parcelable

// Passing in Intent
intent.putExtra("user_key", user)
val user = intent.getParcelableExtra<User>("user_key")
\`\`\`

Never use Parcelable for persistent storage (like saving to disk or database) because its internal binary format can change between Android OS versions, rendering saved data unreadable. Use JSON serialization (like Moshi/Gson) or Room for persistence.`,
      hi: `What?

Serialization aur Parcelable complex objects ko ek aise format mein convert karne ke tareeqe hain jisse unhe alag processes (IPC) mein bheja ja sake ya disk par save kiya ja sake.
- Serializable: Standard Java interface hai jo reflection use karta hai. Yeh ek marker interface hai.
- Parcelable: Android-specific interface hai jisme marshalling/unmarshalling ka code manually likhna padta hai (ya Kotlin mein \`@Parcelize\` use karna padta hai).

Why?

Serializable Android par bahut slow hai kyunki yeh runtime par reflection use karke class structure ko padhta hai aur hazaron temporary objects banata hai, jisse GC par load badhta hai. Parcelable Android IPC (Binder) ke liye optimized hai aur Serializable se 10 guna tak fast hai kyunki iska serialization logic compile-time par hi generate ho jata hai.

How?

Modern Kotlin mein \`@Parcelize\` annotation ka use karein, jo compile-time par saara boilerplate code khud likh deta hai:

\`\`\`kotlin
@Parcelize
data class User(val id: String, val name: String) : Parcelable
// Intent mein pass karna
intent.putExtra("user_key", user)
val user = intent.getParcelableExtra<User>("user_key")
\`\`\`.

Parcelable ko kabhi bhi persistent storage (disk par save karne) ke liye use mat karein, kyunki alag Android OS versions par iska internal binary format change ho sakta hai, jisse data corrupt ho jayega. Disk storage ke liye JSON ya Room use karein.`
    },
    {
      q: "Java vs Kotlin — key differences for Android",
      en: `What?

Kotlin: null safety, coroutines, data classes, extension functions, default parameters, sealed types, less boilerplate. Java: verbose, nullable everywhere, mature ecosystem, more legacy Android samples.

Why?

Both compile to JVM bytecode on Android. Google recommends Kotlin for new code; Java interop remains for gradual migration.

How?

Cite one benefit you measured: fewer NPE crashes, faster feature delivery, or cleaner networking with coroutines.`,
      hi: `What?

Kotlin null safe, concise, coroutines. Java verbose, NPE risk.

Why?

Naya Android Kotlin prefer.

How?

Project example do.`
    },
    {
      q: "NullPointerException — causes and prevention",
      en: `What?

NPE occurs when you invoke a method or access a field on a null reference. Common causes: uninitialized fields, API returning null, intent extras missing after process death, chaining calls without null checks.

Why?

Kotlin eliminates many NPEs at compile time with nullable types; Java requires defensive coding, Optional, or annotations.

How?

Prevention: validate inputs, @Nullable/@NonNull, avoid !! in Kotlin, early return, Crashlytics stack trace to find top NPE sites.`,
      hi: `What?

Null par call se NPE.

Why?

Kotlin compile time help. Java defensive.

How?

?. ?: check, extras validate.`
    },
    {
      q: "Why use final on a Java class",
      en: `What?

A final class cannot be extended. Used for security (e.g. String), immutability guarantees, and API design when inheritance would break invariants.

Why?

Kotlin: classes are final by default; use \`open\` to allow subclassing. Java: explicitly mark final to prevent fragile subclasses.

How?

Interview: String is final — cannot subclass String to break equals/hashCode contract.`,
      hi: `What?

final class extend nahi hoti.

Why?

String final — security.

Kotlin default final, open se extend.`
    },
    {
      q: "Method overriding vs overloading",
      en: `What?

Overloading: same method name, different parameter lists, resolved at compile time (static polymorphism). Overriding: subclass provides same signature as parent, resolved at runtime (dynamic polymorphism).

Why?

Android: Activity onCreate(Bundle) override; overload might be showToast(msg) vs showToast(msg, duration).

How?

@Override in Java; override keyword in Kotlin. Use super.onCreate() when overriding lifecycle methods.`,
      hi: `What?

Overload alag params compile time. Override child same signature runtime.

Why?

onCreate override example.

How?

@Override ya override keyword.`
    },
    {
      q: "Class initialization vs object instantiation",
      en: `What?

Instantiation: creating an object with \`new\` or constructor — memory allocated on heap. Initialization: running constructors, instance init blocks, and setting fields. Class initialization: static blocks run once when class is first loaded.

Why?

Order matters: static init → constructor → instance init {} in Kotlin/Java for debugging static NPE and singleton patterns.

How?

Example: \`val user = User("a")\` is instantiation; static { } in Java runs on first class reference.`,
      hi: `What?

Instantiation object banana. Initialization constructor/init. Static class load par ek baar.

Why?

Order samjho debug ke liye.

How?

User() instantiate, static block alag.`
    },
    {
      q: "Multiple inheritance in Java — how to achieve",
      en: `What?

Java does not allow a class to extend multiple classes (no multiple inheritance of implementation). You achieve multiple types via implementing multiple interfaces.

Why?

Diamond problem avoided. Kotlin same for classes; use interfaces and default interface methods for mixin-style behavior.

How?

\`class Worker implements Payable, Serializable { }\` — one class, many interface contracts.`,
      hi: `What?

Do class extend nahi. Multiple interface implement karo.

Why?

Diamond problem avoid.

How?

implements A, B example.`
    }
    ]
  },
  {
    id: "oops",
    label: "OOP Concepts",
    icon: "fa-solid fa-shapes",
    items: [
    {
      q: "What is Object-Oriented Programming (OOP)?",
      en: `What?

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (fields/attributes) and code (methods/behaviors). It models real-world entities to make software development more intuitive.

Why?

Before OOP, procedural programming (like C) focused on functions and sequences of actions. As codebases grew, procedural code became hard to maintain, debug, and scale because data was separated from functions, leading to global state issues. OOP solves this by binding data and functions together, preventing unauthorized access and promoting modularity.

How?

OOP is built on four core pillars:
1. Encapsulation: Restricting direct access to an object's state and exposing it only through public methods.
2. Inheritance: Allowing a new class to inherit state and behavior from an existing class.
3. Polymorphism: Allowing different classes to be treated as instances of the same superclass, enabling a single interface to represent multiple forms.
4. Abstraction: Hiding complex implementation details and showing only the essential features to the user.`,
      hi: `What?

Object-Oriented Programming (OOP) ek programming paradigm hai jo "objects" ke concept par kaam karta hai. Objects ke andar data (variables) aur behavior (methods) dono ek sath hote hain. Yeh real-world entities ko code mein map karne ka tareeqa hai.

Why?

OOP se pehle, procedural programming (jaise C language) mein functions aur steps par focus hota tha. Jab projects bade hote the, to procedural code ko maintain aur scale karna bahut mushkil ho jata tha kyunki data aur functions alag-alag hote the, jisse variables kahin se bhi change ho jate the aur bugs aate the. OOP is problem ko solve karta hai data aur methods ko ek unit (class) mein band karke.

How?

OOP char main pillars par chalta hai:
1. Encapsulation: Data ko safe rakhna aur direct access block karke methods ke zariye expose karna.
2. Inheritance: Ek nayi class ko purani class ke features aur behavior reuse karne dena.
3. Polymorphism: Ek hi method ya interface ko alag-alag tarike se behave karne ki permission dena.
4. Abstraction: Complex logic ko andar chhupana aur bahar sirf zaroori features dikhana.`
    },
    {
      q: "Classes, Objects, and Constructors",
      en: `What?

A Class is a blueprint, template, or user-defined data type that defines the structure and behavior of objects. An Object is a physical instance of a class that occupies memory. A Constructor is a special member function called automatically when an object is created, used to initialize the object's state.

Why?

Without classes and objects, we cannot create custom structured data types with behaviors. Without constructors, we would have to manually initialize every field of an object after creation, which is error-prone, violates encapsulation, and leads to incomplete or invalid object states.

How?

In Java/Kotlin, you define a class and instantiate objects:

\`\`\`kotlin
class Product(val id: String, var price: Double) {
    init {
        require(price >= 0.0) { "Price cannot be negative" }
    }
}

val laptop = Product("P101", 59999.0) // Instantiation
\`\`\`

Types of Constructors:
1. Default Constructor: Provided by the compiler if no constructor is written; initializes fields to default values.
2. Parameterized Constructor: Written by the developer to initialize an object with custom values at creation time.
3. Kotlin specific: Primary constructor (declared in class header) and Secondary constructors (using \`constructor\` keyword, must delegate to primary).`,
      hi: `What?

Class ek blueprint ya template hai jo objects ka structure aur behavior define karti hai. Object usi class ka ek physical instance hota hai jo heap memory occupy karta hai. Constructor ek special method hota hai jo object bante hi automatically call hota hai aur uske variables ko initialize karta hai.

Why?

Bina class aur object ke hum custom data types aur behaviors nahi bana sakte. Aur bina constructor ke, object banane ke baad hume uske har variable ko manually set karna padega, jisse code lamba hoga, galti ke chances badhenge, aur object ek invalid state mein reh sakta hai (jaise product bina price ke ban jana).

How?

Java aur Kotlin mein class aur object aise bante hain:

\`\`\`kotlin
class Product(val id: String, var price: Double) { init { require(price >= 0.0) { "Price negative nahi ho sakti" } }
}.

val laptop = Product("P101", 59999.0) // Object creation
\`\`\`

Constructors ke types:
1. Default Constructor: Agar aap koi constructor nahi likhte, to compiler khud ek no-argument constructor de deta hai.
2. Parameterized Constructor: Isme custom values pass karke object ko initialize kiya jata hai.
3. Kotlin specific: Primary constructor class header mein hota hai, aur secondary constructors \`constructor\` keyword se bante hain aur primary ko delegate karte hain.`
    },
    {
      q: "Encapsulation & Access Modifiers",
      en: `What?

Encapsulation is the practice of wrapping data (variables) and code (methods) together into a single unit (class) and restricting direct access to some of the object's components. It is also known as "Data Hiding". Access Modifiers control this visibility.

Why?

If class fields are public, any external code can modify them directly without validation (e.g., setting \`bankAccount.balance = -5000\`). This breaks object integrity and violates business rules. Encapsulation ensures that the object has absolute control over its own state.

How?

Mark fields as \`private\` and expose them only via public getter and setter methods that contain validation logic:

\`\`\`kotlin
class BankAccount {
    private var balance: Double = 0.0 // Hidden state

    fun deposit(amount: Double) {
        if (amount > 0) {
            balance += amount // Validated mutation
        }
    }

    fun getBalance(): Double = balance // Read-only access
}
\`\`\`

Access Modifiers:
- \`private\`: Visible only within the same class (or file in Kotlin).
- \`protected\`: Visible to subclasses and the same package.
- \`public\`: Visible everywhere.
- \`internal\` (Kotlin) / Default (Java): Visible within the same Gradle module (Kotlin) or package (Java).`,
      hi: `What?

Encapsulation ka matlab hai data (variables) aur code (methods) ko ek single unit (class) mein pack karna aur direct access ko restrict karna. Ise "Data Hiding" bhi kehte hain. Visibility ko control karne ke liye Access Modifiers ka use kiya jata hai.

Why?

Agar class ke variables public honge, to koi bhi bahar ka code unhe direct change kar dega bina kisi rule check ke (jaise \`bankAccount.balance = -5000\` set kar dena). Isse app ka logical state kharab ho jayega. Encapsulation se class apne data par poora control rakhti hai.

How?

Variables ko \`private\` mark karo aur unhe public getters/setters ya safe methods ke zariye expose karo jisme validation logic ho:

\`\`\`kotlin
class BankAccount { private var balance: Double = 0.0 // Hidden data.

fun deposit(amount: Double) {
        if (amount > 0) {
            balance += amount // Validated change
        }
    }

fun getBalance(): Double = balance // Read-only access
}
\`\`\`

Access Modifiers:

- \`private\`: Sirf usi class (ya Kotlin mein usi file) ke andar dikhega.
- \`protected\`: Subclasses aur same package mein dikhega.
- \`public\`: Har jagah visible hoga.
- \`internal\` (Kotlin): Same Gradle module ke andar visible hoga. Java mein default modifier same package tak limited hota hai.`
    },
    {
      q: "Inheritance & Dynamic Method Overriding",
      en: `What?

Inheritance is a mechanism where a new class (child/subclass) inherits properties and behaviors from an existing class (parent/superclass), establishing an "IS-A" relationship. Method Overriding allows a child class to provide a specific implementation of a method that is already defined in its parent class.

Why?

Inheritance promotes code reuse, reducing duplication. Overriding enables runtime polymorphism, allowing child classes to customize or extend parent behavior without modifying the parent class code.

How?

In Java, you use \`extends\`. In Kotlin, classes are final by default, so you must mark the parent class and method as \`open\`:

\`\`\`kotlin
open class Animal {
    open fun makeSound() {
        println("Animal makes a sound")
    }
}

class Dog : Animal() {
    override fun makeSound() {
        println("Dog barks") // Overridden behavior
    }
}
\`\`\`

The Diamond Problem:
Java and Kotlin do not support multiple inheritance of classes (e.g., \`class C extends A, B\`) to avoid ambiguity. If both A and B have a method \`foo()\`, class C wouldn't know which one to inherit. This is solved by allowing multiple inheritance of interfaces, where the implementing class must explicitly override and resolve the conflict if default implementations overlap.`,
      hi: `What?

Inheritance ek aisa mechanism hai jisme ek nayi class (child class) purani class (parent class) ke properties aur behaviors ko acquire karti hai, jisse unke beech "IS-A" relationship banta hai. Method Overriding child class ko parent class ke kisi method ko apna custom behavior dene ki permission deta hai.

Why?

Inheritance se code reusability badhti hai aur duplicate code likhne se bacha jata hai. Overriding se runtime polymorphism achieve hota hai, jisse parent class ke code ko bina chhede child classes apna custom behavior implement kar sakti hain.

How?

Java mein \`extends\` use hota hai. Kotlin mein classes default roop se final hoti hain, isliye parent class aur method ko \`open\` mark karna padta hai:

\`\`\`kotlin
open class Animal { open fun makeSound() { println("Animal sound") }
}.

class Dog : Animal() {
    override fun makeSound() {
        println("Dog barks") // Custom override
    }
}
\`\`\`

The Diamond Problem:
Java aur Kotlin mein multiple class inheritance (jaise \`class C : A, B\`) supported nahi hai taaki ambiguity se bacha ja sake. Agar A aur B dono mein \`foo()\` method ho, to C confuse ho jayega ki kiska method run kare. Is problem ko solve karne ke liye interfaces ka use kiya jata hai, kyunki ek class multiple interfaces implement kar sakti hai aur conflict hone par khud override karke solve karti hai.`
    },
    {
      q: "Polymorphism — Compile-time vs Runtime",
      en: `What?

Polymorphism means "many forms". It allows objects of different classes to respond to the same method call in their own unique way.
1. Compile-time (Static) Polymorphism: Method Overloading.
2. Runtime (Dynamic) Polymorphism: Method Overriding.

Why?

Overloading improves code readability by allowing methods performing similar tasks with different inputs to share the same name (e.g., \`print(int)\`, \`print(String)\`). Overriding allows writing highly flexible, generic code that works with a parent reference but executes child-specific logic at runtime.

How?

- Method Overloading (Compile-time): Same method name, different parameter list (type, number, or order) within the same class. Resolved by the compiler at compile-time.
- Method Overriding (Runtime): Same method signature in parent and child. Resolved at runtime using Dynamic Method Dispatch.

\`\`\`kotlin
// Overloading (Compile-time)
fun calculateArea(radius: Double): Double = Math.PI * radius * radius
fun calculateArea(length: Double, width: Double): Double = length * width

// Overriding & Dynamic Method Dispatch (Runtime)
val myAnimal: Animal = Dog()
myAnimal.makeSound() // Prints "Dog barks" at runtime
\`\`\`

Here, the compiler only checks if \`Animal\` has \`makeSound()\`. At runtime, the JVM looks at the actual object type in the heap (\`Dog\`) and executes \`Dog.makeSound()\`. This is Dynamic Method Dispatch.`,
      hi: `What?

Polymorphism ka matlab hai "ek naam, kai roop". Yeh alag-alag classes ke objects ko ek hi method call par apne tarike se respond karne ki permission dena hai.
1. Compile-time (Static) Polymorphism: Method Overloading.
2. Runtime (Dynamic) Polymorphism: Method Overriding.

Why?

Overloading se code readable banta hai kyunki same kaam karne wale methods (lekin alag inputs ke sath) ek hi naam share karti hain (jaise \`print(int)\` aur \`print(String)\`). Overriding se code flexible banta hai, jahan hum parent reference ka use karke child class ke methods ko runtime par execute kar sakte hain.

How?

- Method Overloading: Same class mein same method name lekin alag parameters (type, number ya order). Compiler ise compile-time par hi resolve kar leta hai.
- Method Overriding: Parent aur child class mein same method signature. Ise JVM runtime par Dynamic Method Dispatch ke zariye resolve karta hai.

\`\`\`kotlin
// Overloading (Compile-time)
fun calculateArea(radius: Double): Double = Math.PI * radius * radius
fun calculateArea(length: Double, width: Double): Double = length * width.

// Overriding (Runtime)
val myAnimal: Animal = Dog()
myAnimal.makeSound() // Runtime par "Dog barks" print hoga
\`\`\`.

Yahan compiler sirf check karta hai ki kya \`Animal\` class mein \`makeSound()\` hai. Lekin runtime par JVM heap memory ke actual object (\`Dog\`) ko dekhta hai aur \`Dog\` ka method run karta hai. Ise Dynamic Method Dispatch kehte hain.`
    },
    {
      q: "Composition over Inheritance",
      en: `What?

'Composition over Inheritance' is a design principle stating that classes should achieve polymorphic behavior and code reuse by containing instances of other classes ('HAS-A' relationship) rather than inheriting from a parent class ('IS-A' relationship).

Why?

Inheritance creates tight coupling. If the parent class changes, it can break the subclass (Fragile Base Class problem). Also, inheritance is static — you cannot change behavior at runtime. Composition creates loose coupling, is highly flexible, allows swapping collaborators at runtime, and makes unit testing with fakes/mocks incredibly easy.

How?

Instead of making \`CheckoutService\` inherit from \`RazorpayPayment\`, hold a reference to a \`PaymentProcessor\` interface:

\`\`\`kotlin
interface PaymentProcessor {
    fun process(amount: Double): Boolean
}

class CheckoutService(private val paymentProcessor: PaymentProcessor) {
    fun checkout(total: Double) {
        paymentProcessor.process(total) // Loose coupling
    }
}
\`\`\`

Now, you can pass \`RazorpayProcessor\`, \`StripeProcessor\`, or a \`FakePaymentProcessor\` for testing at runtime without modifying \`CheckoutService\`. Kotlin also supports native Class Delegation:

\`\`\`kotlin
class CustomList<T>(val innerList: ArrayList<T>) : List<T> by innerList
\`\`\`

This delegates all \`List\` methods to \`innerList\` automatically, avoiding subclassing \`ArrayList\`.`,
      hi: `What?

'Composition over Inheritance' ek design principle hai jo kehta hai ki code reusability aur flexibility ke liye classes ko doosri classes ke instances hold karne chahiye ('HAS-A' relationship), bajay unhe inherit karne ke ('IS-A' relationship).

Why?

Inheritance tight coupling create karta hai. Agar parent class mein koi change hoga, to child class break ho sakti hai (Fragile Base Class problem). Iske alawa, inheritance is static. Aap runtime par behavior change nahi kar sakte. Composition loose coupling deta hai, runtime par behavior swap karne deta hai, aur unit testing ko fakes/mocks ke sath bahut easy bana deta hai.

How?

\`CheckoutService\` ko \`RazorpayPayment\` se inherit karne ke bajay, usme \`PaymentProcessor\` interface ka reference hold karo:

\`\`\`kotlin
interface PaymentProcessor { fun process(amount: Double): Boolean
}.

class CheckoutService(private val paymentProcessor: PaymentProcessor) {
    fun checkout(total: Double) {
        paymentProcessor.process(total) // Loose coupling
    }
}
\`\`\`

Ab aap runtime par \`RazorpayProcessor\`, \`StripeProcessor\`, ya testing ke liye \`FakePaymentProcessor\` pass kar sakte hain bina \`CheckoutService\` ko change kiye. Kotlin class delegation ko bhi support karta hai:

\`\`\`kotlin
class CustomList<T>(val innerList: ArrayList<T>) : List<T> by innerList
\`\`\`.

Yeh \`List\` ke saare methods ko automatically \`innerList\` par delegate kar deta hai, bina \`ArrayList\` ko inherit kiye.`
    },
    {
      q: "SOLID Principles",
      en: `What?

SOLID is an acronym for five object-oriented design principles that make code more understandable, flexible, and maintainable:
1. S - Single Responsibility Principle (SRP): A class should have only one reason to change.
2. O - Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.
3. L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without breaking correctness.
4. I - Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.
5. D - Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions.

Why?

Without SOLID, code becomes a 'spaghetti monster' where changing one feature breaks unrelated parts of the app, testing is impossible, and adding new features requires rewriting massive chunks of code.

How?

- SRP: Separate UI, business logic, and data. Don't let an Activity handle API calls; delegate to a Repository.
- OCP: Use interfaces. To add a new payment method, implement \`PaymentProcessor\` rather than modifying an existing \`when\` block in \`CheckoutService\`.
- LSP: Don't override a parent method to throw \`UnsupportedOperationException\`.
- ISP: Split large interfaces. Instead of one massive \`Listener\` with 10 methods, create smaller ones like \`OnClickListener\`, \`OnDoubleClickListener\`.
- DIP: Inject interfaces via Hilt. ViewModel depends on \`ProductRepository\` (interface), not \`RetrofitProductRepository\` (concrete implementation).`,
      hi: `What?

SOLID paanch design principles ka ek set hai jo software ko maintainable, flexible, aur scalable banata hai:
1. S - Single Responsibility Principle (SRP): Ek class ki sirf ek hi responsibility (ya badalne ka ek hi reason) honi chahiye.
2. O - Open/Closed Principle (OCP): Code extension ke liye open hona chahiye, lekin modification ke liye closed.
3. L - Liskov Substitution Principle (LSP): Child class ko parent class ki jagah safely use kiya ja sake bina kisi crash ya behavior change ke.
4. I - Interface Segregation Principle (ISP): Ek bada interface banane ke bajay chhote-chhote specific interfaces banane chahiye takki clients ko unused methods implement na karne padein.
5. D - Dependency Inversion Principle (DIP): High-level modules ko low-level modules par depend nahi hona chahiye. Dono ko abstractions (interfaces) par depend hona chahiye.

Why?

Bina SOLID ke, code ek 'spaghetti' ban jata hai jahan ek jagah change karne par doosri jagah bugs aa jate hain, testing impossible ho jati hai, aur naye features add karne ke liye poora code dubara likhna padta hai.

How?

- SRP: UI, business logic aur data ko alag rakho. Activity mein API call mat karein. Use Repository ko do.
- OCP: Interfaces use karo. Naya payment method add karne ke liye \`PaymentProcessor\` implement karo, na ki \`CheckoutService\` ke andar \`when\` block ko edit karo.
- LSP: Kisi parent method ko child mein override karke \`UnsupportedOperationException\` throw mat karein.
- ISP: Bade interfaces ko split karo. Ek bada \`Listener\` jisme 10 methods hon, uske bajay chhote interfaces jaise \`OnClickListener\` banao.
- DIP: Hilt ke zariye interfaces inject karo. ViewModel \`ProductRepository\` (interface) par depend kare, na ki \`RetrofitProductRepository\` (concrete implementation) par.`
    }
    ]
  },
  {
    id: "kotlin",
    label: "Kotlin",
    icon: "fa-solid fa-code",
    items: [
    {
      q: "What is Kotlin?",
      en: `What?

Kotlin is a modern, statically typed programming language developed by JetBrains and officially supported by Google for Android development.

Statically typed means the compiler knows the type of every variable at compile time — not only at runtime.

Example:
val name: String = "Mukesh"
val age: Int = 25

Why?

Java was powerful but had pain points on Android. Null references caused NullPointerException — for example name.length() when name is null. Most Android crashes came from null references.

Other problems:
- Too much boilerplate code
- Verbose syntax
- No first-class coroutines
- Weak null safety
- Slower development

Kotlin was designed to solve these issues.

How?

Kotlin compiles into JVM bytecode:
Kotlin code → Kotlin compiler → bytecode → Android Runtime (ART)

Type inference lets you write:
val name = "Mukesh"

The compiler infers String automatically — less noise, same type safety.`,
      hi: `What?

Kotlin ek modern, statically typed programming language hai. JetBrains ne ise banaya hai, aur Google ise Android development ke liye officially support karta hai.

Statically typed ka matlab hai: compile time par hi compiler ko pata hota hai ki har variable ka type kya hai, sirf runtime par nahi.

Example:
val name: String = "Mukesh"
val age: Int = 25

Why?

Java powerful tha, lekin Android par kai problems thi. Agar koi variable null hai aur aap \`name.length()\` call karte ho, to NullPointerException aata hai. Android crashes ka sabse bada reason yahi hai.

Other problems:

- Bahut zyada boilerplate code hota hai.
- Syntax verbose hota hai.
- Coroutines pehle native nahi thi.
- Null safety kamzor thi.
- Development slow ho jata tha.

Kotlin in sab problems ko solve karne ke liye design ki gayi thi.

How?

Kotlin JVM bytecode mein compile hoti hai.

Kotlin code → Kotlin compiler → JVM bytecode → Android Runtime (ART)

Type inference se aap \`val name = "Mukesh"\` likh sakte ho. Compiler khud String samajh leta hai. Kam code likhna padta hai, lekin type safety wahi rehti hai.`
    },
    {
      q: "Why Kotlin over Java for Android?",
      en: `What?

Kotlin is Google's preferred language for Android with first-class Jetpack, Compose, and coroutine support. Null safety at compile time eliminates a huge class of NPE crashes that still plague Java codebases in production.

Why?

Concise syntax — data classes, extension functions, default parameters, and smart casts reduce boilerplate compared to Java POJOs, builders, and verbose null checks.

Coroutines provide structured concurrency for network, Room, and Razorpay flows without callback hell or raw thread management. Java interop lets you migrate module-by-module — ShopKirana-style brownfield apps rarely rewrite everything at once.

How?

Official Android docs, samples, and new APIs (Compose, Paging 3, DataStore) assume Kotlin idioms. Interview angle: cite measurable wins — fewer NPEs in Crashlytics, faster feature delivery, easier onboarding for teams already using Kotlin in Flutter/Dart-adjacent mobile orgs.`,
      hi: `What?

Google ne Android ke liye Kotlin ko officially prefer kiya hai. Naye Jetpack APIs, Compose samples, aur documentation Kotlin-first hai.

Why?

Null safety compile time par pakad leti hai wo crashes jo Java mein production mein bhi common hain. Especially API models aur Bundle extras par.

Data class, extension functions, coroutines se code chhota aur readable hota hai. Purana Java code saath chal sakta hai. Migration module-by-module practical hai.

Coroutines se Retrofit aur Room aur payment callback chains clean ho jati hain. viewModelScope structured concurrency deta hai. Rotation par leak kam.

How?

Interview mein apne project jodo: Java se Kotlin shift ke baad Crashlytics NPE down, feature velocity up. Concrete example bolo.`
    },
    {
      q: "val vs var vs const",
      en: `What?

var declares a mutable reference — you can reassign the variable to point to another object. val declares a read-only reference — reassignment is forbidden, but if the referenced object is mutable (e.g., ArrayList), its internal state can still change.

Why?

const val is for compile-time constants: primitives and String at top-level or in object/companion, inlined at call sites like Java static final. Use const for API keys placeholders in BuildConfig, not for runtime-computed values.

Android convention: prefer val everywhere; use var only for local counters, UI binding refs, or lateinit-backed properties. ViewModel state exposed as val StateFlow — mutation happens inside ViewModel via private MutableStateFlow.

How?

Interview trap: val list = mutableListOf() — list reference fixed, contents mutable. Immutability for UI state means copy-on-write or persistent collections, not just val keyword.`,
      hi: `What?

var dubara assign kar sakte ho. val ka reference change nahi hota, lekin andar mutable object ho to uske andar change ho sakta hai
Const val compile-time constant hai. Top-level String/Int jaisa BuildConfig flag ke liye use hota hai. Runtime value ke liye const galat choice hai.

Why?

Android mein default val rakho. ViewModel se bahar sirf read-only state StateFlow se expose karo. var sirf local counter ya lateinit jagah use karo
Interview trap: val ke saath bhi mutableListOf() mutate ho sakti hai. UI ke liye immutable list copy karke emit karna better pattern hai.

How?

Practical example: Razorpay orderId ek baar set karo (val). Loop counter ke liye var local use karo`
    },
    {
      q: "data class, sealed class, object(Singleton)",
      en: `What?

A data class in Kotlin is specifically designed to hold data. The compiler automatically generates boilerplate code that you would otherwise have to write manually in Java, including equals(), hashCode(), toString(), copy(), and componentN() functions. It requires at least one primary constructor parameter marked as val or var. This makes it ideal for API DTOs, Room database entities, and UI state models. Under the hood, arrays in data classes break structural equality because equals() falls back to a reference check; use Collections (like List) instead.

Why?

A sealed class in Kotlin creates a closed, restricted class hierarchy where all subclasses must be known at compile time and defined within the same package or module. It acts as an abstract class with a private constructor under the hood to prevent external instantiation. This restricted structure allows compilers to validate exhaustive when expressions, eliminating the need for defensive else branches. It is perfect for robust architectural state machines such as handling Loading, Success, and Error states in MVVM or MVI patterns.

object creates a thread-safe, lazily-initialized Singleton pattern instantly without any boilerplate. The JVM achieves this via a static initialization block under the hood, completely removing the need for manual double-checked locking mechanisms. It is ideal for dependency injection modules, stateless utility helper classes, or representing stateless nodes (like Loading) inside sealed hierarchies.

How?

Interview: sealed class vs enum — Enums restrict values to a fixed set of instances with identical structures, whereas sealed classes restrict types, allowing different subclasses to maintain entirely unique states, payloads, and constructors (e.g., Success(val list: List) vs Error(val exception: Exception)). data class vs class — data class automatically overrides structural equality (==), while standard class relies on referential equality (===). object vs companion object — object is a global standalone singleton; companion object is scoped inside a class to mimic static Java members tied to that class’s lifecycle.`,
      hi: `What?

Kotlin mein data class ko khaas taur par data hold karne ke liye design kiya gaya hai. Compiler equals(), hashCode(), toString(), copy(), aur componentN() jaise boilerplate code ko automatic generate karta hai jo Java mein manually likhna padta hai. Iske primary constructor mein kam se kam ek val ya var parameter hona zaroori hai. Yeh API DTOs, Room database entities, aur UI state models ke liye bilkul sahi hai. Under the hood, data class mein arrays use karne par structural equality break ho jaati hai kyunki equals() reference check karta hai; isliye humesha List ka use karein.

Why?

Sealed class ek closed aur restricted class hierarchy banati hai jiske saare subclasses ka compile time par pata hona zaroori hai (aur woh same package/module mein hone chahiye). Bytecode mein yeh ek private constructor wali abstract class banti hai taaki bahar se instantiate na ho sake. Is restricted structure ki wajah se compiler exhaustive when expressions ko validate kar pata hai, jisse defensive else branches ki zaroorat khatam ho jaati hai. Yeh MVVM ya MVI patterns mein Loading, Success, aur Error states ko handle karne ke liye sabse best approach hai.

Object keyword bina kisi boilerplate ke ek thread-safe aur lazily-initialized Singleton pattern bana deta hai. JVM isey static initialization block ke through achieve karta hai, jisse manual double-checked locking ki zaroorat nahi padti. Yeh dependency injection modules, stateless utility helper classes, ya sealed hierarchies ke andar stateless nodes ko represent karne ke liye ideal hai.

How?

Interview Tip: Sealed class vs enum — Enums fixed instances tak restricted hote hain jinki property structure identical hoti hai, jabki sealed classes types ko restrict karti hain jisse har subclass apna alag data payload aur constructor rakh sakta hai (jaise Success(Data) vs Error(Throwable)). Data class vs class — data class automatic structural equality (==) check karti hai, jabki normal class referential equality (===) par depend karti hai. Object vs companion object — object ek universal standalone singleton hai, jabki companion object kisi class ke andar scoped hota hai jo Java ke static members ki tarah behavior deta hai.`
    },
    {
      q: "coroutines vs threads",
      en: `What?

A thread is a managed execution path managed directly by the Operating System (OS). It is heavy, consuming around 1MB of memory for its stack, and switching between threads (context switching) requires OS kernel intervention which is CPU-expensive. A coroutine is a framework-managed lightweight pseudo-thread executed on top of thread pools. It is purely user-land code, consuming only a few kilobytes of memory, and switching between them is a simple memory-pointer manipulation managed by the Kotlin runtime.

Why?

Threads are inherently blocking; when you perform a network call on a thread, that entire OS thread stalls, wasting memory and CPU resources. If you spawn thousands of threads, the system will crash with an OutOfMemoryError. Coroutines are non-blocking and rely on a suspension mechanism. When a coroutine executes a suspending network call, it unhooks itself from the underlying thread, leaving that thread completely free to run other tasks. Once the network call finishes, the coroutine resumes on an available thread.



How?

Interview: The core difference lies in scaling and scheduling. Threads are preemptive (the OS forces context switches) and resource-heavy, limiting an app to a few hundred threads. Coroutines are cooperative (they must voluntarily yield control via suspend functions) and lightweight, allowing you to launch hundreds of thousands of them concurrently without any performance hit. Remember: Coroutines do not replace threads; they run *on top* of them as a highly optimized abstraction layer.`,
      hi: `What?

Thread ek OS-managed execution path hota hai jo kaafi heavy hota hai (lagbhag 1MB per thread stack memory). Threads ke beech ka switch (context switching) OS kernel karta hai jo CPU-expensive hota hai. Coroutine ek light-weight, framework-managed pseudo-thread hai jo actual threads ke upar chalta hai. Yeh user-land (Kotlin runtime) mein manage hota hai, sirf kuch kilobytes consume karta hai, aur iska switching sirf ek memory pointer update hota hai.

Why?

Threads blocking hote hain; agar aap thread par network call karoge toh woh thread block ho jayega aur resources waste honge. Hazaron threads banane se app OutOfMemoryError dekar crash ho jayegi. Coroutines non-blocking hote hain kyunki yeh suspension par kaam karte hain. Jab ek coroutine \`suspend\` function par rukta hai, toh woh apne underlying thread ko free kar deta hai taaki woh thread doosra kaam kar sake. Call poora hone par coroutine kisi bhi free thread par resume ho jata hai.

How?

Interview Tip: Main difference scaling aur scheduling ka hai. Threads preemptive hote hain (OS zabardasti switch karwata hai) aur unki line limited hoti hai. Coroutines cooperative hote hain (woh khud \`yield\` ya \`suspend\` hote hain) aur ek hi time par aap laakhon coroutines chala sakte hain bina system slow kiye. Humesha yaad rakhein—Coroutine thread ko replace nahi karta, balki threads ke upar ek efficient abstraction layer provide karta hai.`
    },
    {
      q: "Structured concurrency in Kotlin",
      en: `What?

Structured concurrency is a design paradigm which guarantees that concurrent operations are bundled within a specific scope, ensuring they have a clear lifetime, hierarchy, and explicit boundaries. Instead of launching free-floating asynchronous tasks that can leak into the background, every coroutine in Kotlin must be launched inside a \`CoroutineScope\` (like \`viewModelScope\` or \`lifecycleScope\`). This creates a parent-child relationship between the scope and all coroutines started within it.

Why?

Without structured concurrency, managing asynchronous code is error-prone; if a background task loses its connection to the UI (e.g., a screen rotation), it keeps running, causing memory leaks and wasting CPU cycles. Structured concurrency automatically enforces three critical lifecycle rules: 
1. A parent scope cannot complete until all its children coroutines have finished.
2. If a parent scope is cancelled, all its children coroutines are automatically cancelled.
3. If a child coroutine encounters an unhandled exception, it propagates upwards, cancels the parent, and subsequently cancels all other sibling coroutines (unless a \`SupervisorJob\` is used).



How?

Interview: The core pillars under the hood are \`CoroutineScope\` (defines the boundary/lifecycle) and \`Job\` (tracks hierarchy and state control). If asked about error handling in interviews, always distinguish between a standard \`Job\` and a \`SupervisorJob\`. In a standard \`Job\`, a single child failing brings down the entire scope. In a \`SupervisorJob\`, the failure of one child does not cancel its siblings or the parent, making it ideal for independent parallel tasks like downloading multiple images simultaneously.`,
      hi: `What?

Structured concurrency ek aesa programming paradigm hai jo yeh ensure karta hai ki saare concurrent operations ek specific scope ke andar bound hon. Iska matlab hai ki koi bhi coroutine free-floating nahi ho sakta; use kisi \`CoroutineScope\` (jaise \`viewModelScope\`) ke andar hi launch hona padega. Yeh scope aur coroutines ke beech ek parent-child relationship (hierarchy) khadi karta hai jisse unka lifetime fixed ho jata hai.

Why?

Traditional asynchronous programming mein agar koi screen destroy ho jaye toh background tasks chalte rehte hain, jisse memory leaks aur battery drain hoti hai. Structured concurrency is problem ko automatic solve karta hai teen rules ke through:
1. Parent scope tab tak complete nahi hoga jab tak uske saare bacche (child coroutines) khatam na ho jayein.
2. Agar parent cancel hota hai, toh uske saare child coroutines automatically cancel ho jayenge.
3. Agar kisi ek child coroutine mein exception aata hai, toh woh parent ko cancel karega, aur parent baaki saare sibling coroutines ko cancel kar dega.

How?

Interview Tip: Under the hood, yeh pura khel \`CoroutineScope\` aur \`Job\` ka hota hai jo hierarchy aur state ko track karte hain. Interviewer aapse humesha \`Job\` aur \`SupervisorJob\` ka farq poochega. Standard \`Job\` mein agar ek child fail hua toh poora scope aur saare siblings crash ho jayenge. Jabki \`SupervisorJob\` mein ek child ke fail hone par baki siblings par koi asar nahi padta, jo ki independent parallel tasks (jaise multiple network calls) ke liye perfect hai.`
    },
    {
      q: "lateinit vs lazy",
      en: `What?

\`lateinit\` is a modifier used only on mutable properties (\`var\`) to defer their initialization until a later time, telling the compiler that this variable will definitely be initialized before access. It can only be used with non-primitive, non-nullable types. \`lazy\` is a delegate function used only on read-only properties (\`val\`) that computes the value only upon its very first access and caches it for all subsequent calls.

Why?

\`lateinit\` solves the problem of avoiding boilerplate null-checks for variables that cannot be initialized in the constructor but are guaranteed to be set before use, such as variables initialized inside dependency injection setups (\`@Inject\`), setup methods (\`@Before\` in testing), or lifecycle callbacks (\`onCreate()\`). \`lazy\` solves the problem of performance optimization; it prevents heavy computation, database queries, or object creation from blocking application startup or object creation by delaying that work until the data is actually requested.



How?

Interview: The core operational differences are immutability and thread safety. \`lateinit var\` is highly mutable, completely non-thread-safe by default, and throws an explicit \`UninitializedPropertyAccessException\` if read too early. Conversely, \`by lazy\` is read-only (\`val\`) and comes with built-in thread safety modes via \`LazyThreadSafetyMode\` (e.g., \`SYNCHRONIZED\` which uses a double-checked lock under the hood, \`PUBLICATION\`, or \`NONE\`).`,
      hi: `What?

\`lateinit\` ek modifier hai jise sirf badalne wale properties (\`var\`) par use kiya jata hai taaki unka initialization baad me kiya ja sake. Yeh compiler ko assurance deta hai ki access karne se pehle isme value daal di jayegi. Ise sirf non-primitive aur non-nullable types par lagaya ja sakta hai. \`lazy\` ek delegate hai jise sirf read-only properties (\`val\`) par lagaya jata hai, jo property ki value tabhi calculate karta hai jab use pehli baar code me call kiya jaye, aur baad ke liye use cache kar leta hai.

Why?

\`lateinit\` ka main use tab hota hai jab aap constructor me initialization nahi kar sakte par baar-baar null-checks se bhi bachna chahte hain, jaise Dependency Injection (\`@Inject\`), testing ke \`@Before\` setups, ya Android ke \`onCreate()\` lifecycle me. \`lazy\` ka use performance badhane ke liye hota hai; agar koi heavy object hai (jaise database setup ya heavy UI drawing), toh use pehle se initialize karke memory block karne ke bajay tab banaya jata hai jab sach me uski zaroorat ho.

How?

Interview Tip: Interviewer humesha immutability aur thread-safety par sawal poochega. \`lateinit var\` hota hai jo baad me re-assign ho sakta hai aur isme koi inherent thread-safety nahi hoti—agar pehle access kiya toh \`UninitializedPropertyAccessException\` aayega. Jabki \`by lazy\` sirf \`val\` ke sath chalta hai aur under the hood \`SYNCHRONIZED\` mode use karta hai jo ise multi-threading me bhi safe banata hai jab tak aap use manually \`NONE\` par set na karein.`
    },
    {
      q: "inline, reified, higher-order functions",
      en: `What?

A Higher-Order Function is a function that accepts another function as a parameter, returns a function, or does both. An \`inline\` function is a performance-optimization feature that instructs the compiler to copy-paste the function's bytecode (and its lambda arguments) directly into the call site during compilation, eliminating object allocation overhead. A \`reified\` modifier can only be used inside an inline function; it prevents type erasure, making the generic type \`T\` accessible at runtime as a concrete class.

Why?

Higher-order functions enable powerful functional programming abstractions like \`.filter()\` or \`.map()\`. However, in Java/JVM, every lambda is compiled into an anonymous inner class object, which strains memory and adds execution overhead. Marking the higher-order function as \`inline\` completely solves this by substituting the code directly at the call site, eliminating object creation. Once inlined, you can attach \`reified\` to generics to easily run checks like \`if (item is T)\` or \`T::class.java\`, which are normally forbidden due to JVM type erasure.



How?

Interview: Always remember that \`inline\` shouldn't be used blindly; using it on massive functions without lambdas balloons the compiled APK/JAR size. If you want to inline a function but keep one of its multiple lambdas as a real object, use the \`noinline\` modifier. If an interviewer asks how to pass a generic type class securely without passing \`clazz: Class<T>\`, the answer is always a combination of \`inline\` + \`reified\` (e.g., \`inline fun <reified T> Intent()\`).`,
      hi: `What?

Higher-Order Function ek aesa function hai jo kisi dusre function ko as a parameter leta hai ya fir ek function return karta hai. \`inline\` ek performance optimization keyword hai jo compiler ko bolta hai ki compile-time par function ki bytecode aur uske lambda argument ko seedhe call-site par copy-paste kar de. \`reified\` modifier ka use sirf inline functions ke andar hota hai jo generic type \`T\` ko runtime par type erasure se bachata hai aur use actual class ki tarah access karne deta hai.

Why?

Higher-order functions humein functional programming ka power dete hain (jaise \`.filter {}\`). Par JVM par har lambda ke liye ek anonymous inner class ka object banta hai, jo memory par load daalta hai. Function ko \`inline\` karne se woh object allocation ka overhead 100% khatam ho jata hai. Jab function inline ho jata hai, tab \`reified\` ka use karke aap runtime par generic type check kar sakte hain, jaise \`T::class.java\`, jo normal generics mein JVM type erasure ki wajah se allow nahi hota.

How?

Interview Tip: Interviewer aapse poochega ki kya saare functions ko inline kar dena chahiye? Jawaab hai nahi, kyunki bina lambda wale bade functions ko inline karne se code copy-paste hokar APK/JAR ka size bohot bada kar dega. Agar aap kisi specific lambda ko copy-paste hone se rokna chahte hain toh \`noinline\` ka use karein. \`inline\` + \`reified\` ka sabse best practical usage Android mein \`Intent\` ya Gson parsing ke waqt \`Class<T>\` pass karne ke jhanjhat ko khatam karne ke liye hota hai.`
    },
    {
      q: "Null safety: ?, ?., ?:, !!",
      en: `What?

Kotlin type system splits String vs String? — nullable must be handled before use. Safe call ?. returns null if receiver null instead of NPE. Elvis ?: provides default: user?.name ?: "Guest".

Why?

Not-null assertion !! crashes with NPE if null — acceptable only in tests or after explicit guard you cannot express to compiler. Production Android code: avoid !!; use requireNotNull, checkNotNull, or early return.

Smart cast after if (x != null) or x is String — compiler promotes type in branch. lateinit and platform types break smart cast sometimes.

Java interop: Android SDK returns platform types String! — treat as nullable defensively when from Java APIs.

How?

Room/Retrofit with nullable columns and optional JSON fields — model nullable correctly; map to UI default in ViewModel not with !!.`,
      hi: `What?

String? nullable hai. Use se pehle handle karo. ?. safe call. Null par skip, crash nahi.

Why?

?: Elvis default deta hai. CartCount ?: 0. UI mein bahut common.

!! force unwrap. Null par NPE. Production mein avoid. Crashlytics mein dikhega.

Java Android APIs platform type deti hain. Bundle getString() nullable treat karo safe.

How?

Smart cast if check ke baad compiler samajh jata hai non-null. Lateinit exception case yaad rakho.`
    },
    {
      q: "let, run, with, apply, also",
      en: `What?

let: it receiver, returns lambda result — null checks user?.let { bind(it) }. run: this receiver, returns result — run { parseConfig() }. with: non-extension run — with(binding) { title.text = x }.

Why?

apply: this receiver, returns object — build Retrofit.Builder apply { baseUrl(...) }. also: it receiver, returns object — side effect logging also { Log.d(tag, it.toString()) }.

How?

Choose by intent: configure object → apply; transform/null-safe → let; scoped block returning value → run/with; tap along chain → also.

Overuse hurts readability — interviewers want judgment. One scope function per chain max in production code.

Android: binding.apply { btnPay.setOnClickListener {...} } in Fragment onCreateView; dto?.let { repo.save(it) } in ViewModel.`,
      hi: `What?

Apply configure karke object return. Builder pattern. let null check aur transform. also side effect, same object pass.

Why?

With/run block scope. Binding.with style ya run { computeTotal() }.

Readable code priority. Teen scope function ek line par mat likho interview mein bhi.

Null safety: user?.let { navigateProfile(it.id) }. Idiomatic Kotlin.

How?

ViewBinding setup apply { } common pattern. Razorpay checkout init bhi apply block se clean.`
    },
    {
      q: "open, public, internal visibility",
      en: `What?

Kotlin classes/methods are final by default — must mark open for inheritance or override. Java interop: open for library extensibility; app code often prefers composition over inheritance.

Why?

public is default visibility — visible everywhere. internal visible within same Gradle module only — hide Repository impl from feature modules while exposing interface via api dependency.

private file-level, class members. protected visible to subclasses (Kotlin also includes subclass in same file).

Multi-module Android: :core:data internal DAOs, public Repository interface in :core:domain. Prevents feature modules reaching Room directly — Clean Architecture boundary.

How?

Interview: internal vs public in library modules — leaking implementation couples features; use api vs implementation Gradle deps correctly.`,
      hi: `What?

Kotlin default final. Extend karne ke liye open. Java opposite tha. Interview difference bolo.

Why?

Internal same module tak. Multi-module app mein impl chhupao, interface bahar public.

Feature module ko internal Room DAO direct na mile. Sirf Repository contract dikhe.

Protected inheritance ke liye. Zyadatar composition prefer Android mein.

How?

Gradle api vs implementation ke saath internal visibility mil kar boundary banate hain.`
    },
    {
      q: "companion object and @JvmStatic",
      en: `What?

companion object is singleton tied to class — like Java static nested holder. Access via ClassName.method without instance. Use for factory methods, Intent extras keys, const-like grouped values.

Why?

@JvmStatic exposes true static methods/fields to Java callers — without it Java must call ClassName.Companion.method(). Important for Java Activities calling Kotlin utils.

@JvmField exposes property as public field to Java. @JvmOverloads generates overloads for default parameters for Java.

Android examples: Fragment newInstance(args) in companion; Room TypeConverters companion; Notification channel IDs in companion object.

How?

Avoid heavy init in companion — runs on first class touch. Prefer Hilt for DI over companion service locator anti-pattern.`,
      hi: `What?

Companion object class ke saath singleton. Factory newInstance(), EXTRA constants yahan.

Why?

@JvmStatic Java se direct static call — purane Java Activities Kotlin util call karte waqt zaroori.

Java interop: @JvmOverloads default params, @JvmField field access.

Intent extras KEY_USER_ID companion mein rakho. Typo kam.

How?

Anti-pattern: companion se getInstance() service locator. Hilt better production mein.`
    },
    {
      q: "Flow vs LiveData vs RxJava",
      en: `What?

LiveData is lifecycle-aware, main-thread focused, single active observer semantics — simple UI binding but limited operators, no coroutine-native backpressure, awkward for one-shot events without SingleLiveEvent hacks.

Why?

Flow is cold by default — collector starts producer; hot StateFlow/SharedFlow for UI state. Rich operators map, combine, debounce; integrates with coroutines and Room return types.

StateFlow: always has value, conflated — perfect for screen state (loading, list). SharedFlow: no initial value, configurable replay — use for snackbar/navigation events with extraBufferCapacity or Channel.

RxJava: mature, powerful schedulers — legacy codebases still use it; new Android work prefers Flow unless team invested in Rx.

How?

Migration path: LiveData.asFlow(), stateIn/shareIn; repeatOnLifecycle(STARTED) { vm.state.collect { render(it) } } — avoids leaking when STOPPED.`,
      hi: `What?

LiveData lifecycle-aware simple. Purane projects mein common. Event ke liye SingleLiveEvent hack awkward.

Why?

Flow coroutine native. Room Flow, Retrofit suspend ke saath natural. StateFlow UI state SSOT.

SharedFlow one-time navigation/snackbar. Replay 0 ya Channel.TICKET pattern rotation double-fire fix.

RxJava purane code mein. Naya code Flow unless team Rx expert.

How?

RepeatOnLifecycle STARTED par collect. Background leak nahi jab screen background.`
    },
    {
      q: "suspend function under the hood",
      en: `What?

Compiler transforms suspend functions via CPS (continuation-passing style) state machine — each suspension point is a label; local vars stored in state object. No thread blocked at suspend — continuation resumes later on appropriate dispatcher.

Why?

Continuation interface carries coroutine context, resumeWith result. withContext, delay, Retrofit suspend all suspend at suspension points.

Cancellation cooperative — check isActive, use cancellable suspending calls; Room/OkHttp respect cancellation when scope cancelled.

How?

Debugging: stack traces show state machine frames — enable coroutine debug probes in dev. Performance: suspend cheaper than thread for I/O-bound Android work.

Interview contrast: callback hell vs suspend sequential code reads synchronously but behaves asynchronously — same Razorpay verify flow readable top-to-bottom.`,
      hi: `What?

Suspend compiler state machine banata hai. Har await point par thread free. Continuation resume par wapas continue.

Why?

Thread block nahi hota. IO wait par pool thread doosre coroutines chala sakta hai.

Cancellation cooperative. ViewModelScope cancel par network call abort honi chahiye OkHttp/Retrofit support.

Under hood bytecode complex. Interview mein concept bolo, har opcode nahi.

How?

Readable code: val order = api.createOrder(). Val pay = razorpay.checkout(). Verify(order.id). Sequential style.`
    },
    {
      q: "init block vs constructors",
      en: `What?

Primary constructor declared in class header — concise for data classes and DI @Inject constructor. init blocks run after primary constructor — validation, logging, register listeners.

Why?

Secondary constructors must delegate this(...) to primary — use when Java-style multiple constructors needed; prefer default parameters and @JvmOverloads instead.

How?

Order: primary constructor params → property init → init blocks → secondary constructors. superclass constructor runs first in inheritance chain.

Android: Fragment requires no-arg constructor for system restore — inject via Hilt @AndroidEntryPoint not constructor params on Fragment. ViewModel gets params via SavedStateHandle or AssistedInject.

Anti-pattern: heavy work in init — delays object creation; inject Lazy or coroutine startup instead.`,
      hi: `What?

Primary constructor header mein. Hilt @Inject yahi. init block validation. Require(userId.isNotBlank()).

Why?

Secondary constructor kam use. Default params zyada Kotlin idiomatic.

Fragment system restore no-arg constructor chahta hai. Constructor inject Fragment par mat.

ViewModel AssistedInject ya SavedStateHandle se orderId lo.

How?

Init mein network call mat. Object create slow aur test mushkil.`
    },
    {
      q: "enum class vs sealed class for UI state",
      en: `What?

enum class: fixed set of singleton constants — no per-instance data except overridden properties. Good for status codes, day-of-week, simple toggles.

Why?

sealed class: hierarchy of types, each can hold different data — Success(orders: List<Order>), Error(code: Int, msg: String). when branch exhaustive without else.

UI state machines in MVVM/BLoC almost always sealed — enum cannot carry list + error metadata cleanly without parallel maps.

Compose: when(state) { is UiState.Loading -> Shimmer; is Success -> List } — compiler ensures new state added gets handled.

How?

Room/API mapping: enum with @TypeConverter for DB; sealed for presentation layer only — don't persist sealed directly without serialization strategy.`,
      hi: `What?

Enum fixed constants. PaymentStatus.PENDING jaisa simple. Har case same shape.

Why?

Sealed alag data. Error(message, retryable) vs Success(data). UI state ke liye sealed best.

When exhaustive. Naya state add kiya compile error until handle karo.

Enum DB mein TypeConverter se. Sealed presentation layer.

How?

Interview: Loading object vs data class Loading(progress: Float). Sealed flexible.`
    },
    {
      q: "Delegation: by lazy, class delegation",
      en: `What?

Property delegation by lazy, by viewModels(), by activityViewModels(), by navArgs() — Kotlin stdlib and Android KTX hide boilerplate. lazy defers init; viewModels() scopes to owner.

Why?

Class delegation implements interface by forwarding to inner object: class RepoImpl(private val api: Api) : Repo by api — override only what differs.

Manual delegation pattern in Clean Architecture — domain interface, data layer delegates to remote/local with policy.

Hilt doesn't replace delegation — complements constructor inject. Fragment by viewModels { factory } for parameterized VM.

How?

Interview: difference delegation vs inheritance — favor has-a over is-a; test by swapping delegate fake.`,
      hi: `What?

By lazy, by viewModels() property delegation. Boilerplate kam. Fragment mein viewModels() standard.

Why?

Class delegation interface forward. Repo by apiRemote with cache override alag method.

Inheritance se zyada flexible. Delegate swap test double se.

NavArgs() Safe Args delegation. Deep link args type-safe.

How?

Manual delegate object bhi bana sakte ho. Senior pattern Clean Architecture mein.`
    },
    {
      q: "Platform types from Java",
      en: `What?

When Kotlin calls Java without @Nullable/@NonNull (JetBrains or AndroidX annotations), types become T! — unknown nullability. Compiler allows both nullable and non-null usage — NPE risk at runtime if Java returns null.

Why?

Android SDK, older libraries, JSONObject — many platform types. Defensive: treat as nullable, use ?. and ?:, or requireNotNull with clear message after known non-null API contract.

Gradual fix: annotate Java with @NonNull/@Nullable; migrate to Kotlin. AndroidX increasingly annotated.

Room and Retrofit Kotlin models should not assume Java interop null safety — map platform String! to String? in boundary layer.

How?

Interview example: intent.getStringExtra(KEY) — nullable; never !! without check — process death empty extras crash.`,
      hi: `What?

Java se aaya type String! Null ho bhi sakta hai nahi bhi. Compiler dono allow karta hai. Risk tum par.

Why?

Android SDK purani APIs annotated nahi. Safe call use karo. getStringExtra() nullable treat.

Java code annotate karo @Nullable @NonNull. Platform type kam.

Boundary layer par Kotlin model strict nullable. Andar !! mat.

How?

Interview: Bundle, Intent extras, legacy JSON Java libs. Sab platform type examples.`
    },
    {
      q: "Coroutine Exception Handling & Supervision",
      en: `What?

Coroutine exceptions propagate upwards to the parent job, cancelling the entire scope by default. To control this, use SupervisorJob or supervisorScope.

Why?

supervisorScope vs coroutineScope: In a supervisorScope, a failure of a child coroutine does not cancel other children or the parent. In a coroutineScope, any child failure immediately cancels everything.

Handling exceptions: Use try/catch inside the coroutine, or a CoroutineExceptionHandler. Note: CoroutineExceptionHandler only works when installed in the root coroutine (e.g., launch, not async).

async exception trap: Exceptions in async are thrown only when you call await(). If async is a root coroutine, the exception is thrown immediately unless wrapped in supervisorScope.

How?

Android Best Practice: Use viewModelScope (which uses SupervisorJob internally) so one failing network call doesn't crash the entire ViewModel or cancel other parallel API calls.`,
      hi: `What?

Coroutine exceptions upar parent job ki taraf propagate hoti hain, jisse default roop se poora scope cancel ho jata hai. Ise control karne ke liye SupervisorJob ya supervisorScope ka use kiya jata hai.

Why?

SupervisorScope vs coroutineScope: supervisorScope mein agar ek child coroutine fail hota hai, to baaki children ya parent cancel nahi hote. coroutineScope mein koi bhi ek child fail hone par sab kuch cancel ho jata hai.

Exception handling: Coroutine ke andar try/catch use karo, ya CoroutineExceptionHandler ka use karo. Yaad rakho, CoroutineExceptionHandler sirf root coroutine (jaise launch) par hi kaam karta hai, async par nahi.

Async trap: async ke exceptions tabhi throw hote hain jab aap await() call karte ho, lekin agar async root coroutine hai to exception turant throw ho sakta hai jab tak use supervisorScope mein na rakha jaye.

How?

Android Best Practice: viewModelScope use karo (jo internally SupervisorJob use karta hai) takki ek network call fail hone par poora ViewModel crash na ho aur baaki parallel calls chalti rahein.`
    },
    {
      q: "Kotlin Flow Advanced Operators & Threading",
      en: `What?

Kotlin Flow is cold by default (code runs only when collected). Threading is managed via the flowOn operator. flowOn changes the dispatcher of the upstream flow, while downstream runs on the collector's dispatcher.

Why?

Advanced Operators:
1. flatMapConcat: Transforms and flattens flows sequentially. Wait for the current flow to complete before starting the next one.
2. flatMapMerge: Transforms and flattens flows concurrently. Runs multiple flows in parallel.
3. flatMapLatest: Cancels the previous active flow when a new value is emitted, starting the new flow immediately. Perfect for search query auto-suggestions.

Combining flows: zip pairs elements from two flows 1-to-1. combine merges the latest values of both flows whenever either emits.

How?

StateFlow vs SharedFlow: StateFlow is a hot flow that holds a single state (conflated, replays last value). SharedFlow is a hot flow that emits events to multiple collectors (replay can be configured, good for one-time events).`,
      hi: `What?

Kotlin Flow default roop se cold hota hai (code tabhi chalta hai jab collect kiya jaye). Threading ko flowOn operator se manage kiya jata hai. flowOn upstream flow ka dispatcher change karta hai, jabki downstream collector ke dispatcher par chalta hai.

Why?

Advanced Operators:
1. flatMapConcat: Flows ko sequentially transform aur flatten karta hai. Ek flow khatam hone ke baad hi doosra start hota hai.
2. flatMapMerge: Flows ko concurrently (parallel mein) run aur flatten karta hai.
3. flatMapLatest: Naya value aane par purane active flow ko cancel kar deta hai aur naya flow start karta hai. Search auto-suggestions ke liye best hai.

Combining flows: zip do flows ke elements ko 1-to-1 pair karta hai. combine dono flows ke latest values ko merge karta hai jab bhi koi ek emit kare.

How?

StateFlow vs SharedFlow: StateFlow ek hot flow hai jo single state hold karta hai (hamesha latest value dega). SharedFlow ek hot flow hai jo multiple collectors ko events emit karta hai (one-time events ke liye best hai).`
    },
    {
      q: "Kotlin Generics Variance (out, in, invariant)",
      en: `What?

Variance describes how generic types with subtyping relationships relate to each other. By default, generics in Kotlin are invariant (List<Dog> is not a subtype of List<Animal>).

Why?

Declaration-site variance:
1. out (Covariance): class Producer<out T>. Allows T to be returned (produced) but not consumed. Makes Producer<Dog> a subtype of Producer<Animal>. Equivalent to Java's ? extends T.
2. in (Contravariance): class Consumer<in T>. Allows T to be consumed (passed as argument) but not returned. Makes Consumer<Animal> a subtype of Consumer<Dog>. Equivalent to Java's ? super T.

Use-site variance (Type projections): Specifying out/in at the point of usage rather than declaration (e.g., fun copy(from: Array<out T>, to: Array<in T>)).

How?

Star projection (*): Represents an unknown type (like Java's raw type or wildcard ?). Array<*> means you can safely read Any? from it, but cannot write to it.`,
      hi: `What?

Variance batata hai ki generic types ke subtyping relationships aapas mein kaise behave karte hain. Default roop se Kotlin mein generics invariant hote hain (jaise List<Dog>, List<Animal> ka subtype nahi hota).

Why?

Declaration-site variance:
1. out (Covariance): class Producer<out T>. Isme T sirf return (produce) ho sakta hai, consume nahi. Yeh Producer<Dog> ko Producer<Animal> ka subtype banata hai. Java ke ? extends T ke barabar hai.
2. in (Contravariance): class Consumer<in T>. Isme T sirf consume (argument mein pass) ho sakta hai, return nahi. Yeh Consumer<Animal> ko Consumer<Dog> ka subtype banata hai. Java ke ? super T ke barabar hai.

Use-site variance (Type projections): out/in ko class definition ke bajay use karte waqt specify karna (jaise fun copy(from: Array<out T>, to: Array<in T>)).

How?

Star projection (*): Kisi unknown type ko represent karta hai (Java ke wildcard ? ki tarah). Array<*> se aap safely Any? read kar sakte hain, lekin write nahi kar sakte.`
    },
    {
      q: "Kotlin Coroutines Dispatchers, Job, and CoroutineContext under the hood",
      en: `What?

Every coroutine in Kotlin runs within a \`CoroutineContext\`, which is a persistent set of user-defined elements. The core elements of a context are:
1. Job: Controls the lifecycle of the coroutine (Active, Completed, Cancelled).
2. CoroutineDispatcher: Determines which thread or thread pool the coroutine executes on (Main, IO, Default, Unconfined).
3. CoroutineName: Optional name for debugging.
4. CoroutineExceptionHandler: Handles uncaught exceptions.

Why?

Understanding how context elements combine and propagate is critical for preventing leaks, managing threading, and handling errors. For example, when you launch a child coroutine, it inherits its context from the parent, but creates its own child Job to establish structured concurrency.

How?

Context elements are combined using the \`+\` operator. Under the hood, \`CoroutineContext\` behaves like a type-safe map where the key is the Element's \`Key\`:

\`\`\`kotlin
val customContext = Dispatchers.IO + Job() + CoroutineName("MyCoroutine")
\`\`\`

Dispatchers under the hood:
- \`Dispatchers.Main\`: Schedules work on the platform's main thread (using Android's Looper/Handler).
- \`Dispatchers.IO\`: Backed by an elastic thread pool (up to 64 threads or core count) optimized for blocking I/O tasks.
- \`Dispatchers.Default\`: Backed by a fixed thread pool (equal to CPU cores, minimum 2) optimized for CPU-intensive computations.
- \`Dispatchers.Unconfined\`: Executes the coroutine on the current thread until the first suspension point, after which it resumes on whatever thread the suspending function completes on.`,
      hi: `What?

Kotlin mein har coroutine ek \`CoroutineContext\` ke andar chalti hai, jo elements ka ek set hota hai. Iske main elements hain:
1. Job: Coroutine ke lifecycle (Active, Completed, Cancelled) ko control karta hai.
2. CoroutineDispatcher: Yeh decide karta hai ki coroutine kis thread ya thread pool par chalegi (Main, IO, Default, Unconfined).
3. CoroutineName: Debugging ke liye optional name.
4. CoroutineExceptionHandler: Uncaught exceptions ko handle karne ke liye.

Why?

Context elements kaise aapas mein combine aur propagate hote hain, yeh samajhna memory leaks ko rokne, threading manage karne aur errors handle karne ke liye zaroori hai. Jab aap ek child coroutine launch karte hain, to yeh parent se context inherit karti hai par apna khud ka child Job banati hai.

How?

Context elements ko \` aur \` operator ke zariye combine kiya jata hai. Under the hood, \`CoroutineContext\` ek type-safe map ki tarah behave karta hai:

\`\`\`kotlin
val customContext = Dispatchers.IO aur Job() aur CoroutineName("MyCoroutine")
\`\`\`.

Dispatchers under the hood:

- \`Dispatchers.Main\`: Platform ke main thread par kaam schedule karta hai (Android ke Looper/Handler ka use karke).
- \`Dispatchers.IO\`: Ek elastic thread pool (64 threads tak) use karta hai jo blocking I/O tasks ke liye optimized hai.
- \`Dispatchers.Default\`: CPU cores ke barabar fixed thread pool use karta hai jo heavy computations ke liye optimized hai.
- \`Dispatchers.Unconfined\`: Coroutine ko current thread par hi start karta hai jab tak pehla suspension point na aaye, uske baad jis thread par function resume hoga usi par chalta rahega.`
    },
    {
      q: "Kotlin Delegation Pattern and Custom Property Delegates",
      en: `What?

Delegation is a design pattern where an object hands over its responsibility to another helper object. Kotlin supports two types of delegation natively:
1. Class Delegation: Implementing an interface by delegating all its methods to an existing object using the \`by\` keyword.
2. Property Delegation: Delegating the getter/setter logic of a property to a helper delegate object (e.g., \`by lazy\`, \`by delegates.observable()\`).

Why?

Class delegation is a powerful alternative to inheritance, avoiding tight coupling and the Fragile Base Class problem. Property delegation eliminates duplicate getter/setter boilerplate code (like logging, validation, or thread-safe lazy loading) by centralizing it in reusable delegates.

How?

To create a custom property delegate, implement \`ReadOnlyProperty\` or \`ReadWriteProperty\` interfaces:

\`\`\`kotlin
class TrimmedStringDelegate : ReadWriteProperty<Any?, String> {
    private var value = ""

    override fun getValue(thisRef: Any?, property: KProperty<*>): String = value

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        this.value = value.trim() // Custom logic
    }
}

class UserProfile {
    var username: String by TrimmedStringDelegate()
}
\`\`\`

Under the hood, the Kotlin compiler generates a hidden backing field for the delegate and redirects all reads/writes of \`username\` to the delegate's \`getValue\` and \`setValue\` methods.`,
      hi: `What?

Delegation ek design pattern hai jisme ek object apni responsibility kisi doosre helper object ko hand over (delegate) kar deta hai. Kotlin is pattern ko natively do tarike se support karta hai:
1. Class Delegation: \`by\` keyword ka use karke kisi interface ke saare methods ko kisi doosre object par delegate karna.
2. Property Delegation: Kisi property ke getter/setter logic ko kisi helper delegate object par delegate karna (jaise \`by lazy\`).

Why?

Class delegation inheritance ka ek behtareen alternative hai jo tight coupling ko rokta hai. Property delegation getter/setter ke duplicate boilerplate code (jaise values ko trim karna, change track karna, ya lazy loading) ko ek hi jagah centralize karke reusable banata hai.

How?

Custom property delegate banane ke liye \`ReadOnlyProperty\` ya \`ReadWriteProperty\` interfaces ko implement karein:

\`\`\`kotlin
class TrimmedStringDelegate : ReadWriteProperty<Any?, String> {
    private var value = ""

Override fun getValue(thisRef: Any?, property: KProperty<*>): String = value.

Override fun setValue(thisRef: Any?, property: KProperty<*>, value: String) { this.value = value.trim() // Custom logic }
}.

class UserProfile {
    var username: String by TrimmedStringDelegate()
}
\`\`\`

Under the hood, Kotlin compiler delegate ke liye ek hidden backing field generate karta hai aur \`username\` ke saare reads/writes ko delegate ke \`getValue\` aur \`setValue\` methods par redirect kar deta hai.`
    },
    {
      q: "List vs MutableList?",
      en: `What?

\`List<T>\` in Kotlin is a read-only interface — you can read elements and iterate, but you cannot add, remove, or replace items through that reference. \`MutableList<T>\` extends \`List\` and adds mutating APIs: \`add\`, \`remove\`, \`set\`, \`clear\`.

Why?

Expose \`List\` from ViewModel/Repository to UI so callers cannot accidentally mutate shared state. Use \`MutableList\` only inside the owner (e.g., building a list before emitting immutable copy). \`listOf()\` creates read-only list; \`mutableListOf()\` creates ArrayList-backed mutable list.

Java interop: \`List\` from Kotlin may still be mutable at runtime if created as ArrayList — prefer \`.toList()\` when passing outward. Room/Retrofit: return \`List<Product>\` from DAO; map to UI models.

How?

\`\`\`kotlin
val readOnly: List<String> = listOf("A", "B")
// readOnly.add("C") // compile error

val mutable: MutableList<String> = mutableListOf("A")
mutable.add("B")
val snapshot: List<String> = mutable.toList() // safe to expose
\`\`\`

Interview: RecyclerView adapter should receive new list instance on each update (DiffUtil), not shared mutable reference mutated in place.`,
      hi: `What?

\`List<T>\` read-only interface hai — padh sakte ho, iterate kar sakte ho, par us reference se add/remove nahi. \`MutableList<T>\` mein \`add\`, \`remove\`, \`set\` jaise mutate APIs hoti hain.

Why?

ViewModel se UI ko \`List\` expose karo taaki bahar se accidental change na ho. Andar \`mutableListOf()\` se banao, bahar \`toList()\` ya immutable copy bhejo.

\`listOf()\` read-only. \`mutableListOf()\` ArrayList-backed mutable.

Java se aaya ArrayList kabhi-kabhi runtime par mutable rehta hai — expose karte waqt \`.toList()\` safe.

How?

\`\`\`kotlin
val items = mutableListOf("A")
items.add("B")
_uiState.value = items.toList() // immutable snapshot emit
\`\`\`

RecyclerView ko har update par nayi list instance do, shared mutable list mutate mat karo.`
    },
    {
      q: "Extension functions in Kotlin",
      en: `What?

Extension functions let you add new functions to an existing class without modifying its source or using inheritance. They are resolved statically at compile time based on the declared type, not the runtime type.

Why?

Android examples: \`fun Context.showToast(msg: String)\`, \`fun View.visible()\`, \`fun String.isValidEmail()\`. Keeps call sites readable and groups utilities by receiver type. They do not add real members — cannot override, cannot access private members of the receiver.

Use when: utility on SDK/Android types you don't own; DSL-style builders; mapping layers. Avoid hiding business logic in extensions scattered everywhere — domain rules belong in use cases/ViewModel.

How?

\`\`\`kotlin
fun String.toOrderIdOrNull(): String? =
    trim().takeIf { it.startsWith("ORD-") && it.length >= 8 }

// Usage
val id = orderRaw.toOrderIdOrNull()
\`\`\`

Under the hood: compiler generates a static function with receiver as first parameter. Java calls \`StringKt.toOrderIdOrNull(str)\`.`,
      hi: `What?

Extension functions se aap existing class mein nayi functions add kar sakte ho bina us class ke source ko change kiye. Yeh compile time par statically resolve hoti hain.

Why?

Android mein common: \`fun Context.showToast()\`, \`fun View.hide()\`. Code readable rehta hai. Private members access nahi kar sakte, override bhi nahi.

Business rules ViewModel/use case mein rakho. Extension sirf chhote utilities ke liye.

How?

\`\`\`kotlin
fun View.gone() {
    visibility = View.GONE
}
\`\`\`

Compiler isko static function banata hai jiska pehla parameter receiver hota hai. Java se \`ViewKt.gone(view)\` call hota hai.`
    },
    {
      q: "launch vs async in coroutines",
      en: `What?

Both \`launch\` and \`async\` are coroutine builders that start work in a \`CoroutineScope\`. \`launch\` returns a \`Job\` — fire-and-forget or structured work with no direct result return. \`async\` returns \`Deferred<T>\` — parallel computation where you \`await()\` the result later.

Why?

Use \`launch\` for UI side effects: save to Room, show snackbar, log analytics. Use \`async\` when you need two independent network/DB calls in parallel and combine results:

\`\`\`kotlin
viewModelScope.launch {
    val products = async(Dispatchers.IO) { repo.getProducts() }
    val offers = async(Dispatchers.IO) { repo.getOffers() }
    _state.value = HomeState(products.await(), offers.await())
}
\`\`\`

\`async\` exception: failure stored until \`await()\` — use \`supervisorScope\` + \`async\` carefully. Prefer \`coroutineScope { async {} }\` when all must succeed or all cancel.

CoroutineScope: \`viewModelScope\`, \`lifecycleScope\`, \`rememberCoroutineScope()\` — always structured; avoid GlobalScope.

How?

Interview rule: need result → async + await; no result → launch. Never block Main waiting await without a coroutine.`,
      hi: `What?

\`launch\` aur \`async\` dono coroutine start karte hain. \`launch\` \`Job\` return karta hai — result return nahi. \`async\` \`Deferred<T>\` return karta hai — baad mein \`await()\` se result milta hai.

Why?

Side effect (DB save, navigate) ke liye \`launch\`. Do parallel API calls combine karne ke liye \`async\`:

\`\`\`kotlin
viewModelScope.launch {
    val a = async(Dispatchers.IO) { repo.getCart() }
    val b = async(Dispatchers.IO) { repo.getUser() }
    updateUi(a.await(), b.await())
}
\`\`\`

\`viewModelScope\`, \`lifecycleScope\` structured scopes hain. GlobalScope production mein avoid.

How?

Result chahiye → async. Sirf kaam chalana hai → launch. Main thread par \`runBlocking\` interview mein anti-pattern bolo.`
    },
    {
      q: "What happens when a coroutine is cancelled?",
      en: `What?

Cancellation is cooperative in Kotlin coroutines. When a scope's Job is cancelled (e.g., \`viewModelScope\` cleared, user navigates away, \`job.cancel()\`), child coroutines receive cancellation at the next suspension point or cancellation check.

Why?

Effects:
1. \`Job\` enters Cancelled state; \`isActive\` becomes false.
2. Most suspending functions (\`delay\`, Retrofit suspend, Room) throw \`CancellationException\` — special exception that should propagate, not swallowed in generic catch.
3. \`finally\` and \`invokeOnCompletion\` still run for cleanup (close streams).
4. Non-suspending infinite loop without \`ensureActive()\` or \`isActive\` may ignore cancellation until scope joins.

\`async\` cancellation: cancelling parent cancels awaiting \`Deferred\`; if you already called \`await()\`, you get \`CancellationException\`.

Android: leaving screen cancels \`lifecycleScope\` work — good for stopping UI collectors; use \`viewModelScope\` for work that survives rotation but not ViewModel clear.

How?

\`\`\`kotlin
viewModelScope.launch {
    try {
        repo.syncCatalog()
    } catch (e: CancellationException) {
        throw e // rethrow, do not log as error
    } catch (e: Exception) {
        _state.value = UiState.Error(e.message)
    }
}
\`\`\``,
      hi: `What?

Kotlin coroutines mein cancellation cooperative hoti hai. Jab scope cancel hota hai (\`viewModelScope\` clear, \`job.cancel()\`), child coroutines agle suspension point par cancel feel karti hain.

Why?

\`CancellationException\` throw hota hai — ise catch karke swallow mat karo, rethrow karo. \`delay\`, Retrofit suspend, Room cancel respect karte hain.

Bina suspension wale loop mein \`ensureActive()\` ya \`isActive\` check karna zaroori warna cancel late hoga.

Screen band → lifecycleScope cancel. ViewModel destroy → viewModelScope cancel. Rotation par ViewModel scope zinda rehta hai.

How?

\`\`\`kotlin
catch (e: CancellationException) {
    throw e // error mat banao
}
\`\`\`

Interview: payment verify cancel hone par UI loading band karo, duplicate charge server idempotency se handle.`
    },
    {
      q: "Kotlin bytecode optimizations (not shorthand Java)",
      en: `What?

Kotlin compiles to JVM bytecode like Java, but the compiler applies extra optimizations: inline functions copy bodies at call sites (no lambda object for small HOFs), \`data class\` generates equals/hashCode/toString at compile time, and coroutines compile to state machines instead of one thread per task.

Why?

Infosys interviewers test whether you understand runtime behavior, not syntax sugar:
- **inline** removes anonymous class allocation for lambdas passed to inline functions; **reified** keeps generic \`T\` because the body is inlined.
- **Null safety** is enforced in bytecode via checks and platform types, not comments.
- **Suspend** functions are transformed to Continuation-passing style — no blocking thread during I/O.
- **const val** inlines at compile time like Java \`static final\`.

Compared to Java: less boilerplate, but same ART execution. Kotlin is not “Java with shorter names” — different null model, coroutines, and sealed types are first-class language features.

How?

Interview line: “I use inline/reified for type-safe API parsing, coroutines for structured concurrency on Dispatchers.IO, and data classes for stable DTOs — the compiler generates efficient bytecode, I don’t rely on reflection for equals on models.”`,
      hi: `What?

Kotlin bhi JVM bytecode mein compile hoti hai, par compiler extra optimizations karta hai: inline lambdas par object kam, data class equals/hashCode compile time, coroutines state machine (har call par naya thread nahi).

Why?

Interview mein syntax nahi, behavior samjhao:
- inline call site par copy — chhota helper fast.
- Suspend thread block nahi karta, continuation se resume.
- Null safety compile-time checks bytecode mein.

Java se alag: coroutines, sealed class, smart cast — language feature hain, sirf chhota syntax nahi.

How?

Bolna: Retrofit parse ke liye inline reified, network ke liye coroutines IO dispatcher, models data class — reflection se equals nahi.`
    },
    {
      q: "Scope functions — context object vs it (cheat sheet)",
      en: `What?

| Function | Receiver | Returns |
| let | it | Lambda result |
| run | this | Lambda result |
| with | this | Lambda result |
| apply | this | Context object |
| also | it | Context object |

Why?

apply/also configure or log along a chain; let/run transform or compute a result. Context bias: apply/with/run use this; let/also use it.

How?

Interview: apply returns the object; let returns the block result. One scope function per chain in production.`,
      hi: `What?

let it se result. apply/also object return. run/with this receiver.

Why?

Table yaad karo — configure apply, null-safe let.

How?

apply configure, let transform — ek line mein bolo.`
    },
    {
      q: "Extension functions — internal implementation (compile time)",
      en: `What?

Extension functions are resolved statically at compile time. The compiler generates a static function with the receiver as the first parameter — no new JVM class member is added to the receiver type.

Why?

They cannot access private members of the receiver, cannot be overridden, and do not participate in runtime polymorphism. Java sees them as \`ReceiverKt.extensionName(receiver, ...)\`.

How?

\`\`\`kotlin
fun String.isValidPhone(): Boolean = length >= 10
// Becomes roughly: StringKt.isValidPhone(this)
\`\`\`

Interview: syntax sugar for static utilities grouped by receiver type.`,
      hi: `What?

Compiler static function banata hai — receiver pehla parameter. Private access nahi.

Why?

Static dispatch. Override nahi hota.

How?

Under the hood static util jaisa.`
    }
    ]
  },
  {
    id: "android",
    label: "Android",
    icon: "fa-brands fa-android",
    items: [
    {
      q: "Activity lifecycle (brief)",
      en: `What?

onCreate: inflate UI, bind ViewModel, register observers — one-time setup. onStart/onResume: visible and interactive; start animations, register sensors. onPause: partial overlay (dialog) still visible; stop heavy camera work.

Why?

onStop: no longer visible; onDestroy: teardown. onSaveInstanceState bundles lightweight UI state before possible process kill — not large lists or ViewModel replacement.

Configuration change (rotation): Activity recreates unless configChanges declared — ViewModel survives, Activity does not. Process death: ViewModel gone unless SavedStateHandle + persistence.

How?

Modern apps minimize Activity logic — single-activity + Navigation + Compose. Interview tie: Razorpay checkout returns to onResume — refresh payment status from server not trust client alone.`,
      hi: `What?

OnCreate setup. Binding, observe. onResume user interact kar sakta hai. onPause dialog ke case mein bhi call hota hai.

Why?

Rotation par Activity recreate. ViewModel bach jata hai same process mein. Process kill par ViewModel bhi gaya. Room/SavedStateHandle use karo.

OnSaveInstanceState scroll position chhota state. Poora cart list nahi.

Single-activity pattern lifecycle simple. Fragments/composable handle sub-screens.

How?

Payment flow: checkout se wapas aao to onResume par server verify status. Client success fake ho sakta hai.`
    },
    {
      q: "Activity vs Fragment",
      en: `What?

Activity is entry point with window, task stack, and manifest declaration — one screen host in traditional apps. Fragment is reusable UI/controller slice inside Activity — own lifecycle tied to FragmentManager.

Why?

Single-Activity Architecture: one Activity hosts NavHostFragment or Compose NavHost; Fragments/composables swap — shared ViewModel across nav graph scopes possible.

Fragment pitfalls: back stack, commitNow vs commit, viewLifecycleOwner for observers (not lifecycleOwner — leak after onDestroyView). DialogFragment for modal flows.

Compose reduces Fragment need but Fragment still common in hybrid apps. Interview: when separate Activity — deep link entry, SDK (Razorpay) requiring Activity context, multi-window rare cases.

How?

Zila/ShopKirana pattern: bottom nav tabs as nested graphs, each feature Fragment or composable destination.`,
      hi: `What?

Activity alag window aur task stack entry. Fragment Activity ke andar reusable piece. Tabs, master-detail.

Why?

Single-activity aur Navigation modern. Multiple Activity se deep link/back stack messy kam.

Fragment observe karte waqt viewLifecycleOwner use karo. View destroy ke baad leak nahi.

Compose naya UI. Purane XML apps Fragment heavy.

How?

SDK payment Activity chahta hai. Alag Activity host kabhi zaroori.`
    },
    {
      q: "Why use Fragment?",
      en: `What?

A Fragment is a reusable portion of UI and behavior hosted inside an Activity. Multiple fragments can share one Activity window — tabs, master-detail, ViewPager pages — without launching a new Activity per screen.

Why?

Benefits vs many Activities: lighter navigation within one task, shared ViewModel across nav graph, modular feature teams owning fragment modules, responsive layouts (one Activity shows list+detail on tablet, two fragments side by side).

When not needed: single-Activity + Jetpack Compose NavHost may use composables only; new greenfield apps often skip Fragments except SDK interop.

Drawbacks: lifecycle complexity (view vs fragment lifecycle), FragmentManager back stack bugs if manual transactions — prefer Navigation Component.

How?

Interview answer: "We use Fragments (or composable destinations) under one Activity so back stack, deep links, and shared state stay consistent — Razorpay still needs Activity context for checkout."`,
      hi: `What?

Fragment Activity ke andar reusable UI + logic ka piece hai. Ek Activity mein multiple fragments — tabs, master-detail, pages.

Why?

Har screen ke liye nayi Activity nahi. Back stack simple. Nav graph par shared ViewModel. Tablet par do panel ek saath.

Naye Compose apps mein Fragment kam. SDK interop par ab bhi Fragment common.

Lifecycle complex hai — isliye viewLifecycleOwner zaroori.

How?

Interview: single-activity + fragments/composables se modular app, payment SDK ke liye Activity context ready rakho.`
    },
    {
      q: "Fragment lifecycle (full)",
      en: `What?

Fragment lifecycle is tied to its host Activity and FragmentManager. Key states after added:
1. onAttach(context)
2. onCreate(savedInstanceState)
3. onCreateView(inflater, container, savedInstanceState) — inflate layout
4. onViewCreated(view, savedInstanceState) — bind views, observe ViewModel (use viewLifecycleOwner)
5. onStart / onResume — visible and interactive (paired with Activity)
6. onPause / onStop
7. onDestroyView — **view hierarchy destroyed**; clear binding references here
8. onDestroy / onDetach

Why?

Critical rule: observe LiveData/Flow with \`viewLifecycleOwner\`, not \`lifecycleOwner\`, between onViewCreated and onDestroyView. After onDestroyView, the view is gone but Fragment instance may exist in back stack — observing with fragment lifecycle leaks UI updates to dead views.

Rotation: Fragment may be retained while view recreated — ViewModel holds state; re-bind in onViewCreated.

How?

\`\`\`kotlin
override fun onDestroyView() {
    super.onDestroyView()
    _binding = null // ViewBinding leak fix
}
\`\`\`

FragmentManager back stack: replace/add + addToBackStack pops on back press.`,
      hi: `What?

Fragment lifecycle Activity aur FragmentManager se linked hai. onAttach → onCreate → onCreateView → onViewCreated → onStart/onResume → onPause/onStop → onDestroyView → onDestroy → onDetach.

Why?

onDestroyView par view destroy ho jata hai par Fragment instance back stack mein reh sakta hai. Isliye \`viewLifecycleOwner\` se observe karo, fragment \`lifecycleOwner\` se nahi.

ViewBinding onDestroyView par null karo. Leak classic bug.

Rotation par view dubara banta hai, ViewModel state rakhta hai.

How?

\`\`\`kotlin
override fun onDestroyView() {
    _binding = null
    super.onDestroyView()
}
\`\`\`

Back stack: addToBackStack se back press par previous fragment.`
    },
    {
      q: "Fragment communication",
      en: `What?

Fragments in the same Activity communicate without tight coupling through:
1. **Shared ViewModel** (activityViewModels / navGraphViewModels) — SSOT for screen pair state.
2. **Fragment Result API** — \`setFragmentResult\` / \`setFragmentResultListener\` for one-shot callbacks (pick address, filter selected).
3. **Parent Activity / interface callback** — legacy pattern; harder to test.
4. **Navigation Safe Args** — type-safe arguments forward/back between destinations.

Why?

Avoid direct fragment references (\`parentFragmentManager.findFragmentByTag\`) — breaks rotation and modularization. Shared ViewModel best for master-detail cart count. Result API best for dialog picker returning data once.

Navigation Component handles args and back stack; deep link same graph.

How?

\`\`\`kotlin
// Sender
setFragmentResult("pick_city", bundleOf("city" to "Indore"))

// Receiver in onViewCreated
setFragmentResultListener("pick_city") { _, bundle ->
    val city = bundle.getString("city")
}
\`\`\`

Interview: never pass Activity context to child fragment static field — leak.`,
      hi: `What?

Fragments aapas mein communicate karte hain: shared ViewModel, Fragment Result API, Safe Args navigation, ya parent interface (purana pattern).

Why?

Direct fragment reference mat lo — rotation/modular break. Master-detail ke liye activityViewModels ya navGraphViewModels best.

Dialog se result: setFragmentResult / setFragmentResultListener.

Navigation Safe Args type-safe pass data.

How?

\`\`\`kotlin
setFragmentResult("key", bundleOf("id" to orderId))
setFragmentResultListener("key") { _, b -> /* handle */ }
\`\`\`

Static Activity reference fragment mein mat — memory leak.`
    },
    {
      q: "Started Service vs Bound Service",
      en: `What?

**Started Service**: started with \`startService(Intent)\` — runs operations until it calls \`stopSelf()\` or something stops it. Client does not bind to it. Work is fire-and-forget from starter's perspective (e.g., legacy upload — prefer WorkManager now).

**Bound Service**: clients \`bindService()\` and get \`IBinder\` — bidirectional communication while bindings exist. Service lives while at least one client bound. Typical for ongoing IPC with same app process or AIDL across processes.

Why?

Android 8+ heavily restricts background started services — use **WorkManager** for deferrable work and **Foreground Service** (with notification + type) for user-visible ongoing tasks (music, location tracking, large upload user aware of).

Started vs bound interview angle: bound when UI/controller needs direct API to service; started when kick off background task (deprecated pattern for most apps).

How?

Modern replacement table:
- Deferrable background → WorkManager
- User-visible long task → Foreground Service
- Cross-app IPC → Bound Service + AIDL or Messenger

Interview: "We use WorkManager for sync, FGS only when user sees delivery tracking notification."`,
      hi: `What?

Started Service: \`startService()\` se start, \`stopSelf()\` tak chal sakta hai. Client bind nahi karta.

Bound Service: \`bindService()\` se IBinder milta hai — client active rehte tak service bind rehti hai. Direct API call possible.

Why?

Android 8+ background started service restrict. Deferrable kaam → WorkManager. User ko dikhe ongoing → Foreground Service + notification.

Bound tab jab same process mein service se direct communicate karna ho.

How?

Interview table: sync = WorkManager, music/GPS visible = FGS, purana started service = avoid unless FGS type declare.`
    },
    {
      q: "Explain MVVM in Android",
      en: `What?

**MVVM = Model + View + ViewModel.** It is the Google-recommended architectural pattern for Android. It separates UI from business logic so the app is easier to **maintain, test, and scale**, and so UI state survives configuration changes.

It divides the app into three layers:

**1. Model — data and business logic**
- API calls (Retrofit), database (Room), Repository, data classes. The Model knows nothing about the UI.

\`\`\`kotlin
data class User(val id: Int, val name: String)
\`\`\`

**2. View — displays data, forwards user actions**
- Activity, Fragment, or Jetpack Compose UI.
- It **observes** state from the ViewModel, updates the UI, and sends user interactions up. It contains **no business logic**.

\`\`\`kotlin
class MainActivity : AppCompatActivity() { /* observes ViewModel, renders UI */ }
\`\`\`

**3. ViewModel — bridge between View and Model**
- Holds UI state, calls the Repository, processes data, survives configuration changes.
- Key rule: it must **never hold a reference to the View, Activity, or Context** (use AndroidViewModel / Application context if truly needed) — otherwise it leaks memory on rotation.
- Notice the **backing property** pattern: a private \`MutableLiveData\` that mutates internally, exposed as immutable \`LiveData\` so the View can only read, never write. This enforces unidirectional data flow.

\`\`\`kotlin
class UserViewModel(private val repository: UserRepository) : ViewModel() {
    private val _users = MutableLiveData<List<User>>()   // mutable, private
    val users: LiveData<List<User>> get() = _users        // immutable, exposed

    fun loadUsers() {
        viewModelScope.launch {                           // auto-cancelled in onCleared()
            _users.value = repository.getUsers()
        }
    }
}
\`\`\`

**Data flow (unidirectional):**
User Action → View → ViewModel → Repository → API/Database → Repository → ViewModel → LiveData/StateFlow → View updates UI.
State flows **down**, events flow **up** — the View never talks to the Model directly.

**Real example — User List screen:**

\`\`\`kotlin
class UserRepository(private val api: UserApi) {
    suspend fun getUsers() = api.getUsers()   // Repository is the single source of truth
}

// In the Activity / Fragment
viewModel.users.observe(this) { userList ->
    adapter.submitList(userList)
}
\`\`\`

**Modern approach — StateFlow (preferred in most new projects):**
StateFlow always has a value, is null-safe by design, and pairs cleanly with Coroutines and Compose. Collect it lifecycle-safely so you don't update a destroyed UI.

\`\`\`kotlin
private val _users = MutableStateFlow<List<User>>(emptyList())
val users = _users.asStateFlow()

lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {   // stops collecting when UI is in background
        viewModel.users.collect { adapter.submitList(it) }
    }
}
\`\`\`

**MVVM + Clean Architecture (large apps):**
- **Presentation:** View → ViewModel
- **Domain:** Use Cases (pure business rules, no Android)
- **Data:** Repository → API / Database

Why?

**1. Separation of concerns** — View = UI only, ViewModel = logic/state, Model = data. Each layer changes for one reason, so code stays clean.

**2. Easy testing** — The ViewModel is plain Kotlin with no View reference, so it is unit-testable on the JVM with a fake Repository (no emulator).

\`\`\`kotlin
@Test fun shouldLoadUsers() { /* given fake repo → when loadUsers() → assert state */ }
\`\`\`

**3. Survives configuration changes** — On rotation the Activity is destroyed and recreated, but the ViewModel lives in the **ViewModelStore** (retained by the non-config instance), so loaded data and in-flight \`viewModelScope\` work are not lost — no re-fetch, no flicker. (Note: this is *not* process-death survival — for that use SavedStateHandle / rememberSaveable.)

**4. Better maintainability** — Clear responsibilities make large projects manageable and onboarding faster.

How?

**1-minute interview answer:**

"MVVM stands for Model-View-ViewModel. It is an Android architecture pattern that separates UI, business logic, and data layers. The View displays data and handles user interactions, the ViewModel manages UI state and business logic, and the Model handles data operations such as API and database calls. The View observes LiveData or StateFlow from the ViewModel, making the architecture lifecycle-aware, testable, maintainable, and resilient to configuration changes like screen rotation. Modern Android development commonly uses MVVM with Coroutines, StateFlow, Repository Pattern, and Dependency Injection such as Hilt."

**Common cross-questions (be ready):**
- *Why expose LiveData instead of MutableLiveData?* → Encapsulation: only the ViewModel should mutate state; the View should only observe.
- *How does the ViewModel survive rotation?* → It is stored in the ViewModelStore, retained across the Activity recreation, not in the destroyed View.
- *LiveData vs StateFlow?* → StateFlow always holds a value, is Coroutine/Compose-friendly, and needs lifecycle-aware collection; LiveData is lifecycle-aware out of the box.
- *Difference from MVP?* → MVVM's ViewModel holds no View reference (fewer leaks, less boilerplate) whereas MVP's Presenter holds a View interface.`,
      hi: `What?

**MVVM = Model + View + ViewModel.** Yeh Google ka recommended Android architecture pattern hai. Iska maksad UI ko business logic se alag karna hai taaki app **maintain, test aur scale** karna easy ho, aur configuration change par UI state safe rahe.

App teen layers mein bantati hai:

**1. Model — data aur business logic**
- Retrofit API, Room database, Repository, data classes. Model ko UI ke baare mein kuch pata nahi hota.

\`\`\`kotlin
data class User(val id: Int, val name: String)
\`\`\`

**2. View — data dikhata hai, user action upar bhejta hai**
- Activity, Fragment, ya Jetpack Compose.
- ViewModel ko **observe** karta hai, UI update karta hai, click/input upar bhejta hai. Isme **business logic nahi** hoti.

**3. ViewModel — View aur Model ke beech bridge**
- UI state hold karta hai, Repository call karta hai, data process karta hai, rotation par survive karta hai.
- Important rule: ViewModel mein **kabhi View / Activity / Context ka reference mat rakho** (zaroorat ho to AndroidViewModel / Application context) — warna rotation par memory leak hoti hai.
- **Backing property** pattern dekho: private \`MutableLiveData\` andar mutate hoti hai, bahar immutable \`LiveData\` expose hoti hai — taaki View sirf read kar sake, write nahi. Yeh unidirectional flow enforce karta hai.

\`\`\`kotlin
class UserViewModel(private val repository: UserRepository) : ViewModel() {
    private val _users = MutableLiveData<List<User>>()   // private, mutable
    val users: LiveData<List<User>> get() = _users        // exposed, immutable

    fun loadUsers() {
        viewModelScope.launch {                           // onCleared() par auto cancel
            _users.value = repository.getUsers()
        }
    }
}
\`\`\`

**Data flow (ek direction):**
User Action → View → ViewModel → Repository → API/Database → ViewModel → LiveData/StateFlow → View UI update.
State **neeche** aati hai, event **upar** jaata hai — View kabhi Model se direct baat nahi karta.

**StateFlow (modern, naye projects mein preferred):**

\`\`\`kotlin
private val _users = MutableStateFlow<List<User>>(emptyList())
val users = _users.asStateFlow()

lifecycleScope.launch {
    repeatOnLifecycle(Lifecycle.State.STARTED) {   // background mein collect band
        viewModel.users.collect { adapter.submitList(it) }
    }
}
\`\`\`

**MVVM + Clean Architecture:**
Presentation: View → ViewModel | Domain: Use Cases (pure logic) | Data: Repository → API/DB.

Why?

**1. Separation of concerns** — View sirf UI, ViewModel logic/state, Model data. Code clean rehta hai.

**2. Easy testing** — ViewModel mein View reference nahi, isliye fake Repository ke saath JVM par unit test — emulator ki zaroorat nahi.

**3. Rotation survive** — Activity destroy/recreate hoti hai, par ViewModel **ViewModelStore** mein bachta hai — data aur viewModelScope ka kaam lost nahi hota, dubara fetch nahi. (Yeh process-death survival nahi hai — uske liye SavedStateHandle / rememberSaveable.)

**4. Maintainability** — Clear responsibilities se bade projects manage karna easy.

How?

**1 minute interview (English interview mein English bolo):**

"MVVM matlab Model-View-ViewModel. Android architecture pattern jo UI, business logic aur data layers alag karta hai. View data dikhata aur user interaction handle karta hai, ViewModel UI state aur logic manage karta hai, Model API/database handle karta hai. View LiveData ya StateFlow observe karta hai — lifecycle-aware, testable, rotation par data safe. Modern stack: MVVM + Coroutines + StateFlow + Repository + Hilt."

**Common cross-questions:**
- *MutableLiveData ki jagah LiveData kyun expose karte ho?* → Encapsulation — state sirf ViewModel mutate kare, View sirf observe.
- *Rotation par ViewModel kaise survive karta hai?* → ViewModelStore mein retain hota hai, destroyed View mein nahi.
- *LiveData vs StateFlow?* → StateFlow hamesha value rakhta hai, Coroutine/Compose friendly, lifecycle-aware collection chahiye; LiveData by default lifecycle-aware.
- *MVP se farq?* → MVVM ka ViewModel View reference nahi rakhta (kam leak, kam boilerplate); MVP ka Presenter View interface hold karta hai.`
    },
    {
      q: "MVVM vs MVP vs MVC in Android",
      en: `What?

**MVC (classic Android):** Activity/Fragment acts as both **View and Controller** — UI + business logic mixed; hard to test; “Massive Activity” anti-pattern.

**MVP:** **View** (passive UI) ↔ **Presenter** (interface + impl) ↔ **Model**. Presenter holds references to View interface; survives rotation only if configured; more boilerplate (contracts per screen). Testing: mock View interface.

**MVVM (Jetpack):** **View** observes **ViewModel** state (LiveData/StateFlow); **ViewModel** calls **Model/Repository**. ViewModel survives config change via ViewModelStore; no View reference in ViewModel → fewer leaks. Google-recommended for new Android code.

Why?

Infosys often asks: “How is MVVM different from MVP?”
- MVP: Presenter talks to View through interface; rotation needs manual handling.
- MVVM: ViewModel lifecycle-aware; data binding or Flow collection; less ceremony than MVP contracts.
- Both separate UI from logic; MVVM fits Coroutines, Room Flow, Compose.

How?

One-liner: “We use MVVM with Repository SSOT — ViewModel exposes UiState; View renders and sends events; MVP’s Presenter role is replaced by ViewModel without holding a View reference.”`,
      hi: `What?

MVC: Activity sab kuch — UI + logic mix. Massive Activity problem.

MVP: View passive, Presenter interface se baat, zyada boilerplate.

MVVM: ViewModel state expose, View observe. Rotation survive. Jetpack standard.

Why?

Interview: MVP mein Presenter View interface hold karta hai. MVVM ViewModel View reference nahi — leak kam.

Dono UI logic alag. MVVM + StateFlow + Room modern stack.

How?

Bolna: hum MVVM + Repository use karte hain; MVP se kam ceremony, ViewModel config change handle karta hai.`
    },
    {
      q: "ViewModelStoreOwner and configuration changes",
      en: `What?

A **ViewModelStore** holds ViewModel instances keyed by a scope. A **ViewModelStoreOwner** (Activity, Fragment, or NavBackStackEntry) provides that store. \`ViewModelProvider(owner).get(MyViewModel::class.java)\` or \`by viewModels()\` retrieves the same instance while the owner’s store lives.

Why?

On rotation, the Activity/Fragment is destroyed and recreated, but the **ViewModelStore** is retained (non-config scope) — so cart state, API-loaded list, and in-flight Job scope survive without re-fetching.

When owner is **cleared** (finish Activity, remove Fragment permanently, pop nav back stack), \`onCleared()\` runs — cancel work, close resources.

Compose: \`viewModel()\` uses the nearest owner (Activity/Nav graph). Hilt \`@HiltViewModel\` still ties to the same store.

Not the same as **process death** — OS kill wipes the store; use Room/SavedStateHandle/rememberSaveable for that.

How?

Interview answer: “ViewModel survives config change because it lives in ViewModelStore owned by the Activity’s non-configuration instance, not in the destroyed View hierarchy. I scope with viewModelScope and clear in onCleared.”`,
      hi: `What?

ViewModelStore ViewModel instances rakhta hai. ViewModelStoreOwner Activity/Fragment/Nav entry hota hai. \`by viewModels()\` same instance deta hai jab tak owner store zinda hai.

Why?

Rotation par Activity destroy hoti hai par store retain — cart/list state bachi rehti hai. Permanent exit par \`onCleared()\` — coroutines cancel.

Process death alag — OS kill par store bhi gaya. Room/SavedStateHandle use karo.

Compose \`viewModel()\` same concept. Hilt ViewModel bhi isi store se.

How?

Interview: rotation survive kyunki ViewModel View hierarchy mein nahi, ViewModelStore mein tied hai.`
    },
    {
      q: "ViewModel — importance and common cross-questions",
      en: `What?

**Why ViewModel matters:**
- Survives **configuration change** (rotation) without reloading data
- Holds **UI state** and business orchestration separate from Activity/Fragment
- **viewModelScope** for structured coroutines; cleared in \`onCleared()\`
- Testable on JVM with fake Repository

**Common cross-questions:**
1. **Why not hold Activity Context?** → memory leak; use Application if Context needed
2. **Who creates ViewModel?** → ViewModelProvider / \`by viewModels()\` / \`@HiltViewModel\`
3. **Rotation vs process death?** → ViewModel survives rotation only; use Room/SavedStateHandle for process kill
4. **LiveData in ViewModel?** → expose \`StateFlow\` in new code; \`MutableLiveData\` private, public read-only
5. **Can ViewModel open Activities?** → no; expose navigation events to View (SharedFlow)

**Lifecycle:** created when first requested for owner → active until ViewModelStore cleared → \`onCleared()\` cancels scope.

How?

Diagram sentence: “View observes ViewModel state; ViewModel calls Repository; ViewModel never references View.”`,
      hi: `What?

ViewModel rotation par state bachata hai. UI logic Activity se alag. viewModelScope coroutines.

Cross: Context mat rakho. Process death par Room use karo. Navigation event View ko bhejo.

Why?

Test easy fake repo se. Leak kam.

How?

Interview diagram UI→VM→Repo practice karo.`
    },
    {
      q: "LiveData vs StateFlow / SharedFlow",
      en: `What?

LiveData respects LifecycleOwner — inactive observers don't receive updates; main-thread dispatch built-in. Limitation: no rich operators, sticky replay always, awkward one-shot events (navigation) without workarounds.

Why?

StateFlow: hot, always current value, conflated updates — ideal for UiState rendering. Needs lifecycle-aware collection via repeatOnLifecycle — otherwise collector runs when app backgrounded wasting work.

SharedFlow: configurable replay and buffer — replay=0 for events; extraBufferCapacity for fire-and-forget snackbars. collectLatest vs collect matters for rapid emissions.

How?

Migration: LiveData in legacy; greenfield Kotlin uses StateFlow + SharedFlow or Channel.receiveAsFlow for events.

Interview bug: storing navigation event in StateFlow — rotation replays navigation; fix with SharedFlow/Channel consumed once.`,
      hi: `What?

LiveData lifecycle automatic. Band screen par update nahi. Purane code mein common.

Why?

StateFlow hamesha value. UI render ke liye. repeatOnLifecycle se collect STARTED par.

SharedFlow snackbar/navigation one-time. Replay 0 important.

StateFlow mein navigation event mat. Rotate par dubara navigate crash/bug.

How?

Room aur Flow aur stateIn ViewModel mein combine pattern modern.`
    },
    {
      q: "MutableLiveData, LiveData, setValue vs postValue",
      en: `What?

**LiveData** — lifecycle-aware observable; observers on main thread when lifecycle is active.

**MutableLiveData** — subclass with public \`setValue\` / \`postValue\`; expose to UI as \`LiveData\` type from ViewModel (hide mutability).

\`\`\`kotlin
class HomeViewModel : ViewModel() {
    private val _count = MutableLiveData(0)
    val count: LiveData<Int> = _count
    fun increment() { _count.value = (_count.value ?: 0) + 1 }
}
\`\`\`

**setValue(T)** — update on **main thread** immediately; must be called from main.

**postValue(T)** — safe from **background thread**; schedules set on main (last value wins if posted rapidly).

Why?

Interview trap: calling \`setValue\` from IO thread crashes; use \`postValue\` or switch to Main with coroutines/StateFlow.

Modern apps prefer **StateFlow** — thread-safe updates with \`MutableStateFlow.update { }\`.

How?

Pattern: private MutableLiveData, public LiveData; never expose MutableLiveData to Fragment.`,
      hi: `What?

LiveData observe lifecycle aware. MutableLiveData update karne ke liye.

setValue main thread par. postValue background se safe.

Why?

IO thread par setValue crash. postValue use ya StateFlow.

How?

ViewModel se bahar sirf LiveData expose karo.`
    },
    {
      q: "collectAsStateWithLifecycle vs repeatOnLifecycle",
      en: `What?

**repeatOnLifecycle(Lifecycle.State.STARTED) { flow.collect { } }** — View system pattern (Fragment/Activity): start collecting when lifecycle is at least STARTED, cancel when STOPPED. Prevents background leaks and wasted work.

**collectAsStateWithLifecycle()** — Compose pattern: converts Flow/StateFlow to Compose \`State<T>\` while respecting the same lifecycle rules (uses \`LifecycleOwner\` from LocalLifecycleOwner).

Why?

Both solve: “don’t update UI when screen not visible.” Without them, a Flow collector in \`LaunchedEffect(Unit)\` or \`lifecycleScope.launch\` may run in background and cause leaks or illegal UI updates.

Compose screen example:
\`\`\`kotlin
@Composable
fun ProductScreen(vm: ProductViewModel = hiltViewModel()) {
    val uiState by vm.uiState.collectAsStateWithLifecycle()
    when (uiState) { /* render */ }
}
\`\`\`

Views: \`repeatOnLifecycle(Lifecycle.State.STARTED) { vm.uiState.collect { binding.render(it) } }\` in Fragment \`viewLifecycleOwner\`.

How?

Interview: “Compose I use collectAsStateWithLifecycle; XML/Fragment I use repeatOnLifecycle with viewLifecycleOwner — same lifecycle guarantee, different API surface.”`,
      hi: `What?

repeatOnLifecycle Views ke liye — STARTED par collect, STOPPED par cancel. collectAsStateWithLifecycle Compose ke liye — Flow ko lifecycle-aware State banata hai.

Why?

Background mein collect band — leak aur waste kam. LaunchedEffect(Unit) bina lifecycle guard risky.

Compose: \`val state by vm.uiState.collectAsStateWithLifecycle()\`. Fragment: \`repeatOnLifecycle(STARTED) { collect }\` viewLifecycleOwner par.

How?

Interview: Compose = collectAsStateWithLifecycle, Fragment = repeatOnLifecycle — dono same problem solve, API alag.`
    },
    {
      q: "Jetpack Compose vs XML",
      en: `What?

Compose: declarative UI as @Composable functions of state — recomposition redraws changed nodes. Less boilerplate than XML + findViewById/ViewBinding; state hoisting drives predictability.

Why?

XML: mature tooling, large legacy codebases, predictable performance on low-end devices historically — still valid for maintenance.

Compose interop: AndroidView for MapView/Razorpay SDK; ComposeView in Fragment during migration. Material 3, theming via CompositionLocal.

How?

Pitfalls: recomposition storms from unstable params, missing remember, heavy work in composable body. Use LazyColumn keys for list stability.

Google recommends Compose for new screens — Strangler pattern screen-by-screen. Flutter experience translates: Widget≈Composable, setState≈mutableStateOf.`,
      hi: `What?

Compose declarative. State change par UI update. XML imperative purana stack.

Why?

Naye screens Compose. Purane XML saath ComposeView interop.

Remember, derivedStateOf, keys LazyColumn mein performance ke liye.

Third-party SDK XML/AndroidView wrap karna pad sakta hai Razorpay jaisa.

How?

Flutter se aaye ho to Composable = Widget analogy interview mein strong.`
    },
    {
      q: "How does RecyclerView work?",
      en: `What?

Adapter creates/binds ViewHolders; LayoutManager positions items (Linear, Grid, Staggered). ViewHolder recycles views off-screen — setHasStableIds helps animation consistency.

Why?

notifyDataSetChanged() full refresh expensive — causes flicker, loses scroll state. DiffUtil computes minimal insert/remove/move payloads; ListAdapter + AsyncListDiffer on background thread.

ItemDecoration for spacing; ItemAnimator for changes. ConcatAdapter merges multiple adapters (header + list + footer).

Paging 3 integrates via PagingDataAdapter with DiffUtil ItemCallback. Main thread: bind only — image load with Coil/Glide async.

How?

Interview: DiffUtil areItemsSame (id) vs areContentsSame (all fields) — wrong impl causes wrong animations or stale UI in product catalog.`,
      hi: `What?

ViewHolder recycle. Memory efficient lambi list. LayoutManager layout decide.

Why?

NotifyDataSetChanged() slow. DiffUtil/ListAdapter use karo ShopKirana product list jaisa.

AreItemsSame product id. AreContentsSame price/stock compare.

Image load bind mein sync mat. Coil async.

How?

ConcatAdapter header aur products ek RecyclerView mein.`
    },
    {
      q: "Explain Room Database",
      en: `What?

Room wraps SQLite with compile-time SQL verification — @Entity, @Dao, @Database. DAO methods return suspend, Flow, or LiveData for reactive UI.

How?

Migrations: export schema JSON, Migration objects for ALTER TABLE — fallbackToDestructiveMigration only dev. TypeConverters for Date, enum, List JSON.

Relations: @Relation, @Embedded, junction tables for many-to-many. FTS for search. With Paging 3 PagingSource from DAO query.

Repository pattern: network fetch updates Room; UI observes Flow — offline-first Zila catalog. Transactions @Transaction for atomic cart updates.

Testing: in-memory Room.databaseBuilder context, allowMainThreadQueries for unit tests only. WAL mode default performance benefit mention.`,
      hi: `What?

Room SQLite abstraction. Compile time SQL check. Entity table, Dao queries, Database holder.

Why?

Flow return karke UI auto update. Offline cart cache.

How?

Migration production mein zaroori. Destructive sirf debug.

@Transaction cart clear + order insert atomic.

TypeConverter enum status, Date store karna.`
    },
    {
      q: "Room @Embedded and @TypeConverter",
      en: `What?

**@Embedded** flattens a nested object into the parent table columns instead of a separate table.

\`\`\`kotlin
data class Address(val city: String, val pin: String)

@Entity
 data class UserEntity(
    @PrimaryKey val id: String,
    @Embedded val address: Address // city, pin columns in users table
)
\`\`\`

Use for value objects (address, money) — not for one-to-many lists (use \`@Relation\` or separate table).

**@TypeConverter** converts types Room/SQLite cannot store natively (Date, enum, List<String> as JSON string).

\`\`\`kotlin
class Converters {
    @TypeConverter fun fromTimestamp(value: Long?) = value?.let { Date(it) }
    @TypeConverter fun dateToTimestamp(date: Date?) = date?.time
}
@Database(entities = [...], version = 1)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase()
\`\`\`

Why?

Interview: Embedded = composition in one row; TypeConverter = custom serialization for enums/Dates/JSON lists.

How?

Enum status: store as String or Int via converter; avoid storing sealed classes directly without converter.`,
      hi: `What?

@Embedded nested object ko parent table ke columns mein flatten karta hai — alag table nahi.

@TypeConverter Date, enum, List ko String/Long mein convert karta hai SQLite ke liye.

Why?

Address embedded. Product list ke liye Relation ya alag table.

How?

Database par @TypeConverters(Converters::class) lagao.`
    },
    {
      q: "SQLite vs Room (raw database basics)",
      en: `What?

**SQLite** is the on-device relational database engine on Android. Historically apps used **SQLiteOpenHelper** + raw SQL (\`CREATE TABLE\`, \`INSERT\`, \`SELECT\`) and **Cursor** to read rows manually.

**Room** is a Jetpack library on top of SQLite — \`@Entity\`, \`@Dao\`, \`@Database\`, compile-time SQL checks, and return types like \`Flow<List<T>>\` or \`suspend\` functions instead of boilerplate Cursor parsing.

Why?

Interview “basic storage” often means: know SQLite is the engine, Room is the recommended abstraction. Raw SQLite still appears in legacy code and whiteboard questions (schema, PRIMARY KEY, FOREIGN KEY).

Modern apps: **Room for app data**, **SharedPreferences/DataStore for small flags**, not giant JSON in prefs. Migrations: Room \`Migration\` vs manual \`onUpgrade\` in OpenHelper.

How?

Answer template: “Under the hood Room writes to SQLite files in app storage; I use Room for type safety, Flow, and migrations; raw SQLite only if maintaining legacy or learning fundamentals.”`,
      hi: `What?

SQLite engine hai phone par. Purana tareeka SQLiteOpenHelper + SQL + Cursor. Room uske upar Jetpack layer — Entity, Dao, compile-time check.

Why?

Interview basics: SQLite = storage engine, Room = recommended API. Cursor manually parse karna tedious aur error-prone.

Bada data Room. Chhota config DataStore/SharedPreferences.

How?

Bolo: production mein Room; SQLite concept samajhna zaroori kyunki Room andar SQLite hi use karta hai.`
    },
    {
      q: "SQL basics for interview / online assessments",
      en: `What?

Infosys online tests often include **SQL** alongside aptitude/coding. Core topics:

**SELECT** — filter, sort, limit:
\`\`\`sql
SELECT id, title FROM notes WHERE user_id = 1 ORDER BY updated_at DESC LIMIT 20;
\`\`\`

**JOINs** — combine tables:
- \`INNER JOIN\` — matching rows only
- \`LEFT JOIN\` — all left rows + matches from right

**Aggregates** — \`COUNT\`, \`SUM\`, \`AVG\`, \`GROUP BY\`, \`HAVING\`:
\`\`\`sql
SELECT user_id, COUNT(*) AS note_count FROM notes GROUP BY user_id HAVING COUNT(*) > 5;
\`\`\`

**INSERT / UPDATE / DELETE** — CRUD on assessments.

**Indexes** — speed lookups on \`user_id\`, \`updated_at\` (Room \`@Index\` same idea).

Why?

Room uses SQL under the hood — knowing SQL helps DAO queries and system design (notes app schema). Whiteboard: \`notes(id, user_id, title, body, updated_at)\` + \`tags\` many-to-many junction table.

How?

Practice 5–10 queries on paper: second highest salary pattern, join two tables, count per group, update with WHERE. Relate to Room: \`@Query("SELECT ...") fun observeNotes(): Flow<List<NoteEntity>>\`.`,
      hi: `What?

Assessment mein SQL aata hai: SELECT, WHERE, ORDER BY, JOIN, GROUP BY, COUNT, INSERT, UPDATE, DELETE.

Why?

Room andar SQL hai. Schema design notes app jaisa interview mein help karta hai.

Practice: do table join, group count, filter. Second highest salary pattern common.

How?

Room @Query same SQL likhna — concept ek hi. 5 query roz paper par likho exam se pehle.`
    },
    {
      q: "What is ANR and how to avoid?",
      en: `What?

ANR (Application Not Responding) when main thread blocked ~5 seconds — input dispatch or BroadcastReceiver timeout. System shows dialog; repeated ANRs hurt Play vitals.

Why?

Causes: network/DB on Main, heavy JSON parse, synchronous bitmap decode, lock contention, main thread waiting on background CountDownLatch anti-pattern.

How?

Fix: coroutines with IO dispatcher, WorkManager for deferrable work, StrictMode in debug, Baseline Profiles for startup. Trace with Android Studio Profiler / Systrace.

BroadcastReceiver: goAsync or JobIntentService/WorkManager for heavy work — onReceive must finish quickly.

Interview: mention Play Console ANR rate; eNagarpalika heavy forms — validate off main, show progress.`,
      hi: `What?

Main thread 5 sec block. ANR dialog. User experience kharab, Play vitals down.

Why?

Network, Room, bada JSON Main par mat. Coroutine IO use karo.

StrictMode debug mein disk/network main detect.

Bitmap decode background. Glide handle karta hai.

How?

OnReceive mein lambi kaam mat. WorkManager enqueue.`
    },
    {
      q: "Four Android app components",
      en: `What?

Activity: UI entry, user interaction. Service: background work without UI — foreground service needs visible notification + type declaration Android 14+.

Why?

BroadcastReceiver: system/app events (BOOT, CONNECTIVITY) — manifest vs runtime registered; exported receivers security risk, restrict exported=false.

ContentProvider: structured data sharing cross-app — Contacts, FileProvider for camera URI sharing. Less common in app-only architecture.

How?

Navigation modern stack de-emphasizes multiple Activities; WorkManager replaces many IntentService patterns. Interview map: FCM → FirebaseMessagingService; payment → Activity; sync → WorkManager.`,
      hi: `What?

Activity UI screen. Service background. FGS notification mandatory ab.

Why?

BroadcastReceiver system events. Exported false jahan possible security.

ContentProvider data share. FileProvider camera capture ke liye common.

Purana IntentService ki jagah WorkManager.

How?

Components manifest declare. Deep link Activity intent-filter.`
    },
    {
      q: "BroadcastReceiver — how it works",
      en: `What?

A **BroadcastReceiver** listens for system or app-wide **broadcast Intents** — e.g. \`ACTION_BOOT_COMPLETED\`, \`CONNECTIVITY_CHANGE\`, custom \`ACTION_ORDER_PAID\` from your app.

**Manifest-declared** receiver: registered in XML; can wake app for some events (restricted on modern Android for implicit broadcasts).

**Context.registerReceiver** (runtime): register in Activity/Fragment; **must unregister** in \`onDestroy\` to avoid leaks.

Why?

\`onReceive()\` runs on the **main thread** and must finish quickly (~10 sec) or ANR. Heavy work → \`goAsync()\` + \`PendingResult.finish()\` or enqueue **WorkManager** / start **Foreground Service** if user-visible.

Security: \`android:exported="false"\` for internal receivers; validate action/extras on exported receivers.

Modern note: many implicit broadcasts removed; prefer **WorkManager**, **FCM**, or **Flow** from Repository instead of global broadcasts for in-app events.

How?

Interview example: “Custom broadcast for legacy sync → better pattern today is SharedFlow/Repository or LocalBroadcast replacement via app-scoped event bus in ViewModel layer.”`,
      hi: `What?

BroadcastReceiver Intent sunta hai — boot, network change, ya custom app event.

Manifest ya runtime register. Runtime par unregister zaroori leak se bachne.

Why?

onReceive main thread par — lamba kaam mat. WorkManager enqueue karo.

Exported false internal ke liye. Security interview point.

How?

In-app events ke liye ab StateFlow/SharedFlow prefer. System events par hi receiver common.`
    },
    {
      q: "ContentProvider — purpose and FileProvider",
      en: `What?

A **ContentProvider** exposes structured data to other apps via a **content://** URI and CRUD operations (\`query\`, \`insert\`, \`update\`, \`delete\`). Android Contacts, MediaStore use providers.

Your app rarely implements a full provider unless sharing a database outward. Common interview topic: **FileProvider** (subclass of ContentProvider) — safely share \`content://\` URI for camera capture, PDF share, crop apps without \`file://\` exposure.

Why?

\`file://\` URIs to other apps cause **FileUriExposedException** on Android 7+. FileProvider grants temporary read permission via \`FLAG_GRANT_READ_URI_PERMISSION\` on the Intent.

Manifest: \`<provider android:authorities="\${applicationId}.fileprovider"\` with \`paths\` XML defining cache/files dirs.

How?

\`\`\`kotlin
val uri = FileProvider.getUriForFile(context, "\${context.packageName}.fileprovider", photoFile)
val intent = Intent(MediaStore.ACTION_IMAGE_CAPTURE).apply {
    putExtra(MediaStore.EXTRA_OUTPUT, uri)
    addFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION)
}
\`\`\`

Interview: “ContentProvider = cross-app data contract; FileProvider = secure file sharing pattern I use for camera/gallery integration.”`,
      hi: `What?

ContentProvider data dusri apps ko content:// URI se deta hai. Contacts, MediaStore examples.

FileProvider camera/gallery ke liye common — file:// share karna unsafe.

Why?

Android 7+ par file:// expose crash. FileProvider temporary permission deta hai.

Manifest provider + paths XML. getUriForFile se URI banao.

How?

Interview: cross-app share = ContentProvider; apni app files camera ko dena = FileProvider pattern.`
    },
    {
      q: "Dagger Hilt — why use it?",
      en: `What?

Compile-time DI graph — @Inject constructors, @Module @Provides for interfaces, @HiltAndroidApp Application entry. Scopes: @Singleton app-wide, @ViewModelScoped, @ActivityScoped — wrong scope causes leak or new instance per injection unexpectedly.

Why?

Testing: @TestInstallIn replace modules with fakes — FakePaymentGateway, in-memory Room. No manual ServiceLocator.

Hilt integrates AndroidX: @HiltViewModel, @AndroidEntryPoint Activities/Fragments. Generates code KSP/apt — build time cost acceptable for large teams.

How?

vs Koin: Hilt compile-time safety, better for enterprise gov/fintech compliance traceability.

Interview: explain component hierarchy SingletonComponent → ActivityRetainedComponent → ViewModelComponent; never inject Activity into Singleton.`,
      hi: `What?

Hilt compile time DI. @Inject constructor, modules interfaces ke liye. Scope galat = leak ya crash.

Why?

ViewModel @HiltViewModel. Factory manual nahi. Fragment @AndroidEntryPoint.

Test mein fake module swap. Payment/Room mock.

Singleton mein Activity Context mat inject. ApplicationContext theming ke case mein.

How?

ShopKirana scale par manual new Repo() chaos. Hilt standard.`
    },
    {
      q: "Memory leaks — common causes",
      en: `What?

Static or singleton holding Activity/Fragment/View context — survives rotation. Anonymous inner classes capturing outer Activity in long-lived callbacks.

Why?

Coroutines GlobalScope or scope without lifecycle — job outlives UI. Listeners not unregistered — LocationManager, SensorManager, custom event bus.

Handler postDelayed with Activity Runnable — use WeakReference or cancel on destroy. LiveData observing with wrong LifecycleOwner (fragment vs view).

How?

Tools: LeakCanary detects retained objects; Profiler heap dump. Fix patterns: ApplicationContext only where no UI needed, viewLifecycleOwner, viewModelScope.

Compose: remember NavController with correct scope; don't hold Context in remember without DisposableEffect cleanup.`,
      hi: `What?

Static Activity reference classic leak. Rotation ke baad purani Activity memory mein.

Why?

GlobalScope coroutine screen band hone ke baad bhi chale. ViewModelScope use karo.

Listener unregister onDestroy. Location, download callback.

LeakCanary debug build mein lagao. Interview tool naam.

How?

Handler delayed runnable Activity capture. WeakReference ya cancel.`
    },
    {
      q: "Architecture layers UI to Data",
      en: `What?

Presentation: UI + ViewModel — platform-specific. Domain (optional): use cases, pure Kotlin business rules — testable without Android. Data: Repository impl, remote/local data sources, DTO mapping.

Why?

Dependency rule: inner layers don't know outer — Domain no Android imports; Data implements domain interfaces.

Single Repository coordinates API + Room + DataStore preferences. Mapper converts DTO ↔ Entity ↔ Domain model if strict layering.

Feature modules depend on :core:domain, not each other's internals. MP eNagarpalika/gov apps benefit auditability.

How?

Interview draw: UI → VM → Repo → {Retrofit, Room}; mention trade-off — small app may skip domain layer pragmatism.`,
      hi: `What?

UI/ViewModel presentation. Domain business rules optional par badi team mein useful. Data API aur DB.

Why?

Andar wale layer ko bahar pata nahi. Test easy.

Repository SSOT. Duplicate cache UI mein mat.

DTo alag Entity alag. Mapping layer clean.

How?

Chhota app pragmatism. Bada org Clean Architecture justify.`
    },
    {
      q: "Retrofit + OkHttp together",
      en: `What?

Retrofit: declarative API interfaces, converters (Gson/Moshi/kotlinx.serialization), Call/suspend/Flow adapters. OkHttp: actual HTTP client — connection pool, interceptors, caching, TLS.

Why?

Interceptor chain: logging (debug only), auth token refresh, header injection, retry with backoff. Certificate pinning via OkHttp CertificatePinner for fintech.

Timeouts connect/read/write configured on OkHttpClient.Builder. Single client instance @Singleton — shares pool.

Error handling: HttpException for 4xx/5xx; map to domain NetworkError in Repository. kotlinx.serialization or Moshi codegen over Gson for Kotlin null safety.

How?

Offline: Room cache + networkBoundResource pattern or manual fetch-then-save; don't call Retrofit on Main.`,
      hi: `What?

Retrofit API interface define. Suspend functions clean. OkHttp neeche HTTP engine.

Why?

Interceptor auth token attach, 401 par refresh retry chain.

OkHttpClient singleton. Har call naya client mat banao.

Release mein body logging band. PII leak.

How?

Error map karke UiState.Error user friendly message.`
    },
    {
      q: "ViewBinding vs DataBinding",
      en: `What?

ViewBinding generates type-safe binding class per layout — no findViewById, null-safe views after inflate. compile-time linkage layout ↔ binding.

Why?

DataBinding adds observables in XML ({viewmodel.title}) — two-way binding, BindingAdapter custom attrs. Heavier build, harder debug, mixes logic in XML — many teams avoid for new code.

Compose makes both less central for new UI. ViewBinding still common in XML Fragments.

include/merge tags need correct binding root; viewBinding enabled in module build.gradle. Null binding in Fragment after onDestroyView — clear reference.

How?

Interview: prefer ViewBinding + manual state update or Compose; DataBinding when legacy or designer-driven binding already invested.`,
      hi: `What?

ViewBinding type-safe inflate. FindViewById khatam. Fragment binding nullable onDestroyView par.

Why?

DataBinding XML mein expression. ObservableField verbose, build slow.

Naya UI Compose. XML maintain ViewBinding enough.

Include tag binding root sahi naming.

How?

DataBinding test mushkil. ViewBinding simple preferred.`
    },
    {
      q: "Intent, PendingIntent, deep links",
      en: `What?

Explicit Intent: known component (Activity class) — internal navigation. Implicit: action/category — share sheet, dial. Intent extras pass primitives, Parcelable — size limits apply.

Why?

PendingIntent: token another app/system executes later with your identity — notifications, AlarmManager, widgets. Mutability flags Android 12+ — FLAG_IMMUTABLE default requirement.

Deep links: intent-filter VIEW + https host; App Links auto-verify assetlinks.json. Navigation Component deep link matches nav graph routes.

Security: don't put secrets in Intent extras (loggable); validate incoming deep link params. Notification tap PendingIntent to correct Activity with back stack via TaskStackBuilder.

How?

FCM notification payload opens PendingIntent to order detail — orderId extra validated server-side exists.`,
      hi: `What?

Intent screen/component start. Explicit internal navigation. Implicit share, browser.

Why?

PendingIntent notification/alarm. System baad mein tumhari tarah open kare.

Deep link https scheme aur App Links verify. Marketing link se product open.

Android 12 PendingIntent immutable flag zaroori warna crash.

How?

Extras mein sensitive token mat. Log expose ho sakta hai.`
    },
    {
      q: "Foreground vs Background services",
      en: `What?

Background Service restrictions from Android 8+ — limited idle background execution. Prefer WorkManager for deferrable tasks; Foreground Service (FGS) for user-visible ongoing work.

Why?

FGS must show notification within timeout; declare foregroundServiceType in manifest (location, dataSync, mediaPlayback, etc.) Android 14+ enforcement.

How?

Use cases: live delivery tracking, music playback, ongoing upload user aware of. Misuse triggers Play policy rejection.

JobIntentService deprecated path — WorkManager replaces. Coroutine + FGS for long download user initiated.

Interview: SK Agent field app GPS sync — FGS location type with clear UX why notification shown.`,
      hi: `What?

Background service band almost. WorkManager deferrable ke liye.

Why?

FGS user ko pata ongoing kaam. Notification compulsory. Type manifest mein declare.

Galat FGS use Play reject. Policy padho.

Music, navigation, upload user visible. FGS sahi.

How?

Chhupa background work WorkManager aur constraints charging/WiFi.`
    },
    {
      q: "What is WorkManager?",
      en: `What?

Jetpack API for guaranteed deferrable background work — survives process death, reboot. Constraints: network, charging, storage not low. Backoff policy retry on failure.

Why?

OneTimeWorkRequest vs PeriodicWorkRequest (minimum 15 min interval). Unique work names REPLACE/KEEP/APPEND dedupe sync jobs.

CoroutineWorker preferred over Worker for suspend code. HiltWorkerFactory inject dependencies into workers.

Use: catalog sync, analytics batch upload, cleanup temp files. Not for instant UI-critical path — too latency. Combine with FCM high-priority push for urgent.

How?

Chain work: beginUniqueWork then combine for pipeline. Observe WorkInfo LiveData/Flow for UI progress badge optional.`,
      hi: `What?

WorkManager guaranteed background. App band/reboot ke baad bhi run attempt.

Why?

Constraints network/charging. Battery friendly sync.

CoroutineWorker suspend Room/API call clean.

Periodic 15 min minimum. Har second poll ke liye nahi.

How?

FCM urgent aur WorkManager routine sync combo production mein.`
    },
    {
      q: "Service vs WorkManager — when to use which?",
      en: `What?

**Service** (especially **Foreground Service**): long-running task **while the user is aware** — music playback, active navigation, visible upload, live tracking. Requires a **notification** (and \`foregroundServiceType\` on Android 14+). **Started/background services** are heavily restricted since Android 8 — avoid for hidden sync.

**WorkManager**: **deferrable**, **guaranteed** background work — catalog sync, log upload, DB cleanup. Survives process death and reboot; respects constraints (network, charging); automatic retry/backoff.

Why?

Classic interview comparison:
| Need | Choice |
|------|--------|
| User sees ongoing work | Foreground Service |
| Sync later when online | WorkManager |
| Immediate UI result | Coroutines in ViewModel, not Service |
| System alarm every 15+ min | WorkManager PeriodicWork |

WorkManager **replaces** most IntentService / JobIntentService patterns. FCM + WorkManager is common for “push arrived → refresh Room.”

How?

One-liner: “WorkManager for background jobs that can wait; Foreground Service when the user must know work is running; never block the main thread in either case.”`,
      hi: `What?

Service (FGS): user ko dikhe ongoing kaam — music, GPS track, bada upload notification ke saath.

WorkManager: background sync jo baad mein bhi chale — reboot ke baad, network aane par, retry ke saath.

Why?

Chhupa background started service mat. Deferrable = WorkManager. User visible = FGS.

ViewModel coroutine turant UI ke liye. Service har problem ka jawab nahi.

How?

Interview table yaad karo: sync catalog → WorkManager; live delivery map → FGS.`
    },
    {
      q: "FCM push notification flow",
      en: `What?

Client gets FCM token via FirebaseMessaging.getToken() — send to your backend on login/refresh. Server calls FCM HTTP v1 API with service account — notification vs data payload.

Why?

Notification message: system tray when app background; data-only handled in FirebaseMessagingService.onMessageReceived always when app foreground/background depending config.

Channels required Android 8+ — separate ORDER_UPDATES vs PROMO. Android 13+ POST_NOTIFICATIONS runtime permission.

Token refresh onNewToken — update server. Deep link from notification PendingIntent. Doze: high-priority FCM for time-sensitive; normal may delay.

How?

Interview architecture: server authoritative order status; push triggers local Room refresh WorkManager enqueue.`,
      hi: `What?

FCM token backend ko bhejo login par. Refresh par update.

Why?

Notification tray message vs data payload. Data custom handle onMessageReceived.

Channel create Android 8 aur. Promo aur order alag.

Android 13 notification permission runtime. Deny handle karo.

How?

Push aaya to WorkManager se catalog sync. UI Flow update.`
    },
    {
      q: "ProGuard / R8",
      en: `What?

R8 (default) shrinks unused code, obfuscates names, optimizes bytecode — smaller APK/AAB, harder reverse engineering. Runs on release minifyEnabled true.

Why?

Reflection-heavy libs need -keep rules: Gson/Moshi model fields, Retrofit interfaces, Hilt generated, Parcelable CREATOR, Room entities. Missing rules → ClassNotFoundException or empty JSON parse in production only.

Test release builds on CI — debug hides issues. mapping.txt upload Crashlytics for deobfuscated stack traces.

Consumer proguard rules from libraries merge automatically. Don't keep entire packages blindly — bloat defeats shrink.

How?

Interview: Razorpay/Gson model keep; verify minified release before Play upload; mention Play App Signing.`,
      hi: `What?

R8 release par code shrink aur obfuscate. Chhota APK, reverse engineering mushkil.

Why?

Gson/Retrofit/Hilt keep rules zaroori. Warna production crash debug mein nahi dikhega.

Release build test CI par mandatory habit bolo.

Mapping.txt Crashlytics upload. Stack trace readable.

How?

Poori package keep mat. Size badhega.`
    },
    {
      q: "Security — storing tokens",
      en: `What?

Never store auth tokens, refresh tokens, or PII in plain SharedPreferences or logs. Use EncryptedSharedPreferences or Android Keystore-backed encryption — keys in hardware when available.

Why?

HTTPS only; certificate pinning for high-risk apps. No secrets in APK — assume decompilation. API keys restricted by package signature + Play Integrity.

Payment: Razorpay order created server-side; client gets order_id; payment signature verified server-side before marking paid — client tampering irrelevant if server authoritative.

Root/jailbreak detection optional layer not sole security. OWASP MASVS mindset for gov/fintech eNagarpalika.

How?

Logout: clear encrypted prefs, cancel tokens server-side, wipe Room user tables.`,
      hi: `What?

Token plain SharedPreferences mein mat. EncryptedSharedPreferences / Keystore.

Why?

APK se secret nikal sakte hain. Server-side secrets.

Razorpay verify server par. Client success UI tabhi jab API confirm.

Log mein token/PII mat. Timber release tree filter.

How?

Logout par local DB user data clear aur token revoke API.`
    },
    {
      q: "Unit vs Instrumentation tests",
      en: `What?

Unit tests JVM-local — ViewModel, Repository with fakes, mappers, use cases. Fast, no emulator. runTest for coroutines; Turbine for Flow assertions; MockK/Mockito for mocks.

Why?

Instrumentation/Android tests on device/emulator — Espresso UI clicks, Compose UI Test, Room migration tests with real SQLite, Hilt test modules @HiltAndroidTest.

Pyramid: many unit, fewer integration, minimal E2E — CI runs unit on every PR. Flaky UI tests isolated nightly.

Robolectric optional middle ground — slower, some API fakes. Test payment flow with fake gateway interface not real Razorpay in CI.

How?

Interview: what you'd test in Zila checkout ViewModel — cart total calc, error mapping, loading states — not pixel colors.`,
      hi: `What?

Unit test fast JVM. ViewModel aur FakeRepo. runTest coroutine time control.

Why?

Instrumentation device par. Espresso/Compose UI, navigation flow.

Zyada unit kam UI. CI PR par unit mandatory.

Turbine Flow emit test. Loading then Success order.

How?

Real Razorpay CI mat. Interface fake inject Hilt test module.`
    },
    {
      q: "DiffUtil and ListAdapter",
      en: `What?

DiffUtil compares old vs new list on background — produces minimal update ops. areItemsSame: identity (id); areContentsSame: full equality for bind optimization.

Why?

ListAdapter wraps AsyncListDiffer — submitList triggers diff on background, dispatches to main. Never mutate list in place after submit — new immutable list instance.

Stable IDs setHasStableIds(true) when ids stable — smoother animations. Payloads partial bind optional advanced.

PagingDataAdapter same DiffUtil callback for paged catalog. Wrong areContentsSame → price change not reflected in ViewHolder.

How?

With Compose LazyColumn use key = { item.id } analogous concept.`,
      hi: `What?

DiffUtil purani nayi list compare. Sirf change update. notifyDataSetChanged() se better.

Why?

AreItemsSame id same hai? areContentsSame content same?

SubmitList naya list instance. Purani list mutate mat.

Price update areContentsSame false hona chahiye warna UI purana dikhega.

How?

Compose mein LazyColumn key = id same idea.`
    },
    {
      q: "Process death and state restoration",
      en: `What?

Low memory kills entire process — all statics, in-memory ViewModel, Activity fields gone. User returns via recents — app cold start with saved task state illusion.

Why?

SavedStateHandle for nav args + small state survives process death via Bundle. ViewModel not surviving process death — persist critical data Room/DataStore.

Don't rely static var userId or lateinit without re-init. Test: adb shell am kill package — reproduce.

Compose rememberSaveable for UI-local state. Checkout in-progress payment — server order id in DB before opening Razorpay so resume can poll status.

How?

Interview classic bug: cart only in memory — process death empty cart; fix offline Room cart SSOT.`,
      hi: `What?

System memory kam process kill. ViewModel bhi gaya. Static field bhi clear.

Why?

SavedStateHandle chhota state. Bada data Room mein persist.

Adb am kill se test karo process death. Interview tip.

Payment orderId pehle server aur DB save phir checkout open.

How?

Cart sirf memory mein mat. Room SSOT offline-first.`
    },
    {
      q: "SharedPreferences vs DataStore",
      en: `What?

SharedPreferences synchronous API on main can cause ANR on large commits; no transactional coroutine API; type safety manual.

Why?

Preferences DataStore: async Flow-based, handles corruption better, transactional edits edit { prefs -> }. Proto DataStore for typed schema.

Migrate SharedPreferences via DataStore migration helper. Sensitive tokens EncryptedSharedPreferences or encrypted DataStore — not plain either.

Use for: onboarding flags, last sync timestamp, theme pref. Not for large datasets — Room instead.

How?

Interview: DataStore collect in ViewModel startup; avoid runBlocking get on main.`,
      hi: `What?

SharedPreferences purana. Main thread ANR risk bade commit par.

Why?

DataStore async Flow. Onboarding done flag, theme setting.

Sensitive data encrypted variant. Plain DataStore bhi token ke liye nahi.

Bada data Room. Prefs chhota config ke liye.

How?

Migration helper se SharedPreferences se shift gradual.`
    },
    {
      q: "Navigation Component benefits",
      en: `What?

Nav graph XML/ Kotlin DSL centralizes destinations, actions, args — Safe Args generates type-safe directions. Deep links declared in graph match URLs to destinations.

Why?

Single Activity back stack managed by NavController — consistent Up/back. Nested graphs for bottom nav tabs — each tab own stack.

Navigation Compose: NavHost, composable routes, same deep link model. ViewModel scoped to nav graph via hiltNavGraphViewModels.

Avoid manual FragmentTransaction tag bugs, wrong popBackStack. Test Navigation with TestNavHostController.

How?

Flutter parallel: go_router — interview cross-platform teams mention similar declarative routing.`,
      hi: `What?

Nav graph ek jagah screens aur actions. Safe Args type-safe bundle.

Why?

Deep link graph mein define. Product/:id open ProductFragment.

Bottom nav nested graph. Har tab alag back stack.

Manual FragmentTransaction error kam. NavController standard.

How?

Compose Navigation same concept NavHost.`
    },
    {
      q: "Razorpay payment integration (high level)",
      en: `What?

Server creates order with amount/currency/receipt — returns order_id to app. Client opens Razorpay Checkout with key_id (public), order_id, prefill optional.

Why?

On success/failure callback get payment_id, order_id, signature — send to server verify endpoint using Razorpay secret — never trust client-only success.

Handle Activity recreation during checkout — retain order_id in ViewModel/SavedStateHandle. Network failure after pay — poll server status idempotently.

UPI/card failures map to user-friendly UiState; retry without duplicate charge via same server order if unpaid.

How?

Testing: sandbox keys; mock PaymentResult sealed states in ViewModel unit tests.`,
      hi: `What?

Server order create. Amount server decide client tamper nahi. order_id app ko mile.

Why?

Razorpay Checkout open. Success par signature server verify mandatory.

Activity recreate checkout ke dauran. OrderId ViewModel mein save.

Double charge rokne idempotency server order id same retry.

How?

Sandbox test keys production alag. BuildConfig flavor se.`
    },
    {
      q: "BLoC vs MVVM",
      en: `What?

BLoC (Flutter origin): Events sink, States stream out — strict unidirectional, often multiple streams. Android adoption via MVI-like patterns.

Why?

MVVM: ViewModel exposes state observables; View calls methods. Simpler mental model for Android teams; StateFlow achieves similar without explicit Event classes for everything.

MVI: single state reduce with intents — immutable state copy. All three separate UI from logic.

How?

Choose by team familiarity — Flutter module BLoC, Android module MVVM+StateFlow in same org is common. Testing similar: feed events/assert states.

Interview: don't religiously debate — show you know one-time events problem exists in both if mis-modeled.`,
      hi: `What?

BLoC event in state out. Flutter mein common. Android mein MVVM aur StateFlow similar goal.

Why?

MVVM method call aur observe. Kam ceremony Android dev ke liye.

Dono mein UI logic ViewModel/BLoC mein. Activity thin.

Same org Flutter BLoC aur Android MVVM chal sakta hai. Shared domain rules.

How?

Galat modeling se dono mein navigation bug. SharedFlow solution.`
    },
    {
      q: "Offline-first architecture",
      en: `What?

UI reads local Room Flow first — instant paint cached catalog/cart. Network sync updates DB in background; UI auto-updates from same Flow — true SSOT.

Why?

Conflict policy explicit: last-write-wins, server wins, or merge for cart quantities. Show stale indicator if last sync old.

WorkManager periodic sync + pull-to-refresh manual. Field apps SK Agent poor network — queue mutations locally, replay when online with idempotency keys.

NetworkBoundResource pattern (legacy) or manual in Repository: fetchRemote → saveLocal → emit. Don't duplicate list in ViewModel memory.

How?

Interview metrics: time-to-first-content, offline add-to-cart success rate.`,
      hi: `What?

Pehle Room se dikhao. Network background mein sync. Ek hi Flow UI observe.

Why?

Conflict rule likho. Server price update local override.

Offline mutation queue. Online aate hi sync WorkManager.

ViewModel mein alag list cache mat. Duplicate state bug.

How?

SK Agent jaisi field app offline cart critical example.`
    },
    {
      q: "Android 13+ notification permission",
      en: `What?

POST_NOTIFICATIONS runtime permission — must request like camera. Without grant, notification channel posts suppressed (except some exempt cases).

Why?

Request in context when user enables order alerts — not cold start splash. Explain rationale in UI before system dialog.

Handle denial: settings deep link, in-app inbox fallback for order status. FCM still delivers data — you may show in-app banner if no permission.

Separate channels transactional vs marketing — user may disable promo channel only. Target SDK 33+ required for Play.

How?

Interview UX: e-commerce order shipped — permission prompt after first purchase not install.`,
      hi: `What?

Android 13 se notification alag permission. POST_NOTIFICATIONS runtime.

Why?

Pehle apni UI mein kyun chahiye explain phir system dialog.

Deny par settings link aur in-app order status screen fallback.

Transactional aur promo channel alag. User promo band kar sake.

How?

Install par turant permission mat. Context ke baad request conversion better.`
    },
    {
      q: "Compose recomposition — avoid pitfalls",
      en: `What?

Recomposition reruns composable when state read during composition changes. Unstable parameters (new lambda/list each call) cause unnecessary recomposition scope.

Why?

remember caches across recompositions; derivedStateOf for expensive derived reads; key in LazyColumn items for identity stability.

Side effects: LaunchedEffect(keys) for coroutines; DisposableEffect cleanup. Never heavy DB/network directly in @Composable body — hoist to ViewModel.

Skipping: @Stable/@Immutable annotations; use immutable collections for state. Debugging Layout Inspector recomposition counts.

How?

Lists: paging collect in ViewModel stateIn; pass stable list reference updates only when data changes.`,
      hi: `What?

State change par composable dubara run. Unnecessary recomposition performance hit.

Why?

Remember, derivedStateOf use karo. Lambda har bar naya mat banao without remember.

Network/DB composable body mein mat. ViewModel se state.

LazyColumn key = item.id stability ke liye.

How?

Layout Inspector se kaun sa recompose zyada dekh sakte ho debug mein.`
    },
    {
      q: "Compose lifecycle — Composition, Layout, Drawing",
      en: `What?

Jetpack Compose runs three phases per frame (similar in spirit to View measure/layout/draw):
1. **Composition** — decide *what* UI to show; run @Composable functions, build/update the UI tree (slot table).
2. **Layout** — decide *where* to place each node; measure and position (constraints down, sizes up).
3. **Drawing** — *how* to render pixels on the Canvas.

**Recomposition** re-runs affected composables when **state read during composition** changes. It is **optimistic** (can be cancelled if new state arrives before frame completes) and **unordered** among siblings — don’t assume child A always recomposes before child B.

Why?

Infosys Compose questions often ask phases + recomposition rules. Heavy work belongs in ViewModel/LaunchedEffect, not composition. Layout thrash from unstable list params causes jank.

How?

Interview: “Composition is declarative tree build; Layout is measure/place; Drawing is render. Recomposition is state-driven and can be skipped or cancelled — I use stable keys, remember, and derivedStateOf to minimize work.”`,
      hi: `What?

Teen phases: Composition (kya dikhana), Layout (kahan), Drawing (pixels). Recomposition state change par composable dubara — optimistic (cancel ho sakta) aur unordered siblings ke beech.

Why?

Composition mein network/DB mat. ViewModel state. Unstable list/lambda se zyada recompose.

How?

Interview teen phases naam se bolo + recomposition optimistic/unordered — Infosys Compose depth signal.`
    },
    {
      q: "remember, mutableStateOf, rememberSaveable, state hoisting",
      en: `What?

**remember { }** — cache a value across **recompositions** of the same composable (lost if composable leaves tree permanently).

**mutableStateOf(value)** — observable state; reading it in composition subscribes to recomposition when value changes.

Typical pattern: \`var count by remember { mutableStateOf(0) }\` — local UI state (counter, expanded flag).

**rememberSaveable** — survives **Activity recreation** (rotation, locale change) via SavedStateRegistry; use for UI-only state that must not reset (tab index, scroll-less form fields). Not for secrets or large lists — ViewModel/Room for that.

**State hoisting** — push state up to caller/state holder; composable becomes stateless \`(state, onEvent) -> Unit\` — enables \`@Preview\`, reuse, and single source of truth in ViewModel.

Why?

Interviewers ask you to write or explain \`remember { mutableStateOf }\` and why **rememberSaveable** beats plain remember on rotation.

How?

\`\`\`kotlin
@Composable
fun CounterCard(count: Int, onIncrement: () -> Unit) { /* hoisted — previewable */ }

@Composable
fun Screen(vm: MyViewModel) {
    var tab by rememberSaveable { mutableStateOf(0) }
    val uiState by vm.state.collectAsStateWithLifecycle()
}
\`\`\``,
      hi: `What?

remember recomposition par value bachata hai. mutableStateOf change par recompose trigger. \`var x by remember { mutableStateOf(0) }\` local UI state.

rememberSaveable rotation/Activity recreate par bachata hai — tab index, search text chhota UI state.

State hoisting: state upar ViewModel/caller, composable stateless — Preview aur test easy.

Why?

Bada data ViewModel/Room. rememberSaveable sirf chhota UI state. Interview dono farq clear karo.

How?

Screen par collectAsStateWithLifecycle, local tab rememberSaveable + hoisted child composables.`
    },
    {
      q: "System design: e-commerce module",
      en: `What?

Clarify requirements: catalog browse, cart, checkout, orders, push — NFR latency, offline, payment compliance. Modularize :feature:catalog, :cart, :checkout, :core:data.

Why?

Data: Room cart/order cache, Retrofit API, Repository SSOT. UI: MVVM/Compose, Navigation nested graphs. Paging 3 for product grid.

Checkout: server order → Razorpay → verify → emit success → FCM order updates. Idempotent placeOrder client request id.

Failure modes: payment pending poll, stale inventory conflict, token expiry re-auth. Observability Crashlytics + analytics funnel drop-off.

How?

Scale: CDN images, API pagination, feature flags new payment method rollout.`,
      hi: `What?

Requirements pehle. Catalog, cart, pay, orders. Modules alag feature teams ke liye.

Why?

Room offline aur Retrofit sync. Paging catalog lambi list ke liye.

Razorpay flow server verify ke saath. Client trust nahi.

Failure: payment pending, out of stock server reject, network retry policy.

How?

Zila jaisa project break karke bolo interview mein 2-3 minute design.`
    },
    {
      q: "Use cases in Clean Architecture",
      en: `What?

A **use case** (interactor) is a single business action in the domain layer: \`PlaceOrderUseCase\`, \`GetCartUseCase\`, \`VerifyPaymentUseCase\`. It orchestrates repositories and enforces rules — "cart cannot checkout empty", "apply max quantity".

Why?

ViewModel stays thin: calls use cases instead of Retrofit/Room directly. Domain layer has **no Android imports** — pure Kotlin, easy JVM unit tests. Repository interfaces live in domain; implementations in data module.

MVVM + Clean: View → ViewModel → UseCase → Repository → {API, DB}. Optional for small apps; valuable when rules are complex (payments, gov workflows, multi-feature teams).

How?

\`\`\`kotlin
class PlaceOrderUseCase(private val repo: OrderRepository) {
    suspend operator fun invoke(cartId: String): Result<OrderId> {
        if (repo.getCartItems(cartId).isEmpty()) return Result.failure(IllegalStateException("Empty cart"))
        return repo.placeOrder(cartId)
    }
}
\`\`\`

Interview: use case = one job; ViewModel coordinates UI state only.`,
      hi: `What?

Use case domain layer mein ek business action hai — \`PlaceOrderUseCase\`, \`LoginUseCase\`. Repository ko call karke rules enforce karta hai.

Why?

ViewModel patla rehta hai. Domain mein Android import nahi — sirf Kotlin test easy.

Chhote app mein optional. Payment/gov/complex rules par valuable.

Flow: UI → ViewModel → UseCase → Repository → API/Room.

How?

\`\`\`kotlin
class GetUserUseCase(private val repo: UserRepository) {
    suspend operator fun invoke(id: String) = repo.getUser(id)
}
\`\`\`

Interview: ek use case = ek kaam; ViewModel sirf UiState handle kare.`
    },
    {
      q: "System design: WhatsApp-style chat",
      en: `What?

Clarify scope: 1:1 and group chat, text + media, delivery/read receipts, online presence, push when offline, end-to-end encryption (optional deep dive).

Why?

Architecture:
- **Client**: single-activity, Navigation, chat list + conversation screens, Room for message cache, Paging for history.
- **Realtime**: WebSocket or MQTT while app foreground; FCM data message when background to wake sync.
- **API**: REST send message, GET paginated history \`before_id\`, media upload multipart → CDN URL in message payload.
- **Ordering**: server assigns monotonic \`sequence\` per chat; client merges out-of-order; optimistic UI pending → sent → delivered → read ticks.
- **Offline**: queue outgoing messages in Room; WorkManager retry with idempotency key; show failed tap-to-retry.
- **Scale**: shard chats by chatId, fan-out via message queue, read receipts batched.

How?

Interview close: conflict = server wins on final message order; media lazy load thumbnails; battery — websocket heartbeat adaptive; mention metrics: p95 send latency, delivery receipt lag, crash-free.`,
      hi: `What?

Scope clear karo: 1:1/group, text/media, delivered/read, offline push, optional E2E encryption.

Why?

Client: Room message cache, Paging history, optimistic send UI. Realtime WebSocket foreground; background FCM sync.

Server sequence per chat — order fix. Outgoing offline queue + WorkManager retry.

Media: upload URL phir message mein CDN link. Thumbnail pehle, full lazy load.

How?

2-3 min whiteboard: UI → VM → Repo → {WS, REST, Room}. Failure: retry, idempotent send, server authoritative order. Metrics: delivery latency, sync success.`
    },
    {
      q: "APK vs AAB?",
      en: `What?

APK is installable package — single artifact all ABIs/resources unless splits manual. AAB (Android App Bundle) upload format to Play — Google generates optimized split APKs per device config.

Why?

Benefits: smaller download (language/density/ABI splits), dynamic feature modules possible, Play signing. Local debug still APK/AAB via Android Studio.

Cannot sideload AAB directly to users — bundletool build apks for testing. Enterprise MDM may need universal APK occasionally.

How?

Interview: Play mandatory AAB for new apps; mention app size vitals impact retention.`,
      hi: `What?

APK direct install file. Sab kuch ek bundle mein ho sakta hai bada.

Why?

AAB Play ko upload. Google device ke hisaab se chhota APK banata hai split se.

User ko chhota download. Language/ABI sirf jo chahiye.

Local test bundletool se APK generate. Play Console AAB mandatory practically.

How?

App size kam retention better. Interview metric link.`
    },
    {
      q: "Context types",
      en: `What?

Application Context: app lifetime, no UI theme — use for singletons needing Context (Room database, Coil image loader config). Cannot start Activity or inflate themed dialogs.

Why?

Activity Context: theme, window, token for UI — required for dialogs, toasts with theme, starting activities. Short-lived.

Memory leak when singleton holds Activity Context — rotation keeps dead Activity. Pattern: context.applicationContext when theme not needed.

Compose LocalContext.current — usually Activity; prefer applicationContext in ViewModel never. Hilt @ApplicationContext inject.

How?

Interview: Razorpay needs Activity context for checkout UI — not Application.`,
      hi: `What?

Application Context poori app life. Singleton Room/ImageLoader ke liye. Theme nahi.

Why?

Activity Context UI theme ke saath. Dialog, start Activity.

Singleton mein Activity Context mat. Leak fix ApplicationContext.

ViewModel Context hold hi mat karein ideally. Event se UI ko bolo.

How?

Payment SDK Activity context maangta hai. Application se fail.`
    },
    {
      q: "Activity launchMode",
      en: `What?

standard: new instance every launch. singleTop: if already top of stack, onNewIntent instead of new instance — deep link duplicate handling.

Why?

singleTask: one instance per task; may clear activities above; own taskAffinity sometimes. singleInstance: alone in task — rare (launcher-like).

Manifest launchMode + intent flags FLAG_ACTIVITY_* combine — know CLEAR_TOP, NEW_TASK, SINGLE_TOP for notifications.

How?

Modern Navigation reduces launchMode hacks — still needed notification entry, payment return, multi-task edge cases.

Interview bug: multiple LoginActivity stack — fix singleTop + clear back stack on logout NavController popUpTo.`,
      hi: `What?

Standard har bar nayi Activity. singleTop top par hai to reuse onNewIntent.

Why?

SingleTask ek task mein ek instance. Deep link duplicate fix.

Intent flags bhi stack change karte. Notification NEW_TASK.

Logout par login stack clear popUpTo inclusive true.

How?

Nav Component ke baad kam use par payment/deep link ab bhi aata hai.`
    },
    {
      q: "Gradle product flavors",
      en: `What?

productFlavors dimension create variants — dev, staging, prod with different applicationIdSuffix, app name, API base URL via BuildConfig fields.

Why?

Combine with buildTypes debug/release — devDebug, prodRelease matrices. sourceSets flavor-specific resources/manifest optional.

manifestPlaceholders, resValue, buildConfigField inject env config. Never commit prod secrets — CI injects signing + API keys.

Flavor matching dependencies rare advanced. Play tracks: internal staging prod rollout per flavor bundle if separate app ids.

How?

Interview: ShopKirana dev points to mock API; prod Razorpay live keys; same codebase Hilt modules bind different base Url @Named qualifier.`,
      hi: `What?

ProductFlavors dev/staging/prod. Alag BASE_URL BuildConfig mein.

Why?

ApplicationIdSuffix dev par. Ek phone par dev aur prod dono install.

Secrets CI se inject. Git mein prod key mat.

BuildTypes release minify aur signing config flavor ke saath combine.

How?

Hilt @Named("baseUrl") flavor-specific provide module pattern.`
    },
    {
      q: "Jetpack Compose Stability & Optimization",
      en: `What?

Compose compiler determines if a class is stable or unstable. Stable classes (primitives, String, immutable classes, or marked with @Stable/@Immutable) allow Compose to skip recomposition if parameters haven't changed. Unstable classes (e.g., standard collections like List, Var-holding classes) force recomposition every time.

Why?

Optimization techniques:
1. @Stable / @Immutable: Mark data models to tell the compiler they won't change or change observably. Note: Do not lie to the compiler; if a var changes, it will cause UI bugs.
2. Kotlinx Immutable Collections: Use \`PersistentList\` or \`ImmutableList\` instead of standard \`List\` to ensure stability.
3. derivedStateOf: Use to buffer rapid state changes (e.g., scroll position) and only trigger recomposition when the final computed value actually changes.
4. rememberUpdatedState: Capture a value in a lambda without restarting the parent SideEffect (e.g., keeping a callback fresh in a LaunchedEffect).

How?

Interview Tip: Explain how standard \`List<T>\` is treated as unstable because the compiler cannot guarantee the underlying implementation (e.g. ArrayList) won't mutate. Fix by wrapping in a stable class or using kotlinx-collections-immutable.`,
      hi: `What?

Compose compiler yeh check karta hai ki koi class stable hai ya unstable. Stable classes (primitives, String, immutable classes, ya @Stable/@Immutable marked) Compose ko recomposition skip karne dete hain agar parameters change nahi hue hain. Unstable classes (jaise standard List, var wale classes) har baar recomposition force karte hain
Optimization techniques:
1. @Stable / @Immutable: Data models ko mark karke compiler ko batao ki yeh change nahi honge ya change hone par notify karenge.
2. Kotlinx Immutable Collections: Standard List ke bajay PersistentList ya ImmutableList ka use karo takki compiler use stable maane.
3. derivedStateOf: Rapid state changes (jaise scroll position) ko buffer karne ke liye use karo takki recomposition tabhi ho jab final value change ho.
4. rememberUpdatedState: Kisi callback ko LaunchedEffect ke andar fresh rakhne ke liye use karo bina effect ko restart kiye.

How?

Interview Tip: Standard \`List<T>\` unstable mana jata hai kyunki compiler guarantee nahi de sakta ki underlying implementation (jaise ArrayList) mutate nahi hogi. Iska solution hai wrapper class banana ya kotlinx-collections-immutable use karna.`
    },
    {
      q: "SSL Pinning & Network Security",
      en: `What?

SSL Pinning is a security technique that binds a cryptographic key to a specific server, preventing Man-In-The-Middle (MITM) attacks even if a user trusts a malicious root certificate.

Why?

Implementation in OkHttp: Use \`CertificatePinner\` with SHA-256 hashes of the server's public key (Subject Public Key Info - SPKI).

\`\`\`kotlin
val certificatePinner = CertificatePinner.Builder()
    .add("api.shopkirana.com", "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
    .build()
val okHttpClient = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
\`\`\`

Network Security Config (Android 7.0+): Declare pinning in XML under \`res/xml/network_security_config.xml\` and link in Manifest. This is cleaner and handled by the system.

Certificate Rotation Plan: Always pin backup certificates/keys (e.g., intermediate or root CAs) so that if the leaf certificate expires or gets compromised, the app doesn't crash or require an emergency update.

How?

OWASP MASVS: SSL Pinning is a key requirement for L2 high-security apps (Fintech, Gov, Healthcare).`,
      hi: `What?

SSL Pinning ek security technique hai jo server ki public key ko app ke andar bind (pin) kar deti hai. Yeh Man-In-The-Middle (MITM) attacks ko rokta hai, chahe user kisi malicious root certificate par trust bhi kar le.

Why?

OkHttp mein implementation: \`CertificatePinner\` ka use karo jisme server ki public key ka SHA-256 hash pass kiya jata hai.

Network Security Config (Android 7.0 aur ): XML file (\`res/xml/network_security_config.xml\`) ke andar pinning declare karo aur Manifest mein link karo. Yeh system-level aur clean solution hai.

Certificate Rotation Plan: Hamesha backup certificates (jaise intermediate ya root CA) ko pin karke rakho takki agar main certificate expire ya compromise ho jaye, to app crash na ho aur emergency update ki zaroorat na pade.

How?

OWASP MASVS: SSL Pinning Fintech, Gov aur Healthcare apps ke liye ek standard security requirement hai.`
    },
    {
      q: "Android IPC & Binder under the hood",
      en: `What?

Inter-Process Communication (IPC) in Android is the mechanism that allows different apps or system services to communicate and share data. The core driver behind Android IPC is the Binder.

Why?

Why Binder? Binder is a custom Linux kernel driver. Unlike standard Linux IPC (pipes, sockets), Binder performs only a single data copy from the sender's user space directly to the receiver's kernel space (and then mapped to user space), making it extremely fast and memory-efficient.

AIDL (Android Interface Definition Language): Defines the programming interface for client and service to agree upon for IPC. The compiler generates Java/Kotlin stub classes that handle marshalling (converting objects to primitives/parcels) and unmarshalling.

Messenger: A simpler alternative to AIDL that internally uses a Handler and Message queue. It is single-threaded, meaning all IPC calls are processed sequentially, avoiding concurrency issues.

How?

Security: Binder automatically attaches the Calling UID (User ID) and PID (Process ID) to every transaction, allowing services to perform strict permission checks before executing commands.`,
      hi: `What?

Inter-Process Communication (IPC) Android mein alag-alag apps ya system services ko aapas mein communicate aur data share karne ki permission deta hai. Iske peeche main driver Binder hai.

Why?

Why Binder? Binder ek custom Linux kernel driver hai. Standard Linux IPC (sockets, pipes) ke opposite, Binder sirf ek single data copy karta hai sender ke user space se direct receiver ke kernel space mein, jo ise bahut fast aur memory-efficient banata hai.

AIDL (Android Interface Definition Language): Client aur Service ke beech IPC contract define karta hai. Compiler internally stub classes generate karta hai jo marshalling (objects ko parcels mein convert karna) aur unmarshalling handle karti hain.

Messenger: AIDL ka ek simple alternative hai jo internally Handler aur Message queue use karta hai. Yeh single-threaded hota hai, yaani saare calls sequentially process hote hain.

How?

Security: Binder har transaction ke saath automatically Calling UID aur PID attach karta hai, jisse services strict permission checks perform kar sakti hain.`
    },
    {
      q: "Android Handler, Looper, and MessageQueue (Main Thread loop)",
      en: `What?

The Handler, Looper, and MessageQueue form the fundamental message-passing framework (HandlerThread) that powers Android's single-threaded UI model. 
1. MessageQueue: A queue that holds a list of messages/runnables to be dispatched.
2. Looper: An infinite loop that runs on a thread, pulls messages from the MessageQueue, and dispatches them to their target Handlers.
3. Handler: The interface used to push messages/runnables into the MessageQueue and process them when they are pulled out by the Looper.

Why?

Android's UI toolkit is not thread-safe. If multiple threads try to update UI elements concurrently, it leads to race conditions, memory corruption, and crashes. To prevent this, Android enforces that all UI updates must happen on a single thread (the Main Thread). The Looper/Handler framework is what keeps the Main Thread alive and processes UI draw events, touch events, and lifecycle callbacks sequentially.

How?

Every thread can have at most one Looper. The Main Thread has its Looper initialized automatically by the system (\`Looper.prepareMainLooper()\`). To run code on the main thread from a background thread, you instantiate a Handler bound to the main Looper:

\`\`\`kotlin
val mainHandler = Handler(Looper.getMainLooper())

// Run on Main Thread
mainHandler.post {
    binding.textView.text = "Updated from background!"
}
\`\`\`

Under the hood, \`Looper.loop()\` runs an infinite \`for (;;)\` loop. If the MessageQueue is empty, the thread blocks at the Linux kernel level (using \`epoll\` on a file descriptor) so it doesn't consume CPU cycles. When a new message is posted, the kernel wakes up the thread, and the Looper dispatches the message via \`msg.target.dispatchMessage(msg)\`.`,
      hi: `What?

Handler, Looper, aur MessageQueue Android ke single-threaded UI model ke core components hain jo aapas mein communicate karne mein help karte hain.
1. MessageQueue: Ek queue jo execution ke liye waiting messages/runnables ko hold karti hai.
2. Looper: Ek infinite loop jo thread par chalta hai, MessageQueue se messages nikalta hai, aur unhe target Handlers ko dispatch karta hai.
3. Handler: Ek class jiska use MessageQueue mein messages dalne aur jab Looper unhe nikalta hai to unhe process karne ke liye kiya jata hai.

Why?

Android ka UI toolkit thread-safe nahi hai. Agar multiple threads ek sath UI ko update karenge, to race conditions aur crashes honge. Isliye Android saare UI updates ko ek hi thread (Main Thread) par restrict karta hai. Looper/Handler framework hi Main Thread ko active rakhta hai aur screen draw events, touch events, aur lifecycle callbacks ko sequentially run karta hai.

How?

Har thread ke paas maximum ek hi Looper ho sakta hai. Main Thread ka Looper system khud initialize karta hai. Background thread se Main Thread par UI update bhejne ke liye main Looper se bound Handler ka use kiya jata hai:

\`\`\`kotlin
val mainHandler = Handler(Looper.getMainLooper()).

// Main thread par run karna
mainHandler.post {
    binding.textView.text = "Updated from background!"
}
\`\`\`

Under the hood, \`Looper.loop()\` ek infinite \`for (. )\` loop chalata hai. Agar MessageQueue khali hai, to thread Linux kernel level (using \`epoll\`) par block ho jata hai taaki CPU waste na ho. Naya message aane par thread wake up hota hai aur message process karta hai.`
    },
    {
      q: "Android Custom Views and Measure/Layout/Draw lifecycle",
      en: `What?

Custom Views allow developers to build completely custom UI elements with unique designs and animations that cannot be achieved using standard XML layouts or Compose. The rendering lifecycle of a View consists of three main phases:
1. Measure (\`onMeasure\`): Determines how big the view should be.
2. Layout (\`onLayout\`): Determines where the view should be positioned on the screen.
3. Draw (\`onDraw\`): Renders the actual pixels (lines, shapes, text, bitmaps) using a \`Canvas\` and \`Paint\` object.

Why?

Understanding this lifecycle is critical for performance. For example, performing object allocations (like \`new Paint()\` or \`new Path()\`) inside \`onDraw\` is an anti-pattern because \`onDraw\` is called up to 60 or 120 times per second. Allocating memory inside it triggers frequent Garbage Collection (GC) pauses, causing UI stutter (jank).

How?

Override the lifecycle methods in your custom view class:

\`\`\`kotlin
class CustomProgressView(context: Context, attrs: AttributeSet) : View(context, attrs) {
    private val paint = Paint().apply {
        color = Color.BLUE
        style = Paint.Style.FILL
    }

    override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) {
        val desiredWidth = 200 // in pixels
        val width = resolveSize(desiredWidth, widthMeasureSpec)
        setMeasuredDimension(width, width) // Force square aspect ratio
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        canvas.drawCircle(width / 2f, height / 2f, width / 2f, paint) // Avoid allocations here
    }
}
\`\`\`

To trigger a redraw when data changes, call \`invalidate()\` (runs \`onDraw\` again). To trigger a size recalculation, call \`requestLayout()\` (runs \`onMeasure\` and \`onLayout\` again).`,
      hi: `What?

Custom Views developers ko custom UI elements aur animations banane ki permission dete hain jo standard layouts se possible nahi hote. View rendering lifecycle ke teen main phases hote hain:
1. Measure (\`onMeasure\`): View ka size (width aur height) calculate karta hai.
2. Layout (\`onLayout\`): View ki screen par exact position decide karta hai.
3. Draw (\`onDraw\`): Canvas aur Paint objects ka use karke actual pixels (shapes, lines, text) screen par draw karta hai.
4. MeasureSpec: Parent view child ko constraints pass karta hai (EXACTLY, AT_MOST, UNSPECIFIED).

Why?

Is lifecycle ko samajhna performance ke liye bahut zaroori hai. \`onDraw\` method 1 second mein 60 se 120 baar call ho sakta hai. Agar aap iske andar objects allocate karenge (jaise \`Paint()\` banana), to memory jaldi bharegi aur GC pauses ki wajah se UI scroll karte waqt jank (stutter) hoga.

How?

Custom View class mein lifecycle methods ko override karein:

\`\`\`kotlin
class CustomProgressView(context: Context, attrs: AttributeSet) : View(context, attrs) { private val paint = Paint().apply { color = Color.BLUE style = Paint.Style.FILL }.

Override fun onMeasure(widthMeasureSpec: Int, heightMeasureSpec: Int) { val desiredWidth = 200 val width = resolveSize(desiredWidth, widthMeasureSpec) setMeasuredDimension(width, width) // Square view }
Override fun onDraw(canvas: Canvas) { super.onDraw(canvas) canvas.drawCircle(width / 2f, height / 2f, width / 2f, paint) // No object allocation here }
}
\`\`\`.

Data change hone par view ko redraw karne ke liye \`invalidate()\` call karein (yeh \`onDraw\` ko fir se chalata hai). Size change hone par \`requestLayout()\` call karein (yeh \`onMeasure\` aur \`onLayout\` ko fir se chalata hai).`
    },
    {
      q: "Fragment — onCreate vs onCreateView (which runs once?)",
      en: `What?

onCreate runs once per Fragment instance when the fragment is created. onCreateView can run multiple times — each time the view hierarchy is destroyed and recreated (e.g. after onDestroyView when returning from back stack or configuration change that recreates the view).

Why?

Bind UI and observers in onViewCreated with viewLifecycleOwner, not the fragment lifecycle alone. Clear ViewBinding in onDestroyView to avoid leaks.

How?

Interview one-liner: onCreate once per instance; onCreateView again when the view is rebuilt.`,
      hi: `What?

onCreate ek baar instance par. onCreateView view dubara ban sakta hai.

Why?

viewLifecycleOwner use karo LiveData ke liye.

How?

onDestroyView par binding null.`
    },
    {
      q: "Login feature — classes, repositories, and architecture",
      en: `What?

Typical Clean Architecture for login:
- UI: LoginScreen (Compose/Fragment) + LoginViewModel
- Domain: LoginUseCase, AuthRepository interface
- Data: AuthRepositoryImpl → AuthApi (Retrofit) + TokenStore (Encrypted DataStore/Keystore)

Why?

ViewModel exposes UiState (Idle, Loading, Error, Success). UseCase validates input and calls repository. Repository maps API DTO to domain and persists token — never store password locally.

How?

Whiteboard: UI → VM → UseCase → Repo → API + secure storage. Mention refresh token and logout clears store.`,
      hi: `What?

LoginScreen, LoginViewModel, LoginUseCase, AuthRepository, AuthApi, TokenStore.

Why?

Password local mat rakho. Token encrypt.

How?

2 min diagram interview mein.`
    },
    {
      q: "Hilt @Singleton, @Qualifier, @Binds — two implementations of one interface",
      en: `What?

@Singleton provides one instance per component (often SingletonComponent). When two classes implement the same interface, use @Qualifier (custom annotation) on each implementation and on injection sites. @Binds in an abstract @Module binds interface to impl without @Provides boilerplate.

Why?

Example: ProdApi vs StagingApi both implement ApiService — @ProdApi @Inject constructor on impl, @Binds abstract fun bind(@ProdApi impl: ApiServiceImpl): ApiService.

How?

\`\`\`kotlin
@Qualifier @Retention annotation class ProdApi
@Singleton @ProdApi class ProdApiService @Inject constructor() : ApiService
\`\`\``,
      hi: `What?

Do implementation same interface — @Qualifier alag tag. @Singleton app-wide ek instance.

Why?

@Binds module mein interface bind.

How?

Prod/Staging API example bolo.`
    },
    {
      q: "Domain layer in Clean Architecture",
      en: `What?

The domain layer contains business rules: use cases (interactors), repository interfaces, and pure Kotlin models. No Android framework imports (no Context, no ViewModel).

Why?

Keeps logic testable on JVM, reusable across modules, and independent of UI/data details. Data layer implements repository; presentation calls use cases.

How?

Flow: ViewModel → LoginUseCase → AuthRepository (interface) ← AuthRepositoryImpl in data module.`,
      hi: `What?

Domain = use cases + repo interfaces. Android import nahi.

Why?

Unit test easy. Business rules ek jagah.

How?

ViewModel sirf use case call kare.`
    },
    {
      q: "Jetpack libraries — overview for interview",
      en: `What?

Common Jetpack libraries: ViewModel, LiveData/Flow, Room, Navigation, WorkManager, DataStore, Paging, Compose, Hilt, CameraX, Biometric, Benchmark.

Why?

They solve lifecycle-aware state, persistence, background work, and UI with Google-maintained APIs instead of custom fragile code.

How?

Pick 5 you used in a real project and one-line purpose each — interviewers prefer project mapping over memorized list.`,
      hi: `What?

ViewModel, Room, Navigation, WorkManager, Compose, Hilt — 5 naam + use case.

Why?

Lifecycle aur background Google handle.

How?

Apne project se map karo.`
    },
    {
      q: "Android code optimization — practical checklist",
      en: `What?

Main thread: no blocking I/O, heavy work on Dispatchers.IO/Default. Lists: DiffUtil, stable keys, RecyclerView pool. Compose: stable parameters, remember, avoid unnecessary recomposition. Startup: lazy init, App Startup library. Memory: clear bindings, leak canary in debug. Network: OkHttp cache, pagination. DB: Room indexes on queried columns.

Why?

ANR, jank, and OOM are production killers measured in Play Vitals and Crashlytics.

How?

Profile with Android Studio Profiler before micro-optimizing; cite one metric you improved (startup time, frame time).`,
      hi: `What?

Main thread free, list optimize, Compose remember, leak fix, network cache.

Why?

ANR/OOM se rating girti hai.

How?

Profiler se pehle measure karo.`
    },
    {
      q: "WebSocket / Socket.IO vs HTTP REST vs FCM",
      en: `What?

HTTP REST: request-response, stateless, good for CRUD and occasional polling. WebSocket: full-duplex persistent connection — real-time chat, live scores, collaborative edits. FCM: Google push to wake app or show notification — not a chat transport.

Why?

Chat apps often use REST for history + WebSocket for live messages + FCM for background wake when app killed. HTTP polling wastes battery; Firebase Realtime DB is a different managed product than raw sockets.

How?

Interview: choose by latency, battery, and whether server must push to idle devices.`,
      hi: `What?

HTTP CRUD. WebSocket live duplex. FCM push wake.

Why?

Chat = REST + socket + FCM hybrid.

How?

Battery aur real-time need se choose.`
    },
    {
      q: "Case-insensitive parsing from network JSON",
      en: `What?

APIs may return status as "ACTIVE", "active", or "Active". Normalize in the data layer: \`value.trim().lowercase()\`, map to enum with \`enumValueOf\` or \`entries.find { it.apiName.equals(raw, ignoreCase = true) }\`.

Why?

Never compare raw strings in UI or ViewModel — single mapper in Repository keeps behavior consistent and testable.

How?

\`\`\`kotlin
fun String.toOrderStatus(): OrderStatus? =
    OrderStatus.entries.find { it.name.equals(this, ignoreCase = true) }
\`\`\``,
      hi: `What?

Repository mein lowercase/ignoreCase enum map.

Why?

UI mein raw string compare mat karo.

How?

Mapper ek jagah test karo.`
    },
    {
      q: "Data Binding — pass object variable in XML",
      en: `What?

Enable data binding in layout XML: \`<layout>\` wrapper, \`<data>\` section with \`<variable name="user" type="com.app.User"/>\`, expressions \`@{user.displayName}\`.

Why?

Activity/Fragment sets \`binding.user = viewModel.user.value\` and \`binding.lifecycleOwner = viewLifecycleOwner\` for LiveData observables in XML.

How?

\`\`\`xml
<variable name="item" type="com.app.Product"/>
<TextView android:text="@{item.title}" />
\`\`\`

Prefer ViewBinding for new screens; Data Binding when heavy XML-driven UI remains.`,
      hi: `What?

XML mein variable declare, @{item.name} expression.

Why?

binding.item = model set karo.

How?

lifecycleOwner LiveData ke liye.`
    },
    {
      q: "Intent filter — implicit vs explicit intent and OS resolution",
      en: `What?

Explicit intent: you set component class — used for in-app navigation. Implicit intent: action + category + data URI — OS resolves apps with matching intent-filter in manifest.

Why?

Picking image: \`Intent(ACTION_GET_CONTENT)\` + \`image/*\` — gallery apps register filters; your app does not hardcode package name.

How?

Manifest intent-filter for deep links: VIEW action, https scheme, host. Explain: ActivityManager queries PackageManager for matching activities.`,
      hi: `What?

Explicit class set. Implicit OS choose kare filter se.

Why?

Gallery pick implicit intent.

How?

intent-filter manifest deep link.`
    },
    {
      q: "WorkManager vs JobScheduler",
      en: `What?

JobScheduler is the Android framework API (API 21+) for scheduling jobs with constraints. WorkManager is the Jetpack library that wraps JobScheduler, AlarmManager, and Firebase JobDispatcher with a unified API and guarantees work runs even after reboot (with constraints).

Why?

App code should use WorkManager — backward compatible, chains, unique work, testing APIs. JobScheduler is what WorkManager uses on modern devices under the hood.

How?

Interview: deferrable background sync → WorkManager; not for UI work or immediate main-thread tasks.`,
      hi: `What?

JobScheduler platform. WorkManager Jetpack wrapper.

Why?

App mein WorkManager prefer karo.

How?

Deferrable sync example.`
    },
    {
      q: "FCM notification payload vs data payload",
      en: `What?

Notification payload: FCM displays tray notification automatically when app in background. Data payload: delivered to \`onMessageReceived\` for custom handling — always for data-only messages when app in foreground.

Why?

Order sync: data payload with orderId → WorkManager enqueue. Marketing: notification payload with title/body. Mixing both: background may show tray and still deliver data depending on priority and app state.

How?

Handle data in FirebaseMessagingService; never trust client-only for payment confirmation — verify server-side.`,
      hi: `What?

Notification tray auto. Data custom code.

Why?

orderId data se sync worker.

How?

Payment server verify mandatory.`
    },
    {
      q: "ViewModel lifecycle and when it is cleared",
      en: `What?

ViewModel is scoped to a ViewModelStoreOwner (Activity, Fragment, or Navigation back stack entry). It survives configuration changes. Cleared when the owner is finished permanently (Activity finish, Fragment removed without back stack retention) or when NavBackStackEntry is popped.

Why?

onCleared() cancels viewModelScope coroutines. Do not hold Activity Context in ViewModel — use Application context if needed.

How?

Cross-question answers: survives rotation; dies on back press finish; use viewModels() delegate; shared VM with activityViewModels() for multi-fragment flow.`,
      hi: `What?

ViewModel owner ke scope tak. Rotate par bachta hai.

Why?

onCleared par coroutine cancel.

How?

Activity context VM mein mat rakho.`
    },
    {
      q: "SOLID principles in Android development",
      en: `What?

S: Single responsibility — ViewModel orchestrates, Repository fetches. O: Open/closed — extend via interfaces not modifying core. L: Liskov — impls honor contracts. I: Interface segregation — small repo interfaces. D: Dependency inversion — depend on abstractions, Hilt injects impls.

Why?

Makes modules testable and swappable (fake repo, mock payment). Prevents God Activity anti-pattern.

How?

Give one Android example per letter in 30 seconds — e.g. D: ViewModel depends on CartRepository interface not Retrofit directly.`,
      hi: `What?

SOLID — S single job, O extend, L contract, I chhote interface, D abstraction.

Why?

Test aur Hilt swap easy.

How?

Har letter ek Android example.`
    }
    ]
  },
  {
    id: "dsa",
    label: "DSA for Android",
    icon: "fa-solid fa-chart-line",
    items: [
    {
      q: "Why DSA for Android interviews?",
      en: `What?

Mobile apps still process lists, search, filters, caches, and graph-like navigation — algorithmic complexity affects battery and jank on low-end devices. Interviewers test problem-solving plus ability to connect to app context.

Why?

Expect Easy–Medium LeetCode patterns: arrays, hash maps, two pointers, BFS/DFS, heaps — not competitive programming extremes unless FAANG mobile.

Android tie-in: DiffUtil is DP-like comparison; LruCache is hash + linked list; Paging is batch windowing. Mention threading — heavy DSA off main thread.

Communication matters: state brute force then optimize; cite time/space complexity clearly.

How?

Practice 50–80 curated problems with patterns rather than random hard grind — quality over quantity for 3–5 YOE Android roles.`,
      hi: `What?

Android dev ko bhi DSA aana chahiye. Badi product list filter/search efficient honi chahiye warna UI slow.

How?

Interview Easy-Medium. Two Sum, sliding window, BFS typical.

App context jodo: nearest store BFS, top products heap, anagram search filter.

Pehle brute force bolo phir optimize. Interviewer process dekhta hai.

Main thread par O(n²) mat. Background dispatcher mention karo.`
    },
    {
      q: "Two Sum approach",
      en: `What?

Brute: nested loops O(n²) find pair summing to target. Optimal: HashMap stores value→index while scanning; for each num check if (target - num) exists — O(n) time O(n) space.

Why?

Handle duplicates: same value different indices OK; clarify if reuse same element forbidden.

Android analogy: find two products whose prices sum to wallet balance in cart promo engine — map price to product id.

Edge cases: empty array, no solution return empty or -1 per spec, negative numbers work fine.

How?

Follow-up: sorted array two pointers O(1) space; Three Sum extension sort + two pointer for each i.`,
      hi: `What?

Brute do loop O(n²). Optimized HashMap ek pass. Complement target-num map mein hai?

Why?

Har element par check karo aur map mein daalo index ke saath.

Cart mein do item total target. Same pattern interview mein bolo.

Duplicate values allowed alag index par.

How?

Sorted ho to two pointers space O(1) bonus.`
    },
    {
      q: "Valid Anagram / frequency counting",
      en: `What?

Compare two strings anagram: count char frequencies int[26] for lowercase English or HashMap for Unicode. Single pass count s++, t-- or count s then compare t.

Why?

Time O(n), space O(1) fixed alphabet or O(k) distinct chars.

Pattern extends: group anagrams, find all anagrams in string, ransom note.

Android: search suggestion normalization, duplicate order line detection by sku multiset.

How?

Kotlin: s.groupingBy { it }.eachCount() readable but watch allocations in hot path.`,
      hi: `What?

Dono string ke char count barabar. Anagram. int[26] array ya HashMap frequency.

Why?

Ek pass count badhao ghatao. End mein sab zero.

Pattern bahut common. Group anagrams same family.

Unicode ho to HashMap. Sirf a-z to array fast.

How?

Kotlin groupBy readable par performance critical path par array prefer.`
    },
    {
      q: "Sliding window — longest unique substring",
      en: `What?

Variable window: expand right pointer, track chars in HashSet or map last index; shrink left while duplicate exists. Track max length.

Why?

Time O(n) each char enters/leaves window once. Space O(min(n, alphabet)).

Template: while invalid shrink; update answer; expand. Fixed window variant for max sum subarray of size k.

Android: longest unique session id substring in analytics stream processing on backend; client-side debounce window similar intuition.

How?

Practice: minimum window substring, max consecutive ones III with flip budget.`,
      hi: `What?

Do pointer window. Right expand jab tak unique. Duplicate aaye left shrink.

Why?

HashSet ya lastIndex map duplicate track.

O(n) time. Har char do baar se zyada move nahi.

Fixed window alag template. Size k ka max sum.

How?

Interview pehle brute O(n³) phir sliding window optimize.`
    },
    {
      q: "Binary search — when applicable",
      en: `What?

Requires monotonic predicate on sorted data — if condition true for mid, search left or right half. O(log n) time O(1) space.

Why?

Variants: first/last occurrence, search rotated sorted array, binary search on answer (min capacity to ship in D days).

Mid calculation: left + (right - left) / 2 avoids overflow. Avoid infinite loop with correct boundary updates.

Android: binary search product id in sorted local cache; bisect version rollout threshold.

How?

Not applicable on unsorted — sort first O(n log n) or use HashMap O(n).`,
      hi: `What?

Sorted array par binary search O(log n). Monotonic property dhundho. Answer space par bhi apply hota hai.

Why?

Mid overflow se bachne left aur (right-left)/2.

First/last occurrence boundary tricky. Practice karo.

Unsorted par pehle sort ya HashMap. Galat tool mat use karo.

How?

Rotated array modified BS common follow-up.`
    },
    {
      q: "Merge intervals",
      en: `What?

Sort intervals by start time O(n log n). Iterate: if current overlaps merged last (start <= last.end), extend last.end = max(last.end, current.end); else append new interval.

Why?

Overlap test: a.start <= b.end && b.start <= a.end. After merge, disjoint sorted intervals.

Applications: meeting room scheduling, calendar busy blocks, delivery slot consolidation.

Android: merge overlapping promo active periods in admin dashboard; offline sync batch windows.

How?

Edge: empty input, single interval, all overlapping into one.`,
      hi: `What?

Start time se sort phir merge. Overlap ho to end extend. Nahi to naya interval.

Why?

O(n log n) sort dominant step.

Booking slots, delivery windows real use case bolo.

Sort ke baad linear scan enough.

How?

Empty/single edge case mention karo interview mein.`
    },
    {
      q: "BFS vs DFS use cases",
      en: `What?

BFS: queue, level-order, shortest path in unweighted graph O(V+E). DFS: stack/recursion, explore depth, paths, cycles, topological sort.

Why?

Graph representations: adjacency list HashMap node→neighbors common in interviews.

Android: BFS — shortest navigation steps in app screen graph debug tool; DFS — dependency resolution feature modules DAG.

Visited set prevents cycles. Grid problems: 4-direction BFS/DFS flood fill islands.

How?

Memory: BFS queue can be large wide graph; DFS recursion depth stack overflow risk — iterative DFS alternative.`,
      hi: `What?

BFS queue. Shortest path unweighted, level order. DFS stack/recursion. Path, cycle detect.

Why?

Visited set zaroori warna infinite loop.

Grid par 4 direction move common pattern flood fill.

Feature dependency topological sort DFS aur indegree bhi.

How?

Wide graph BFS memory zyada. Mention trade-off.`
    },
    {
      q: "Cycle in linked list",
      en: `What?

Floyd tortoise-hare: slow moves 1, fast moves 2; if cycle exists they meet inside cycle. O(n) time O(1) space.

Why?

Find cycle start: after meet, reset one pointer to head, advance both 1 step until meet — math proof optional in interview.

HashSet of visited nodes O(n) space simpler to explain first.

Android analogy: circular reference chain detection similar spirit to leak tracing (not identical).

How?

Related: happy number, duplicate number using cycle detection.`,
      hi: `What?

Slow 1 step fast 2 step. Cycle mein mil jayenge. O(1) space optimal.

Why?

Pehle HashSet se explain easy phir Floyd optimize.

Cycle start nikalna optional advanced step.

Linked list reverse/cycle dono pointer skills hain.

How?

No cycle par fast null par pahunchega.`
    },
    {
      q: "Reverse linked list iterative",
      en: `What?

Three pointers prev=null, curr=head, next; while curr: next=curr.next; curr.next=prev; prev=curr; curr=next. Return prev as new head.

Why?

O(n) time O(1) space. Recursive variant O(n) stack space.

Pattern base for reverse between m-n, k-group reverse advanced.

Android: less direct but tests pointer discipline useful understanding LinkedHashMap/LruCache internals conceptually.

How?

Draw diagram in interview — pointer order mistakes common bug.`,
      hi: `What?

Prev, curr, next teen pointer. Curr.next reverse karte jao. End par prev new head.

Why?

Iterative O(1) space preferred.

Recursive stack O(n). Iterative bolo pehle.

Diagram banao whiteboard par. Interview mein help.

How?

Partial reverse follow-up prepare karo.`
    },
    {
      q: "Valid parentheses with stack",
      en: `What?

Scan string: push opening brackets; on closing, stack must non-empty and top matches pair. End stack empty for valid.

Why?

Time O(n), space O(n) worst case.

Extensions: minimum add to valid, longest valid substring DP harder.

Android: expression parsing light similarity; navigation back stack LIFO mental model for juniors.

How?

Map pairs ')'→'(', etc. Edge: only opens, only closes, nested valid.`,
      hi: `What?

Opening bracket stack push. Closing par top match pop. End empty stack valid.

Why?

Stack LIFO. Undo/back stack analogy Android UI.

Mismatch ya empty stack pop. Invalid.

O(n) single pass.

How?

Minimum add brackets follow-up DP/stack combo.`
    },
    {
      q: "Sliding window maximum (deque)",
      en: `What?

Monotonic decreasing deque stores indices; front always current window max index. Remove indices outside window from front; pop back while smaller elements useless.

Why?

Amortized O(n) — each index pushed/popped once. Hard pattern but shows deque mastery.

Contrast with heap O(n log k) for top k simpler to code under pressure.

Android: rolling max network latency window monitoring dashboard — same algorithmic idea on metrics stream.

How?

Brute O(n*k) first in interview then optimize.`,
      hi: `What?

Deque indices store. Front max element current window. Purane index front se hatao.

Why?

Monotonic decreasing. Chhote useless pop back se.

Amortized O(n). Hard par impressive.

Heap se bhi ho sakta O(n log k). Trade-off bolo.

How?

Pehle brute force approach batao interviewer ko.`
    },
    {
      q: "Group anagrams HashMap",
      en: `What?

Key: sorted string or char frequency signature (e.g., count array encoded string). Value: list of strings grouping same key.

Why?

Time O(n * k log k) if sort each word length k; O(n*k) with freq key.

Pattern: custom key design for bucketing — contact grouping, sku normalization.

Android: group search keywords by normalized form for analytics batch.

How?

Space O(n*k) store all strings in groups.`,
      hi: `What?

Key sorted word ya frequency signature. Same key wale bucket mein.

Why?

HashMap<String, List<String>> result.

Freq key sort se faster long words par.

Custom key design skill test. Interview explain clearly.

How?

Output list of groups. Order matter karta hai ya nahi clarify.`
    },
    {
      q: "DP climbing stairs / Fibonacci",
      en: `What?

dp[i] = ways to reach step i = dp[i-1] + dp[i-2]; base dp[0]=1 dp[1]=1. O(n) time optimize to two variables O(1) space.

Why?

Recognize overlapping subproblems + optimal substructure — DP candidates.

Variants: min cost climbing stairs, decode ways, house robber linear DP.

Android: not daily coding but shows structured thinking for state machines and multi-step checkout flows combinatorics rarely.

How?

Bottom-up preferred over memo recursion stack limits.`,
      hi: `What?

Stairs 1 ya 2 step. Fibonacci jaisa recurrence. dp[i]=dp[i-1] aur dp[i-2].

Why?

Do variable se space O(1) optimize.

DP pattern pehchan: subproblem repeat aur optimal build.

House robber, min cost similar family.

How?

Top-down memo vs bottom-up. Bottom-up preferred interview code mein.`
    },
    {
      q: "Tree max depth",
      en: `What?

Recursive DFS: 1 + max(depth(left), depth(right)); null base 0. O(n) visit each node once.

Why?

BFS level count alternative — increment depth each level processed.

Balanced check, diameter, LCA build on same traversal skills.

Android analogy: View hierarchy depth (over-nesting warning), JSON tree max nesting validation.

How?

Stack overflow very deep skewed tree — iterative post-order optional mention.`,
      hi: `What?

Recursive null par 0. Warna 1 aur max(left, right). Simple DFS.

Why?

BFS level count se bhi depth milti hai.

Har node ek baar. O(n).

Skewed tree deep recursion risk. Iterative mention optional.

How?

Diameter/LCA follow-ups same tree foundation.`
    },
    {
      q: "Top K elements (heap)",
      en: `What?

Find K largest: min-heap size K — if num > peek replace; O(n log k). K smallest: max-heap mirror.

Why?

Quickselect average O(n) advanced. Sort O(n log n) acceptable small n.

Applications: top K rated products, nearest K stores with heap of distances.

Android: prioritize K notification candidates by score in inbox cap.

How?

Kotlin: PriorityQueue Java interop; or partial sort sortedDescending().take(k) small k pragmatic.`,
      hi: `What?

K largest ke liye min-heap size K. Root smallest among top K. Bada aaye to pop push.

Why?

O(n log k). N log n sort se better jab k chhota.

Nearest K stores heap. E-commerce example.

Kotlin PriorityQueue use kar sakte ho.

How?

K sabse chhote ke liye max-heap ulta logic.`
    },
    {
      q: "LRU Cache Implementation (LinkedHashMap under the hood)",
      en: `What?

An LRU (Least Recently Used) Cache is a cache eviction policy that discards the least recently accessed items first when the cache reaches its capacity limit. It supports two main operations in O(1) time complexity:
1. \`get(key)\`: Returns the value of the key if it exists, and marks it as most recently used.
2. \`put(key, value)\`: Inserts or updates the key-value pair. If the cache is full, it evicts the least recently used item before inserting.

Why?

Mobile devices have highly constrained memory. If an app loads thousands of images or API responses without a bounded cache, it will quickly run out of memory, causing an \`OutOfMemoryError\` (OOM). Android provides the \`LruCache\` class specifically for this purpose (e.g., for caching bitmap drawables).

How?

An LRU Cache is implemented using a combination of a Doubly Linked List and a HashMap:
- HashMap: Provides O(1) lookup of keys to their corresponding list nodes.
- Doubly Linked List: Maintains the access order. The most recently accessed item is moved to the head, and the least recently used item remains at the tail.

In Java/Kotlin, you can easily implement this by extending \`LinkedHashMap\` with \`accessOrder = true\` and overriding \`removeEldestEntry\`:

\`\`\`kotlin
class LRUCache<K, V>(private val capacity: Int) : LinkedHashMap<K, V>(capacity, 0.75f, true) {
    override fun removeEldestEntry(eldest: MutableMap.MutableEntry<K, V>?): Boolean {
        return size > capacity // Evict when size exceeds capacity
    }
}
\`\`\``,
      hi: `What?

LRU (Least Recently Used) Cache ek cache eviction policy hai jo cache full hone par sabse purane (unaccessed) items ko sabse pehle remove (evict) karti hai. Isme do main operations O(1) time complexity mein chalte hain:
1. \`get(key)\`: Key ki value return karta hai aur use 'most recently used' mark karta hai.
2. \`put(key, value)\`: Naya item insert karta hai. Agar cache full hai, to sabse purana accessed item delete ho jata hai.

Why?

Mobile devices mein memory bahut limited hoti hai. Agar aap bina kisi limit ke images ya API responses cache karte rahenge, to app jaldi hi \`OutOfMemoryError\` (OOM) se crash ho jayegi. Android is problem ko solve karne ke liye \`LruCache\` class provide karta hai.

How?

LRU Cache ko implement karne ke liye HashMap aur Doubly Linked List ka combination use kiya jata hai:

- HashMap: O(1) time mein key se node find karne ke liye.
- Doubly Linked List: Access order maintain karne ke liye. Naya accessed item Head par aata hai aur sabse purana Tail par rehta hai.

Kotlin/Java mein ise \`LinkedHashMap\` ke \`accessOrder = true\` parameter aur \`removeEldestEntry\` method ko override karke easily banaya ja sakta hai:

\`\`\`kotlin
class LRUCache<K, V>(private val capacity: Int) : LinkedHashMap<K, V>(capacity, 0.75f, true) { override fun removeEldestEntry(eldest: MutableMap.MutableEntry<K, V>?): Boolean { return size > capacity // Size limit se bada hone par evict karein }
}
\`\`\`.`
    },
    {
      q: "Trie (Prefix Tree) for Auto-complete/Search suggestions",
      en: `What?

A Trie (Prefix Tree) is an advanced tree-like data structure used for efficient retrieval of keys over a dataset of strings. Each node in a Trie represents a single character of a word, and sharing common prefixes allows multiple words to share the same root path.

Why?

In search-heavy mobile apps (like e-commerce search bars), looking up auto-complete suggestions using a standard list of words takes O(N * L) time (where N is the number of words, and L is the length of the query). A Trie optimizes this lookup to O(L) time, which is completely independent of the dataset size, ensuring instant search suggestions even with millions of products.

How?

Each Trie node contains a map of child characters and a boolean flag indicating if the node represents the end of a complete word:

\`\`\`kotlin
class TrieNode {
    val children = HashMap<Char, TrieNode>()
    var isEndOfWord = false
}

class Trie {
    private val root = TrieNode()

    fun insert(word: String) {
        var current = root
        for (char in word) {
            current = current.children.getOrPut(char) { TrieNode() }
        }
        current.isEndOfWord = true
    }

    fun searchPrefix(prefix: String): Boolean {
        var current = root
        for (char in prefix) {
            current = current.children[char] ?: return false
        }
        return true // Prefix exists
    }
}
\`\`\``,
      hi: `What?

Trie (jise Prefix Tree bhi kehte hain) ek advanced tree data structure hai jo strings ko efficiently store aur search karne ke liye use hota hai. Trie ka har node ek character ko represent karta hai, aur common prefixes share hone ki wajah se multiple words ek hi path use karte hain.

Why?

E-commerce search bars mein auto-complete suggestions ke liye agar aap standard list search use karenge, to O(N * L) time lagega (N = total products, L = query length). Trie is search ko O(L) time mein convert kar deta hai, jo dataset ke size se completely independent hai. Isse suggestions instant aate hain.

How?

Trie ke har node mein child characters ka map aur ek boolean flag hota hai jo word ke end ko mark karta hai:

\`\`\`kotlin
class TrieNode { val children = HashMap<Char, TrieNode>() var isEndOfWord = false
}.

class Trie {
    private val root = TrieNode()

fun insert(word: String) {
        var current = root
        for (char in word) {
            current = current.children.getOrPut(char) { TrieNode() }
        }
        current.isEndOfWord = true
    }

fun searchPrefix(prefix: String): Boolean {
        var current = root
        for (char in prefix) {
            current = current.children[char] ?: return false
        }
        return true // Prefix exists
    }
}
\`\`\``
    },
    {
      q: "Rotate matrix 90 degrees clockwise",
      en: `What?

Given an n×n matrix, rotate 90° clockwise in-place (common Infosys / whiteboard variant).

**Approach 1 — transpose + reverse rows:** Transpose (swap matrix[i][j] with matrix[j][i] for i<j), then reverse each row. O(n²) time, O(1) extra if in-place.

**Approach 2 — layer by layer:** Rotate concentric rings from outside in — harder to code under pressure.

Why?

Shows 2D array indexing skill alongside linked list / string questions. Watch bounds: square matrix assumption; rectangular needs different strategy (rotate via new matrix).

How?

\`\`\`kotlin
fun rotate(matrix: Array<IntArray>) {
    val n = matrix.size
    for (i in 0 until n) for (j in i + 1 until n) {
        val t = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = t
    }
    for (row in matrix) row.reverse()
}
\`\`\`

Interview: say transpose + reverse first; mention ring rotation as alternative.`,
      hi: `What?

n×n matrix 90° clockwise. Transpose karke har row reverse — O(n²), in-place.

Why?

Infosys kabhi matrix rotation puchta hai. Square matrix assume. Rectangular alag problem.

How?

Pehle transpose (i<j swap), phir har row reverse(). Code simple yaad rakho interview ke liye.`
    },
    {
      q: "Valid palindrome string",
      en: `What?

Check if a string reads the same forward and backward after optionally removing non-alphanumeric characters and ignoring case (LeetCode-style **Valid Palindrome**).

**Two pointers:** left at start, right at end; skip non-alphanumeric; compare lowercase letters; move inward. O(n) time, O(1) space.

**Variant:** palindrome after at most one deletion — two-pointer with skip-left or skip-right retry.

Why?

Common baseline string question with linked list / anagrams in Infosys coding rounds. Simpler than DP; tests careful edge cases (empty, single char, all symbols).

How?

\`\`\`kotlin
fun isPalindrome(s: String): Boolean {
    var l = 0; var r = s.lastIndex
    while (l < r) {
        while (l < r && !s[l].isLetterOrDigit()) l++
        while (l < r && !s[r].isLetterOrDigit()) r--
        if (s[l].lowercaseChar() != s[r].lowercaseChar()) return false
        l++; r--
    }
    return true
}
\`\`\``,
      hi: `What?

String palindrome hai ya nahi — alphanumeric ignore, case ignore. Do pointer left/right.

Why?

O(n) time O(1) space. Infosys easy-medium string question family mein.

How?

Skip non-alphanumeric, lowercase compare, andar move. Edge: empty string true.`
    },
    {
      q: "Prime factors of 500 (2, 2, 5, 5, 5)",
      en: `What?

500 = 2 × 2 × 5 × 5 × 5 = 2² × 5³. Prime factors: 2, 2, 5, 5, 5.

Why?

Trial division: divide n by 2, then odd divisors 3,5,7... while d×d ≤ n. O(√n) for factorization interview scale.

How?

\`\`\`
500 ÷ 2 = 250 ÷ 2 = 125 ÷ 5 = 25 ÷ 5 = 5 ÷ 5 = 1
\`\`\`

Say steps aloud in Infosys aptitude-style questions.`,
      hi: `What?

500 = 2² × 5³. Factors 2,2,5,5,5.

Why?

Trial division √n tak.

How?

Divide steps yaad karo.`
    }
    ]
  },
  {
    id: "architecture",
    label: "Senior Architecture",
    icon: "fa-solid fa-sitemap",
    items: [
    {
      q: "Architect large Flutter + Android org",
      en: `What?

Organize by feature modules (:feature:orders, :feature:catalog) plus shared :core:network, :core:database, :core:designsystem. Contract modules expose interfaces; implementation hidden — prevents feature-to-feature coupling.

Why?

Align patterns per platform: Flutter BLoC/go_router; Android MVVM/Navigation/Compose — shared domain rules documented, not necessarily shared code.

Governance: ADRs for decisions, lint/detekt/ktlint, module dependency lint (Gradle dependencyAnalysis), CODEOWNERS per feature.

CI/CD per module affected builds; feature flags LaunchDarkly/Firebase Remote Config decouple release from deploy.

How?

Interview: scale teams 10–30 engineers; weekly release train; monorepo vs multi-repo trade-offs candid.`,
      hi: `What?

Feature modules alag team ownership. Core shared network/DB/design tokens.

Why?

Flutter aur Android alag UI par same domain rules document. Duplicate business logic kam.

ADR se decision record. Baad mein kyun yeh pattern pata rahe.

Feature flag se half rollout. Razorpay UPI naya method test.

How?

Dependency rules enforce. Feature A ko feature B direct mat dikhe.`
    },
    {
      q: "Single source of truth practically",
      en: `What?

One authoritative store per data type — Room for cart entities, not duplicate ArrayList in ViewModel and Fragment. UI observes Repository Flow; writes go through Repository API only.

Why?

ViewModel caches presentation transforms (sorted/filtered) derived from SSOT, not second mutable copy of truth.

Sync: network response writes DB; UI automatically updates — no manual notify both places.

Conflict: define server-wins for price, client-wins for draft qty until checkout — document in domain layer.

How?

Anti-pattern: EventBus broadcasting cart changes while also holding local list — desync bugs.`,
      hi: `What?

Cart data ek jagah Room. ViewModel sirf observe aur command. Do jagah list mat rakho.

Why?

Network se aaya to DB update. Flow se UI auto refresh.

Derived UI state sort/filter alag ho sakta hai par source ek.

Conflict policy likhi honi chahiye. Interview mein explicitly bolo.

How?

EventBus aur local list duplicate SSOT bug factory hai.`
    },
    {
      q: "API versioning and backward compatibility",
      en: `What?

URL path /v1/ /v2/ or header Accept-Version; never break existing fields without deprecation window. Additive changes safe — new nullable JSON fields; clients ignoreUnknownKeys.

Why?

Mobile: ship app supporting N and N-1 schema; feature flag new parser path. Force update only when security/legal or unrecoverable break — bad UX.

Contract testing Pact between mobile and backend teams catches breaks pre-release.

Room migrations parallel — don't assume instant user updates. eNagarpalika long tail old versions.

How?

Interview: nullable new field default behavior; sunset timeline communicated.`,
      hi: `What?

Naye field nullable add karo. Purana app crash nahi. Breaking change se bacho.

Why?

/v2 alag endpoint jab zaroori break ho. Migration period dono support.

Force update sirf critical. Warna Play rating hurt.

Moshi ignoreUnknownKeys true JSON forward compatible.

How?

Backend aur mobile sync release calendar important badi org mein.`
    },
    {
      q: "Idempotency in payments and orders",
      en: `What?

Client generates Idempotency-Key (UUID) per placeOrder tap; server stores key→result — retries return same order not duplicate charge.

Why?

Razorpay: server order id unique; payment verify once; webhook idempotent handler checks processed payment_id.

UI: disable pay button while in-flight; still handle rotation with pending state in Room.

Network retry safe only with idempotency — exponential backoff without key dangerous.

How?

Audit logs for fintech compliance — duplicate prevention demonstrable to auditors.`,
      hi: `What?

Place order button par unique client request id. Server duplicate request same response de.

Why?

Double tap se do charge nahi. Idempotency key mandatory payment mein.

Webhook bhi idempotent. Same payment_id do baar process mat.

UI loading disable aur pending state DB mein save.

How?

Retry safe tabhi jab server idempotent ho. Warna duplicate order.`
    },
    {
      q: "Paging 3 vs manual pagination",
      en: `What?

Paging 3: PagingSource load pages; PagingData flows to UI; built-in retry, jump, combined with RemoteMediator for Room+network cache. LoadState Header/Footer in RecyclerView or Compose LazyPagingItems.

Why?

Manual: page++ API, append list, fragile duplicate pages, error/retry reinvented, memory grows unbounded if forget trim.

RemoteMediator pattern: refresh network → DB → Paging reads DB — offline-first catalog Zila scale.

Testing: FakePagingSource inject. Parameters filter changes invalidate PagingSource.

How?

When manual OK: tiny static lists admin-only screens — pragmatism.`,
      hi: `What?

Paging 3 library load/ retry/ append handle. RecyclerView PagingDataAdapter.

Why?

RemoteMediator network se Room fill kare. Offline catalog strong pattern.

Manual page aur aur error prone. Duplicate item, retry missing common bug.

LoadState shimmer/error footer built-in.

How?

Badi product list par Paging 3 almost default choice ab.`
    },
    {
      q: "Multi-module dependency rules",
      en: `What?

Dependency direction: feature → domain ← data; features must not depend on each other directly — share via domain contracts or events.

Why?

Gradle api vs implementation: expose types only when needed — leaks transitive deps. Enforce with module graph assert tests.

:core:testing fakes for cross-feature test doubles. Avoid circular modules — extract :core:common if needed.

Dynamic feature modules optional Play delivery — base module stable API surface.

How?

Interview red flag you fix: :feature:cart depends :feature:checkout internals — refactor to shared :core:order-api interface.`,
      hi: `What?

Feature modules ek doosre par directly depend na karein. Core domain interface se baat.

Why?

Api vs implementation. Sirf zaroori type bahar expose.

Cycle dependency Gradle fail. Common module nikalo.

PR review dependency direction check senior responsibility.

How?

Wrong direction fix karna architecture interview strong signal hai.`
    },
    {
      q: "Testability at scale",
      en: `What?

Constructor injection interfaces everywhere — swap FakePaymentGateway, InMemoryDao. ViewModel pure Kotlin logic test runTest; Turbine Flow; no Robolectric unless Android API needed.

Why?

Test pyramid: 70% unit, 20% integration Room/RoomMigrationTest, 10% UI smoke Espresso critical paths checkout login.

CI: every PR unit + lint; nightly full suite + release build minify. Flaky test quarantine policy zero tolerance long term.

Contract tests API JSON fixtures checked in repo. Snapshot testing Compose paparazzi optional.

How?

Coverage metric guide not goal — assert behavior not lines.`,
      hi: `What?

Interface aur fake. Payment, repo, FCM service test double.

Why?

RunTest ViewModel. Loading/success/error states Turbine se verify.

CI PR par fast unit. Bada suite nightly.

Flaky test fix ya quarantine. Green build trust important.

How?

100% coverage chase mat. Critical checkout path test karo.`
    },
    {
      q: "Observability crashes ANR performance",
      en: `What?

Crashlytics for fatals/non-fatals with custom keys userId hash, build flavor, screen. Performance Monitoring traces checkout API latency. Firebase Analytics funnels drop-off steps.

Why?

ANR rate Play Vitals dashboard — prioritize main thread stacks. Log structured breadcrumbs not PII passwords tokens.

Staged rollout 5%→20%→100% watch crash-free users metric. Rollback plan previous version code ready.

OpenTelemetry emerging mobile — correlate client trace id with backend logs for payment failures.

How?

On-call runbook: Razorpay spike failures — check server verify endpoint 5xx not client only.`,
      hi: `What?

Crashlytics release crash track. Custom keys flavor, screen, userId hash.

Why?

ANR vitals main thread stack. Fix priority.

Staged rollout se pehle 5% par crash dekho.

Log mein PII mat. GDPR/compliance issue.

How?

Payment fail par client aur server dono trace id se debug senior workflow.`
    },
    {
      q: "Security architecture fintech/gov",
      en: `What?

Defense in depth: TLS + pinning optional, certificate rotation plan, EncryptedSharedPreferences/Keystore, biometric gate sensitive actions, server session short TTL refresh rotation.

Why?

OWASP MASVS L1/L2 checklist; root detection informative not sole control. Obfuscation R8; tamper detection Play Integrity API attestation high-value flows.

eNagarpalika/gov: data minimization, audit logs, offline encrypted cache expiry, screenshot block FLAG_SECURE on sensitive screens.

Secrets never client-only; Razorpay secret server; API keys restricted. Pen test before major release.

How?

Incident response: remote kill switch feature flag disable payments.`,
      hi: `What?

Fintech/gov mein security layer. Encrypt storage, HTTPS, session timeout, audit log.

Why?

Token Keystore mein. Plain prefs nahi. Sensitive screen FLAG_SECURE optional.

Root detect sirf hint. Server validation main.

Play Integrity high value transaction attestation.

How?

Pen test aur MASVS checklist interview mein naam lo. Serious org signal.`
    },
    {
      q: "Offline-first vs network-first decision",
      en: `What?

Offline-first when users have intermittent connectivity — field sales SK Agent, municipal data collection, catalog browse in rural 4G gaps. Show cached immediately; background sync; conflict rules explicit.

Why?

Network-first when data must be fresh — live auction prices, stock tick, payment status during checkout verify polling.

Hybrid common: cache display with stale badge; pull-to-refresh force network; TTL 5 min products ok, payment never stale guess.

Measure: offline session success rate guides investment. Don't offline-first everything — engineering cost migrations conflicts.

How?

Interview frame as product requirement not ideology.`,
      hi: `What?

Offline-first jab network unreliable. Field app, rural users. Pehle cache dikhao sync baad mein.

Why?

Network-first jab real-time zaroori. Live price, payment confirm server se.

Hybrid stale indicator achha UX. User ko pata data purana ho sakta hai.

Har feature offline-first mat. Cost zyada conflict sync mushkil.

How?

Product requirement se decide karo. SK Agent offline example.`
    },
    {
      q: "One-time UI events problem",
      en: `What?

StateFlow replays last value to new collectors — rotation re-triggers navigation/toast if event stored in same state. Separate channel for events: SharedFlow replay=0, Channel, or UDF UiEffect consumed once.

Why?

Patterns: queue events in ViewModel consumed by UI; SnackbarHostState in Compose; LiveData SingleLiveEvent hack legacy.

Test: rotate after emit — assert no double navigation. Process death may still replay if not designed — idempotent navigation safe args helps.

Document team standard — mixed patterns across modules confuse juniors.

How?

Senior signal: explain why StateFlow alone wrong for NavigateToOrderDetail.`,
      hi: `What?

Navigation/snackbar one-time event. StateFlow mein mat rakho warna rotate par dubara fire.

Why?

SharedFlow replay=0 ya Channel. Consume ek baar.

SingleLiveEvent purana LiveData hack. Flow era mein SharedFlow better.

Test rotation ke baad ek hi navigate hua verify karo.

How?

Team mein ek standard pattern decide karo. Mixed se bug aate hain.`
    },
    {
      q: "Java to Kotlin migration at scale",
      en: `What?

Strategy: new code Kotlin only; convert modules when touching heavily; no big-bang rewrite. Enable Kotlin module by module; interop @JvmStatic, @JvmOverloads, nullability annotations on Java remaining.

Why?

Tests before convert — characterization tests lock behavior. Android KTX extensions adopt gradually.

Measure crash rate NPE reduction post-migration. Detekt ktlint enforce idioms not Java-style in Kotlin files.

Room/Retrofit codegen Kotlin first. Remove findViewById Java Activities last via ViewBinding/Compose strangler.

How?

ShopKirana narrative: phased migration reduced production NPE cluster over quarters not weeks.`,
      hi: `What?

Naya code Kotlin. Purana Java jab touch karo tab convert. Big bang risky.

Why?

Java baaki ho to @Nullable @NonNull annotate. Interop smooth.

Convert se pehle test likho behavior same rahe.

NPE crash metric track karo migration ke baad.

How?

Module by module Gradle Kotlin plugin. Team parallel kaam kar sake.`
    },
    {
      q: "Compose vs Views coexistence",
      en: `What?

Strangler fig: new screens Compose in same NavHost via composable destination; legacy Fragment remains until replaced. ComposeView in Fragment hosts Compose; AndroidView in Compose wraps MapView, Razorpay, Ad SDK.

Why?

Shared design system: theme colors typography as Compose MaterialTheme + View theme attrs synced from token module.

Navigation unified NavGraph composable + fragment destinations interop. ViewModel shared both sides.

Performance test scroll hybrid screens; recomposition boundaries for AndroidView expensive.

How?

Team plan: 20% screens quarter until 80% — realistic stakeholder communication.`,
      hi: `What?

Ek saath chal sakte hain. Naya screen Compose, purana XML Fragment. ComposeView Fragment mein embed.

Why?

Third-party SDK AndroidView se wrap. Razorpay, Maps.

Design tokens ek module se View aur Compose dono theme sync.

Big bang rewrite mat. Screen by screen replace.

How?

Shared ViewModel dono UI ke liye. Business logic ek jagah.`
    },
    {
      q: "CI/CD pipeline for mobile",
      en: `What?

PR: lint (detekt, android lint), unit tests, assemble debug. Main: instrumentation shard optional, release AAB build minifyEnabled, sign with keystore from CI secrets encrypted.

Why?

Play internal → closed → production tracks; Fastlane/Gradle Play Publisher automate upload. VersionCode monotonic; semantic versionName user-facing.

Artifacts: mapping.txt to Crashlytics, SBOM optional security. Cache Gradle deps speed.

Gates: block merge on test fail; manual QA checklist payment sandbox before prod promote.

How?

Secrets: never in repo; GitHub Actions encrypted secrets; Play App Signing Google holds upload key.`,
      hi: `What?

Har PR lint aur unit test. Fail par merge band. Release branch AAB signed build.

Why?

Fastlane Play upload automate. Manual error kam.

Mapping.txt Crashlytics ko attach release ke saad.

Secrets CI encrypted. Repo mein keystore mat.

How?

Internal track pehle QA phir production staged rollout.`
    },
    {
      q: "System design: feed or municipal app",
      en: `What?

Clarify 2 min: users (citizens/field officers), features (complaints, status, documents), offline need, locales, accessibility, scale (DAU, peak).

Why?

Architecture: UI Compose/Views → ViewModel → Repository → {Retrofit, Room, DataStore}. Paging feed; WorkManager sync; FCM status updates; document upload resumable OkHttp multipart.

Non-functional: encrypted storage PII, session timeout, low-end device list perf DiffUtil/Paging, Hindi+English i18n, TalkBack labels gov compliance.

Failure: upload retry queue; conflict ticket id server authoritative; graceful degradation read-only offline.

How?

Metrics: crash-free, ANR, complaint submit success rate, p95 API latency — close with trade-offs chosen.`,
      hi: `What?

Pehle requirements. Kaun user, kya feature, offline kitna, scale kitna. 2 minute clarify interview start.

Why?

Layers bolo UI→VM→Repo→API+Room. Municipal app mein document upload + status tracking.

ENagarpalika jaisa. Data sensitive encrypt, locale Hindi, accessibility.

Failure mode: upload fail retry queue. Offline read-only mode.

How?

End mein trade-off. Kya choose kiya kyun aur metrics kaise dekhenge.`
    },
    {
      q: "System design: Instagram-style image feed with caching",
      en: `What?

Clarify (2 min): infinite scroll feed, images + captions, like/comment counts, pull-to-refresh, offline browse last feed, upload story optional.

**Clean Architecture layers:**
- **UI:** Compose + ViewModel — \`FeedUiState\` (Paging items, load state, errors).
- **Domain:** \`GetFeedPageUseCase\`, \`ToggleLikeUseCase\` — business rules only.
- **Data:** \`FeedRepository\` — SSOT; Retrofit API + Room cache + image disk cache.

Why?

**Image caching (core Infosys ask):**
- **Memory:** Coil/Glide LRU bitmap cache sized to device RAM fraction.
- **Disk:** OkHttp cache or dedicated disk cache for full images; thumbnails separate smaller cache.
- **Network:** CDN URLs with width query params; progressive JPEG/WebP; placeholder + crossfade in Compose \`AsyncImage\`.

**Feed data:** Paging 3 + RemoteMediator — network page → Room → UI reads DB Flow (offline-first scroll). Keys = \`postId\` in LazyColumn.

**Invalidation:** pull-to-refresh clears remote keys; like optimistic UI + API reconcile; TTL stale badge if > N minutes.

Failure: CDN 404 fallback avatar; OOM downsample with size constraints; duplicate page prevention in PagingSource.

How?

Whiteboard close: “User sees cached feed instantly; background sync updates Room; images three-tier memory/disk/network; metrics: scroll FPS, cache hit rate, p95 feed API, OOM rate.”`,
      hi: `What?

Instagram jaisa feed: infinite scroll, images, like, refresh, offline last feed dikhao.

Why?

UI Compose + ViewModel. Domain use cases. Data Repo + Retrofit + Room + image cache.

Image cache: memory LRU (Coil), disk full image, CDN resized URL. Paging 3 + RemoteMediator — pehle Room se UI, network background.

LazyColumn key = postId. Pull refresh RemoteMediator invalidate.

How?

2-3 min layers bolo + image cache teen level + Paging offline-first. Metrics: cache hit, p95 API, jank.`
    },
    {
      q: "System design: offline-first notes app",
      en: `What?

Clarify requirements (2 min): create/edit/delete notes, search, optional sync across devices, offline read/write, conflict when same note edited on two devices.

**Layers (Clean Architecture):**
- **UI:** Compose or RecyclerView list + editor; ViewModel \`NotesUiState\` (list, selected note, sync status).
- **Domain:** \`SaveNoteUseCase\`, \`SearchNotesUseCase\`, \`SyncNotesUseCase\`.
- **Data:** \`NotesRepository\` SSOT — Room primary; Retrofit sync API optional.

Why?

**Offline-first flow:**
1. UI always reads \`Flow<List<NoteEntity>>\` from Room — instant list after app open.
2. User saves note → DAO insert/update on IO → Flow emits → UI updates.
3. Background: WorkManager \`SyncWorker\` pushes pending \`syncStatus=PENDING\` rows when network available; pulls server changes; merge policy **last-write-wins by \`updatedAt\`** or server wins for enterprise.

**Schema:** \`notes(id, title, body, updated_at, sync_status, deleted)\`. Full-text search: Room FTS or \`LIKE\` for small scale.

**Why Room over raw SQLite:** migrations, Flow, compile-time SQL. **DataStore** for user prefs (theme, last account), not note bodies.

How?

Close interview answer: “Local Room is truth for UI; sync is best-effort via WorkManager; conflicts resolved by timestamp; metrics: offline save success, sync latency, conflict rate.”`,
      hi: `What?

Offline-first notes app: list + edit, search, sync optional. Pehle requirements clear karo.

Why?

UI → ViewModel → UseCase → Repository → Room + API. Save pehle Room, UI Flow se update. WorkManager background sync.

Conflict: updatedAt last-write-wins ya server wins bolo explicitly.

DataStore sirf settings. Note body Room mein.

How?

2-3 min whiteboard layers + offline flow + conflict rule. Infosys feature design common pattern.`
    },
    {
      q: "Dependency Injection under the hood (Dagger vs Hilt vs Koin)",
      en: `What?

Dependency Injection (DI) manages how objects get their dependencies. The three main libraries in Android have completely different architectures under the hood.

Why?

1. Dagger 2: Compile-time DI. It uses Annotation Processing (KAPT/KSP) to analyze the dependency graph and generate pure Java code (factories, members injectors). It is extremely fast at runtime with zero overhead, but increases build times significantly. Errors are caught at compile-time.
2. Hilt: Built on top of Dagger 2 specifically for Android. It automates the boilerplate of Dagger components and scopes (e.g., @AndroidEntryPoint, @HiltViewModel) by generating them behind the scenes. Under the hood, it is still compile-time Dagger.
3. Koin: A lightweight Service Locator, not true DI. It resolves dependencies at runtime by looking them up in a registry map. It has zero annotation processing, meaning faster build times, but introduces runtime overhead and can crash at runtime if a dependency is missing (though \`checkModules()\` tests help).

How?

Interview Verdict: Use Hilt/Dagger for large-scale production apps where runtime performance and compile-time safety are critical. Use Koin for smaller apps, multiplatform (KMP) projects, or when build speed is the top priority.`,
      hi: `What?

Dependency Injection (DI) yeh manage karta hai ki objects ko unke dependencies kaise milte hain. Android ke teen main DI libraries ke architectures completely alag hain.

Why?

1. Dagger 2: Compile-time DI hai. Yeh Annotation Processing (KAPT/KSP) ka use karke dependency graph ko analyze karta hai aur pure Java code (factories, injectors) generate karta hai. Iska runtime performance sabse fast hai, lekin build time badh jata hai. Saare errors compile-time par hi pakad mein aa jate hain.
2. Hilt: Dagger 2 ke upar bana hai, jo Android ke liye boilerplate code ko khatam karta hai. Yeh components aur scopes (jaise @AndroidEntryPoint, @HiltViewModel) ko internally auto-generate karta hai. Under the hood, yeh abhi bhi compile-time Dagger hi hai.
3. Koin: Ek lightweight Service Locator hai, true DI nahi hai. Yeh runtime par dependencies ko ek registry map se look up karta hai. Isme koi annotation processing nahi hoti, isliye build speed bahut fast hoti hai, lekin runtime overhead badhta hai aur missing dependency par app crash ho sakti hai.

How?

Interview Verdict: Bade production apps ke liye Hilt/Dagger best hai jahan runtime performance aur compile-time safety zaroori hai. Chhote apps ya Kotlin Multiplatform (KMP) ke liye Koin ek accha option hai.`
    },
    {
      q: "Modularization Strategies & Build Optimization",
      en: `What?

Modularization is the practice of breaking a monolithic app module into smaller, independent Gradle modules.

Why?

Strategies:
1. Layer-based: Splitting by layers (e.g., :core:network, :core:database, :core:model). Leads to circular dependencies if features grow.
2. Feature-based: Splitting by features (e.g., :feature:cart, :feature:profile). Features are completely isolated.
3. API/Impl Separation: The gold standard for large apps. Create a lightweight \`:feature:cart-api\` containing only interfaces and models, and a \`:feature:cart-impl\` containing the actual implementation. Other features depend only on the \`-api\` module, preventing transitive dependency leaks and circular dependencies.

How?

Build Optimization techniques:
1. Configuration Caching: Reuses the configuration phase results across builds.
2. Build Cache & Remote Cache: Caches task outputs (like compilation) locally or on a shared server (e.g., Develocity) so developers don't recompile unchanged modules.
3. Non-transitive R classes: Prevents R class regeneration across the entire module graph, saving massive build time.
4. JVM/Kotlin Daemon Heap: Increase the daemon heap size in \`gradle.properties\` (e.g., \`org.gradle.jvmargs=-Xmx4g\`).`,
      hi: `What?

Modularization ek monolithic app module ko chhote, independent Gradle modules mein break karne ki practice hai.

Why?

Strategies:
1. Layer-based: Layers ke hisaab se split karna (jaise :core:network, :core:database). Badi apps mein isse circular dependencies ho sakti hain.
2. Feature-based: Features ke hisaab se split karna (jaise :feature:cart, :feature:profile). Isme features isolated rehte hain.
3. API/Impl Separation: Badi apps ke liye sabse best pattern hai. Ek lightweight \`:feature:cart-api\` banao jisme sirf interfaces aur models hon, aur \`:feature:cart-impl\` mein actual implementation rakho. Doosre features sirf \`-api\` module par depend karenge, jisse circular dependencies aur transitive dependency leaks rukte hain.

How?

Build Optimization techniques:
1. Configuration Caching: Gradle ke configuration phase ke results ko reuse karta hai.
2. Build Cache & Remote Cache: Task outputs (jaise compilation) ko local ya remote server (jaise Develocity) par cache karta hai takki unchanged modules recompile na hon.
3. Non-transitive R classes: R class ke regeneration ko pure module graph mein rokta hai, jisse build time bahut bachta hai.
4. JVM Daemon Heap: \`gradle.properties\` mein daemon heap size badhao (jaise \`org.gradle.jvmargs=-Xmx4g\`).`
    },
    {
      q: "Clean Architecture vs MVVM vs MVI (State management and Unidirectional Data Flow)",
      en: `What?

Clean Architecture, MVVM, and MVI are architectural patterns used to structure mobile applications for scale, testability, and separation of concerns.
- Clean Architecture: Divides the app into independent layers (Presentation, Domain, Data) with strict dependency rules pointing inward.
- MVVM (Model-View-ViewModel): Connects the UI to business logic using observables (like StateFlow), separating the View from the Model.
- MVI (Model-View-Intent): Enforces a strict Unidirectional Data Flow (UDF) where user actions (Intents) are processed into a single, immutable state (Model) that is rendered by the View.

Why?

In large teams, having a clear and consistent architecture prevents spaghetti code, reduces merge conflicts, and enables parallel development. While MVVM is simple and great for most apps, it can suffer from state fragmentation (multiple independent StateFlows in a single ViewModel). MVI solves this by consolidating all UI state into a single, immutable state object, making state changes completely predictable and easy to debug.

How?

Compare the state management flow:
- MVVM: ViewModel exposes multiple state streams (e.g., \`val products = MutableStateFlow()\`, \`val isLoading = MutableStateFlow()\`).
- MVI: ViewModel exposes a single, immutable state object and processes user actions via a reducer:

\`\`\`kotlin
data class UiState(
    val isLoading: Boolean = false,
    val products: List<Product> = emptyList(),
    val error: String? = null
)

sealed interface UiIntent {
    object LoadProducts : UiIntent
    class SearchProducts(val query: String) : UiIntent
}

class ProductViewModel : ViewModel() {
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state

    fun processIntent(intent: UiIntent) {
        when (intent) {
            is UiIntent.LoadProducts -> fetchProducts()
            is UiIntent.SearchProducts -> filterProducts(intent.query)
        }
    }
}
\`\`\``,
      hi: `What?

Clean Architecture, MVVM, aur MVI mobile applications ko scale, testability, aur clean code ke liye structure karne ke patterns hain.
- Clean Architecture: App ko independent layers (Presentation, Domain, Data) mein divide karta hai jahan dependencies hamesha andar ki taraf point karti hain.
- MVVM: UI ko business logic se observables (jaise StateFlow) ke zariye joda jata hai.
- MVI: Ek strict Unidirectional Data Flow (UDF) enforce karta hai jahan user actions (Intents) ko process karke ek single, immutable state (Model) banti hai jo View par render hoti hai.

Why?

Badi teams mein ek consistent architecture hone se merge conflicts kam hote hain aur parallel development easy ho jata hai. MVVM simple hai par isme state fragmentation ho sakta hai (ek hi ViewModel mein multiple state streams). MVI is problem ko solve karta hai saari UI state ko ek single immutable object mein consolidate karke, jisse state transitions completely predictable ho jate hain.

How?

State management flow compare karein:

- MVVM: ViewModel multiple state streams expose karta hai (jaise \`products\` aur \`isLoading\` alag-alag).
- MVI: ViewModel ek single state object aur user actions (Intents) process karne ke liye reducer use karta hai:

\`\`\`kotlin
data class UiState( val isLoading: Boolean = false, val products: List<Product> = emptyList(), val error: String? = null
).

Sealed interface UiIntent { object LoadProducts : UiIntent class SearchProducts(val query: String) : UiIntent
}.

class ProductViewModel : ViewModel() {
    private val _state = MutableStateFlow(UiState())
    val state: StateFlow<UiState> = _state

fun processIntent(intent: UiIntent) {
        when (intent) {
            is UiIntent.LoadProducts -> fetchProducts()
            is UiIntent.SearchProducts -> filterProducts(intent.query)
        }
    }
}
\`\`\``
    },
    {
      q: "App Startup Optimization (Baseline Profiles, Startup Library, Lazy Initialization)",
      en: `What?

App Startup Optimization is the practice of reducing the time it takes for an app to become interactive from the moment the user taps the launcher icon (Cold Start). Key tools and techniques include:
1. Baseline Profiles: A list of classes and methods used during startup that Google Play uses to pre-compile your app into machine code (AOT) ahead of time.
2. Jetpack App Startup: A library that provides a straightforward, performant way to initialize components (like WorkManager, Firebase, or SDKs) using a single shared ContentProvider.
3. Lazy Initialization: Deferring the creation of expensive objects until they are actually needed.

Why?

Slow app startup directly hurts user retention and Play Store rankings. If an app takes more than 3-4 seconds to start, users will abandon it. By default, many third-party SDKs initialize themselves using separate, hidden ContentProviders, which blocks the Main Thread during startup. Jetpack App Startup and Baseline Profiles can reduce cold start times by up to 30-40%.

How?

- Baseline Profiles: Generate profiles using the Macrobenchmark library and ship them with your AAB. Google Play handles the pre-compilation on user devices.
- Jetpack App Startup: Define initializers and merge them into a single initializer entry in \`AndroidManifest.xml\`:

\`\`\`kotlin
class TimberInitializer : Initializer<Unit> {
    override fun create(context: Context) {
        Timber.plant(Timber.DebugTree())
    } 
    override fun dependencies(): List<Class<out Initializer<*>>> = emptyList()
}
\`\`\`

- Lazy Initialization: Use Kotlin's \`by lazy\` for heavy singletons (like Retrofit or Gson) so they don't block the Application class initialization during startup.`,
      hi: `What?

App Startup Optimization app ke Cold Start time (launcher icon tap karne se lekar app ke interactive hone tak ka samay) ko kam karne ki practice hai. Iske main tools aur techniques hain:
1. Baseline Profiles: Startup ke dauran use hone wale classes/methods ki list jo Google Play ko app ko pehle se machine code (AOT) mein pre-compile karne mein help karti hai.
2. Jetpack App Startup: Ek library jo multiple components (jaise Firebase, WorkManager) ko ek single shared ContentProvider ke zariye performant tarike se initialize karti hai.
3. Lazy Initialization: Heavy objects ke creation ko tab tak post-pone karna jab tak unki actual zaroorat na ho.
4. Cold Start vs Warm Start: Cold start mein fresh process banta hai, warm start mein existing process reuse hota hai.

Why?

Slow startup se user retention aur Play Store ratings kharab hoti hain. Agar app start hone mein 3-4 seconds se zyada legi, to users use uninstall kar denge. Kai third-party libraries apna alag ContentProvider use karti hain jo main thread ko block karta hai. Jetpack App Startup aur Baseline Profiles cold start time ko 30-40% tak kam kar sakte hain.

How?

- Baseline Profiles: Macrobenchmark library se profile generate karke AAB ke sath ship karein. Google Play user ke device par pre-compilation handle karega.
- Jetpack App Startup: Initializers define karke unhe \`AndroidManifest.xml\` mein register karein: hota hai.

\`\`\`kotlin
class TimberInitializer : Initializer<Unit> { override fun create(context: Context) { Timber.plant(Timber.DebugTree()) } override fun dependencies(): List<Class<out Initializer<*>>> = emptyList()
}
\`\`\`.

- Lazy Initialization: Application class mein heavy singletons (jaise Retrofit) ke liye \`by lazy\` use karein taaki startup block na ho.`
    },
    {
      q: "Architecture vs design pattern vs principle",
      en: `What?

Architecture: high-level structure of the system (layers, modules, client-server). Design pattern: reusable solution to a recurring problem (Repository, Factory, Observer). Principle: guideline (SOLID, DRY, separation of concerns).

Why?

Interviewers mix terms — answer precisely: Clean Architecture is structural; MVVM is presentation pattern; SOLID principles guide class design.

How?

One sentence each with Android example: Clean Architecture layers; MVVM ViewModel observes Repository; Single Responsibility for UseCase classes.`,
      hi: `What?

Architecture = structure. Pattern = MVVM/Repo. Principle = SOLID.

Why?

Teen alag define karo clearly.

How?

Ek sentence example har ek.`
    }
    ]
  },
  {
    id: "behavioral",
    label: "Behavioral & HR",
    icon: "fa-solid fa-user-tie",
    items: [
    {
      q: "Tell me about yourself",
      en: `What?

A 60–90 second professional intro in this order: (1) who you are + years of experience, (2) core stack and domain, (3) 1–2 impact highlights, (4) what role you want now.

Example structure:
"I'm Mukesh Kumar Patel, a Mobile Application Developer with 4.5 years of experience building production Android and Flutter applications. I started at HackerKernel in Bhopal as a Junior Android Developer, where I built client-facing apps in Java and Kotlin, integrated REST APIs with Retrofit, and worked on a live GPS tracking app using Google Maps. My biggest growth phase was at Direct (ShopKirana) in Indore for 2.5 years. I worked on their B2B sales platform — the SK Agent app used by field agents across India. I led the Java-to-Kotlin migration, implemented MVVM with Dagger Hilt, built real-time chat with Socket.IO, integrated Razorpay, and an offline cart using Room so agents could work without internet. Toward the end I also worked on Flutter. Currently I'm at Netlink Software, focused on Flutter — building cross-platform apps with BLoC, integrating Razorpay and PhonePe, and handling Play Store and App Store releases. A project I'm proud of is MP eNagarpalika, a government app for Madhya Pradesh citizens — property tax, water tax, and municipal services — built with Clean Architecture and BLoC. Across my apps, we've crossed 50,000+ downloads with 4.0+ Play Store ratings. I'm strongest in Flutter BLoC, Android MVVM with Hilt, and payment integrations, and I'm actively improving my testing and CI/CD skills. I'm now looking for a role where I can deliver scalable mobile applications in a structured engineering environment."

Why?

Interviewers use this to assess communication, relevance, and confidence — not your life story. They want a trailer, not a biography. Avoid personal details unrelated to the job.

How?

Practice aloud until natural (not memorized word-for-word). Smile, steady pace, pause after impact line. End by connecting to the company/role. Do not read resume line-by-line.`,
      hi: `What?

60–90 second intro (apna script — Roman Hindi):

"Namaste, main Mukesh hoon — mobile application developer, lagbhag 4.5 saal ka experience production Flutter aur Android apps banane mein.

Career HackerKernel Bhopal se shuru hui, jahan maine Java aur Kotlin mein client-facing Android apps banaye — Retrofit se RESTful API integration, clean code standards, aur Google Maps SDK par live GPS tracking app.

Phir Direct ShopKirana Indore — 2.5 saal, mera sabse bada growth phase. B2B sales platform aur SK Agent app jo poore India ke sales agents use karte hain. Maine Java se Kotlin migration lead kiya, MVVM + Dagger Hilt se boilerplate 40% kam kiya, Socket.IO se real-time chat, Razorpay (UPI, card, net banking), aur Room se offline cart taaki agents bina internet ke kaam kar saken. End mein Flutter par bhi kaam kiya.

Abhi Netlink Software par poori tarah Flutter — BLoC architecture, Razorpay aur PhonePe integration, Play Store aur App Store end-to-end deployment.

Job ke alawa sabse proud project MP eNagarpalika — government Flutter app MP ke nagrikon ke liye property tax, water tax, municipal services — Clean Architecture + BLoC, government compliance aur performance standards.

Meri apps ka 50,000+ cumulative downloads hai aur 4.0+ rating maintain ki hai. Strong: Flutter BLoC, Android MVVM + Hilt, payment integrations — aur testing aur CI/CD skills actively build kar raha hoon."

Why?

Yeh trailer hai, poori kahani nahi. Interviewer communication, numbers (4.5 saal, 40%, 50K+, 4.0+) aur real companies sunna chahta hai.

How?

Mirror ke saamne 5 baar practice — ratna nahi, flow yaad rakho. ShopKirana impact lines par thoda slow bolo. Last line interview company se connect karo (jaise Infosys).`
    },
    {
      q: "Explain your current / recent project",
      en: `What?

Use **STAR** in 2–3 minutes:
- **Situation**: product, users, platform (Android / Flutter / both)
- **Task**: your ownership (feature module, integration, performance)
- **Action**: architecture (MVVM), stack (Retrofit, Room, Coroutines, Hilt, Firebase/FCM), specific work (payments, offline sync, lists)
- **Result**: measurable outcome (crash reduction, faster release, conversion, ANR fix)

Template:
"We built a [e-commerce / field / municipal] mobile app for [users]. I owned [catalog/checkout/sync]. Architecture was single-activity + MVVM + Repository. Data: Retrofit APIs, Room cache, WorkManager background sync. UI: RecyclerView with DiffUtil / Compose for new screens. Payments via server-created order + client SDK + server verify. Challenges: flaky network — we moved to offline-first Room Flow; payment edge cases — idempotent order API. Outcome: stable releases, fewer NPE/crashes after Kotlin + structured coroutines."

Why?

They test whether you did real work vs buzzwords. Depth on **your** decisions beats generic definitions.

How?

Bring one architecture sketch on paper. Mention trade-offs you chose. If team project, say "we" for team parts and "I" for your pieces honestly.`,
      hi: `What?

STAR format 2–3 minute:
Situation — kaunsa app, kiske liye
Task — tumhara ownership
Action — MVVM, Retrofit, Room, Coroutines, payment/sync
Result — number ya clear outcome (crash kam, release fast)

Why?

Interviewer sachcha experience sunna chahta hai. Sirf definition nahi.

How?

Ek project deep prepare karo. Paper par UI→ViewModel→Repo diagram bana lo. Team ka kaam "we", apna "I" clearly.`
    },
    {
      q: "Prepare your top 2-3 projects (2-3 minutes each)",
      en: `What?

Pick **2–3 projects** from resume (e.g. e-commerce, field app, portfolio). For **each**, prepare a **2–3 minute** spoken pitch using STAR — same structure as one project, but **shorter per project** if they ask “tell me about another project.”

Per project script:
1. **10 sec** — what app, who uses it, platform (Kotlin / Flutter)
2. **30 sec** — your role and ownership (module, feature, integration)
3. **60 sec** — technical stack + one hard problem + solution (offline, payment, performance, architecture)
4. **20 sec** — measurable or clear outcome (crash down, release speed, user metric)

Why?

Day 4 morning prep: panels often drill the best project first, then say “any other project?” Unprepared second project sounds weak.

How?

Write bullet cards on paper — not full essay. Practice each in 2:30 timer. Link at least one project to **MVVM + Room + Coroutines** for Infosys Android role.`,
      hi: `What?

Resume se 2–3 projects choose karo. Har ek ke liye 2–3 minute alag STAR pitch.

Chhota structure: app kya hai → tumhara role → tech + ek problem solve → result.

Why?

Pehla project ke baad "aur koi project?" common. Doosra weak mat padho.

How?

Timer 2:30 practice har project. Ek project MVVM Room Coroutines se link karo Android role ke liye.`
    },
    {
      q: "Why should Infosys hire you?",
      en: `What?

Answer in three pillars: **fit**, **proof**, **growth**.

1. **Fit**: Mobile (Android/Kotlin + Flutter) aligned to client delivery; comfortable with structured process, code quality, and learning org standards.
2. **Proof**: Brief evidence — shipped features, API + offline + payments, debugging production issues, interview prep discipline shows self-learning.
3. **Growth**: You will absorb Infosys training, follow best practices, contribute to team delivery, not job-hop mindset for short term.

Sample:
"You should hire me because I already build and ship mobile apps with modern Android architecture, not just tutorials. I bring Kotlin, Coroutines, MVVM, Room, and integration experience, and I can ramp on Flutter or client-specific stacks quickly. I am disciplined about quality — testing mindset, crash awareness, security basics for tokens and payments. I want to grow inside a large organization like Infosys, learn from seniors, and deliver consistently on client projects."

Why?

They assess attitude, stability, and client-readiness — not arrogance or only money focus.

How?

Research Infosys values (learning, client focus, scale). Avoid comparing negatively to other candidates. Do not lead with salary.`,
      hi: `What?

Teen points: Fit (mobile + process), Proof (real projects), Growth (seekhenge aur deliver karenge).

Infosys ke liye bolo: bade org mein client projects, learning culture, long-term growth.

Why?

Attitude aur client delivery readiness check. Sirf paisa mat bolo pehle.

How?

Infosys website se 2 values yaad karke answer mein jodo. Confident par humble tone.`
    },
    {
      q: "Why this role — mobile developer at Infosys?",
      en: `What?

Separate from “Why Infosys?” — this asks why **this job** and **mobile** specifically.

Structure:
1. **Passion/fit**: You enjoy shipping Android/Flutter apps end-to-end — UI, APIs, offline, real users.
2. **Skills match**: Kotlin, MVVM, Jetpack, Coroutines align with client mobile delivery Infosys does.
3. **Growth**: Training, diverse client domains (BFSI, retail, telecom), working with senior engineers at scale.
4. **Contribution**: You will own features responsibly — quality, timelines, communication — not only coding in isolation.

Sample:
"I am applying for this mobile developer role because building reliable apps is what I do best — Kotlin, architecture, and integrations like payments and sync. Infosys offers the kind of client exposure and engineering discipline I want long term. I am ready to learn your standards, deliver on sprints, and grow from feedback on real projects."

Why?

HR screens for role clarity — vague “I need a job” fails. Tie to **their** mobile practice.

How?

Read job description once; mirror 2 keywords (Android, Kotlin, client delivery). Keep under 60 seconds.`,
      hi: `What?

"Why this role?" = mobile developer kyun, Infosys mein yahi role kyun.

Passion mobile apps, skills match Kotlin/MVVM, Infosys par client projects aur training, deliver quality features.

Why?

Generic jawab weak. Role description se 2 words mirror karo.

How?

60 second se kam. English interview mein same structure practice karo.`
    },
    {
      q: "Why are you looking for a change?",
      en: `What?

Stay positive and forward-looking. Valid themes:
- Want larger platform / diverse projects (enterprise, banking, retail)
- Stronger engineering practices, mentorship, scale
- Career stability and brand growth
- Location / role alignment (mobile-focused)

Avoid: bad-mouthing current manager, salary-only story, "I was bored" without growth angle.

Sample:
"I have learned a lot in my current role. Now I want to work on larger-scale client deliveries, sharper processes, and continuous learning — which a company like Infosys offers. I am looking for a long-term mobile career path with varied domains and strong technical standards."

Why?

Red flags: conflict drama, frequent blame, only compensation. Green flags: maturity, clarity, alignment with employer.

How?

Keep answer under 45 seconds. If asked about notice period, be honest and professional.`,
      hi: `What?

Positive reason: growth, learning, scale, mobile focus, stable org.

Current company ko insult mat karo. Manager ko blame mat karo.

Why?

Negative answer red flag. Mature reason green flag.

How?

45 second answer practice. Notice period honest bolo agar puchein.`
    },
    {
      q: "Strengths and weaknesses",
      en: `What?

**Strengths** (pick 2–3 with proof):
- Problem-solving & debugging (ANR, crashes, payment flows)
- Ownership of feature end-to-end (UI + API + DB)
- Self-learning (Kotlin, Coroutines, new Jetpack)
- Collaboration & clear communication

**Weakness** (one real, with fix):
Choose something true but safe: e.g., "Earlier I sometimes jumped to code before clarifying requirements — now I confirm acceptance criteria and edge cases first" OR "I am improving system design breadth — I study architecture patterns and do mock designs."

Why?

"Perfectionist" cliché hurts credibility. They want self-awareness + improvement plan.

How?

Weakness must end with **what you are doing about it**. Never say weakness is "I work too hard" only.`,
      hi: `What?

Strength: debugging, end-to-end feature, self-learning — har ek ke saath chhota example.

Weakness: ek sachchi cheez + fix plan. Jaise pehle jaldi code shuru karta tha, ab requirements clear karta hoon.

Why?

Fake weakness interviewer pakad leta hai.

How?

Weakness ke last line: "Is par main consciously kaam kar raha hoon…"`
    },
    {
      q: "Describe a difficult bug or challenge (STAR)",
      en: `What?

Pick one real technical story:

**Situation**: Production issue — crash spike, payment stuck, list not updating, memory leak after rotation.
**Task**: You were asked to find root cause under time pressure.
**Action**: Repro steps, Crashlytics stack trace, StrictMode, LeakCanary, logging, hypothesis, fix (e.g., collect Flow with repeatOnLifecycle, cancel coroutines, fix duplicate LiveData observer, server verify for payment).
**Result**: Crash-free users up, ANR down, or payment success rate improved.

Example angle:
"Users reported checkout success UI but order missing — we traced client-only success without server verify. Fix: mandatory verify API, pending state in Room, idempotent order id. Retries no duplicate charges. Result: support tickets dropped."

Why?

STAR proves structured thinking and ownership under pressure — key for client projects.

How?

One story only; 90 seconds. Numbers help ("crashes fell from X to Y") even if approximate.`,
      hi: `What?

Ek real bug story STAR mein: payment, crash, leak, ya offline sync.

Action mein tools bolo: Crashlytics, LeakCanary, coroutine cancel, Room, server verify.

Result number se ya clear impact.

Why?

Pressure mein kaise sochte ho yeh dikhata hai.

How?

90 second. Ek hi story deep yaad karo.`
    },
    {
      q: "Flutter vs Native Android — your view",
      en: `What?

Balanced answer (no fanboy):

**Native Android (Kotlin)**: Best deep integration — latest Jetpack, performance tuning, SDKs (payments, maps), foreground services, enterprise security. Higher cost per platform if iOS also needed separately.

**Flutter**: Single codebase for Android + iOS + web/desktop; fast UI iteration; good for MVPs and product teams with Dart skill. Platform channels needed for some native SDKs; larger app size; occasional lag behind newest Android APIs.

**When which**: Flutter for multi-platform product speed; Native when heavy Android-specific features, background constraints, or client mandates Kotlin.

Why?

Infosys delivers both client types — showing pragmatism beats "only Flutter" or "only Native".

How?

Tie to your experience: "I have done [X] in Kotlin and [Y] in Flutter; I choose based on team, timeline, and integration needs."`,
      hi: `What?

Native Android: deep Jetpack, SDK, performance, security — best jab sirf Android heavy ho.

Flutter: ek codebase Android+iOS — fast MVP, UI speed.

Dono fanboy mat bano. Client requirement se choose.

Why?

Infosys par dono type ke projects hote hain. Practical answer chahiye.

How?

Apna experience jodo: "Main dono mein kaam kar chuka hoon, decision timeline aur SDK par depend karti hai."`
    },
    {
      q: "How do you handle conflict or disagreement in a team?",
      en: `What?

Show maturity:
1. Listen first — understand other's data/constraints
2. Focus on goal (user, deadline, quality) not ego
3. Use facts — metrics, repro, API contract, design doc
4. Escalate only if blocked — after trying sync with lead

Sample:
"If I disagree on approach, I ask questions and share a small spike or prototype. For example API shape vs local cache — I list trade-offs (latency, offline, complexity). We align with architect/lead. I commit to team decision even if my idea was not chosen, unless it's a security or compliance issue."

Why?

Client teams need collaborators, not solo heroes who argue endlessly.

How?

Keep calm tone in interview. One short real example if you have it.`,
      hi: `What?

Pehle suno. Goal user/deadline par focus. Facts aur trade-off table. Lead se align. Team decision follow karo — security issue exception.

Why?

Infosys team delivery hai. Ego answer red flag.

How?

Chhota real example ready rakho jahan peacefully resolve hua.`
    },
    {
      q: "Tell me about a mistake or failure",
      en: `What?

Honest STAR with learning:
- Mistake: shipped without enough testing, broke release, wrong assumption on API, missed edge case on rotation/process death
- Impact: bug in production, rollback, delayed sprint
- Fix: hotfix, added test, checklist, CI step
- Learning: now you do code review, unit tests for ViewModel, release checklist

Why?

Shows accountability — better than "I never fail".

How?

End positive: "Since then I always…" Never blame others alone.`,
      hi: `What?

Ek sachchi galti: release bug, test miss, API assumption galat.

Impact short. Fix kya kiya. Ab kya habit change ki.

Why?

"Kabhi galti nahi" believable nahi.

How?

End: "Uske baad se main hamesha…" — positive learning.`
    },
    {
      q: "Where do you see yourself in 3–5 years?",
      en: `What?

Align with employer ladder:
- Strong senior mobile engineer / tech lead path on Android-Flutter
- Deep expertise: architecture, performance, security, mentoring juniors
- Contributing to client success and possibly pre-sales solution discussions
- Not "CEO in 2 years" or unrelated goals

Sample:
"In 3–5 years I see myself as a reliable senior mobile developer who owns modules, guides juniors, and designs scalable apps. I want to deepen Android architecture and cross-platform delivery while growing within Infosys client engagements."

Why?

They check retention and ambition balance.

How?

Connect answer to learning and delivery, not only management title.`,
      hi: `What?

3–5 saal: senior mobile dev, architecture strong, juniors mentor, client projects deliver.

CEO in 2 years mat bolo. Org ke andar growth dikhayo.

Why?

Retention aur realistic ambition.

How?

Infosys client delivery aur learning jodo answer mein.`
    },
    {
      q: "Walk me through your resume",
      en: `What?

Chronological, 2–3 minutes:
- Education (brief)
- Each role: company, duration, title, **2 bullets impact** (tech + outcome)
- Skills section: group by Android, Flutter, tools (Git, CI, Firebase)
- Projects/portfolio if fresher or career switch

Do not read every bullet — highlight strongest alignment to mobile role.

Why?

Validates resume truthfulness and communication.

How?

Resume one-page crisp. Be ready to deep-dive any line they stop on.`,
      hi: `What?

Timeline order: padhai → jobs → projects. Har job par 2 impact lines tech + result.

Har bullet nahi padhni. Strong parts highlight.

Why?

Resume verify karte hain.

How?

Jo line resume par hai us par deep dive ready rakho.`
    },
    {
      q: "Do you have questions for us?",
      en: `What?

Always say yes — prepare 3–5:
1. What does the mobile team work on in the first 6 months (domain, stack)?
2. How is mentoring / training for Android and Flutter at Infosys?
3. What does success look like in this role in year one?
4. Team structure — client project vs internal product?
5. Next steps in interview process and timeline?

Avoid: only asking salary/leave in first round; questions answered already on website.

Why?

Shows genuine interest and professionalism — interviews are two-way.

How?

Write questions in notebook. Pick 2 based on conversation. Listen actively.`,
      hi: `What?

Hamesha haan — 3–5 questions ready:
Team kya banata hai, training kaise, success metric kya, next interview step.

Pehle round mein sirf salary mat pucho.

Why?

Interest aur professionalism dikhta hai.

How?

Notebook mein likh kar le jao. Conversation ke hisaab se 2 choose karo.`
    },
    {
      q: "Mock interview — quick technical answers aloud",
      en: `What?

On interview day, rehearse **short spoken** answers (30–60 sec each) for:
- MVVM in one diagram sentence
- StateFlow vs SharedFlow one line each
- Hilt why use it
- Retrofit + OkHttp role
- Coroutines vs threads one line
- Repository pattern purpose
- Activity vs Fragment one line

Why?

Infosys may mix HR + technical in same panel. Fluency beats silent recall under stress.

How?

Use this site's Kotlin/Android tabs for depth; behavioral tab for stories. Morning of interview: speak answers aloud once, no new topics.`,
      hi: `What?

Interview day subah 30–60 sec aloud practice:
MVVM, StateFlow, Hilt, Retrofit, Coroutines, Repository, Activity vs Fragment.

Why?

HR + technical mix ho sakta hai. Awaz se practice yaad tight hoti hai.

How?

Site par depth padho; subah sirf revise, naya topic mat shuru.`
    },
    {
      q: "Infosys company profile — what to know before interview",
      en: `What?

Prepare a **2-minute factual snapshot** (from official site / annual report — refresh before interview):
- **Who**: Global IT services and consulting; founded 1981; HQ Bengaluru; large workforce across India and worldwide.
- **What they do**: Digital services, cloud, engineering, application development & maintenance, BFSI/retail/health domains — **client delivery** model (you work on client projects).
- **Why it matters for you**: Mobile/Android roles often sit in **client-facing delivery** — agility, process, communication, and learning standard practices matter as much as coding.

Why?

HR or manager may ask “What do you know about Infosys?” — shows preparation, not memorized essay. Tie to **your** goal: stable platform, diverse domains, training, scale.

How?

Visit infosys.com → About, Services, Careers. Note 2–3 lines on digital transformation and learning culture. Avoid outdated news or controversial gossip. Connect: “I want to grow on enterprise mobile delivery under structured engineering.”`,
      hi: `What?

Interview se pehle Infosys official site se 2 minute facts:
Global IT services, client projects, digital/cloud/mobile delivery, learning culture.

Why?

"Infosys ke baare mein kya jaante ho?" common HR question. Preparation dikhata hai.

How?

Website About + Careers padho. 2–3 bullet yaad karo. Apne mobile career goal se link karo — client delivery, scale, training.`
    },
    {
      q: "Hyderabad interview — logistics and professional etiquette",
      en: `What?

**Before the day:**
- Confirm **mode** (on-site Hyderabad campus vs hybrid vs fully virtual) and **documents** (resume prints, ID, offer/admit letter if applicable).
- **On-site**: plan route + buffer for traffic; arrive 15–20 min early; phone on silent; carry charger/water.
- **Virtual**: test camera, mic, internet; quiet background; laptop charged; join 5 min early.

**Etiquette (any location):**
- Business formal or smart formal unless told otherwise.
- Greet panel politely; listen fully before answering; ask clarifying questions on coding tasks.
- Hyderabad tech campuses: large MNC culture — punctuality, respect for process, calm under panel pressure.

Why?

Strong technical answers fail if you are late, unprepared logistically, or unprofessional. Infosys panels often mix HR + technical in one stretch — energy management matters.

How?

Night before: clothes ready, route/virtual link saved, 7–8 hours sleep. Morning: light revision only (mock aloud once), not new topics. After interview: thank-you email optional if you have recruiter contact.`,
      hi: `What?

Pehle confirm karo: on-site Hyderabad ya online. Resume print, ID, dress formal.

On-site: traffic buffer, 15 min pehle pahuncho. Phone silent.

Online: mic/camera/internet test, 5 min pehle join.

Why?

Late ya unprepared = poor impression chahe coding strong ho. Ek hi din mein HR + technical ho sakta hai.

How?

Raat ko sleep, kapde ready. Subah sirf short revise, naya topic mat. Traffic/link check mandatory.`
    }
    ]
  }
];
