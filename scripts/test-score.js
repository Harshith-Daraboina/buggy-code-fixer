#!/usr/bin/env node

/**
 * Test Score Calculator
 * Parses Jest test output and displays test scores in the format:
 * Tests: X failed, Y passed, Z total
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function calculateTestScore() {
  try {
    // Run Jest with JSON output (capture both stdout and stderr)
    // Jest outputs JSON to stdout, but errors might go to stderr
    let jestOutput;
    try {
      jestOutput = execSync('npm test -- --json --silent', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
    } catch (error) {
      // If command fails, try to get output from error object
      jestOutput = error.stdout || error.stderr || '';
      if (!jestOutput || !jestOutput.trim()) {
        throw error;
      }
    }

    // Parse JSON output - might be in stdout or need cleaning
    let testResults;
    try {
      // Try to find JSON in the output (might have extra text)
      const jsonMatch = jestOutput.match(/\{[\s\S]*"numTotalTests"[\s\S]*\}/);
      if (jsonMatch) {
        testResults = JSON.parse(jsonMatch[0]);
      } else {
        testResults = JSON.parse(jestOutput);
      }
    } catch (parseError) {
      // If JSON parsing fails, try running tests again without --json to parse text output
      console.log('⚠️  Could not parse JSON output, parsing text output...');
      const textOutput = execSync('npm test', {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      // Parse text output
      const failedMatch = textOutput.match(/(\d+)\s+failed/);
      const passedMatch = textOutput.match(/(\d+)\s+passed/);
      const totalMatch = textOutput.match(/Tests:\s+(\d+)\s+failed,\s+(\d+)\s+passed,\s+(\d+)\s+total/) || 
                        textOutput.match(/(\d+)\s+total/);
      
      if (failedMatch && passedMatch && totalMatch) {
        const numFailedTests = parseInt(failedMatch[1]);
        const numPassedTests = parseInt(passedMatch[1]);
        const numTotalTests = totalMatch[3] ? parseInt(totalMatch[3]) : (numFailedTests + numPassedTests);
        
        const scoreLine = `Tests:       ${numFailedTests} failed, ${numPassedTests} passed, ${numTotalTests} total`;
        
        console.log('');
        console.log('════════════════════════════════════════════════════════════');
        console.log('📊 TEST SCORE SUMMARY');
        console.log('════════════════════════════════════════════════════════════');
        console.log(scoreLine);
        console.log('════════════════════════════════════════════════════════════');
        console.log('');

        return numFailedTests > 0 ? 1 : 0;
      }
      throw parseError;
    }

    // Calculate scores
    const numTestSuites = testResults.numTotalTestSuites || 0;
    const numPassedTestSuites = testResults.numPassedTestSuites || 0;
    const numFailedTestSuites = testResults.numFailedTestSuites || 0;

    const numTotalTests = testResults.numTotalTests || 0;
    const numPassedTests = testResults.numPassedTests || 0;
    const numFailedTests = testResults.numFailedTests || 0;

    // Format output in the exact format requested
    const scoreLine = `Tests:       ${numFailedTests} failed, ${numPassedTests} passed, ${numTotalTests} total`;
    
    console.log('');
    console.log('════════════════════════════════════════════════════════════');
    console.log('📊 TEST SCORE SUMMARY');
    console.log('════════════════════════════════════════════════════════════');
    console.log(scoreLine);
    console.log(`Test Suites: ${numFailedTestSuites} failed, ${numPassedTestSuites} passed, ${numTestSuites} total`);
    console.log('════════════════════════════════════════════════════════════');
    console.log('');

    // Return exit code based on test results
    return numFailedTests > 0 ? 1 : 0;
  } catch (error) {
    // If Jest fails to run, try to parse stderr or output
    try {
      const output = error.stdout || error.stderr || error.message;
      
      // Try to extract numbers from Jest output
      const failedMatch = output.match(/(\d+)\s+failed/i);
      const passedMatch = output.match(/(\d+)\s+passed/i);
      const totalMatch = output.match(/(\d+)\s+total/i);

      if (failedMatch && passedMatch && totalMatch) {
        const failed = parseInt(failedMatch[1]);
        const passed = parseInt(passedMatch[1]);
        const total = parseInt(totalMatch[1]);

        const scoreLine = `Tests:       ${failed} failed, ${passed} passed, ${total} total`;
        
        console.log('');
        console.log('════════════════════════════════════════════════════════════');
        console.log('📊 TEST SCORE SUMMARY');
        console.log('════════════════════════════════════════════════════════════');
        console.log(scoreLine);
        console.log('════════════════════════════════════════════════════════════');
        console.log('');

        return failed > 0 ? 1 : 0;
      }
      
      // If we can't parse, try running tests again to get output
      console.error('⚠️  Could not parse test results. Running tests again...');
      execSync('npm test', { stdio: 'inherit' });
      return 1;
    } catch (parseError) {
      // If parsing fails, show error
      console.error('❌ Error calculating test score:', error.message);
      console.error('   Try running: npm test');
      return 1;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const exitCode = calculateTestScore();
  process.exit(exitCode);
}

module.exports = { calculateTestScore };

