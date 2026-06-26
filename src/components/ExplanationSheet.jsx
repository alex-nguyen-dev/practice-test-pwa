import { X } from 'lucide-react';
import { GlassButton } from './GlassButton.jsx';

export default function ExplanationSheet({ open, question, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/40 p-3 backdrop-blur-sm dark:bg-slate-950/70 sm:items-center">
      <section className="max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/35 bg-white/80 shadow-glass backdrop-blur-2xl dark:border-white/15 dark:bg-slate-900/90">
        <div className="flex items-center justify-between gap-3 border-b border-white/30 p-3.5 dark:border-white/10 sm:p-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 sm:text-sm">Explanations</p>
            <h2 className="text-base font-bold text-slate-950 dark:text-white sm:text-lg">Answer review</h2>
          </div>
          <GlassButton icon={X} label="Close explanations" onClick={onClose} />
        </div>
        <div className="max-h-[68vh] space-y-2.5 overflow-y-auto p-3.5 sm:space-y-3 sm:p-4">
          {question.choices.map((choice) => (
            <article
              key={choice.id}
              className="rounded-3xl border border-white/35 bg-white/55 p-3.5 dark:border-white/10 dark:bg-white/5 sm:p-4"
            >
              <span
                className={`mb-2 inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold sm:px-2.5 sm:py-1 sm:text-xs ${
                  choice.correct
                    ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-200'
                    : 'bg-slate-500/15 text-slate-600 dark:bg-slate-400/20 dark:text-slate-200'
                }`}
              >
                {choice.correct ? 'Correct' : 'Incorrect'}
              </span>
              <p className="mb-2 text-sm font-semibold text-slate-950 dark:text-white sm:text-base">{choice.text}</p>
              <p className="text-[13px] leading-5 text-slate-700 dark:text-slate-200 sm:text-sm sm:leading-6">{choice.explanation}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
