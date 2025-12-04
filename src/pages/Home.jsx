import React from "react"; 
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Hero with background photo */}
      <header className="relative h-[72vh] flex items-center bg-blue-600">
        <div className="absolute inset-0 bg-[url('/src/images/baiterek.webp')] bg-cover bg-center opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-700/60 via-blue-600/40 to-white/10" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-white">

          {/* --- LOGIN + REGISTER BUTTONS (Top Right) --- */}
          <div className="absolute right-6 top-6 flex gap-3">
            <Link to="/login">
              <button className="px-4 py-2 text-sm rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition backdrop-blur-md">
                {t('auth.login', 'Login')}
              </button>
            </Link>

            <Link to="/register">
              <button className="px-4 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-medium shadow-lg hover:scale-[1.03] active:scale-100 transition">
                {t('auth.register', 'Register')}
              </button>
            </Link>
          </div>

          {/* --- HERO TEXT --- */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="heading-font text-4xl md:text-6xl font-extrabold leading-tight"
          >
            {t('hero.title', 'Explore Astana with AI-curated')}
            <br />
            <span className="text-cyan-300">{t('hero.subtitle', 'smart routes & local tips')}</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl text-slate-200"
          >
            {t(
              'hero.description',
              'Discover walking tours, transit routes, and drive experiences tailored to your preferences. Fast, local-aware, and designed for unforgettable photos.'
            )}
          </motion.p>

          {/* --- CTAS --- */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/videos">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg"
              >
                {t('hero.browseVideos', 'Browse Video Guides')}
              </motion.button>
            </Link>

            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="px-6 py-3 rounded-lg bg-white/10 text-white font-medium border border-white/10"
              >
                {t('hero.getStarted', 'Join the Collective')}
              </motion.button>
            </Link>
          </div>

        </div>
      </header>

      {/* Features / Pages grid */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">{t('features.videoGuides', 'Video Guides')}</h3>
            <p className="text-sm text-slate-300 mb-4">
              {t('features.videoGuidesDesc', "Short, actionable video routes for the city's best photo spots and transit tips.")}
            </p>
            <Link to="/videos" className="text-sm font-semibold text-cyan-300">{t('features.open', 'Open Video Guides →')}</Link>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">{t('features.itineraries', 'Itineraries')}</h3>
            <p className="text-sm text-slate-300 mb-4">
              {t('features.itinerariesDesc', 'Generate half-day or full-day plans tuned to budget and interests (coming soon).')}
            </p>
            <span className="text-sm font-semibold text-slate-400">{t('features.planned', 'Planned')}</span>
          </motion.div>

          <motion.div whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">{t('features.cityInsights', 'City Insights')}</h3>
            <p className="text-sm text-slate-300 mb-4">
              {t('features.cityInsightsDesc', 'Local tips, transit maps, and the best times to visit top sights.')}
            </p>
            <span className="text-sm font-semibold text-slate-400">{t('features.info', 'Info')}</span>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
