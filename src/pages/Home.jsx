import React from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with background photo */}
      <header
        className="relative h-[72vh] flex items-center bg-blue-600"
      >
        <div className="absolute inset-0 bg-[url('/src/images/baiterek.webp')] bg-cover bg-center opacity-100 mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/60 via-blue-600/40 to-white/10" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-white">
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{delay:0.1}} className="heading-font text-4xl md:text-6xl font-extrabold leading-tight">
            Explore Astana with AI-curated
            <br />
            <span className="text-cyan-300">smart routes & local tips</span>
          </motion.h1>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{delay:0.2}} className="mt-4 max-w-2xl text-slate-200">
            Discover walking tours, transit routes, and drive experiences tailored to your preferences. Fast, local-aware, and designed for unforgettable photos.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/videos">
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg">
                Browse Video Guides
              </motion.button>
            </Link>
            <Link to="/">
              <motion.button whileHover={{ scale: 1.03 }} className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium border border-white/10">
                Learn More
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features / Pages grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">Video Guides</h3>
            <p className="text-sm text-slate-300 mb-4">Short, actionable video routes for the city's best photo spots and transit tips.</p>
            <Link to="/videos" className="text-sm font-semibold text-cyan-300">Open Video Guides →</Link>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">Itineraries</h3>
            <p className="text-sm text-slate-300 mb-4">Generate half-day or full-day plans tuned to budget and interests (coming soon).</p>
            <span className="text-sm font-semibold text-slate-400">Planned</span>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">City Insights</h3>
            <p className="text-sm text-slate-300 mb-4">Local tips, transit maps, and the best times to visit top sights.</p>
            <span className="text-sm font-semibold text-slate-400">Info</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
