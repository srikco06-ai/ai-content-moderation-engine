import { MAX_HISTORY_ITEMS } from "@/constants/storage";
import type { HistoryItem } from "@/types/moderation";

/**
 * Safely converts unknown data into a valid HistoryItem array.
 * Prevents runtime errors caused by malformed localStorage data.
 */
export function sanitizeHistory(data: unknown): HistoryItem[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.reduce<HistoryItem[]>((history, item) => {
    if (!item || typeof item !== "object") {
      return history;
    }

    const record = item as Partial<HistoryItem>;

    const text =
      typeof record.text === "string"
        ? record.text.trim()
        : "";

    // Ignore empty history records.
    if (!text) {
      return history;
    }

    const confidence = Number(record.confidence ?? 0);
    const riskScore = Number(record.risk_score ?? 0);

    history.push({
      text,

      label:
        typeof record.label === "string"
          ? record.label
          : "Safe",

      confidence: Number.isFinite(confidence)
        ? confidence
        : 0,

      risk_score: Number.isFinite(riskScore)
        ? riskScore
        : 0,

      categories: Array.isArray(record.categories)
        ? record.categories.filter(
            (category): category is string =>
              typeof category === "string"
          )
        : [],

      time:
        typeof record.time === "string" &&
        record.time.trim().length > 0
          ? record.time
          : new Date().toISOString(),
    });

    return history;
  }, []);
}

/**
 * Returns a new history array with the latest entry added.
 * Newest entries appear first.
 */
export function addHistoryItem(
  history: HistoryItem[],
  item: HistoryItem,
  maxItems: number = MAX_HISTORY_ITEMS
): HistoryItem[] {
  return [item, ...history].slice(0, maxItems);
}

/**
 * Sorts history by newest first.
 */
export function sortHistory(
  history: HistoryItem[]
): HistoryItem[] {
  return [...history].sort(
    (a, b) =>
      new Date(b.time).getTime() -
      new Date(a.time).getTime()
  );
}