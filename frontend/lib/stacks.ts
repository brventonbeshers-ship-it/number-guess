import {
  createGuessCall,
  getLeaderboard as getNumberGuessLeaderboard,
  getTotalGuesses as getNumberGuessTotalGuesses,
  getTotalWins as getNumberGuessTotalWins,
  getUserGuesses as getNumberGuessUserGuesses,
  getUserLastGuess as getNumberGuessUserLastGuess,
  getUserLastTarget as getNumberGuessUserLastTarget,
  getUserWins as getNumberGuessUserWins,
} from "number-guess-sdk";

export const CONTRACT_ADDRESS = "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM";
export const CONTRACT_NAME = "number-guess";
export const API_BASE = "https://api.mainnet.hiro.so";

const NUMBER_GUESS_CONFIG = {
  contractAddress: CONTRACT_ADDRESS,
  contractName: CONTRACT_NAME,
  apiBase: API_BASE,
};

export type { LeaderEntry } from "number-guess-sdk";

export async function connectWallet(
  onFinish: (addresses: { stacks: string }) => void
) {
  const { showConnect } = await import("@stacks/connect");
  showConnect({
    appDetails: {
      name: "Number Guess",
      icon: "/icon.png",
    },
    onFinish: (data: any) => {
      const stacks = data.authResponsePayload?.profile?.stxAddress?.mainnet;
      if (stacks) {
        onFinish({ stacks });
      }
    },
    onCancel: () => {},
  });
}

export const fetchTotalGuesses = () => getNumberGuessTotalGuesses(NUMBER_GUESS_CONFIG);
export const fetchTotalWins = () => getNumberGuessTotalWins(NUMBER_GUESS_CONFIG);
export const fetchUserGuesses = (userAddress: string) =>
  getNumberGuessUserGuesses(userAddress, NUMBER_GUESS_CONFIG);
export const fetchUserWins = (userAddress: string) =>
  getNumberGuessUserWins(userAddress, NUMBER_GUESS_CONFIG);
export const fetchUserLastGuess = (userAddress: string) =>
  getNumberGuessUserLastGuess(userAddress, NUMBER_GUESS_CONFIG);
export const fetchUserLastTarget = (userAddress: string) =>
  getNumberGuessUserLastTarget(userAddress, NUMBER_GUESS_CONFIG);
export const fetchLeaderboard = () => getNumberGuessLeaderboard(NUMBER_GUESS_CONFIG);

export async function sendGuess(value: number) {
  const { openContractCall } = await import("@stacks/connect");
  const args = createGuessCall(value, NUMBER_GUESS_CONFIG);

  return new Promise<boolean>((resolve) => {
    openContractCall({
      ...args,
      onFinish: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
}
// rep-stacks-lib: 1776047181069
// rep-stacks-lib-refresh: 1776063501350
// rep-stacks-lib: 1776084628583
// rep-stacks-lib-wallet: 1776116718375
// rep-stacks-lib-refresh: 1776144348157
// rep-stacks-lib: 1776144542995
// rep-stacks-lib-wallet: 1776144618929
// rep-stacks-lib: 1776171510028
// rep-stacks-lib-wallet: 1776171568687
// rep-stacks-lib-refresh: 1776171720175
// rep-stacks-lib: 1776186851845
// rep-stacks-lib-wallet: 1776187031118
// rep-stacks-lib-refresh: 1776187106839
// rep-stacks-lib-wallet: 1776248431046
// rep-stacks-lib: 1776248435425
// rep-stacks-lib-refresh: 1776248620009
// rep-stacks-lib-wallet: 1776257048261
// rep-stacks-lib: 1776257212110
// rep-stacks-lib-refresh: 1776257224723
// rep-stacks-lib-refresh: 1776270383725
// rep-stacks-lib: 1776270439478
// rep-stacks-lib-wallet: 1776270572087
// rep-stacks-lib-refresh: 1776316379581
