import Link from "next/link";

import {
  APP_NAME,
  APP_TAGLINE,
  secondaryNavigationItems,
} from "@/lib/navigation";

export interface FooterProps {
  className?: string;
}

export default function Footer({
  className = "",
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={[
        "border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
        className,
      ].join(" ")}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {APP_NAME}
          </h2>

          <p className="max-w-md text-sm text-slate-600 dark:text-slate-400">
            {APP_TAGLINE}
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-500">
            © {year} {APP_NAME}. All rights reserved.
          </p>
        </div>

        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap gap-4"
        >
          {secondaryNavigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}