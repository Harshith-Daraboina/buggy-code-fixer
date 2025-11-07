// 🐛 BUGGY CODE - Your mission is to fix the bugs below!

// ============================================================================
// Q1: Toggle Theme Function
// ============================================================================
// You are given a web page that supports two visual themes — light mode and dark mode.
// Your task is to write a JavaScript function toggleTheme() that switches the page theme whenever it is called.
// When the page is in dark mode (i.e., the <body> element has the class dark), calling the function should change it to light mode.
// When it's in light mode, it should switch back to dark mode.

function toggleTheme() {
  const body = document.body;
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.remove("light");
  }
}



// ============================================================================
// Q2: Submit with Log ID
// ============================================================================
// 🧠 Trick: Remember to handle async operations properly!
// 🐞 Bug: The submit function tries to return logId before it's created - logId is generated inside the promise
// Fix the async function to properly await the logging operation and return the correct response.
// The function should submit data, log it with a generated ID, and return the log ID after logging is complete.


async function submitWithLogId(data) {
  // Simulate logging operation that generates and validates log ID
  const logPromise = new Promise((resolve) => {
    setTimeout(() => {
      const logId = `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log(`[${logId}] Submitted data:`, data);
      resolve(logId);
    }, 100);
  });
  return logPromise;
}



// ============================================================================
// Q3: Sum of Digits Function
// ============================================================================
// 🐞 Bug: Returns only the last digit instead of summing all digits
// Example: sumOfDigits(123) should return 6 (1 + 2 + 3), but currently returns 3

function sumOfDigits(num) {
  return num % 10;
}




// ============================================================================
// Q4: Print Numbers 1 to 5 with Delay
// ============================================================================
// 🧠 Trick: Use closure to fix the setTimeout + var issue.
// 🐞 Bug: Prints all 6s instead of 1, 2, 3, 4, 5
// The function should print each number with a 1-second delay between them

function printNumbersWithDelay() {
  for (let i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(() => console.log(i), 1000 * i);
    })(j);
  }
}




// ============================================================================
// Q5: Reverse Each Word in a Sentence
// ============================================================================
// 🧠 Trick: Keep word order same, but reverse each word individually.
// Example: "Hello World" → "olleH dlroW"

function reverseEachWord(sentence) {
  if (sentence.length === 0) {
    return '';
  } else {
    return sentence.split(' ');
  }
}




// ============================================================================
// Q6: Flatten a Nested Array
// ============================================================================

// Example: [1, [2, [3, [4]]]] → [1, 2, 3, 4]

function flattenArray(arr) {
  return arr.sort();
}



// ============================================================================
// Q7: Fetch Data from API Endpoints
// ============================================================================

// Fix the async function to properly fetch and parse JSON data from multiple endpoints.
// The function should fetch data from each URL in the array sequentially, then fetch a single post.
// Currently, it tries to call .json() on a Promise object instead of a Response, which will cause errors.



const urls = ["users", "posts", "comments"];

async function getData() {
  for (var i = 0; i < urls.length; i++) {
    const res = fetch(`https://jsonplaceholder.typicode.com/${urls[i]}`);
    const data = await res.json();
    console.log(`Data for ${urls[i]}:`, data.length);
  }

  try {
    const res = fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("Single Post:", data);
  } catch (err) {
    console.error("Error fetching single post:", err);
  }
}




// ============================================================================

// Q8: Event Loop & Promise Timing

// ============================================================================

// ⚡ Challenge: Without changing structure, fix logs so they print in this order:
// Start → Microtask → Timeout → End
// Expected: Start → Microtask → Timeout → End
// (Currently prints Start → End → Microtask → Timeout)



function trickyEventLoop() {
  console.log("Start");
  Promise.resolve().then(() => console.log("Microtask"));
  setTimeout(() => console.log("Timeout"), 0);
  console.log("End");
}



// ============================================================================

// Q9: Deep Reactive Object (Mutation Trap)

// ============================================================================

// 🧠 Goal: Implement a mini reactive object that calls callback whenever any nested property changes.
// ❌ Bug: Current implementation only detects top-level changes, not deep mutations.
// Example:
// const state = makeReactive({ user: { name: "A" } }, console.log);
// state.user.name = "B"   // should trigger callback — currently does NOT!

function makeReactive(obj, callback) {
  if (typeof obj !== "object" || obj === null) return obj;

  return new Proxy(obj, {
    get(target, key) {
      const value = target[key];
      if (typeof value === "object" && value !== null) {
         makeReactive(value, callback);
      }
      return value;
    },
    set(target, key, value) {
      target[key] = value;
      callback(key, value);
      return true;
    }
  });
}



// ============================================================================

// Q10: Infinite Recursion Detection in Linked Data

// ============================================================================

// 🧠 Problem: We have nested objects that can reference each other.
// Implement safeStringify(obj) that converts to JSON but avoids circular references.
// ❌ Bug: Current version crashes with circular structures.

// Example:
// const a = {}; a.self = a;
// safeStringify(a) → should return '{"self":"[Circular]"}'



function safeStringify(obj) {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
    }
    return value;
  });
}






