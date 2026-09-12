import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Heart } from 'lucide-react';
import type { JeevifyIdentity, MatrimonyMatch } from '../types';
import { HIGH_QUALITY_OBJECT_IMAGES } from '../data/presetObjects';

interface PoruthamScannerProps {
  activeIdentity: JeevifyIdentity;
  preselectedPartner?: MatrimonyMatch | null;
  onBack: () => void;
}

export const PoruthamScanner: React.FC<PoruthamScannerProps> = ({
  activeIdentity,
  preselectedPartner,
  onBack
}) => {
  const [partnerObject, setPartnerObject] = useState<{
    name: string;
    objectType: string;
    imageUrl: string;
    age: number;
  }>({
    name: preselectedPartner?.name || 'Diana Diary',
    objectType: preselectedPartner?.objectType || 'Notebook',
    imageUrl: preselectedPartner?.imageUrl || HIGH_QUALITY_OBJECT_IMAGES.diary,
    age: preselectedPartner?.age || 2
  });

  const [isScanning, setIsScanning] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<string>('');
  const [scoresBreakdown, setScoresBreakdown] = useState<{
    emotionalOrbit: number;
    careerAlignment: number;
    dailyCompatibility: number;
    communication: number;
    cosmicChemistry: number;
  } | null>(null);

  const samplePartners = [
    { name: 'Diana Diary', objectType: 'Notebook', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.diary, age: 2 },
    { name: 'Charlotte Chair', objectType: 'Chair', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.chair, age: 5 },
    { name: 'Leo Laptop', objectType: 'Laptop', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.laptop, age: 3 },
    { name: 'Bottley Balan', objectType: 'Water Bottle', imageUrl: HIGH_QUALITY_OBJECT_IMAGES.bottle, age: 1 }
  ];

  const runPoruthamScan = () => {
    setIsScanning(true);
    setScore(null);

    setTimeout(() => {
      // Calculate object-specific compatibility logic
      const t1 = activeIdentity.objectType.toLowerCase();
      const t2 = partnerObject.objectType.toLowerCase();

      let finalVal = 8.7;
      let funnyQuote = 'Strong cosmic attraction!';

      if ((t1.includes('pen') && t2.includes('note')) || (t1.includes('note') && t2.includes('pen'))) {
        finalVal = 9.7;
        funnyQuote = '9.7/10 — You two were practically manufactured for each other. One creates the story, the other remembers it.';
      } else if ((t1.includes('bottle') && t2.includes('laptop')) || (t1.includes('laptop') && t2.includes('bottle'))) {
        finalVal = 3.8;
        funnyQuote = '3.8/10 — High attraction. Catastrophic consequences if spilled.';
      } else if ((t1.includes('potato') && t2.includes('tomato')) || (t1.includes('tomato') && t2.includes('potato'))) {
        finalVal = 9.8;
        funnyQuote = '9.8/10 — Destined for the same legendary hot curry dish.';
      } else if ((t1.includes('chair') && t2.includes('table')) || (t1.includes('table') && t2.includes('chair'))) {
        finalVal = 9.5;
        funnyQuote = '9.5/10 — You already spend every day together. Time to make it official.';
      } else {
        finalVal = Math.floor(Math.random() * 20 + 75) / 10;
        funnyQuote = `${finalVal}/10 — Cosmic harmony verified under desk planetary alignment.`;
      }

      setScore(finalVal);
      setVerdict(funnyQuote);
      setScoresBreakdown({
        emotionalOrbit: Math.min(100, Math.floor(finalVal * 10 + 2)),
        careerAlignment: Math.min(100, Math.floor(finalVal * 9 + 5)),
        dailyCompatibility: Math.min(100, Math.floor(finalVal * 10 - 3)),
        communication: Math.min(100, Math.floor(finalVal * 9.5)),
        cosmicChemistry: Math.min(100, Math.floor(finalVal * 10.2))
      });

      setIsScanning(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-12 font-sans-body">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-indigo-900/40 pb-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Thing Astro</span>
          </button>
          <h1 className="text-3xl font-extrabold font-serif-heading text-white">
            Check Porutham
          </h1>
          <p className="text-xs text-indigo-200/70 font-serif">
            Discover how well two objects align, according to the stars.
          </p>
        </div>
      </div>

      {/* Side-by-side Object Cards (Reference Image 1 Panel 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        
        {/* Card 1: Your Object */}
        <div className="bg-[#0e1428] rounded-3xl p-6 border border-indigo-900/50 shadow-2xl flex flex-col items-center text-center space-y-4 relative">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
            YOUR OBJECT
          </span>

          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-xl shadow-amber-500/20">
            <img
              src={activeIdentity.imageUrl}
              alt={activeIdentity.humanName}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif-heading text-white">
              {activeIdentity.humanName}
            </h3>
            <p className="text-xs text-indigo-300 font-semibold">{activeIdentity.objectType}</p>
            <p className="text-[11px] text-slate-400 mt-1">Age: {activeIdentity.age} Years</p>
          </div>
        </div>

        {/* Center Heart Orbital Connector Graphic */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-indigo-950 border border-amber-400/60 items-center justify-center text-amber-400 shadow-xl">
          <Heart className={`w-6 h-6 fill-current ${isScanning ? 'animate-pulse text-amber-300' : ''}`} />
        </div>

        {/* Card 2: Partner Object */}
        <div className="bg-[#0e1428] rounded-3xl p-6 border border-indigo-900/50 shadow-2xl flex flex-col items-center text-center space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">
            PARTNER OBJECT
          </span>

          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400/80 shadow-xl flex items-center justify-center bg-slate-900">
            <img
              src={partnerObject.imageUrl}
              alt={partnerObject.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif-heading text-white">
              {partnerObject.name}
            </h3>
            <p className="text-xs text-indigo-300 font-semibold">{partnerObject.objectType}</p>
            <p className="text-[11px] text-slate-400 mt-1">Age: {partnerObject.age} Years</p>
          </div>

          {/* Quick Partner Switcher */}
          <div className="w-full pt-2 border-t border-indigo-900/40">
            <p className="text-[10px] text-slate-400 uppercase font-semibold mb-2">Switch Partner:</p>
            <div className="flex flex-wrap justify-center gap-1.5">
              {samplePartners.map((sp) => (
                <button
                  key={sp.name}
                  onClick={() => setPartnerObject(sp)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                    partnerObject.name === sp.name
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : 'bg-indigo-950/80 text-indigo-200 border border-indigo-800 hover:border-amber-400'
                  }`}
                >
                  {sp.name}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Main Scan Button */}
      <div className="text-center pt-2">
        <button
          onClick={runPoruthamScan}
          disabled={isScanning}
          className="px-10 py-4 rounded-full font-extrabold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-105 active:scale-95 transition-all text-base flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
        >
          <Sparkles className={`w-5 h-5 fill-slate-950 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'SCANNING ORBITAL ALIGNMENT...' : '✨ Check Porutham'}</span>
        </button>
      </div>

      {/* Scanning Laser Particle Animation */}
      {isScanning && (
        <div className="py-8 text-center space-y-4">
          <div className="relative w-28 h-28 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-amber-400 animate-spin-slow" />
            <div className="absolute inset-2 rounded-full border-2 border-indigo-400 animate-ping opacity-40" />
            <div className="w-full h-full flex items-center justify-center text-amber-300">
              <Heart className="w-10 h-10 fill-current animate-pulse" />
            </div>
          </div>
          <p className="text-xs font-mono tracking-widest text-amber-300 uppercase">
            Analyzing cosmic compatibility frequency...
          </p>
        </div>
      )}

      {/* Porutham Results Breakdown */}
      {score !== null && scoresBreakdown && !isScanning && (
        <div className="bg-[#0a0f24] rounded-3xl p-6 sm:p-8 border border-amber-400/40 shadow-2xl space-y-6 animate-fade-in">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">
              PORUTHAM COMPATIBILITY SCORE
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold font-serif-heading text-white">
              {score} <span className="text-2xl text-amber-400">/ 10</span>
            </div>
            <p className="text-sm font-serif italic text-amber-200 max-w-xl mx-auto pt-2">
              "{verdict}"
            </p>
          </div>

          {/* Breakdown Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-indigo-900/40 text-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-900 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Emotional Orbit</span>
                <span className="text-amber-400">{scoresBreakdown.emotionalOrbit}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${scoresBreakdown.emotionalOrbit}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-900 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Career Alignment</span>
                <span className="text-amber-400">{scoresBreakdown.careerAlignment}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${scoresBreakdown.careerAlignment}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-900 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Daily Compatibility</span>
                <span className="text-amber-400">{scoresBreakdown.dailyCompatibility}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${scoresBreakdown.dailyCompatibility}%` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-indigo-950/60 border border-indigo-900 space-y-1.5">
              <div className="flex justify-between font-bold text-slate-200">
                <span>Cosmic Chemistry</span>
                <span className="text-amber-400">{scoresBreakdown.cosmicChemistry}%</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${scoresBreakdown.cosmicChemistry}%` }} />
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="text-center font-serif italic text-xs text-indigo-300/80">
        "The stars don't just guide your destiny... they also check your compatibility."
      </div>

    </div>
  );
};
