export function GlassCard({ as: Component = 'div', className = '', children, ...props }) {
  return (
    <Component
      className={`rounded-3xl border border-white/35 bg-white/45 shadow-glass backdrop-blur-2xl transition duration-300 dark:border-white/15 dark:bg-white/10 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
