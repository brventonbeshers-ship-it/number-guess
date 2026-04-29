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
// rep-utils-lib: 1776186896892
// rep-utils-lib: 1776248439765
// rep-utils-lib: 1776257345969
// rep-utils-lib: 1776270429036
// rep-utils-lib: 1776316534376
// rep-utils-lib: 1776350478438
// rep-utils-lib: 1776373351058
// rep-utils-lib: 1776401699521
// rep-utils-lib: 1776432575871
// rep-utils-lib: 1776461270967
// rep-utils-lib: 1776480705362
// rep-utils-lib: 1776494870997
// rep-utils-lib: 1776519421465
// rep-utils-lib: 1776550932003
// rep-utils-lib: 1776586488208
// rep-utils-lib: 1776620312348
// rep-utils-lib: 1776645293254
// rep-utils-lib: 1776673295965
// rep-utils-lib: 1776680438725
// rep-utils-lib: 1776702550032
// rep-utils-lib: 1776752735736
// rep-utils-lib: 1776782010333
// rep-utils-lib: 1776805359224
// rep-utils-lib: 1776818525580
// rep-utils-lib: 1776835282722
// rep-utils-lib: 1776864303903
// rep-utils-lib: 1776877472051
// rep-utils-lib: 1776890777366
// rep-utils-lib: 1776939912861
// rep-utils-lib: 1776963501156
// rep-utils-lib: 1777002619145
// rep-utils-lib: 1777025939038
// rep-utils-lib: 1777038339972
// rep-utils-lib: 1777067425559
// rep-utils-lib: 1777104238251
// rep-utils-lib: 1777120372904
// rep-utils-lib: 1777170218197
// rep-utils-lib: 1777185229989
// rep-utils-lib: 1777215717366
// rep-utils-lib: 1777238499163
// rep-utils-lib: 1777266837774
// rep-utils-lib: 1777279663140
// rep-utils-lib: 1777329567046
// rep-utils-lib: 1777448891538
