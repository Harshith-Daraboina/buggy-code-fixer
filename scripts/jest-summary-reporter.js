/**
 * Custom Jest Reporter - Shows all tests with checkmarks and crosses
 */

class SummaryReporter {
  constructor(globalConfig, options) {
    this.globalConfig = globalConfig;
    this.options = options;
  }

  onRunComplete(contexts, results) {
    const { numFailedTests, numPassedTests, numTotalTests, testResults } = results;
    
    // Group tests by question/section
    const testGroups = new Map();
    
    testResults.forEach(testResult => {
      if (testResult.testResults) {
        testResult.testResults.forEach(test => {
          // Get the question-level describe block (usually the last one, or one with Q\d+:)
          let groupName = 'Other';
          if (test.ancestorTitles && test.ancestorTitles.length > 0) {
            // Look for question pattern in all ancestors, prefer the question-level one
            const questionLevel = test.ancestorTitles.find(title => /Q\d+:/i.test(title));
            if (questionLevel) {
              groupName = questionLevel;
            } else {
              // Use the last ancestor (innermost describe) if no question found
              groupName = test.ancestorTitles[test.ancestorTitles.length - 1];
            }
          }
          
          if (!testGroups.has(groupName)) {
            testGroups.set(groupName, []);
          }
          
          testGroups.get(groupName).push(test);
        });
      }
    });

    // Print summary header
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`\nTests: ${numFailedTests} failed, ${numPassedTests} passed, ${numTotalTests} total\n`);
    
    // Show all results grouped by question/section (similar to Jest's output)
    const sortedGroups = Array.from(testGroups.entries()).sort((a, b) => {
      // Extract question number for sorting
      const aMatch = a[0].match(/Q(\d+):/);
      const bMatch = b[0].match(/Q(\d+):/);
      if (aMatch && bMatch) {
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      }
      if (aMatch) return -1;
      if (bMatch) return 1;
      return a[0].localeCompare(b[0]);
    });

    // Show all groups with their tests
    sortedGroups.forEach(([groupName, tests]) => {
      console.log(`  ${groupName}\n`);
      
      // Show all tests (both passed and failed)
      tests.forEach(test => {
        const time = test.duration ? ` (${test.duration} ms)` : '';
        if (test.status === 'passed') {
          console.log(`    ✓ ${test.title}${time}`);
        } else if (test.status === 'failed') {
          console.log(`    ✕ ${test.title}${time}`);
        }
      });
      
      console.log('');
    });
    
    // Show summary of failed question numbers
    const failedQuestions = [];
    sortedGroups.forEach(([groupName, tests]) => {
      const hasFailures = tests.some(t => t.status === 'failed');
      if (hasFailures) {
        const qMatch = groupName.match(/Q(\d+):/);
        if (qMatch) {
          failedQuestions.push(`Q${qMatch[1]}`);
        }
      }
    });
    
    if (failedQuestions.length > 0) {
      console.log(`Failed Questions: ${failedQuestions.join(', ')}`);
      console.log('');
    }
    
    if (numFailedTests === 0) {
      console.log('✅ All tests passed!');
    }
    
    console.log('='.repeat(60) + '\n');
  }
}

module.exports = SummaryReporter;
