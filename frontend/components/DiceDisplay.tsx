interface DiceDisplayProps {
  value: number;
  size?: "sm" | "lg";
}

const DICE_FACES: Record<number, string> = {
  1: "\u2680",
  2: "\u2681",
  3: "\u2682",
  4: "\u2683",
  5: "\u2684",
  6: "\u2685",
};

export function DiceDisplay({ value, size = "sm" }: DiceDisplayProps) {
  const textSize = size === "lg" ? "text-7xl md:text-8xl" : "text-4xl";
  const face = DICE_FACES[value] || "";

  if (!value || value < 1 || value > 6) return null;

  return (
    <div className="text-center dice-reveal">
      <span className={`${textSize} drop-shadow-[0_0_16px_rgba(255,140,0,0.4)]`}>
        {face}
      </span>
    </div>
  );
}

// a11y: 1775828370115

// dice: 1775828557061
