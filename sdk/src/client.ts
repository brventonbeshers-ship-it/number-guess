import { STACKS_MAINNET } from "@stacks/network";
import {
  PostConditionMode,
  cvToValue,
  hexToCV,
  principalCV,
  serializeCV,
  uintCV,
} from "@stacks/transactions";
import type {
  NumberGuessConfig,
  LeaderEntry,
  ReadOnlyResponse,
  GuessCall,
} from "./types";

export const DEFAULT_CONFIG: Required<NumberGuessConfig> = {
  contractAddress: "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM",
  contractName: "number-guess",
  apiBase: "https://api.mainnet.hiro.so",
  network: STACKS_MAINNET,
};

function resolveConfig(overrides: NumberGuessConfig = {}): Required<NumberGuessConfig> {
  return { ...DEFAULT_CONFIG, ...overrides };
}

function serializeCvToHex(cv: unknown): string {
  const serialized = serializeCV(cv as never);
  if (typeof serialized === "string") {
    return serialized.startsWith("0x") ? serialized : `0x${serialized}`;
  }
  return `0x${Buffer.from(serialized).toString("hex")}`;
}

function extractNumericValue(result: string): number {
  const clarityValue = hexToCV(result);
  const parsed = cvToValue(clarityValue, true) as { value?: unknown } | unknown;
  return Number(
    parsed && typeof parsed === "object" && "value" in parsed
      ? parsed.value ?? 0
      : parsed ?? 0
  );
}

function normalizeLeaderboardValue(raw: unknown): LeaderEntry[] {
  const entries = Array.isArray(raw) ? raw : [];

  return entries
    .map(item => {
      const entry =
        item && typeof item === "object" && "value" in item
          ? (item as { value: unknown }).value
          : item;
      const record = entry as {
        who?: { value?: string } | string;
        wins?: { value?: string | number } | string | number;
      };

      return {
        who: String(record?.who && typeof record.who === "object" ? record.who.value ?? "" : record?.who ?? ""),
        wins: Number(
          record?.wins && typeof record.wins === "object"
            ? record.wins.value ?? 0
            : record?.wins ?? 0
        ),
      };
    })
    .filter(entry => entry.who && entry.wins > 0);
}

export async function callReadOnly(
  functionName: string,
  args: string[] = [],
  config: NumberGuessConfig = {}
): Promise<ReadOnlyResponse> {
  const resolved = resolveConfig(config);
  const response = await fetch(
    `${resolved.apiBase}/v2/contracts/call-read/${resolved.contractAddress}/${resolved.contractName}/${functionName}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender: resolved.contractAddress,
        arguments: args,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Read-only call failed with status ${response.status}`);
  }

  return response.json() as Promise<ReadOnlyResponse>;
}

export async function getTotalGuesses(config: NumberGuessConfig = {}): Promise<number> {
  const data = await callReadOnly("get-total-guesses", [], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getTotalWins(config: NumberGuessConfig = {}): Promise<number> {
  const data = await callReadOnly("get-total-wins", [], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getUserGuesses(
  userAddress: string,
  config: NumberGuessConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-guesses", [principalArg], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getUserWins(
  userAddress: string,
  config: NumberGuessConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-wins", [principalArg], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getUserLastGuess(
  userAddress: string,
  config: NumberGuessConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-last-guess", [principalArg], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getUserLastTarget(
  userAddress: string,
  config: NumberGuessConfig = {}
): Promise<number> {
  const principalArg = serializeCvToHex(principalCV(userAddress));
  const data = await callReadOnly("get-user-last-target", [principalArg], config);
  return data.okay && data.result ? extractNumericValue(data.result) : 0;
}

export async function getLeaderboard(
  config: NumberGuessConfig = {}
): Promise<LeaderEntry[]> {
  const data = await callReadOnly("get-leaderboard", [], config);
  if (!data.okay || !data.result) {
    return [];
  }

  const clarityValue = hexToCV(data.result);
  const parsed = cvToValue(clarityValue, true);
  return normalizeLeaderboardValue(parsed);
}

export function createGuessCall(value: number, config: NumberGuessConfig = {}): GuessCall {
  const resolved = resolveConfig(config);

  return {
    contractAddress: resolved.contractAddress,
    contractName: resolved.contractName,
    functionName: "guess",
    functionArgs: [uintCV(Math.max(1, Math.min(100, Math.floor(value))))],
    postConditionMode: PostConditionMode.Deny,
    postConditions: [],
    network: resolved.network,
  };
}

export class NumberGuessClient {
  private readonly config: Required<NumberGuessConfig>;

  constructor(config: NumberGuessConfig = {}) {
    this.config = resolveConfig(config);
  }

  getTotalGuesses(): Promise<number> {
    return getTotalGuesses(this.config);
  }

  getTotalWins(): Promise<number> {
    return getTotalWins(this.config);
  }

  getUserGuesses(userAddress: string): Promise<number> {
    return getUserGuesses(userAddress, this.config);
  }

  getUserWins(userAddress: string): Promise<number> {
    return getUserWins(userAddress, this.config);
  }

  getUserLastGuess(userAddress: string): Promise<number> {
    return getUserLastGuess(userAddress, this.config);
  }

  getUserLastTarget(userAddress: string): Promise<number> {
    return getUserLastTarget(userAddress, this.config);
  }

  getLeaderboard(): Promise<LeaderEntry[]> {
    return getLeaderboard(this.config);
  }

  createGuessCall(value: number): GuessCall {
    return createGuessCall(value, this.config);
  }
}
// rep-sdk-client-guards: 1776063509562
// rep-sdk-client: 1776144466081
// rep-sdk-client-guards: 1776144625304
// rep-sdk-client-guards: 1776171499262
// rep-sdk-client: 1776171632097
// rep-sdk-client: 1776186785545
// rep-sdk-client-guards: 1776187167391
// rep-sdk-client: 1776248596209
// rep-sdk-client-guards: 1776248669192
// rep-sdk-client: 1776257102015
// rep-sdk-client-guards: 1776257341792
// rep-sdk-client: 1776270349630
// rep-sdk-client-guards: 1776270395599
// rep-sdk-client-guards: 1776316526002
// rep-sdk-client: 1776316783943
// rep-sdk-client-guards: 1776331755769
// rep-sdk-client-guards: 1776350494122
// rep-sdk-client: 1776350553005
// rep-sdk-client-guards: 1776373284336
// rep-sdk-client: 1776373491638
// rep-sdk-client-guards: 1776401696324
// rep-sdk-client: 1776401826759
// rep-sdk-client: 1776432487267
// rep-sdk-client-guards: 1776432713905
// rep-sdk-client: 1776461079651
// rep-sdk-client-guards: 1776461225629
// rep-sdk-client: 1776480655965
