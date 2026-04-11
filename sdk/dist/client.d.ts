import type { NumberGuessConfig, LeaderEntry, ReadOnlyResponse, GuessCall } from "./types";
export declare const DEFAULT_CONFIG: Required<NumberGuessConfig>;
export declare function callReadOnly(functionName: string, args?: string[], config?: NumberGuessConfig): Promise<ReadOnlyResponse>;
export declare function getTotalGuesses(config?: NumberGuessConfig): Promise<number>;
export declare function getTotalWins(config?: NumberGuessConfig): Promise<number>;
export declare function getUserGuesses(userAddress: string, config?: NumberGuessConfig): Promise<number>;
export declare function getUserWins(userAddress: string, config?: NumberGuessConfig): Promise<number>;
export declare function getUserLastGuess(userAddress: string, config?: NumberGuessConfig): Promise<number>;
export declare function getUserLastTarget(userAddress: string, config?: NumberGuessConfig): Promise<number>;
export declare function getLeaderboard(config?: NumberGuessConfig): Promise<LeaderEntry[]>;
export declare function createGuessCall(value: number, config?: NumberGuessConfig): GuessCall;
export declare class NumberGuessClient {
    private readonly config;
    constructor(config?: NumberGuessConfig);
    getTotalGuesses(): Promise<number>;
    getTotalWins(): Promise<number>;
    getUserGuesses(userAddress: string): Promise<number>;
    getUserWins(userAddress: string): Promise<number>;
    getUserLastGuess(userAddress: string): Promise<number>;
    getUserLastTarget(userAddress: string): Promise<number>;
    getLeaderboard(): Promise<LeaderEntry[]>;
    createGuessCall(value: number): GuessCall;
}
