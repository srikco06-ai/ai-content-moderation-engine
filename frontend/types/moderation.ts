import type { BadgeProps } from "@/components/ui/Badge";

export interface Prediction {
  label: string;
  confidence: number;
  risk_score: number;
  matched_words: string[];
  categories: string[];
  raw_predictions?: Record<string, number>;
}

export interface HistoryItem {
  text: string;
  label: string;
  confidence: number;
  risk_score: number;
  categories: string[];
  time: string;
}

export type RiskMeterSeverity =
  | "LOW"
  | "MEDIUM"
  | "HIGH";

export interface Severity {
  label: string;
  variant: BadgeProps["variant"];
  meter: RiskMeterSeverity;
}