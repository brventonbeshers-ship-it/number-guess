export function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export function padGuess(value: number) {
  return String(value).padStart(2, "0");
}
