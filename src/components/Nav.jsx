import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white/5 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold shadow">
            AI
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-bold">Astana AI Trips</div>
            <div className="text-xs text-slate-300">Smart guides & itineraries</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            Home
          </Link>
          <Link
            to="/videos"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/videos' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            Video Guides
          </Link>
          <Link
            to="/itineraries"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/itineraries' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            Itineraries
          </Link>
          <Link
            to="/insights"
            className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === '/insights' ? 'bg-blue-600 text-white' : 'text-slate-200 hover:bg-white/5'}`}
          >
            City Insights
          </Link>
        </div>
      </div>
    </nav>
  );
}
