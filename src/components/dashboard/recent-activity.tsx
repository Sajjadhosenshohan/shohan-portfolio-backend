"use client";
import { Activity } from "lucide-react";

// interface RecentActivityItemProps {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
//   timestamp: string;
// }

// function RecentActivityItem({
//   icon,
//   title,
//   description,
//   timestamp,
// }: RecentActivityItemProps) {
//   return (
//     <div className="flex items-start gap-4 rounded-lg border p-4">
//       <div className="rounded-full border p-2">{icon}</div>
//       <div className="flex-1 space-y-1">
//         <p className="text-sm font-medium leading-none">{title}</p>
//         <p className="text-sm text-muted-foreground">{description}</p>
//         <p className="text-xs text-muted-foreground">{timestamp}</p>
//       </div>
//     </div>
//   );
// }

export function RecentActivity() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center p-8 text-center">
        <div className="space-y-2">
          <Activity className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium">No recent activity</h3>
          <p className="text-sm text-muted-foreground">
            Your recent actions will appear here
          </p>
        </div>
      </div>
    </div>
  );
}