export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr || "---";
  return addr.slice(0, 5) + "..." + addr.slice(-4);
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function clampGuess(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(1, Math.min(100, Math.floor(value)));
}
// rep-utils-lib: 1776084623418
// rep-utils-lib: 1776144724871
// rep-utils-lib: 1776171363238
