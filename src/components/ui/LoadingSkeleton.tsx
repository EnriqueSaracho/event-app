type LoadingSkeletonProps = {
  className?: string;
};

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-surface-muted ${className}`}
      aria-hidden
    />
  );
}

export function PageLoadingSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading">
      <LoadingSkeleton className="h-8 w-48" />
      <LoadingSkeleton className="h-24 w-full" />
      <LoadingSkeleton className="h-24 w-full" />
      <LoadingSkeleton className="h-24 w-full" />
    </div>
  );
}
