"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberGuessClient = exports.DEFAULT_CONFIG = void 0;
exports.callReadOnly = callReadOnly;
exports.getTotalGuesses = getTotalGuesses;
exports.getTotalWins = getTotalWins;
exports.getUserGuesses = getUserGuesses;
exports.getUserWins = getUserWins;
exports.getUserLastGuess = getUserLastGuess;
exports.getUserLastTarget = getUserLastTarget;
exports.getLeaderboard = getLeaderboard;
exports.createGuessCall = createGuessCall;
const network_1 = require("@stacks/network");
const transactions_1 = require("@stacks/transactions");
exports.DEFAULT_CONFIG = {
    contractAddress: "SP1Q7YR67R6WGP28NXDJD1WZ11REPAAXRJJ3V6RKM",
    contractName: "number-guess",
    apiBase: "https://api.mainnet.hiro.so",
    network: network_1.STACKS_MAINNET,
};
function resolveConfig(overrides = {}) {
    return { ...exports.DEFAULT_CONFIG, ...overrides };
}
function serializeCvToHex(cv) {
    const serialized = (0, transactions_1.serializeCV)(cv);
    if (typeof serialized === "string") {
        return serialized.startsWith("0x") ? serialized : `0x${serialized}`;
    }
    return `0x${Buffer.from(serialized).toString("hex")}`;
}
function extractNumericValue(result) {
    const clarityValue = (0, transactions_1.hexToCV)(result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return Number(parsed && typeof parsed === "object" && "value" in parsed
        ? parsed.value ?? 0
        : parsed ?? 0);
}
function normalizeLeaderboardValue(raw) {
    const entries = Array.isArray(raw) ? raw : [];
    return entries
        .map(item => {
        const entry = item && typeof item === "object" && "value" in item
            ? item.value
            : item;
        const record = entry;
        return {
            who: String(record?.who && typeof record.who === "object" ? record.who.value ?? "" : record?.who ?? ""),
            wins: Number(record?.wins && typeof record.wins === "object"
                ? record.wins.value ?? 0
                : record?.wins ?? 0),
        };
    })
        .filter(entry => entry.who && entry.wins > 0);
}
async function callReadOnly(functionName, args = [], config = {}) {
    const resolved = resolveConfig(config);
    const response = await fetch(`${resolved.apiBase}/v2/contracts/call-read/${resolved.contractAddress}/${resolved.contractName}/${functionName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender: resolved.contractAddress,
            arguments: args,
        }),
    });
    if (!response.ok) {
        throw new Error(`Read-only call failed with status ${response.status}`);
    }
    return response.json();
}
async function getTotalGuesses(config = {}) {
    const data = await callReadOnly("get-total-guesses", [], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getTotalWins(config = {}) {
    const data = await callReadOnly("get-total-wins", [], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getUserGuesses(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-guesses", [principalArg], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getUserWins(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-wins", [principalArg], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getUserLastGuess(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-last-guess", [principalArg], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getUserLastTarget(userAddress, config = {}) {
    const principalArg = serializeCvToHex((0, transactions_1.principalCV)(userAddress));
    const data = await callReadOnly("get-user-last-target", [principalArg], config);
    return data.okay && data.result ? extractNumericValue(data.result) : 0;
}
async function getLeaderboard(config = {}) {
    const data = await callReadOnly("get-leaderboard", [], config);
    if (!data.okay || !data.result) {
        return [];
    }
    const clarityValue = (0, transactions_1.hexToCV)(data.result);
    const parsed = (0, transactions_1.cvToValue)(clarityValue, true);
    return normalizeLeaderboardValue(parsed);
}
function createGuessCall(value, config = {}) {
    const resolved = resolveConfig(config);
    return {
        contractAddress: resolved.contractAddress,
        contractName: resolved.contractName,
        functionName: "guess",
        functionArgs: [(0, transactions_1.uintCV)(Math.max(1, Math.min(100, Math.floor(value))))],
        postConditionMode: transactions_1.PostConditionMode.Deny,
        postConditions: [],
        network: resolved.network,
    };
}
class NumberGuessClient {
    constructor(config = {}) {
        this.config = resolveConfig(config);
    }
    getTotalGuesses() {
        return getTotalGuesses(this.config);
    }
    getTotalWins() {
        return getTotalWins(this.config);
    }
    getUserGuesses(userAddress) {
        return getUserGuesses(userAddress, this.config);
    }
    getUserWins(userAddress) {
        return getUserWins(userAddress, this.config);
    }
    getUserLastGuess(userAddress) {
        return getUserLastGuess(userAddress, this.config);
    }
    getUserLastTarget(userAddress) {
        return getUserLastTarget(userAddress, this.config);
    }
    getLeaderboard() {
        return getLeaderboard(this.config);
    }
    createGuessCall(value) {
        return createGuessCall(value, this.config);
    }
}
exports.NumberGuessClient = NumberGuessClient;
