export const users = [
  { id: 1, name: "Admin User", email: "admin@site.com", password: "admin123", role: "admin" },
  { id: 2, name: "Ravi Kumar", email: "ravi@site.com", password: "eng123", role: "engineer", assignedProjects: [1, 2] },
  { id: 3, name: "Suresh Patel", email: "suresh@site.com", password: "eng123", role: "engineer", assignedProjects: [2] },
];

export const projects = [
  { id: 1, name: "Greenfield Residential Complex", site: "Sector 14, Gurgaon", status: "Active", startDate: "2026-03-01", engineer: "Ravi Kumar" },
  { id: 2, name: "Highway Bridge Expansion", site: "NH-48, Manesar", status: "Active", startDate: "2026-05-15", engineer: "Ravi Kumar, Suresh Patel" },
  { id: 3, name: "Commercial Tower B", site: "Cyber City, DLF Phase 2", status: "Planning", startDate: "2026-09-01", engineer: "Unassigned" },
];

export const labourWorkers = [
  { id: 1, name: "Ramesh Yadav", category: "Mason", subcontractor: "Sharma Contractors", projectId: 1 },
  { id: 2, name: "Deepak Singh", category: "Helper", subcontractor: "Sharma Contractors", projectId: 1 },
  { id: 3, name: "Ajay Verma", category: "Carpenter", subcontractor: "Verma Works", projectId: 1 },
  { id: 4, name: "Mohan Lal", category: "Mason", subcontractor: "Self", projectId: 2 },
  { id: 5, name: "Pradeep Kumar", category: "Electrician", subcontractor: "Power Infra", projectId: 2 },
  { id: 6, name: "Sanjay Mishra", category: "Plumber", subcontractor: "Self", projectId: 2 },
];

export const attendanceRecords = [
  // Project 1 - today
  { id: 1, workerId: 1, projectId: 1, date: "2026-10-24", status: "Present", hours: 8, notes: "Completed brick laying on 3rd floor east wing" },
  { id: 2, workerId: 2, projectId: 1, date: "2026-10-24", status: "Present", hours: 7.5, notes: "" },
  { id: 3, workerId: 3, projectId: 1, date: "2026-10-24", status: "Absent", hours: 0, notes: "Called in sick" },
  // Project 1 - yesterday
  { id: 4, workerId: 1, projectId: 1, date: "2026-10-23", status: "Present", hours: 8, notes: "" },
  { id: 5, workerId: 2, projectId: 1, date: "2026-10-23", status: "Present", hours: 8, notes: "" },
  { id: 6, workerId: 3, projectId: 1, date: "2026-10-23", status: "Present", hours: 6, notes: "Left early - family emergency" },
  // Project 2 - today
  { id: 7, workerId: 4, projectId: 2, date: "2026-10-24", status: "Present", hours: 9, notes: "Formwork for pier 3" },
  { id: 8, workerId: 5, projectId: 2, date: "2026-10-24", status: "Present", hours: 8, notes: "Cable routing section B" },
  { id: 9, workerId: 6, projectId: 2, date: "2026-10-24", status: "Absent", hours: 0, notes: "" },
];

export const labourNotes = [
  { id: 1, workerId: 1, projectId: 1, date: "2026-10-24", engineer: "Ravi Kumar", note: "Excellent progress on brick laying. On track to complete 3rd floor by end of week." },
  { id: 2, workerId: 3, projectId: 1, date: "2026-10-22", engineer: "Ravi Kumar", note: "Needs to improve quality of wood joinery. Will review again tomorrow." },
  { id: 3, workerId: 4, projectId: 2, date: "2026-10-24", engineer: "Suresh Patel", note: "Good work on pier formwork. Ensure concrete pour schedule is maintained." },
];

