import { X } from 'lucide-react';
import { GlassButton } from './GlassButton.jsx';

export default function ExplanationSheet({ open, question, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-sm sm:items-center">
      <section className="max-h-[86vh] w-full max-w-2xl overflow-hidden rounded-3xl border border-white/35 bg-white/70 shadow-glass backdrop-blur-2xl dark:border-white/15 dark:bg-slate-950/72">
        <div className="flex items-center justify-between gap-3 border-b border-white/30 p-4 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Explanations</p>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">Answer review</h2>
          </div>
          <GlassButton icon={X} label="Close explanations" onClick={onClose} />
        </div>
        <div className="max-h-[68vh] space-y-3 overflow-y-auto p-4">
          {question.choices.map((choice) => (
            <article
              key={choice.id}
              className="rounded-3xl border border-white/35 bg-white/45 p-4 dark:border-white/10 dark:bg-white/10"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <p className="font-semibold text-slate-950 dark:text-white">{choice.text}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    choice.correct
                      ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200'
                      : 'bg-slate-500/15 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {choice.correct ? 'Correct' : 'Incorrect'}
                </span>
              </div>
              <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{choice.explanation}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
