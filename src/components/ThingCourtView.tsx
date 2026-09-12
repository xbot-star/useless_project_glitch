import React, { useState } from 'react';
import { Gavel, Shield, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { JeevifyIdentity } from '../types';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface ThingCourtViewProps {
  activeIdentity?: JeevifyIdentity | null;
  onBack: () => void;
}

export const ThingCourtView: React.FC<ThingCourtViewProps> = ({ activeIdentity: rawIdentity, onBack }) => {
  const activeIdentity = ensureCompleteIdentity(rawIdentity);
  const [verdictDelivered, setVerdictDelivered] = useState<'guilty' | 'innocent' | null>(null);

  const courtCase = activeIdentity?.thingCourtCase || {
    title: `THE PEOPLE VS. ${(activeIdentity?.humanName || 'THING').toUpperCase()}`,
    crime: `Disappearing into dark furniture crevices right when urgently needed.`,
    prosecutor: `Attorney Emergency Panic`,
    defense: `Public Defender Quiet Loyalty`,
    evidence: `Discovered 14 days later right under the couch edge.`,
    witness: `Dust Bunny Dave`,
    defaultVerdict: `GUILTY OF TACTICAL MISPLACEMENT`
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-16 font-sans-body">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-amber-900/40 pb-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My World</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-heading text-white flex items-center gap-3">
            <Gavel className="w-8 h-8 text-amber-400" />
            <span>THING COURT JUDICIAL SYSTEM</span>
          </h1>
          <p className="text-xs text-amber-200/70 font-serif">
            Holding non-living objects accountable for their daily crimes.
          </p>
        </div>
      </div>

      {/* Main Trial Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1c1204] via-[#291a07] to-[#1c1204] border border-amber-500/50 p-6 sm:p-8 shadow-2xl text-amber-100">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-4 border-amber-400 shadow-2xl flex-shrink-0">
            <img
              src={activeIdentity.imageUrl}
              alt={activeIdentity.humanName}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-2 left-2 right-2 text-center px-2 py-0.5 rounded text-[9px] font-extrabold bg-amber-400 text-slate-950 uppercase font-mono">
              DEFENDANT
            </span>
          </div>

          <div className="space-y-3 flex-1 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest">
              CASE NO. {activeIdentity.id}-COURT
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-heading text-white">
              {courtCase.title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-amber-200 bg-amber-950/60 p-3 rounded-2xl border border-amber-500/30">
              🚨 <strong>CRIME CHARGED:</strong> "{courtCase.crime}"
            </p>
          </div>

        </div>
      </div>

      {/* Trial Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Prosecution & Defense */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold uppercase font-outfit text-amber-400 tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>LEGAL REPRESENTATION</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold">PROSECUTION</span>
              <p className="text-sm font-bold text-white">{courtCase.prosecutor}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">DEFENSE ATTORNEY</span>
              <p className="text-sm font-bold text-white">{courtCase.defense}</p>
            </div>
          </div>
        </div>

        {/* Evidence & Witness */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold uppercase font-outfit text-amber-400 tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>EVIDENCE & WITNESSES</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-amber-300 font-bold">KEY EXHIBIT A</span>
              <p className="text-xs text-slate-300 italic font-serif">"{courtCase.evidence}"</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold">WITNESS TESTIMONY</span>
              <p className="text-xs text-slate-300 italic font-serif">"{courtCase.witness}"</p>
            </div>
          </div>
        </div>

      </div>

      {/* Judicial Verdict Delivery Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#141208] to-slate-950 border border-amber-500/40 text-center space-y-6 shadow-2xl">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
          JUDICIAL VERDICT SELECTION
        </span>

        {verdictDelivered ? (
          <div className="space-y-3 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400 text-amber-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold font-serif-heading text-white">
              VERDICT DELIVERED: <span className="text-amber-400 uppercase">{verdictDelivered === 'guilty' ? courtCase.defaultVerdict : 'INNOCENT (ON PROBATION)'}</span>
            </h3>
            <p className="text-xs text-slate-300 font-serif italic max-w-lg mx-auto">
              {verdictDelivered === 'guilty'
                ? `The court sentences ${activeIdentity.humanName} to 48 hours of uninterrupted desk duty.`
                : `${activeIdentity.humanName} has been pardoned on the condition of no further disappearances.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-serif italic text-slate-300">
              As the supreme judge of the Thing Universe, deliver your final verdict:
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setVerdictDelivered('guilty')}
                className="px-8 py-3.5 rounded-2xl font-extrabold bg-rose-600 hover:bg-rose-500 text-white text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Gavel className="w-4 h-4" />
                <span>GUILTY AS CHARGED</span>
              </button>

              <button
                onClick={() => setVerdictDelivered('innocent')}
                className="px-8 py-3.5 rounded-2xl font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white text-xs shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>PARDON WITH WARNING</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
