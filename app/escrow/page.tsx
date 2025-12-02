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
  ChevronLeft,
  CheckCircle,
  Lock,
  Clock,
  Users,
  ShieldCheck,
  FileCode,
  ArrowRight,
  RefreshCcw,
  Handshake,
} from "lucide-react";

// --- Components ---

// 1. 3D Animated Laptop (Escrow Interface Variant)
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
            {/* CSS-Based Fake Interface (No Image Needed) */}
            <div className="h-8 bg-[#111] border-b border-[#333] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
              <div className="w-3 h-3 rounded-full bg-green-500/20" />
              <div className="ml-4 px-3 py-1 bg-[#222] rounded text-[10px] text-zinc-500 font-mono">
                escrow.endubis.eth
              </div>
            </div>

            <div className="flex-1 p-8 relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="flex gap-6 relative z-10 h-full">
                {/* Sidebar */}
                <div className="w-1/4 h-full border-r border-[#333] pr-4 space-y-4 hidden md:block">
                  <div className="h-2 w-12 bg-zinc-800 rounded" />
                  <div className="h-8 w-full bg-[#D4A54F]/10 border border-[#D4A54F]/20 rounded flex items-center px-2">
                    <div className="w-2 h-2 rounded-full bg-[#D4A54F] animate-pulse mr-2" />
                    <div className="h-1 w-12 bg-[#D4A54F]/40 rounded" />
                  </div>
                  <div className="h-8 w-full bg-zinc-800/50 rounded" />
                  <div className="h-8 w-full bg-zinc-800/50 rounded" />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col justify-center items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-[#D4A54F] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,165,79,0.15)]">
                    <Lock className="w-8 h-8 text-[#D4A54F]" />
                  </div>
                  <h3 className="text-white font-mono text-lg mb-2">
                    Funds Secured
                  </h3>
                  <p className="text-zinc-500 text-xs mb-6">
                    Contract #0x82...39A Verified
                  </p>

                  <div className="w-full max-w-sm bg-[#111] rounded border border-[#333] p-4">
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>Buyer Deposit</span>
                      <span className="text-[#D4A54F]">Confirmed</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded mb-4">
                      <div className="w-full h-full bg-[#D4A54F] rounded" />
                    </div>
                    <div className="flex justify-between text-xs text-zinc-400 mb-2">
                      <span>Seller Delivery</span>
                      <span className="text-blue-400 animate-pulse">
                        Pending...
                      </span>
                    </div>
                    <div className="w-full h-1 bg-zinc-800 rounded">
                      <div className="w-[60%] h-full bg-blue-500 rounded" />
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
        <p className="text-zinc-400 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

// 3. Code Block Visualizer
const CodeBlock = () => (
  <div className="font-mono text-xs md:text-sm bg-black/80 p-6 rounded-lg border border-[#D4A54F]/20 shadow-2xl overflow-hidden">
    <div className="flex gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-500/20" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
      <div className="w-3 h-3 rounded-full bg-green-500/20" />
    </div>
    <div className="space-y-1 text-zinc-500">
      <p>
        <span className="text-purple-400">contract</span>{" "}
        <span className="text-[#D4A54F]">EndubisEscrow</span>{" "}
        <span className="text-zinc-300">{`{`}</span>
      </p>
      <p className="pl-4">
        <span className="text-blue-400">function</span>{" "}
        <span className="text-yellow-200">releaseFunds</span>(uint _id){" "}
        <span className="text-blue-400">external</span>{" "}
        <span className="text-zinc-300">{`{`}</span>
      </p>
      <p className="pl-8">
        <span className="text-zinc-300">
          Transaction storage txn = transactions[_id];
        </span>
      </p>
      <p className="pl-8">
        <span className="text-purple-400">require</span>(txn.status ==
        Status.APPROVED, <span className="text-green-400">"Not Approved"</span>
        );
      </p>
      <p className="pl-8">
        <span className="text-zinc-500">// Atomic Transfer</span>
      </p>
      <p className="pl-8">
        txn.seller.<span className="text-yellow-200">transfer</span>
        (txn.amount);
      </p>
      <p className="pl-8">
        <span className="text-purple-400">emit</span>{" "}
        <span className="text-yellow-200">FundsReleased</span>(_id, txn.amount);
      </p>
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
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tighter">
                Trustless <br />
                <span className="font-serif italic text-[#D4A54F]">
                  Transactions
                </span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                Eliminate counterparty risk. Secure, audited smart contracts
                hold funds until all agreed-upon conditions are mathematically
                verified.
              </p>

              <div className="flex gap-4 justify-center mb-20">
                <button className="px-8 py-4 rounded-full bg-[#D4A54F] text-black font-bold text-lg hover:bg-[#D4A54F]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,165,79,0.4)]">
                  Create Escrow
                </button>
                <button className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all">
                  View Audit
                </button>
              </div>
            </motion.div>

            <LaptopEscrow />
          </div>
        </section>

        {/* Code is Law Section */}
        <section className="py-24 px-6 border-y border-[#D4A54F]/10 bg-zinc-900/20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-3xl font-light mb-6">
                Code is <span className="text-[#D4A54F]">Law</span>
              </h3>
              <p className="text-zinc-400 leading-relaxed mb-6">
                Traditional escrow relies on banks and lawyers. Endubis relies
                on immutable code. Once a transaction is deployed to the
                blockchain, the terms cannot be altered by anyone—not even us.
              </p>
              <ul className="space-y-3">
                {[
                  "Non-custodial Protocol",
                  "Instant Settlement",
                  "Zero Arbitrary Fees",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-zinc-300">
                    <CheckCircle className="w-5 h-5 text-[#D4A54F]" />
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
              Security <span className="text-[#D4A54F]">Features</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "Smart Verification",
                  description:
                    "Conditions are verified on-chain via oracles and smart contracts. No human error possible.",
                },
                {
                  icon: Lock,
                  title: "Multi-Sig Security",
                  description:
                    "Optional multi-signature wallets requiring M-of-N approvals for fund release in corporate settings.",
                },
                {
                  icon: Clock,
                  title: "Time-Locked Vaults",
                  description:
                    "Program funds to release linearly over time or only after a specific future block height.",
                },
                {
                  icon: Users,
                  title: "Multi-Party Swaps",
                  description:
                    "Atomic swaps allowing 3+ parties to exchange assets simultaneously without risk.",
                },
                {
                  icon: RefreshCcw,
                  title: "Dispute Resolution",
                  description:
                    "Integrated decentralized arbitration (Kleros) to resolve subjective disputes fairly.",
                },
                {
                  icon: FileCode,
                  title: "Open Source",
                  description:
                    "Our entire codebase is open source and verified on Etherscan for maximum transparency.",
                },
              ].map((feature, idx) => (
                <GlowingCard key={idx} index={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section - Vertical Connected Steps */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative">
            {/* Center Line */}
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
                  title: "Initiate Agreement",
                  desc: "Define terms, amounts, and conditions on-chain.",
                  align: "right",
                },
                {
                  step: "02",
                  title: "Lock Assets",
                  desc: "Buyer deposits crypto. Smart contract locks funds.",
                  align: "left",
                },
                {
                  step: "03",
                  title: "Verify Delivery",
                  desc: "Oracles or Buyer confirm goods/services received.",
                  align: "right",
                },
                {
                  step: "04",
                  title: "Automated Release",
                  desc: "Contract releases funds to Seller instantly.",
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
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-zinc-400">{item.desc}</p>
                      </>
                    )}
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#050505] border-2 border-[#D4A54F] flex items-center justify-center shadow-[0_0_20px_rgba(212,165,79,0.3)]">
                      <span className="font-mono font-bold text-[#D4A54F]">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pl-4 md:pl-0">
                    {/* Mobile View / Right Side Desktop */}
                    <div className="md:hidden">
                      <h4 className="text-xl font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </div>
                    <div className="hidden md:block">
                      {item.align === "right" && (
                        <div className="text-left">
                          <h4 className="text-2xl font-bold text-white mb-2">
                            {item.title}
                          </h4>
                          <p className="text-zinc-400">{item.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases - Bento Grid Style */}
        <section className="py-24 px-6 border-t border-[#D4A54F]/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-light mb-4">
                Built for <span className="text-[#D4A54F]">Any Scene</span>
              </h3>
              <p className="text-zinc-400">
                Flexible enough for individuals, powerful enough for enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-4 h-auto md:h-[500px]">
              {/* Large Item */}
              <div className="md:col-span-3 md:row-span-2 rounded-2xl border border-[#D4A54F]/20 bg-gradient-to-br from-[#D4A54F]/10 to-transparent p-8 flex flex-col justify-between hover:border-[#D4A54F]/50 transition-colors">
                <div>
                  <Handshake className="w-10 h-10 text-[#D4A54F] mb-4" />
                  <h4 className="text-2xl font-bold text-white mb-2">
                    Freelance & Services
                  </h4>
                  <p className="text-zinc-400">
                    Perfect for milestone-based payments. Client deposits funds,
                    which are released as the freelancer completes tasks. Solves
                    the "who pays first" dilemma.
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-black/50 border border-[#D4A54F]/30 text-xs text-[#D4A54F]">
                    Milestones
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/50 border border-[#D4A54F]/30 text-xs text-[#D4A54F]">
                    Dispute Safety
                  </span>
                </div>
              </div>

              {/* Medium Item */}
              <div className="md:col-span-3 rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 hover:border-[#D4A54F]/30 transition-colors">
                <h4 className="text-xl font-bold text-white mb-2">
                  OTC Token Swaps
                </h4>
                <p className="text-zinc-400 text-sm">
                  Exchange large blocks of tokens directly between wallets
                  without slippage from standard DEX pools.
                </p>
              </div>

              {/* Small Item */}
              <div className="md:col-span-2 rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 hover:border-[#D4A54F]/30 transition-colors">
                <h4 className="text-lg font-bold text-white mb-2">
                  Real Estate
                </h4>
                <p className="text-zinc-400 text-xs">
                  Hold earnest money on-chain transparently.
                </p>
              </div>

              {/* Small Item */}
              <div className="md:col-span-1 rounded-2xl border border-zinc-800 bg-[#0A0A0A] p-6 flex items-center justify-center hover:bg-[#D4A54F] hover:text-black transition-colors group cursor-pointer">
                <ArrowRight className="w-8 h-8 group-hover:-rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-zinc-900 bg-[#020202]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>Endubis Escrow Protocol © 2024</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#D4A54F]">
                Audits
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Github
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Documentation
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
