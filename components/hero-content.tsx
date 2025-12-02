"use client"

export default function HeroContent() {
  return (
    <div className="text-center my-0 p-0 px-0 py-16 rounded-4xl shadow-none bg-background/85 backdrop-blur-sm border-border border-none border-0">
      <div className="flex items-center justify-center flex-col text-center py-4">
        <div
          className="inline-flex items-center px-3 py-1 rounded-full bg-[#D4A54F]/10 backdrop-blur-sm relative border mb-0 border-[#D4A54F]/30"
          style={{
            filter: "url(#glass-effect)",
          }}
        >
          <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-[#D4A54F]/40 to-transparent rounded-full" />
          <span className="text-[#D4A54F] text-xs md:text-sm relative z-10 font-light">
            Blockchain Finance Infrastructure
          </span>
        </div>
      </div>

      <h1
        id="main-content"
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-light text-foreground mb-6 leading-tight scroll-mt-20"
      >
        <span className="instrument text-[#D4A54F] mx-0 text-center font-normal font-mono">Endubis</span>
        <br />
        <span className="font-light text-foreground tracking-tight">Blockchain Solutions</span>
      </h1>

      <p className="font-light text-muted-foreground mb-8 leading-relaxed max-w-xl mx-auto font-mono tracking-tight text-balance text-xs md:text-sm">
        Experience the future of finance with decentralized lending, secure escrow, and innovative wallet solutions
        powered by blockchain technology.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          className="px-6 py-3 sm:px-8 sm:py-3 rounded-full bg-[#D4A54F] text-black font-medium transition-all duration-200 hover:bg-[#D4A54F]/90 focus:bg-[#D4A54F]/90 focus:outline-none focus:ring-2 focus:ring-[#D4A54F] focus:ring-offset-2 focus:ring-offset-background cursor-pointer tracking-tighter font-sans text-base min-h-[44px] touch-manipulation"
          style={{ WebkitTapHighlightColor: "rgba(212, 165, 79, 0.1)" }}
          aria-label="Explore Endubis Blockchain Solutions"
        >
          Explore Solutions
        </button>
      </div>
    </div>
  )
}
