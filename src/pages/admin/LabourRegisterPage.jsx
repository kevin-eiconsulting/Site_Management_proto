import { useState } from "react";
import { projects, labourWorkers } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { Filter, Users, X } from "lucide-react";

export default function LabourRegisterPage() {
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const filteredWorkers = selectedProjectId
    ? labourWorkers.filter((w) => w.projectId === parseInt(selectedProjectId))
    : labourWorkers;

  const getProjectName = (id) => projects.find((p) => p.id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Labour Register"
        subtitle="Complete master register of site workforce, trade skills, and subcontractor links."
      />

      <div className="card space-y-4">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              Filter by Site:
            </span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="input w-64 text-sm"
            >
              <option value="">All Active Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {selectedProjectId && (
              <button
                type="button"
                onClick={() => setSelectedProjectId("")}
                className="btn btn-ghost btn-sm text-xs text-slate-500"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
          <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
            Showing {filteredWorkers.length} of {labourWorkers.length} Workers
          </span>
        </div>

        {/* Table */}
        <div className="card-flush overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th className="th w-12">#</th>
                <th className="th">Worker Full Name</th>
                <th className="th">Skill Category</th>
                <th className="th">Contractor / Agency</th>
                <th className="th">Allocated Project</th>
              </tr>
            </thead>
            <tbody>
              {filteredWorkers.map((w, i) => (
                <tr key={w.id}>
                  <td className="td text-slate-400 text-xs font-mono">{i + 1}</td>
                  <td className="td font-medium text-slate-900">{w.name}</td>
                  <td className="td">
                    <Badge variant="accent">{w.category}</Badge>
                  </td>
                  <td className="td text-slate-600">{w.subcontractor}</td>
                  <td className="td text-slate-600 text-xs">
                    <span className="font-medium text-slate-800">
                      {getProjectName(w.projectId)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
