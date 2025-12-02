"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Zap, Lock, Wallet } from "lucide-react"

export function ProductsGrid() {
  const products = [
    {
      id: "lending",
      title: "Endubis Lending",
      description: "Access DeFi lending with competitive rates and secure smart contract protection.",
      icon: Zap,
      color: "#D4A54F",
      gradient: "from-[#D4A54F]/20 to-transparent",
      href: "/lending",
    },
    {
      id: "escrow",
      title: "Endubis Escrow",
      description: "Transparent, trustless transactions with decentralized escrow for secure payments.",
      icon: Lock,
      color: "#D4A54F",
      gradient: "from-[#D4A54F]/20 to-transparent",
      href: "/escrow",
    },
    {
      id: "wallet",
      title: "Endubis Wallet",
      description: "Self-custody blockchain wallet with advanced security and multi-chain support.",
      icon: Wallet,
      color: "#D4A54F",
      gradient: "from-[#D4A54F]/20 to-transparent",
      href: "/wallet",
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {products.map((product, index) => {
        const Icon = product.icon
        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href={product.href}>
              <motion.div
                className="group relative h-full border border-[#D4A54F]/30 rounded-lg p-8 bg-gradient-to-br backdrop-blur-sm hover:border-[#D4A54F]/60 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(212, 165, 79, 0.05) 0%, transparent 100%)`,
                }}
                whileHover={{ y: -4 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-[#D4A54F]/10 to-transparent rounded-br-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#D4A54F]/10 to-transparent rounded-tl-full blur-3xl" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-[#D4A54F]/10 border border-[#D4A54F]/30">
                      <Icon className="w-6 h-6 text-[#D4A54F]" />
                    </div>
                    <span className="text-sm text-[#D4A54F]/60 font-mono">0{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-mono text-foreground mb-3 group-hover:text-[#D4A54F] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{product.description}</p>

                  <div className="mt-6 flex items-center gap-2 text-[#D4A54F] opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                    <span className="text-sm font-medium">Explore</span>
                    <span className="text-lg">→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
