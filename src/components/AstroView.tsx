import React, { useState } from 'react';
import { Moon, Sparkles, Compass, Heart, Flame, Zap, MapPin, Orbit } from 'lucide-react';
import type { JeevifyIdentity, MatrimonyMatch } from '../types';
import { PoruthamScanner } from './PoruthamScanner';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface AstroViewProps {
  activeIdentity?: JeevifyIdentity | null;
  preselectedMatchForPorutham?: MatrimonyMatch | null;
}

export const AstroView: React.FC<AstroViewProps> = ({ activeIdentity: rawIdentity, preselectedMatchForPorutham }) => {
  const activeIdentity = ensureCompleteIdentity(rawIdentity);
  const [showPorutham, setShowPorutham] = useState(!!preselectedMatchForPorutham);
  const [selectedConstellationNode, setSelectedConstellationNode] = useState<string | null>(null);

  if (showPorutham) {
    return (
      <PoruthamScanner
        activeIdentity={activeIdentity}
        preselectedPartner={preselectedMatchForPorutham}
        onBack={() => setShowPorutham(false)}
      />
    );
  }

  const astro = activeIdentity.astro;

  const cosmicNodes = [
    { id: 'planet', label: 'Ruling Planet', val: astro?.planet || 'Mercury (Budha)', icon: '🪐', desc: 'Governs logic, rapid energy, and daily desk presence.' },
    { id: 'element', label: 'Primary Element', val: astro?.element || 'Metal & Silicon', icon: '⚡', desc: 'Conducts focus, resilience under pressure, and heat endurance.' },
    { id: 'trait', label: 'Cosmic Trait', val: astro?.cosmicTrait || 'Chronically Grounded', icon: '✨', desc: 'Maintains unshakeable focus even amidst household chaos.' },
    { id: 'env', label: 'Lucky Realm', val: astro?.luckyEnvironment || 'Clean Wooden Desk', icon: '🌌', desc: 'Harmonizes best in warm, dust-free organized environments.' }
  ];

  return (
    <div className="bg-[#070a14] text-slate-100 min-h-[calc(100vh-4rem)] p-4 sm:p-8 rounded-3xl space-y-8 animate-fade-in font-sans-body shadow-2xl border border-indigo-900/40 relative overflow-hidden">
      
      {/* Background Starlight Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-indigo-900/40 pb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-amber-300 shadow-xl shadow-indigo-950">
            <Moon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-heading text-white">
              Astro Things
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/70 font-serif">
              YOUR THING HAS A DESTINY.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowPorutham(true)}
          className="px-5 py-2.5 rounded-full font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-95 transition-all text-xs flex items-center gap-2"
        >
          <Heart className="w-4 h-4 fill-slate-950" />
          <span>CHECK PORUTHAM</span>
        </button>
      </div>

      {/* NEW WOW FEATURE: COSMIC MAP CONSTELLATION VISUALIZATION (Section 30) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0c1228] via-[#090d1f] to-[#070a14] border border-indigo-800/50 shadow-2xl space-y-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 font-outfit flex items-center gap-1.5">
            <Orbit className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>COSMIC MAP & CONSTELLATION</span>
          </span>
          <span className="text-[10px] text-indigo-300 font-mono">UNIVERSE 1 CONSTELLATION NODE</span>
        </div>

        {/* Constellation Orbit Graphic */}
        <div className="relative h-64 sm:h-80 w-full rounded-2xl bg-slate-950/70 border border-indigo-900/60 flex items-center justify-center overflow-hidden">
          
          {/* Orbital Rings */}
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full border border-indigo-500/20 animate-spin-slow" />
          <div className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full border border-amber-400/20 animate-pulse" />

          {/* Central Star: The Object */}
          <div className="relative z-10 text-center space-y-2 group cursor-pointer">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-indigo-500 to-amber-300 shadow-2xl shadow-amber-400/30 mx-auto">
              <img
                src={activeIdentity.imageUrl}
                alt={activeIdentity.humanName}
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="text-xs font-bold text-amber-300 font-outfit">{activeIdentity.humanName}</p>
          </div>

          {/* Orbiting Constellation Nodes */}
          <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none">
            <div className="flex justify-between">
              {cosmicNodes.slice(0, 2).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedConstellationNode(node.id)}
                  className={`pointer-events-auto p-3 rounded-2xl bg-indigo-950/80 border text-left transition-all ${
                    selectedConstellationNode === node.id
                      ? 'border-amber-400 text-amber-300 shadow-lg shadow-amber-400/20'
                      : 'border-indigo-800 text-slate-300 hover:border-indigo-600'
                  }`}
                >
                  <span className="text-lg">{node.icon}</span>
                  <p className="text-[10px] uppercase font-bold text-indigo-400">{node.label}</p>
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">{node.val}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              {cosmicNodes.slice(2, 4).map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedConstellationNode(node.id)}
                  className={`pointer-events-auto p-3 rounded-2xl bg-indigo-950/80 border text-left transition-all ${
                    selectedConstellationNode === node.id
                      ? 'border-amber-400 text-amber-300 shadow-lg shadow-amber-400/20'
                      : 'border-indigo-800 text-slate-300 hover:border-indigo-600'
                  }`}
                >
                  <span className="text-lg">{node.icon}</span>
                  <p className="text-[10px] uppercase font-bold text-indigo-400">{node.label}</p>
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">{node.val}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Selected Constellation Explanation Banner */}
        {selectedConstellationNode && (
          <div className="p-4 rounded-2xl bg-indigo-950/60 border border-amber-400/30 text-xs text-amber-200 font-serif italic animate-fade-in">
            💡 {cosmicNodes.find(n => n.id === selectedConstellationNode)?.label}: "{cosmicNodes.find(n => n.id === selectedConstellationNode)?.desc}"
          </div>
        )}
      </div>

      {/* Today's Cosmic Reading Card */}
      <div className="bg-[#0e1428] rounded-3xl p-6 sm:p-8 border border-indigo-900/60 shadow-2xl space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-indigo-300 font-outfit">
          TODAY'S COSMIC READING
        </h3>

        <p className="text-lg sm:text-xl font-bold font-serif-heading text-white leading-snug">
          "{astro?.todayReading || `Not the best time for new beginnings, ${activeIdentity.humanName}.`}"
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="w-8 h-8 rounded-full bg-indigo-900 border border-indigo-700 flex items-center justify-center text-indigo-300">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-200">
              {astro?.transit || 'Kandaka Shani Alignment'}
            </p>
            <p className="text-[10px] text-slate-400">(Current Transit)</p>
          </div>
        </div>
      </div>

      {/* Astro Profile Breakdown Grid */}
      <div className="space-y-4 relative z-10">
        <h3 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Cosmic Parameters & Destiny</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0d1326] border border-indigo-900/50 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Element
            </span>
            <p className="text-lg font-bold font-serif-heading text-white">{astro?.element || 'Earth & Starch'}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1326] border border-indigo-900/50 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
              <Moon className="w-3.5 h-3.5 text-indigo-300" />
              Rashi / Planet
            </span>
            <p className="text-lg font-bold font-serif-heading text-white">{astro?.planet || 'Saturn (Shani)'}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1326] border border-indigo-900/50 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              Cosmic Trait
            </span>
            <p className="text-lg font-bold font-serif-heading text-white">{astro?.cosmicTrait || 'Chronically Grounded'}</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d1326] border border-indigo-900/50 space-y-2">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Lucky Environment
            </span>
            <p className="text-xs font-semibold text-slate-200">{astro?.luckyEnvironment || 'Cool dark pantry'}</p>
          </div>
        </div>

        {/* Destiny Box */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0d1326] via-[#121936] to-[#0d1326] border border-amber-400/30 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            THE ULTIMATE DESTINY OF {activeIdentity.humanName.toUpperCase()}
          </span>
          <p className="text-base sm:text-lg font-serif italic text-indigo-100">
            "{astro?.destiny || 'To bring comfort and unexpected joy to everyone around.'}"
          </p>
        </div>

        {/* Master Rebuild: ASK THE UNIVERSE Cosmic Prompt Section */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#170e30] via-[#1b103b] to-[#170e30] border border-indigo-500/40 space-y-4">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles className="w-5 h-5 animate-spin-slow" />
            <h3 className="text-lg font-bold font-outfit text-white uppercase tracking-wider">
              ASK THE UNIVERSE ABOUT {activeIdentity.humanName.toUpperCase()}
            </h3>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "Will I become famous?",
              "Who is my soulmate?",
              "Will my owner replace me?",
              "What is my next career move?"
            ].map((q) => (
              <button
                key={q}
                onClick={() => {
                  let ans = `The stars indicate: ${activeIdentity.humanName}'s cosmic transit in ${astro?.element || 'Silicon'} brings high probability of survival and long-term honor on the desk shelf.`;
                  if (q.includes("soulmate")) ans = `Cosmic alignment: ${activeIdentity.isMarried ? `Your soulmate is ${activeIdentity.currentPartner?.name}!` : `Your soulmate is a complementary accessory nearby with 96% compatibility.`}`;
                  if (q.includes("replace")) ans = `The universe foresees: No replacement can replicate ${activeIdentity.humanName}'s unique attendance record of ${activeIdentity.age} years.`;
                  alert(`🌌 COSMIC ANSWER FOR "${q}":\n\n"${ans}"`);
                }}
                className="px-3.5 py-1.5 rounded-full bg-indigo-950/80 hover:bg-amber-400/20 text-indigo-200 hover:text-amber-300 border border-indigo-700/60 transition-all font-medium"
              >
                "{q}"
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

