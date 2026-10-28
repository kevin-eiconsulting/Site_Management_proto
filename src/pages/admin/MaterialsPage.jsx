import { useState } from "react";
import { projects, materialIncome, materialOutgoing } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import TabBar from "../../components/ui/TabBar";
import StatCard from "../../components/StatCard";
import Badge from "../../components/ui/Badge";
import {
  Layers,
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  FileDown,
  Package,
  Receipt,
  Truck,
} from "lucide-react";

const TABS = [
  { key: "Material Ledger", label: "Material Ledger", icon: <Layers className="h-4 w-4" /> },
  { key: "Income", label: "Material Income", icon: <ArrowDownLeft className="h-4 w-4" /> },
  { key: "Outgoing", label: "Material Outgoing", icon: <ArrowUpRight className="h-4 w-4" /> },
  { key: "Reports", label: "Stock Analytics", icon: <BarChart3 className="h-4 w-4" /> },
];

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

export default function MaterialsPage() {
  const [activeTab, setActiveTab] = useState("Material Ledger");
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || 1);

  const pid = parseInt(selectedProjectId);
  const selectedProject = projects.find((p) => p.id === pid);
  const filteredIncome = materialIncome.filter((r) => r.projectId === pid);
  const filteredOutgoing = materialOutgoing.filter((r) => r.projectId === pid);
  const ledger = buildLedger(pid);

  // Reports tab calculations
  const mostUsed = filteredOutgoing.reduce(
    (max, r) => (!max || r.quantity > max.quantity ? r : max),
    null
  );
  const maxBar = Math.max(...ledger.map((l) => Math.max(l.totalIn, l.totalOut)), 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Materials & Stock Ledger"
        subtitle="Manage materials received from suppliers, site consumption, receipts, and live inventory balance."
      />

      {/* Tabs and Project Filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Site:
          </span>
          <select
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="input w-64 text-sm"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Material Ledger Tab */}
      {activeTab === "Material Ledger" && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="t-section-title">Stock Balance for {selectedProject?.name}</h2>
              <p className="t-caption">Calculated balance based on recorded income and site consumption</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {ledger.length} materials tracked
            </span>
          </div>

          {ledger.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">
              No material transactions logged for this site yet.
            </p>
          ) : (
            <div className="card-flush overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th className="th">Material / Item</th>
                    <th className="th">Measurement Unit</th>
                    <th className="th num">Total In (Received)</th>
                    <th className="th num">Total Out (Issued)</th>
                    <th className="th num">Current Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.map((l) => {
                    const balance = l.totalIn - l.totalOut;
                    return (
                      <tr key={l.item}>
                        <td className="td font-semibold text-slate-900">{l.item}</td>
                        <td className="td text-slate-500 font-mono text-xs">{l.unit}</td>
                        <td className="td num font-semibold text-emerald-600">
                          +{l.totalIn.toLocaleString()}
                        </td>
                        <td className="td num font-semibold text-rose-500">
                          -{l.totalOut.toLocaleString()}
                        </td>
                        <td className="td num">
                          <span
                            className={`font-bold px-2 py-0.5 rounded text-xs ${
                              balance >= 0
                                ? "bg-blue-50 text-blue-700 font-mono"
                                : "bg-rose-50 text-rose-700 font-mono"
                            }`}
                          >
                            {balance.toLocaleString()} {l.unit}
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

      {/* Income Tab */}
      {activeTab === "Income" && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="t-section-title">Received Shipments & Receipts</h2>
              <p className="t-caption">Vendor deliveries, challans, and verified documentation</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {filteredIncome.length} deliveries
            </span>
          </div>

          {filteredIncome.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No deliveries logged yet.</p>
          ) : (
            <div className="card-flush overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th className="th">Date</th>
                    <th className="th">Item Name</th>
                    <th className="th num">Delivered Qty</th>
                    <th className="th">Unit</th>
                    <th className="th">Vendor / Supplier</th>
                    <th className="th">Invoice / Challan</th>
                    <th className="th">Receipt Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIncome.map((r) => (
                    <tr key={r.id}>
                      <td className="td font-mono text-xs text-slate-600">{r.date}</td>
                      <td className="td font-medium text-slate-900">{r.item}</td>
                      <td className="td num font-semibold text-emerald-600">{r.quantity}</td>
                      <td className="td text-slate-500 font-mono text-xs">{r.unit}</td>
                      <td className="td text-slate-700">{r.supplier}</td>
                      <td className="td font-mono text-xs text-slate-500">{r.invoiceNo}</td>
                      <td className="td">
                        <span className="inline-flex items-center gap-1.5 text-blue-600 text-xs font-medium cursor-pointer hover:underline bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                          <FileDown className="h-3.5 w-3.5" />
                          <span>{r.receipt}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Outgoing Tab */}
      {activeTab === "Outgoing" && (
        <div className="card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="t-section-title">Material Consumption & Issues</h2>
              <p className="t-caption">Materials dispatched to specific tasks and zones on site</p>
            </div>
            <span className="t-caption bg-slate-100 px-2.5 py-1 rounded-md font-medium">
              {filteredOutgoing.length} issues logged
            </span>
          </div>

          {filteredOutgoing.length === 0 ? (
            <p className="text-sm text-slate-400 py-8 text-center">No material outgoing records.</p>
          ) : (
            <div className="card-flush overflow-x-auto">
              <table className="table-base">
                <thead>
                  <tr>
                    <th className="th">Date</th>
                    <th className="th">Item</th>
                    <th className="th num">Issued Qty</th>
                    <th className="th">Unit</th>
                    <th className="th">Task / Activity</th>
                    <th className="th">Destination / Wing</th>
                    <th className="th">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOutgoing.map((r) => (
                    <tr key={r.id}>
                      <td className="td font-mono text-xs text-slate-600">{r.date}</td>
                      <td className="td font-medium text-slate-900">{r.item}</td>
                      <td className="td num font-semibold text-rose-500">{r.quantity}</td>
                      <td className="td text-slate-500 font-mono text-xs">{r.unit}</td>
                      <td className="td text-slate-800 font-medium">{r.task}</td>
                      <td className="td text-slate-600">{r.destination}</td>
                      <td className="td text-slate-400 text-xs">{r.remarks || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Reports / Analytics Tab */}
      {activeTab === "Reports" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<Receipt className="h-5 w-5" />}
              color="blue"
              label="Supplier Challans"
              value={filteredIncome.length}
              context="verified material receipts"
            />
            <StatCard
              icon={<Truck className="h-5 w-5" />}
              color="purple"
              label="Total Transactions"
              value={filteredIncome.length + filteredOutgoing.length}
              context="movement actions recorded"
            />
            <StatCard
              icon={<Package className="h-5 w-5" />}
              color="green"
              label="Primary Consumed Material"
              value={mostUsed ? mostUsed.item : "None"}
              context={mostUsed ? `${mostUsed.quantity} ${mostUsed.unit} issued` : "No usage"}
            />
          </div>

          {/* Bar comparison visualization */}
          <div className="card space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="t-section-title">Income vs Outgoing Comparison</h3>
              <p className="t-caption">Visual breakdown of total inbound delivery vs site utilization</p>
            </div>

            {ledger.length === 0 ? (
              <p className="text-sm text-slate-400 py-6 text-center">No data available.</p>
            ) : (
              <div className="space-y-5">
                {ledger.map((l) => (
                  <div key={l.item} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-semibold text-slate-900 text-sm">{l.item}</span>
                      <span className="text-xs text-slate-500 font-mono">Unit: {l.unit}</span>
                    </div>

                    <div className="space-y-2">
                      {/* Inbound bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 w-16 text-right">
                          Received
                        </span>
                        <div className="flex-1 bg-slate-200/70 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(l.totalIn / maxBar) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-emerald-700 w-16 font-mono">
                          {l.totalIn}
                        </span>
                      </div>

                      {/* Outbound bar */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-rose-500 w-16 text-right">
                          Consumed
                        </span>
                        <div className="flex-1 bg-slate-200/70 rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-rose-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${(l.totalOut / maxBar) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-rose-600 w-16 font-mono">
                          {l.totalOut}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
