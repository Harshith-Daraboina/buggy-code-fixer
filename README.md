# 🐛 Bug Fix Challenge - Git Push Game

> **A coding challenge where you can't push to Git until you fix the bugs!**

## 🎯 The Challenge

Welcome to the **Bug Fix Challenge**! This repository contains intentionally buggy code that you must fix before you can push your changes to Git.

### How It Works

1. **Fork this repository** and clone it to your local machine
2. **Open and examine** the buggy code in `buggy-code/script.js`
3. **Fix all 5 bugs** in the functions
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
   cd bugfix-challenge-todo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Initialize Husky (runs automatically after npm install):**
   ```bash
   npx husky install
   ```

4. **Run the interactive HTML tester:**
   ```bash
   # Just open buggy-code/index.html in your browser
   # Or serve it with a local server:
   npx serve buggy-code
   ```

---

## 🧪 Testing Your Fixes

### Option 1: Run Jest Tests (Terminal)

```bash
npm test
```

This runs all Jest tests. **All tests must pass** for the pre-push hook to allow your push.

### Option 2: Use the Interactive HTML Tester

Open `buggy-code/index.html` in your browser to test functions interactively before committing.

### Option 3: Manual Local Testing

Create a test file and import the functions:

```javascript
const { sum, multiply, isEven, findMax, reverseString } = require('./buggy-code/script');

console.log('Testing sum(2, 3):', sum(2, 3)); // Should be 5
console.log('Testing multiply(3, 4):', multiply(3, 4)); // Should be 12
// etc...
```

---

## 🐛 The Bugs You Need to Fix

Five functions have bugs. Find and fix all of them:

### 1. `sum(a, b)`
Should return the sum of two numbers, but currently subtracts them.

### 2. `multiply(a, b)`
Should return the product of two numbers, but returns something else.

### 3. `isEven(num)`
Should return `true` for even numbers and `false` for odd numbers, but always returns `false`.

### 4. `findMax(numbers)`
Should return the maximum number in an array, but returns the first element instead.

### 5. `reverseString(str)`
Should return the reversed string, but returns the original string unchanged.

**⚠️ You must fix ALL 5 bugs to pass!**

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
├── buggy-code/           # The buggy code you need to fix
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
