import os
from create_docx import DocxBuilder

doc = DocxBuilder()

# ----------------- COVER / HEADER -----------------
doc.add_title("SitePulse Ops – Website Implementation Documentation", "Centralized Field Operations, Daily Progress & Material Control Prototype")

doc.add_callout(
    "DOCUMENT SUMMARY & SCOPE",
    "This document provides a comprehensive technical and functional overview of the SitePulse Ops prototype codebase. It details the implemented modules for both Administrator and Site Engineer roles, data models, user workflows, and features a specialized breakdown of the 'Stage-wise progress for notes' across site operations."
)

# ----------------- SECTION 1: ARCHITECTURE & TECH STACK -----------------
doc.add_heading_1("1. Architecture & Technology Stack")

doc.add_paragraph(
    "SitePulse Ops is a modern web application prototype engineered to streamline site management, labour attendance, materials ledgering, and daily progress reporting. It replaces fragmented spreadsheets and chat threads with structured, auditable operational records."
)

doc.add_bullet("Frontend Framework: React 19 with Vite 8 development server and fast hot module replacement (HMR).", "Technology:")
doc.add_bullet("Styling Engine: Tailwind CSS v4 utilizing modern CSS variables and responsive design principles.", "UI Styling:")
doc.add_bullet("Component Architecture: Modular component design with role-aware layouts, reusable badges, stat tiles, and tab bars.", "Components:")
doc.add_bullet("Iconography: Lucide React iconography optimized for clarity and construction domain semantics.", "Icons:")
doc.add_bullet("Code Quality: Oxlint configured for fast, high-performance JavaScript/JSX linting.", "Linting:")

doc.add_heading_2("Role-Based Access Control (RBAC) & Authentication")
doc.add_paragraph(
    "The application enforces role-based view isolation via App.jsx and LoginPage.jsx. Users authenticate and are immediately routed to their designated domain workspace."
)

auth_headers = ["User Role", "Demo Account Email", "Default Password", "Assigned Scope / Projects"]
auth_rows = [
    ["Administrator", "admin@site.com", "admin123", "Global administrative access to all projects, materials, and reports."],
    ["Site Engineer (Lead)", "ravi@site.com", "eng123", "Site operations access for Project 1 (Greenfield) and Project 2 (Bridge Expansion)."],
    ["Site Engineer", "suresh@site.com", "eng123", "Site operations access for Project 2 (Highway Bridge Expansion)."]
]
doc.add_table(auth_headers, auth_rows, [1800, 2400, 1600, 3560])

# ----------------- SECTION 2: ADMIN PORTAL IMPLEMENTATION -----------------
doc.add_heading_1("2. Administrator Portal – Implemented Modules")
doc.add_paragraph(
    "The administrator workspace provides complete operational transparency, high-level reporting, and review mechanisms across all construction sites."
)

doc.add_heading_2("2.1 Operations Dashboard (DashboardPage.jsx)")
doc.add_bullet("Real-time operational KPI cards: Total Projects, Active Sites, Total Registered Workforce, and Turnout Percentage for the day.", "KPI Cards:")
doc.add_bullet("Interactive project summary directory allowing administrators to inspect active projects.", "Project Directory:")
doc.add_bullet("Worker drawer / details panel that displays allocated personnel, trades, and subcontractors when any site is clicked.", "Workforce Drawer:")

doc.add_heading_2("2.2 Projects Directory (ProjectsPage.jsx)")
doc.add_bullet("Overview of all sites, locations, start dates, and lead engineer designations.", "Site Registry:")
doc.add_bullet("Modal dialog enabling administrators to drill down into the full roster of workers assigned to any site.", "Workforce Modal:")

doc.add_heading_2("2.3 Labour Master Register (LabourRegisterPage.jsx)")
doc.add_bullet("Master database of all registered site workers across all projects.", "Master Directory:")
doc.add_bullet("Classification by trade skills (Mason, Helper, Carpenter, Electrician, Plumber) and contractor agencies.", "Trade Skills:")
doc.add_bullet("Site filter dropdown to quickly isolate labour cohorts by project location.", "Filtering:")

