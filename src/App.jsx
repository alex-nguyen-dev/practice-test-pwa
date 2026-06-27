import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Home, Info, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlassButton } from './components/GlassButton.jsx';
import { getCollection, getSet } from './data/practiceSets.js';
import { getNote } from './data/notesList.js';

const storedTheme = () => {
  if (localStorage.theme === 'dark' || localStorage.theme === 'light') return localStorage.theme;
  return 'dark';
};

const headerTitle = (pathname) => {
  if (matchPath('/about', pathname)) return 'About';
  if (matchPath('/notes', pathname)) return 'Notes';
  const noteMatch = matchPath('/notes/:noteId', pathname);
  if (noteMatch) return getNote(noteMatch.params.noteId)?.title ?? 'Notes';
  const setMatch = matchPath('/sets/:setId', pathname);
  if (setMatch) return getSet(setMatch.params.setId)?.title ?? 'Juku';
  const collectionMatch = matchPath('/collections/:collectionSlug', pathname);
  if (collectionMatch) return getCollection(collectionMatch.params.collectionSlug)?.title ?? 'Juku';
  return 'Practice Tests';
};

const NAV_ITEMS = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Notes', icon: BookOpen, path: '/notes' },
  { label: 'About', icon: Info, path: '/about' },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(storedTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const canGoBack = location.pathname !== '/';
  const title = headerTitle(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.theme = theme;
  }, [theme]);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  function navTo(path) {
    navigate(path);
    setDrawerOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.30),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(167,139,250,.26),transparent_30%),linear-gradient(150deg,#f8fafc_0%,#e2e8f0_48%,#c7d2fe_100%)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(52,211,153,.18),transparent_28%),linear-gradient(150deg,#020617_0%,#111827_54%,#1e1b4b_100%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-8 pt-[max(env(safe-area-inset-top),1rem)] sm:px-6">
        <header className="sticky top-3 z-30 mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-3xl border border-white/30 bg-white/35 px-3 py-3 shadow-glass-soft backdrop-blur-2xl transition dark:border-white/15 dark:bg-white/10">
          {canGoBack ? (
            <GlassButton icon={ArrowLeft} label="Back" onClick={() => navigate(-1)} />
          ) : (
            <img src="/icons/icon.svg" alt="Juku" className="h-8 w-8" />
          )}
          <p className="truncate text-center text-base font-semibold text-slate-700 dark:text-slate-100 sm:text-lg">{title}</p>
          <GlassButton icon={Menu} label="Open menu" onClick={() => setDrawerOpen(true)} />
        </header>

        <Outlet />
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col bg-white/80 shadow-2xl backdrop-blur-2xl transition-transform duration-300 dark:bg-slate-900/90 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-lg font-bold text-slate-900 dark:text-white">Menu</span>
          <button
            onClick={() => setDrawerOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3">
          {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => navTo(path)}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${active ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10'}`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="space-y-1 border-t border-slate-200 px-3 py-4 dark:border-white/10">
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>

        </div>
      </div>
    </main>
  );
}
