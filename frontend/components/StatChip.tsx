interface StatChipProps {
  label: string;
  value: string | number;
}

export function StatChip({ label, value }: StatChipProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
