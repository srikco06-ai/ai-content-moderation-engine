import type { ReactNode } from "react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageWrapper from "@/components/layout/PageWrapper";

export interface AppShellProps {
  children: ReactNode;
  className?: string;
  pageClassName?: string;
  containerClassName?: string;
  withContainer?: boolean;
}

export default function AppShell({
  children,
  className = "",
  pageClassName = "",
  containerClassName = "",
  withContainer = true,
}: AppShellProps) {
  return (
    <div
      className={[
        "flex min-h-screen flex-col",
        "bg-slate-50",
        "text-slate-900",
        className,
      ].join(" ")}
    >
      <Navbar />

      <PageWrapper
        className={pageClassName}
        containerClassName={containerClassName}
        withContainer={withContainer}
      >
        {children}
      </PageWrapper>

      <Footer />
    </div>
  );
}