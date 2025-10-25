const { sum, multiply, isEven, findMax, reverseString } = require('../buggy-code/script');

describe('Bug Fix Challenge - All Tests Must Pass!', () => {
  
  describe('sum() function', () => {
    test('should add two positive numbers correctly', () => {
      expect(sum(2, 3)).toBe(5);
    });

    test('should handle negative numbers', () => {
      expect(sum(-5, 3)).toBe(-2);
      expect(sum(10, -5)).toBe(5);
    });

    test('should handle zero', () => {
      expect(sum(0, 5)).toBe(5);
      expect(sum(5, 0)).toBe(5);
      expect(sum(0, 0)).toBe(0);
    });
  });

  describe('multiply() function', () => {
    test('should multiply two positive numbers correctly', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    test('should handle negative numbers', () => {
      expect(multiply(-2, 5)).toBe(-10);
      expect(multiply(-3, -4)).toBe(12);
    });

    test('should handle zero', () => {
      expect(multiply(0, 100)).toBe(0);
      expect(multiply(100, 0)).toBe(0);
    });
  });

  describe('isEven() function', () => {
    test('should return true for even numbers', () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(4)).toBe(true);
      expect(isEven(0)).toBe(true);
      expect(isEven(-4)).toBe(true);
    });

    test('should return false for odd numbers', () => {
      expect(isEven(1)).toBe(false);
      expect(isEven(5)).toBe(false);
      expect(isEven(-3)).toBe(false);
    });
  });

  describe('findMax() function', () => {
    test('should find the maximum in an array of positive numbers', () => {
      expect(findMax([1, 5, 3, 9, 2])).toBe(9);
      expect(findMax([100, 50, 200, 75])).toBe(200);
    });

    test('should handle negative numbers', () => {
      expect(findMax([-10, -5, -8])).toBe(-5);
      expect(findMax([-100, -50, -200])).toBe(-50);
    });

    test('should work with single element arrays', () => {
      expect(findMax([42])).toBe(42);
      expect(findMax([-42])).toBe(-42);
    });

    test('should handle mixed positive and negative numbers', () => {
      expect(findMax([-10, 0, 10, -5])).toBe(10);
    });
  });

  describe('reverseString() function', () => {
    test('should reverse a simple string', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('world')).toBe('dlrow');
    });

    test('should handle strings with different cases', () => {
      expect(reverseString('Challenge')).toBe('egnellahC');
      expect(reverseString('JavaScript')).toBe('tpircSavaJ');
    });

    test('should handle single character strings', () => {
      expect(reverseString('a')).toBe('a');
      expect(reverseString('Z')).toBe('Z');
    });

    test('should handle empty strings', () => {
      expect(reverseString('')).toBe('');
    });

    test('should handle strings with spaces', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh');
    });
  });

  describe('Edge Cases and Integration', () => {
    test('should handle all functions working together', () => {
      // Sum should work
      expect(sum(5, 7)).toBe(12);
      
      // Multiply should work
      expect(multiply(3, 8)).toBe(24);
      
      // isEven should work
      expect(isEven(sum(2, 4))).toBe(true); // 6 is even
      
      // findMax should work
      expect(findMax([sum(1, 2), multiply(2, 3), 10])).toBe(10);
      
      // reverseString should work
      expect(reverseString('test')).toBe('tset');
    });
  });
});
