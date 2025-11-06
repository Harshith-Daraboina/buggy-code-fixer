const { toggleTheme, submitWithLogId, sumOfDigits, printNumbersWithDelay, reverseEachWord, flattenArray, getData, trickyEventLoop, makeReactive, safeStringify, orderedFetch, Dog, detectLeak, LRUCache, mergeUserData } = require('../buggy-code-here-come-fix-my-script-js/script');

describe('Bug Fix Challenge - All Tests Must Pass!', () => {
  
  describe('Q1: toggleTheme() function', () => {
    beforeEach(() => {
      // Setup DOM for testing
      document.body.className = '';
    });

    test('should toggle from default/empty to dark (should NOT add light class)', () => {
      document.body.className = '';
      toggleTheme();
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
    });

    test('should toggle from dark to light mode (should remove dark, add light)', () => {
      document.body.className = 'dark';
      toggleTheme();
      expect(document.body.classList.contains('light')).toBe(true);
      expect(document.body.classList.contains('dark')).toBe(false);
    });

    test('should toggle from light to dark mode (should remove light, add dark)', () => {
      document.body.className = 'light';
      toggleTheme();
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
    });

    test('should toggle multiple times correctly without adding both classes', () => {
      document.body.className = '';
      toggleTheme(); // should become dark
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
      
      toggleTheme(); // should become light
      expect(document.body.classList.contains('light')).toBe(true);
      expect(document.body.classList.contains('dark')).toBe(false);
      
      toggleTheme(); // should become dark again
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
    });

    test('should never have both dark and light classes at the same time', () => {
      document.body.className = '';
      toggleTheme();
      toggleTheme();
      toggleTheme();
      const hasDark = document.body.classList.contains('dark');
      const hasLight = document.body.classList.contains('light');
      expect(hasDark && hasLight).toBe(false);
    });
  });
  
  describe('Q3: sumOfDigits() function', () => {
    test('BUG: should return sum of ALL digits, not just the last one', () => {
      expect(sumOfDigits(123)).toBe(6); // 1 + 2 + 3 = 6 (not 3)
      expect(sumOfDigits(456)).toBe(15); // 4 + 5 + 6 = 15 (not 6)
      expect(sumOfDigits(789)).toBe(24); // 7 + 8 + 9 = 24 (not 9)
    });

    test('should handle single digit numbers', () => {
      expect(sumOfDigits(5)).toBe(5);
      expect(sumOfDigits(9)).toBe(9);
      expect(sumOfDigits(0)).toBe(0);
    });

    test('should handle zero', () => {
      expect(sumOfDigits(0)).toBe(0);
    });

    test('BUG: should handle large numbers correctly (sum all digits)', () => {
      expect(sumOfDigits(12345)).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15 (not 5)
      expect(sumOfDigits(999)).toBe(27); // 9 + 9 + 9 = 27 (not 9)
      expect(sumOfDigits(123456789)).toBe(45); // 1+2+3+4+5+6+7+8+9 = 45 (not 9)
    });

    test('should handle numbers with zeros in middle', () => {
      expect(sumOfDigits(101)).toBe(2); // 1 + 0 + 1 = 2 (not 1)
      expect(sumOfDigits(1000)).toBe(1); // 1 + 0 + 0 + 0 = 1 (not 0)
      expect(sumOfDigits(202)).toBe(4); // 2 + 0 + 2 = 4 (not 2)
    });

    test('BUG: should calculate sum correctly for multi-digit numbers', () => {
      // These tests will fail if function only returns last digit
      expect(sumOfDigits(12)).toBe(3); // 1 + 2 = 3 (not 2)
      expect(sumOfDigits(99)).toBe(18); // 9 + 9 = 18 (not 9)
      expect(sumOfDigits(555)).toBe(15); // 5 + 5 + 5 = 15 (not 5)
    });
  });

  describe('Q4: reverseEachWord() function', () => {
    test('BUG: should reverse each word while keeping word order (join with space)', () => {
      expect(reverseEachWord('Hello World')).toBe('olleH dlroW');
      expect(reverseEachWord('JavaScript is fun')).toBe('tpircSavaJ si nuf');
      expect(reverseEachWord('The quick brown fox')).toBe('ehT kciuq nworb xof');
    });

    test('should handle single word', () => {
      expect(reverseEachWord('Hello')).toBe('olleH');
      expect(reverseEachWord('Test')).toBe('tseT');
      expect(reverseEachWord('a')).toBe('a');
    });

    test('BUG: should handle empty string correctly', () => {
      expect(reverseEachWord('')).toBe('');
    });

    test('BUG: should preserve spaces between words', () => {
      expect(reverseEachWord('a  b')).toBe('a  b'); // spaces preserved
      expect(reverseEachWord('hello   world')).toBe('olleh   dlrow');
      expect(reverseEachWord('test  test  test')).toBe('tset  tset  tset');
    });

    test('should handle words with different cases', () => {
      expect(reverseEachWord('HeLLo WoRLd')).toBe('oLLeH dLRoW');
      expect(reverseEachWord('JaVaScRiPt')).toBe('tPiRcSaVaJ');
    });

    test('should handle special characters in words', () => {
      expect(reverseEachWord('Hello! World?')).toBe('!olleH ?dlroW');
      expect(reverseEachWord('test-case')).toBe('esac-tset');
    });

    test('BUG: should join words with spaces, not empty string', () => {
      // This will fail if join('') is used instead of join(' ')
      const result = reverseEachWord('ab cd ef');
      expect(result).toBe('ba dc fe'); // Should have spaces between reversed words
      expect(result.split(' ').length).toBe(3); // Should have 3 words separated by spaces
      // If join('') was used, result would be 'badcfe' with no spaces
      expect(result).toContain(' '); // Must contain spaces
    });
  });

  describe('Q5: flattenArray() function', () => {
    test('BUG: should flatten deeply nested arrays using Infinity depth', () => {
      expect(flattenArray([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
      expect(flattenArray([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, 5]);
      expect(flattenArray([[1], [2], [3]])).toEqual([1, 2, 3]);
    });

    test('should handle already flat arrays', () => {
      expect(flattenArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(flattenArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('BUG: should handle empty arrays correctly', () => {
      expect(flattenArray([])).toEqual([]);
      expect(flattenArray([[]])).toEqual([]);
      expect(flattenArray([[], []])).toEqual([]);
      expect(flattenArray([[[]]])).toEqual([]);
    });

    test('BUG: should flatten arrays with Infinity depth, not shallow depth', () => {
      // These will fail if flat() is called without Infinity or with wrong depth
      expect(flattenArray([1, ['a', ['b', 2]], 3])).toEqual([1, 'a', 'b', 2, 3]);
      expect(flattenArray([true, [false, [null, undefined]]])).toEqual([true, false, null, undefined]);
      expect(flattenArray([[1, 2], ['a', 'b'], [true, false]])).toEqual([1, 2, 'a', 'b', true, false]);
    });

    test('BUG: should handle very deeply nested arrays (requires Infinity)', () => {
      expect(flattenArray([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
      expect(flattenArray([[[[[1]]]]])).toEqual([1]);
      // This will fail if using flat() without Infinity parameter
      // Build deeply nested array programmatically to avoid syntax error
      let deeplyNested = [1];
      for (let i = 0; i < 15; i++) {
        deeplyNested = [deeplyNested];
      }
      expect(flattenArray(deeplyNested)).toEqual([1]);
    });

    test('should handle arrays with nested arrays containing empty arrays', () => {
      expect(flattenArray([1, [[], 2]])).toEqual([1, 2]);
      expect(flattenArray([[], [1, []], [2, [3]]])).toEqual([1, 2, 3]);
    });

    test('BUG: must use flat(Infinity) to handle arbitrary nesting depth', () => {
      // flat() without argument only flattens 1 level
      // flat(Infinity) flattens all levels
      const deeplyNested = [1, [2, [3, [4, [5, [6, [7]]]]]]];
      expect(flattenArray(deeplyNested)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('Q4: printNumbersWithDelay() function', () => {
    test('BUG: should print numbers 1, 2, 3, 4, 5 in sequence, not all 6s', (done) => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.useFakeTimers();
      
      printNumbersWithDelay();
      
      // Advance time to trigger first log
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(1);
      
      // Advance time to trigger second log
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(2);
      
      // Advance time to trigger third log
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(3);
      
      // Advance time to trigger fourth log
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(4);
      
      // Advance time to trigger fifth log
      jest.advanceTimersByTime(1000);
      expect(consoleSpy).toHaveBeenCalledWith(5);
      
      // Verify all numbers were logged
      expect(consoleSpy).toHaveBeenCalledTimes(5);
      expect(consoleSpy).not.toHaveBeenCalledWith(6);
      
      consoleSpy.mockRestore();
      jest.useRealTimers();
      done();
    });

    test('BUG: should print correct sequence, not all same number', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.useFakeTimers();
      
      printNumbersWithDelay();
      
      // Advance to see all logs
      jest.advanceTimersByTime(6000);
      
      // Get all calls
      const calls = consoleSpy.mock.calls.map(call => call[0]);
      
      // Should have exactly 5 different numbers: 1, 2, 3, 4, 5
      expect(calls).toEqual([1, 2, 3, 4, 5]);
      expect(new Set(calls).size).toBe(5); // All should be unique
      
      consoleSpy.mockRestore();
      jest.useRealTimers();
    });
  });

  describe('getData() function', () => {
    let originalFetch;
    let consoleSpy;

    beforeEach(() => {
      // Save original fetch if it exists
      originalFetch = global.fetch;
      // Mock console.log and console.error
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
      // Restore original fetch
      global.fetch = originalFetch;
      // Restore console methods
      consoleSpy.mockRestore();
      jest.restoreAllMocks();
    });

    test('should be defined', () => {
      expect(typeof getData).toBe('function');
    });

    test('should fetch data from all endpoints sequentially', async () => {
      // Mock fetch to return mock responses
      const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
      const mockPosts = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
      const mockComments = [{ id: 1, body: 'Comment 1' }];
      const mockSinglePost = { id: 1, title: 'Single Post', body: 'Body' };

      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          json: async () => mockUsers,
          ok: true,
          status: 200
        })
        .mockResolvedValueOnce({
          json: async () => mockPosts,
          ok: true,
          status: 200
        })
        .mockResolvedValueOnce({
          json: async () => mockComments,
          ok: true,
          status: 200
        })
        .mockResolvedValueOnce({
          json: async () => mockSinglePost,
          ok: true,
          status: 200
        });

      await getData();

      // Check that fetch was called 4 times (3 for array endpoints + 1 for single post)
      expect(global.fetch).toHaveBeenCalledTimes(4);
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/comments');
      expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/1');

      // Check that console.log was called for each endpoint
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Data for users:'), 2);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Data for posts:'), 2);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Data for comments:'), 1);
      expect(consoleSpy).toHaveBeenCalledWith('Single Post:', mockSinglePost);
    });

    test('should handle fetch errors gracefully', async () => {
      const mockError = new Error('Network error');
      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          json: async () => [{ id: 1 }],
          ok: true,
          status: 200
        })
        .mockResolvedValueOnce({
          json: async () => [{ id: 1 }],
          ok: true,
          status: 200
        })
        .mockResolvedValueOnce({
          json: async () => [{ id: 1 }],
          ok: true,
          status: 200
        })
        .mockRejectedValueOnce(mockError);

      // Should not throw - errors in try-catch should be caught
      await expect(getData()).resolves.not.toThrow();

      // console.error should be called for the single post fetch error
      expect(console.error).toHaveBeenCalled();
    });

    test('should await fetch responses before calling json()', async () => {
      // This test will fail if await is missing before fetch()
      const mockData = [{ id: 1 }];
      let fetchCallCount = 0;

      global.fetch = jest.fn().mockImplementation(() => {
        fetchCallCount++;
        return Promise.resolve({
          json: async () => {
            // If fetch() was not awaited, this will throw because res is a Promise
            expect(fetchCallCount).toBeDefined();
            return mockData;
          },
          ok: true,
          status: 200
        });
      });

      await getData();

      // If we get here without errors, fetch was properly awaited
      expect(global.fetch).toHaveBeenCalled();
    });
  });

  describe('Edge Cases and Integration', () => {
    test('should handle all functions working together', () => {
      // sumOfDigits should work
      expect(sumOfDigits(123)).toBe(6);
      
      // reverseEachWord should work
      expect(reverseEachWord('Hello World')).toBe('olleH dlroW');
      
      // flattenArray should work
      expect(flattenArray([1, [2, [3]]])).toEqual([1, 2, 3]);
    });

    test('should handle combined operations', () => {
      // Reverse each word in a sentence
      const sentence = reverseEachWord('test hello');
      expect(sentence).toBe('tset olleh');
      
      // Sum digits of number
      const num = 123;
      const sum = sumOfDigits(num);
      expect(sum).toBe(6);
      
      // Flatten nested arrays
      const nested = [[['test']], ['hello']];
      expect(flattenArray(nested)).toEqual(['test', 'hello']);
    });

    test('should handle edge case combinations', () => {
      // Empty operations
      expect(flattenArray([[]])).toEqual([]);
      expect(reverseEachWord('')).toBe('');
      
      // Single element operations
      expect(sumOfDigits(5)).toBe(5);
      expect(flattenArray([1])).toEqual([1]);
    });

    test('should handle complex nested operations', () => {
      // Flatten nested array structure
      const nested = [[[['hello', 'world', 'test']]]];
      expect(flattenArray(nested)).toEqual(['hello', 'world', 'test']);
      
      // Reverse words in array and flatten
      const words = ['hello world', 'test'];
      const reversed = words.map(reverseEachWord);
      expect(reversed).toEqual(['olleh dlrow', 'tset']);
    });
  });

  describe('Q2: submitWithLogId() function', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('BUG: should return await logPromise, not just return logPromise', async () => {
      // The bug description says it should return logId after awaiting
      // Current code: return logPromise; (works but doesn't await)
      // Should be: return await logPromise;
      // Test: The function should await the promise internally
      // Check function source to verify await is present
      const functionSource = submitWithLogId.toString();
      const hasAwait = /return\s+await\s+logPromise/.test(functionSource.replace(/\s+/g, ' '));
      
      // Also verify it works correctly
      const promise = submitWithLogId({ test: 'data' });
      jest.advanceTimersByTime(100); // Complete the timeout
      const logId = await promise;
      
      expect(hasAwait).toBe(true);
      expect(logId).toMatch(/^LOG-\d+-[a-z0-9]+$/);
    });

    test('BUG: should await the promise before returning (behavioral test)', async () => {
      // The function should await logPromise internally
      // While both "return logPromise" and "return await logPromise" work,
      // the requirement is explicit: await and then return
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = submitWithLogId({ test: 'data' });
      // If function awaited, console.log would have been called by now
      // Since we're using fake timers, we need to advance
      jest.advanceTimersByTime(100);
      const logId = await promise;
      // Verify the log was called (meaning the promise resolved)
      expect(consoleSpy).toHaveBeenCalled();
      expect(logId).toMatch(/^LOG-\d+-[a-z0-9]+$/);
      consoleSpy.mockRestore();
    });

    test('should return unique log IDs for different calls', async () => {
      const promise1 = submitWithLogId({ test: 'data1' });
      jest.advanceTimersByTime(100);
      const logId1 = await promise1;
      
      // Advance time for different timestamp
      jest.advanceTimersByTime(10);
      const promise2 = submitWithLogId({ test: 'data2' });
      jest.advanceTimersByTime(100);
      const logId2 = await promise2;
      
      expect(logId1).not.toBe(logId2);
    });

    test('BUG: should not throw ReferenceError about logId not being defined', async () => {
      // This test will fail if function tries to return logId before it's created
      const promise = submitWithLogId({ test: 'data' });
      jest.advanceTimersByTime(100);
      await expect(promise).resolves.not.toThrow();
      const result = await promise;
      expect(result).toBeDefined();
    });
  });

  describe('Q8: trickyEventLoop() function', () => {
    test('BUG: should print in order: Start → Microtask → Timeout → End', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.useFakeTimers();
      
      trickyEventLoop();
      
      // Execute synchronous code first
      expect(consoleSpy).toHaveBeenCalledWith('Start');
      
      // Flush microtasks - they execute before macrotasks
      await Promise.resolve();
      
      // Advance timers to trigger timeouts
      jest.advanceTimersByTime(1);
      
      // Flush any remaining microtasks
      await Promise.resolve();
      
      const calls = consoleSpy.mock.calls.map(call => call[0]);
      // Expected order: Start → Microtask → Timeout → End
      // This will fail if order is wrong
      expect(calls[0]).toBe('Start');
      // Microtask should come before Timeout
      const microtaskIndex = calls.indexOf('Microtask');
      const timeoutIndex = calls.indexOf('Timeout');
      const endIndex = calls.indexOf('End');
      
      expect(microtaskIndex).toBeGreaterThan(-1);
      expect(timeoutIndex).toBeGreaterThan(-1);
      expect(endIndex).toBeGreaterThan(-1);
      expect(microtaskIndex).toBeLessThan(timeoutIndex);
      expect(timeoutIndex).toBeLessThan(endIndex);
      
      consoleSpy.mockRestore();
      jest.useRealTimers();
    });
  });

  describe('Q9: makeReactive() function', () => {
    test('BUG: should trigger callback when deep nested property changes', () => {
      const callback = jest.fn();
      const state = makeReactive({ user: { name: 'A' } }, callback);
      
      // This should trigger callback, but currently does NOT due to bug
      state.user.name = 'B';
      
      // Bug: callback should be called but isn't because proxy wasn't returned
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith('name', 'B');
    });

    test('BUG: should return proxied nested objects from get trap', () => {
      const callback = jest.fn();
      const state = makeReactive({ user: { profile: { age: 25 } } }, callback);
      
      // Access nested property
      const profile = state.user.profile;
      
      // Modify deep nested property - should trigger callback
      profile.age = 30;
      
      // This will fail if makeReactive doesn't return the proxied value
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith('age', 30);
    });

    test('BUG: should handle multiple levels of nesting', () => {
      const callback = jest.fn();
      const state = makeReactive({ 
        level1: { 
          level2: { 
            level3: { value: 'test' } 
          } 
        } 
      }, callback);
      
      state.level1.level2.level3.value = 'changed';
      
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith('value', 'changed');
    });
  });

  describe('Q10: safeStringify() function', () => {
    test('BUG: should handle circular references without crashing', () => {
      const a = {};
      a.self = a; // Circular reference
      
      // Should not throw error
      expect(() => safeStringify(a)).not.toThrow();
      
      const result = safeStringify(a);
      expect(result).toContain('[Circular]');
      expect(result).toContain('self');
    });

    test('BUG: should add objects to seen set before checking', () => {
      const a = {};
      a.self = a;
      
      const result = safeStringify(a);
      // Should return string with [Circular] marker
      expect(result).toBe('{"self":"[Circular]"}');
    });

    test('should stringify regular objects without circular refs', () => {
      const obj = { a: 1, b: 2 };
      const result = safeStringify(obj);
      expect(result).toBe('{"a":1,"b":2}');
    });

    test('BUG: should handle complex circular structures', () => {
      const a = { name: 'A' };
      const b = { name: 'B', ref: a };
      a.ref = b; // Circular: a -> b -> a
      
      expect(() => safeStringify(a)).not.toThrow();
      const result = safeStringify(a);
      expect(result).toContain('[Circular]');
    });

    test('BUG: should add to WeakSet before checking to prevent infinite recursion', () => {
      const obj = { a: 1 };
      obj.circular = obj;
      
      // Without adding to seen first, this would cause infinite recursion
      const result = safeStringify(obj);
      expect(typeof result).toBe('string');
      expect(result).toContain('[Circular]');
    });
  });

  describe('Q11: orderedFetch() function', () => {
    let originalFetch;
    let consoleSpy;

    beforeEach(() => {
      originalFetch = global.fetch;
      consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
      global.fetch = originalFetch;
      consoleSpy.mockRestore();
    });

    test('BUG: should await fetch before calling .text()', async () => {
      const urls = ['http://test1.com', 'http://test2.com'];
      
      global.fetch = jest.fn()
        .mockResolvedValueOnce({
          text: async () => 'result1'
        })
        .mockResolvedValueOnce({
          text: async () => 'result2'
        });

      await orderedFetch(urls);

      // Should not throw error about calling .text() on Promise
      expect(consoleSpy).toHaveBeenCalledTimes(2);
      expect(consoleSpy).toHaveBeenCalledWith('result1');
      expect(consoleSpy).toHaveBeenCalledWith('result2');
    });

    test('BUG: should return results in original URL order', async () => {
      const urls = ['http://slow.com', 'http://fast.com'];
      let callOrder = [];
      
      global.fetch = jest.fn((url) => {
        callOrder.push(url);
        // Make second URL resolve faster to test ordering
        const delay = url.includes('fast') ? 10 : 100;
        return new Promise(resolve => 
          setTimeout(() => resolve({ text: async () => url }), delay)
        );
      });

      await orderedFetch(urls);

      // Results should be in original order, even if fast.com resolves first
      expect(consoleSpy.mock.calls[0][0]).toBe('http://slow.com');
      expect(consoleSpy.mock.calls[1][0]).toBe('http://fast.com');
    });
  });

  describe('Q12: Dog class', () => {
    test('BUG: getName() should return the name, not undefined', () => {
      const dog = new Dog('Rocky');
      // getName() should return the name, not undefined
      expect(dog.getName()).toBe('Rocky');
      expect(dog.getName()).not.toBeUndefined();
    });

    test('BUG: bark() should use getName() correctly', () => {
      const dog = new Dog('Rocky');
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      dog.bark();
      
      // Should print "Rocky says woof!" not "undefined says woof!"
      expect(consoleSpy).toHaveBeenCalledWith('Rocky says woof!');
      expect(consoleSpy).not.toHaveBeenCalledWith('undefined says woof!');
      
      consoleSpy.mockRestore();
    });

    test('BUG: getName() must return the value from super.getName()', () => {
      const dog = new Dog('Max');
      // getName() should return the name from parent class
      const name = dog.getName();
      expect(name).toBe('Max');
      expect(typeof name).toBe('string');
    });
  });

  describe('Q13: detectLeak() function', () => {
    beforeEach(() => {
      // Clear body before each test
      document.body.innerHTML = '';
    });

    test('BUG: should clear references to allow garbage collection', () => {
      // The bug: nodes array still holds references after remove()
      // This prevents garbage collection even though nodes are removed from DOM
      const initialCount = document.body.children.length;
      detectLeak();
      
      // DOM nodes should be removed (this works)
      expect(document.body.children.length).toBe(initialCount);
      
      // The actual bug: nodes array still references the removed nodes
      // We can't directly test GC, but we can verify the function doesn't clear the array
      // The function should clear nodes.length = 0 or nodes.splice(0) to clear references
    });

    test('BUG: nodes array should be cleared to prevent memory leaks', () => {
      // The bug is that const nodes = [...] still holds references
      // Even though nodes are removed from DOM, they can't be GC'd
      // The function should clear the array: nodes.length = 0 or nodes.splice(0)
      const initialCount = document.body.children.length;
      detectLeak();
      
      // DOM check passes, but memory leak exists
      expect(document.body.children.length).toBe(initialCount);
      
      // Note: We can't directly test GC in JavaScript tests
      // The bug is that the nodes array maintains references
      // Fixed code should clear the array after removing from DOM
    });

    test('BUG: should remove all created nodes from DOM', () => {
      const initialCount = document.body.children.length;
      detectLeak();
      
      // Should remove all 10 nodes that were created
      expect(document.body.children.length).toBe(initialCount);
      
      // Verify no nodes with the created IDs remain
      for (let i = 0; i < 10; i++) {
        expect(document.getElementById(`node-${i}`)).toBeNull();
      }
    });

    test('BUG: function source should contain code to clear the nodes array', () => {
      // Check that the function source code contains proper array clearing
      const functionSource = detectLeak.toString();
      const normalizedSource = functionSource.replace(/\s+/g, ' ');
      
      // Should have one of these patterns to clear the array:
      // - nodes.length = 0
      // - nodes.splice(0)
      // - nodes.splice(0, nodes.length)
      // - while (nodes.length) nodes.pop()
      const clearsArray = /nodes\.length\s*=\s*0/.test(normalizedSource) ||
                         /nodes\.splice\s*\(\s*0\s*\)/.test(normalizedSource) ||
                         /nodes\.splice\s*\(\s*0\s*,\s*nodes\.length\s*\)/.test(normalizedSource) ||
                         /while\s*\(\s*nodes\.length\s*\)\s*nodes\.pop\s*\(\)/.test(normalizedSource);
      
      expect(clearsArray).toBe(true);
    });

    test('BUG: should clear array references after removing nodes', () => {
      // The function should clear the nodes array after removing from DOM
      // This test verifies the source code has the fix
      const functionSource = detectLeak.toString();
      const normalizedSource = functionSource.replace(/\s+/g, ' ');
      
      // Check that seen.add appears before seen.has (if using WeakSet pattern)
      // OR check that array clearing happens after forEach remove
      const hasRemove = normalizedSource.includes('forEach') && normalizedSource.includes('remove');
      const hasArrayClearing = /nodes\.length\s*=\s*0/.test(normalizedSource) ||
                               /nodes\.splice\s*\(\s*0\s*\)/.test(normalizedSource) ||
                               /nodes\.splice\s*\(\s*0\s*,\s*nodes\.length\s*\)/.test(normalizedSource);
      
      // Array clearing should come after the remove operation
      const removeIndex = normalizedSource.indexOf('forEach');
      const clearIndex = normalizedSource.indexOf('nodes.length') !== -1 ? normalizedSource.indexOf('nodes.length') :
                        normalizedSource.indexOf('nodes.splice') !== -1 ? normalizedSource.indexOf('nodes.splice') : -1;
      
      expect(hasRemove).toBe(true);
      expect(hasArrayClearing).toBe(true);
      if (clearIndex !== -1) {
        expect(clearIndex).toBeGreaterThan(removeIndex);
      }
    });

    test('should work correctly when called multiple times', () => {
      const initialCount = document.body.children.length;
      
      // Call multiple times
      detectLeak();
      expect(document.body.children.length).toBe(initialCount);
      
      detectLeak();
      expect(document.body.children.length).toBe(initialCount);
      
      detectLeak();
      expect(document.body.children.length).toBe(initialCount);
      
      // All nodes should be cleaned up each time
      for (let i = 0; i < 10; i++) {
        expect(document.getElementById(`node-${i}`)).toBeNull();
      }
    });

    test('BUG: should log "No leaks detected" after proper cleanup', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      detectLeak();
      
      // Should log the message
      expect(consoleSpy).toHaveBeenCalledWith('No leaks detected');
      
      consoleSpy.mockRestore();
    });

    test('BUG: created nodes should not persist in DOM after function execution', () => {
      // Create some initial elements
      const initialEl = document.createElement('div');
      initialEl.id = 'initial-element';
      document.body.appendChild(initialEl);
      
      const initialCount = document.body.children.length;
      
      detectLeak();
      
      // Should have only the initial element, not the 10 created nodes
      expect(document.body.children.length).toBe(initialCount);
      expect(document.getElementById('initial-element')).not.toBeNull();
      
      // Clean up
      initialEl.remove();
    });
  });

  describe('Q14: LRUCache class', () => {
    test('BUG: should evict oldest (first) key when limit exceeded', () => {
      const cache = new LRUCache(3);
      
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      cache.set('d', 4); // Should evict 'a' (oldest)
      
      expect(cache.get('a')).toBeNull(); // Should be evicted
      expect(cache.get('b')).toBe(2);
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    test('BUG: should use Map iterator correctly to get first key', () => {
      const cache = new LRUCache(2);
      
      cache.set('first', 1);
      cache.set('second', 2);
      cache.set('third', 3); // Should evict 'first'
      
      // cache.keys()[0] doesn't work - need to use iterator
      expect(cache.get('first')).toBeNull();
      expect(cache.get('second')).toBe(2);
      expect(cache.get('third')).toBe(3);
    });

    test('BUG: should maintain LRU order correctly', () => {
      const cache = new LRUCache(3);
      
      cache.set('a', 1);
      cache.set('b', 2);
      cache.set('c', 3);
      
      // Access 'a' to make it most recently used
      cache.get('a');
      
      // Now add 'd' - should evict 'b' (least recently used), not 'a'
      cache.set('d', 4);
      
      expect(cache.get('a')).toBe(1); // Should still exist
      expect(cache.get('b')).toBeNull(); // Should be evicted
      expect(cache.get('c')).toBe(3);
      expect(cache.get('d')).toBe(4);
    });

    test('BUG: should correctly identify first key in Map for eviction', () => {
      const cache = new LRUCache(2);
      
      cache.set('x', 1);
      cache.set('y', 2);
      cache.set('z', 3); // Should evict 'x'
      
      // The bug is using cache.keys()[0] which returns undefined
      // Should use iterator: cache.keys().next().value
      expect(cache.get('x')).toBeNull();
      expect(cache.get('y')).toBe(2);
      expect(cache.get('z')).toBe(3);
    });
  });

  describe('Q15: mergeUserData() function', () => {
    test('BUG: should merge objects normally', () => {
      const target = { name: 'John', age: 30 };
      const source = { city: 'NYC', age: 31 };
      const merged = mergeUserData(target, source);
      
      expect(merged.name).toBe('John');
      expect(merged.city).toBe('NYC');
      expect(merged.age).toBe(31); // source should override target
    });

    test('BUG: should prevent prototype pollution from __proto__ keys', () => {
      // This is the critical security test
      const maliciousPayload = JSON.parse('{"__proto__": {"isAdmin": true}}');
      const testObj = {};
      
      mergeUserData(testObj, maliciousPayload);
      
      // Prototype should NOT be polluted
      // If buggy, ({}).isAdmin would be true
      expect(({}).isAdmin).toBeUndefined();
      expect(Object.prototype.isAdmin).toBeUndefined();
    });

    test('BUG: should prevent prototype pollution from constructor.prototype', () => {
      // Another common prototype pollution vector
      const maliciousPayload = JSON.parse('{"constructor": {"prototype": {"isAdmin": true}}}');
      const testObj = {};
      
      mergeUserData(testObj, maliciousPayload);
      
      // Prototype should NOT be polluted
      expect(({}).isAdmin).toBeUndefined();
    });

    test('BUG: function should filter out dangerous keys', () => {
      // Check function source code for protection mechanisms
      const functionSource = mergeUserData.toString();
      const normalizedSource = functionSource.replace(/\s+/g, ' ');
      
      // Function must explicitly check for and exclude __proto__ key
      // Must have: key !== '__proto__' or key != '__proto__'
      const hasProtoCheck = /key\s*[!=]+=\s*['"]__proto__['"]/.test(normalizedSource);
      
      // Function must also check for constructor key
      // Must have: key !== 'constructor' or key != 'constructor'
      const hasConstructorCheck = /key\s*[!=]+=\s*['"]constructor['"]/.test(normalizedSource);
      
      // Should NOT have placeholder characters like ***
      const hasPlaceholders = /key\s*[!=]=\s*['"]\*\*\*['"]/.test(normalizedSource);
      
      // Function should use hasOwnProperty or Object.keys to prevent prototype pollution
      const usesSafeMethod = /hasOwnProperty|Object\.keys|Object\.entries/i.test(normalizedSource);
      
      expect(hasProtoCheck).toBe(true);
      expect(hasConstructorCheck).toBe(true);
      expect(hasPlaceholders).toBe(false); // Should NOT have placeholders
      expect(usesSafeMethod).toBe(true);
    });

    test('BUG: should handle nested objects safely', () => {
      const target = { user: { name: 'John' } };
      const source = { user: { age: 30 } };
      const merged = mergeUserData(target, source);
      
      expect(merged.user.name).toBe('John');
      expect(merged.user.age).toBe(30);
    });

    test('BUG: should not allow __proto__ to modify Object.prototype', () => {
      // Clear any previous pollution
      delete Object.prototype.isAdmin;
      delete Object.prototype.polluted;
      
      // Attempt prototype pollution
      const payload1 = JSON.parse('{"__proto__": {"isAdmin": true}}');
      const payload2 = JSON.parse('{"__proto__": {"polluted": true}}');
      
      mergeUserData({}, payload1);
      mergeUserData({}, payload2);
      
      // Object.prototype should remain clean
      expect(Object.prototype.isAdmin).toBeUndefined();
      expect(Object.prototype.polluted).toBeUndefined();
      expect(({}).isAdmin).toBeUndefined();
      expect(({}).polluted).toBeUndefined();
    });

    test('should merge arrays correctly', () => {
      const target = { items: [1, 2] };
      const source = { items: [3, 4] };
      const merged = mergeUserData(target, source);
      
      // Arrays should be replaced, not merged
      expect(merged.items).toEqual([3, 4]);
    });

    test('BUG: should handle empty objects', () => {
      const merged = mergeUserData({}, {});
      expect(merged).toEqual({});
      expect(typeof merged).toBe('object');
    });
  });
});
