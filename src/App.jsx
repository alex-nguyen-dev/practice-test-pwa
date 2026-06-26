import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GlassButton } from './components/GlassButton.jsx';

const storedTheme = () => {
  if (localStorage.theme === 'dark' || localStorage.theme === 'light') return localStorage.theme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(storedTheme);
  const canGoBack = location.pathname !== '/';

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.theme = theme;
  }, [theme]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.30),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(167,139,250,.26),transparent_30%),linear-gradient(150deg,#f8fafc_0%,#e2e8f0_48%,#c7d2fe_100%)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(52,211,153,.18),transparent_28%),linear-gradient(150deg,#020617_0%,#111827_54%,#1e1b4b_100%)]" />
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-8 pt-[max(env(safe-area-inset-top),1rem)] sm:px-6">
        <header className="sticky top-3 z-30 mb-5 flex items-center justify-between rounded-3xl border border-white/30 bg-white/35 px-3 py-3 shadow-glass-soft backdrop-blur-2xl transition dark:border-white/15 dark:bg-white/10">
          <div className="flex min-w-0 items-center gap-2">
            {canGoBack ? (
              <GlassButton icon={ArrowLeft} label="Back" onClick={() => navigate(-1)} />
            ) : (
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/45 shadow-inner dark:bg-white/10">
                <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.85)]" />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-600 dark:text-slate-300">Practice Glass</p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-300">Touch-first certification prep</p>
            </div>
          </div>
          <GlassButton
            icon={theme === 'dark' ? Sun : Moon}
            label="Toggle theme"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </header>
        <Outlet />
      </div>
    </main>
  );
}
