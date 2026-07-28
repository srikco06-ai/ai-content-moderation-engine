"use client";

import { ReactNode } from "react";

import Card from "@/components/ui/Card";
import { cn } from "@/utils/cn";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  description,
  className,
}: StatCardProps) {
  return (
    <Card
      bordered
      padding="md"
      rounded="xl"
      shadow="sm"
      className={cn(
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}