import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, RefreshCw } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-blue-950/20 bg-[#070b14] py-12 md:py-20">
      {/* Background Decorative Tech Blobs */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/10 px-3 py-1 text-[10px] font-mono tracking-wider text-cyan-400 uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 animate-spin-slow" />
            NIGERIA&apos;S ULTIMATE GADGET DESTINATION
          </motion.div>

          {/* Core Branding Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-3xl"
          >
            Upgrade to the Next Era of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Supercharged Gear
            </span>
          </motion.h2>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base"
          >
            Explore authentic phones, heavy-duty processing laptops, high-fidelity acoustics, and custom custom accessories curated for creators, engineers, and power users.
          </motion.p>

          {/* Call To Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <button
              id="hero-cta-explore"
              onClick={onExploreClick}
              className="group flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-xs font-bold text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.45)]"
            >
              Browse Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              id="hero-secondary-ref"
              href="#store-grid-section"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-[#0a101d] px-6 py-3 text-xs font-medium text-slate-300 transition-all duration-200 hover:border-slate-700 hover:bg-[#0c1425] hover:text-white"
            >
              Recent Arrivals
            </a>
          </motion.div>

          {/* Floating Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-900 pt-8 text-center max-w-lg w-full"
          >
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-5 w-5 text-cyan-500" />
              <span className="mt-1.5 text-xs font-bold text-white">100% Genuine</span>
              <span className="text-[10px] text-slate-500">Official Warranties</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-5 w-5 text-indigo-400" />
              <span className="mt-1.5 text-xs font-bold text-white">Easy Returns</span>
              <span className="text-[10px] text-slate-500">Within 7 Days</span>
            </div>
            <div className="flex flex-col items-center">
              <HeartPulse className="h-5 w-5 text-blue-400" />
              <span className="mt-1.5 text-xs font-bold text-white">Lagos Delivery Ready</span>
              <span className="text-[10px] text-slate-500">Safe Nationwide Escrow</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
