# 🎯 Bug Fix Challenge - Solution Guide

> **⚠️ SPOILERS AHEAD!** Only look here if you're stuck or want to verify your solution.

## Summary of Bugs and Fixes

### 1. `sum()` function
**Bug:** Returns `a - b` instead of `a + b`

**Fix:**
```javascript
function sum(a, b) {
  return a + b;  // Was: return a - b;
}
```

### 2. `multiply()` function
**Bug:** Returns only `a` instead of `a * b`

**Fix:**
```javascript
function multiply(a, b) {
  return a * b;  // Was: return a;
}
```

### 3. `isEven()` function
**Bug:** Always returns `false` regardless of input

**Fix:**
```javascript
function isEven(num) {
  return num % 2 === 0;  // Was: return false;
}
```

### 4. `findMax()` function
**Bug:** Returns the first element instead of the maximum

**Fix:**
```javascript
function findMax(numbers) {
  return Math.max(...numbers);  // Was: return numbers[0];
}
```

### 5. `reverseString()` function
**Bug:** Returns the original string instead of reversing it

**Fix:**
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');  // Was: return str;
}
```

## Complete Fixed Code

```javascript
function sum(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function isEven(num) {
  return num % 2 === 0;
}

function findMax(numbers) {
  return Math.max(...numbers);
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

module.exports = {
  sum,
  multiply,
  isEven,
  findMax,
  reverseString
};
```

## Testing the Fix

After applying the fixes, run:
```bash
npm test
```

You should see:
```
PASS test/script.test.js
Test Suites: 1 passed, 1 total
Tests:       18 passed, 18 total
```

## Tips for Similar Challenges

1. **Read the test cases** - They show exactly what the function should do
2. **Read comments** - Often the intended behavior is described
3. **Test one function at a time** - Focus on getting one passing before moving to the next
4. **Use the interactive HTML tester** - Open `buggy-code/index.html` to test quickly
5. **Check the logic** - Common bugs are:
   - Wrong operator (`-` instead of `+`, etc.)
   - Missing implementation (returning wrong value)
   - Incorrect logic in loops/conditionals

Happy debugging! 🐛→✅
