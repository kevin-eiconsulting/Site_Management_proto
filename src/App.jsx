import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

// Admin pages
import DashboardPage from "./pages/admin/DashboardPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import LabourRegisterPage from "./pages/admin/LabourRegisterPage";
import ManpowerReportPage from "./pages/admin/ManpowerReportPage";
import ProgressReportsPage from "./pages/admin/ProgressReportsPage";
import MaterialsPage from "./pages/admin/MaterialsPage";

// Engineer pages
import MyProjectsPage from "./pages/engineer/MyProjectsPage";
import AttendancePage from "./pages/engineer/AttendancePage";
import LabourNotesPage from "./pages/engineer/LabourNotesPage";
import DailyReportPage from "./pages/engineer/DailyReportPage";
import MaterialsEngineerPage from "./pages/engineer/MaterialsEngineerPage";

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentPage(user.role === "admin" ? "dashboard" : "myprojects");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    if (currentUser.role === "admin") {
      switch (currentPage) {
        case "dashboard":     return <DashboardPage />;
        case "projects":      return <ProjectsPage />;
        case "labour":        return <LabourRegisterPage />;
        case "manpower":      return <ManpowerReportPage />;
        case "admin-progress-reports": return <ProgressReportsPage />;
        case "admin-materials":        return <MaterialsPage />;
        default:              return <DashboardPage />;
      }
    } else {
      switch (currentPage) {
        case "myprojects":    return <MyProjectsPage currentUser={currentUser} />;
        case "attendance":    return <AttendancePage currentUser={currentUser} />;
        case "labournotes":   return <LabourNotesPage currentUser={currentUser} />;
        case "engineer-daily-report": return <DailyReportPage currentUser={currentUser} />;
        case "engineer-materials":    return <MaterialsEngineerPage currentUser={currentUser} />;
        default:              return <MyProjectsPage currentUser={currentUser} />;
      }
    }
  };

  return (
    <Layout
      currentUser={currentUser}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
}
