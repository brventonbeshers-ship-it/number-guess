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
// rep-stacks-lib-wallet: 1776316462810
// rep-stacks-lib: 1776331725610
// rep-stacks-lib-wallet: 1776331728784
// rep-stacks-lib-refresh: 1776331760928
// rep-stacks-lib-refresh: 1776350482620
// rep-stacks-lib: 1776350596840
// rep-stacks-lib-wallet: 1776350686460
// rep-stacks-lib-wallet: 1776373580286
// rep-stacks-lib-wallet: 1776401640633
// rep-stacks-lib-refresh: 1776401655381
// rep-stacks-lib: 1776401658569
// rep-stacks-lib: 1776432378222
// rep-stacks-lib-refresh: 1776432540658
// rep-stacks-lib-wallet: 1776432584243
// rep-stacks-lib-refresh: 1776461147079
// rep-stacks-lib-wallet: 1776461153447
// rep-stacks-lib: 1776461275323
// rep-stacks-lib: 1776480723878
// rep-stacks-lib-wallet: 1776480772703
// rep-stacks-lib-refresh: 1776480829979
// rep-stacks-lib-wallet: 1776494715041
// rep-stacks-lib: 1776494805923
// rep-stacks-lib-refresh: 1776494859190
// rep-stacks-lib-wallet: 1776519294106
// rep-stacks-lib: 1776519580317
// rep-stacks-lib-refresh: 1776519594055
// rep-stacks-lib-wallet: 1776550883562
// rep-stacks-lib: 1776550939301
// rep-stacks-lib-refresh: 1776550993855
// rep-stacks-lib-refresh: 1776586284757
// rep-stacks-lib: 1776586367801
// rep-stacks-lib-wallet: 1776586444249
// rep-stacks-lib-refresh: 1776620264783
// rep-stacks-lib-wallet: 1776620335037
// rep-stacks-lib: 1776645279210
// rep-stacks-lib-wallet: 1776645371009
// rep-stacks-lib-refresh: 1776645447990
// rep-stacks-lib-refresh: 1776673241727
// rep-stacks-lib: 1776673264212
// rep-stacks-lib-wallet: 1776673364393
// rep-stacks-lib: 1776680446233
// rep-stacks-lib-refresh: 1776680469530
// rep-stacks-lib-wallet: 1776680524662
// rep-stacks-lib-wallet: 1776702446138
// rep-stacks-lib-refresh: 1776702464117
// rep-stacks-lib: 1776702609842
// rep-stacks-lib: 1776752651665
// rep-stacks-lib-wallet: 1776752733473
// rep-stacks-lib-refresh: 1776752925745
// rep-stacks-lib: 1776782063810
// rep-stacks-lib-wallet: 1776782228104
// rep-stacks-lib-refresh: 1776782243091
// rep-stacks-lib: 1776805428592
// rep-stacks-lib-refresh: 1776805459933
// rep-stacks-lib-wallet: 1776805472917
// rep-stacks-lib-refresh: 1776818351083
// rep-stacks-lib-wallet: 1776818456559
// rep-stacks-lib: 1776818470322
// rep-stacks-lib-wallet: 1776835174562
// rep-stacks-lib: 1776835234858
// rep-stacks-lib-refresh: 1776835412246
// rep-stacks-lib-wallet: 1776864126012
// rep-stacks-lib: 1776864134525
// rep-stacks-lib-refresh: 1776864306155
// rep-stacks-lib-refresh: 1776877414389
// rep-stacks-lib: 1776877476294
// rep-stacks-lib-wallet: 1776877588843
// rep-stacks-lib-refresh: 1776890668573
// rep-stacks-lib: 1776890724550
// rep-stacks-lib-wallet: 1776890784862
// rep-stacks-lib-refresh: 1776939907614
// rep-stacks-lib-wallet: 1776939984238
// rep-stacks-lib: 1776940025362
// rep-stacks-lib-refresh: 1776963344025
// rep-stacks-lib: 1776963374716
// rep-stacks-lib-wallet: 1776963495632
// rep-stacks-lib: 1777002408161
// rep-stacks-lib-refresh: 1777002481620
