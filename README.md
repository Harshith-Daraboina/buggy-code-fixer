# 🐛 Bug Fix Challenge - Git Push Game

> **A coding challenge where you can't push to Git until you fix the bugs!**

## 🎯 The Challenge

Welcome to the **Bug Fix Challenge**! This repository contains intentionally buggy code that you must fix before you can push your changes to Git.

### How It Works

1. **Fork this repository** and clone it to your local machine
2. **Open and examine** the buggy code in `buggy-code-here-come-fix-my-script-js/script.js`
3. **Fix all 15 bugs** in the functions
4. **Test your fixes** locally (read on for how to test)
5. **Try to push** - if your fixes are correct, the push will succeed! ✅
6. **If tests fail** - the push will be blocked ❌

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone <your-fork-url>
   cd buggy-code-fixer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the interactive HTML tester:**
   ```bash
   # Just open buggy-code-here-come-fix-my-script-js/index.html in your browser
   # Or serve it with a local server:
   npx serve buggy-code-here-come-fix-my-script-js
   ```

---

## 🧪 Testing Your Fixes

### Option 1: Run Jest Tests (Terminal)

```bash
npm test
```

This runs all Jest tests. **All tests must pass** for the pre-push hook to allow your push.

### Option 2: Use the Interactive HTML Tester

Open `buggy-code-here-come-fix-my-script-js/index.html` in your browser to test functions interactively before committing.

### Option 3: Manual Local Testing

Create a test file and import the functions:

```javascript
const { toggleTheme, submitWithLogId, sumOfDigits, printNumbersWithDelay, reverseEachWord, flattenArray, getData, trickyEventLoop, makeReactive, safeStringify, orderedFetch, Dog, detectLeak, LRUCache, mergeUserData } = require('./buggy-code-here-come-fix-my-script-js/script');

// Test your fixes
console.log('Testing sumOfDigits(123):', sumOfDigits(123)); // Should be 6
console.log('Testing reverseEachWord("Hello World"):', reverseEachWord("Hello World")); // Should be "olleH dlroW"
// etc...
```

---

## 🐛 The Bugs You Need to Fix

There are **15 functions/classes** with bugs. Find and fix all of them:

### Q1: `toggleTheme()`
Should toggle between dark and light themes, but doesn't add the correct class when switching.

### Q2: `submitWithLogId(data)`
Should await the promise before returning, but currently returns the promise directly without `await`.

### Q3: `sumOfDigits(num)`
Should return the sum of all digits, but currently returns only the last digit.

### Q4: `printNumbersWithDelay()`
Should print numbers 1-5 with delays, but has closure issues causing incorrect output.

### Q5: `reverseEachWord(sentence)`
Should reverse each word while keeping word order, but doesn't properly reverse or join words.

### Q6: `flattenArray(arr)`
Should flatten deeply nested arrays, but uses `sort()` instead of flattening.

### Q7: `getData()`
Should fetch data from API endpoints, but missing `await` keywords before `fetch()` calls.

### Q8: `trickyEventLoop()`
Should print in order: Start → Microtask → Timeout → End, but order is incorrect.

### Q9: `makeReactive(obj, callback)`
Should trigger callback on deep nested property changes, but doesn't return proxied nested objects.

### Q10: `safeStringify(obj)`
Should handle circular references, but doesn't properly add objects to WeakSet before checking.

### Q11: `orderedFetch(urls)`
Should await fetch before calling `.text()`, but missing `await` keyword.

### Q12: `Dog` class
Should properly return name from `getName()` method, but doesn't return the value from `super.getName()`.

### Q13: `detectLeak()`
Should clear references to allow garbage collection, but doesn't clear the nodes array.

### Q14: `LRUCache` class
Should evict oldest key correctly, but uses wrong method to get first key from Map.

### Q15: `mergeUserData(target, source)`
Should prevent prototype pollution, but doesn't filter out dangerous keys like `__proto__` and `constructor`.

**⚠️ You must fix ALL 15 bugs to pass!**

---

## 🚫 What Happens When You Try to Push

### If Tests Fail:
```bash
$ git push

> jest

FAIL test/script.test.js
✖ sum adds two positive numbers correctly

Test Suites: 1 failed, 5 passed
Tests:       15 failed, 39 passed

husky - pre-push hook exited with code 1 (error)
```

**Push rejected! ❌** Fix the bugs and try again.

### If Tests Pass:
```bash
$ git push

> jest

PASS test/script.test.js

Test Suites: 5 passed, 5 total
Tests:       54 passed, 54 total

To github.com:yourname/bugfix-challenge-todo.git
   main -> main
```

**Push successful! ✅**

---

## 🔧 Technical Details

### Husky Pre-Push Hook

When you run `git push`, Husky automatically runs `npm test` before allowing the push. This prevents you from pushing code with failing tests.

**File location:** `.husky/pre-push`

To bypass this (not recommended), use:
```bash
git push --no-verify
```

### GitHub Actions

Even if you bypass the local Husky hook, GitHub Actions will run tests on your push/PR and mark it as failed if tests don't pass.

**Workflow file:** `.github/workflows/test.yml`

---

## 📁 Project Structure

```
bugfix-challenge-todo/
├── buggy-code-here-come-fix-my-script-js/  # The buggy code you need to fix
│   ├── script.js         # ⚠️ Fix the bugs here!
│   └── index.html        # Interactive tester (optional)
├── test/                 # Jest test suite
│   └── script.test.js    # Tests that must pass
├── .github/
│   └── workflows/
│       └── test.yml      # GitHub Actions CI
├── .husky/
│   └── pre-push          # Pre-push hook
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

---

## 🎓 Learning Outcomes

By completing this challenge, you'll learn:

- ✅ How to use Jest for testing
- ✅ How Git hooks work (Husky)
- ✅ How CI/CD works (GitHub Actions)
- ✅ Debugging and fixing code logic errors
- ✅ Best practices: test before pushing

---

## 🤝 Contributing

If you find any issues with this challenge or want to add more buggy functions, feel free to:

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-challenge`)
3. Commit your changes (`git commit -m 'Add new challenge'`)
4. Push to the branch (`git push origin feature/new-challenge`)
5. Open a Pull Request

---

## 📝 License

MIT License - feel free to use this challenge for learning, teaching, or coding interviews!

---

## 🌟 Ready to Begin?

1. **Fork this repo** ⭐
2. **Clone it to your machine** 📥
3. **Run `npm install`** 📦
4. **Start fixing bugs!** 🐛→✅
5. **Push when ready!** 🚀

**Good luck, and happy debugging!** 🎉
