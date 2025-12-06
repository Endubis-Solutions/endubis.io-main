"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import {
  Scale,
  Gavel,
  Clock,
  Users,
  ShieldCheck,
  FileCode,
  ArrowRight,
  BookOpen,
  Landmark,
  ExternalLink,
  GitBranch,
} from "lucide-react";

// --- Components ---

// 1. 3D Animated Laptop (Governance Interface)
const LaptopEscrow = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <div
      ref={ref}
      className="perspective-[1200px] w-full flex justify-center py-10"
    >
      <motion.div
        style={{ rotateX, y }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-4xl preserve-3d group"
      >
        {/* Lid */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative bg-[#1a1a1a] rounded-t-2xl p-2 border border-[#D4A54F]/20 shadow-2xl origin-bottom"
        >
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-700" />
          <div className="bg-neutral-900 rounded-lg overflow-hidden border border-[#D4A54F]/10 relative aspect-[16/10] flex flex-col">
            {/* Browser Bar */}
            <div className="h-8 bg-[#111] border-b border-[#333] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="w-3 h-3 rounded-full bg-zinc-700" />
              <div className="ml-4 px-3 py-1 bg-[#222] rounded text-[10px] text-zinc-500 font-mono flex items-center gap-2">
                {/* <Lock className="w-2 h-2" /> */}
                gedaa.governance.eth
              </div>
            </div>

            <div className="flex-1 p-8 relative overflow-hidden">
              {/* Abstract Data Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]" />

              <div className="flex gap-6 relative z-10 h-full">
                {/* Sidebar */}
                <div className="w-1/5 h-full border-r border-[#333] pr-4 space-y-3 hidden md:block">
                  <div className="h-2 w-16 bg-zinc-800 rounded mb-6" />

                  <div className="h-8 w-full bg-[#D4A54F]/10 border border-[#D4A54F]/20 rounded flex items-center px-2">
                    <Scale className="w-3 h-3 text-[#D4A54F] mr-2" />
                    <div className="h-1 w-12 bg-[#D4A54F]/40 rounded" />
                  </div>
                  <div className="h-8 w-full bg-zinc-900 border border-zinc-800 rounded flex items-center px-2 opacity-50">
                    <Users className="w-3 h-3 text-zinc-500 mr-2" />
                    <div className="h-1 w-16 bg-zinc-800 rounded" />
                  </div>
                </div>

                {/* Main Content: Dispute Resolution Dashboard */}
                <div className="flex-1 flex flex-col">
                  {/* Dashboard Header */}
                  <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                    <div>
                      <h4 className="text-white font-mono text-sm">
                        Dispute #4092: Escrow Lock
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        Cycle: Lubba (Phase 2)
                      </p>
                    </div>
                    <div className="px-2 py-1 bg-green-900/20 border border-green-900 rounded text-[10px] text-green-500 font-mono">
                      RULING OPEN
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#111] p-3 rounded border border-zinc-800">
                      <p className="text-[10px] text-zinc-500 mb-1">
                        STAKED ASSETS
                      </p>
                      <p className="text-lg text-white font-mono">
                        450,000 ETH
                      </p>
                    </div>
                    <div className="bg-[#111] p-3 rounded border border-zinc-800">
                      <p className="text-[10px] text-zinc-500 mb-1">
                        JURORS ACTIVE
                      </p>
                      <p className="text-lg text-white font-mono">12 / 15</p>
                    </div>
                  </div>

                  <div className="w-full bg-[#111] rounded border border-[#333] p-4 flex-1">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>Consensus Progress</span>
                      <span className="text-[#D4A54F]">78%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded mb-4 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "78%" }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-[#D4A54F]"
                      />
                    </div>

                    <div className="space-y-2 mt-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-[10px] text-zinc-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                          <span>Hash: 0x7a...8b{i} verified via zk-proof</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Base */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="relative h-4 bg-[#2a2a2a] rounded-b-xl -mt-1 mx-4 shadow-[0_20px_50px_-10px_rgba(212,165,79,0.3)] border-t border-zinc-700"
        />
      </motion.div>
    </div>
  );
};

// 2. Glowing Feature Card
const GlowingCard = ({ icon: Icon, title, description, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="group relative border border-[#D4A54F]/10 bg-[#0A0A0A] rounded-xl p-8 overflow-hidden h-full"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 165, 79, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <div className="p-3 w-fit rounded-lg bg-[#D4A54F]/5 border border-[#D4A54F]/20 mb-6 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#D4A54F]" />
        </div>
        <h4 className="text-xl font-medium text-zinc-100 mb-3">{title}</h4>
        <p className="text-zinc-400 leading-relaxed text-sm font-light">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

// 3. Code Block Visualizer (Governance Contract)
const CodeBlock = () => (
  <div className="font-mono text-xs md:text-sm bg-[#080808] p-6 rounded-lg border border-[#D4A54F]/20 shadow-2xl overflow-hidden relative">
    <div className="absolute top-0 right-0 p-2 text-[10px] text-zinc-600 bg-zinc-900 rounded-bl">
      GedaaController.sol
    </div>
    <div className="flex gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-zinc-700" />
      <div className="w-3 h-3 rounded-full bg-zinc-700" />
    </div>
    <div className="space-y-1 text-zinc-500">
      <p>
        <span className="text-purple-400">contract</span>{" "}
        <span className="text-[#D4A54F]">GedaaDJP</span>{" "}
        <span className="text-zinc-300">{`{`}</span>
      </p>
      <p className="pl-4">
        <span className="text-blue-400">struct</span>{" "}
        <span className="text-yellow-200">Ruling</span>{" "}
        <span className="text-zinc-300">{`{`}</span>
      </p>
      <p className="pl-8">uint256 disputeID;</p>
      <p className="pl-8">address[] jurors;</p>
      <p className="pl-8">bool consensusReached;</p>
      <p className="pl-4">
        <span className="text-zinc-300">{`}`}</span>
      </p>
      <p className="pl-4 mt-2">
        <span className="text-blue-400">function</span>{" "}
        <span className="text-yellow-200">executeJudgement</span>(uint _id){" "}
        <span className="text-blue-400">external</span>{" "}
        <span className="text-zinc-300">{`{`}</span>
      </p>
      <p className="pl-8">
        <span className="text-zinc-500">// Verify Gadaa cycle phase</span>
      </p>
      <p className="pl-8">
        <span className="text-purple-400">require</span>(currentCycle ==
        Phases.LUBBA);
      </p>

      <p className="pl-8 mt-1">
        <span className="text-purple-400">if</span> (ruling.consensusReached){" "}
        {"{"}
      </p>
      <p className="pl-12">
        <span className="text-yellow-200">distributeEscrow</span>(_id);
      </p>
      <p className="pl-8">
        {"}"} <span className="text-purple-400">else</span> {"{"}
      </p>
      <p className="pl-12">
        <span className="text-yellow-200">escalateToCouncil</span>(_id);
      </p>
      <p className="pl-8">{"}"}</p>
      <p className="pl-4">
        <span className="text-zinc-300">{`}`}</span>
      </p>
      <p>
        <span className="text-zinc-300">{`}`}</span>
      </p>
    </div>
  </div>
);

// --- Main Page ---

export default function EscrowPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4A54F]/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#D4A54F]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-[#D4A54F]/5 blur-[100px] rounded-full" />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 mb-20">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Status Tags */}
              <div className="flex justify-center gap-3 mb-8">
                <span className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400">
                  beta-rc3
                </span>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-[#D4A54F]/10 border border-[#D4A54F]/20 rounded text-[10px] font-mono text-[#D4A54F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A54F] animate-pulse" />
                  LIVE
                </span>
              </div>

              <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tighter">
                Gedaa <br />
                <span className="font-serif italic text-[#D4A54F]">
                  Protocol
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed max-w-2xl mx-auto font-light">
                An experimental governance initiative translating the Gadaa
                democratic cycle into a resilient blockchain Decentralized
                Justice Protocol (DJP).
              </p>

              {/* Stats from Image */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-y border-zinc-900 py-6 mb-12">
                <div className="text-center">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    Testnet Volume
                  </p>
                  <p className="text-2xl font-mono text-white">$450M</p>
                </div>
                <div className="text-center border-l border-zinc-900">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    Avg Settlement
                  </p>
                  <p className="text-2xl font-mono text-white">12s</p>
                </div>
                <div className="text-center border-l border-zinc-900">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    Active Users
                  </p>
                  <p className="text-2xl font-mono text-white">2k</p>
                </div>
              </div>

              <div className="flex gap-4 justify-center mb-20">
                <button className="px-8 py-4 rounded-lg bg-[#D4A54F] text-black font-bold text-sm hover:bg-[#D4A54F]/90 transition-all shadow-[0_0_20px_rgba(212,165,79,0.3)] flex items-center gap-2">
                  Launch Escrow Console <ExternalLink className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 rounded-lg border border-zinc-700 text-zinc-300 font-bold text-sm hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center gap-2">
                  <GitBranch className="w-4 h-4" /> View Protocol
                </button>
              </div>
            </motion.div>

            <LaptopEscrow />
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-24 px-6 border-y border-[#D4A54F]/10 bg-zinc-900/20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <h3 className="text-3xl font-light mb-6">
                Indigenous <span className="text-[#D4A54F]">Consensus</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6 font-light">
                The Gadaa system is one of the world's oldest forms of
                democratic governance. We are translating its core
                tenets—rotational power, distribution of authority, and
                consensus-based conflict resolution—into immutable smart
                contracts.
              </p>
              <ul className="space-y-4">
                {[
                  "Arbitration via Random Sortition",
                  "8-Year Governance Cycles (Gadaa)",
                  "Transparent Ledger of Rulings",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-zinc-300 text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D4A54F]/10 flex items-center justify-center border border-[#D4A54F]/30">
                      <Scale className="w-3 h-3 text-[#D4A54F]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full max-w-lg">
              <CodeBlock />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-light mb-16 text-center">
              Decentralized <span className="text-[#D4A54F]">Justice</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Scale,
                  title: "Trustless Arbitration",
                  description:
                    "Disputes are resolved by a decentralized panel of jurors selected via cryptographic sortition, removing bias from the process.",
                },
                {
                  icon: Landmark,
                  title: "Council Multi-Sig",
                  description:
                    "Complex, high-value cases can escalate to a democratically elected council of elders (Abbaa Gadaa) for final settlement.",
                },
                {
                  icon: Clock,
                  title: "Temporal Governance",
                  description:
                    "Protocol parameters evolve automatically according to the 8-year Gadaa cycle, preventing stagnation and power consolidation.",
                },
                {
                  icon: ShieldCheck,
                  title: "Evidence Locker",
                  description:
                    "All dispute evidence is hashed and stored on IPFS, linked immutably to the case ID on-chain for total transparency.",
                },
                {
                  icon: Gavel,
                  title: "Staked Enforcement",
                  description:
                    "Jurors stake native tokens to participate. Malicious or lazy rulings result in slashing, incentivizing honest judgment.",
                },
                {
                  icon: BookOpen,
                  title: "Living Constitution",
                  description:
                    "The rules of the protocol are upgradable only through the consensus of the current Gadaa cycle participants.",
                },
              ].map((feature, idx) => (
                <GlowingCard key={idx} index={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-[#D4A54F]/20">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5 }}
                className="w-full bg-[#D4A54F] shadow-[0_0_10px_#D4A54F]"
              />
            </div>

            <div className="space-y-20">
              {[
                {
                  step: "01",
                  title: "Escrow Creation",
                  desc: "Parties lock funds in the Gedaa smart contract. Terms are hashed on-chain.",
                  align: "right",
                },
                {
                  step: "02",
                  title: "Dispute Trigger",
                  desc: "If conflict arises, a 'Caffee' (assembly) is called. Evidence is submitted.",
                  align: "left",
                },
                {
                  step: "03",
                  title: "Juror Selection",
                  desc: "The protocol randomly selects adjudicators from the active cycle pool.",
                  align: "right",
                },
                {
                  step: "04",
                  title: "Execution",
                  desc: "Ruling is cryptographically enforced. Funds are distributed or returned.",
                  align: "left",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-8 ${
                    item.align === "left"
                      ? "md:flex-row-reverse"
                      : "md:flex-row"
                  }`}
                >
                  <div className="flex-1 hidden md:block text-right">
                    {item.align === "left" && (
                      <>
                        <h4 className="text-xl font-bold text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-zinc-400 font-light text-sm">
                          {item.desc}
                        </p>
                      </>
                    )}
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border-2 border-[#D4A54F] flex items-center justify-center shadow-[0_0_20px_rgba(212,165,79,0.2)]">
                      <span className="font-mono font-bold text-[#D4A54F]">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pl-4 md:pl-0">
                    <div className="md:hidden">
                      <h4 className="text-lg font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400 text-xs">{item.desc}</p>
                    </div>
                    <div className="hidden md:block">
                      {item.align === "right" && (
                        <div className="text-left">
                          <h4 className="text-xl font-bold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-zinc-400 font-light text-sm">
                            {item.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-zinc-900 bg-[#020202]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600">
            <p>Gedaa DJP v3.0.0 • Endubis Labs</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#D4A54F]">
                Whitepaper
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Constitution
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Governance Forum
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
