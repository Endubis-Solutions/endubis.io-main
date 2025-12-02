"use client";

import { useState, useRef } from "react";
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
  TrendingUp,
  Shield,
  Zap,
  DollarSign,
  ArrowRight,
  Globe,
  Lock,
  Activity,
  ChevronDown,
} from "lucide-react";

// --- Components ---

// 1. 3D Animated Laptop Component
const LaptopDisplay = () => {
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
        {/* Laptop Lid */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative bg-[#1a1a1a] rounded-t-2xl p-2 border border-[#D4A54F]/20 shadow-2xl origin-bottom transition-transform duration-500"
        >
          {/* Camera Dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-700" />

          {/* Screen Border */}
          <div className="bg-black rounded-lg overflow-hidden border border-[#D4A54F]/10 relative aspect-[16/10]">
            {/* Screen Content - Replaced static image with a simulated dashboard if image fails, or use your image */}
            <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center overflow-hidden">
              <img
                src="/lending-platform-dashboard-with-charts-and-analyti.jpg"
                alt="Dashboard"
                className="w-full h-full object-cover opacity-90"
                onError={(e) => {
                  // Fallback visual if image missing
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* Fallback Overlay UI (Visible if image doesn't load or as overlay) */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A54F]/5 to-transparent pointer-events-none mix-blend-overlay" />

              {/* Animated Elements on Screen */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-10 left-10 w-48 h-32 bg-[#D4A54F]/10 backdrop-blur-md rounded-lg border border-[#D4A54F]/30 p-4"
              >
                <div className="h-2 w-12 bg-[#D4A54F] rounded mb-2" />
                <div className="h-8 w-24 bg-[#D4A54F]/20 rounded mb-4" />
                <div className="h-1 w-full bg-[#D4A54F]/10 rounded" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Laptop Base */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="relative h-4 bg-[#2a2a2a] rounded-b-xl -mt-1 mx-4 shadow-[0_20px_50px_-10px_rgba(212,165,79,0.3)] border-t border-zinc-700"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-zinc-800 rounded-b-md" />
        </motion.div>
      </motion.div>
    </div>
  );
};

// 2. Glowing Feature Card
const FeatureCard = ({ icon: Icon, title, description, index }) => {
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
      className="group relative border border-[#D4A54F]/10 bg-black/40 backdrop-blur-sm rounded-xl p-8 overflow-hidden"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(212, 165, 79, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        <div className="p-3 w-fit rounded-lg bg-gradient-to-br from-[#D4A54F]/20 to-transparent border border-[#D4A54F]/20 mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-[#D4A54F]" />
        </div>
        <h4 className="text-xl font-medium text-white mb-2">{title}</h4>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// 3. FAQ Accordion Item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#D4A54F]/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-[#D4A54F] transition-colors"
      >
        <span className="text-lg font-medium text-zinc-200">{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-zinc-400 leading-relaxed max-w-2xl">{answer}</p>
      </motion.div>
    </div>
  );
};

// --- Main Page ---

export default function LendingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#D4A54F]/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#D4A54F]/5 blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-[#D4A54F]/5 blur-[100px]" />
      </div>

      {/*  */}

      <main className="relative z-10 pt-32 pb-20">
        {/* Hero Section */}
        <section className="px-6 mb-20 lg:mb-32">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#D4A54F]/10 border border-[#D4A54F]/20 text-[#D4A54F] text-sm font-medium mb-8">
                DeFi Protocol V2 is Live 🚀
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 tracking-tight">
                Lending{" "}
                <span className="font-serif italic text-[#D4A54F]">
                  Reimagined
                </span>
                <br />
                For The Future
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
                Liquidity without boundaries. Access instant capital or earn
                market-leading yields through our automated, audited smart
                contract protocol.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <button className="px-8 py-4 rounded-full bg-[#D4A54F] text-black font-bold text-lg hover:bg-[#D4A54F]/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,165,79,0.4)]">
                  Launch App
                </button>
                <button className="px-8 py-4 rounded-full border border-zinc-700 text-zinc-300 font-medium text-lg hover:border-[#D4A54F] hover:text-[#D4A54F] transition-all flex items-center gap-2 group">
                  Read Whitepaper
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Laptop Animation */}
            <div className="mt-20">
              <LaptopDisplay />
            </div>
          </div>
        </section>

        {/* Stats Ticker */}
        <section className="border-y border-[#D4A54F]/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Total Value Locked", value: "$2.4B+", icon: Lock },
                { label: "APY up to", value: "18.5%", icon: TrendingUp },
                { label: "Unique Lenders", value: "47k+", icon: Shield },
                { label: "Supported Assets", value: "24", icon: Zap },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-zinc-500 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-5xl font-light mb-6">
                  Why Choose <span className="text-[#D4A54F]">Endubis?</span>
                </h3>
                <p className="text-zinc-400 text-lg">
                  Built on advanced cryptography and automated market maker
                  principles to ensure solvency and efficiency.
                </p>
              </div>
              <Link
                href="/features"
                className="text-[#D4A54F] hover:text-white transition-colors flex items-center gap-2 pb-2 border-b border-[#D4A54F]/30 hover:border-[#D4A54F]"
              >
                View Full Documentation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Bank-Grade Security",
                  description:
                    "Triple-audited smart contracts with real-time threat monitoring and multi-sig insurance funds.",
                },
                {
                  icon: TrendingUp,
                  title: "Dynamic Interest",
                  description:
                    "Algorithmic interest rate model that adjusts automatically based on pool utilization rates.",
                },
                {
                  icon: Zap,
                  title: "Flash Loans",
                  description:
                    "Access uncollateralized liquidity for arbitrage, refinancing, or liquidations in a single transaction.",
                },
                {
                  icon: DollarSign,
                  title: "Multi-Collateral",
                  description:
                    "Borrow against a basket of assets simultaneously to maximize your capital efficiency.",
                },
                {
                  icon: Globe,
                  title: "Cross-Chain",
                  description:
                    "Seamlessly move assets across Ethereum, Polygon, and Arbitrum through our integrated bridge.",
                },
                {
                  icon: Activity,
                  title: "Real-Time Analytics",
                  description:
                    "Professional grade dashboard to track your health factor, APY, and liquidation thresholds.",
                },
              ].map((feature, idx) => (
                <FeatureCard key={idx} index={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Horizontal Steps */}
        <section className="py-24 px-6 bg-[#D4A54F]/[0.02] border-t border-[#D4A54F]/10">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-4xl font-light mb-16 text-center">
              Protocol <span className="text-[#D4A54F]">Mechanics</span>
            </h3>

            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D4A54F]/30 to-transparent" />

              {[
                { title: "Connect", desc: "Link your Web3 wallet securely." },
                {
                  title: "Deposit",
                  desc: "Supply assets to the liquidity pool.",
                },
                {
                  title: "Receive",
                  desc: "Get interest-bearing aTokens instantly.",
                },
                { title: "Earn", desc: "Watch your balance grow every block." },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#050505] border-2 border-[#D4A54F] flex items-center justify-center z-10 mb-6 shadow-[0_0_20px_rgba(212,165,79,0.2)]">
                    <span className="text-xl font-bold text-[#D4A54F]">
                      {i + 1}
                    </span>
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-zinc-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-light mb-12">
              Frequently Asked <span className="text-[#D4A54F]">Questions</span>
            </h3>
            <div className="space-y-2">
              <FAQItem
                question="Is there a lock-up period for my deposits?"
                answer="No. You can withdraw your deposited assets at any time, provided there is sufficient liquidity in the protocol. You earn interest for every block your assets are supplied."
              />
              <FAQItem
                question="How are interest rates determined?"
                answer="Interest rates are dynamic and determined algorithmically by supply and demand. When demand for borrowing is high, rates increase to incentivize more deposits."
              />
              <FAQItem
                question="What happens if my health factor drops?"
                answer="If your health factor drops below 1.0, your collateral may be liquidated to repay part of your loan and ensure protocol solvency. We recommend maintaining a health factor above 2.0."
              />
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="py-32 px-6 border-t border-[#D4A54F]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4A54F]/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-serif italic mb-6 text-[#D4A54F]">
              Start earning today
            </h2>
            <p className="text-xl text-zinc-400 mb-10">
              Join the fastest growing lending protocol on the market.
            </p>
            <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-zinc-200 transition-colors">
              Launch App
            </button>
          </div>
        </section>

        {/* Footer Links */}
        <footer className="py-12 px-6 border-t border-zinc-900 text-zinc-500 text-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p>© 2024 Endubis Protocol. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-[#D4A54F]">
                Terms
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Privacy
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Governance
              </Link>
              <Link href="#" className="hover:text-[#D4A54F]">
                Discord
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
