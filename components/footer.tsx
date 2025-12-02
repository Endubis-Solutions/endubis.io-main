"use client"

import { WaterShaderBackground } from "@/components/ui/water-shader-background"

export function Footer() {
  return (
    <footer className="relative border-t border-border overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <WaterShaderBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 text-center relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-8xl select-none md:text-9xl font-mono tracking-[-0.1em] text-[#D4A54F] font-light">
            ENDUBIS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 text-sm">
          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Products</h3>
            <div className="space-y-2">
              <a href="#lending" className="block text-muted-foreground hover:text-[#D4A54F] transition-colors">
                Lending
              </a>
              <a href="#escrow" className="block text-muted-foreground hover:text-[#D4A54F] transition-colors">
                Escrow
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Resources</h3>
            <div className="space-y-2">
              <a
                href="https://github.com"
                className="block text-muted-foreground hover:text-[#D4A54F] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://docs.example.com"
                className="block text-muted-foreground hover:text-[#D4A54F] transition-colors"
              >
                Documentation
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Community</h3>
            <div className="space-y-2">
              <a
                href="https://discord.com"
                className="block text-muted-foreground hover:text-[#D4A54F] transition-colors"
              >
                Discord
              </a>
              <a
                href="https://twitter.com"
                className="block text-muted-foreground hover:text-[#D4A54F] transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Legal</h3>
            <div className="space-y-2">
              <a href="/privacy" className="block text-muted-foreground hover:text-[#D4A54F] transition-colors">
                Privacy
              </a>
              <a href="/terms" className="block text-muted-foreground hover:text-[#D4A54F] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">© 2025 Endubis. Blockchain Solutions for Modern Finance.</p>
        </div>
      </div>
    </footer>
  )
}
