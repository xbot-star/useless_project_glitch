import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, QrCode, ShieldCheck, ArrowRight, Heart, Briefcase, Moon, Sparkles } from 'lucide-react';
import type { JeevifyIdentity, ViewMode } from '../types';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface IdentityCardModalProps {
  identity?: JeevifyIdentity | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateWorld: (view: ViewMode) => void;
}

export const IdentityCardModal: React.FC<IdentityCardModalProps> = ({
  identity: rawIdentity,
  isOpen,
  onClose,
  onNavigateWorld,
}) => {
  const identity = ensureCompleteIdentity(rawIdentity);
  useEffect(() => {
    if (isOpen) {
      try {
        if (typeof confetti === 'function') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
        }
      } catch (e) {
        console.warn('Confetti effect failed gracefully:', e);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fade-in font-sans-body">
      <div className="relative w-full max-w-md bg-[#080d21] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6 overflow-hidden">
        
        {/* Holographic background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 p-[1px]">
              <div className="w-full h-full bg-[#080d21] rounded-[7px] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-extrabold font-outfit uppercase tracking-widest text-cyan-300">
                JEEVIFY IDENTITY
              </h3>
              <p className="text-[10px] text-slate-400">
                Official Life License • Universe 1
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collectible Identity Card Body */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1128] to-slate-950 p-5 border border-cyan-500/30 shadow-inner space-y-4 overflow-hidden">
          
          {/* Laser scan line effect */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan pointer-events-none" />

          {/* Top section: Photo + ID Number */}
          <div className="flex items-start gap-4">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-lg flex-shrink-0">
              <img
                src={identity.imageUrl}
                alt={identity.humanName}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-500 text-slate-950">
                VERIFIED
              </span>
            </div>

            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  {identity.id}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold border border-slate-700">
                  AGE {identity.age} YRS
                </span>
              </div>

              <h2 className="text-xl font-extrabold font-outfit text-white truncate">
                {identity.humanName}
              </h2>
              <p className="text-xs font-semibold text-teal-400 leading-tight truncate">
                {identity.occupation}
              </p>

              {/* Social Status Badge */}
              <div className="pt-0.5">
                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold uppercase tracking-wider">
                  <Sparkles className="w-2.5 h-2.5" />
                  {identity.socialStatus || 'Household Legend'}
                </span>
              </div>
            </div>
          </div>

          {/* Bio Quote */}
          <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-xs italic text-slate-300 font-serif">
            "{identity.oneLinerBio}"
          </div>

          {/* Details Table Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-500 block font-semibold">Origin</span>
              <span className="text-slate-200 font-medium">{identity.origin}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-500 block font-semibold">Status</span>
              <span className="text-cyan-300 font-medium">{identity.status}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-500 block font-semibold">Personality</span>
              <span className="text-slate-200 font-medium truncate block">{identity.personality}</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] uppercase text-slate-500 block font-semibold">Romance Status</span>
              <span className="text-rose-300 font-medium truncate block">{identity?.lifeStats?.romanceStatus || identity?.relationshipStatus || 'Complicated'}</span>
            </div>
          </div>

          {/* Bottom QR Graphic & Barcode */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <QrCode className="w-8 h-8 text-cyan-400/80" />
              <div className="text-[9px] text-slate-500 font-mono">
                <span>{identity.id}</span><br />
                <span>CLASS 1 OBJECT LICENSE</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              IT HAS A LIFE!
            </span>
          </div>

        </div>

        {/* Action Buttons to Enter Three Worlds */}
        <div className="space-y-2 pt-2">
          <p className="text-xs font-semibold text-center text-slate-400">
            Explore {identity.humanName}'s Three Worlds:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onClose();
                onNavigateWorld('matrimony');
              }}
              className="py-2.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-200 border border-rose-800/60 text-xs font-bold flex flex-col items-center gap-1 transition-all"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Matrimony</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateWorld('linkedin');
              }}
              className="py-2.5 px-3 rounded-xl bg-blue-950/60 hover:bg-blue-900 text-blue-200 border border-blue-800/60 text-xs font-bold flex flex-col items-center gap-1 transition-all"
            >
              <Briefcase className="w-4 h-4 text-blue-400" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onNavigateWorld('astro');
              }}
              className="py-2.5 px-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-indigo-200 border border-indigo-800/60 text-xs font-bold flex flex-col items-center gap-1 transition-all"
            >
              <Moon className="w-4 h-4 text-indigo-400" />
              <span>Astro</span>
            </button>
          </div>

          <button
            onClick={() => {
              onClose();
              onNavigateWorld('my-world');
            }}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
          >
            <span>ENTER MY WORLD DASHBOARD</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

