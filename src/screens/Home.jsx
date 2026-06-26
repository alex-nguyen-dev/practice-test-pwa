import { Link } from 'react-router-dom';
import { ArrowRight, Layers3 } from 'lucide-react';
import { collections } from '../data/practiceSets.js';
import { GlassCard } from '../components/GlassCard.jsx';

export default function Home() {
  return (
    <section className="space-y-5">
      <div className="px-1">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">Collections</p>
        <h1 className="mt-2 text-4xl font-bold text-slate-950 dark:text-white">Choose a practice path</h1>
      </div>

      <div className="grid gap-4">
        {collections.map((collection) => (
          <GlassCard
            key={collection.id}
            as={Link}
            to={`/collections/${collection.id}`}
            className="block p-5 active:scale-[.99]"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-3xl bg-white/50 text-sky-700 shadow-inner dark:bg-white/10 dark:text-sky-200">
                <Layers3 className="h-7 w-7" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-xl font-bold text-slate-950 dark:text-white">{collection.title}</h2>
                <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {collection.sets.length} practice {collection.sets.length === 1 ? 'set' : 'sets'}
                </p>
              </div>
              <ArrowRight className="h-6 w-6 shrink-0 text-slate-500 dark:text-slate-300" />
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
