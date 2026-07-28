"use client";

import Navigation from "@/components/layout/Navigation";

export interface DesktopNavigationProps {
  className?: string;
}

export default function DesktopNavigation({
  className = "",
}: DesktopNavigationProps) {
  return (
    <div
      className={`hidden lg:flex items-center ${className}`}
      aria-label="Desktop Navigation"
    >
      <Navigation orientation="horizontal" />
    </div>
  );
}