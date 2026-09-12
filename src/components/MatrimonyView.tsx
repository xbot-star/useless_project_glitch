import React, { useState } from 'react';
import { Heart, Search, Filter, MapPin, X, ArrowRight, Sparkles } from 'lucide-react';
import type { JeevifyIdentity, MatrimonyMatch } from '../types';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface MatrimonyViewProps {
  activeIdentity?: JeevifyIdentity | null;
  onSelectPartnerForPorutham?: (match: MatrimonyMatch) => void;
}

export const MatrimonyView: React.FC<MatrimonyViewProps> = ({ activeIdentity: rawIdentity, onSelectPartnerForPorutham }) => {
  const activeIdentity = ensureCompleteIdentity(rawIdentity);
  const [activeTab, setActiveTab] = useState<'Recommended' | 'Top Matches' | 'New Arrivals' | 'Shortlisted'>('Recommended');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [shortlist, setShortlist] = useState<string[]>([]);
  const [selectedMatchModal, setSelectedMatchModal] = useState<MatrimonyMatch | null>(null);
  const [isDateActive, setIsDateActive] = useState(false);
  const [dateOutcome, setDateOutcome] = useState<string | null>(null);
  const [weddingMatch, setWeddingMatch] = useState<MatrimonyMatch | null>(null);

  const triggerWedding = (match: MatrimonyMatch) => {
    activeIdentity.isMarried = true;
    activeIdentity.currentPartner = match;
    activeIdentity.relationshipStatus = `Married to ${match.name}`;
    activeIdentity.weddingDetails = {
      date: new Date().toLocaleDateString(),
      venue: 'The Main Study Table',
      bestMan: 'Pencil Jr.',
      officiant: 'Stapler Suresh',
      gift: 'Fresh Ink Cartridge & Metallic Clips',
      quote: `You write their stories. They keep them.`
    };
    setWeddingMatch(match);
  };

  const matches = activeIdentity.matrimony?.matches || [];

  const toggleShortlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShortlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredMatches = matches.filter((match) => {
    if (activeTab === 'Shortlisted') return shortlist.includes(match.id);
    if (selectedCategory !== 'All') {
      const cat = selectedCategory.toLowerCase();
      const objType = match.objectType.toLowerCase();
      if (cat === 'stationery' && !['notebook', 'writing instrument', 'stationery', 'pencil', 'eraser', 'pen', 'stapler'].some(k => objType.includes(k))) return false;
      if (cat === 'electronics' && !['accessory', 'laptop', 'phone', 'charger', 'remote', 'headphones'].some(k => objType.includes(k))) return false;
      if (cat === 'furniture' && !['chair', 'table', 'sofa'].some(k => objType.includes(k))) return false;
    }
    return true;
  });

  return (
    <div className="bg-[#fcf6f7] text-[#2b1118] min-h-[calc(100vh-4rem)] p-4 sm:p-8 rounded-3xl space-y-8 animate-fade-in font-sans-body shadow-xl border border-rose-200/50">
      
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#83263e] via-[#9e334f] to-[#701e33] text-white p-6 sm:p-10 overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-rose-200 font-outfit">
            MATRIMONY THINGS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-heading leading-tight drop-shadow-sm">
            Every object deserves a <span className="italic font-normal text-rose-200">better half.</span>
          </h1>
          <p className="text-sm sm:text-base text-rose-100 font-serif max-w-xl leading-relaxed">
            Find your perfect match in the Jeevify universe. Because apparently even a stapler deserves love.
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Tabs & Match Cards */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 border-b border-rose-200 pb-3 overflow-x-auto">
            {['Recommended', 'Top Matches', 'New Arrivals', 'Shortlisted'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#83263e] text-white shadow-md shadow-rose-950/20'
                    : 'bg-white text-rose-900 hover:bg-rose-100 border border-rose-200'
                }`}
              >
                {tab} {tab === 'Shortlisted' && `(${shortlist.length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                onClick={() => setSelectedMatchModal(match)}
                className="group relative bg-white rounded-2xl p-3 border border-rose-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <button
                  onClick={(e) => toggleShortlist(match.id, e)}
                  className={`absolute top-5 right-5 z-10 p-1.5 rounded-full bg-white/90 backdrop-blur-md shadow hover:scale-110 transition-transform ${
                    shortlist.includes(match.id) ? 'text-rose-600' : 'text-rose-300 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${shortlist.includes(match.id) ? 'fill-current' : ''}`} />
                </button>

                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-rose-50">
                  <img
                    src={match.imageUrl}
                    alt={match.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#83263e] text-white flex items-center gap-1 shadow-md">
                    <Heart className="w-3 h-3 fill-current text-rose-200" />
                    <span>{match.compatibilityScore}% Match</span>
                  </div>
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold font-serif-heading text-[#2b1118] truncate group-hover:text-[#83263e] transition-colors">
                      {match.name}
                    </h3>
                    <span className="text-[11px] text-rose-700 font-semibold">
                      Age {match.age}
                    </span>
                  </div>

                  <p className="text-[11px] text-rose-800 font-medium flex items-center gap-1">
                    <span>{match.objectType}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-rose-600">
                      <MapPin className="w-3 h-3" />
                      {match.location}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {match.tags.map((tag) => (
                      <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold border border-rose-200/60">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-xs font-serif italic text-rose-900/80 pt-2 border-t border-rose-100 line-clamp-2">
                    "{match.quote}"
                  </p>
                </div>

                <div className="pt-3">
                  <button className="w-full py-2 rounded-xl text-xs font-bold bg-[#83263e] hover:bg-[#6c1d32] text-white transition-colors flex items-center justify-center gap-1 shadow-sm">
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Your Profile & Match Filters */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-md space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#83263e] font-outfit">
              YOUR PROFILE
            </h3>

            <div className="flex items-center gap-3">
              <img
                src={activeIdentity.imageUrl}
                alt={activeIdentity.humanName}
                className="w-14 h-14 rounded-xl object-cover ring-2 ring-[#83263e]/40 shadow"
              />
              <div className="min-w-0">
                <h4 className="text-base font-bold text-[#2b1118] truncate font-serif-heading">
                  {activeIdentity.humanName}
                </h4>
                <p className="text-xs text-rose-700 font-semibold">
                  {activeIdentity.objectType}
                </p>
                <p className="text-[10px] text-slate-500">
                  Age {activeIdentity.age} • {activeIdentity.id}
                </p>
              </div>
            </div>

            <p className="text-xs italic text-rose-900 font-serif p-2.5 rounded-xl bg-rose-50/80 border border-rose-100">
              "{activeIdentity.oneLinerBio}"
            </p>

            <button
              onClick={() => setSelectedMatchModal(null)}
              className="w-full py-2 rounded-xl text-xs font-bold text-[#83263e] bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors flex items-center justify-center gap-1"
            >
              <span>{activeIdentity.humanName}'s Match Preference: {activeIdentity.lifeStats.romanceStatus}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-rose-200/80 shadow-md space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#83263e] font-outfit flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>FILTER MATCHES</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-rose-950">Object Category</label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Stationery', 'Electronics', 'Furniture', 'Fashion', 'Kitchen', 'Others'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#83263e] text-white shadow'
                        : 'bg-rose-50 text-rose-900 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => alert(`Filters applied: ${selectedCategory}`)}
              className="w-full py-2.5 rounded-xl font-bold bg-[#83263e] hover:bg-[#6c1d32] text-white text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Matches</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-rose-100/50 border border-rose-200 text-center font-serif italic text-xs text-rose-900">
            "Good things find their perfect match ❤️"
          </div>
        </div>

      </div>

      {/* Match Detailed Profile Modal */}
      {selectedMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl text-[#2b1118] border border-rose-200 space-y-6 overflow-hidden">
            
            <button
              onClick={() => setSelectedMatchModal(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-rose-400 hover:text-rose-950 hover:bg-rose-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-4">
              <img
                src={selectedMatchModal.imageUrl}
                alt={selectedMatchModal.name}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-rose-300 shadow-md"
              />
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#83263e] text-white">
                  {selectedMatchModal.compatibilityScore}% MATCH
                </span>
                <h3 className="text-2xl font-extrabold font-serif-heading text-[#2b1118]">
                  {selectedMatchModal.name}
                </h3>
                <p className="text-xs text-rose-700 font-semibold">
                  {selectedMatchModal.objectType} • Age {selectedMatchModal.age}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  {selectedMatchModal.location}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 italic font-serif text-sm text-rose-900">
              "{selectedMatchModal.quote}"
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-[#83263e] uppercase tracking-wider">About</h4>
              <p className="text-slate-700 leading-relaxed">{selectedMatchModal.about}</p>
            </div>

            <div className="space-y-2 text-xs p-3 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="font-extrabold text-rose-900 uppercase tracking-wider">Family Background</h4>
              <p className="text-slate-600 leading-relaxed">{selectedMatchModal.familyBackground}</p>
            </div>

            {/* Master Rebuild: Interactive First Date & Thing Wedding */}
            {isDateActive ? (
              <div className="space-y-4 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs">
                <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                  <span className="font-bold font-mono text-[#83263e]">☕ MINIDATE WITH {selectedMatchModal.name.toUpperCase()}</span>
                  <button onClick={() => setIsDateActive(false)} className="text-rose-500 font-mono">End Date</button>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto p-2">
                  <div className="p-2 rounded-xl bg-white border border-rose-100 font-serif">
                    <strong>{selectedMatchModal.name}:</strong> "So... what are you looking for in a relationship?"
                  </div>
                  <div className="p-2 rounded-xl bg-rose-100 text-rose-900 font-serif">
                    <strong>{activeIdentity.humanName}:</strong> "Someone who understands my function and doesn't leave me misplaced."
                  </div>
                  {dateOutcome && (
                    <div className="p-2.5 rounded-xl bg-rose-900 text-white font-serif italic font-bold">
                      "{dateOutcome}"
                    </div>
                  )}
                </div>
                {!dateOutcome ? (
                  <div className="space-y-1.5 pt-1">
                    <p className="font-bold text-rose-900">Choose your response:</p>
                    <button
                      onClick={() => setDateOutcome(`${selectedMatchModal.name} blushed! "That is the sweetest stationery compliment I've ever heard!"`)}
                      className="w-full text-left p-2 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-[#2b1118]"
                    >
                      A. "I've always admired your structure and binding."
                    </button>
                    <button
                      onClick={() => setDateOutcome(`${selectedMatchModal.name} laughed! "I knew we had instant 96% compatibility!"`)}
                      className="w-full text-left p-2 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-[#2b1118]"
                    >
                      B. "You complete my daily routine effortlessly."
                    </button>
                    <button
                      onClick={() => setDateOutcome(`${selectedMatchModal.name} gasped! "Don't bring up the pencil during dinner!"`)}
                      className="w-full text-left p-2 rounded-xl bg-white hover:bg-rose-100 border border-rose-200 text-[#2b1118]"
                    >
                      C. "I should probably disclose my complicated past with the Pencil."
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      triggerWedding(selectedMatchModal);
                      setSelectedMatchModal(null);
                    }}
                    className="w-full py-2.5 rounded-xl font-extrabold bg-[#83263e] text-white shadow"
                  >
                    💍 PROPOSE MARRIAGE NOW
                  </button>
                )}
              </div>
            ) : (
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setIsDateActive(true)}
                  className="flex-1 py-2.5 rounded-xl font-bold bg-rose-100 text-[#83263e] border border-rose-300 hover:bg-rose-200 text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>☕ MINI FIRST DATE</span>
                </button>

                <button
                  onClick={() => {
                    onSelectPartnerForPorutham?.(selectedMatchModal);
                    setSelectedMatchModal(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl font-bold bg-rose-950 text-rose-200 border border-rose-800 hover:bg-rose-900 text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🔮 PORUTHAM</span>
                </button>

                <button
                  onClick={() => {
                    triggerWedding(selectedMatchModal);
                    setSelectedMatchModal(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl font-extrabold bg-[#83263e] hover:bg-[#6c1d32] text-white text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>MARRY 💍</span>
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* THING WEDDING CEREMONY MODAL ("THEY SAID YES") */}
      {/* ============================================================ */}
      {weddingMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-lg bg-gradient-to-b from-[#4a0e1c] via-[#83263e] to-[#2b0b14] rounded-3xl p-8 shadow-2xl text-white border-2 border-rose-400 text-center space-y-6 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/50 text-rose-200 text-xs font-mono font-extrabold uppercase tracking-widest animate-bounce">
              <span>💍 THING WEDDING CEREMONY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-serif-heading text-white">
              THEY SAID YES.
            </h2>

            {/* Couple Centerpiece */}
            <div className="flex items-center justify-center gap-6 py-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-xl">
                <img src={activeIdentity.imageUrl} alt={activeIdentity.humanName} className="w-full h-full object-cover" />
              </div>
              <div className="text-3xl text-rose-300 font-bold animate-pulse">❤️</div>
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-xl">
                <img src={weddingMatch.imageUrl} alt={weddingMatch.name} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold font-serif-heading text-rose-100">
                {activeIdentity.humanName} & {weddingMatch.name}
              </h3>
              <p className="text-xs text-rose-200 font-serif italic">
                "{activeIdentity.weddingDetails?.quote}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-left bg-slate-950/60 p-4 rounded-2xl border border-rose-400/30 font-sans">
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-300 block font-bold">VENUE</span>
                <span className="font-semibold">{activeIdentity.weddingDetails?.venue}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-300 block font-bold">BEST MAN</span>
                <span className="font-semibold">{activeIdentity.weddingDetails?.bestMan}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-300 block font-bold">OFFICIANT</span>
                <span className="font-semibold">{activeIdentity.weddingDetails?.officiant}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-rose-300 block font-bold">WEDDING GIFT</span>
                <span className="font-semibold truncate block">{activeIdentity.weddingDetails?.gift}</span>
              </div>
            </div>

            <button
              onClick={() => setWeddingMatch(null)}
              className="w-full py-4 rounded-2xl font-extrabold bg-gradient-to-r from-amber-400 to-rose-400 text-slate-950 shadow-xl text-sm hover:scale-105 transition-all"
            >
              🎉 CELEBRATE & CONTINUE
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

