import type { HTMLAttributes, ReactNode } from "react";

type CardVariant = "default" | "elevated" | "muted";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: CardVariant;
};

const variantClasses: Record<CardVariant, string> = {
  default: "border-border bg-surface shadow-sm",
  elevated: "border-primary/15 bg-surface shadow-sm ring-1 ring-primary/5",
  muted: "border-border bg-surface-muted",
};

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
