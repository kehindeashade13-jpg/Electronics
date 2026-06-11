import { motion } from "motion/react";
import { Sparkles, ArrowRight, ShieldCheck, HeartPulse, RefreshCw } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
}

export default function Hero({ onExploreClick }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-[#fbfbf8] py-12 md:py-20">
      {/* Background Decorative Tech Blobs */}
      <div className="absolute top-1/2 left-1/4 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="absolute top-1/4 right-1/4 -z-10 h-60 w-60 rounded-full bg-yellow-400/10 blur-3xl animate-pulse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Tag Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-950 px-4 py-1.5 text-[10px] font-mono tracking-wider text-yellow-400 uppercase shadow-md border border-slate-900"
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-450" />
            NIGERIA&apos;S ULTIMATE GADGET DESTINATION
          </motion.div>

          {/* Core Branding Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl max-w-3xl"
          >
            Upgrade to the Next Era of{" "}
            <span className="bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Supercharged Gear
            </span>
          </motion.h2>

          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 max-w-xl text-sm leading-relaxed text-slate-550 sm:text-base font-semibold text-slate-600"
          >
            Explore authentic phones, heavy-duty processing laptops, high-fidelity acoustics, and custom accessories curated for creators, engineers, and power users.
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
              className="group flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-black shadow hover:bg-slate-950 hover:text-white transition-all duration-300"
            >
              Browse Catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            
            <a
              id="hero-secondary-ref"
              href="#store-grid-section"
              className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-700 hover:border-amber-400 hover:text-slate-900 shadow-sm transition-all duration-200"
            >
              Recent Arrivals
            </a>
          </motion.div>

          {/* Floating Trust stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8 text-center max-w-lg w-full"
          >
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-5 w-5 text-amber-550 text-amber-500" />
              <span className="mt-1.5 text-xs font-extrabold text-slate-900">100% Genuine</span>
              <span className="text-[10px] text-slate-500 font-medium">Official Warranties</span>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-5 w-5 text-amber-550 text-amber-500" />
              <span className="mt-1.5 text-xs font-extrabold text-slate-900">Easy Returns</span>
              <span className="text-[10px] text-slate-500 font-medium">Within 7 Days</span>
            </div>
            <div className="flex flex-col items-center">
              <HeartPulse className="h-5 w-5 text-amber-550 text-amber-500" />
              <span className="mt-1.5 text-xs font-extrabold text-slate-900 font-extrabold">Lagos Delivery Ready</span>
              <span className="text-[10px] text-slate-500 font-medium">Safe Nationwide Escrow</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
