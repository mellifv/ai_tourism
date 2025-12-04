import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext'; // ← Add this import
import LanguageSelector from './LanguageSelector';

export default function Nav() {
  const { t } = useLanguage();
  const location = useLocation();
  const { user, logout } = useAuth(); // ← Add this hook

  return (
    <nav className="w-full bg-white/5 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">
            AI
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold">{t('header.title', 'Astana AI Trips')}</div>
            <div className="text-xs text-slate-300">{t('header.subtitle', 'Smart guides & itineraries')}</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            {t('nav.home', 'Home')}
          </Link>
          <Link
            to="/videos"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/videos' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            {t('nav.videoGuides', 'Video Guides')}
          </Link>
          <Link
            to="/itineraries"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/itineraries' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            {t('nav.itineraries', 'Itineraries')}
          </Link>
          <Link
            to="/insights"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/insights' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            {t('nav.cityInsights', 'City Insights')}
          </Link>
          
          {/* Auth Section */}
          <div className="flex items-center gap-2 ml-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 text-white transition"
                >
                  {t('nav.login', 'Login')}
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm rounded-md bg-white hover:bg-slate-100 text-blue-600 transition"
                >
                  {t('nav.register', 'Register')}
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-200">
                  {t('nav.welcome', 'Hi')} {user?.email?.split('@')[0] || 'User'} {/* ← Optional chaining */}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-1.5 text-sm rounded-md bg-rose-600 hover:bg-rose-700 text-white transition"
                >
                  {t('nav.logout', 'Logout')}
                </button>
              </div>
            )}
          </div>
          
          {/* LanguageSelector */}
          <LanguageSelector />
        </div>
      </div>
    </nav>
  );
}
