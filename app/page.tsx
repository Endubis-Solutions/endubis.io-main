"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "motion/react";
import {
  Atom,
  Binary,
  Network,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Box,
  Activity,
  ExternalLink,
  Microscope,
  Terminal,
  Cpu,
  Layers,
} from "lucide-react";

// --- UI Components ---

// 1. Animated Background
const NeuralBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#D4A54F]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-[#D4A54F]/5 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};

// 2. Navigation Bar
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Research", href: "#research" },
    { name: "Projects", href: "#protocols" },
    { name: "Pool", href: "/pool" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#050505]/80 backdrop-blur-md border-[#D4A54F]/10 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-[#D4A54F]/20 bg-[#D4A54F]/5">
            <Atom className="w-5 h-5 text-[#D4A54F]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4A54F] transition-colors">
            ENDUBIS{" "}
            <span className="font-light text-zinc-500 text-sm">LABS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-zinc-400 hover:text-[#D4A54F] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <button className="px-5 py-2 rounded-full border border-[#D4A54F]/30 text-[#D4A54F] text-sm font-medium hover:bg-[#D4A54F] hover:text-black transition-all flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Github
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-[#050505] border-b border-[#D4A54F]/20"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-zinc-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

// 3. Research Section Component (The Abstract Theory)
const ResearchSection = ({
  id,
  title,
  subtitle,
  description,
  tags,
  imageComponent,
  align = "left",
  number,
}) => {
  return (
    <section
      id={id}
      className="py-24 md:py-32 px-6 relative border-t border-[#D4A54F]/10"
    >
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: align === "left" ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={`order-2 ${
            align === "left" ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="font-mono text-[#D4A54F] bg-[#D4A54F]/10 px-3 py-1 rounded text-xs tracking-widest border border-[#D4A54F]/20">
              PAPER 0{number}
            </span>
            <div className="h-px w-12 bg-[#D4A54F]/30" />
            <span className="text-xs text-zinc-500 uppercase tracking-widest">
              {subtitle}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-white leading-tight">
            {title}
          </h2>
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed font-light">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm rounded-md font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          <button className="group flex items-center gap-2 text-white border-b border-[#D4A54F] pb-1 hover:text-[#D4A54F] transition-colors">
            Read Technical Paper{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
        <div
          className={`order-1 ${
            align === "left" ? "lg:order-2" : "lg:order-1"
          } flex justify-center`}
        >
          {imageComponent}
        </div>
      </div>
    </section>
  );
};

// 4. Protocol Card (The Live Implementation - Links to Sub-pages)
const ProtocolCard = ({
  title,
  version,
  type,
  description,
  stats,
  linkUrl,
  linkText,
}) => (
  <Link href={linkUrl} className="block h-full">
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-[#080808] border border-zinc-800 p-8 rounded-2xl overflow-hidden hover:border-[#D4A54F]/50 transition-all duration-300 h-full flex flex-col"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4A54F]/0 via-[#D4A54F]/0 to-[#D4A54F]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-black border border-zinc-800 rounded-lg group-hover:border-[#D4A54F]/50 transition-colors">
            <Box className="w-6 h-6 text-[#D4A54F]" />
          </div>
          <div className="flex gap-2">
            <span className="text-[10px] font-mono border border-zinc-800 px-2 py-1 rounded text-zinc-500">
              {version}
            </span>
            <span className="text-[10px] font-mono bg-[#D4A54F]/10 text-[#D4A54F] px-2 py-1 rounded flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D4A54F] animate-pulse" />
              LIVE
            </span>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm font-mono text-[#D4A54F] mb-4">{type}</p>
        <p className="text-zinc-400 leading-relaxed mb-8 flex-1 text-sm font-light">
          {description}
        </p>

        {/* Mini Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8 border-t border-zinc-800/50 pt-6">
          {stats.map((stat, i) => (
            <div key={i}>
              <div className="text-[10px] text-zinc-600 font-mono uppercase mb-1">
                {stat.label}
              </div>
              <div className="text-lg text-zinc-200 font-mono">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="w-full py-3 rounded-lg border border-zinc-700 hover:bg-[#D4A54F] hover:border-[#D4A54F] hover:text-black transition-all flex items-center justify-center gap-2 font-medium text-sm group-hover:shadow-[0_0_20px_rgba(212,165,79,0.2)]">
          {linkText} <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  </Link>
);

// --- Visual Components ---
const DynamicsVisual = () => (
  <div className="relative w-full max-w-md aspect-square bg-[#0a0a0a] rounded-xl border border-zinc-800 p-8 shadow-2xl overflow-hidden group">
    <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
      <div className="text-xs font-mono text-zinc-500">
        FIG 1.2: LIQUIDITY SURFACE
      </div>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500/50" />
        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
        <div className="w-2 h-2 rounded-full bg-green-500/50" />
      </div>
    </div>
    <div className="relative h-48 w-full">
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C20,80 40,20 100,20"
          fill="none"
          stroke="#333"
          strokeWidth="1"
        />
        <path
          d="M0,90 C30,90 50,30 100,10"
          fill="none"
          stroke="#333"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <motion.path
          d="M0,100 C30,100 40,40 100,10"
          fill="none"
          stroke="#D4A54F"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  </div>
);
const ZeroKnowledgeVisual = () => (
  <div className="relative w-full max-w-md">
    <div className="space-y-4 font-mono text-xs">
      {["Prover", "Verifier", "Constraint System"].map((role, i) => (
        <div key={i} className="flex items-center gap-4">
          <div className="w-24 text-zinc-500 text-right">{role}</div>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>
      ))}
    </div>
    <div className="mt-8 space-y-3 relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-zinc-800 ml-3" />
      {[
        { text: "Generate Witness", hash: "0x7f...3a" },
        { text: "Compute Polynomial", hash: "P(x)" },
        { text: "Verification Key", hash: "VK_1" },
        { text: "Proof Accepted", hash: "TRUE", active: true },
      ].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className={`flex items-center gap-4 p-3 rounded border ${
            step.active
              ? "bg-[#D4A54F]/10 border-[#D4A54F] text-[#D4A54F]"
              : "bg-black border-zinc-800 text-zinc-400"
          } backdrop-blur-sm relative z-10 ml-6`}
        >
          <div className="w-2 h-2 rounded-full bg-current" />
          <span className="font-mono flex-1">{step.text}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- Main Page Component ---

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#D4A54F]/30 overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#D4A54F] origin-left z-[60]"
        style={{ scaleX }}
      />
      <Navbar />
      <NeuralBackground />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm text-zinc-400 text-sm font-mono tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#D4A54F] animate-pulse"></span>
                RESEARCH PREVIEW: EPOCH 4
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-8">
                PROVABLE <br />
                <span className="font-serif italic text-[#D4A54F]">
                  SYSTEMS
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                Endubis Labs is a distributed research collective architecting
                the infrastructure for sovereign coordination and trustless
                state.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 w-full sm:w-auto rounded-full bg-[#D4A54F] text-black font-bold text-lg hover:bg-[#D4A54F]/90 transition-all">
                  About US
                </button>
                <button className="px-8 py-4 w-full sm:w-auto rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center justify-center gap-2">
                  View Projects <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <div className="border-y border-[#D4A54F]/10 bg-zinc-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Contributors", value: "300+" },
              { label: "Citations", value: "1,240" },
              { label: "Lines of Code", value: "2.4M" },
              { label: "Grants Issued", value: "$5M+" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-light font-mono text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-[#D4A54F] uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- RESEARCH AREA (Theory) --- */}
        <div id="research">
          <ResearchSection
            id="zk"
            number="2"
            subtitle="DECENTRALIZED GOVERNANCE"
            title="Gadaa-Inspired Decentralized Justice Protocol"
            description="An experimental governance initiative that translates the Gadaa democratic cycle into a resilient blockchain-based Decentralized Justice Protocol (DJP), enabling transparent, culturally grounded dispute resolution and community coordination."
            align="right"
            tags={["Governance", "DJP", "Gadaa System", "Decentralization"]}
            imageComponent={<ZeroKnowledgeVisual />}
          />

          <ResearchSection
            id="dynamics"
            number="1"
            subtitle="Exploring Stablecoin Adoption in Ethiopia"
            title="Implementing Stablecoins in Ethiopia"
            description="Analyzing the feasibility, regulatory considerations, and economic potential of introducing stablecoins within the Ethiopian financial ecosystem."
            align="left"
            tags={["Stablecoins", "Digital Payments", "Ethiopia Fintech"]}
            imageComponent={<DynamicsVisual />}
          />

          <ResearchSection
            id="zk"
            number="2"
            subtitle="CRYPTOGRAPHY & DIGITAL TRUST"
            title="Zero-Knowledge Architectures for Ethiopia"
            description="Exploring how zero-knowledge proofs can strengthen digital identity, payments, and data privacy in Ethiopia—enabling secure verification without exposing sensitive information."
            align="right"
            tags={["zk-SNARKs", "Digital Identity", "Privacy Infrastructure"]}
            imageComponent={<ZeroKnowledgeVisual />}
          />
        </div>

        {/* --- PROTOCOLS / IMPLEMENTATIONS GRID (New Links) --- */}
        <section
          id="protocols"
          className="py-32 px-6 bg-[#080808] border-y border-zinc-900"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-light mb-4">
                  Deployed{" "}
                  <span className="text-[#D4A54F]">Implementations</span>
                </h2>
                <p className="text-zinc-400 max-w-xl">
                  Our research doesn't stay in papers. We deploy reference
                  implementations to Mainnet to prove the viability of our
                  models in real-world economic conditions.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-900/20 px-3 py-1 rounded-full border border-green-900">
                <Activity className="w-3 h-3" />
                SYSTEMS OPERATIONAL
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <ProtocolCard
                title="Endubis Finance"
                version="v2.4.1"
                type="Lending Protocol"
                description="A hybrid financial study investigating how blockchyain secured collateral can support fair, affordable fiat lending. YThis project focuses on building resilient fianncial pathway that strengthens local economies and expand credit access for underserved communites"
                stats={[
                  { label: "Total Liquidity", val: "$1.2B" },
                  { label: "Utilization", val: "84%" },
                ]}
                linkUrl="/lending"
                linkText="Access Money Market"
              />

              <ProtocolCard
                title="Gedaa Protocol"
                version="beta-rc3"
                type="Trustless Escrow"
                description="The Gadaa Protocol is an experimental governance initiative investigating the resilience of translating the Gadaa democratic cycle into a resilient blockchain Decentralized Justice Protocol (DJP)"
                stats={[
                  { label: "Testnet", val: "$450M" },
                  { label: "Avg Settlement", val: "12s" },
                ]}
                linkUrl="/escrow"
                linkText="Launch Escrow Console"
              />

              <ProtocolCard
                title="Endubis Wallet"
                version="v1.0.0"
                type="Identity Client"
                description="Endubis Wallet is Ethiopia’s home-grown, semi-custodial crypto wallet focused on onboarding new users onto the web3 space - built by local talent for the needs of users in Africa. Fast, secure, and accessible directly through Telegram, Endubis makes managing digital assets simple and empowering."
                stats={[
                  { label: "Users", val: "2k" },
                  { label: "Chains", val: "3+" },
                ]}
                linkUrl="/wallet"
                linkText="Learn More"
              />
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light mb-4">
                Methodology <span className="text-[#D4A54F]">& Tooling</span>
              </h2>
              <p className="text-zinc-400">
                Rigorous processes for immutable infrastructure.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Microscope,
                  title: "Formal Verification",
                  desc: "Mathematically proving correctness.",
                },
                {
                  icon: Binary,
                  title: "Simulation Engines",
                  desc: "Agent-based modeling.",
                },
                {
                  icon: Network,
                  title: "Interoperability",
                  desc: "Designing communication protocols.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-zinc-900/20 border border-zinc-800 hover:border-[#D4A54F]/30 transition-all group"
                >
                  <item.icon className="w-10 h-10 text-zinc-600 group-hover:text-[#D4A54F] transition-colors mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 bg-[#020202] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Atom className="w-6 h-6 text-[#D4A54F]" />
                <h2 className="text-2xl font-bold font-mono text-white">
                  ENDUBIS
                </h2>
              </div>
              <p className="text-zinc-500 max-w-xs text-sm">
                Advanced Research in
                <br />
                Cryptography & Distributed Systems.
              </p>
            </div>
            <div className="text-zinc-500 text-sm font-mono">
              © 2025 Endubis Labs. Open Source MIT License.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
