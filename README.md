[![npm](https://img.shields.io/npm/v/number-guess-sdk?color=blueviolet)](https://www.npmjs.com/package/number-guess-sdk) ![Stacks Mainnet](https://img.shields.io/badge/Stacks-Mainnet-blueviolet) ![license](https://img.shields.io/badge/license-MIT-blue)

# Number Guess

On-chain number guessing game built on Stacks.

## Structure

- `contracts/number-guess.clar` - Clarity contract
- `sdk/` - app-local SDK package
- `frontend/` - Next.js frontend
- `deploy.mjs` - mainnet deploy script with `ClarityVersion.Clarity2`

## Quick Start

```powershell
npm --prefix sdk run build
npm --prefix frontend install
npm --prefix frontend run build
```

Deploy with:

```powershell
$env:STACKS_PRIVATE_KEY='...'
node deploy.mjs
Remove-Item Env:STACKS_PRIVATE_KEY
```
## Dev Notes

- Frontend runs from `frontend/`
- App-local SDK lives in `sdk/`
- Mainnet deploy uses `ClarityVersion.Clarity2`
## Contract

Main public action:

```clar
(guess u42)
```
