import { matchPath, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Home, Info, Menu, Moon, Sun } from 'lucide-react';
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

function NavItems({ location, navTo }) {
  return NAV_ITEMS.map(({ label, icon: Icon, path }) => {
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
  });
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
    >
      {theme === 'dark' ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </button>
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(storedTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const canGoBack = location.pathname !== '/';
  const title = headerTitle(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.theme = theme;
  }, [theme]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  function navTo(path) {
    navigate(path);
    setMenuOpen(false);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.30),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(167,139,250,.26),transparent_30%),linear-gradient(150deg,#f8fafc_0%,#e2e8f0_48%,#c7d2fe_100%)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(52,211,153,.18),transparent_28%),linear-gradient(150deg,#020617_0%,#111827_54%,#1e1b4b_100%)]" />

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-8 pt-[max(env(safe-area-inset-top),1rem)] sm:px-6">
        <header className="sticky top-3 z-50 mb-5 grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-3xl border border-white/30 bg-white/35 px-3 py-3 shadow-glass-soft backdrop-blur-2xl transition dark:border-white/15 dark:bg-white/10">
          {canGoBack ? (
            <GlassButton icon={ArrowLeft} label="Back" onClick={() => navigate(-1)} />
          ) : (
            <img src="/icons/icon.svg" alt="Juku" className="h-8 w-8" />
          )}
          <p className="truncate text-center text-base font-semibold text-slate-700 dark:text-slate-100 sm:text-lg">{title}</p>

          {/* Menu button + desktop dropdown */}
          <div className="relative">
            <GlassButton icon={Menu} label="Open menu" onClick={() => setMenuOpen((o) => !o)} />

            {/* Desktop dropdown */}
            <div
              className={`absolute right-0 top-full z-50 mt-2 hidden w-52 overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-900/95 sm:block ${menuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
            >
              <nav className="p-2">
                <NavItems location={location} navTo={navTo} />
              </nav>
              <div className="border-t border-slate-200 p-2 dark:border-white/10">
                <ThemeToggle theme={theme} setTheme={setTheme} />
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </div>

      {/* Backdrop — mobile: dark, desktop: transparent click-away */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 transition-opacity duration-300 sm:bg-transparent sm:backdrop-blur-none ${menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} bg-black/40 backdrop-blur-sm`}
      />

      {/* Mobile bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 rounded-t-3xl border-t border-white/30 bg-white/90 shadow-2xl backdrop-blur-2xl transition-transform duration-300 dark:border-white/10 dark:bg-slate-900/95 sm:hidden ${menuOpen ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Handle */}
        <div className="flex justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-slate-300 dark:bg-slate-600" />
        </div>

        <nav className="space-y-1 px-3 pb-2">
          <NavItems location={location} navTo={navTo} />
        </nav>

        <div className="border-t border-slate-200 px-3 py-2 dark:border-white/10">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>
      </div>
    </main>
  );
}
