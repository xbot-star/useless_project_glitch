import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import type { JeevifyIdentity } from '../types';

interface ShareCardModalProps {
  identity: JeevifyIdentity;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareCardModal: React.FC<ShareCardModalProps> = ({ identity, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `✨ Meet ${identity.humanName} (${identity.occupation})! Jeevify ID: ${identity.id}. "${identity.oneLinerBio}" #Jeevify`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans-body">
      <div className="relative w-full max-w-sm bg-[#080d21] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-6 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-300 font-outfit">
              SHARE JEEVIFY CARD
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Social Media Card Visual */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d1633] to-slate-950 p-5 border border-cyan-400/50 shadow-2xl space-y-4 text-center overflow-hidden">
          
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-cyan-400 text-slate-950 uppercase tracking-widest">
            OFFICIAL JEEVIFY CARD
          </div>

          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-xl mx-auto">
            <img src={identity.imageUrl} alt={identity.humanName} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xl font-extrabold font-outfit text-white">{identity.humanName}</h4>
            <p className="text-xs font-semibold text-teal-300">{identity.occupation}</p>
            <p className="text-[10px] font-mono text-cyan-400">{identity.id}</p>
          </div>

          <p className="text-xs font-serif italic text-slate-200 bg-slate-950/70 p-3 rounded-xl border border-white/10">
            "{identity.objectQuote || identity.oneLinerBio}"
          </p>

          <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-800">
            <span>JEEVIFY UNIVERSE</span>
            <span>IT HAS A LIFE! ✨</span>
          </div>

        </div>

        {/* Copy Share Text Action */}
        <div className="space-y-3">
          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/25"
          >
            {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
            <span>{copied ? 'COPIED SHARE CARD TEXT!' : 'COPY SHARE TEXT'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
