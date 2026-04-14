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
