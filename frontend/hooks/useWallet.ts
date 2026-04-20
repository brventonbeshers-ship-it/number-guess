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
// rep-hooks-wallet: 1776270288351
// rep-hooks-wallet: 1776316694974
// rep-hooks-wallet: 1776331798833
// rep-hooks-wallet: 1776350361780
// rep-hooks-wallet: 1776373608450
// rep-hooks-wallet: 1776401817175
// rep-hooks-wallet: 1776432469519
// rep-hooks-wallet: 1776461138719
// rep-hooks-wallet: 1776480639684
// rep-hooks-wallet: 1776494648518
// rep-hooks-wallet: 1776519296342
// rep-hooks-wallet: 1776551115879
// rep-hooks-wallet: 1776586436764
// rep-hooks-wallet: 1776620275574
// rep-hooks-wallet: 1776645273956
// rep-hooks-wallet: 1776673202981