// MVP 2 — Progress Reports
export const progressReports = [
  {
    id: 1, projectId: 1, date: "2026-10-24", engineerId: 2,
    engineer: "Ravi Kumar",
    completedWork: "Completed brick laying on 3rd floor east wing. Columns C7-C12 cast.",
    quantities: "Brick: 2400 units, Cement: 18 bags, Steel: 120 kg",
    labourCount: 12, remarks: "Work on schedule. No issues.",
    status: "Submitted", photos: ["progress_3rdfloor_east.jpg", "column_cast.jpg"],
    notes: "Concrete cube samples taken for testing.",
    audioNote: "audio_ravi_241024.mp3"
  },
  {
    id: 2, projectId: 1, date: "2026-10-23", engineerId: 2,
    engineer: "Ravi Kumar",
    completedWork: "Shuttering for 3rd floor slab completed on west wing.",
    quantities: "Plywood shuttering: 450 sqft, Props: 60 units",
    labourCount: 10, remarks: "Minor delay due to material delivery. Resolved.",
    status: "Approved", photos: ["shuttering_west.jpg"],
    notes: "",
    audioNote: ""
  },
  {
    id: 3, projectId: 2, date: "2026-10-24", engineerId: 2,
    engineer: "Ravi Kumar",
    completedWork: "Pier 3 formwork completed. Reinforcement cage placed.",
    quantities: "Steel: 850 kg, Formwork: 320 sqft",
    labourCount: 18, remarks: "Ready for concrete pour tomorrow.",
    status: "Under Review", photos: ["pier3_formwork.jpg", "rebar_pier3.jpg"],
    notes: "Ensure vibrator is available for pour.",
    audioNote: "audio_ravi_bridge_241024.mp3"
  },
  {
    id: 4, projectId: 2, date: "2026-10-23", engineerId: 3,
    engineer: "Suresh Patel",
    completedWork: "Abutment A2 backfilling completed.",
    quantities: "Compacted fill: 85 cum",
    labourCount: 14, remarks: "Compaction test done, results awaited.",
    status: "Correction Required", photos: ["abutment_a2.jpg"],
    notes: "Test report to be uploaded once received.",
    audioNote: ""
  },
];

// MVP 3 — Materials
export const materialIncome = [
  { id: 1, projectId: 1, date: "2026-10-22", item: "Cement (OPC 53)", quantity: 200, unit: "Bags", supplier: "UltraTech Cement Ltd", invoiceNo: "INV-2026-441", receipt: "receipt_cement_441.pdf" },
  { id: 2, projectId: 1, date: "2026-10-23", item: "Steel TMT Bars (Fe500)", quantity: 2500, unit: "Kg", supplier: "SAIL Stockist", invoiceNo: "INV-2026-892", receipt: "receipt_steel_892.pdf" },
  { id: 3, projectId: 1, date: "2026-10-24", item: "River Sand", quantity: 15, unit: "Cum", supplier: "Local Supplier", invoiceNo: "CH-334", receipt: "challan_sand_334.pdf" },
  { id: 4, projectId: 2, date: "2026-10-21", item: "Cement (OPC 53)", quantity: 500, unit: "Bags", supplier: "Ambuja Cement", invoiceNo: "INV-2026-290", receipt: "receipt_cement_290.pdf" },
  { id: 5, projectId: 2, date: "2026-10-23", item: "Steel TMT Bars (Fe500)", quantity: 8500, unit: "Kg", supplier: "JSW Steel Dealer", invoiceNo: "INV-2026-778", receipt: "receipt_steel_778.pdf" },
  { id: 6, projectId: 2, date: "2026-10-24", item: "Formwork Plywood", quantity: 80, unit: "Sheets", supplier: "Veneer World", invoiceNo: "INV-2026-105", receipt: "receipt_ply_105.pdf" },
];

export const materialOutgoing = [
  { id: 1, projectId: 1, date: "2026-10-23", item: "Cement (OPC 53)", quantity: 18, unit: "Bags", task: "3rd Floor Slab Casting", destination: "3rd Floor - West Wing", remarks: "" },
  { id: 2, projectId: 1, date: "2026-10-24", item: "Steel TMT Bars (Fe500)", quantity: 120, unit: "Kg", task: "Column Reinforcement C7-C12", destination: "3rd Floor - East Wing", remarks: "Cut and bent on site" },
  { id: 3, projectId: 1, date: "2026-10-24", item: "River Sand", quantity: 3, unit: "Cum", task: "Brick Mortar", destination: "3rd Floor Masonry", remarks: "" },
  { id: 4, projectId: 2, date: "2026-10-23", item: "Cement (OPC 53)", quantity: 75, unit: "Bags", task: "Abutment A2 PCC", destination: "Abutment A2", remarks: "" },
  { id: 5, projectId: 2, date: "2026-10-24", item: "Steel TMT Bars (Fe500)", quantity: 850, unit: "Kg", task: "Pier 3 Reinforcement Cage", destination: "Pier 3", remarks: "" },
  { id: 6, projectId: 2, date: "2026-10-24", item: "Formwork Plywood", quantity: 32, unit: "Sheets", task: "Pier 3 Formwork", destination: "Pier 3", remarks: "Reusable shuttering" },
];
