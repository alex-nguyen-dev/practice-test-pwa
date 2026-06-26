import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { GlassButton } from './GlassButton.jsx';

export default function ExplanationSheet({ open, question, onClose }) {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 backdrop-blur-sm dark:bg-slate-950/70 sm:items-center sm:p-3">
      <section className="flex h-[100dvh] w-full max-w-2xl flex-col overflow-hidden border border-white/35 bg-white/80 shadow-glass backdrop-blur-2xl dark:border-white/15 dark:bg-slate-900/90 sm:h-auto sm:max-h-[86vh] sm:rounded-3xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/30 p-3.5 pt-[max(env(safe-area-inset-top),0.875rem)] dark:border-white/10 sm:p-4 sm:pt-4">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-300 sm:text-sm">Explanations</p>
            <h2 className="text-base font-bold text-slate-950 dark:text-white sm:text-lg">Answer review</h2>
          </div>
          <GlassButton icon={X} label="Close explanations" onClick={onClose} />
        </div>
        <div className="min-h-0 flex-1 space-y-2.5 overflow-y-auto p-3.5 pb-[max(env(safe-area-inset-bottom),0.875rem)] sm:max-h-[68vh] sm:flex-none sm:pb-4">
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
    </div>,
    document.body,
  );
}
