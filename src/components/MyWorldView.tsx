import React, { useState } from 'react';
import { Sparkles, Heart, Briefcase, Moon, UserCheck, Shield, ChevronRight, Zap, Target, Smile, MessageCircle, Share2, Clock, Calendar, Lock, AlertTriangle, CheckCircle2, Award, EyeOff } from 'lucide-react';
import type { JeevifyIdentity, ViewMode } from '../types';
import { TalkToThingModal } from './TalkToThingModal';
import { ShareCardModal } from './ShareCardModal';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface MyWorldViewProps {
  identity?: JeevifyIdentity | null;
  onNavigate: (view: ViewMode) => void;
  onOpenUpload: () => void;
}

export const MyWorldView: React.FC<MyWorldViewProps> = ({ identity: rawIdentity, onNavigate, onOpenUpload }) => {
  const identity = ensureCompleteIdentity(rawIdentity);
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isConfessionRevealed, setIsConfessionRevealed] = useState(false);
  const [selectedDayEventIndex, setSelectedDayEventIndex] = useState(0);

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16 font-sans-body">
      
      {/* ============================================================ */}
      {/* HERO OBJECT PORTRAIT DISPLAY (Section 13 & 15) */}
      {/* ============================================================ */}
      <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-[#d4af37]/60 p-6 sm:p-10 shadow-xl shadow-amber-500/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f5e6a3]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 text-center md:text-left">
          
          {/* Avatar / Hero Photo */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-[#d4af37] shadow-2xl flex-shrink-0 group bg-[#f8f6f0]">
            <img
              src={identity.imageUrl}
              alt={identity.humanName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-[#d4af37] text-[#1a1a1a] uppercase tracking-wider shadow">
              JEEVIFIED
            </span>
          </div>

          {/* Details & Signature Quote */}
          <div className="space-y-3 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f3efe6] border border-[#b8860b]/30 text-[#8c6512] text-xs font-mono font-bold">
                <Shield className="w-3.5 h-3.5" />
                <span>{identity.id}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-[#f5e6a3]/40 border border-[#d4af37]/50 text-[#6a4c08] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>{identity.socialStatus || 'Household Legend'}</span>
              </span>

              {identity.currently && (
                <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-1">
                  <span>CURRENTLY: {identity.currently}</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif-heading text-[#0f0f0f] tracking-tight">
              {identity.humanName}
            </h1>
            <p className="text-base sm:text-lg font-bold text-[#8c6512] font-outfit">
              {identity.occupation}
            </p>

            {/* Signature Quote */}
            {identity.objectQuote && (
              <p className="text-base font-serif italic text-[#3a3a3a] border-l-2 border-[#d4af37] pl-3 py-1 max-w-xl">
                "{identity.objectQuote}"
              </p>
            )}

            {!identity.objectQuote && (
              <p className="text-sm text-[#4a4a4a] font-serif italic max-w-xl">
                "{identity.oneLinerBio}"
              </p>
            )}

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={() => setIsTalkModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#b8860b] text-[#1a1a1a] font-extrabold text-xs flex items-center gap-2 hover:brightness-105 active:scale-95 transition-all shadow-md shadow-amber-500/20 border border-[#b8860b]/40"
              >
                <MessageCircle className="w-4 h-4 fill-[#1a1a1a]" />
                <span>TALK TO MY THING</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#f8f6f0] text-[#1a1a1a] font-bold text-xs border border-[#b8860b]/40 flex items-center gap-2 transition-all shadow-sm"
              >
                <Share2 className="w-4 h-4 text-[#b8860b]" />
                <span>SHARE MY THING</span>
              </button>

              <button
                onClick={() => onNavigate('my-identity')}
                className="px-4 py-2.5 rounded-xl bg-[#f3efe6] text-[#3a3a3a] hover:text-[#0f0f0f] font-medium text-xs border border-[#b8860b]/20 transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Digital ID Badge</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE LIFE MAP NODE VISUAL (Master Rebuild Requirement) */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#b8860b]/30 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#b8860b]" />
            <h2 className="text-xl font-bold font-outfit text-[#0f0f0f] uppercase tracking-wide">
              {identity.humanName}'S LIFE MAP
            </h2>
          </div>
          <span className="text-xs text-[#8c6512] font-mono">Interactive Node Navigation</span>
        </div>

        {/* Life Map Interactive Visual Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => alert(`🏠 HOME LOCATION: "${identity.fictionalHome || 'The right side of your study table.'}"`)}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-[#b8860b]/30 hover:border-[#d4af37] hover:shadow-gold text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">🏠</div>
            <span className="text-[10px] font-mono uppercase text-[#b8860b] font-bold block">HOME</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">{identity.fictionalHome || 'Study Table'}</p>
          </button>

          <button
            onClick={() => onNavigate('linkedin')}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-blue-200 hover:border-blue-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">💼</div>
            <span className="text-[10px] font-mono uppercase text-blue-700 font-bold block">CAREER</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">{identity.occupation}</p>
          </button>

          <button
            onClick={() => onNavigate('matrimony')}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-rose-200 hover:border-rose-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">❤️</div>
            <span className="text-[10px] font-mono uppercase text-rose-700 font-bold block">LOVE</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">
              {identity.isMarried ? `Married to ${identity.currentPartner?.name || 'Partner'}` : (identity.relationshipStatus || 'Searching')}
            </p>
          </button>

          <button
            onClick={() => onNavigate('family')}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-emerald-200 hover:border-emerald-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">👨‍👩‍👧</div>
            <span className="text-[10px] font-mono uppercase text-emerald-700 font-bold block">FAMILY</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">
              {identity.familyMembers?.length || 2} Relatives
            </p>
          </button>

          <button
            onClick={() => alert(`👥 FRIENDS: ${identity.friends?.map(f => f.name).join(', ') || 'Desk Mug, Storage Organizer'}`)}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-purple-200 hover:border-purple-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">👥</div>
            <span className="text-[10px] font-mono uppercase text-purple-700 font-bold block">FRIENDS</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">{identity.friends?.length || 2} Companions</p>
          </button>

          <button
            onClick={() => alert(`🧠 MEMORIES: ${identity.memoriesList?.[0]?.story || 'First critical exam'}`)}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-amber-200 hover:border-amber-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">🧠</div>
            <span className="text-[10px] font-mono uppercase text-amber-700 font-bold block">MEMORIES</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">{identity.memoriesList?.length || 3} Key Moments</p>
          </button>

          <button
            onClick={() => alert(`🤫 SECRET: "${identity.secret || identity.secretConfession}"`)}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-indigo-200 hover:border-indigo-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">🤫</div>
            <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block">SECRET</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">One Never-Told Secret</p>
          </button>

          <button
            onClick={() => alert(`🔮 FUTURE: "${identity.future10Years || 'Relic in 2030'}"`)}
            className="p-4 rounded-2xl bg-[#fcfbf7] border border-teal-200 hover:border-teal-500 text-left transition-all hover:scale-105 group"
          >
            <div className="text-2xl mb-1">🔮</div>
            <span className="text-[10px] font-mono uppercase text-teal-700 font-bold block">FUTURE</span>
            <p className="text-xs font-bold text-[#1a1a1a] truncate">10-Year Destiny</p>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* OBJECT VIBE & DYNAMIC DIMENSIONS (Section 14) */}
      {/* ============================================================ */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#b8860b]/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#b8860b]" />
            <h2 className="text-lg font-bold font-outfit text-[#0f0f0f]">Object Vibe & Personality Traits</h2>
          </div>
          <span className="text-xs text-[#6a6a6a] font-mono">Dynamic Parameters</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(identity.objectVibe || identity.personalityDNA)?.map((vibe) => (
            <div key={vibe.label} className="p-4 rounded-2xl bg-[#fcfbf7] border border-[#b8860b]/20 space-y-2">
              <div className="flex justify-between text-xs font-semibold text-[#1a1a1a]">
                <span>{vibe.label}</span>
                <span className="font-bold text-[#8c6512]">{vibe.score}%</span>
              </div>
              <div className="w-full h-2 bg-[#e8e4d8] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 bg-gradient-to-r from-[#d4af37] to-[#b8860b]"
                  style={{ width: `${vibe.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECRET LIFE & OBJECT ACHIEVEMENTS (Section 26 & 27) */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Secret Life Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-purple-400">
            <EyeOff className="w-5 h-5" />
            <h3 className="text-base font-bold font-outfit text-white">
              What it does when you're not looking
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-serif italic leading-relaxed p-3 rounded-2xl bg-slate-950 border border-slate-800">
            "{identity.secretLife || identity.jeevifyMoments?.worstHabit || 'Spends most of its time watching you and waiting for urgent moments.'}"
          </p>
        </div>

        {/* Object Achievement Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-amber-400">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold font-outfit text-white">
              Fictional Lifetime Achievement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-200 font-serif italic leading-relaxed p-3 rounded-2xl bg-slate-950 border border-slate-800">
            🏆 "{identity.objectAchievement || identity.jeevifyMoments?.biggestAchievement || 'Saved 2,341 daily household emergencies without taking credit.'}"
          </p>
        </div>

      </div>

      {/* ============================================================ */}
      {/* LIFE STATISTICS SECTION */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <span>Life Statistics</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Smile className="w-4 h-4 text-emerald-400" />
                Personality
              </span>
              <span className="text-emerald-400 font-bold">{identity?.lifeStats?.personalityScore ?? 88}%</span>
            </div>
            <p className="text-base font-bold text-white font-outfit truncate">{identity?.personality || 'Quietly observant'}</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${identity?.lifeStats?.personalityScore ?? 88}%` }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-400" />
                Career
              </span>
              <span className="text-blue-400 font-bold">{identity?.lifeStats?.careerScore ?? 91}%</span>
            </div>
            <p className="text-base font-bold text-white font-outfit truncate">Dedicated Duty</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-400 rounded-full" style={{ width: `${identity?.lifeStats?.careerScore ?? 91}%` }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Target className="w-4 h-4 text-purple-400" />
                Social Rank
              </span>
              <span className="text-purple-400 font-bold">{identity?.lifeStats?.socialScore ?? 74}%</span>
            </div>
            <p className="text-base font-bold text-white font-outfit truncate">{identity?.socialStatus || 'Household Legend'}</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400 rounded-full" style={{ width: `${identity?.lifeStats?.socialScore ?? 74}%` }} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-400" />
                Romance
              </span>
              <span className="text-rose-400 font-bold">Status</span>
            </div>
            <p className="text-base font-bold text-rose-300 font-outfit truncate">{identity?.relationshipStatus || identity?.lifeStats?.romanceStatus || 'Complicated'}</p>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-400 rounded-full w-4/5" />
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* LIFE TIMELINE */}
      {/* ============================================================ */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-teal-400" />
          <h2 className="text-lg font-bold font-outfit text-white">Life Timeline</h2>
        </div>

        <div className="relative border-l-2 border-cyan-500/30 ml-4 pl-6 space-y-6">
          {identity.lifeTimeline?.map((item, index) => (
            <div key={index} className="relative group">
              <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-slate-950 shadow-md group-hover:scale-125 transition-transform" />
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                  {item.year}
                </span>
                <p className="text-sm font-medium text-slate-200 pt-1 leading-relaxed font-sans">
                  "{item.event}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* A DAY IN THE LIFE */}
      {/* ============================================================ */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold font-outfit text-white">A Day in the Life</h2>
          </div>
          <span className="text-xs text-slate-400">Click time slots to explore</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {identity.dayInTheLife?.map((dayEvent, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDayEventIndex(idx)}
              className={`p-3 rounded-2xl text-left border transition-all ${
                selectedDayEventIndex === idx
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg'
                  : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xl mb-1">{dayEvent.emoji || '⏰'}</div>
              <p className="text-xs font-bold font-mono text-cyan-300">{dayEvent.time}</p>
              <p className="text-[10px] text-slate-400 truncate">{dayEvent.status}</p>
            </button>
          ))}
        </div>

        {identity.dayInTheLife?.[selectedDayEventIndex] && (
          <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-serif italic">
            "{identity.dayInTheLife[selectedDayEventIndex].time} — {identity.dayInTheLife[selectedDayEventIndex].event}"
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* JEEVIFY MOMENTS & FLAGS (Section 28) */}
      {/* ============================================================ */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h2 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>Jeevify Moments & Flags</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Most Embarrassing
            </span>
            <p className="text-slate-200 leading-relaxed font-serif">"{identity.jeevifyMoments?.mostEmbarrassing}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Biggest Achievement
            </span>
            <p className="text-slate-200 leading-relaxed font-serif">"{identity.jeevifyMoments?.biggestAchievement}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Secret Talent
            </span>
            <p className="text-slate-200 leading-relaxed font-serif">"{identity.jeevifyMoments?.secretTalent}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400">Biggest Fear</span>
            <p className="text-slate-200 leading-relaxed font-serif">"{identity.jeevifyMoments?.biggestFear}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-500">Red Flag 🚩</span>
            <p className="text-rose-200 leading-relaxed font-serif">"{identity.redFlag || identity.jeevifyMoments?.redFlag}"</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400">Green Flag 🟢</span>
            <p className="text-emerald-200 leading-relaxed font-serif">"{identity.greenFlag || identity.jeevifyMoments?.greenFlag}"</p>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECRET CONFESSION */}
      {/* ============================================================ */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#170a24] via-[#12091f] to-[#170a24] border border-purple-500/40 shadow-xl text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>SECRET CONFESSION</span>
        </div>

        {isConfessionRevealed ? (
          <p className="text-base sm:text-lg font-serif italic text-purple-200 max-w-xl mx-auto animate-fade-in">
            "{identity.secretConfession || 'I secretly enjoy being placed in warm spots on sunny afternoons.'}"
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Tap below to reveal what {identity.humanName} has never told anyone.</p>
            <button
              onClick={() => setIsConfessionRevealed(true)}
              className="px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all active:scale-95"
            >
              🔓 REVEAL SECRET CONFESSION
            </button>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* THREE WORLDS NAVIGATION */}
      {/* ============================================================ */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold font-outfit text-white flex items-center justify-between">
          <span>Explore {identity.humanName}'s Three Worlds</span>
          <span className="text-xs font-normal text-slate-400">Click any world to enter</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('matrimony')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-rose-950/70 via-[#1f0b12] to-slate-950 border border-rose-900/40 hover:border-rose-500/60 transition-all text-left shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white group-hover:text-rose-300 transition-colors">
              💗 Matrimony Things
            </h3>
            <p className="text-xs text-rose-200/70 mt-1 font-serif">
              "Because even a stapler deserves love."
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Find compatible partners, view matrimonial profiles, check Porutham scores.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">
              <span>EXPLORE MATCHES</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('linkedin')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-blue-950/70 via-[#0a1628] to-slate-950 border border-blue-900/40 hover:border-blue-500/60 transition-all text-left shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white group-hover:text-blue-300 transition-colors">
              💼 LinkedIn Things
            </h3>
            <p className="text-xs text-blue-200/70 mt-1 font-sans">
              Build your professional identity.
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              View work experience, career milestones, skills endorsements & resume.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>VIEW CAREER PROFILE</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('astro')}
            className="group p-6 rounded-3xl bg-gradient-to-b from-indigo-950/70 via-[#0f0e26] to-slate-950 border border-indigo-900/40 hover:border-indigo-500/60 transition-all text-left shadow-xl hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Moon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-outfit text-white group-hover:text-indigo-300 transition-colors">
              🔮 Astro Things
            </h3>
            <p className="text-xs text-indigo-200/70 mt-1 font-serif">
              "Your thing has a destiny."
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Daily cosmic readings, cosmic map & 2-object Porutham compatibility scanner.
            </p>
            <div className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
              <span>READ HOROSCOPE</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-bold text-white">Want to give life to another object?</h4>
          <p className="text-xs text-slate-400">Scan any pen, bottle, chair, charger, or coconut around you right now.</p>
        </div>
        <button
          onClick={onOpenUpload}
          className="px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 text-xs flex items-center gap-2 hover:brightness-110 transition-all shadow-md shadow-cyan-500/20"
        >
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>JEEVIFY ANOTHER THING</span>
        </button>
      </div>

      {/* Modals */}
      <TalkToThingModal
        identity={identity}
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
      />

      <ShareCardModal
        identity={identity}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

    </div>
  );
};
