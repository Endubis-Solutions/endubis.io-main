"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  Server,
  Cpu,
  Globe,
  Activity,
  Zap,
  Box,
  CheckCircle,
  Copy,
  Terminal,
  Wifi,
  Database,
} from "lucide-react";

// --- Components ---

// 1. Animated Server Node Visualizer
const ServerNodeVisual = () => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square perspective-[1000px] group">
      {/* Rotating Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-[#D4A54F]/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-10 rounded-full border border-dotted border-[#D4A54F]/10"
      />

      {/* Main Server Block */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative w-48 h-64 bg-[#0a0a0a] border border-zinc-800 rounded-lg shadow-[0_0_50px_rgba(212,165,79,0.15)] overflow-hidden flex flex-col items-center">
          {/* Server Rack Lights */}
          <div className="w-full h-8 bg-[#111] border-b border-zinc-800 flex items-center px-4 gap-1.5">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.5, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"
              />
            ))}
          </div>

          {/* Data Stream Animation */}
          <div className="flex-1 w-full relative p-4 flex justify-between gap-1 opacity-50">
            {[1, 2, 3, 4, 5].map((col) => (
              <div
                key={col}
                className="w-1 h-full bg-zinc-900 rounded-full overflow-hidden relative"
              >
                <motion.div
                  animate={{ y: ["100%", "-100%"] }}
                  transition={{
                    duration: 1.5 + Math.random(),
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-full h-1/3 bg-[#D4A54F]"
                />
              </div>
            ))}
          </div>

          {/* Core Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-black/80 backdrop-blur-sm rounded-full border border-[#D4A54F] flex items-center justify-center">
              <Box className="w-10 h-10 text-[#D4A54F]" />
            </div>
          </div>

          {/* Footer Stats */}
          <div className="w-full h-12 bg-[#111] border-t border-zinc-800 flex items-center justify-between px-4 text-[9px] font-mono text-zinc-500">
            <span>EPOCH 482</span>
            <span className="text-[#D4A54F]">SLOT LEADER</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#D4A54F] rounded-full"
          animate={{
            x: Math.cos(i) * 140,
            y: Math.sin(i) * 140,
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// 2. Live Epoch Progress Bar
const EpochProgress = () => {
  return (
    <div className="w-full bg-[#111] border border-zinc-800 rounded-xl p-6 mb-12">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h3 className="text-white font-mono text-sm">CURRENT EPOCH: 482</h3>
          <p className="text-zinc-500 text-xs">
            Ouroboros Protocol • Cardano Mainnet
          </p>
        </div>
        <div className="text-right">
          <p className="text-[#D4A54F] font-mono text-xl font-bold">78%</p>
          <p className="text-zinc-500 text-[10px] uppercase">Completion</p>
        </div>
      </div>
      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "78%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-[#D4A54F] shadow-[0_0_10px_#D4A54F]"
        />
        {/* Scanline effect */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-white/20 w-1/4 skew-x-12 blur-sm"
        />
      </div>
      <div className="flex justify-between mt-2 text-[10px] font-mono text-zinc-600">
        <span>START: 2025-10-12</span>
        <span>ETA: 14h 22m</span>
      </div>
    </div>
  );
};

// 3. Stat Card with "Ticker" Animation
const PoolStat = ({ label, value, sub, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-[#080808] border border-zinc-800 p-6 rounded-xl hover:border-[#D4A54F]/30 transition-colors group"
  >
    <p className="text-xs text-zinc-500 font-mono uppercase mb-2 tracking-wider">
      {label}
    </p>
    <h4 className="text-3xl font-light text-white mb-1 group-hover:text-[#D4A54F] transition-colors">
      {value}
    </h4>
    <p className="text-xs text-zinc-600 font-mono">{sub}</p>
  </motion.div>
);

// --- Main Component ---

export default function EndubisPoolPage() {
  const [copied, setCopied] = useState(false);
  const poolId = "pool18n5t5...x9j2m"; // Mock ID

  const handleCopy = () => {
    navigator.clipboard.writeText(poolId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-200 font-sans selection:bg-[#D4A54F]/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4A54F]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-900/5 blur-[150px] rounded-full" />
        <div className="absolute top-20 right-20 w-[20%] h-[20%] bg-[#D4A54F]/5 blur-[100px] rounded-full" />
      </div>

      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-blue-900/20 border border-blue-800 rounded text-blue-400 text-xs font-mono font-bold">
                CARDANO MAINNET
              </span>
              <span className="px-3 py-1 bg-[#D4A54F]/10 border border-[#D4A54F]/20 rounded text-[#D4A54F] text-xs font-mono font-bold animate-pulse">
                BLOCK PRODUCING
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tighter">
              ENDUBIS <br />
              <span className="font-serif italic text-[#D4A54F]">POOL</span>
            </h1>

            <p className="text-xl text-zinc-400 mb-8 leading-relaxed font-light border-l-2 border-[#D4A54F] pl-6">
              Delegate to the heartbeat of the Endubis ecosystem.
              High-performance, bare-metal infrastructure securing the Cardano
              network while funding open-source research in Africa.
            </p>

            {/* Pool ID Copy Box */}
            <div className="max-w-md bg-[#111] rounded-lg border border-zinc-800 p-2 flex items-center gap-2 mb-8">
              <div className="bg-zinc-900 px-3 py-2 rounded text-[#D4A54F] font-bold font-mono text-sm">
                [ENDU]
              </div>
              <code className="flex-1 text-zinc-500 font-mono text-xs truncate">
                {poolId}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-zinc-800 rounded transition-colors text-zinc-400 hover:text-white"
              >
                {copied ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex gap-4">
              <button className="px-8 py-3 rounded-full bg-[#D4A54F] text-black font-bold hover:bg-[#D4A54F]/90 transition-all shadow-[0_0_20px_rgba(212,165,79,0.3)]">
                Delegate Now
              </button>
              <button className="px-8 py-3 rounded-full border border-zinc-800 hover:border-white transition-all flex items-center gap-2">
                <Globe className="w-4 h-4" /> Adapools
              </button>
            </div>
          </motion.div>

          {/* Visual */}
          <ServerNodeVisual />
        </div>

        {/* Live Status Bar */}
        <EpochProgress />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          <PoolStat
            label="Variable Fee"
            value="0%"
            sub="Lowest Possible Margin"
            delay={0.1}
          />
          <PoolStat
            label="Fixed Fee"
            value="170 ₳"
            sub="Standard Minimum"
            delay={0.2}
          />
          <PoolStat
            label="Active Stake"
            value="14.2M ₳"
            sub="Saturation: 22%"
            delay={0.3}
          />
          <PoolStat
            label="Lifetime ROA"
            value="3.5%"
            sub="Annualized Return"
            delay={0.4}
          />
        </div>

        {/* Technical Specs (The "Research Lab" Vibe) */}
        <div className="border-t border-zinc-900 pt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light mb-4">
              Bare Metal <span className="text-[#D4A54F]">Infrastructure</span>
            </h2>
            <p className="text-zinc-500">
              We do not rely on cloud providers. We own our hardware.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Spec 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#D4A54F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Server className="w-10 h-10 text-zinc-600 mb-6 group-hover:text-[#D4A54F] transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">
                Primary Node
              </h3>
              <ul className="space-y-2 text-sm text-zinc-500 font-mono">
                <li className="flex justify-between">
                  <span>CPU</span>{" "}
                  <span className="text-zinc-300">AMD EPYC 64-Core</span>
                </li>
                <li className="flex justify-between">
                  <span>RAM</span>{" "}
                  <span className="text-zinc-300">256GB ECC DDR4</span>
                </li>
                <li className="flex justify-between">
                  <span>NET</span>{" "}
                  <span className="text-zinc-300">10Gbps Uplink</span>
                </li>
              </ul>
            </motion.div>

            {/* Spec 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Globe className="w-10 h-10 text-zinc-600 mb-6 group-hover:text-blue-500 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">
                Relay Network
              </h3>
              <ul className="space-y-2 text-sm text-zinc-500 font-mono">
                <li className="flex justify-between">
                  <span>EU-CENTRAL</span>{" "}
                  <span className="text-green-500">ONLINE</span>
                </li>
                <li className="flex justify-between">
                  <span>US-EAST</span>{" "}
                  <span className="text-green-500">ONLINE</span>
                </li>
                <li className="flex justify-between">
                  <span>AF-EAST</span>{" "}
                  <span className="text-green-500">ONLINE</span>
                </li>
              </ul>
            </motion.div>

            {/* Spec 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-8 bg-[#0a0a0a] border border-zinc-800 rounded-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Database className="w-10 h-10 text-zinc-600 mb-6 group-hover:text-purple-500 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">Redundancy</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                24/7 monitoring with automated failover via Mithril Signer
                integration. Power redundancy and air-gapped cold key storage.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Terminal Log Animation */}
        <div className="mt-24 bg-black rounded-lg border border-zinc-800 p-1 shadow-2xl">
          <div className="bg-zinc-900/50 px-4 py-2 flex items-center gap-2 rounded-t border-b border-zinc-800">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <span className="ml-auto text-[10px] text-zinc-500 font-mono">
              node-core.log — bash
            </span>
          </div>
          <div className="p-6 font-mono text-xs text-zinc-500 space-y-2 h-48 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <p>[INFO] Connection established with peer 192.168.1.42</p>
            <p>[INFO] Minting block at slot 492910...</p>
            <p className="text-[#D4A54F]">
              [SUCCESS] Block minted! Hash: 0x8f...2a91
            </p>
            <p>[INFO] Propagating to network (12ms)</p>
            <p>[INFO] Mempool size: 42kb</p>
            <p>[INFO] Epoch stake snapshot taken.</p>
            <motion.div
              animate={{ opacity: [0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-[#D4A54F] align-middle ml-1"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
