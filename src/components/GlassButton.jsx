export function GlassButton({ icon: Icon, label, children, className = '', ...props }) {
  return (
    <button
      className={`relative inline-flex min-h-11 items-center justify-center gap-2 overflow-hidden rounded-2xl border border-white/40 bg-gradient-to-br from-white/65 to-white/25 font-semibold text-slate-800 shadow-glass-soft ring-1 ring-inset ring-white/60 backdrop-blur-2xl backdrop-saturate-150 transition duration-200 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-gradient-to-b before:from-white/50 before:to-transparent hover:from-white/75 hover:to-white/35 active:scale-[.95] dark:border-white/15 dark:from-white/[0.16] dark:to-white/[0.04] dark:text-white dark:ring-white/10 dark:before:from-white/[0.18] dark:hover:from-white/25 ${children ? 'px-4 text-sm' : 'w-11'} ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {Icon ? <Icon className="h-5 w-5" strokeWidth={2.2} /> : null}
      {children ? <span>{children}</span> : null}
    </button>
  );
}
