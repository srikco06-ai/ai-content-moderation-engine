"use client";

import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const variantClasses = {
  default:
    "bg-slate-100 text-slate-700 border-slate-300",

  success:
    "bg-green-100 text-green-700 border-green-300",

  warning:
    "bg-yellow-100 text-yellow-800 border-yellow-300",

  danger:
    "bg-orange-100 text-orange-800 border-orange-300",

  critical:
    "bg-red-100 text-red-700 border-red-300",

  info:
    "bg-blue-100 text-blue-700 border-blue-300",
} as const;

export type BadgeVariant =
  keyof typeof variantClasses;

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full border px-3 py-1 text-sm font-semibold",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

export default Badge;