"use client"

import { motion } from "motion/react"
import Link from "next/link"

export function BlockchainHero() {
  return (
    <section className="pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4A54F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D4A54F]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4A54F]/10 border border-[#D4A54F]/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D4A54F] animate-pulse" />
            <span className="text-[#D4A54F] text-sm font-medium">Next-Gen Blockchain Finance</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-8 text-foreground tracking-tight">
            <span className="text-[#D4A54F] block">Endubis</span>
            <span>Blockchain Solutions</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Unlock the future of finance with decentralized lending, trustless escrow, and secure wallet solutions built
            on blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/lending">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212, 165, 79, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-[#D4A54F] text-black font-medium transition-all duration-200 hover:bg-[#D4A54F]/90"
              >
                Explore Solutions
              </motion.button>
            </Link>
            <Link href="/wallet">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full border-2 border-[#D4A54F]/50 text-[#D4A54F] font-medium hover:border-[#D4A54F] transition-colors"
              >
                Get Wallet
              </motion.button>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-[#D4A54F]/20"
          >
            {[
              { label: "TVL", value: "$2.4B+" },
              { label: "Active Users", value: "50K+" },
              { label: "Transactions", value: "1M+" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-[#D4A54F] text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
