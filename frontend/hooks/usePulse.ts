import { useEffect, useState } from "react";

export function usePulse(durationMs = 1200) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => setActive(false), durationMs);
    return () => clearTimeout(timer);
  }, [active, durationMs]);

  return {
    active,
    trigger: () => setActive(true),
  };
}
