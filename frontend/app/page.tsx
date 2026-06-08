"use client";

import { useEffect, useMemo, useState } from "react";

type Prediction = {
  label: string;
  confidence: number;
  risk_score: number;
  matched_words: string[];
  categories: string[];
  raw_predictions?: Record<string, number>;
};

type HistoryItem = {
  text: string;
  label: string;
  confidence: number;
  risk_score: number;
  categories: string[];
  time: string;
};

const STORAGE_KEY = "moderation-history";

function sanitizeHistory(data: unknown): HistoryItem[] {
  if (!Array.isArray(data)) return [];

  return data.map((item) => {
    const record = item as Partial<HistoryItem>;

    return {
      text: record.text ?? "",
      label: record.label ?? "Safe",
      confidence: Number(record.confidence ?? 0),
      risk_score: Number(record.risk_score ?? 0),
      categories: Array.isArray(record.categories)
        ? record.categories
        : [],
      time: record.time ?? "",
    };
  });
}

export default function Home() {
  // HYDRATION SAFE
 const [text, setText] = useState("");

const [result, setResult] =
  useState<Prediction | null>(null);

const [loading, setLoading] =
  useState(false);

const [history, setHistory] =
  useState<HistoryItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) {
        return [];
      }

      return sanitizeHistory(
        JSON.parse(saved)
      );
    } catch {
      return [];
    }
  });

