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
        "border-b border-slate-200/70",
        "bg-white/75",
        "backdrop-blur-2xl",
        "supports-backdrop-filter:bg-white/65",
        "shadow-sm",
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
            href="https://github.com/srikco06-ai/ai-content-moderation-engine"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden
              items-center
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-blue-200
              hover:text-blue-600
              hover:shadow-md
              md:inline-flex
            "
          >
            GitHub
          </a>

          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}