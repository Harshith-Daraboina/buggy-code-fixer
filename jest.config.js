module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/test/**/*.test.js'],
  collectCoverageFrom: [
    'buggy-code-here-come-fix-my-script-js/**/*.js',
    '!**/node_modules/**'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  verbose: false,
  bail: false,
  testTimeout: 5000,
  setupFilesAfterEnv: [],
  silent: false,
  reporters: [
    ['<rootDir>/scripts/jest-summary-reporter.js', {}]
  ]
};
