import { useState } from "react";
import { projects, materialIncome, materialOutgoing } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import TabBar from "../../components/ui/TabBar";
import Badge from "../../components/ui/Badge";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Layers,
  Save,
  CheckCircle2,
  Paperclip,
  Package,
} from "lucide-react";

const TABS = [
  { key: "Record Income", label: "Record Inbound Receipt", icon: <ArrowDownLeft className="h-4 w-4" /> },
  { key: "Record Outgoing", label: "Record Outbound Issue", icon: <ArrowUpRight className="h-4 w-4" /> },
  { key: "View Stock", label: "View Live Stock", icon: <Layers className="h-4 w-4" /> },
];

const UNITS = ["Bags", "Kg", "Cum", "Sheets", "Units"];

function buildLedger(projectId) {
  const income = materialIncome.filter((r) => r.projectId === projectId);
  const outgoing = materialOutgoing.filter((r) => r.projectId === projectId);

  const ledger = {};
  income.forEach((r) => {
    if (!ledger[r.item]) ledger[r.item] = { item: r.item, unit: r.unit, totalIn: 0, totalOut: 0 };
    ledger[r.item].totalIn += r.quantity;
  });
  outgoing.forEach((r) => {
    if (!ledger[r.item]) ledger[r.item] = { item: r.item, unit: r.unit, totalIn: 0, totalOut: 0 };
    ledger[r.item].totalOut += r.quantity;
  });

  return Object.values(ledger);
}

