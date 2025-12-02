"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "motion/react";
import {
  ChevronLeft,
  Smartphone,
  Shield,
  Zap,
  Globe,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  ScanLine,
  Fingerprint,
  CreditCard,
  Layers,
  RefreshCw,
} from "lucide-react";

// --- Components ---

// 1. 3D Animated Phone Component (CSS Only - No Image)
const PhoneDisplay = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Rotations for 3D effect
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Simulated Chart Data
  const bars = [40, 65, 50, 80, 55, 90, 70, 100, 85, 60];

  return (
    <div
      ref={ref}
      className="perspective-[1200px] w-full flex justify-center py-12 md:py-0"
    >
      <motion.div
        style={{ rotateX, rotateY, y }}
        initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-[0_0_50px_rgba(212,165,79,0.15)] overflow-hidden"
      >
        {/* Phone Frame Details */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20 flex justify-center items-center gap-2">
          <div className="w-12 h-1 bg-zinc-800 rounded-full" />
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
        </div>

        {/* Side Buttons */}
        <div className="absolute top-24 -right-2.5 w-1 h-12 bg-zinc-700 rounded-r-md" />
        <div className="absolute top-24 -left-2.5 w-1 h-8 bg-zinc-700 rounded-l-md" />
        <div className="absolute top-36 -left-2.5 w-1 h-12 bg-zinc-700 rounded-l-md" />

        {/* Screen Content */}
        <div className="w-full h-full bg-zinc-950 text-white pt-12 px-5 pb-6 flex flex-col relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute top-[-20%] right-[-50%] w-[300px] h-[300px] bg-[#D4A54F]/10 blur-[60px] rounded-full pointer-events-none" />

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4A54F] to-yellow-200 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-sm">Account 1</span>
            </div>
            <ScanLine className="w-5 h-5 text-zinc-400" />
          </div>

          {/* Balance */}
          <div className="text-center mb-8">
            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
              Total Balance
            </p>
            <h3 className="text-4xl font-bold tracking-tight">
              $42,893<span className="text-[#D4A54F]">.50</span>
            </h3>
            <div className="flex items-center justify-center gap-1 text-green-400 text-sm mt-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>+2.4% (24h)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3 mb-8">
            {[
              { icon: ArrowUpRight, label: "Send" },
              { icon: ArrowDownLeft, label: "Receive" },
              { icon: RefreshCw, label: "Swap" },
              { icon: CreditCard, label: "Buy" },
            ].map((btn, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:bg-[#D4A54F] hover:text-black hover:border-[#D4A54F] transition-colors cursor-pointer group">
                  <btn.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[10px] text-zinc-500">{btn.label}</span>
              </div>
            ))}
          </div>

          {/* Mini Chart */}
          <div className="h-16 flex items-end justify-between gap-1 mb-6 opacity-80">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                transition={{ delay: i * 0.05 }}
                className="w-full bg-[#D4A54F]/20 rounded-t-sm hover:bg-[#D4A54F] transition-colors"
              />
            ))}
          </div>

          {/* Token List */}
          <div className="flex-1 space-y-4">
            <p className="text-xs text-zinc-500 font-medium">Assets</p>
            {[
              {
                sym: "BTC",
                name: "Bitcoin",
                amt: "0.45",
                val: "$19,200",
                color: "bg-orange-500",
              },
              {
                sym: "ETH",
                name: "Ethereum",
                amt: "4.20",
                val: "$12,800",
                color: "bg-blue-500",
              },
              {
                sym: "SOL",
                name: "Solana",
                amt: "150",
                val: "$8,450",
                color: "bg-purple-500",
              },
            ].map((token, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-zinc-800/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full ${token.color}/20 flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 rounded-full ${token.color}`} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{token.name}</p>
                    <p className="text-[10px] text-zinc-500">
                      {token.amt} {token.sym}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{token.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 w-full h-16 bg-zinc-950 border-t border-zinc-900 flex justify-around items-center text-zinc-600">
            <Wallet className="w-6 h-6 text-[#D4A54F]" />
            <Globe className="w-6 h-6" />
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 2. Bento Grid Item
const BentoItem = ({ icon: Icon, title, description, size = "sm", delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className={`${
        size === "lg" ? "md:col-span-2 md:row-span-2" : "md:col-span-1"
      } group relative overflow-hidden rounded-3xl border border-zinc-800 bg-[#080808] p-8 hover:border-[#D4A54F]/30 transition-all duration-300`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A54F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="mb-4 inline-flex rounded-xl bg-[#D4A54F]/10 p-3 text-[#D4A54F]">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-xl font-medium text-white">{title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>

        {size === "lg" && (
          <div className="mt-8 flex gap-2">
            <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
              <motion.div
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="h-full bg-[#D4A54F]"
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4A54F]/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Top Right Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4A54F]/5 blur-[100px]" />
        {/* Bottom Left Glow */}
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[#D4A54F]/5 blur-[80px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A54F]/20 bg-[#D4A54F]/5 text-[#D4A54F] text-xs font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A54F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A54F]"></span>
                </span>
                V2.0 Now Available on iOS & Android
              </div>

              <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-tight leading-[1.1]">
                Your Pocket <br />
                <span className="font-serif italic text-[#D4A54F]">
                  Fortress
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-lg">
                The only non-custodial wallet you'll ever need. Swap, bridge,
                and manage your assets across 50+ chains with military-grade
                encryption.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  App Store
                </button>
                <button className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" />
                  Play Store
                </button>
              </div>

              <div className="flex items-center gap-8 border-t border-zinc-900 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    Chains
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">0%</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    Protocol Fees
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1M+</p>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">
                    Downloads
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3D Phone Component */}
            <div className="flex justify-center lg:justify-end">
              <PhoneDisplay />
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-24 px-6 border-y border-[#D4A54F]/10 bg-zinc-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                Complete <span className="text-[#D4A54F]">Control</span>
              </h3>
              <p className="text-zinc-400">
                Designed for both the crypto-native and the beginner. Powerful
                features wrapped in a simple, elegant interface.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BentoItem
                icon={Shield}
                title="Self-Custody Standard"
                description="Your keys, your crypto. Encrypted locally on your device using Secure Enclave technology. We never have access to your funds."
                size="lg"
                delay={0.1}
              />
              <BentoItem
                icon={Fingerprint}
                title="Biometric Access"
                description="Login instantly with FaceID or TouchID. No more typing long passwords for every transaction."
                delay={0.2}
              />
              <BentoItem
                icon={Zap}
                title="Gasless Swaps"
                description="Pay gas fees with the token you're swapping. No ETH? No problem."
                delay={0.3}
              />
              <BentoItem
                icon={RefreshCw}
                title="Built-in Bridge"
                description="Move assets between Ethereum, Solana, and Arbitrum in one click."
                delay={0.4}
              />
              <BentoItem
                icon={Layers}
                title="NFT Gallery"
                description="Visualize your collectibles with metadata support and floor price tracking."
                size="lg"
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* Assets Marquee (Simulated via grid for cleaner code) */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-center text-sm font-medium text-zinc-500 uppercase tracking-widest mb-12">
              Supported on 50+ Networks
            </h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                "Bitcoin",
                "Ethereum",
                "Polygon",
                "Solana",
                "Arbitrum",
                "Optimism",
                "Avalanche",
                "Base",
              ].map((chain, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/50 hover:border-[#D4A54F]/50 transition-colors cursor-default"
                >
                  <div className="w-2 h-2 rounded-full bg-[#D4A54F]" />
                  <span className="text-lg font-medium text-white">
                    {chain}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security / Call to Action */}
        <section className="py-24 px-6 relative overflow-hidden">
          {/* Background Gradient for this section */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4A54F]/10 to-transparent pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 bg-black/40 backdrop-blur-xl border border-[#D4A54F]/20 rounded-3xl p-12 md:p-20">
            <div className="w-20 h-20 rounded-full bg-[#D4A54F]/10 border border-[#D4A54F] mx-auto mb-8 flex items-center justify-center">
              <Shield className="w-10 h-10 text-[#D4A54F]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
              Start Your <span className="text-[#D4A54F]">Journey</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
              Join over 1 million users who trust Endubis to secure their
              digital legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 rounded-full bg-[#D4A54F] text-black font-bold text-lg hover:bg-[#D4A54F]/90 transition-all shadow-[0_0_20px_rgba(212,165,79,0.4)]">
                Download Now
              </button>
              <button className="px-10 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-white hover:text-white transition-all">
                View Source Code
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer */}
        <footer className="py-10 px-6 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-sm">
            © 2024 Endubis Wallet. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
}
