import type { Prediction } from "@/types/moderation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

const REQUEST_TIMEOUT_MS = 30000;

interface BackendResponse {
  prediction: string;
  confidence: number;
  risk_score: number;
  matched_words?: string[];
  categories?: string[];
  raw_predictions?: Record<string, number>;
}

export async function analyzeContent(
  text: string
): Promise<Prediction> {
  const content = text.trim();

  if (!content) {
    throw new Error("Content cannot be empty.");
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(
      `${API_BASE_URL}/predict`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: content,
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      let message = "";

      try {
        message = await response.text();
      } catch {
        message = "";
      }

      throw new Error(
        message
          ? `API request failed (${response.status}): ${message}`
          : `API request failed (${response.status})`
      );
    }

    const data =
      (await response.json()) as BackendResponse;

    if (
      typeof data.prediction !== "string" ||
      data.prediction.trim().length === 0
    ) {
      throw new Error(
        "Prediction missing from API response."
      );
    }

    const confidence = Number(
      data.confidence ?? 0
    );

    const riskScore = Number(
      data.risk_score ?? 0
    );

    return {
      label: data.prediction,

      confidence: Number.isFinite(confidence)
        ? confidence
        : 0,

      risk_score: Number.isFinite(riskScore)
        ? riskScore
        : 0,

      matched_words: Array.isArray(
        data.matched_words
      )
        ? data.matched_words
        : [],

      categories: Array.isArray(
        data.categories
      )
        ? data.categories
        : [],

      raw_predictions:
        data.raw_predictions ?? {},
    };
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === "AbortError"
    ) {
      throw new Error(
        "Request timed out. Please try again."
      );
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export default analyzeContent;