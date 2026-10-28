const VARIANTS = {
  active: "bg-blue-50 text-blue-700 border border-blue-200/60",
  accent: "bg-blue-50 text-blue-700 border border-blue-200/60",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  danger: "bg-rose-50 text-rose-700 border border-rose-200/60",
  warning: "bg-amber-50 text-amber-700 border border-amber-200/60",
  pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
  muted: "bg-slate-100 text-slate-600 border border-slate-200/60",
  purple: "bg-purple-50 text-purple-700 border border-purple-200/60",
};

export default function Badge({ variant = "muted", icon, children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        VARIANTS[variant] || VARIANTS.muted
      } ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