doc.add_heading_2("2.4 Manpower Analytics & Turnout (ManpowerReportPage.jsx)")
doc.add_bullet("Daily attendance metrics: Present count, Absent count, and Cumulative logged Man-Hours for the active shift.", "Shift Metrics:")
doc.add_bullet("Visual turnout efficiency bar displaying overall crew presence percentage.", "Turnout Bar:")
doc.add_bullet("Visual workforce roster displaying individual worker status and trade badges.", "Roster View:")
doc.add_bullet("Detailed attendance log table displaying worker names, categories, presence status, hours, and engineer remarks.", "Detailed Log:")

doc.add_heading_2("2.5 Daily Progress Reports Review (ProgressReportsPage.jsx)")
doc.add_bullet("Administrative sign-off board tracking submissions in real time (Total Submissions, Pending Review, Approved).", "Review Board:")
doc.add_bullet("Site-specific filtering to isolate reports by construction project.", "Site Filter:")
doc.add_bullet("Expandable report rows displaying detailed completed work descriptions, material quantities used, and remarks.", "Detailed Work:")
doc.add_bullet("Verification of attached photographic evidence tags and linked audio notes.", "Evidence Verification:")
doc.add_bullet("Special callout container for critical site notes entered by the lead engineer.", "Engineer Notes Box:")

doc.add_heading_2("2.6 Materials & Stock Ledger (MaterialsPage.jsx)")
doc.add_bullet("Material Ledger Tab: Real-time calculated inventory balance (Total Received minus Total Outgoing) per material item.", "Stock Ledger:")
doc.add_bullet("Material Income Tab: Inbound vendor deliveries, invoice/challan numbers, quantities, and receipt document links.", "Inbound Shipments:")
doc.add_bullet("Material Outgoing Tab: Material consumption logs with task descriptions, structural wing destinations, and batch remarks.", "Material Issues:")
doc.add_bullet("Stock Analytics Tab: Comparative visualization bars plotting inbound deliveries vs outbound consumption with key transaction totals.", "Stock Analytics:")

# ----------------- SECTION 3: ENGINEER PORTAL IMPLEMENTATION -----------------
doc.add_heading_1("3. Site Engineer Portal – Implemented Modules (Mobile-First)")
doc.add_paragraph(
    "Designed specifically for mobile devices and field engineers on active construction sites, prioritizing high-efficiency data entry, proof collection, and offline-ready flows."
)

doc.add_heading_2("3.1 My Assigned Projects (MyProjectsPage.jsx)")
doc.add_bullet("Isolated project view showing only the construction sites where the logged-in user is designated as the engineer.", "Project Isolation:")
doc.add_bullet("Project overview cards showing site addresses, co-assigned engineers, start dates, and workforce headcount.", "Site Cards:")

doc.add_heading_2("3.2 Daily Labour Attendance (AttendancePage.jsx)")
doc.add_bullet("Rapid check-in toggle interface allowing the engineer to toggle workers between Present and Absent with single clicks.", "Quick Check-in:")
doc.add_bullet("Configurable shift duration inputs (in 0.5-hour increments) with notes on task assignments or absence justifications.", "Hours & Notes:")
doc.add_bullet("Verified attendance history card showing submitted and saved roster entries for the current date.", "Audit Trail:")

doc.add_heading_2("3.3 Labour Notes & Observations (LabourNotesPage.jsx)")
doc.add_bullet("Targeted observation form: select site, choose individual worker, and enter detailed qualitative performance evaluations.", "Observation Form:")
doc.add_bullet("Covers craftsmanship quality, work pacing, safety adherence, tool requirements, and subcontracted work standards.", "Scope of Notes:")
doc.add_bullet("Persistent site observation history feed indexing notes by date, engineer name, and worker name.", "History Stream:")

