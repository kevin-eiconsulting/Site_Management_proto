import { useState } from "react";
import { projects, labourWorkers } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { MapPin, HardHat, Calendar, Users, X } from "lucide-react";

export default function ProjectsPage() {
  const [modalProject, setModalProject] = useState(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        subtitle="Manage all construction sites, assignments, and active work locations."
      />

      <div className="grid gap-4">
        {projects.map((p) => {
          const workerCount = labourWorkers.filter((w) => w.projectId === p.id).length;
          return (
            <div
              key={p.id}
              className="card flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-slate-300"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                  <Badge variant={p.status === "Active" ? "success" : "warning"}>
                    {p.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{p.site}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <HardHat className="h-3.5 w-3.5 text-slate-400" />
                    <span>{p.engineer}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-mono">{p.startDate}</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-slate-400">
                  {workerCount} workers allocated
                </span>
                <button
                  type="button"
                  onClick={() => setModalProject(p)}
                  className="btn btn-ghost btn-sm"
                >
                  <Users className="h-3.5 w-3.5 text-slate-500" />
                  <span>View Workers</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-pop animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">{modalProject.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Workforce registered and allocated to this site
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalProject(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-4">
              {(() => {
                const workers = labourWorkers.filter((w) => w.projectId === modalProject.id);
                return workers.length === 0 ? (
                  <p className="text-sm text-slate-400 py-6 text-center">
                    No workforce assigned to this site yet.
                  </p>
                ) : (
                  <div className="card-flush max-h-80 overflow-y-auto">
                    <table className="table-base">
                      <thead>
                        <tr>
                          <th className="th">Worker Name</th>
                          <th className="th">Trade Category</th>
                          <th className="th">Subcontractor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {workers.map((w) => (
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
                );
              })()}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setModalProject(null)}
                className="btn btn-ghost btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
