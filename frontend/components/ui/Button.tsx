"use client";

import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

  secondary:
    "bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-400",

  success:
    "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

  ghost:
    "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
} as const;

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
} as const;

export type ButtonVariant =
  keyof typeof variantClasses;

export type ButtonSize =
  keyof typeof sizeClasses;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled = false,
  fullWidth = false,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg",
        "font-medium transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:pointer-events-none",
        "disabled:opacity-60",
        "shadow-sm",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {loading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            className="opacity-25"
          />

          <path
            fill="currentColor"
            className="opacity-75"
            d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2z"
          />
        </svg>
      )}

      <span aria-live="polite">
        {loading && loadingText
          ? loadingText
          : children}
      </span>
    </button>
  );
}

Button.displayName = "Button";

export default Button;