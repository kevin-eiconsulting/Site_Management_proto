import { projects, labourWorkers } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import { MapPin, HardHat, Calendar, Users, Building2 } from "lucide-react";

export default function MyProjectsPage({ currentUser }) {
  const assignedProjects = projects.filter((p) =>
    (currentUser.assignedProjects || []).includes(p.id)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Assigned Projects"
        subtitle="Active construction sites where you are designated as the lead site engineer."
      />

      {assignedProjects.length === 0 ? (
        <div className="card text-center py-12">
          <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">No Projects Assigned</h3>
          <p className="text-sm text-slate-400 mt-1">
            Contact your system administrator to assign sites to your engineer account.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {assignedProjects.map((p) => {
            const workers = labourWorkers.filter((w) => w.projectId === p.id);
            return (
              <div
                key={p.id}
                className="card flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-slate-900 text-base leading-tight">
                      {p.name}
                    </h3>
                    <Badge variant={p.status === "Active" ? "success" : "warning"}>
                      {p.status}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{p.site}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HardHat className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>Engineers: {p.engineer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-mono">Commenced: {p.startDate}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    <span>{workers.length} Workforce allocated</span>
                  </span>
                  <Badge variant="accent" className="text-[11px]">
                    Lead Engineer
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
