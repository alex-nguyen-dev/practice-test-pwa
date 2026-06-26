# Practice Glass

React + Vite PWA for multiple-choice practice tests. It uses Tailwind CSS for styling, React Router for navigation, JSON files for content, and a small custom service worker plus manifest for installability.

## Run

```bash
npm install
npm run dev
```

## Add Practice Content

Each practice set is one JSON file in `src/data/sets`. Adding a new file there is enough for the app to load it automatically through Vite's `import.meta.glob`.

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

## Single vs Multi-Answer

The app does not use a separate flag. For each question it counts choices where `"correct": true`:

- Exactly one correct choice renders as radio-style. Tapping a choice submits and locks the question.
- More than one correct choice renders as checkbox-style. The user selects choices, then taps Submit. The score counts as correct only when the selected set exactly matches the correct set.

Answered questions are locked, show correct/incorrect/missed states, and expose a glass-style explanation sheet. Progress and best scores are saved in `localStorage`.
