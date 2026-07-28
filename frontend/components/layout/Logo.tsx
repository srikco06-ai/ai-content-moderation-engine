"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import {
  APP_NAME,
  APP_SHORT_NAME,
  APP_TAGLINE,
} from "@/lib/navigation";

export interface LogoProps {
  compact?: boolean;
  showTagline?: boolean;
  href?: string;
  className?: string;
}

export default function Logo({
  compact = false,
  showTagline = false,
  href = "/",
  className = "",
}: LogoProps) {
  return (
    <Link
      href={href}
      aria-label={APP_NAME}
      className={`inline-flex items-center gap-3 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md ${className}`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white shadow-lg">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="font-bold tracking-tight text-slate-900 dark:text-white">
          {compact ? APP_SHORT_NAME : APP_NAME}
        </span>

        {showTagline && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {APP_TAGLINE}
          </span>
        )}
      </div>
    </Link>
  );
}