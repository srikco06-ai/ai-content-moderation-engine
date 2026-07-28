"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/navigation";

export interface NavigationProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
  onNavigate?: () => void;
}

export default function Navigation({
  orientation = "horizontal",
  className = "",
  onNavigate,
}: NavigationProps) {
  const pathname = usePathname();

  const isVertical = orientation === "vertical";

  return (
    <nav
      aria-label="Primary Navigation"
      className={className}
    >
      <ul
        className={
          isVertical
            ? "flex flex-col gap-2"
            : "flex items-center gap-1"
        }
      >
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={[
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  active
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}