doc.add_heading_2("3.4 Daily Progress Report Submission (DailyReportPage.jsx)")
doc.add_bullet("Standardized daily submission form capturing work completed, quantities utilized, and crew size.", "Work Summary:")
doc.add_bullet("Photo evidence simulator supporting camera capture and multi-photo attachments.", "Photo Evidence:")
doc.add_bullet("Interactive voice note recorder with idle, recording, and attached state toggles.", "Audio Notes:")
doc.add_bullet("Submission feed displaying reports filed today with administrative review statuses (Submitted, Approved, Correction Required).", "Status Tracker:")

doc.add_heading_2("3.5 Field Material Operations (MaterialsEngineerPage.jsx)")
doc.add_bullet("Record Inbound Receipt: Log new shipments from suppliers, invoice/challan details, and attach delivery slip PDFs.", "Inbound Logging:")
doc.add_bullet("Record Outbound Issue: Disburse stock against specific structural tasks (e.g. Slab Casting, Pier Reinforcement) and destination wings.", "Outbound Logging:")
doc.add_bullet("Live Stock View: Real-time inventory table showing available material stock on site to prevent shortages.", "Live Balance:")

# ----------------- SECTION 4: STAGE-WISE PROGRESS FOR NOTES -----------------
doc.add_heading_1("4. Stage-Wise Progress for Notes")

doc.add_callout(
    "CORE ARCHITECTURAL CONCEPT: AUDITABLE NOTE PROGRESSION",
    "In the SitePulse Ops system, notes represent vital operational intelligence. Notes capture performance, safety, material anomalies, testing reminders, and verbal field reports. The system implements a 5-stage progression model ensuring every note is captured, bound to identity, submitted, reviewed, and permanently archived."
)

doc.add_heading_2("Stage 1: Field Capture & Classification")
doc.add_paragraph(
    "Notes are collected at the point of origin on the construction site across four primary contexts:"
)
doc.add_bullet("Logged in LabourNotesPage. Evaluates individual tradesmen on masonry accuracy, joinery standards, pace, and safety compliance.", "1. Worker Performance Notes:")
doc.add_bullet("Logged in AttendancePage. Accompanies daily attendance to describe the specific zone/task worked or reason for absence (e.g. sick leave, emergency).", "2. Shift & Task Notes:")
doc.add_bullet("Logged in DailyReportPage. Captures critical site observations (e.g. concrete cube samples taken, equipment availability, inspection milestones).", "3. Field Progress Observations:")
doc.add_bullet("Captured in DailyReportPage. Voice memos recorded via microphone for engineers who need fast, hands-free reporting while inspecting work.", "4. Voice Recording Notes:")

doc.add_heading_2("Stage 2: Contextual Indexing & Identity Binding")
doc.add_paragraph(
    "Before a note is committed, the application binds it to a strict contextual data structure to maintain legal and operational traceability:"
)
doc.add_bullet("Binds the note to the exact construction site location.", "Project Association:")
doc.add_bullet("Links the note directly to the specific worker or subcontractor entity.", "Personnel Association:")
doc.add_bullet("Tags the note with the authenticated Site Engineer's ID and full name.", "Author Attribution:")
doc.add_bullet("Stores the precise calendar date and shift timestamp of the observation.", "Temporal Indexing:")
doc.add_bullet("Pairs notes with corroborating photographic files or delivery receipts.", "Evidence Pairing:")

doc.add_heading_2("Stage 3: Daily Report Submission & Lifecycle Transition")
doc.add_paragraph(
    "Notes that form part of the daily progress submission enter a formal status lifecycle defined in the architecture specification:"
)

lifecycle_headers = ["Lifecycle Stage", "System Status", "Trigger / Actor", "Operational Meaning"]
lifecycle_rows = [
    ["1. Field Entry", "Draft / In-Progress", "Site Engineer", "Notes entered locally during site walk-throughs; editable by engineer."],
    ["2. Formal Filing", "Submitted", "Site Engineer", "Report and notes submitted; locked against unauthorized changes; queued for admin."],
    ["3. Verification", "Under Review", "Administrator", "Admin actively reviewing task descriptions, cube tests, photos, and voice notes."],
    ["4. Resolution A", "Approved", "Administrator", "Observations verified, quantities validated, and report permanently closed."],
    ["5. Resolution B", "Correction Required", "Administrator", "Admin flags missing test reports or discrepancies; notes returned to engineer."]
]
doc.add_table(lifecycle_headers, lifecycle_rows, [1800, 2000, 2000, 3560])

