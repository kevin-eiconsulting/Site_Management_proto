import { projects } from "../data/mockData";
import { MapPin, HardHat, Calendar } from "lucide-react";
import Badge from "./ui/Badge";

export default function ProjectTable({ onSelectProject }) {
  return (
    <div className="card-flush overflow-x-auto">
      <table className="table-base">
        <thead>
          <tr>
            <th className="th">Project Name</th>
            <th className="th">Site Location</th>
            <th className="th">Status</th>
            <th className="th">Site Engineer</th>
            <th className="th">Start Date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              className="cursor-pointer transition-colors"
              onClick={() => onSelectProject && onSelectProject(p)}
            >
              <td className="td font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                {p.name}
              </td>
              <td className="td text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{p.site}</span>
                </span>
              </td>
              <td className="td">
                <Badge variant={p.status === "Active" ? "success" : "warning"}>
                  {p.status}
                </Badge>
              </td>
              <td className="td text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <HardHat className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{p.engineer}</span>
                </span>
              </td>
              <td className="td text-slate-500 font-mono text-xs">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span>{p.startDate}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
