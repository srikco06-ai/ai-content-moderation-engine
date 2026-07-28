

"use client";

import { useCallback, useMemo, useState } from "react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import EmptyHistory from "@/components/history/EmptyHistory";

import type { HistoryItem } from "@/types/moderation";

export interface HistoryTableProps {
  history: HistoryItem[];
}

const PAGE_SIZE = 10;

type FilterOption =
  | "all"
  | "safe"
  | "toxic"
  | "api error";

type SortOption =
  | "newest"
  | "oldest";

function getBadgeVariant(label: string) {
  switch (label.toLowerCase()) {
    case "toxic":
      return "danger" as const;

    case "safe":
      return "success" as const;

    case "api error":
      return "warning" as const;

    default:
      return "info" as const;
  }
}

function exportCSV(items: HistoryItem[]) {
  if (!items.length) return;

  const rows = [
    [
      "Text",
      "Result",
      "Confidence",
      "Risk Score",
      "Categories",
      "Timestamp",
    ],
    ...items.map((item) => [
      `"${item.text.replace(/"/g, '""')}"`,
      item.label,
      item.confidence.toFixed(2),
      item.risk_score,
      `"${item.categories.join(", ")}"`,
      new Date(item.time).toLocaleString(),
    ]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "moderation-history.csv";
  link.click();

  URL.revokeObjectURL(url);
}

export default function HistoryTable({
  history,
}: HistoryTableProps) {
  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState<FilterOption>("all");

  const [sort, setSort] =
    useState<SortOption>("newest");

  const [page, setPage] = useState(1);

  const filteredHistory = useMemo(() => {
    let items = [...history];

    if (filter !== "all") {
      items = items.filter(
        (item) =>
          item.label.toLowerCase() === filter
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();

      items = items.filter(
        (item) =>
          item.text
            .toLowerCase()
            .includes(q) ||
          item.categories.some((c) =>
            c.toLowerCase().includes(q)
          )
      );
    }

    items.sort((a, b) => {
      const first = new Date(a.time).getTime();
      const second = new Date(b.time).getTime();

      return sort === "newest"
        ? second - first
        : first - second;
    });

    return items;
  }, [history, filter, search, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredHistory.length / PAGE_SIZE
    )
  );

  const currentPage = Math.min(
    page,
    totalPages
  );

  const paginatedHistory = useMemo(() => {
    const start =
      (currentPage - 1) * PAGE_SIZE;

    return filteredHistory.slice(
      start,
      start + PAGE_SIZE
    );
  }, [filteredHistory, currentPage]);

  const copyText = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(
          text
        );
      } catch {}
    },
    []
  );

  return (
    <Card
      padding="lg"
      shadow="md"
      rounded="xl"
      className="mt-8"
    >
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Analysis History
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse previous moderation
            results.
          </p>
        </div>

        <Badge variant="info">
          {filteredHistory.length}{" "}
          {filteredHistory.length === 1
            ? "Item"
            : "Items"}
        </Badge>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-4">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search..."
          className="rounded-lg border border-slate-300 px-4 py-2 outline-none transition focus:border-blue-500"
        />

        <select
          value={filter}
          onChange={(e) => {
            setFilter(
              e.target.value as FilterOption
            );
            setPage(1);
          }}
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="all">
            All Results
          </option>

          <option value="safe">
            Safe
          </option>

          <option value="toxic">
            Toxic
          </option>

          <option value="api error">
            API Error
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value as SortOption);
            setPage(1);
          }}
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>
        </select>

        <button
          onClick={() =>
            exportCSV(filteredHistory)
          }
          className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
        >
          Export CSV
        </button>
      </div>
      {filteredHistory.length === 0 ? (
        <EmptyHistory />
      ) : (
        <>
          {/* Mobile View */}
          <div className="space-y-4 lg:hidden">
            {paginatedHistory.map((item, index) => (
              <div
                key={`${item.time}-${index}`}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant={getBadgeVariant(item.label)}>
                    {item.label}
                  </Badge>

                  <span className="text-xs text-slate-500">
                    {new Date(item.time).toLocaleString()}
                  </span>
                </div>

                <p className="mb-4 line-clamp-4 wrap-break-word text-sm text-slate-700">
                  {item.text}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">
                      Confidence
                    </p>

                    <p className="font-semibold">
                      {item.confidence.toFixed(2)}%
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Risk Score
                    </p>

                    <p className="font-semibold">
                      {item.risk_score}/100
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-2 text-sm text-slate-500">
                    Categories
                  </p>

                  {item.categories.length ? (
                    <div className="flex flex-wrap gap-2">
                      {item.categories.map((category) => (
                        <Badge
                          key={category}
                          variant="info"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-400">
                      None
                    </span>
                  )}
                </div>

                <button
                  onClick={() =>
                    copyText(item.text)
                  }
                  className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                >
                  Copy Text
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto rounded-xl border border-slate-200 lg:block">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Text
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Result
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Confidence
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Risk
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Categories
                  </th>

                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Time
                  </th>

                  <th className="px-4 py-3 text-center font-semibold text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedHistory.map(
                  (item, index) => (
                    <tr
                      key={`${item.time}-${index}`}
                      className="border-t transition-colors hover:bg-slate-50"
                    >
                      <td className="max-w-sm px-4 py-4 align-top">
                        <div className="line-clamp-3 wrap-break-word">
                          {item.text}
                        </div>
                      </td>

                      <td className="px-4 py-4 align-top">
                        <Badge
                          variant={getBadgeVariant(
                            item.label
                          )}
                        >
                          {item.label}
                        </Badge>
                      </td>

                      <td className="px-4 py-4 align-top font-medium">
                        {item.confidence.toFixed(
                          2
                        )}
                        %
                      </td>

                      <td className="px-4 py-4 align-top font-medium">
                        {item.risk_score}/100
                      </td>

                      <td className="px-4 py-4 align-top">
                        {item.categories.length ? (
                          <div className="flex flex-wrap gap-2">
                            {item.categories.map(
                              (
                                category
                              ) => (
                                <Badge
                                  key={
                                    category
                                  }
                                  variant="info"
                                >
                                  {
                                    category
                                  }
                                </Badge>
                              )
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">
                            None
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                        {new Date(
                          item.time
                        ).toLocaleString()}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            copyText(
                              item.text
                            )
                          }
                          className="rounded-md border border-slate-300 px-3 py-1 text-sm transition hover:bg-slate-100"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
              <p className="text-sm text-slate-500">
                Showing{" "}
                {(currentPage - 1) *
                  PAGE_SIZE +
                  1}
                –
                {Math.min(
                  currentPage *
                    PAGE_SIZE,
                  filteredHistory.length
                )}{" "}
                of{" "}
                {
                  filteredHistory.length
                }{" "}
                results
              </p>

              <div className="flex items-center gap-2">
                <button
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setPage((p) =>
                      Math.max(1, p - 1)
                    )
                  }
                  className="rounded-lg border border-slate-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium">
                  {currentPage} /{" "}
                  {totalPages}
                </span>

                <button
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setPage((p) =>
                      Math.min(
                        totalPages,
                        p + 1
                      )
                    )
                  }
                  className="rounded-lg border border-slate-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Card>
  );
}