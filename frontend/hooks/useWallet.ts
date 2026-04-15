import { useState, useCallback } from "react";
import { connectWallet } from "@/lib/stacks";

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(() => {
    connectWallet(({ stacks }) => setAddress(stacks));
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  return { address, connected: !!address, connect, disconnect };
}

// wallet: 1775828293997
// rep-use-wallet: 1775871948968
// rep-use-wallet: 1775920708528
// rep-hooks-wallet: 1776116730164
// rep-hooks-wallet: 1776144468273
// rep-hooks-wallet: 1776171515227
// rep-hooks-wallet: 1776186972083
// rep-hooks-wallet: 1776248379204
// rep-hooks-wallet: 1776257097837
