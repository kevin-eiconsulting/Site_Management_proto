import { useState } from "react";
import { projects, progressReports } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import {
  Send,
  Camera,
  Mic,
  CheckCircle2,
  Calendar,
  Users,
  Layers,
  FileText,
  AlertCircle,
} from "lucide-react";

const TODAY = "2026-10-24";

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

export default function DailyReportPage({ currentUser }) {
  const assignedProjects = projects.filter((p) =>
    (currentUser.assignedProjects || []).includes(p.id)
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    assignedProjects.length > 0 ? assignedProjects[0].id : null
  );

  const [form, setForm] = useState({
    date: TODAY,
    completedWork: "",
    quantities: "",
    labourCount: "",
    notes: "",
  });
  const [photosMocked, setPhotosMocked] = useState(false);
  const [audioState, setAudioState] = useState("idle");
  const [saved, setSaved] = useState(false);

  const todaysReports = progressReports.filter(
    (r) => r.projectId === selectedProjectId && r.date === TODAY
  );

  const handleField = (field, value) => {
    setSaved(false);
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotoClick = () => setPhotosMocked(!photosMocked);

  const handleAudioClick = () => {
    if (audioState === "idle") {
      setAudioState("recording");
    } else if (audioState === "recording") {
      setAudioState("saved");
    } else {
      setAudioState("idle");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleProjectChange = (id) => {
    setSelectedProjectId(parseInt(id));
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Submit Daily Progress Report"
        subtitle={`Record completed field tasks, material consumed, headcount, and evidence for ${TODAY}.`}
      />

      <div className="card space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="t-section-title">Daily Field Submission Form</h2>
          <p className="t-caption">Entry will be forwarded to administrative review workflow</p>
        </div>

        {/* Project Selector Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label className="label">Report Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleField("date", e.target.value)}
              className="input text-sm font-mono"
            />
          </div>
        </div>

        {/* Toast Notification */}
        {saved && (
          <div className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              Daily progress report successfully submitted! Status set to "Submitted" for admin review.
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Summary of Completed Work</label>
            <textarea
              rows={3}
              value={form.completedWork}
              onChange={(e) => handleField("completedWork", e.target.value)}
              placeholder="e.g. Completed brick masonry on 3rd floor east wing. Cast 6 columns (C7-C12)..."
              className="input text-sm resize-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Quantities / Materials Utilized</label>
              <textarea
                rows={2}
                value={form.quantities}
                onChange={(e) => handleField("quantities", e.target.value)}
                placeholder="e.g. Cement: 18 bags, Steel: 120 kg, Sand: 3 cum"
                className="input text-sm resize-none"
              />
            </div>
            <div>
              <label className="label">Workforce Headcount On Site</label>
              <input
                type="number"
                min={0}
                value={form.labourCount}
                onChange={(e) => handleField("labourCount", e.target.value)}
                placeholder="Number of crew workers"
                className="input text-sm"
              />
              <p className="field-hint">Total workers actively deployed today</p>
            </div>
          </div>

          <div>
            <label className="label">Field Observations & Remarks</label>
            <textarea
              rows={2}
              value={form.notes}
              onChange={(e) => handleField("notes", e.target.value)}
              placeholder="Inspection remarks, delays, quality checks, cube sampling notes..."
              className="input text-sm resize-none"
            />
          </div>

          {/* Evidence Attachments: Photo and Voice Notes */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-3">
            <div className="t-card-label">Attach Traceable Field Evidence</div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handlePhotoClick}
                className={`btn btn-sm ${
                  photosMocked
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    : "btn-ghost"
                }`}
              >
                <Camera className="h-4 w-4" />
                <span>
                  {photosMocked ? "3 Progress Photos Attached" : "Capture / Upload Photos"}
                </span>
              </button>

              <button
                type="button"
                onClick={handleAudioClick}
                className={`btn btn-sm ${
                  audioState === "recording"
                    ? "bg-rose-50 text-rose-600 border border-rose-300 animate-pulse"
                    : audioState === "saved"
                    ? "bg-purple-50 text-purple-700 border border-purple-300"
                    : "btn-ghost"
                }`}
              >
                <Mic className="h-4 w-4" />
                <span>
                  {audioState === "recording"
                    ? "Recording Audio Note..."
                    : audioState === "saved"
                    ? "Voice Note Attached (0:24)"
                    : "Record Site Voice Note"}
                </span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="btn btn-primary">
              <Send className="h-4 w-4" />
              <span>Submit Daily Report</span>
            </button>
          </div>
        </form>
      </div>

      {/* Today's Existing Reports */}
      {todaysReports.length > 0 && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="t-section-title">Submitted Today for this Site</h3>
              <p className="t-caption">Recorded progress reports for {TODAY}</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {todaysReports.length} submission(s)
            </span>
          </div>

          <div className="space-y-3">
            {todaysReports.map((r) => (
              <div
                key={r.id}
                className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900 text-sm">{r.engineer}</span>
                    <span className="text-xs text-slate-400 font-mono">• {r.date}</span>
                  </div>
                  {getStatusBadge(r.status)}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {r.completedWork}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Workforce: {r.labourCount} workers</span>
                  <span>•</span>
                  <span>Quantities: {r.quantities}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
