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
