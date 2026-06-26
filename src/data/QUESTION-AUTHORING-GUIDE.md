# Question Authoring Guide

How to write good multiple-choice questions for the practice sets in `src/data/sets/`.
This guide was written after a batch-authoring session that introduced several
"test-wiseness" tells — patterns that let someone pass without knowing the material.
Each rule below maps to a real mistake made in that session.

## File format (must match exactly)

The app auto-loads every `*.json` in `src/data/sets/` via `practiceSets.js`. Keep this shape:

```json
{
  "id": "<collection-slug>-set-N",
  "collection": "<Topic Name>",
  "title": "Practice Set N",
  "questions": [
    {
      "id": "q1",
      "question": "Scenario-based stem ending in a question?",
      "choices": [
        { "id": "a", "text": "Option text.", "correct": true,  "explanation": "Why this is right." },
        { "id": "b", "text": "Option text.", "correct": false, "explanation": "Why this is wrong." }
      ]
    }
  ]
}
```

Rules:
- `collection` is the **topic/exam name** and is just a label — use whatever fits the subject (e.g. `"AWS AI Practitioner"`, `"AWS Solutions Architect"`, `"Kubernetes"`). `practiceSets.js` groups every set that shares the same `collection` string into one collection, so keep it identical across sets that belong together.
- `id` must be globally unique across all set files (it is the lookup key). Convention: `<collection-slug>-set-N`. Question ids are `q1`, `q2`, …; choice ids are `a`, `b`, `c`, … sequential, in array order.
- `title` is what's shown for the set and is sorted naturally (`Practice Set 2` before `Practice Set 10`), so keep a consistent, numbered naming scheme within a collection.
- A question is **multi-answer** when more than one choice has `correct: true` (the app derives this; do not add a flag). Mark these stems with `(Select all that apply.)`.
- **Every** choice — right or wrong — needs its own `explanation`. The explanation carries the teaching value, so it can be detailed even when the option text is short.

---

## The cardinal rule: the answer must not be guessable from form

A well-written distractor is wrong on the *content*, never identifiable from the *shape* of the option. The mistakes below all violated this.

### 1. Randomize the position of the correct answer
**Mistake made:** the correct answer was placed first (slot `a`) in **100%** of single-answer questions.
**Rule:** distribute correct answers roughly evenly across all positions. Across a set, no single slot should hold far more than its share (~25% for 4 options). Never default to writing the answer first.
**Tip:** author in any order, then shuffle. A seeded shuffle keeps it deterministic for git.

### 2. Keep all options the same length
**Mistake made:** the correct option was the longest in **93%** of questions and averaged ~2× the length of the distractors (96 vs 56 chars). Writers unconsciously over-justify the right answer inside its option text.
**Rule:** within a question, all options should sit in the same length band (aim within ~15 chars of each other). Don't let the correct option be reliably the longest **or** the shortest.
**How:** put justification in the `explanation`, not the option text. Keep option text to "term + brief descriptor" of comparable length for every choice.

### 3. Balance multi-answer questions — give at least two distractors
**Mistake made:** several "select all that apply" questions had 4 options with 3 correct, leaving only **one** wrong option. Eliminate the one obvious wrong answer and the rest fall out for free.
**Rule:** a multi-answer question needs at least **2 distractors**. Match the real exam: "select TWO" → 5 options, "select THREE" → 5–6 options. The number of correct answers should be at most `options − 2`.
**Don't** reveal the count in the stem ("Select all that apply," not "Select THREE").

---

## Writing the stem

- Prefer a short **scenario** ("A team needs to…") over a bare definition lookup. It tests application, not recall.
- Put all needed context in the stem; end with a single, clear question.
- Avoid negatives ("which is NOT") where possible; if unavoidable, emphasize the negative word.
- One defensible correct answer (or one defensible set for multi-answer). No "best of two rights" ambiguity.

## Writing the options

- **Plausible distractors:** use real, related services/concepts a confused learner might pick (e.g., for a RAG question, use OpenSearch vs. an unrelated DNS service — but make the wrong one genuinely tempting, not absurd). Avoid joke options.
- **Parallel grammar and structure:** every option starts the same way (e.g., all "Service, which does X") so none stands out.
- **No grammatical or "all/always/never" giveaways:** absolute words in an option usually signal a distractor — use sparingly and on both correct and wrong options, or not at all.
- **Mutually exclusive** options for single-answer questions; no overlapping or synonym choices.
- Keep distractors mutually distinct — don't repeat the same idea twice.

## Writing the explanations

- For the **correct** option: state why it satisfies the scenario's requirements, not just what the service is.
- For each **wrong** option: name what it actually does and why it fails *this* requirement — this is where the learning happens.
- Be specific and accurate. If unsure of a fact, verify against the study notes (`AWS-AI-Practitioner-Study-Notes.md`) before writing.

---

## Coverage (when authoring a batch)

- Spread questions across the exam's domains rather than clustering on the easy ones.
  Mistake made in the session: security/governance was over-weighted while generative-AI
  fundamentals were under-weighted relative to the exam blueprint.
- Mirror the official domain weights (for AIF-C01: AI/ML fundamentals ~20%, generative AI
  ~24%, applications of foundation models ~28%, responsible AI ~14%, security & governance ~14%).
- Cover the full taxonomy of a topic, not just the famous members (e.g., all bias types, the
  whole GenAI risk list, every inference type) — don't leave concepts as distractor-only.

---

## Pre-commit self-check

Run these checks (a small Node script over `src/data/sets/*.json` works well) before committing a batch:

1. **Valid JSON** and required fields present on every set, question, and choice.
2. **Unique ids:** question ids unique within a set; choice ids sequential `a`, `b`, `c`, … in order.
3. **Each question has ≥1 correct answer**; multi-answer questions have **≥2 distractors**.
4. **Position balance:** correct-answer slots are spread across positions, not concentrated in one.
5. **Length balance:** the correct option is not consistently the longest (or shortest); option lengths within a question are comparable.
6. **Build passes:** `npm run build` succeeds (confirms the files load).
