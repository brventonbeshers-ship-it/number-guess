interface GuessBadgeProps {
  value: string;
}

export function GuessBadge({ value }: GuessBadgeProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-[0.18em] text-white/75">
      {value}
    </span>
  );
}
