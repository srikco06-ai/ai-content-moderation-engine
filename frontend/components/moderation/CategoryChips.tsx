"use client";

import Badge from "@/components/ui/Badge";

interface CategoryChipsProps {
  categories: string[];
  className?: string;
}

export default function CategoryChips({
  categories,
  className,
}: CategoryChipsProps) {
  const uniqueCategories = [
    ...new Set(
      (categories ?? [])
        .map((category) => category.trim())
        .filter(Boolean)
    ),
  ];

  if (uniqueCategories.length === 0) {
    return (
      <div className={className}>
        <Badge variant="success">
          No Categories Detected
        </Badge>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-wrap gap-2 ${className ?? ""}`}
    >
      {uniqueCategories.map((category) => (
        <Badge
          key={category}
          variant="warning"
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}