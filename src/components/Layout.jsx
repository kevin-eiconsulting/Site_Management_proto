import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({
  currentUser,
  currentPage,
  onNavigate,
  onLogout,
  children,
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <Sidebar
        role={currentUser.role}
        currentUser={currentUser}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />

      {/* Main Column */}
      <div className="flex min-h-screen flex-1 flex-col pl-64">
        <Navbar
          currentUser={currentUser}
          currentPage={currentPage}
          onLogout={onLogout}
        />
        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
