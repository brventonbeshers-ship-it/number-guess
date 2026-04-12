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
// rep-types-lib: 1775967260649
