import React, { useState } from 'react';
import { Bug, X, CheckCircle, RefreshCw } from 'lucide-react';
import type { JeevifyIdentity } from '../types';
import { generateIdentityFromRules } from '../services/aiGenerator';

interface DebugPanelProps {
  activeIdentity: JeevifyIdentity;
  onSwitchIdentity: (newIdentity: JeevifyIdentity) => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ activeIdentity, onSwitchIdentity }) => {
  const [isOpen, setIsOpen] = useState(false);

  const testObjects = [
    { label: 'Pen', icon: '✒️', input: 'Pen' },
    { label: 'Charger', icon: '🔌', input: 'Charger' },
    { label: 'Stapler', icon: '📎', input: 'Stapler' },
    { label: 'Laptop', icon: '💻', input: 'Laptop' },
    { label: 'Shoe', icon: '👟', input: 'Shoe' },
    { label: 'Potato', icon: '🥔', input: 'Potato' },
    { label: 'Spoon', icon: '🥄', input: 'Spoon' },
    { label: 'Bottle', icon: '🍼', input: 'Bottle' },
    { label: 'Chair', icon: '🪑', input: 'Chair' },
    { label: 'Kettle', icon: '🫖', input: 'Electric Kettle' }
  ];

  const handleSelectObject = (objectInput: string) => {
    const newIdentity = generateIdentityFromRules(objectInput);
    onSwitchIdentity(newIdentity);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans-body">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-3 py-2 rounded-full bg-slate-900/90 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-mono text-[11px] font-bold shadow-xl backdrop-blur-md flex items-center gap-1.5 hover:scale-105 transition-all"
        >
          <Bug className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>AI DEBUGGER</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      ) : (
        <div className="w-80 bg-[#080d1e] border border-cyan-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-slate-100 space-y-4 animate-fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Bug className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold font-mono tracking-wider text-cyan-300">
                JEEVIFY AI DEBUGGER
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Active State Trace */}
          <div className="space-y-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">ACTIVE OBJECT:</span>
              <span className="text-cyan-300 font-bold">{activeIdentity.objectType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">HUMAN NAME:</span>
              <span className="text-white font-bold">{activeIdentity.humanName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">JEEVIFY ID:</span>
              <span className="text-amber-400 font-bold">{activeIdentity.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">MATCHES COUNT:</span>
              <span className="text-rose-400 font-bold">{activeIdentity.matrimony?.matches?.length || 0} Matches</span>
            </div>
          </div>

          {/* Quick Matrix Switcher */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-cyan-400" />
              <span>Test Matrix Object Switcher</span>
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {testObjects.map((obj) => (
                <button
                  key={obj.label}
                  onClick={() => handleSelectObject(obj.input)}
                  className={`p-2 rounded-lg text-xs font-medium text-left flex items-center justify-between transition-all border ${
                    activeIdentity.objectType.toLowerCase().includes(obj.label.toLowerCase())
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow'
                      : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{obj.icon} {obj.label}</span>
                  {activeIdentity.objectType.toLowerCase().includes(obj.label.toLowerCase()) && (
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[9px] text-slate-500 text-center font-mono">
            Verifying: Pen ➔ Pen | Charger ➔ Charger | Stapler ➔ Stapler | Laptop ➔ Laptop | Shoe ➔ Shoe
          </p>

        </div>
      )}
    </div>
  );
};
