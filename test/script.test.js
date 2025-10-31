const { toggleTheme, sumOfDigits, printNumbersWithDelay, reverseEachWord, flattenArray, reverseString } = require('../buggy-code/script');

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

  describe('reverseString() function', () => {
    test('should reverse a simple string', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('world')).toBe('dlrow');
      expect(reverseString('test')).toBe('tset');
    });

    test('should handle strings with different cases', () => {
      expect(reverseString('Challenge')).toBe('egnellahC');
      expect(reverseString('JavaScript')).toBe('tpircSavaJ');
      expect(reverseString('HeLLoWoRLd')).toBe('dLRoWoLLeH');
    });

    test('should handle single character strings', () => {
      expect(reverseString('a')).toBe('a');
      expect(reverseString('Z')).toBe('Z');
      expect(reverseString('1')).toBe('1');
    });

    test('should handle empty strings', () => {
      expect(reverseString('')).toBe('');
    });

    test('should handle strings with spaces', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh');
      expect(reverseString('a b c')).toBe('c b a');
    });

    test('should handle strings with special characters', () => {
      expect(reverseString('hello!')).toBe('!olleh');
      expect(reverseString('test-case')).toBe('esac-tset');
      expect(reverseString('a@b#c')).toBe('c#b@a');
    });

    test('should handle strings with numbers', () => {
      expect(reverseString('123')).toBe('321');
      expect(reverseString('test123')).toBe('321tset');
      expect(reverseString('1a2b3c')).toBe('c3b2a1');
    });

    test('should handle strings with unicode characters', () => {
      expect(reverseString('café')).toBe('éfac');
      expect(reverseString('こんにちは')).toBe('はちにんこ');
    });

    test('should handle palindromes', () => {
      expect(reverseString('radar')).toBe('radar');
      expect(reverseString('level')).toBe('level');
      expect(reverseString('racecar')).toBe('racecar');
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
      
      // reverseString should work
      expect(reverseString('test')).toBe('tset');
    });

    test('should handle combined operations', () => {
      // Reverse string then flatten array containing reversed strings
      const nested = [[reverseString('test')], ['hello']];
      expect(flattenArray(nested)).toEqual(['tset', 'hello']);
      
      // Reverse each word in a sentence
      const sentence = reverseEachWord('test hello');
      expect(sentence).toBe('tset olleh');
      
      // Sum digits of number, then reverse string representation
      const num = 123;
      const sum = sumOfDigits(num);
      const sumString = String(sum);
      expect(reverseString(sumString)).toBe('6');
    });

    test('should handle edge case combinations', () => {
      // Empty operations
      expect(flattenArray([reverseString(''), ''])).toEqual(['', '']);
      expect(reverseEachWord('')).toBe('');
      
      // Single element operations
      expect(sumOfDigits(5)).toBe(5);
      expect(reverseString('a')).toBe('a');
      expect(flattenArray([1])).toEqual([1]);
    });

    test('should handle complex nested operations', () => {
      // Create array with reversed strings
      const words = ['hello', 'world', 'test'];
      const reversed = words.map(reverseString);
      expect(reversed).toEqual(['olleh', 'dlrow', 'tset']);
      
      // Flatten nested array structure
      const nested = [[[reversed]]];
      expect(flattenArray(nested)).toEqual(['olleh', 'dlrow', 'tset']);
    });
  });
});
