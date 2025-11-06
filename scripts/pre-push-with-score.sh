#!/bin/bash

# Pre-push script with score calculation
# This can be run manually even when using --no-verify

echo "🔍 Running tests before push..."

# Run tests and save JSON output
npm test -- --json > jest-output.json 2>/dev/null || npm test

# Check if tests passed
TEST_EXIT_CODE=$?

# Calculate and display test scores
echo ""
node scripts/test-score.js

# Clean up
rm -f jest-output.json

# Exit with test result code
exit $TEST_EXIT_CODE

