export interface LeaderEntry {
  who: string;
  wins: number;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
}

export interface GameStats {
  totalGuesses: number;
  totalWins: number;
  userGuesses: number;
  userWins: number;
  lastGuess: number;
  lastTarget: number;
  leaderboard: LeaderEntry[];
}
// rep-types-lib: 1776144687226
// rep-types-lib: 1776171517399
// rep-types-lib: 1776186982471
// rep-types-lib: 1776248388264
// rep-types-lib: 1776270301054
// rep-types-lib: 1776316355233
// rep-types-lib: 1776331801001
// rep-types-lib: 1776350547839
// rep-types-lib: 1776373375066
// rep-types-lib: 1776401756115
// rep-types-lib: 1776432633978
// rep-types-lib: 1776461142895
// rep-types-lib: 1776480759969
// rep-types-lib: 1776494795086
// rep-types-lib: 1776519379832
// rep-types-lib: 1776550996530
// rep-types-lib: 1776586329552
// rep-types-lib: 1776620455218
// rep-types-lib: 1776645439487
// rep-types-lib: 1776673174292
// rep-types-lib: 1776680464286
// rep-types-lib: 1776702504591
// rep-types-lib: 1776752804383
// rep-types-lib: 1776782165099
// rep-types-lib: 1776805535350
// rep-types-lib: 1776818466065
// rep-types-lib: 1776835540221
// rep-types-lib: 1776864445410
// rep-types-lib: 1776877285695
// rep-types-lib: 1776890889153
// rep-types-lib: 1776940021103
// rep-types-lib: 1776963546311
// rep-types-lib: 1777002630899
// rep-types-lib: 1777038327214
// rep-types-lib: 1777067570989
// rep-types-lib: 1777104368780
// rep-types-lib: 1777120357889
// rep-types-lib: 1777185224591
// rep-types-lib: 1777195277257
// rep-types-lib: 1777238584244
// rep-types-lib: 1777329655529
// rep-types-lib: 1777357070554
// rep-types-lib: 1777448751654
