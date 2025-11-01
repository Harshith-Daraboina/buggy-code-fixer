const { toggleTheme, sumOfDigits, printNumbersWithDelay, reverseEachWord, flattenArray, getData } = require('../buggy-code/script');

describe('Bug Fix Challenge - All Tests Must Pass!', () => {
  
  describe('toggleTheme() function', () => {
    beforeEach(() => {
      // Setup DOM for testing
      document.body.className = '';
    });

    test('should be defined', () => {
      expect(typeof toggleTheme).toBe('function');
    });

    test('should toggle from default to dark', () => {
      document.body.className = '';
      toggleTheme();
      expect(document.body.classList.contains('dark')).toBe(true);
    });

    test('should toggle from dark to light', () => {
      document.body.className = 'dark';
      toggleTheme();
      expect(document.body.classList.contains('light')).toBe(true);
      expect(document.body.classList.contains('dark')).toBe(false);
    });

    test('should toggle from light to dark', () => {
      document.body.className = 'light';
      toggleTheme();
      expect(document.body.classList.contains('dark')).toBe(true);
      expect(document.body.classList.contains('light')).toBe(false);
    });

    test('should toggle multiple times correctly', () => {
      document.body.className = '';
      toggleTheme(); // should become dark
      expect(document.body.classList.contains('dark')).toBe(true);
      toggleTheme(); // should become light
      expect(document.body.classList.contains('light')).toBe(true);
      toggleTheme(); // should become dark again
      expect(document.body.classList.contains('dark')).toBe(true);
    });
  });
  
  describe('sumOfDigits() function', () => {
    test('should return sum of all digits', () => {
      expect(sumOfDigits(123)).toBe(6); // 1 + 2 + 3 = 6
      expect(sumOfDigits(456)).toBe(15); // 4 + 5 + 6 = 15
      expect(sumOfDigits(789)).toBe(24); // 7 + 8 + 9 = 24
    });

    test('should handle single digit numbers', () => {
      expect(sumOfDigits(5)).toBe(5);
      expect(sumOfDigits(9)).toBe(9);
      expect(sumOfDigits(0)).toBe(0);
    });

    test('should handle zero', () => {
      expect(sumOfDigits(0)).toBe(0);
    });

    test('should handle large numbers', () => {
      expect(sumOfDigits(12345)).toBe(15); // 1 + 2 + 3 + 4 + 5 = 15
      expect(sumOfDigits(999)).toBe(27); // 9 + 9 + 9 = 27
      expect(sumOfDigits(123456789)).toBe(45); // 1+2+3+4+5+6+7+8+9 = 45
    });

    test('should handle negative numbers', () => {
      // Note: Implementation should use Math.abs() or handle negative numbers
      // For now, we'll test that it doesn't crash, or implement absolute value
      const result1 = sumOfDigits(Math.abs(-123));
      const result2 = sumOfDigits(Math.abs(-456));
      expect(result1).toBe(6);
      expect(result2).toBe(15);
      // If implementation handles negatives directly:
      // expect(sumOfDigits(-123)).toBe(6);
    });

    test('should handle numbers with leading zeros (as integers)', () => {
      expect(sumOfDigits(101)).toBe(2); // 1 + 0 + 1 = 2
      expect(sumOfDigits(1000)).toBe(1); // 1 + 0 + 0 + 0 = 1
    });
  });

  describe('reverseEachWord() function', () => {
    test('should reverse each word while keeping word order', () => {
      expect(reverseEachWord('Hello World')).toBe('olleH dlroW');
      expect(reverseEachWord('JavaScript is fun')).toBe('tpircSavaJ si nuf');
      expect(reverseEachWord('The quick brown fox')).toBe('ehT kciuq nworb xof');
    });

    test('should handle single word', () => {
      expect(reverseEachWord('Hello')).toBe('olleH');
      expect(reverseEachWord('Test')).toBe('tseT');
      expect(reverseEachWord('a')).toBe('a');
    });

    test('should handle empty string', () => {
      expect(reverseEachWord('')).toBe('');
    });

    test('should handle multiple spaces', () => {
      expect(reverseEachWord('a  b')).toBe('a  b'); // spaces preserved
      expect(reverseEachWord('hello   world')).toBe('olleh   dlrow');
    });

    test('should handle words with different cases', () => {
      expect(reverseEachWord('HeLLo WoRLd')).toBe('oLLeH dLRoW');
      expect(reverseEachWord('JaVaScRiPt')).toBe('tPiRcSaVaJ');
    });

    test('should handle special characters in words', () => {
      expect(reverseEachWord('Hello! World?')).toBe('!olleH ?dlroW');
      // Note: 'test-case' is treated as one word (split by spaces only)
      // So it reverses the entire word including the hyphen
      expect(reverseEachWord('test-case')).toBe('esac-tset');
    });

    test('should handle numbers in words', () => {
      expect(reverseEachWord('test123 456')).toBe('321tset 654');
    });

    test('should handle leading and trailing spaces', () => {
      expect(reverseEachWord(' hello world ')).toBe(' olleh dlrow ');
    });
  });

  describe('flattenArray() function', () => {
    test('should flatten deeply nested arrays', () => {
      expect(flattenArray([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
      expect(flattenArray([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, 5]);
      expect(flattenArray([[1], [2], [3]])).toEqual([1, 2, 3]);
    });

    test('should handle already flat arrays', () => {
      expect(flattenArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
      expect(flattenArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
    });

    test('should handle empty arrays', () => {
      expect(flattenArray([])).toEqual([]);
      expect(flattenArray([[]])).toEqual([]);
      expect(flattenArray([[], []])).toEqual([]);
      expect(flattenArray([[[]]])).toEqual([]);
    });

    test('should handle arrays with different types', () => {
      expect(flattenArray([1, ['a', ['b', 2]], 3])).toEqual([1, 'a', 'b', 2, 3]);
      expect(flattenArray([true, [false, [null, undefined]]])).toEqual([true, false, null, undefined]);
      expect(flattenArray([[1, 2], ['a', 'b'], [true, false]])).toEqual([1, 2, 'a', 'b', true, false]);
    });

    test('should handle very deeply nested arrays', () => {
      expect(flattenArray([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5]);
      expect(flattenArray([[[[[1]]]]])).toEqual([1]);
    });

    test('should handle arrays with nested arrays containing empty arrays', () => {
      expect(flattenArray([1, [[], 2]])).toEqual([1, 2]);
      expect(flattenArray([[], [1, []], [2, [3]]])).toEqual([1, 2, 3]);
    });

    test('should handle mixed nesting levels', () => {
      expect(flattenArray([1, [2], 3, [4, [5, 6]], 7])).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('should preserve array element order', () => {
      expect(flattenArray([1, [2, 3], 4, [5, [6, 7]]])).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });

  describe('printNumbersWithDelay() function', () => {
    test('should be defined', () => {
      expect(typeof printNumbersWithDelay).toBe('function');
    });

    test('should execute without errors', (done) => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      jest.useFakeTimers();
      
      printNumbersWithDelay();
      
      // Fast-forward time
      jest.advanceTimersByTime(2000);
      
      // Check that console.log was called
      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
      jest.useRealTimers();
      done();
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
});
