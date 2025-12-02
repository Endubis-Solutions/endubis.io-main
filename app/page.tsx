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
  Zap,
  Lock,
  Wallet,
  ArrowRight,
  ChevronRight,
  Globe,
  Shield,
  TrendingUp,
  Menu,
  X,
  CheckCircle,
} from "lucide-react";

// --- UI Components ---

// 1. Animated Background Mesh
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
    { name: "Lending", href: "/lending" },
    { name: "Escrow", href: "/escrow" },
    { name: "Wallet", href: "/wallet" },
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
          <div className="w-8 h-8  rounded-lg flex items-center justify-center">
            <img
              src="/endubis-logo.png"
              alt="Logo Icon"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4A54F] transition-colors">
            ENDUBIS
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
          <button className="px-5 py-2 rounded-full border border-[#D4A54F]/30 text-[#D4A54F] text-sm font-medium hover:bg-[#D4A54F] hover:text-black transition-all">
            Launch App
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

// 3. Product Preview Card (Interactive 3D Tilt)
const ProductSection = ({
  id,
  title,
  description,
  features,
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
        {/* Content Side */}
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
            <span className="font-mono text-[#D4A54F] bg-[#D4A54F]/10 px-3 py-1 rounded text-sm">
              0{number}
            </span>
            <div className="h-px w-20 bg-[#D4A54F]/30" />
          </div>

          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white">
            {title.split(" ")[0]}{" "}
            <span className="text-[#D4A54F] font-serif italic">
              {title.split(" ")[1]}
            </span>
          </h2>

          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="space-y-4 mb-10">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#D4A54F]" />
                <span className="text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>

          <button className="group flex items-center gap-2 text-white border-b border-[#D4A54F] pb-1 hover:text-[#D4A54F] transition-colors">
            Explore {title.split(" ")[1]}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        {/* Visual Side */}
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

// --- Visual Components for Products ---

const LendingVisual = () => (
  <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-[#1a1a1a] to-black rounded-2xl border border-[#D4A54F]/20 p-8 shadow-2xl group">
    <div className="absolute inset-0 bg-[#D4A54F]/5 rounded-2xl blur-xl group-hover:bg-[#D4A54F]/10 transition-all duration-500" />
    <div className="relative h-full flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="h-2 w-20 bg-zinc-700 rounded" />
          <div className="h-2 w-12 bg-zinc-800 rounded" />
        </div>
        <div className="p-2 bg-[#D4A54F]/20 rounded-full">
          <TrendingUp className="w-6 h-6 text-[#D4A54F]" />
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4A54F] to-transparent" />
            <div className="flex-1 h-2 bg-zinc-700 rounded overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${60 + i * 15}%` }}
                transition={{ duration: 1.5, delay: i * 0.2 }}
                className="h-full bg-[#D4A54F]"
              />
            </div>
            <span className="text-xs text-[#D4A54F] font-mono">
              {12 + i * 2}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-[#D4A54F] text-black text-center font-bold">
        Start Earning
      </div>
    </div>
  </div>
);

const EscrowVisual = () => (
  <div className="relative w-full max-w-md">
    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4A54F]/50 to-transparent -translate-x-1/2" />
    <div className="space-y-6 relative">
      {["Initiate", "Lock Funds", "Verify", "Release"].map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2 }}
          className="flex items-center gap-4 bg-black/80 backdrop-blur border border-[#D4A54F]/20 p-4 rounded-lg relative z-10"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4A54F]/10 border border-[#D4A54F] flex items-center justify-center text-[#D4A54F] font-mono text-xs">
            {i + 1}
          </div>
          <span className="text-zinc-200 font-mono">{step}</span>
          {i === 1 && <Lock className="w-4 h-4 text-[#D4A54F] ml-auto" />}
          {i === 3 && (
            <CheckCircle className="w-4 h-4 text-[#D4A54F] ml-auto" />
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

const WalletVisual = () => (
  <div className="relative w-[280px] h-[550px] bg-black rounded-[3rem] border-8 border-zinc-800 shadow-2xl overflow-hidden">
    <div className="absolute top-0 w-full h-full bg-gradient-to-b from-zinc-900 to-black p-6 flex flex-col">
      <div className="flex justify-between items-center mb-8 mt-6">
        <div className="w-8 h-8 rounded-full bg-zinc-800" />
        <div className="w-20 h-6 bg-zinc-800 rounded-full" />
      </div>
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-white mb-1">$42,069</h3>
        <span className="text-[#D4A54F] text-sm">+5.4% today</span>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl bg-zinc-800/50 flex items-center justify-center hover:bg-[#D4A54F] hover:text-black transition-colors cursor-pointer text-zinc-500"
          >
            <Wallet className="w-5 h-5" />
          </div>
        ))}
      </div>
      <div className="space-y-3 flex-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center px-4 gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#D4A54F]" />
            <div className="space-y-1">
              <div className="w-20 h-2 bg-zinc-700 rounded" />
              <div className="w-12 h-2 bg-zinc-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- Main Page Component ---

export default function EndubisLanding() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-[#D4A54F]/30 overflow-x-hidden">
      {/* Scroll Progress Bar */}
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
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#D4A54F]/30 bg-[#D4A54F]/5 text-[#D4A54F] text-sm font-mono tracking-wide">
                SYSTEM V2.0 IS LIVE
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tighter mb-8">
                FINANCE <br />
                <span className="font-serif italic text-[#D4A54F]">
                  REIMAGINED
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                The integrated infrastructure for the decentralized web. Lend,
                transact, and store assets with military-grade security.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="px-8 py-4 w-full sm:w-auto rounded-full bg-[#D4A54F] text-black font-bold text-lg hover:bg-[#D4A54F]/90 transition-all shadow-[0_0_30px_rgba(212,165,79,0.3)]">
                  Start Building
                </button>
                <button className="px-8 py-4 w-full sm:w-auto rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center justify-center gap-2 group">
                  Read Documentation
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
          >
            <div className="w-px h-12 bg-gradient-to-b from-zinc-500 to-transparent mx-auto mb-2" />
            <span className="text-xs uppercase tracking-widest">Scroll</span>
          </motion.div>
        </section>

        {/* Stats Ticker */}
        <div className="border-y border-[#D4A54F]/10 bg-zinc-900/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "TVL", value: "$2.4B+" },
              { label: "Users", value: "140K+" },
              { label: "Transactions", value: "12M+" },
              { label: "Uptime", value: "99.99%" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl font-bold text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product: Lending */}
        <ProductSection
          id="lending"
          number="1"
          title="Endubis Lending"
          description="Access instant liquidity or earn yield on your assets. Our algorithmic interest rate model ensures optimal efficiency for both lenders and borrowers."
          align="left"
          features={[
            "Automated Market Maker",
            "Flash Loan Support",
            "Dynamic APY Rates",
          ]}
          imageComponent={<LendingVisual />}
        />

        {/* Product: Escrow */}
        <ProductSection
          id="escrow"
          number="2"
          title="Trustless Escrow"
          description="Execute complex agreements without intermediaries. Our smart contracts hold funds securely until verified on-chain conditions are met."
          align="right"
          features={[
            "Multi-sig Authorization",
            "Dispute Resolution",
            "Time-locked Releases",
          ]}
          imageComponent={<EscrowVisual />}
        />

        {/* Product: Wallet */}
        <ProductSection
          id="wallet"
          number="3"
          title="Endubis Wallet"
          description="Your gateway to the decentralized web. A non-custodial wallet that gives you full control over your keys and crypto assets across 50+ chains."
          align="left"
          features={["Biometric Security", "Cross-chain Bridge", "NFT Gallery"]}
          imageComponent={<WalletVisual />}
        />

        {/* Features Grid (Why Endubis) */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-light mb-4">
                Core <span className="text-[#D4A54F]">Infrastructure</span>
              </h2>
              <p className="text-zinc-400">
                Built for scale, security, and speed.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Audited Security",
                  desc: "Contracts verified by CertiK and Trail of Bits.",
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  desc: "Optimized for high-frequency trading and settlements.",
                },
                {
                  icon: Globe,
                  title: "Universal Access",
                  desc: "Permissionless protocol accessible from anywhere.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D4A54F]/30 transition-all"
                >
                  <item.icon className="w-10 h-10 text-[#D4A54F] mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-[#D4A54F]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#D4A54F]/5 pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-serif italic text-[#D4A54F] mb-6">
              Ready to ascend?
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Join the ecosystem defining the future of value transfer.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 bg-[#020202] border-t border-zinc-900">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
              <h2 className="text-2xl font-bold font-mono text-white mb-4">
                ENDUBIS
              </h2>
              <p className="text-zinc-500 max-w-xs">
                Decentralized infrastructure for the modern financial world.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
              <div>
                <h3 className="text-white font-bold mb-4">Platform</h3>
                <ul className="space-y-2 text-zinc-500 text-sm">
                  <li>
                    <a href="#lending" className="hover:text-[#D4A54F]">
                      Lending
                    </a>
                  </li>
                  <li>
                    <a href="#escrow" className="hover:text-[#D4A54F]">
                      Escrow
                    </a>
                  </li>
                  <li>
                    <a href="#wallet" className="hover:text-[#D4A54F]">
                      Wallet
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Governance</h3>
                <ul className="space-y-2 text-zinc-500 text-sm">
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      DAO
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      Tokenomics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      Voting
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Socials</h3>
                <ul className="space-y-2 text-zinc-500 text-sm">
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      Discord
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#D4A54F]">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
            © 2025 Endubis Protocol. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
