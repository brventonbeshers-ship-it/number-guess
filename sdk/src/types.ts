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
// rep-sdk-types: 1776550935659
// rep-sdk-types: 1776586267473
// rep-sdk-types: 1776620462743
// rep-sdk-types: 1776645508512
// rep-sdk-types: 1776673197737
// rep-sdk-types: 1776680532139
// rep-sdk-types: 1776702392274
// rep-sdk-types: 1776752809903
// rep-sdk-types: 1776782160845
// rep-sdk-types: 1776805283616
// rep-sdk-types: 1776818354341
// rep-sdk-types: 1776835172283
// rep-sdk-types: 1776864362332
// rep-sdk-types: 1776877330217
// rep-sdk-types: 1776890719292
// rep-sdk-types: 1776939885020
// rep-sdk-types: 1776963267765
// rep-sdk-types: 1777002464339
// rep-sdk-types: 1777025915353
// rep-sdk-types: 1777038122021
// rep-sdk-types: 1777067618399
// rep-sdk-types: 1777104451405
// rep-sdk-types: 1777120366395
// rep-sdk-types: 1777185026532
// rep-sdk-types: 1777195354613
// rep-sdk-types: 1777215794281
// rep-sdk-types: 1777238737873
// rep-sdk-types: 1777279670654
// rep-sdk-types: 1777329827345
