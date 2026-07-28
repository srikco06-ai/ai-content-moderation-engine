import type { BadgeProps } from "@/components/ui/Badge";

export type RiskMeterSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Severity {
  label: string;
  variant: BadgeProps["variant"];
  meter: RiskMeterSeverity;
}

export function getSeverity(
  score: number
): Severity {
  if (score <= 20) {
    return {
      label: "Low Risk",
      variant: "warning",
      meter: "LOW",
    };
  }

  if (score <= 50) {
    return {
      label: "Medium Risk",
      variant: "danger",
      meter: "MEDIUM",
    };
  }

  return {
    label: "High Risk",
    variant: "critical",
    meter: "HIGH",
  };
}