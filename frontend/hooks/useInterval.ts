import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);
  savedCallback.current = callback;

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

// interval: 1775828489852
// rep-use-interval: 1775871775691
// rep-use-interval: 1775920641917
// rep-hooks-interval: 1776084619227
// rep-hooks-interval: 1776144676690
// rep-hooks-interval: 1776171645854
// rep-hooks-interval: 1776187177784
// rep-hooks-interval: 1776248489661
// rep-hooks-interval: 1776257222516
// rep-hooks-interval: 1776270569888
// rep-hooks-interval: 1776316361618
// rep-hooks-interval: 1776331682962
// rep-hooks-interval: 1776350376300
