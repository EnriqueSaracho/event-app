"use client";

type FilterChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

export function FilterChip({ label, active = false, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors min-h-[36px] ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-surface-muted text-foreground hover:bg-border/60"
      }`}
    >
      {label}
    </button>
  );
}
