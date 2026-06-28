# Practice Glass

React + Vite PWA for multiple-choice practice tests. It uses Tailwind CSS for styling, React Router for navigation, JSON files for content, and a small custom service worker plus manifest for installability.

## Run

```bash
npm install
npm run dev
```

## Casual Login Gate

The app has a frontend-only password gate for casual access protection. After a successful login, the browser stays logged in indefinitely by saving a flag in `localStorage`. It will only ask again if site data is cleared or the app is opened in a different browser/device.

Because this is a static frontend app, this is not strong security: a determined user can inspect or bypass bundled frontend code.

## Add Practice Content

Each practice set is one JSON file in `src/data/sets`.

```json
{
  "id": "aws-ai-set-1",
  "collection": "AWS AI Practitioner",
  "title": "Practice Set 1",
  "questions": [
    {
      "id": "q1",
      "question": "Question text...",
      "choices": [
        { "id": "a", "text": "Choice A", "correct": false, "explanation": "Why this is wrong..." },
        { "id": "b", "text": "Choice B", "correct": true, "explanation": "Why this is correct..." }
      ]
    }
  ]
}
```

Sets with the same `collection` value are grouped into one collection card on the home screen.

The home and collection screens use `src/data/setsIndex.json`, a lightweight generated index that contains set metadata only. Full question files are lazy-loaded only when a user opens a specific practice set.

After adding or editing a file in `src/data/sets`, update the index:

```bash
npm run generate:sets-index
```

This also runs automatically before `npm run dev` and `npm run build`. On Vercel, the default `npm run build` step runs `prebuild`, so the index is regenerated during deployment as long as the new JSON file is committed.

## Single vs Multi-Answer

The app does not use a separate flag. For each question it counts choices where `"correct": true`:

- Exactly one correct choice renders as radio-style. Tapping a choice submits and locks the question.
- More than one correct choice renders as checkbox-style. The user selects choices, then taps Submit. The score counts as correct only when the selected set exactly matches the correct set.

Answered questions are locked, show correct/incorrect/missed states, and expose a glass-style explanation sheet. Progress and best scores are saved in `localStorage`.
