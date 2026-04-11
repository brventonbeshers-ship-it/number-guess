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