export default function MaterialsEngineerPage({ currentUser }) {
  const assignedProjects = projects.filter((p) =>
    (currentUser.assignedProjects || []).includes(p.id)
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    assignedProjects.length > 0 ? assignedProjects[0].id : null
  );
  const [activeTab, setActiveTab] = useState("Record Income");
  const [savedIncome, setSavedIncome] = useState(false);
  const [savedOutgoing, setSavedOutgoing] = useState(false);
  const [receiptMocked, setReceiptMocked] = useState(false);

  const pid = parseInt(selectedProjectId);
  const ledger = buildLedger(pid);
  const incomeItems = materialIncome
    .filter((r) => r.projectId === pid)
    .map((r) => r.item)
    .filter((v, i, a) => a.indexOf(v) === i);

  // Income form
  const [incomeForm, setIncomeForm] = useState({
    item: "",
    quantity: "",
    unit: "Bags",
    supplier: "",
    invoiceNo: "",
  });

  // Outgoing form
  const [outgoingForm, setOutgoingForm] = useState({
    item: incomeItems[0] || "",
    quantity: "",
    unit: "Bags",
    task: "",
    destination: "",
    remarks: "",
  });

  const handleIncomeField = (f, v) => {
    setSavedIncome(false);
    setIncomeForm((prev) => ({ ...prev, [f]: v }));
  };

  const handleOutgoingField = (f, v) => {
    setSavedOutgoing(false);
    setOutgoingForm((prev) => ({ ...prev, [f]: v }));
  };

  const handleSaveIncome = (e) => {
    e.preventDefault();
    setSavedIncome(true);
    setTimeout(() => setSavedIncome(false), 3000);
  };

  const handleSaveOutgoing = (e) => {
    e.preventDefault();
    setSavedOutgoing(true);
    setTimeout(() => setSavedOutgoing(false), 3000);
  };

  const handleProjectChange = (id) => {
    setSelectedProjectId(parseInt(id));
    setSavedIncome(false);
    setSavedOutgoing(false);
    setReceiptMocked(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Field Material Operations"
        subtitle="Record incoming material deliveries, site disbursements, and inspect live inventory balance."
      />

      {/* Tabs and Project Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Site:
          </span>
          <select
            value={selectedProjectId || ""}
            onChange={(e) => handleProjectChange(e.target.value)}
            className="input w-64 text-sm"
          >
            {assignedProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Record Income Tab */}
      {activeTab === "Record Income" && (
        <div className="card space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="t-section-title">Record Incoming Material Delivery</h2>
            <p className="t-caption">Log supplier deliveries, quantities, and attach challans</p>
          </div>

          {savedIncome && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Material receipt recorded and posted to project inventory ledger!</span>
            </div>
          )}

          <form onSubmit={handleSaveIncome} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Material / Item Description</label>
                <input
                  type="text"
                  value={incomeForm.item}
                  onChange={(e) => handleIncomeField("item", e.target.value)}
                  placeholder="e.g. Cement (OPC 53) or TMT Steel Fe500"
                  className="input text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Received Quantity</label>
                  <input
                    type="number"
                    min={0}
                    value={incomeForm.quantity}
                    onChange={(e) => handleIncomeField("quantity", e.target.value)}
                    placeholder="0"
                    className="input text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="label">Unit</label>
                  <select
                    value={incomeForm.unit}
                    onChange={(e) => handleIncomeField("unit", e.target.value)}
                    className="input text-sm"
                  >
                    {UNITS.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Supplier / Stockist Name</label>
                <input
                  type="text"
                  value={incomeForm.supplier}
                  onChange={(e) => handleIncomeField("supplier", e.target.value)}
                  placeholder="e.g. UltraTech Cement Ltd"
                  className="input text-sm"
                  required
                />
              </div>
              <div>
                <label className="label">Challan / Invoice Number</label>
                <input
                  type="text"
                  value={incomeForm.invoiceNo}
                  onChange={(e) => handleIncomeField("invoiceNo", e.target.value)}
                  placeholder="e.g. INV-2026-441"
                  className="input text-sm font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Delivery Document / Challan Evidence</label>
              <button
                type="button"
                onClick={() => setReceiptMocked(!receiptMocked)}
                className={`btn btn-sm ${
                  receiptMocked
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                    : "btn-ghost"
                }`}
              >
                <Paperclip className="h-4 w-4" />
                <span>
                  {receiptMocked ? "Challan Receipt Attached (PDF)" : "Upload Delivery Challan / Slip"}
                </span>
              </button>
            </div>

            <div className="pt-2">
              <button type="submit" className="btn btn-primary">
                <Save className="h-4 w-4" />
                <span>Save Delivery Receipt</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Record Outgoing Tab */}
      {activeTab === "Record Outgoing" && (
        <div className="card space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="t-section-title">Record Material Issue / Site Consumption</h2>
            <p className="t-caption">Disburse inventory to work tasks and specific structural areas</p>
          </div>

          {savedOutgoing && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-medium text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Material consumption recorded and deducted from site balance!</span>
            </div>
          )}

          <form onSubmit={handleSaveOutgoing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Select Stock Item</label>
                {incomeItems.length > 0 ? (
                  <select
                    value={outgoingForm.item}
                    onChange={(e) => handleOutgoingField("item", e.target.value)}
                    className="input text-sm"
                  >
                    {incomeItems.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                ) : (
                  <p className="text-sm text-slate-400 py-2">No material stock received yet.</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Disbursed Quantity</label>
                  <input
                    type="number"
                    min={0}
                    value={outgoingForm.quantity}
                    onChange={(e) => handleOutgoingField("quantity", e.target.value)}
                    placeholder="0"
                    className="input text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="label">Unit</label>
                  <select
                    value={outgoingForm.unit}
                    onChange={(e) => handleOutgoingField("unit", e.target.value)}
                    className="input text-sm"
                  >
                    {UNITS.map((u) => (
                      <option key={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Task / Activity</label>
                <input
                  type="text"
                  value={outgoingForm.task}
                  onChange={(e) => handleOutgoingField("task", e.target.value)}
                  placeholder="e.g. 3rd Floor Slab Casting"
                  className="input text-sm"
                  required
                />
              </div>
              <div>
                <label className="label">Destination / Wing Location</label>
                <input
                  type="text"
                  value={outgoingForm.destination}
                  onChange={(e) => handleOutgoingField("destination", e.target.value)}
                  placeholder="e.g. West Wing Grid 4-7"
                  className="input text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label">Remarks</label>
              <input
                type="text"
                value={outgoingForm.remarks}
                onChange={(e) => handleOutgoingField("remarks", e.target.value)}
                placeholder="Optional batch or usage notes..."
                className="input text-sm"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="btn btn-primary">
                <Save className="h-4 w-4" />
                <span>Save Material Issue</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* View Stock Tab */}
      {activeTab === "View Stock" && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="t-section-title">Current On-Site Material Inventory</h2>
              <p className="t-caption">Live balance available at site store</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {ledger.length} materials registered
            </span>
          </div>

          {ledger.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">
              No inventory recorded for this site yet.
            </p>
          ) : (
            <div className="card-flush overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th className="th">Material / Item</th>
                    <th className="th">Unit</th>
                    <th className="th num">Total Received</th>
                    <th className="th num">Total Issued</th>
                    <th className="th num">Available Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((l) => {
                    const balance = l.totalIn - l.totalOut;
                    return (
                      <tr key={l.item}>
                        <td className="td font-medium text-slate-900">{l.item}</td>
                        <td className="td text-slate-500 font-mono text-xs">{l.unit}</td>
                        <td className="td num font-semibold text-emerald-600">{l.totalIn}</td>
                        <td className="td num font-semibold text-rose-500">{l.totalOut}</td>
                        <td className="td num">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-xs ${
                              balance >= 0
                                ? "bg-blue-50 text-blue-700 font-mono"
                                : "bg-rose-50 text-rose-700 font-mono"
                            }`}
                          >
                            {balance} {l.unit}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
