import type { ElementType, ReactNode } from "react";

export interface ContainerProps<T extends ElementType = "div"> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export default function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={[
        "mx-auto",
        "w-full",
        "max-w-7xl",
        "px-4",
        "sm:px-6",
        "lg:px-8",
        className,
      ].join(" ")}
    >
      {children}
    </Component>
  );
}