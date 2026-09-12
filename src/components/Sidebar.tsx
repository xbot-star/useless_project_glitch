import React from 'react';
import { Home, Globe, Heart, Briefcase, Moon, Sparkles, Gavel, Newspaper, Users } from 'lucide-react';
import type { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onOpenUpload: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, onOpenUpload }) => {
  const bgStyle = 'bg-[#fcfbf7] text-[#1a1a1a] border-[#b8860b]/30';

  const getItemClass = (mode: ViewMode) => {
    const isActive = currentView === mode;
    if (isActive) {
      if (mode === 'matrimony') return 'bg-rose-50 text-rose-800 font-bold border-r-4 border-rose-600 shadow-sm';
      if (mode === 'linkedin') return 'bg-blue-50 text-blue-800 font-bold border-r-4 border-blue-600 shadow-sm';
      if (mode === 'astro' || mode === 'porutham') return 'bg-indigo-50 text-indigo-800 font-bold border-r-4 border-indigo-600 shadow-sm';
      if (mode === 'thing-court') return 'bg-amber-50 text-amber-800 font-bold border-r-4 border-amber-600 shadow-sm';
      if (mode === 'family') return 'bg-emerald-50 text-emerald-800 font-bold border-r-4 border-emerald-600 shadow-sm';
      if (mode === 'thing-news') return 'bg-rose-50 text-rose-800 font-bold border-r-4 border-rose-600 shadow-sm';
      return 'bg-[#f5e6a3]/50 text-[#8c6512] font-bold border-r-4 border-[#d4af37] shadow-sm';
    }
    return 'text-[#4a4a4a] hover:text-[#0f0f0f] hover:bg-[#f3efe6]';
  };

  return (
    <aside className={`w-64 flex-shrink-0 min-h-[calc(100vh-4rem)] border-r flex flex-col justify-between p-4 transition-colors duration-300 ${bgStyle}`}>
      
      <div className="space-y-6">
        {/* Quick CTA */}
        <button
          onClick={onOpenUpload}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#b8860b] text-[#1a1a1a] font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-amber-500/15 hover:scale-105 active:scale-95 transition-all border border-[#b8860b]/40"
        >
          <Sparkles className="w-4 h-4 fill-[#1a1a1a]" />
          <span>JEEVIFY A NEW THING</span>
        </button>

        {/* Core Nav */}
        <div className="space-y-1">
          <button
            onClick={() => onNavigate('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('landing')}`}
          >
            <Home className="w-4 h-4" />
            <span>Home Portal</span>
          </button>

          <button
            onClick={() => onNavigate('my-world')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('my-world')}`}
          >
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>My Thing's World</span>
          </button>
        </div>

        {/* THE WORLD OF THINGS SECTION */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
            WORLD OF THINGS
          </p>

          <button
            onClick={() => onNavigate('matrimony')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('matrimony')}`}
          >
            <Heart className="w-4 h-4 text-rose-400" />
            <span>Matrimony Things</span>
          </button>

          <button
            onClick={() => onNavigate('linkedin')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('linkedin')}`}
          >
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span>LinkedIn Things</span>
          </button>

          <button
            onClick={() => onNavigate('astro')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('astro')}`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span>Astro Things</span>
          </button>

          <button
            onClick={() => onNavigate('thing-court')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('thing-court')}`}
          >
            <Gavel className="w-4 h-4 text-amber-400" />
            <span>Thing Court</span>
          </button>

          <button
            onClick={() => onNavigate('family')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('family')}`}
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Family Tree</span>
          </button>

          <button
            onClick={() => onNavigate('thing-news')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${getItemClass('thing-news')}`}
          >
            <Newspaper className="w-4 h-4 text-rose-400" />
            <span>Thing News (TNN)</span>
          </button>
        </div>

      </div>

      {/* Footer message */}
      <div className="mt-8 pt-4 border-t border-white/10 text-center">
        <p className="text-[11px] text-slate-400 font-serif italic">
          "The world where non-living items live."
        </p>
        <p className="text-[10px] text-cyan-400 font-bold tracking-widest uppercase mt-1 font-mono">
          JEEVIFY
        </p>
      </div>

    </aside>
  );
};
