"use client";

import Badge from "@/components/ui/Badge";

interface MatchedWordsProps {
  words: string[];
  className?: string;
}

export default function MatchedWords({
  words,
  className,
}: MatchedWordsProps) {
  const uniqueWords = [
    ...new Set(
      (words ?? [])
        .map((word) => word.trim())
        .filter(Boolean)
    ),
  ];

  if (uniqueWords.length === 0) {
    return (
      <div className={className}>
        <p className="text-sm text-slate-500">
          No matched words detected.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <h3 className="mb-3 text-sm font-semibold text-slate-700">
        Matched Words
      </h3>

      <div
        className="flex flex-wrap gap-2"
        role="list"
      >
        {uniqueWords.map((word) => (
          <Badge
            key={word}
            variant="danger"
            role="listitem"
          >
            {word}
          </Badge>
        ))}
      </div>
    </div>
  );
}