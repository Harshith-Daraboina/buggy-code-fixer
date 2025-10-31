// 🐛 BUGGY CODE - Your mission is to fix the bugs below!

//Bug 1:  You are given a web page that supports two visual themes — light mode and dark mode.
// Your task is to write a JavaScript function toggleTheme() that switches the page theme whenever it is called.
// When the page is in dark mode (i.e., the <body> element has the class dark), calling the function should change it to light mode.
// When it’s in light mode, it should switch back to dark mode.


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


// Print Numbers 1 to 5 with Delay
// 🧠 Trick: Use closure to fix the setTimeout + var issue.
// Bug: prints all 6s instead of 1, 2, 3, 4, 5

function printNumbersWithDelay() {
  for (var i = 1; i <= 5; i++) {
    (function(j) {
      setTimeout(() => console.log(j), 1000 * j);
    })(i);
  }
}


// Reverse Each Word in a Sentence
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


// Flatten a Nested Array
// 🧠 Trick: Recursion or .flat(Infinity).
// [1, [2, [3, [4]]]] → [1,2,3,4]

function flattenArray(arr) {
  return arr.flat(Infinity);
}



function reverseString(str) {
  // Bug 5: Should return the reversed string
  // Currently it just returns the original string
  return str.split('').reverse().join('');
}

module.exports = {
  toggleTheme,
  sumOfDigits,
  printNumbersWithDelay,
  reverseEachWord,
  flattenArray,
  reverseString
};
