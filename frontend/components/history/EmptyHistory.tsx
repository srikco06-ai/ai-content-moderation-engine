"use client";

import { History } from "lucide-react";

import Card from "@/components/ui/Card";

interface EmptyHistoryProps {
  title?: string;
  description?: string;
}

export default function EmptyHistory({
  title = "No Analysis History",
  description = "Analyze some content to start building your moderation history.",
}: EmptyHistoryProps) {
  return (
    <Card
      bordered
      rounded="xl"
      padding="lg"
      className="text-center"
    >
      <div className="flex flex-col items-center justify-center py-8">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <History className="h-8 w-8 text-slate-500" />
        </div>

        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-sm text-slate-500">
          {description}
        </p>
      </div>
    </Card>
  );
}