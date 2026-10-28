import { useState } from "react";
import { projects, labourWorkers, attendanceRecords } from "../../data/mockData";
import AttendanceBadge from "../../components/AttendanceBadge";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { CheckCircle2, XCircle, Save, Check, Filter, Clock } from "lucide-react";

const TODAY = "2026-10-24";

export default function AttendancePage({ currentUser }) {
  const assignedProjects = projects.filter((p) =>
    (currentUser.assignedProjects || []).includes(p.id)
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    assignedProjects.length > 0 ? assignedProjects[0].id : null
  );
  const [attendanceData, setAttendanceData] = useState({});
  const [saved, setSaved] = useState(false);

  const projectWorkers = labourWorkers.filter((w) => w.projectId === selectedProjectId);
  const existingToday = attendanceRecords.filter(
    (r) => r.projectId === selectedProjectId && r.date === TODAY
  );

  const getWorkerData = (workerId) =>
    attendanceData[workerId] || { status: "Present", hours: 8, notes: "" };

  const updateWorker = (workerId, field, value) => {
    setSaved(false);
    setAttendanceData((prev) => ({
      ...prev,
      [workerId]: { ...getWorkerData(workerId), [field]: value },
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleProjectChange = (id) => {
    setSelectedProjectId(parseInt(id));
    setAttendanceData({});
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mark Daily Attendance"
        subtitle={`Fast, mobile-friendly labour check-in for shift date: ${TODAY}.`}
      />

      <div className="card space-y-5">
        {/* Project Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              Assigned Site:
            </span>
            <select
              value={selectedProjectId || ""}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="input w-72 text-sm"
            >
              {assignedProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
            {projectWorkers.length} site workers registered
          </span>
        </div>

        {/* Success toast */}
        {saved && (
          <div className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Attendance records submitted and logged for verification!</span>
          </div>
        )}

        {projectWorkers.length === 0 ? (
          <p className="text-sm text-slate-400 py-8 text-center">
            No labour personnel assigned to this site yet.
          </p>
        ) : (
          <div className="space-y-3">
            {projectWorkers.map((w) => {
              const data = getWorkerData(w.id);
              const isPresent = data.status === "Present";

              return (
                <div
                  key={w.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs transition-colors hover:border-slate-300"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-slate-900 text-sm">{w.name}</span>
                      <Badge variant="muted">{w.category}</Badge>
                      <span className="text-xs text-slate-400">({w.subcontractor})</span>
                    </div>

                    <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                      <button
                        type="button"
                        onClick={() => updateWorker(w.id, "status", "Present")}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                          isPresent
                            ? "bg-emerald-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-emerald-700 hover:bg-white"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Present</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => updateWorker(w.id, "status", "Absent")}
                        className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                          !isPresent
                            ? "bg-rose-600 text-white shadow-xs"
                            : "text-slate-600 hover:text-rose-700 hover:bg-white"
                        }`}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Absent</span>
                      </button>
                    </div>
                  </div>

                  {isPresent ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          Hours Worked
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="24"
                          step="0.5"
                          value={data.hours}
                          onChange={(e) =>
                            updateWorker(w.id, "hours", parseFloat(e.target.value) || 0)
                          }
                          className="input text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">
                          Notes / Task Remarks
                        </label>
                        <input
                          type="text"
                          value={data.notes}
                          onChange={(e) => updateWorker(w.id, "notes", e.target.value)}
                          placeholder="e.g. Masonry 3rd floor west"
                          className="input text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-xs font-medium text-slate-600 mb-1 block">
                        Reason for Absence (optional)
                      </label>
                      <input
                        type="text"
                        value={data.notes}
                        onChange={(e) => updateWorker(w.id, "notes", e.target.value)}
                        placeholder="e.g. Personal emergency or medical leave"
                        className="input text-sm"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3">
              <button type="button" onClick={handleSave} className="btn btn-primary">
                <Save className="h-4 w-4" />
                <span>Save All Attendance</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Existing Records for Today */}
      {existingToday.length > 0 && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="t-section-title">Verified Attendance on Record Today</h3>
              <p className="t-caption">Previously captured roster entries for {TODAY}</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {existingToday.length} records
            </span>
          </div>

          <div className="card-flush overflow-x-auto">
            <table className="table-base">
              <thead>
                <tr>
                  <th className="th">Worker Name</th>
                  <th className="th">Status</th>
                  <th className="th num">Hours Logged</th>
                  <th className="th">Field Notes</th>
                </tr>
              </thead>
              <tbody>
                {existingToday.map((r) => {
                  const worker = labourWorkers.find((w) => w.id === r.workerId);
                  return (
                    <tr key={r.id}>
                      <td className="td font-medium text-slate-900">{worker?.name || "—"}</td>
                      <td className="td">
                        <AttendanceBadge status={r.status} />
                      </td>
                      <td className="td num font-mono text-slate-700">{r.hours} hrs</td>
                      <td className="td text-slate-500 text-xs">
                        {r.notes || <span className="text-slate-400 italic">No notes</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
