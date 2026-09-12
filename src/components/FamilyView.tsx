import React, { useState } from 'react';
import { Users, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import type { JeevifyIdentity, ViewMode } from '../types';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface FamilyViewProps {
  activeIdentity?: JeevifyIdentity | null;
  onNavigate: (view: ViewMode) => void;
}

export const FamilyView: React.FC<FamilyViewProps> = ({ activeIdentity: rawIdentity, onNavigate }) => {
  const activeIdentity = ensureCompleteIdentity(rawIdentity);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const familyMembers = activeIdentity.familyMembers || [
    { name: 'Penny Paperclip', relation: 'Cousin', icon: '📎', personality: 'Flexible, lightweight, temporary.' },
    { name: 'Pencil Jr.', relation: 'Younger Sibling', icon: '✏️', personality: 'Always needs an eraser after mistakes.' },
    { name: 'Eraser Ed', relation: 'Uncle', icon: '🧹', personality: 'Selflessly rubs away past errors.' }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16 font-sans-body">
      
      {/* Top Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white p-6 sm:p-10 border border-emerald-500/40 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <button
            onClick={() => onNavigate('my-world')}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My World</span>
          </button>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-heading text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <span>{(activeIdentity?.humanName || 'THING').toUpperCase()}'S FAMILY</span>
          </h1>
          <p className="text-sm text-emerald-200/80 font-serif max-w-xl">
            Meet the non-living lineage. Every object belongs to a broader household family.
          </p>
        </div>
      </div>

      {/* Spouse / Partner Highlight Banner */}
      {activeIdentity.isMarried && activeIdentity.currentPartner && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-pink-950/60 to-slate-950 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-400 flex-shrink-0 shadow-lg">
            <img src={activeIdentity.currentPartner.imageUrl} alt={activeIdentity.currentPartner.name} className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white uppercase font-mono">
              SPOUSE & LIFE PARTNER
            </span>
            <h3 className="text-2xl font-extrabold font-serif-heading text-white">
              {activeIdentity.currentPartner.name}
            </h3>
            <p className="text-xs text-rose-200 font-serif italic">
              "{activeIdentity.currentPartner.quote}"
            </p>
          </div>
        </div>
      )}

      {/* Family Tree Nodes */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span>Family Tree Members</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {familyMembers.map((member, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMember(member)}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer space-y-3 hover:-translate-y-1 shadow-xl group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl p-3 rounded-2xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                  {member.icon}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {member.relation}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-extrabold font-serif-heading text-white group-hover:text-emerald-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mt-1">
                  {member.personality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Domestic Family Drama Card */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/40 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertCircle className="w-5 h-5" />
          <h3 className="text-base font-bold font-outfit text-white">
            Current Domestic Family Drama
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-amber-200 font-serif italic leading-relaxed p-4 rounded-2xl bg-slate-950 border border-slate-800">
          " {activeIdentity.familyDrama || 'Pencil Jr. keeps borrowing lead without returning it, causing quiet tension during table dinners.'} "
        </p>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm bg-slate-900 rounded-3xl p-6 shadow-2xl text-white border border-emerald-500/40 space-y-4">
            <div className="text-4xl text-center">{selectedMember.icon}</div>
            <div className="text-center space-y-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 uppercase font-mono">
                {selectedMember.relation}
              </span>
              <h3 className="text-2xl font-extrabold font-serif-heading">{selectedMember.name}</h3>
            </div>
            <p className="text-xs text-slate-300 font-serif italic text-center p-3 rounded-xl bg-slate-950 border border-slate-800">
              "{selectedMember.personality}"
            </p>
            <button
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 rounded-xl font-bold bg-emerald-500 text-slate-950 text-xs"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
