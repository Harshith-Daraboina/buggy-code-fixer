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
    body.classList.add("light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
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
      // Log ID is created INSIDE the promise
      const logId = `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      console.log(`[${logId}] Submitted data:`, data);
      resolve(logId);
    }, 100);
  });
  
  // Bug: Trying to return logId before it exists - logId is only available after awaiting the promise
  // This will cause ReferenceError: logId is not defined
  return await logPromise;
}

// ============================================================================
// Q3: Sum of Digits Function
// ============================================================================
// 🐞 Bug: returns only last digit
function sumOfDigits(num) {
  let sum = 0;
  while (num > 0) {
    sum += num % 10;
    num = Math.floor(num / 10);
  } 
  return sum;
}
// Example: 123 → 6

// ============================================================================
// Q4: Print Numbers 1 to 5 with Delay
// ============================================================================
// 🧠 Trick: Use closure to fix the setTimeout + var issue.
// Bug: prints all 6s instead of 1, 2, 3, 4, 5

function printNumbersWithDelay() {
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(() => console.log(j), 1000 * j); // 1000 * j is the delay in milliseconds
    })(i);
  }
}

// ============================================================================
// Q4: Reverse Each Word in a Sentence
// ============================================================================
// 🧠 Trick: Keep word order same.
// "Hello World" → "olleH dlroW"

function reverseEachWord(sentence) {
  if (sentence.length === 0) {
    return '';
  } else {
    return sentence
      .split(' ')
      .map(word => word.split('').reverse().join(''))
      .join(' ');
  }
}

// ============================================================================
// Q5: Flatten a Nested Array
// ============================================================================
// 🧠 Trick: Recursion or .flat(Infinity).
// [1, [2, [3, [4]]]] → [1,2,3,4]

function flattenArray(arr) {
  return arr.flat(Infinity);
}



// ============================================================================
// Q6: Fetch Data from API Endpoints
// ============================================================================
// 🧠 Trick: Remember to await promises!
// 🐞 Bug: Missing await keywords - fetch() returns a Promise that must be awaited before calling .json()
// Fix the async function to properly fetch and parse JSON data from multiple endpoints.
// The function should fetch data from each URL in the array sequentially, then fetch a single post.
// Currently, it tries to call .json() on a Promise object instead of a Response, which will cause errors.

const urls = ["users", "posts", "comments"];

async function getData() {
  for (let i = 0; i < urls.length; i++) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/${urls[i]}`);
    const data = await res.json();
    console.log(`Data for ${urls[i]}:`, data.length);
  }

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    console.log("Single Post:", data);
  } catch (err) {
    console.error("Error fetching single post:", err);
  }
}

// ============================================================================






module.exports = {
  toggleTheme,
  submitWithLogId,
  sumOfDigits,
  printNumbersWithDelay,
  reverseEachWord,
  flattenArray,
  getData
};
