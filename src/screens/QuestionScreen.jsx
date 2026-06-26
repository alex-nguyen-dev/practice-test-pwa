import { Navigate, useParams } from 'react-router-dom';
import { Info, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import ChoiceRow from '../components/ChoiceRow.jsx';
import ExplanationSheet from '../components/ExplanationSheet.jsx';
import { GlassButton } from '../components/GlassButton.jsx';
import { GlassCard } from '../components/GlassCard.jsx';
import { getQuestionKind, getSet } from '../data/practiceSets.js';
import { clearSetProgress, loadProgress, saveSetProgress } from '../lib/storage.js';

const sameSet = (a, b) => a.length === b.length && a.every((value) => b.includes(value));

export default function QuestionScreen() {
  const { setId } = useParams();
  const set = getSet(setId);
  const saved = loadProgress()[setId];
  const [index, setIndex] = useState(saved?.completed ? 0 : saved?.index ?? 0);
  const [answers, setAnswers] = useState(saved?.answers ?? {});
  const [selected, setSelected] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  if (!set) return <Navigate to="/" replace />;

  const question = set.questions[index];
  const currentAnswer = answers[question.id];
  const locked = Boolean(currentAnswer);
  const { correctCount, isMultiAnswer } = getQuestionKind(question);
  const chosenIds = locked ? currentAnswer.selectedIds : selected;
  const correctIds = useMemo(
    () => question.choices.filter((choice) => choice.correct).map((choice) => choice.id),
    [question],
  );
  const score = Object.values(answers).filter((answer) => answer.correct).length;
  const isLast = index === set.questions.length - 1;
  const progress = ((index + 1) / set.questions.length) * 100;

  const lockAnswer = (ids) => {
    const sortedIds = [...ids].sort();
    const correct = sameSet(sortedIds, [...correctIds].sort());
    const nextAnswers = {
      ...answers,
      [question.id]: {
        selectedIds: sortedIds,
        correct,
      },
    };
    setAnswers(nextAnswers);
    saveSetProgress(set.id, {
      index,
      answers: nextAnswers,
      completed: false,
      bestScore: Math.max(saved?.bestScore ?? 0, Object.values(nextAnswers).filter((answer) => answer.correct).length),
    });
  };

  const selectChoice = (choiceId) => {
    if (locked) return;
    if (!isMultiAnswer) {
      lockAnswer([choiceId]);
      return;
    }

    setSelected((current) =>
      current.includes(choiceId) ? current.filter((id) => id !== choiceId) : [...current, choiceId],
    );
  };

  const next = () => {
    if (isLast) {
      const finalScore = Object.values(answers).filter((answer) => answer.correct).length;
      saveSetProgress(set.id, {
        index,
        answers,
        completed: true,
        bestScore: Math.max(saved?.bestScore ?? 0, finalScore),
      });
      setIndex(set.questions.length);
      return;
    }

    const nextIndex = index + 1;
    setSelected([]);
    setIndex(nextIndex);
    saveSetProgress(set.id, { index: nextIndex, answers, completed: false });
  };

  const retry = () => {
    clearSetProgress(set.id);
    setAnswers({});
    setSelected([]);
    setIndex(0);
  };

  if (index >= set.questions.length) {
    const percent = Math.round((score / set.questions.length) * 100);
    return (
      <section className="space-y-5">
        <GlassCard className="p-6 text-center">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{set.title}</p>
          <h1 className="mt-3 text-5xl font-bold text-slate-950 dark:text-white">{percent}%</h1>
          <p className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-200">
            {score} of {set.questions.length} correct
          </p>
          <button
            type="button"
            onClick={retry}
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-3xl bg-slate-950 px-6 font-bold text-white shadow-glass-soft transition active:scale-[.98] dark:bg-white dark:text-slate-950"
          >
            <RotateCcw className="h-5 w-5" /> Retry
          </button>
        </GlassCard>
      </section>
    );
  }

  const choiceState = (choice) => {
    const selectedChoice = chosenIds.includes(choice.id);
    if (!locked) return selectedChoice ? 'selected' : 'neutral';
    if (choice.correct && selectedChoice) return 'correct';
    if (!choice.correct && selectedChoice) return 'wrong';
    if (choice.correct && !selectedChoice) return 'missed';
    return 'neutral';
  };

  return (
    <section className="space-y-5">
      <GlassCard className="overflow-hidden p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{set.title}</p>
            <p className="mt-1 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
              {index + 1} / {set.questions.length}
            </p>
          </div>
          {locked && <GlassButton icon={Info} label="Show explanations" onClick={() => setSheetOpen(true)} />}
        </div>
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-white/50 dark:bg-white/10">
          <div className="h-full rounded-full bg-sky-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="transition duration-300 ease-out">
          <h1 className="text-2xl font-bold leading-tight text-slate-950 dark:text-white">{question.question}</h1>
          {isMultiAnswer && (
            <p className="mt-4 rounded-2xl border border-white/35 bg-white/35 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-slate-200">
              Select all that apply ({correctCount} correct)
            </p>
          )}
        </div>
      </GlassCard>

      <div className="grid gap-3">
        {question.choices.map((choice) => (
          <ChoiceRow
            key={choice.id}
            choice={choice}
            selected={chosenIds.includes(choice.id)}
            locked={locked}
            multi={isMultiAnswer}
            state={choiceState(choice)}
            onSelect={() => selectChoice(choice.id)}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {isMultiAnswer && !locked && (
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => lockAnswer(selected)}
            className="min-h-14 flex-1 rounded-3xl bg-slate-950 px-5 text-base font-bold text-white shadow-glass-soft transition active:scale-[.98] disabled:opacity-40 dark:bg-white dark:text-slate-950"
          >
            Submit
          </button>
        )}
        {locked && (
          <button
            type="button"
            onClick={next}
            className="min-h-14 flex-1 rounded-3xl bg-slate-950 px-5 text-base font-bold text-white shadow-glass-soft transition active:scale-[.98] dark:bg-white dark:text-slate-950"
          >
            {isLast ? 'Show results' : 'Next'}
          </button>
        )}
      </div>

      <ExplanationSheet open={sheetOpen} question={question} onClose={() => setSheetOpen(false)} />
    </section>
  );
}