// ============================================================================

// Q11: Async Race Condition

// ============================================================================

// 🧠 Problem: Fetch multiple URLs and print results in the *original order* even if they resolve out of order.
// ❌ Bug: Current code prints in random order due to Promise.all behavior.
// Expected: Must log results in the same order as URLs provided, even if slower ones resolve later.


async function orderedFetch(urls) {
  const promises = urls.map(async (url) => {

    const res = fetch(url);
    
    return (await res).text();
  });

  const results = await Promise.all(promises);
  results.forEach(r => console.log(r));
}




// ============================================================================

// Q12: Class Inheritance & Private Fields

// ============================================================================

// 🧠 Problem: Subclass cannot access parent private field.
// ❌ Bug: Throws "Private field must be declared in an enclosing class"
// Expected: new Dog("Rocky").bark() → "Rocky says woof!"

class Animal {
  constructor(name) { this.name = name; }
  getName() { return this.name; }
}
class Dog extends Animal {
  bark() {
    console.log(`${this.getName()} says woof!`);
  }
  getName() {
    super.getName();
  }
}




// ============================================================================

// Q13: Memory Leak Detector

// ============================================================================

// 🧠 Problem: detectLeak should show if any DOM nodes were not garbage collected after deletion.
// ❌ Bug: Function always returns "no leaks" even if leaks exist (due to closure reference traps).

function detectLeak() {
  const nodes = [];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.id = `node-${i}`;
    document.body.appendChild(el);
    nodes.push(el);
  }

  nodes.forEach(n => n.remove());
  console.log("No leaks detected");
}




// ============================================================================

// Q14: LRU Cache Implementation

// ============================================================================


// 🧠 Implement least-recently-used cache using Map()
// ❌ Bug: Eviction logic incorrect — deletes random keys.


class LRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return null;
  }

  set(key, value) {
    this.cache.set(key, value);
    if (this.cache.size > this.limit) {
      const oldestKey = this.cache.keys()[0];
      this.cache.delete(oldestKey);
    }
  }
}



// ============================================================================

// Q15: Prototype Pollution Vulnerability

// ============================================================================

// 🧠 Problem: Create a safe merge function that prevents prototype pollution attacks.
// ❌ Bug: Current implementation uses spread operator which doesn't protect against __proto__ keys.
// The function should merge user data safely, but currently allows prototype pollution.
// Example attack: mergeUserData({}, JSON.parse('{"__proto__": {"isAdmin": true}}')) could pollute Object.prototype



function mergeUserData(target, source) {
  const result = { ...target };
  for (const key in source) {
    // Prevent prototype pollution by filtering out dangerous keys
    if (source.hasOwnProperty(key) && key !== '' && key !== '') {

      // If both values are objects (not arrays, not null), merge them recursively
      if (typeof result[key] === 'object' && result[key] !== null && 
          typeof source[key] === 'object' && source[key] !== null &&
          !Array.isArray(result[key]) && !Array.isArray(source[key])) {
        result[key] = mergeUserData(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }
  return result;
}



// ============================================================================END OF QUESTIONS=================================================================================

module.exports = {
  toggleTheme,
  submitWithLogId,
  sumOfDigits,
  printNumbersWithDelay,
  reverseEachWord,
  flattenArray,
  getData,
  trickyEventLoop,
  makeReactive,
  safeStringify,
  orderedFetch,
  Dog,
  detectLeak,
  LRUCache,
  mergeUserData
};
