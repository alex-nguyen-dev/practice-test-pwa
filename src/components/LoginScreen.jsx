import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';

export function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (onLogin(password)) return;

    setError('Incorrect password.');
    setPassword('');
  }

  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-slate-100 px-4 py-10 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,.30),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(167,139,250,.26),transparent_30%),linear-gradient(150deg,#f8fafc_0%,#e2e8f0_48%,#c7d2fe_100%)] dark:bg-[radial-gradient(circle_at_18%_8%,rgba(14,165,233,.28),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(52,211,153,.18),transparent_28%),linear-gradient(150deg,#020617_0%,#111827_54%,#1e1b4b_100%)]" />

      <section className="w-full max-w-sm rounded-3xl border border-white/40 bg-white/60 p-6 shadow-glass ring-1 ring-inset ring-white/50 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:bg-white/[0.07] dark:ring-white/10">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 shadow-glass-soft dark:bg-sky-400/15 dark:text-sky-200">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Juku is locked</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Enter your password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
            <input
              autoFocus
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError('');
              }}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white/80 px-4 text-base font-medium text-slate-950 outline-none ring-sky-400/40 transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-500"
              placeholder="Your password"
            />
          </label>

          {error && <p className="text-sm font-semibold text-rose-600 dark:text-rose-300">{error}</p>}

          <button
            type="submit"
            className="h-12 w-full rounded-2xl bg-sky-600 px-4 text-sm font-bold text-white shadow-glass-soft transition hover:bg-sky-500 active:scale-[0.99] dark:bg-sky-500 dark:hover:bg-sky-400"
          >
            Unlock
          </button>
        </form>
      </section>
    </main>
  );
}
