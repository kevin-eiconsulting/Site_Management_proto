export default function TabBar({ tabs, active, onChange }) {
  return (
    <div className="inline-flex flex-wrap gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
      {tabs.map((t) => {
        const key = typeof t === "string" ? t : t.key;
        const label = typeof t === "string" ? t : t.label;
        const icon = typeof t === "object" ? t.icon : null;
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
