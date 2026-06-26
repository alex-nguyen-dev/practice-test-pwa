export function GlassButton({ icon: Icon, label, children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-2xl border border-white/35 bg-white/45 px-4 text-sm font-semibold text-slate-800 shadow-glass-soft backdrop-blur-2xl transition duration-200 active:scale-[.97] dark:border-white/15 dark:bg-white/10 dark:text-white ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {Icon ? <Icon className="h-5 w-5" strokeWidth={2.2} /> : null}
      {children ? <span>{children}</span> : null}
    </button>
  );
}
