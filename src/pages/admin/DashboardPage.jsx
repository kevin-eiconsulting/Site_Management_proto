import { useState } from "react";
import { projects, labourWorkers, attendanceRecords } from "../../data/mockData";
import StatCard from "../../components/StatCard";
import ProjectTable from "../../components/ProjectTable";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { Building2, CheckCircle2, Users, ClipboardCheck, X, HardHat, MapPin } from "lucide-react";

const TODAY = "2026-10-24";

export default function DashboardPage() {
  const [selectedProject, setSelectedProject] = useState(null);

  const activeProjects = projects.filter((p) => p.status === "Active").length;
  const totalWorkers = labourWorkers.length;
  const presentToday = attendanceRecords.filter(
    (r) => r.date === TODAY && r.status === "Present"
  ).length;

  const projectWorkers = selectedProject
    ? labourWorkers.filter((w) => w.projectId === selectedProject.id)
    : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Operations Dashboard"
        subtitle="Real-time operational summary across all active sites and assignments."
      />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Building2 className="h-5 w-5" />}
          tone="blue"
          label="Total Projects"
          value={projects.length}
          context="all sites on record"
          delta="1 in planning"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="green"
          label="Active Sites"
          value={activeProjects}
          context="currently under construction"
        />
        <StatCard
          icon={<Users className="h-5 w-5" />}
          color="slate"
          label="Total Workforce"
          value={totalWorkers}
          context="registered site workers"
        />
        <StatCard
          icon={<ClipboardCheck className="h-5 w-5" />}
          color="green"
          label="Present Today"
          value={presentToday}
          context={`verified on ${TODAY}`}
          delta={`${Math.round((presentToday / (totalWorkers || 1)) * 100)}% turnout`}
        />
      </div>

      {/* Projects Table Card */}
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="t-section-title">Active Projects Directory</h2>
            <p className="t-caption">Select any project to inspect assigned workforce and operations</p>
          </div>
          <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
            {projects.length} Projects Total
          </span>
        </div>
        <ProjectTable onSelectProject={setSelectedProject} />
      </div>

      {/* Selected Project Drawer / Details Panel */}
      {selectedProject && (
        <div className="card border-blue-200 bg-blue-50/20 space-y-4">
          <div className="flex items-start justify-between border-b border-blue-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">{selectedProject.name}</h3>
                <Badge variant={selectedProject.status === "Active" ? "success" : "warning"}>
                  {selectedProject.status}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {selectedProject.site}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <HardHat className="h-3 w-3 text-slate-400" />
                  Assigned: {selectedProject.engineer}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="btn btn-ghost btn-sm text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
              <span>Dismiss</span>
            </button>
          </div>

          <div>
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Assigned Workers ({projectWorkers.length})
            </div>
            {projectWorkers.length === 0 ? (
              <p className="text-sm text-slate-400 py-3">No workforce assigned to this site yet.</p>
            ) : (
              <div className="card-flush overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th className="th">Worker Name</th>
                      <th className="th">Trade Category</th>
                      <th className="th">Subcontractor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projectWorkers.map((w) => (
                      <tr key={w.id}>
                        <td className="td font-medium text-slate-900">{w.name}</td>
                        <td className="td">
                          <Badge variant="accent">{w.category}</Badge>
                        </td>
                        <td className="td text-slate-600">{w.subcontractor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
