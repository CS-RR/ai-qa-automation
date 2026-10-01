const fs = require('fs');
const resultsPath = 'results/crud-results.json';

function resetResults() {
  fs.writeFileSync(resultsPath, JSON.stringify({}, null, 2));
}

function saveResult(testName, status, passed, body) {
  let results = {};
  if (fs.existsSync(resultsPath)) {
    results = JSON.parse(fs.readFileSync(resultsPath, 'utf-8'));
  }
  results[testName] = {
    status,
    passed,
    timestamp: new Date().toISOString(),
    response: body
  };
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
}

module.exports = { resetResults, saveResult };