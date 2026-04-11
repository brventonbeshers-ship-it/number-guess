import { useCallback, useRef } from "react";

export function useSound(enabled = true) {
  const audioCtx = useRef<AudioContext | null>(null);

  const playRoll = useCallback(() => {
    if (!enabled) return;
    if (!audioCtx.current) {
      audioCtx.current = new AudioContext();
    }
    const ctx = audioCtx.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 600;
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }, [enabled]);

  return { playRoll };
}

// sound: 1775828433164
// rep-use-sound: 1775871884316
// rep-use-sound: 1775920597596
