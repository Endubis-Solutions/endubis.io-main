"use client";

import { motion } from "framer-motion"; // ✅ Correct import
import Link from "next/link";
import { ArrowLeft, Download, Quote, Activity } from "lucide-react";
// import NeuralBackground from "@/components/NeuralBackground";
// import Navbar from "@/components/Navbar";

export default function LiquidityResearchPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-[#D4A54F]/30">
      {/* <NeuralBackground /> */}
      {/* <Navbar /> */}

      <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-[#D4A54F] transition-colors mb-12 font-mono text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Lab
        </Link>

        {/* Header */}
        <header className="mb-16 border-b border-zinc-800 pb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded bg-[#D4A54F]/10 border border-[#D4A54F]/20 text-[#D4A54F] text-xs font-mono tracking-widest">
              PAPER 01
            </span>
            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
              Market Dynamics
            </span>
            <span className="text-zinc-600 font-mono text-xs">
              • Oct 12, 2024
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-light mb-8 leading-tight">
            Stochastic Liquidity <br />
            <span className="font-serif italic text-[#D4A54F]">
              Optimization Models
            </span>
          </h1>

          <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-zinc-100 text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors">
              <Download className="w-4 h-4" />
              Download PDF (2.4MB)
            </button>

            <button className="flex items-center gap-2 px-6 py-3 border border-zinc-700 rounded-full text-zinc-300 font-medium text-sm hover:border-[#D4A54F] hover:text-[#D4A54F] transition-colors">
              <Quote className="w-4 h-4" />
              Cite Paper
            </button>
          </div>
        </header>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <article className="prose prose-invert prose-lg max-w-none prose-headings:font-light prose-p:text-zinc-400 prose-strong:text-white prose-a:text-[#D4A54F]">
            <h3 className="text-2xl text-white mb-4">Abstract</h3>

            <p className="font-serif italic text-xl text-zinc-300 border-l-2 border-[#D4A54F] pl-6 mb-8">
              "We propose a novel automated market maker (AMM) invariant that
              adjusts slippage parameters dynamically based on on-chain
              volatility oracles. This paper demonstrates a 40% reduction in
              impermanent loss compared to constant product models."
            </p>

            <h3>1. Introduction</h3>
            <p>
              Traditional constant product markets ($x \cdot y = k$) suffer from
              capital inefficiency during periods of low volatility and high
              impermanent loss during high volatility. Our research introduces a
              variable <strong>v</strong> representing the localized volatility
              index.
            </p>

            <div className="my-8 p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg text-center">
              <p className="font-mono text-[#D4A54F] text-lg">
                {/* P(x) = \frac{x \cdot y}{v^2 + \sigma} */}
              </p>
              <p className="text-xs text-zinc-600 mt-2 font-mono">
                Equation 1.1: Volatility Adjusted Pricing
              </p>
            </div>

            <h3>2. Methodology</h3>
            <p>
              We utilized agent-based modeling to simulate 10,000 trading
              epochs. Agents were programmed with varying risk tolerances and
              latency constraints. The simulation environment was built using
              Rust and compiled to WASM for browser-based verification.
            </p>

            <h3>3. Results & Implementation</h3>
            <p>
              The model has been deployed to the <strong>Endubis Core</strong>{" "}
              protocol. Live data suggests a correlation coefficient of 0.92
              between our predicted slippage curves and actual execution prices.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="hidden md:block space-y-8">
            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800">
              <h4 className="font-mono text-sm text-zinc-500 uppercase mb-4">
                Authors
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800" />
                  <span className="text-sm">Dr. A. Tesfaye</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800" />
                  <span className="text-sm">S. Nakamoto (Anon)</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800">
              <h4 className="font-mono text-sm text-zinc-500 uppercase mb-4">
                Related Protocols
              </h4>
              <Link
                href="/protocols/core"
                className="group block p-3 bg-zinc-950 border border-zinc-800 rounded-lg hover:border-[#D4A54F] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-white">
                    Endubis Core
                  </span>
                  <Activity className="w-3 h-3 text-green-500" />
                </div>
                <p className="text-xs text-zinc-500 group-hover:text-[#D4A54F]">
                  View Implementation →
                </p>
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
