"use client";

import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-10",
} as const;

const shadowClasses = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-xl",
} as const;

const roundedClasses = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
} as const;

export type CardPadding = keyof typeof paddingClasses;
export type CardShadow = keyof typeof shadowClasses;
export type CardRounded = keyof typeof roundedClasses;

export interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  shadow?: CardShadow;
  bordered?: boolean;
  rounded?: CardRounded;
}

export function Card({
  className,
  children,
  padding = "md",
  shadow = "md",
  bordered = false,
  rounded = "2xl",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white transition-shadow",
        paddingClasses[padding],
        shadowClasses[shadow],
        roundedClasses[rounded],
        bordered && "border border-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";

export default Card;