useEffect(() => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
}, [history]);


  const checkContent =
    async () => {
      if (!text.trim()) return;

      setLoading(true);
      setResult(null);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/predict`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              text,
            }),
          }
        );

        if (!res.ok) {
          throw new Error(
            "API request failed"
          );
        }

        const data: Prediction =
          await res.json();

        const prediction: Prediction =
          {
            label:
              data.label ??
              "API Error",
            confidence:
              Number(
                data.confidence ?? 0
              ),
            risk_score:
              Number(
                data.risk_score ?? 0
              ),
            matched_words:
              Array.isArray(
                data.matched_words
              )
                ? data.matched_words
                : [],
            categories:
              Array.isArray(
                data.categories
              )
                ? data.categories
                : [],
            raw_predictions:
              data.raw_predictions ??
              {},
          };

        setResult(prediction);

        const newItem: HistoryItem =
          {
            text,
            label:
              prediction.label,
            confidence:
              prediction.confidence,
            risk_score:
              prediction.risk_score,
            categories:
              prediction.categories,
            time:
              new Date().toLocaleTimeString(),
          };

        setHistory((prev) => [
          newItem,
          ...prev,
        ]);
      } catch (error) {
        console.error(error);

        setResult({
          label: "API Error",
          confidence: 0,
          risk_score: 0,
          matched_words: [],
          categories: [],
          raw_predictions: {},
        });
      } finally {
        setLoading(false);
      }
    };

  const clearHistory = () => {
    setHistory([]);
    setResult(null);
    setText("");
    localStorage.removeItem(
      STORAGE_KEY
    );
  };

  const toxicCount = useMemo(
    () =>
      history.filter(
        (item) =>
          item.label ===
          "Toxic"
      ).length,
    [history]
  );

  const safeCount = useMemo(
    () =>
      history.filter(
        (item) =>
          item.label === "Safe"
      ).length,
    [history]
  );

  const getSeverity = (
    score: number
  ) => {
    if (score <= 20) {
      return {
        label: "Low Risk",
        color:
          "bg-yellow-100 text-yellow-800 border-yellow-300",
      };
    }

    if (score <= 50) {
      return {
        label:
          "Medium Risk",
        color:
          "bg-orange-100 text-orange-800 border-orange-300",
      };
    }

    if (score <= 80) {
      return {
        label: "High Risk",
        color:
          "bg-red-100 text-red-800 border-red-300",
      };
    }

    return {
      label: "Critical",
      color:
        "bg-red-200 text-red-900 border-red-500",
    };
  };

  const isToxic =
    result?.label ===
    "Toxic";

  const severity = result
    ? getSeverity(
        result.risk_score
      )
    : null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Main Card */}
        <div className="rounded-2xl bg-white p-10 shadow-xl">
          <h1 className="mb-4 text-4xl font-black text-slate-900">
            AI Content Moderation Engine
          </h1>

          <p className="mb-6 text-slate-600">
            Detect toxic or unsafe text using FastAPI + Next.js.
          </p>

          <textarea
            value={text}
            onChange={(e) =>
              setText(
                e.target.value
              )
            }
            placeholder="Enter text to analyze..."
            className="mb-6 h-40 w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-black"
          />

          <div className="flex flex-wrap gap-4">
            <button
              onClick={
                checkContent
              }
              disabled={
                loading
              }
              className="rounded-xl bg-black px-6 py-3 font-semibold text-white disabled:opacity-50"
            >
              {loading
                ? "Analyzing..."
                : "Analyze Text"}
            </button>

            <button
              onClick={
                clearHistory
              }
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold"
            >
              Clear History
            </button>
          </div>

          {/* Result */}
          {result && (
            <div
              className={`mt-8 rounded-xl border p-6 ${
                isToxic
                  ? "border-red-300 bg-red-50"
                  : "border-green-300 bg-green-50"
              }`}
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h2 className="text-2xl font-bold">
                  Result:{" "}
                  {
                    result.label
                  }
                </h2>

                {severity && (
                  <span
                    className={`rounded-full border px-3 py-1 text-sm font-semibold ${severity.color}`}
                  >
                    {
                      severity.label
                    }
                  </span>
                )}
              </div>

              {result.label !==
                "API Error" && (
                <div className="space-y-2 text-slate-800">
                  <p className="text-lg">
                    Confidence:{" "}
                    {
                      result.confidence
                    }
                    %
                  </p>

                  <p className="text-lg">
                    Risk Score:{" "}
                    {
                      result.risk_score
                    }
                    /100
                  </p>

                  {result
                    .categories
                    .length >
                    0 && (
                    <p className="text-sm">
                      <span className="font-semibold">
                        Categories:
                      </span>{" "}
                      {result.categories.join(
                        ", "
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">
              Total Analyses
            </p>
            <h3 className="text-3xl font-bold">
              {history.length}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">
              Toxic Count
            </p>
            <h3 className="text-3xl font-bold text-red-600">
              {toxicCount}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <p className="text-sm text-slate-500">
              Safe Count
            </p>
            <h3 className="text-3xl font-bold text-green-600">
              {safeCount}
            </h3>
          </div>
        </div>

        {/* History */}
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">
            Moderation History
          </h2>

          {history.length ===
          0 ? (
            <p className="text-slate-500">
              No moderation history yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-slate-500">
                    <th className="py-3">
                      Text
                    </th>
                    <th className="py-3">
                      Label
                    </th>
                    <th className="py-3">
                      Confidence
                    </th>
                    <th className="py-3">
                      Risk
                    </th>
                    <th className="py-3">
                      Categories
                    </th>
                    <th className="py-3">
                      Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {history.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={`${item.time}-${index}`}
                        className="border-b"
                      >
                        <td className="py-3 pr-4">
                          {
                            item.text
                          }
                        </td>

                        <td
                          className={`py-3 font-semibold ${
                            item.label ===
                            "Toxic"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {
                            item.label
                          }
                        </td>

                        <td className="py-3">
                          {
                            item.confidence
                          }
                          %
                        </td>

                        <td className="py-3">
                          {
                            item.risk_score
                          }
                          /100
                        </td>

                        <td className="py-3">
                          {item
                            .categories
                            .length > 0
                            ? item.categories.join(
                                ", "
                              )
                            : "-"}
                        </td>

                        <td className="py-3">
                          {
                            item.time
                          }
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}