import type { ReactNode } from "react";

import Container from "@/components/layout/Container";

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  withContainer?: boolean;
}

export default function PageWrapper({
  children,
  className = "",
  containerClassName = "",
  withContainer = true,
}: PageWrapperProps) {
  const content = withContainer ? (
    <Container className={containerClassName}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <main
      className={[
        "flex-1",
        "py-8",
        "sm:py-10",
        "lg:py-12",
        className,
      ].join(" ")}
    >
      {content}
    </main>
  );
}