"use client";

type FilterChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  vertical?: boolean;
};

export function FilterChip({
  label,
  active = false,
  onClick,
  vertical = false,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-medium transition-colors min-h-[36px] ${
        vertical
          ? "w-full rounded-md px-3 py-2 text-left text-sm"
          : "shrink-0 rounded-full px-3 py-1.5 text-sm"
      } ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-surface-muted text-foreground hover:bg-border/50"
      }`}
    >
      {label}
    </button>
  );
}
