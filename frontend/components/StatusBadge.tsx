interface StatusBadgeProps {
  label: string;
}

export function StatusBadge({ label }: StatusBadgeProps) {
  return (
    <span className="rounded-full border border-[#79f2c0]/18 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-[#79f2c0]">
      {label}
    </span>
  );
}
// rep-status-badge: 1775871935394
// rep-status-badge: 1775920553861
