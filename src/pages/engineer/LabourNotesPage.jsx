import { useState } from "react";
import { projects, labourWorkers, labourNotes } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { ScrollText, Save, CheckCircle2, User, Calendar } from "lucide-react";

export default function LabourNotesPage({ currentUser }) {
  const assignedProjects = projects.filter((p) =>
    (currentUser.assignedProjects || []).includes(p.id)
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    assignedProjects.length > 0 ? assignedProjects[0].id : null
  );
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const projectWorkers = labourWorkers.filter((w) => w.projectId === selectedProjectId);
  const existingNotes = labourNotes.filter((n) => n.projectId === selectedProjectId);

  const handleProjectChange = (id) => {
    setSelectedProjectId(parseInt(id));
    setSelectedWorkerId("");
    setNote("");
    setSaved(false);
  };

  const handleSave = () => {
    if (!selectedWorkerId || !note.trim()) return;
    setSaved(true);
    setNote("");
    setTimeout(() => setSaved(false), 3000);
  };

  const getWorkerName = (id) => labourWorkers.find((w) => w.id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <PageHeader
        title="Labour Notes & Performance"
        subtitle="Log observations, performance notes, safety compliance, and site requirements per worker."
      />

      {/* Note Creation Card */}
      <div className="card space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="t-section-title">Record New Observation</h2>
          <p className="t-caption">Notes will be indexed against worker profile and project records</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Construction Site</label>
            <select
              value={selectedProjectId || ""}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="input text-sm"
            >
              {assignedProjects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Target Worker</label>
            <select
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(parseInt(e.target.value))}
              className="input text-sm"
            >
              <option value="">Select a worker...</option>
              {projectWorkers.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} ({w.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Note Details & Site Observation</label>
          <textarea
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setSaved(false);
            }}
            rows={4}
            placeholder="Document worker skills, work pace, quality, safety remarks, or material requirements..."
            className="input text-sm resize-none"
          />
        </div>

        {saved && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Worker observation saved and linked to project audit trail!</span>
          </div>
        )}

        <div>
          <button
            type="button"
            onClick={handleSave}
            disabled={!selectedWorkerId || !note.trim()}
            className="btn btn-primary"
          >
            <Save className="h-4 w-4" />
            <span>Save Observation</span>
          </button>
        </div>
      </div>

      {/* Existing Notes List */}
      <div className="card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="t-section-title">Site Observation History</h3>
            <p className="t-caption">Recorded notes for the active site</p>
          </div>
          <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
            {existingNotes.length} notes on record
          </span>
        </div>

        {existingNotes.length === 0 ? (
          <p className="text-sm text-slate-400 py-8 text-center">
            No observation notes logged for this site yet.
          </p>
        ) : (
          <div className="space-y-3">
            {existingNotes.map((n) => (
              <div
                key={n.id}
                className="rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:border-slate-300 shadow-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold text-xs">
                      <User className="h-3.5 w-3.5" />
                    </span>
                    <span className="font-semibold text-slate-900 text-sm">
                      {getWorkerName(n.workerId)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Calendar className="h-3 w-3 text-slate-400" />
                      {n.date}
                    </span>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">Eng. {n.engineer}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3 rounded-lg border border-slate-100 mt-2">
                  {n.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
