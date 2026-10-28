import { LogOut, Calendar, ShieldCheck, HardHat } from "lucide-react";
import Badge from "./ui/Badge";

const PAGE_LABELS = {
  dashboard: "Dashboard",
  projects: "Projects Directory",
  labour: "Labour Register",
  manpower: "Manpower Report",
  "admin-progress-reports": "Progress Reports",
  "admin-materials": "Materials Ledger",
  myprojects: "My Assigned Projects",
  attendance: "Daily Attendance",
  labournotes: "Labour Notes",
  "engineer-daily-report": "Daily Progress Report",
  "engineer-materials": "Materials Operations",
};

export default function Navbar({ currentUser, currentPage, onLogout }) {
  const pageTitle = PAGE_LABELS[currentPage] || "Overview";
  const isAdmin = currentUser?.role === "admin";

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-medium text-slate-400">SitePulse</span>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-semibold text-slate-900 truncate">
          {pageTitle}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-100 rounded-md px-2.5 py-1">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-medium">2026-10-24</span>
        </div>

        <Badge
          variant={isAdmin ? "accent" : "purple"}
          icon={
            isAdmin ? (
              <ShieldCheck className="h-3.5 w-3.5" />
            ) : (
              <HardHat className="h-3.5 w-3.5" />
            )
          }
        >
          {isAdmin ? "Administrator" : "Site Engineer"}
        </Badge>

        <div className="h-4 w-px bg-slate-200" />

        <button
          onClick={onLogout}
          type="button"
          className="btn btn-ghost btn-sm text-slate-600 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
          title="Sign out of your account"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </header>
  );
}
