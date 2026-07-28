import { Activity, ShieldAlert, ShieldCheck } from "lucide-react";

import StatCard from "@/components/dashboard/StatCard";

export interface StatisticsProps {
  total: number;
  toxic: number;
  safe: number;
}

export function Statistics({
  total,
  toxic,
  safe,
}: StatisticsProps) {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      <StatCard
        title="Total Analyses"
        value={total}
        description="Total moderation requests"
        icon={<Activity className="h-6 w-6" />}
      />

      <StatCard
        title="Toxic Count"
        value={toxic}
        description="Flagged as unsafe"
        icon={<ShieldAlert className="h-6 w-6" />}
        className="border-red-200"
      />

      <StatCard
        title="Safe Count"
        value={safe}
        description="Approved content"
        icon={<ShieldCheck className="h-6 w-6" />}
        className="border-green-200"
      />
    </section>
  );
}

export default Statistics;