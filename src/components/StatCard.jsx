import { ArrowUp } from "lucide-react";

const CHIP = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  yellow: "bg-amber-50 text-amber-600",
  slate: "bg-slate-100 text-slate-600",
  purple: "bg-purple-50 text-purple-600",
};

export default function StatCard({
  icon,
  label,
  value,
  color = "blue",
  context,
  delta,
}) {
  const chipStyle = CHIP[color] || CHIP.blue;
  const muted = value === 0 || value === "0";

  return (
    <div className="flex flex-col justify-between rounded-card border border-slate-200 bg-white p-card shadow-card transition-all hover:border-slate-300">
      <div className="flex items-start justify-between">
        <span className={`flex h-9 w-9 items-center justify-center rounded-ctrl ${chipStyle}`}>
          {icon}
        </span>
        {delta && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600 border border-emerald-100">
            <ArrowUp className="h-3 w-3" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="t-card-label">{label}</div>
        <div className={`mt-1 t-metric ${muted ? "text-slate-300" : "text-slate-900"}`}>
          {value}
        </div>
        {context && <div className="mt-1 text-xs text-slate-400">{context}</div>}
      </div>
    </div>
  );
}
