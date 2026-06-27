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

function MenuPanel({ location, navTo, theme, setTheme, open }) {
  return (
    <div
      className={`absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-xl backdrop-blur-2xl transition-all duration-200 dark:border-white/15 dark:bg-slate-900/95 ${open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'}`}
    >
      <nav className="p-2">
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
      <div className="border-t border-slate-200 p-2 dark:border-white/10">
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </div>
  );
}

function BottomTabBar({ location, navTo }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/30 bg-white/80 shadow-[0_-6px_30px_-8px_rgba(2,6,23,0.35)] backdrop-blur-2xl backdrop-saturate-150 sm:hidden dark:border-white/10 dark:bg-slate-900/85"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-3xl items-stretch justify-around px-2">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navTo(path)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 pb-1 pt-1 text-[11px] font-semibold transition active:scale-95 ${active ? 'text-sky-600 dark:text-sky-300' : 'text-slate-500 dark:text-slate-400'}`}
            >
              <span className="flex h-6 w-12 items-center justify-center">
                <Icon className="h-5 w-5 shrink-0" strokeWidth={active ? 2.5 : 2} />
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function ThemeToggle({ theme, setTheme }) {
  return (
    <GlassButton
      icon={theme === 'dark' ? Sun : Moon}
      label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(storedTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const canGoBack = location.pathname !== '/';
  const isHome = location.pathname === '/';
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

      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-24 pt-[max(env(safe-area-inset-top),1rem)] sm:px-6 sm:pb-8">
        <header className="sticky top-3 z-50 mb-5 flex items-center gap-2 rounded-3xl border border-white/40 bg-white/40 px-3 py-2.5 shadow-glass-soft ring-1 ring-inset ring-white/50 backdrop-blur-2xl backdrop-saturate-150 transition before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:rounded-t-3xl before:bg-gradient-to-b before:from-white/60 before:to-transparent dark:border-white/10 dark:bg-white/[0.07] dark:ring-white/10 dark:before:from-white/10">
          {canGoBack ? (
            <GlassButton icon={ArrowLeft} label="Back" onClick={() => navigate(-1)} />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center">
              <img src="/icons/icon.svg" alt="Juku" className="h-8 w-8" />
            </div>
          )}

          <p
            className={`min-w-0 flex-1 truncate text-center font-semibold tracking-tight ${
              isHome
                ? 'bg-gradient-to-r from-sky-600 to-violet-600 bg-clip-text text-lg text-transparent dark:from-sky-300 dark:to-violet-200 sm:text-xl'
                : 'text-base text-slate-700 dark:text-slate-100 sm:text-lg'
            }`}
          >
            {title}
          </p>

          <div className="flex shrink-0 items-center gap-1">
            {/* Mobile: standalone theme toggle (nav lives in the bottom bar) */}
            <div className="sm:hidden">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>

            {/* Desktop: menu popover holds nav + theme */}
            <div className="relative hidden sm:block">
              <GlassButton
                icon={Menu}
                label="Open menu"
                onClick={() => setMenuOpen((o) => !o)}
                className={menuOpen ? 'bg-white/70 ring-1 ring-inset ring-white/60 dark:bg-white/20 dark:ring-white/15' : ''}
              />
              <MenuPanel location={location} navTo={navTo} theme={theme} setTheme={setTheme} open={menuOpen} />
            </div>
          </div>
        </header>

        <Outlet />
      </div>

      {/* Desktop click-away for the popover */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 hidden sm:block ${menuOpen ? '' : 'pointer-events-none'}`}
      />

      <BottomTabBar location={location} navTo={navTo} />
    </main>
  );
}
