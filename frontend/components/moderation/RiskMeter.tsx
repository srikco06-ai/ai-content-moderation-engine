"use client";

import Badge from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import type { RiskMeterSeverity } from "@/types/moderation";

interface RiskMeterProps {
  score: number;
  severity: RiskMeterSeverity;
  className?: string;
}

const severityStyles = {
  LOW: {
    badge: "success",
    bar: "bg-green-500",
    track: "bg-green-100",
    text: "text-green-700",
  },
  MEDIUM: {
    badge: "warning",
    bar: "bg-yellow-500",
    track: "bg-yellow-100",
    text: "text-yellow-700",
  },
  HIGH: {
    badge: "danger",
    bar: "bg-red-500",
    track: "bg-red-100",
    text: "text-red-700",
  },
} as const;

export default function RiskMeter({
  score,
  severity,
  className,
}: RiskMeterProps) {
  const value = Math.max(0, Math.min(score, 100));
  const style = severityStyles[severity];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Risk Score
          </p>

          <h3 className="text-3xl font-bold text-slate-900">
            {value}%
          </h3>
        </div>

        <Badge variant={style.badge}>
          {severity}
        </Badge>
      </div>

      <div
        className={cn(
          "h-3 w-full overflow-hidden rounded-full",
          style.track
        )}
        role="progressbar"
        aria-label="Content risk score"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-700 ease-out",
            style.bar
          )}
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">
          Content Safety
        </span>

        <span className={cn("font-semibold", style.text)}>
          {severity} RISK
        </span>
      </div>
    </div>
  );
}
