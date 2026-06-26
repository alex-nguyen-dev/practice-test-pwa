import { Check, Circle, CircleCheck, CircleDot, Square, SquareCheck, X } from 'lucide-react';

export default function ChoiceRow({ choice, selected, locked, multi, state, onSelect }) {
  const stateClasses = {
    neutral: 'border-white/35 bg-white/40 dark:border-white/15 dark:bg-white/10',
    selected: 'border-sky-300/70 bg-sky-100/70 dark:border-sky-300/40 dark:bg-sky-400/15',
    correct: 'border-emerald-400/80 bg-white/40 dark:border-emerald-300/50 dark:bg-white/10',
    wrong: 'border-rose-400/80 bg-white/40 dark:border-rose-300/50 dark:bg-white/10',
    missed: 'border-emerald-400/80 bg-white/40 ring-2 ring-emerald-400/45 dark:bg-white/10',
  };

  const Icon = multi
    ? selected
      ? SquareCheck
      : Square
    : selected
      ? CircleDot
      : Circle;

  return (
    <button
      type="button"
      disabled={locked}
      onClick={onSelect}
      className={`w-full rounded-3xl border p-3.5 text-left shadow-glass-soft backdrop-blur-xl transition duration-200 active:scale-[.985] disabled:cursor-default sm:p-4 ${stateClasses[state]}`}
    >
      <div className="flex items-start gap-2.5 sm:gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-slate-700 dark:text-slate-200 sm:h-6 sm:w-6" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-snug text-slate-900 dark:text-white sm:text-base">{choice.text}</p>
          {locked && (
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide">
              {state === 'correct' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-700 dark:text-emerald-200">
                  <Check className="h-3.5 w-3.5" /> Correct
                </span>
              )}
              {state === 'wrong' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 px-2.5 py-1 text-rose-700 dark:text-rose-200">
                  <X className="h-3.5 w-3.5" /> Incorrect
                </span>
              )}
              {state === 'missed' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-700 dark:text-emerald-200">
                  <CircleCheck className="h-3.5 w-3.5" /> Missed
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
