# Udemy Practice Test Extractor — Instructions for New Session

## Goal
Collect all questions and answer choices from practice tests on Udemy Business, saving each as a separate JSON file in ~/Downloads.

## Tools Required
- Claude-in-Chrome browser extension (already installed and connected)
- Use `mcp__claude-in-chrome__*` tools for browser automation
- Use `mcp__claude-in-chrome__javascript_tool` to run extraction script

## The Extraction Script
The script `udemy-question-extractor.js` is saved in the same folder as this instructions file.
Read it first — it defines these functions on `window`:
- `window.extractCurrentQuestion()` — extracts question text + all options from current page
- `window.clickNext(currentQuestionNum)` — clicks next/skip, then waits until the page actually advances to a new question (polls up to 5s) before returning
- `window.collectAllQuestions(total)` — loops through all questions automatically
- `window.downloadQuestions(filename)` — triggers browser download of JSON file

---

## Step 0 — Gather info from the user

Before doing anything, ask the user for:

1. **Course URL** — the Udemy Business course page URL, e.g.:
   `https://ctc-ufb.udemy.com/course/some-course-name/`

2. **Which practice tests to collect** — e.g. "all of them", "tests 2, 3, and 4", or "just test 1"

3. **How many questions per test** — e.g. 65. Check this on the test selection screen (it shows "65 questions" under each mode card). Ask the user if unsure.

4. **Output filename prefix** — e.g. `aws-ai-practitioner` → files will be saved as `aws-ai-practitioner-test-1.json`, etc. Suggest a short slug based on the course name.

Do not proceed until you have at least the course URL and which tests to collect.

---

## Step-by-Step Process for Each Practice Test

### 1. Navigate to the course
Go to the course URL provided by the user. Udemy Business URLs follow the pattern:
```
https://ctc-ufb.udemy.com/course/<course-slug>/learn/quiz/<quiz-id>/test
```
If you don't have the quiz ID, navigate to the course overview page — the practice tests will be listed in the right sidebar under "Course content" → "Practice tests". Click any test to get to the quiz view.

### 2. Select the correct Practice Test
In the right sidebar under "Course content" → "Practice tests", click the target test.

### 3. Start the test
Choose **Practice mode**. If an instructions screen appears, click **Begin test**.
Make sure you are on Question 1 before running the script.

### 4. Inject and run the script
Use `javascript_tool` to:
1. First inject the full script content (read from udemy-question-extractor.js)
2. Then run (replace values with the user's input):
```js
collectAllQuestions(65).then(() => downloadQuestions('course-slug-test-1.json'))
```

### 5. Monitor progress
Check progress every ~15 seconds:
```js
`Collected: ${window.allQuestions?.length} / 65. Last: ${window.allQuestions?.slice(-1)[0]?.questionNum}`
```
The count should advance steadily with no stalls, since `clickNext` now waits for the page to actually change.

### 6. Verify after completion
Check the console for `Done! Collected <N> unique questions.`

Then verify (replace 65 with the actual question count):
```js
const total = 65;
const nums = window.allQuestions.map(q => parseInt(q.questionNum.replace('Question ', '')));
nums.sort((a,b) => a-b);
const missing = [];
for (let i = 1; i <= total; i++) { if (!nums.includes(i)) missing.push(i); }
const zeroOpts = window.allQuestions.filter(q => q.options.length === 0).map(q => q.questionNum);
`Total: ${window.allQuestions.length} | Missing: [${missing}] | Zero-opts: [${zeroOpts}]`
```
Expected output: `Total: <N> | Missing: [] | Zero-opts: []`

### 7. Download the file
The file is downloaded automatically after collection. If you need to re-download:
```js
downloadQuestions('course-slug-test-1.json')
```
Verify with: `ls -lh ~/Downloads/course-slug-test-*.json`

### 8. Handle missing questions (if any)
If the verify step shows missing question numbers, click each missing question in the left sidebar and run:
```js
const q = window.extractCurrentQuestion();
if (q && q.questionText && !window.allQuestions.find(x => x.questionNum === q.questionNum)) {
  window.allQuestions.push(q);
  console.log(`Added ${q.questionNum}. Total: ${window.allQuestions.length}`);
}
```
Then re-download once all are collected.

### 9. Repeat for remaining tests
Go back to step 2 for each remaining test, incrementing the filename (test-2, test-3, etc.).

---

## JSON Structure
Each file contains an array of questions:
```json
[
  {
    "questionNum": "Question 1",
    "questionText": "Full question text here...",
    "options": [
      { "label": "A", "text": "Option A text" },
      { "label": "B", "text": "Option B text" },
      { "label": "C", "text": "Option C text" },
      { "label": "D", "text": "Option D text" }
    ]
  }
]
```

---

## Known Gotchas
- **Unanswered questions**: show radio buttons instead of result panes — the script handles both formats
- **Page advance timing**: `clickNext` polls until the question number changes instead of using a fixed delay, so duplicates no longer consume loop slots
- **Skip button not clicking**: `.click()` silently fails when the button drifts to the viewport edge in Udemy's React layout. The script now uses `scrollIntoView` + `dispatchEvent(MouseEvent)` which is reliable. If you see "Warning: page did not advance" in the console, the old script was the culprit — re-inject the updated `udemy-question-extractor.js`.
- **Multiple downloads blocked**: Chrome asks "Allow ctc-ufb.udemy.com to download multiple files?" the first time. If you accidentally click **Block**, future `downloadQuestions()` calls will silently drop. Fix: click the lock icon in the address bar → Site settings → Automatic downloads → Allow.
- **Download blocked fallback**: if downloads are still being blocked after re-enabling, the data stays in `window.allQuestions`. Read it out by logging in chunks and reassembling (see Step 7 notes).
- **Tool output truncation**: never try to read the full JSON through javascript_tool output — always use `downloadQuestions()` to save via browser download instead
- **Tab management**: always use `tabs_context_mcp` first, then `tabs_create_mcp` to create a fresh tab for this session
- **Instructions screen**: some tests show a "Begin test" screen before Question 1 — click it before injecting the script
- **Duplicate downloads**: if you download twice, the browser saves as `filename (1).json` — keep the larger file and rename it
- **Question count varies**: not all courses use 65 questions per test — always confirm the count from the test selection screen and pass it to `collectAllQuestions()`
