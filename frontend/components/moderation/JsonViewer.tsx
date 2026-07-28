"use client";

import { useMemo, useState } from "react";

import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";

interface JsonViewerProps {
  data: unknown;
  title?: string;
  className?: string;
}

export default function JsonViewer({
  data,
  title = "Raw Response",
  className,
}: JsonViewerProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedJson = useMemo(() => {
    if (data == null) {
      return "No data available.";
    }

    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return "Unable to display JSON.";
    }
  }, [data]);

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-slate-50",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-700">
          {title}
        </h3>

        <Button
          size="sm"
          variant="secondary"
          aria-expanded={expanded}
          onClick={() =>
            setExpanded((value) => !value)
          }
        >
          {expanded ? "Hide JSON" : "Show JSON"}
        </Button>
      </div>

      {expanded && (
        <pre className="overflow-x-auto p-4 text-xs leading-6 text-slate-700">
          {formattedJson}
        </pre>
      )}
    </div>
  );
}