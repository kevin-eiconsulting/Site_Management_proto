import { useState, Fragment } from "react";
import { projects, progressReports } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/StatCard";
import Badge from "../../components/ui/Badge";
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  Mic,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";

function getStatusBadge(status) {
  switch (status) {
    case "Approved":
      return <Badge variant="success">Approved</Badge>;
    case "Submitted":
      return <Badge variant="active">Submitted</Badge>;
    case "Under Review":
      return <Badge variant="warning">Under Review</Badge>;
    case "Correction Required":
      return <Badge variant="danger">Correction Required</Badge>;
    default:
      return <Badge variant="muted">{status}</Badge>;
  }
}

export default function ProgressReportsPage() {
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const filtered = selectedProjectId === "all"
    ? progressReports
    : progressReports.filter((r) => r.projectId === parseInt(selectedProjectId));

  const total = filtered.length;
  const pendingReview = filtered.filter(
    (r) => r.status === "Under Review" || r.status === "Submitted"
  ).length;
  const approved = filtered.filter((r) => r.status === "Approved").length;

  const getProjectName = (pid) => projects.find((p) => p.id === pid)?.name || "—";

  const toggleRow = (id) => setExpandedId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily Progress Reports"
        subtitle="Review work accomplished, site photos, audio recordings, and quantities submitted from the field."
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<ClipboardList className="h-5 w-5" />}
          color="blue"
          label="Total Reports"
          value={total}
          context="submissions on record"
        />
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          color="yellow"
          label="Pending Review"
          value={pendingReview}
          context="awaiting administrative sign-off"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          color="green"
          label="Approved Reports"
          value={approved}
          context="verified & closed entries"
        />
      </div>

      {/* Filter + Table Card */}
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              Filter by Site:
            </span>
            <select
              value={selectedProjectId}
              onChange={(e) => {
                setSelectedProjectId(e.target.value);
                setExpandedId(null);
              }}
              className="input w-64 text-sm"
            >
              <option value="all">All Construction Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
            {filtered.length} report(s) listed · click row to expand
          </span>
        </div>

        {filtered.length === 0 ? (
          <p className="text-sm text-slate-400 py-8 text-center">No reports match this filter.</p>
        ) : (
          <div className="card-flush overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="th whitespace-nowrap">Date</th>
                  <th className="th whitespace-nowrap">Site Project</th>
                  <th className="th whitespace-nowrap">Site Engineer</th>
                  <th className="th">Summary of Completed Work</th>
                  <th className="th whitespace-nowrap">Labour Count</th>
                  <th className="th whitespace-nowrap">Review Status</th>
                  <th className="th w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const isExpanded = expandedId === r.id;
                  return (
                    <Fragment key={r.id}>
                      <tr
                        onClick={() => toggleRow(r.id)}
                        className={`cursor-pointer transition-colors ${
                          isExpanded ? "bg-blue-50/40" : "hover:bg-slate-50"
                        }`}
                      >
                        <td className="td font-mono text-xs text-slate-600 whitespace-nowrap">{r.date}</td>
                        <td className="td font-medium text-slate-900 whitespace-nowrap">
                          {getProjectName(r.projectId)}
                        </td>
                        <td className="td text-slate-700 whitespace-nowrap">{r.engineer}</td>
                        <td className="td text-slate-600 max-w-[280px] truncate">
                          {r.completedWork}
                        </td>
                        <td className="td font-mono text-slate-700 whitespace-nowrap">{r.labourCount} workers</td>
                        <td className="td whitespace-nowrap">{getStatusBadge(r.status)}</td>
                        <td className="td text-slate-400 text-center">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4 inline-block" />
                          ) : (
                            <ChevronDown className="h-4 w-4 inline-block" />
                          )}
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan={7} className="p-0 border-b border-slate-200">
                            <div className="bg-slate-50/80 p-5 border-l-4 border-blue-600 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                  <div>
                                    <div className="t-card-label mb-1">Detailed Completed Work</div>
                                    <p className="text-sm text-slate-800 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                                      {r.completedWork}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="t-card-label mb-1">Quantities / Material Utilized</div>
                                    <p className="text-sm font-mono text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                                      {r.quantities}
                                    </p>
                                  </div>
                                  <div>
                                    <div className="t-card-label mb-1">Remarks & Observations</div>
                                    <p className="text-sm text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                                      {r.remarks || "No specific remarks entered."}
                                    </p>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <div>
                                    <div className="t-card-label mb-2">Attached Photographic Evidence</div>
                                    {r.photos.length > 0 ? (
                                      <div className="flex flex-wrap gap-2">
                                        {r.photos.map((photo) => (
                                          <span
                                            key={photo}
                                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 shadow-xs"
                                          >
                                            <ImageIcon className="h-3.5 w-3.5 text-blue-600" />
                                            <span>{photo}</span>
                                          </span>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-slate-400">No photos attached.</p>
                                    )}
                                  </div>

                                  <div>
                                    <div className="t-card-label mb-2">Attached Field Audio Note</div>
                                    {r.audioNote ? (
                                      <div className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-3.5 py-2 text-xs font-medium text-purple-700">
                                        <Mic className="h-4 w-4 text-purple-600" />
                                        <span>Voice Recording: {r.audioNote} (Verified)</span>
                                      </div>
                                    ) : (
                                      <p className="text-xs text-slate-400">No voice note uploaded.</p>
                                    )}
                                  </div>

                                  {r.notes && (
                                    <div>
                                      <div className="t-card-label mb-1">Special Engineer Notes</div>
                                      <p className="text-xs text-slate-600 bg-amber-50/60 border border-amber-200 p-2.5 rounded-lg">
                                        {r.notes}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
