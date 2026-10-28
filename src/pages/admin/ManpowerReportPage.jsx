import { useState } from "react";
import { projects, labourWorkers, attendanceRecords } from "../../data/mockData";
import AttendanceBadge from "../../components/AttendanceBadge";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/StatCard";
import Badge from "../../components/ui/Badge";
import { CheckCircle2, XCircle, Clock, Calendar, Filter } from "lucide-react";

const TODAY = "2026-10-24";

export default function ManpowerReportPage() {
  const [selectedProjectId, setSelectedProjectId] = useState(1);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const projectWorkers = labourWorkers.filter((w) => w.projectId === selectedProjectId);
  const todayRecords = attendanceRecords.filter(
    (r) => r.projectId === selectedProjectId && r.date === TODAY
  );

  const present = todayRecords.filter((r) => r.status === "Present").length;
  const absent = todayRecords.filter((r) => r.status === "Absent").length;
  const totalHours = todayRecords.reduce((sum, r) => sum + r.hours, 0);
  const attendancePct = projectWorkers.length > 0 ? Math.round((present / projectWorkers.length) * 100) : 0;

  const getRecord = (workerId) =>
    todayRecords.find((r) => r.workerId === workerId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manpower Report"
        subtitle={`Daily workforce presence, utilization, and hours verification for ${TODAY}.`}
      />

      <div className="card space-y-6">
        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Project:
            </label>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(parseInt(e.target.value))}
              className="input w-72 text-sm"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="t-caption">Active Project:</span>
            <Badge variant="active">{selectedProject?.name}</Badge>
          </div>
        </div>

        {/* 3 Metric Stat Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            color="green"
            label="Present on Site"
            value={present}
            context={`${attendancePct}% of allocated crew`}
          />
          <StatCard
            icon={<XCircle className="h-5 w-5" />}
            color="yellow"
            label="Absent Workers"
            value={absent}
            context="recorded leave or absent"
          />
          <StatCard
            icon={<Clock className="h-5 w-5" />}
            color="blue"
            label="Cumulative Man-Hours"
            value={`${totalHours} hrs`}
            context="logged shift duration today"
          />
        </div>

        {/* Attendance Rate Progress bar */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
            <span className="t-card-label">Turnout Efficiency</span>
            <span className="text-sm font-bold text-slate-900">{attendancePct}% verified</span>
          </div>
          <div className="w-full bg-slate-200/70 rounded-full h-3 overflow-hidden">
            <div
              className="h-3 rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${attendancePct}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-1.5">
            <span>0% (Minimum)</span>
            <span>100% Full Attendance</span>
          </div>
        </div>

        {/* Per-worker attendance breakdown */}
        {projectWorkers.length > 0 && (
          <div className="space-y-3">
            <div className="t-card-label">Workforce Allocation Roster</div>
            <div className="grid gap-2">
              {projectWorkers.map((w) => {
                const rec = getRecord(w.id);
                const isPresent = rec?.status === "Present";
                return (
                  <div
                    key={w.id}
                    className="flex items-center gap-4 rounded-lg border border-slate-100 bg-white p-3 text-xs"
                  >
                    <div className="w-36 font-medium text-slate-900 truncate">{w.name}</div>
                    <Badge variant="muted" className="text-[11px]">
                      {w.category}
                    </Badge>
                    <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${
                          isPresent ? "bg-emerald-500 w-full" : "bg-rose-400 w-24"
                        }`}
                      />
                    </div>
                    <div className="w-20 text-right">
                      <AttendanceBadge status={rec?.status || "Absent"} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Detailed Attendance Table */}
        <div className="space-y-3 pt-2">
          <div className="t-section-title">Detailed Attendance Log</div>
          <div className="card-flush overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="th">Worker Name</th>
                  <th className="th">Trade Category</th>
                  <th className="th">Status</th>
                  <th className="th">Logged Hours</th>
                  <th className="th">Engineer Notes / Remarks</th>
                </tr>
              </thead>
              <tbody>
                {projectWorkers.map((w) => {
                  const rec = getRecord(w.id);
                  return (
                    <tr key={w.id}>
                      <td className="td font-medium text-slate-900">{w.name}</td>
                      <td className="td text-slate-600">{w.category}</td>
                      <td className="td">
                        {rec ? (
                          <AttendanceBadge status={rec.status} />
                        ) : (
                          <span className="text-xs text-slate-400">Not recorded</span>
                        )}
                      </td>
                      <td className="td font-mono text-slate-700">
                        {rec ? `${rec.hours} hrs` : "—"}
                      </td>
                      <td className="td text-slate-500 text-xs">
                        {rec?.notes ? (
                          <span className="text-slate-700">{rec.notes}</span>
                        ) : (
                          <span className="text-slate-400 italic">No notes recorded</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
