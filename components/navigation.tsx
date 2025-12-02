import { motion } from "framer-motion";
import { Link, X, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
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
