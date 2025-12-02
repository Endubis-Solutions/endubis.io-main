"use client"

import type React from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface FeatureSectionProps {
  title: string
  description: string
  icon?: React.ReactNode
  delay?: number
  index?: number
  metric?: string
  metricLabel?: string
}

export function FeatureSection({ title, description, index = 0 }: FeatureSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [40, 0, 0, -40])

  return (
    <motion.div ref={ref} className="w-full" style={{ opacity, y }}>
      <div className="border border-[#D4A54F]/30 rounded-lg p-8 bg-gradient-to-br from-[#D4A54F]/5 to-transparent hover:border-[#D4A54F]/60 transition-all duration-300 group cursor-pointer">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-xl font-mono text-foreground group-hover:text-[#D4A54F] transition-colors">{title}</h3>
          <span className="text-sm text-[#D4A54F]/60 font-mono bg-[#D4A54F]/10 px-3 py-1 rounded-full">
            0{index + 1}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}
