# Scraped Test Conversion Prompt

Use this prompt in each new session. Replace the source and output filenames before running it.

```text
I want you to convert one scraped practice-test JSON file into the same format used by `src/data/sets/*.json`.

Source file:
`scrapped tests/results/REPLACE_SOURCE_FILE.json`

Output file:
`src/data/sets/REPLACE_OUTPUT_FILE.json`

Please first inspect:
- the source file
- at least one existing file in `src/data/sets` to match the schema and writing style

Target format:
- top-level `id`
- top-level `collection`
- top-level `title`
- `questions[]`
- each question has `id`, `question`, `choices[]`
- each choice has `id`, `text`, `correct`, `explanation`

Requirements:
1. Read every question and every option carefully.
2. Preserve the original question text and choice text exactly, except for trimming whitespace or fixing obvious formatting/encoding artifacts.
3. Do not rewrite, paraphrase, simplify, or change the meaning of any question or choice.
4. Determine the correct answer yourself.
5. Some questions have multiple correct answers, usually indicated by wording like `(Select two)`, `(Select three)`, etc. For these, mark exactly that many choices as `correct: true`.
6. Add an explanation for every option, including incorrect options.
7. Match the concise explanation style already used in `src/data/sets`.
8. Search the internet when needed to verify AWS service behavior or exam-specific details.
9. Do not invent unsupported facts. If a question is ambiguous, verify it before writing the final answer.
10. Use lowercase choice IDs: `a`, `b`, `c`, etc.
11. Use sequential question IDs: `q1`, `q2`, etc.
12. Do the full conversion for this one file only.
13. Do not modify unrelated files.
14. After writing the file, validate that it is valid JSON.
15. Also check that every question has at least one correct answer, and that multi-answer questions have the expected number of correct answers.

At the end, summarize:
- output file created/updated
- number of questions converted
- any questions that required internet verification
- validation commands run
```

Suggested file mapping:

```text
scrapped tests/results/aws-ai-practitioner-test-1.json
-> src/data/sets/aws-ai-scraped-practitioner-test-1.json

scrapped tests/results/aws-ai-practitioner-test-2.json
-> src/data/sets/aws-ai-scraped-practitioner-test-2.json

scrapped tests/results/aws-ai-practitioner-test-3.json
-> src/data/sets/aws-ai-scraped-practitioner-test-3.json

scrapped tests/results/aws-ai-practitioner-test-4.json
-> src/data/sets/aws-ai-scraped-practitioner-test-4.json

scrapped tests/results/aws-gen-ai-dev-test-1.json
-> src/data/sets/aws-gen-ai-dev-scraped-test-1.json

scrapped tests/results/aws-gen-ai-dev-test-2.json
-> src/data/sets/aws-gen-ai-dev-scraped-test-2.json
```
