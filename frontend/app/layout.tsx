import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://number-guess.vercel.app"),
  title: "Number Guess | On-Chain Prediction Game",
  description: "Guess a number from 1 to 100 on Stacks, track your wins, and climb the on-chain leaderboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="talentapp:project_verification"
          content="47d85d677bb278f2369bfe9640ab26ad2ce3730065a81c398c461c404168b904894a9382c81bbddd532493f72ce34c5c10abf4ffdb69c026c586d497da6ca4e4"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
// rep-layout-meta: 1775932224689
// rep-layout-head: 1775932225414
// rep-layout-head: 1776047202981
// rep-layout-meta: 1776144391499
// rep-layout-head: 1776144729060
// rep-layout-head: 1776171427921
// rep-layout-meta: 1776171626905
// rep-layout-head: 1776186782336
// rep-layout-meta: 1776186917815
// rep-layout-meta: 1776248394927
// rep-layout-head: 1776248498370
// rep-layout-meta: 1776257031327
// rep-layout-head: 1776257140852
// rep-layout-meta: 1776270386944
// rep-layout-head: 1776270567668
// rep-layout-head: 1776316794495
// rep-layout-meta: 1776316804054
// rep-layout-meta: 1776331686152
// rep-layout-head: 1776331688347
// rep-layout-head: 1776350589497
// rep-layout-meta: 1776350690823
// rep-layout-meta: 1776373289716
// rep-layout-head: 1776373377267
// rep-layout-head: 1776401707907
// rep-layout-meta: 1776401782511
// rep-layout-meta: 1776432427623
// rep-layout-head: 1776432476905
// rep-layout-head: 1776461066111
// rep-layout-head: 1776480662488
// rep-layout-meta: 1776480767462
// rep-layout-head: 1776494733045
// rep-layout-meta: 1776494816788
// rep-layout-head: 1776519281351
// rep-layout-meta: 1776519434489
// rep-layout-meta: 1776550871044
// rep-layout-head: 1776551128451
// rep-layout-meta: 1776586325291
// rep-layout-head: 1776586504277
// rep-layout-head: 1776620464989
// rep-layout-meta: 1776620480012
// rep-layout-meta: 1776645422198
// rep-layout-head: 1776645501010
// rep-layout-meta: 1776673181775
// rep-layout-head: 1776673371876
// rep-layout-head: 1776680473780
// rep-layout-meta: 1776680588753
// rep-layout-meta: 1776702499091
// rep-layout-head: 1776702557510
// rep-layout-head: 1776752685004
// rep-layout-meta: 1776752748746
// rep-layout-head: 1776781982158
// rep-layout-meta: 1776782072296
// rep-layout-head: 1776805362468
// rep-layout-meta: 1776805579688
// rep-layout-head: 1776818401212
// rep-layout-meta: 1776818454289
// rep-layout-head: 1776835242387
// rep-layout-meta: 1776835344314
// rep-layout-meta: 1776864053533
// rep-layout-head: 1776864266503
