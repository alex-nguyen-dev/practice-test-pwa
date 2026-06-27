export function GlassCard({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-3xl border border-white/40 bg-gradient-to-b from-white/55 to-white/35 shadow-glass ring-1 ring-inset ring-white/50 backdrop-blur-2xl backdrop-saturate-150 transition duration-300 dark:border-white/15 dark:from-white/[0.12] dark:to-white/[0.05] dark:ring-white/10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
