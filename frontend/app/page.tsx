"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  connectWallet,
  fetchLeaderboard,
  fetchTotalGuesses,
  fetchTotalWins,
  fetchUserGuesses,
  fetchUserLastGuess,
  fetchUserLastTarget,
  fetchUserWins,
  sendGuess,
} from "@/lib/stacks";
import { clampGuess, formatNumber, shortenAddress } from "@/lib/utils";

type LeaderEntry = {
  who: string;
  wins: number;
};

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [guessValue, setGuessValue] = useState(42);
  const [pending, setPending] = useState(false);
  const [globalGuesses, setGlobalGuesses] = useState(0);
  const [globalWins, setGlobalWins] = useState(0);
  const [myGuesses, setMyGuesses] = useState(0);
  const [myWins, setMyWins] = useState(0);
  const [lastGuess, setLastGuess] = useState(0);
  const [lastTarget, setLastTarget] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderEntry[]>([]);

  const refreshGlobal = useCallback(async () => {
    const [totalGuesses, totalWins, board] = await Promise.all([
      fetchTotalGuesses(),
      fetchTotalWins(),
      fetchLeaderboard(),
    ]);
    setGlobalGuesses(totalGuesses);
    setGlobalWins(totalWins);
    setLeaderboard(board);
  }, []);

  const refreshUser = useCallback(async (user: string) => {
    const [guesses, wins, guess, target] = await Promise.all([
      fetchUserGuesses(user),
      fetchUserWins(user),
      fetchUserLastGuess(user),
      fetchUserLastTarget(user),
    ]);
    setMyGuesses(guesses);
    setMyWins(wins);
    setLastGuess(guess);
    setLastTarget(target);
  }, []);

  useEffect(() => {
    refreshGlobal();
    const timer = setInterval(refreshGlobal, 15000);
    return () => clearInterval(timer);
  }, [refreshGlobal]);

  useEffect(() => {
    if (address) {
      refreshUser(address);
    }
  }, [address, refreshUser]);

  const handleConnect = useCallback(() => {
    connectWallet(({ stacks }) => {
      setAddress(stacks);
    });
  }, []);

  const handleGuess = useCallback(async () => {
    if (!address || pending) return;

    const nextGuess = clampGuess(guessValue);
    setPending(true);
    setMyGuesses((value) => value + 1);
    setGlobalGuesses((value) => value + 1);
    setLastGuess(nextGuess);

    const ok = await sendGuess(nextGuess);
    if (ok) {
      setTimeout(() => {
        refreshGlobal();
        refreshUser(address);
      }, 4000);
    } else {
      setMyGuesses((value) => Math.max(0, value - 1));
      setGlobalGuesses((value) => Math.max(0, value - 1));
    }
    setPending(false);
  }, [address, guessValue, pending, refreshGlobal, refreshUser]);

  const displayedBoard = useMemo(() => {
    const items = [...leaderboard];
    while (items.length < 10) {
      items.push({ who: "-", wins: 0 });
    }
    return items;
  }, [leaderboard]);

  const hitRate = myGuesses > 0 ? ((myWins / myGuesses) * 100).toFixed(1) : "0.0";

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0c1020] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_34%),linear-gradient(180deg,#0c1020_0%,#0a0d18_100%)]" />
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-sky-200/60">Stacks Mainnet</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-5xl">Number Guess</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/65 md:text-base">
            Guess a number from 1 to 100, track your hit rate, and climb the on-chain wins leaderboard.
          </p>
        </div>

        <button
          onClick={handleConnect}
          className={`rounded-2xl border px-5 py-3 text-sm font-medium transition ${
            address
              ? "border-white/15 bg-white/5 text-sky-100"
              : "border-sky-300/40 bg-gradient-to-r from-sky-400 to-amber-300 text-slate-950"
          }`}
        >
          {address ? shortenAddress(address) : "Connect Wallet"}
        </button>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-4 px-6 md:grid-cols-3">
        <StatCard label="Global Guesses" value={formatNumber(globalGuesses)} accent="from-sky-400/30 to-sky-400/5" />
        <StatCard label="Global Wins" value={formatNumber(globalWins)} accent="from-amber-300/30 to-amber-300/5" />
        <StatCard label="Your Hit Rate" value={`${hitRate}%`} accent="from-fuchsia-400/25 to-fuchsia-400/5" />
      </section>

      <section className="relative z-10 mx-auto mt-8 grid w-full max-w-6xl gap-6 px-6 pb-10 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Prediction Console</p>
              <h2 className="mt-2 text-2xl font-semibold">Pick your next number</h2>
            </div>
            <div className="rounded-2xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-right">
              <p className="text-xs uppercase tracking-[0.22em] text-amber-100/70">Current Guess</p>
              <p className="text-3xl font-bold text-amber-200">{guessValue}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-[#11172a]/85 p-6">
            <input
              type="range"
              min={1}
              max={100}
              value={guessValue}
              onChange={(event) => setGuessValue(clampGuess(Number(event.target.value)))}
              className="w-full accent-sky-400"
            />

            <div className="mt-4 flex gap-3">
              <input
                type="number"
                min={1}
                max={100}
                value={guessValue}
                onChange={(event) => setGuessValue(clampGuess(Number(event.target.value)))}
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-lg outline-none"
              />
              <button
                onClick={handleGuess}
                disabled={!address || pending}
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {pending ? "Sending..." : "Guess"}
              </button>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <MiniCard label="Your Guesses" value={formatNumber(myGuesses)} />
              <MiniCard label="Your Wins" value={formatNumber(myWins)} />
              <MiniCard label="Last Guess" value={lastGuess > 0 ? String(lastGuess) : "-"} />
              <MiniCard label="Last Target" value={lastTarget > 0 ? String(lastTarget) : "-"} />
            </div>
          </div>

          {!address && (
            <p className="mt-4 text-sm text-white/45">
              Connect a wallet to submit guesses and see your personal stats.
            </p>
          )}
        </div>

        <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Wins Leaderboard</p>
          <h2 className="mt-2 text-2xl font-semibold">Top Guessers</h2>

          <div className="mt-5 space-y-2">
            {displayedBoard.map((entry, index) => (
              <div
                key={`${entry.who}-${index}`}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                  index === 0
                    ? "border-amber-300/25 bg-amber-300/10"
                    : index === 1
                      ? "border-sky-300/20 bg-sky-300/10"
                      : "border-white/8 bg-black/15"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-sm font-semibold text-white/45">{index + 1}</span>
                  <span className="font-mono text-sm text-white/75">
                    {entry.who === "-" ? "---" : shortenAddress(entry.who)}
                  </span>
                </div>
                <span className="text-sm font-semibold text-white/80">
                  {entry.wins > 0 ? `${formatNumber(entry.wins)} wins` : "-"}
                </span>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className={`rounded-[24px] border border-white/10 bg-gradient-to-br ${accent} bg-white/5 p-5 backdrop-blur-xl`}>
      <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function MiniCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/15 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
// rep-page-copy: 1775932225592
// rep-page-ui: 1776047212340
// rep-page-ui: 1776063511942
// rep-page-copy: 1776084632750
// rep-page-copy: 1776116725973
// rep-page-ui: 1776144403040
// rep-page-state: 1776144456703
// rep-page-copy: 1776144622127
// rep-page-copy: 1776171433114
// rep-page-state: 1776171573905
// rep-page-ui: 1776171640653
// rep-page-copy: 1776186894699
// rep-page-ui: 1776186965686
// rep-page-state: 1776187036499
// rep-page-ui: 1776248501718
// rep-page-state: 1776248550412
// rep-page-copy: 1776248568177
// rep-page-copy: 1776257093634
// rep-page-ui: 1776257204717
// rep-page-state: 1776257290984
// rep-page-ui: 1776270390172
// rep-page-copy: 1776270485553
// rep-page-state: 1776270537661
// rep-page-state: 1776316363827
// rep-page-copy: 1776316447059
// rep-page-ui: 1776316717263
// rep-page-copy: 1776331662992
// rep-page-ui: 1776331874496
// rep-page-state: 1776331877700
// rep-page-state: 1776350489955
// rep-page-ui: 1776350641487
// rep-page-copy: 1776350688639
// rep-page-state: 1776373415528
// rep-page-copy: 1776373604257
// rep-page-copy: 1776401720464
// rep-page-state: 1776401813985
// rep-page-ui: 1776401819364
// rep-page-state: 1776432407668
// rep-page-ui: 1776432535483
// rep-page-copy: 1776432710701
// rep-page-ui: 1776461131187
// rep-page-state: 1776461204737
// rep-page-ui: 1776480774953
// rep-page-state: 1776480832228
// rep-page-copy: 1776480848214
// rep-page-state: 1776494718319
// rep-page-ui: 1776494797362
// rep-page-copy: 1776494856926
// rep-page-ui: 1776519505064
// rep-page-copy: 1776519523294
// rep-page-state: 1776519589813
// rep-page-state: 1776551006844
// rep-page-ui: 1776551069679
// rep-page-copy: 1776551119364
// rep-page-ui: 1776586354057
// rep-page-copy: 1776586407441
// rep-page-state: 1776586495770
// rep-page-ui: 1776620393545
// rep-page-state: 1776620402071
// rep-page-copy: 1776620417082
// rep-page-copy: 1776645298746
// rep-page-ui: 1776645365739
// rep-page-state: 1776645415696
// rep-page-copy: 1776673253466
// rep-page-state: 1776673315962
// rep-page-ui: 1776673367641
// rep-page-ui: 1776680310678
// rep-page-state: 1776680441985
// rep-page-copy: 1776680454759
// rep-page-ui: 1776702388020
// rep-page-state: 1776702395516
// rep-page-copy: 1776702542541
// rep-page-copy: 1776752742246
// rep-page-ui: 1776752757282
// rep-page-state: 1776752818413
// rep-page-state: 1776782074545
// rep-page-copy: 1776782092765
// rep-page-ui: 1776782231348
// rep-page-ui: 1776805287877
// rep-page-copy: 1776805410146
// rep-page-copy: 1776818340352
// rep-page-state: 1776818461815
// rep-page-ui: 1776818520330
// rep-page-ui: 1776835232594
// rep-page-state: 1776835289291
// rep-page-copy: 1776835406962
// rep-page-copy: 1776864117269
// rep-page-state: 1776864255760
// rep-page-ui: 1776864263259
// rep-page-state: 1776877287963
// rep-page-copy: 1776877402396
// rep-page-ui: 1776877577114
// rep-page-state: 1776890673835
// rep-page-copy: 1776890744818
// rep-page-ui: 1776890917929
// rep-page-state: 1776939957270
// rep-page-ui: 1776940058201
// rep-page-copy: 1776940132711
// rep-page-ui: 1776963336502
// rep-page-state: 1776963506414
// rep-page-copy: 1776963617827
// rep-page-state: 1777002403894
// rep-page-copy: 1777002416661
// rep-page-ui: 1777002636148
// rep-page-ui: 1777025835093
// rep-page-state: 1777025919620
// rep-page-copy: 1777026007893
// rep-page-copy: 1777038173621
// rep-page-ui: 1777038237084
// rep-page-state: 1777038274788
// rep-page-ui: 1777067329590
// rep-page-copy: 1777067449368
// rep-page-state: 1777067605599
// rep-page-state: 1777104258546
// rep-page-copy: 1777104360270
// rep-page-ui: 1777104563808
// rep-page-ui: 1777120225348
// rep-page-copy: 1777120351366
