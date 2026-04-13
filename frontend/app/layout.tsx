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
// rep-layout-meta: 1776116855373
