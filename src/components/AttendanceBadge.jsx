import { CheckCircle2, XCircle } from "lucide-react";
import Badge from "./ui/Badge";

export default function AttendanceBadge({ status }) {
  if (status === "Present") {
    return (
      <Badge variant="success" icon={<CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />}>
        Present
      </Badge>
    );
  }
  return (
    <Badge variant="danger" icon={<XCircle className="h-3.5 w-3.5 text-rose-600" />}>
      Absent
    </Badge>
  );
}