doc.add_heading_2("Stage 4: Administrative Review & Actionable Verification")
doc.add_paragraph(
    "In ProgressReportsPage and ManpowerReportPage, administrators review submitted notes in specialized UI components:"
)
doc.add_bullet("Highlighted in yellow/amber callout cards to draw attention to pending engineering tasks (e.g. 'Ensure vibrator is available for pour').", "Special Engineer Notes:")
doc.add_bullet("Audio player badges allowing administrators to verify audio recordings directly from the field.", "Audio Verification:")
doc.add_bullet("Attendance logs highlight specific worker notes to account for overtime, uncompleted quotas, or absences.", "Manpower Justification:")

doc.add_heading_2("Stage 5: Historical Archival & Cross-Module Auditing")
doc.add_paragraph(
    "Once reviewed, notes enter permanent historical indexes across three core modules:"
)
doc.add_bullet("Permanently visible in the Site Observation History stream, creating a permanent performance profile for subcontractors and workers.", "Worker Profiles:")
doc.add_bullet("Preserved in daily manpower records for client audit trails and wage verification.", "Attendance Records:")
doc.add_bullet("Linked to material consumption entries to verify why specific quantities were consumed in designated structural wings.", "Material Audits:")

# ----------------- SECTION 5: DATA ENTITIES -----------------
doc.add_heading_1("5. Core Data Entities Summary")
doc.add_paragraph(
    "The prototype includes rich mock data models defined in mockData.js that reflect realistic construction operations:"
)

entity_headers = ["Entity Model", "Primary Fields", "Description / Implementation"]
entity_rows = [
    ["Projects", "id, name, site, status, startDate, engineer", "Active construction sites and assigned lead engineers."],
    ["Users", "id, name, email, password, role, assignedProjects", "Admins and site engineers with multi-project authorization."],
    ["LabourWorkers", "id, name, category, subcontractor, projectId", "Trade workers categorized by skills and subcontractor links."],
    ["AttendanceRecords", "id, workerId, projectId, date, status, hours, notes", "Daily presence, logged shift hours, and worker notes."],
    ["LabourNotes", "id, workerId, projectId, date, engineer, note", "Qualitative observation notes indexed by worker and project."],
    ["ProgressReports", "id, projectId, date, engineer, completedWork, quantities, labourCount, status, photos, notes, audioNote", "Comprehensive daily reports with status lifecycle, photos, and voice memos."],
    ["MaterialIncome", "id, projectId, date, item, quantity, unit, supplier, invoiceNo, receipt", "Inbound materials with supplier metadata and receipt attachments."],
    ["MaterialOutgoing", "id, projectId, date, item, quantity, unit, task, destination, remarks", "Outbound materials deducted for specific structural tasks and wings."]
]
doc.add_table(entity_headers, entity_rows, [2000, 3600, 3760])

# ----------------- SECTION 6: FUTURE ROADMAP -----------------
doc.add_heading_1("6. Architecture Roadmap & Next Implementation Steps")
doc.add_paragraph(
    "Based on the system architecture document (Site_management_software-system architecture.pdf), the next phases of development include:"
)
doc.add_bullet("Admin dealer requirement generation, material requests, and automatic PDF generation for vendor purchase orders.", "MVP 5 - Dealer Orders:")
doc.add_bullet("Migration from local mock storage to PostgreSQL database with secure relational foreign keys and indices.", "Database Persistence:")
doc.add_bullet("Direct image and audio uploads to Amazon S3 via secure pre-signed URLs to keep VPS hosting lightweight.", "Object Storage (S3):")
doc.add_bullet("Node.js / Express REST API with JWT authentication and refresh tokens.", "Backend API:")

output_filename = "SitePulse_Website_Documentation.docx"
output_path = os.path.abspath(output_filename)
doc.build_docx(output_path)
print(f"Successfully generated DOCX file at: {output_path}")
print(f"File size: {os.path.getsize(output_path)} bytes")
