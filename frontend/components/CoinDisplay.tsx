interface CoinDisplayProps {
  side: number;
  size?: "sm" | "lg";
}

export function CoinDisplay({ side, size = "sm" }: CoinDisplayProps) {
  const dimension = size === "lg" ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16";
  const textSize = size === "lg" ? "text-3xl md:text-4xl" : "text-lg";
  const label = side === 2 ? "TAILS" : "HEADS";
  const accent =
    side === 2
      ? "from-[#2d9f86] to-[#79f2c0]"
      : "from-[#79f2c0] to-[#d8fff3]";

  return (
    <div className="coin-reveal text-center">
      <div
        className={`${dimension} rounded-full border border-white/12 bg-gradient-to-br ${accent} shadow-[0_18px_45px_rgba(121,242,192,0.18)] flex items-center justify-center`}
      >
        <div className="w-[88%] h-[88%] rounded-full border border-white/20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),rgba(8,18,22,0.12))] flex items-center justify-center text-[#071013] font-black tracking-[0.24em]">
          <span className={textSize}>{label}</span>
        </div>
      </div>
    </div>
  );
}
// rep-coin-display: 1775871837962
// rep-coin-display: 1775920670017
