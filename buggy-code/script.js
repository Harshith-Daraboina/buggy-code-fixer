// 🐛 BUGGY CODE - Your mission is to fix the bugs below!

function sum(a, b) {
  // Bug 1: Should return a + b, but it's currently subtracting
  return a + b;
}

function multiply(a, b) {
  // Bug 2: Should return a * b, but it's returning the wrong value
  return a*b;
}

function isEven(num) {
  // Bug 3: Should return true for even numbers, false for odd
  // Currently it returns false for everything
  return num % 2 === 0;
}

function findMax(numbers) {
  // Bug 4: Should return the maximum number in the array
  // Currently it returns the first element instead
  return Math.max(...numbers);
}

function reverseString(str) {
  // Bug 5: Should return the reversed string
  // Currently it just returns the original string
  return str.split('').reverse().join('');
}

module.exports = {
  sum,
  multiply,
  isEven,
  findMax,
  reverseString
};
