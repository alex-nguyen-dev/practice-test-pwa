import { GlassCard } from '../components/GlassCard.jsx';

const SECTIONS = [
  {
    title: 'What is Juku?',
    body: 'Juku is a progressive web app for studying and self-testing. It lets you work through multiple-choice practice sets and read study notes — all from your home screen, offline.',
  },
  {
    title: 'Practice Tests',
    body: 'Browse collections of practice sets, answer questions, and get instant feedback with explanations. Your progress is never tracked — every session is a fresh start.',
  },
  {
    title: 'Notes',
    body: 'Study notes are stored as Markdown files bundled with the app. They render with full formatting support including headings, lists, and code blocks.',
  },
  {
    title: 'Offline Support',
    body: 'Juku is a PWA. Once loaded, it works fully offline. Add it to your home screen for the best experience.',
  },
];

export default function AboutScreen() {
  return (
    <section className="space-y-5">
      <div className="flex flex-col items-center gap-3 py-4">
        <img src="/icons/icon.svg" alt="Juku" className="h-20 w-20" />
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Juku</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Practice tests &amp; study notes</p>
        </div>
      </div>

      <div className="grid gap-4">
        {SECTIONS.map((s) => (
          <GlassCard key={s.title} className="p-5">
            <h2 className="mb-2 font-semibold text-slate-900 dark:text-white">{s.title}</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
