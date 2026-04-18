import type { StacksNetwork } from "@stacks/network";
import type { ClarityValue, PostCondition, PostConditionMode } from "@stacks/transactions";

export interface NumberGuessConfig {
  contractAddress?: string;
  contractName?: string;
  apiBase?: string;
  network?: StacksNetwork;
}

export interface LeaderEntry {
  who: string;
  wins: number;
}

export interface ReadOnlyResponse {
  okay?: boolean;
  result?: string;
  cause?: string;
}

export interface GuessCall {
  contractAddress: string;
  contractName: string;
  functionName: "guess";
  functionArgs: ClarityValue[];
  postConditionMode: PostConditionMode;
  postConditions: PostCondition[];
  network: StacksNetwork;
}
// rep-sdk-types: 1776144339569
// rep-sdk-types: 1776171359044
// rep-sdk-types: 1776187087933
// rep-sdk-types: 1776248454349
// rep-sdk-types: 1776257264703
// rep-sdk-types: 1776270434264
// rep-sdk-types: 1776316597576
// rep-sdk-types: 1776331936397
// rep-sdk-types: 1776350418175
// rep-sdk-types: 1776373516536
// rep-sdk-types: 1776401652201
// rep-sdk-types: 1776432425449
// rep-sdk-types: 1776461281690
// rep-sdk-types: 1776480717363
// rep-sdk-types: 1776494867730
// rep-sdk-types: 1776519428966
