# Udemy Results Page Extractor — Instructions

## How it works
Finish and submit a practice test on Udemy. The results page shows all questions, correct answers, and explanations at once. Run the extractor script on that page to download a JSON file ready to drop into `src/data/sets/`.

## Script
`udemy-results-extractor.js` — defines `window.extractResults(id, collection, title, filename)`.

## Steps

### 1. Get the results page URL
After submitting a test, copy the URL from the browser. It looks like:
```
https://ctc-ufb.udemy.com/course/<slug>/learn/quiz/<quiz-id>/result/<result-id>?expanded=<result-id>#overview
```

### 2. Navigate and wait for the page to load
```js
await new Promise(r => setTimeout(r, 5000));
document.querySelectorAll('[class*="question-result-pane-wrapper"]').length;
// Should equal the number of questions (e.g. 65)
```

### 3. Inject the script and run
Read `udemy-results-extractor.js`, inject its contents, then call with the correct metadata:
```js
extractResults(
  'aws-ai-scraped-practitioner-test-1',  // id
  'AWS AI Practitioner',                  // collection
  'Scraped Practitioner Test 1',          // title
  'scraped-aws-ai-practitioner-test-1.json' // filename
)
```

### 4. Move the file into the app
Move the downloaded file from `~/Downloads` directly into `src/data/sets/`.

---

## Call reference

```js
// AWS AI Practitioner
extractResults('aws-ai-scraped-practitioner-test-1', 'AWS AI Practitioner', 'Scraped Practitioner Test 1', 'scraped-aws-ai-practitioner-test-1.json')
extractResults('aws-ai-scraped-practitioner-test-2', 'AWS AI Practitioner', 'Scraped Practitioner Test 2', 'scraped-aws-ai-practitioner-test-2.json')
extractResults('aws-ai-scraped-practitioner-test-3', 'AWS AI Practitioner', 'Scraped Practitioner Test 3', 'scraped-aws-ai-practitioner-test-3.json')
extractResults('aws-ai-scraped-practitioner-test-4', 'AWS AI Practitioner', 'Scraped Practitioner Test 4', 'scraped-aws-ai-practitioner-test-4.json')

// AWS Generative AI Developer
extractResults('aws-gen-ai-dev-scraped-test-1', 'AWS Generative AI Developer', 'Scraped Gen AI Dev Test 1', 'aws-gen-ai-dev-scraped-test-1.json')
extractResults('aws-gen-ai-dev-scraped-test-2', 'AWS Generative AI Developer', 'Scraped Gen AI Dev Test 2', 'aws-gen-ai-dev-scraped-test-2.json')
```

---

## Gotchas
- **All questions must be expanded** before running — the page defaults to this, just confirm.
- **Empty explanations**: Udemy doesn't explain every incorrect choice. Some `explanation` fields will be `""` — that's expected.
- **Downloads blocked**: If Chrome blocks the download, go to lock icon → Site settings → Automatic downloads → Allow.
- **Page not loaded**: If question count is 0, wait a few more seconds and check again.
