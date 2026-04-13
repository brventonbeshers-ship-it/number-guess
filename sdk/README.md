# number-guess-sdk

TypeScript SDK bundled inside the Number Guess app repository for interacting with the Number Guess contract on Stacks.

## Installation

```bash
npm install number-guess-sdk
```

## Usage

```ts
import { getLeaderboard, getTotalGuesses, createGuessCall } from "number-guess-sdk";

const total = await getTotalGuesses();
const leaderboard = await getLeaderboard();
const tx = createGuessCall(42);
```

## License

MIT
## Core Methods

- `getTotalGuesses()`
- `getTotalWins()`
- `getUserGuesses(address)`
- `getUserWins(address)`
- `getUserLastGuess(address)`
- `getUserLastTarget(address)`
- `createGuessCall(value)`
## Custom Config

Every read-only helper accepts an optional config override with custom contract address, contract name, api base, and network.
