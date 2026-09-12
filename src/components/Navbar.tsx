import React from 'react';
import { Orbit, Sparkles, Search, Heart, Briefcase, Moon } from 'lucide-react';
import type { JeevifyIdentity, ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  activeIdentity: JeevifyIdentity;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  activeIdentity,
  onOpenUpload,
}) => {
  // Theme-aware navbar styles based on active view
  const isMatrimony = currentView === 'matrimony';
  const isLinkedIn = currentView === 'linkedin';
  const isAstro = currentView === 'astro' || currentView === 'porutham';

  const navBgClass = 'bg-[#fcfbf7]/95 text-[#1a1a1a] border-[#b8860b]/30 backdrop-blur-md shadow-sm';

  return (
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 ${navBgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#d4af37] via-[#f5e6a3] to-[#b8860b] p-[1px] shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#1a1a1a] rounded-[11px] flex items-center justify-center">
                <Orbit className="w-5 h-5 text-[#f5e6a3] animate-spin-slow" />
              </div>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider font-outfit uppercase text-gold-gradient">
                JEEVIFY
              </span>
              <span className="block text-[10px] text-[#8c6512] tracking-widest font-bold uppercase -mt-1">
                Living Things Universe
              </span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-[#b8860b]/20">
            <button
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'landing'
                  ? 'bg-[#f5e6a3]/60 text-[#8c6512] border border-[#d4af37]'
                  : 'text-[#3a3a3a] hover:text-[#0f0f0f]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => onNavigate('my-world')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'my-world'
                  ? 'bg-[#f5e6a3]/60 text-[#8c6512] border border-[#d4af37]'
                  : 'text-[#3a3a3a] hover:text-[#0f0f0f]'
              }`}
            >
              My World
            </button>

            <button
              onClick={() => onNavigate('my-identity')}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                currentView === 'my-identity'
                  ? 'bg-[#f5e6a3]/60 text-[#8c6512] border border-[#d4af37]'
                  : 'text-[#3a3a3a] hover:text-[#0f0f0f]'
              }`}
            >
              My Identity
            </button>

            {/* Quick World Switchers */}
            <button
              onClick={() => onNavigate('matrimony')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isMatrimony
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              Matrimony Things
            </button>

            <button
              onClick={() => onNavigate('linkedin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isLinkedIn
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-blue-700 hover:bg-blue-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              LinkedIn Things
            </button>

            <button
              onClick={() => onNavigate('astro')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAstro
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              Astro Things
            </button>
          </nav>
        </div>

        {/* Center: Search input */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs relative">
          <Search className="w-4 h-4 absolute left-3 text-[#8c6512] pointer-events-none" />
          <input
            type="text"
            placeholder="Search objects, identities..."
            className="w-full bg-white border border-[#b8860b]/30 rounded-full py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:border-[#d4af37] text-[#1a1a1a] placeholder-[#8a8a8a] shadow-sm"
          />
        </div>

        {/* Right: Primary Action & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#b8860b] text-[#1a1a1a] flex items-center gap-1.5 shadow-md shadow-amber-500/15 hover:scale-105 transition-all duration-200 border border-[#b8860b]/40"
          >
            <Sparkles className="w-4 h-4 fill-[#1a1a1a]" />
            <span>LET'S JEEVIFY</span>
          </button>

          {/* Active Identity Badge */}
          <button
            onClick={() => onNavigate('my-identity')}
            className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white hover:bg-[#f8f6f0] border border-[#b8860b]/30 transition-all shadow-sm group"
          >
            <img
              src={activeIdentity.imageUrl}
              alt={activeIdentity.humanName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#d4af37] group-hover:scale-105 transition-transform"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight text-[#1a1a1a] group-hover:text-[#8c6512]">
                {activeIdentity.humanName}
              </p>
              <p className="text-[10px] text-[#8c6512] leading-tight font-semibold">
                {activeIdentity.objectType}
              </p>
            </div>
          </button>
        </div>

      </div>
    </header>
  );
};

