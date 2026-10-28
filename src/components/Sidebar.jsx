import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  ClipboardList,
  Package,
  CheckSquare,
  ScrollText,
  Workflow,
} from "lucide-react";

const ic = "h-[18px] w-[18px]";

const ADMIN_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard className={ic} /> },
      { key: "projects", label: "Projects", icon: <Building2 className={ic} /> },
    ],
  },
  {
    label: "Site Operations",
    items: [
      { key: "admin-progress-reports", label: "Progress Reports", icon: <ClipboardList className={ic} /> },
      { key: "admin-materials", label: "Materials Ledger", icon: <Package className={ic} /> },
    ],
  },
  {
    label: "Personnel",
    items: [
      { key: "labour", label: "Labour Register", icon: <Users className={ic} /> },
      { key: "manpower", label: "Manpower Report", icon: <BarChart3 className={ic} /> },
    ],
  },
];

const ENGINEER_SECTIONS = [
  {
    label: "Workspace",
    items: [
      { key: "myprojects", label: "My Projects", icon: <Building2 className={ic} /> },
      { key: "engineer-daily-report", label: "Daily Report", icon: <ClipboardList className={ic} /> },
    ],
  },
  {
    label: "Operations",
    items: [
      { key: "engineer-materials", label: "Materials", icon: <Package className={ic} /> },
    ],
  },
  {
    label: "Labour & Field",
    items: [
      { key: "attendance", label: "Mark Attendance", icon: <CheckSquare className={ic} /> },
      { key: "labournotes", label: "Labour Notes", icon: <ScrollText className={ic} /> },
    ],
  },
];

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function Sidebar({ role, currentUser, currentPage, onNavigate }) {
  const sections = role === "admin" ? ADMIN_SECTIONS : ENGINEER_SECTIONS;
  const roleLabel = role === "admin" ? "Administrator" : "Site Engineer";

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-slate-200 bg-white">
      {/* Brand header */}
      <div className="flex h-14 items-center gap-2.5 border-b border-slate-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-ctrl bg-blue-600 text-xs font-bold text-white shadow-sm">
          SP
        </div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold leading-tight text-slate-900">
            SitePulse
          </div>
          <div className="truncate text-[11px] text-slate-400">Construction Operations</div>
        </div>
      </div>

      {/* Nav section list */}
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-3 pb-2 t-card-label">{section.label}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = currentPage === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onNavigate(item.key)}
                    className={`group relative flex w-full items-center gap-3 rounded-ctrl px-3 py-2 text-sm transition-colors ${
                      active
                        ? "bg-blue-50 font-semibold text-blue-700"
                        : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {/* Active rail indicator */}
                    <span
                      className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full transition-colors ${
                        active ? "bg-blue-600" : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center transition-colors ${
                        active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User info footer */}
      <div className="border-t border-slate-200 p-3">
        <div className="flex items-center gap-3 rounded-ctrl px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
            {initials(currentUser?.name || "")}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-slate-800">
              {currentUser?.name || "User"}
            </div>
            <div className="truncate text-xs text-slate-400">{roleLabel}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
