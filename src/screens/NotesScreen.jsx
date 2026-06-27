import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { notes } from '../data/notesList.js';
import { GlassCard } from '../components/GlassCard.jsx';

export default function NotesScreen() {
  return (
    <section className="space-y-5">
      <div className="px-1">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Notes</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white sm:text-4xl">Study Notes</h1>
      </div>

      <div className="grid gap-4">
        {notes.map((note) => (
          <GlassCard key={note.id} as={Link} to={`/notes/${note.id}`} className="block p-3 active:scale-[.99] sm:p-5">
            <div className="flex items-center gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white/50 text-violet-700 shadow-inner dark:bg-white/10 dark:text-violet-300 sm:h-14 sm:w-14 sm:rounded-3xl">
                <FileText className="h-5 w-5 sm:h-7 sm:w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="line-clamp-2 text-md font-bold text-slate-950 dark:text-white">{note.title}</h2>
              </div>
              <ArrowRight className="h-6 w-6 shrink-0 text-slate-500 dark:text-slate-300" />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
