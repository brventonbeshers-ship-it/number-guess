interface CounterProps {
  label: string;
  value: number;
  size?: "sm" | "lg";
}

export function Counter({ label, value, size = "sm" }: CounterProps) {
  const textSize = size === "lg" ? "text-4xl md:text-5xl" : "text-2xl";
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-white/30 mb-1">
        {label}
      </p>
      <p className={`${textSize} font-bold counter-num`}>
        {value.toLocaleString()}
      </p>
    </div>
  );
}
