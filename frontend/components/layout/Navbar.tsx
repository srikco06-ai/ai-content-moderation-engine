"use client";

import Logo from "@/components/layout/Logo";
import DesktopNavigation from "@/components/layout/DesktopNavigation";
import MobileNavigation from "@/components/layout/MobileNavigation";

export interface NavbarProps {
  className?: string;
}

export default function Navbar({
  className = "",
}: NavbarProps) {
  return (
    <header
      className={[
        "sticky top-0 z-50",
        "border-b border-slate-200/80",
        "bg-white/80",
        "backdrop-blur-xl",
        "supports-[backdrop-filter]:bg-white/70",
        "dark:border-slate-800",
        "dark:bg-slate-950/80",
        className,
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo showTagline />

        {/* Desktop Navigation */}
        <DesktopNavigation className="flex-1 justify-center" />

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white md:inline-flex"
          >
            GitHub
          </a>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}