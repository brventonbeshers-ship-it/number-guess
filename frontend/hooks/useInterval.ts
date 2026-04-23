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
// rep-hooks-interval: 1776373537644
// rep-hooks-interval: 1776401833140
// rep-hooks-interval: 1776432463135
// rep-hooks-interval: 1776461213092
// rep-hooks-interval: 1776480649469
// rep-hooks-interval: 1776519303837
// rep-hooks-interval: 1776551052627
// rep-hooks-interval: 1776586439009
// rep-hooks-interval: 1776620476746
// rep-hooks-interval: 1776645354989
// rep-hooks-interval: 1776673311711
// rep-hooks-interval: 1776680612018
// rep-hooks-interval: 1776702601344
// rep-hooks-interval: 1776752806636
// rep-hooks-interval: 1776782236590
// rep-hooks-interval: 1776805291125
// rep-hooks-interval: 1776818388458
// rep-hooks-interval: 1776835484746
// rep-hooks-interval: 1776864376063
// rep-hooks-interval: 1776877407882
// rep-hooks-interval: 1776890801097
// rep-hooks-interval: 1776940040146
// rep-hooks-interval: 1776963401203
