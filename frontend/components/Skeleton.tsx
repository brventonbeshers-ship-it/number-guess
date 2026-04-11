export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`shimmer rounded-lg bg-white/5 ${className}`}
      aria-hidden="true"
    />
  );
}

// skeleton: 1775828313873
