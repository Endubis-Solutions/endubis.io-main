"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Send,
  MessageCircle,
  Shield,
  Zap,
  Globe,
  Wallet,
  Smartphone,
  MapPin,
  Lock,
  ExternalLink,
  ChevronRight,
  Fingerprint,
} from "lucide-react";

// --- Components ---

// 1. 3D Animated "Telegram Interface" (Visualizing the Chat-based Wallet)
const TelegramDisplay = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div
      ref={ref}
      className="perspective-[1200px] w-full flex justify-center py-12 md:py-0"
    >
      <motion.div
        style={{ rotateX, rotateY, y }}
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotateY: -5 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-[320px] h-[640px] bg-[#0e1621] rounded-[3rem] border-[4px] border-zinc-800 shadow-[0_0_80px_rgba(42,171,238,0.1)] overflow-hidden"
      >
        {/* Phone Notch/Speaker */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-xl z-20 flex justify-center items-center gap-2 border-b border-x border-zinc-800/50">
          <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
          <div className="w-8 h-1 bg-zinc-900 rounded-full" />
        </div>

        {/* Telegram-style Header */}
        <div className="w-full bg-[#17212b] pt-14 pb-3 px-4 flex items-center gap-3 border-b border-black/20">
          <div className="w-10 h-10 rounded-full bg-[#D4A54F] flex items-center justify-center text-black font-bold text-lg">
            E
          </div>
          <div>
            <h4 className="text-white text-sm font-bold">Endubis Bot</h4>
            <p className="text-blue-400 text-xs">bot</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-full h-full bg-[#0e1621] p-4 flex flex-col gap-4 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

          {/* Bot Message 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="self-start max-w-[85%] bg-[#182533] p-3 rounded-2xl rounded-tl-none border border-zinc-800/50"
          >
            <p className="text-zinc-300 text-xs mb-2">Welcome back! 👋</p>
            <div className="bg-[#0e1621] p-2 rounded-lg border border-zinc-800/50 mb-1">
              <p className="text-[10px] text-zinc-500 uppercase">
                Total Balance
              </p>
              <p className="text-white font-mono text-lg">4,250 ETB</p>
            </div>
            <p className="text-[10px] text-zinc-500 text-right mt-1">
              10:42 AM
            </p>
          </motion.div>

          {/* User Message */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="self-end max-w-[80%] bg-[#2b5278] p-3 rounded-2xl rounded-tr-none text-white text-xs"
          >
            <p>Send 500 ETB to @Kebede</p>
            <p className="text-[10px] text-blue-200 text-right mt-1 flex items-center justify-end gap-1">
              10:43 AM <span className="text-blue-200">✓✓</span>
            </p>
          </motion.div>

          {/* Bot Message 2 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="self-start max-w-[85%] bg-[#182533] p-3 rounded-2xl rounded-tl-none border border-zinc-800/50"
          >
            <div className="flex items-center gap-2 mb-2 text-green-400 text-xs">
              <Zap className="w-3 h-3" />
              <span>Transaction Confirmed</span>
            </div>
            <p className="text-zinc-400 text-[10px] font-mono mb-2">
              TxID: 0x7f...3a21
            </p>
            <button className="w-full py-2 bg-[#2b5278] rounded text-white text-xs font-medium hover:bg-[#34628f]">
              View Explorer
            </button>
            <p className="text-[10px] text-zinc-500 text-right mt-1">
              10:43 AM
            </p>
          </motion.div>
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 w-full bg-[#17212b] p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
            <Wallet className="w-4 h-4" />
          </div>
          <div className="flex-1 h-8 bg-[#0e1621] rounded-full px-3 flex items-center text-zinc-500 text-xs">
            Message...
          </div>
          <div className="w-8 h-8 rounded-full bg-[#2b5278] flex items-center justify-center text-white">
            <Send className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 2. Feature Card
const SpecCard = ({ icon: Icon, title, code, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      viewport={{ once: true }}
      className="group relative bg-[#080808] border border-zinc-800 p-6 rounded-xl hover:border-[#D4A54F]/30 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-[#D4A54F] transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded">
          {code}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

// --- Main Page ---

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4A54F]/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4A54F]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[#D4A54F]/5 blur-[80px]" />
      </div>

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 mb-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Tags from Image */}
              <div className="flex items-center gap-3 mb-8">
                <div className="px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] font-mono text-zinc-400">
                  v1.0.0
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 bg-[#D4A54F]/10 border border-[#D4A54F]/20 rounded text-[10px] font-mono text-[#D4A54F]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A54F] animate-pulse" />
                  LIVE
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight leading-[1.1]">
                Endubis <br />
                <span className="font-serif italic text-[#D4A54F]">Wallet</span>
              </h1>

              <h2 className="text-xl font-mono text-[#D4A54F] mb-6">
                Identity Client
              </h2>

              {/* Description from Image */}
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed max-w-lg font-light border-l-2 border-[#D4A54F]/20 pl-6">
                Endubis Wallet is Ethiopia’s home-grown, semi-custodial crypto
                wallet focused on onboarding new users onto the web3 space -
                built by local talent for the needs of users in Africa. Fast,
                secure, and accessible directly through Telegram, Endubis makes
                managing digital assets simple and empowering.
              </p>

              {/* Stats from Image */}
              <div className="grid grid-cols-2 gap-8 border-t border-zinc-900 pt-8 mb-10 max-w-md">
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    Users
                  </p>
                  <p className="text-3xl font-mono text-white">2k</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    Chains
                  </p>
                  <p className="text-3xl font-mono text-white">3+</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 rounded-lg bg-[#229ED9] text-white font-bold text-sm hover:bg-[#229ED9]/90 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,158,217,0.3)]">
                  <MessageCircle className="w-4 h-4" />
                  Open in Telegram
                </button>
                <button className="px-8 py-4 rounded-lg border border-zinc-800 text-zinc-400 font-mono text-xs hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Visual Component */}
            <div className="flex justify-center lg:justify-end">
              <TelegramDisplay />
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-24 px-6 border-y border-[#D4A54F]/10 bg-zinc-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-3xl font-light mb-2 text-white">
                  Built for <span className="text-[#D4A54F]">Africa</span>
                </h2>
                <p className="text-zinc-500">
                  Optimized for low-bandwidth environments and ease of access.
                </p>
              </div>
              <div className="font-mono text-xs text-[#D4A54F] flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                ADDIS_ABABA_NODE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SpecCard
                icon={MessageCircle}
                code="SOCIAL_ABSTRACTION"
                title="Telegram Native"
                description="No app stores, no downloads. Interact with the blockchain directly through a familiar chat interface on Telegram."
                delay={0.1}
              />
              <SpecCard
                icon={Shield}
                code="SEMI_CUSTODIAL"
                title="Managed Security"
                description="We handle the complexity of key management while giving you control. A perfect balance of security and recovery options for new users."
                delay={0.2}
              />
              <SpecCard
                icon={Globe}
                code="LOCAL_ROOTS"
                title="Home-Grown"
                description="Built by Ethiopian developers specifically for the local economic context, solving real on-ramp and off-ramp challenges."
                delay={0.3}
              />
              <SpecCard
                icon={Zap}
                code="L2_SPEED"
                title="Instant Transactions"
                description="Utilizes Layer 2 scaling solutions to ensure payments are processed in seconds with negligible fees."
                delay={0.4}
              />
              <SpecCard
                icon={Fingerprint}
                code="ONBOARDING"
                title="Frictionless Entry"
                description="Abstracting away seed phrases and gas fees to onboard the next million users into the Web3 economy."
                delay={0.5}
              />
              <SpecCard
                icon={Smartphone}
                code="GSM_OPT"
                title="Data Efficient"
                description="Engineered to function reliably even on unstable 3G connections common in semi-urban areas."
                delay={0.6}
              />
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-4xl mx-auto border border-zinc-800 bg-[#080808] rounded-2xl p-8 md:p-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-4">
                Start your journey today
              </h3>
              <p className="text-zinc-400 mb-8">
                Join the fastest growing Web3 community in Ethiopia. Manage your
                assets, pay friends, and explore the decentralized web without
                leaving your favorite chat app.
              </p>
              <button className="text-[#D4A54F] hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
                Read Documentation <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* QR Code / Visual */}
            <div className="w-48 h-48 bg-white p-4 rounded-xl flex items-center justify-center relative">
              <div className="absolute inset-0 border-2 border-[#D4A54F] rounded-xl translate-x-2 translate-y-2 -z-10" />
              <div className="w-full h-full bg-zinc-900 rounded flex items-center justify-center">
                <MessageCircle className="w-16 h-16 text-zinc-700" />
                <span className="absolute bottom-2 text-[10px] text-zinc-500 font-mono">
                  SCAN TO CHAT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 px-6 border-t border-zinc-900 text-center">
          <p className="text-zinc-600 text-xs font-mono">
            Built in Addis Ababa • © 2025 Endubis Labs
          </p>
        </footer>
      </main>
    </div>
  );
}
