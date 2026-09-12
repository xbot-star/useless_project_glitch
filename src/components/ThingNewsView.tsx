import React from 'react';
import { Newspaper, ArrowLeft, Radio, ThumbsUp, MessageSquare } from 'lucide-react';
import type { JeevifyIdentity } from '../types';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface ThingNewsViewProps {
  activeIdentity?: JeevifyIdentity | null;
  onBack: () => void;
}

export const ThingNewsView: React.FC<ThingNewsViewProps> = ({ activeIdentity: rawIdentity, onBack }) => {
  const activeIdentity = ensureCompleteIdentity(rawIdentity);
  const humanNameUpper = (activeIdentity?.humanName || 'THING').toUpperCase();
  const humanName = activeIdentity?.humanName || 'Thing';
  const newsItems = activeIdentity?.thingNewsItems || [
    {
      id: 'news-1',
      headline: `BREAKING: ${humanNameUpper} DEMANDS 8-HOUR SLEEP IN DESK DRAWER`,
      date: 'JUST NOW',
      category: 'HOUSEHOLD LAWS',
      content: `${humanName} has officially announced a strike against working overtime without proper wooden surface support.`,
      imageUrl: activeIdentity?.imageUrl
    },
    {
      id: 'news-2',
      headline: `LOCAL REPORT: ${humanNameUpper} VOTED MOST RELIABLE ITEM OF 2026`,
      date: '2 HOURS AGO',
      category: 'AWARDS',
      content: `In a unanimous room vote, ${humanName} defeated 14 competing items to claim the annual attendance trophy.`
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-16 font-sans-body">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-rose-900/40 pb-4">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-white transition-colors mb-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My World</span>
          </button>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif-heading text-white flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-rose-400" />
            <span>THING NEWS NETWORK (TNN)</span>
          </h1>
          <p className="text-xs text-rose-200/70 font-serif">
            Fictional breaking news headlines from the non-living universe.
          </p>
        </div>
      </div>

      {/* Breaking Ticker Bar */}
      <div className="bg-rose-950/80 border border-rose-500/40 rounded-2xl p-3 flex items-center gap-3 text-xs font-mono text-rose-200 overflow-hidden shadow-lg">
        <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-extrabold flex items-center gap-1 flex-shrink-0 animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>BREAKING</span>
        </span>
        <div className="font-bold tracking-wide text-rose-100 truncate flex-1">
          {newsItems[0]?.headline} • {activeIdentity.humanName} HAS SPOKEN • STAY TUNED FOR LIVE UPDATES FROM THE DESK DRAWER
        </div>
      </div>

      {/* Main News Articles Feed */}
      <div className="space-y-6">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-widest">
                {news.category}
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">{news.date}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold font-serif-heading text-white leading-snug">
              {news.headline}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {news.imageUrl && (
                <img
                  src={news.imageUrl}
                  alt={news.headline}
                  className="w-full sm:w-44 h-36 rounded-2xl object-cover border border-slate-800 shadow"
                />
              )}
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed flex-1">
                {news.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>342 Object Reactions</span>
                </button>
                <button className="flex items-center gap-1.5 hover:text-rose-400 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>42 Comments</span>
                </button>
              </div>
              <span className="text-[10px] font-mono text-slate-500">TNN VERIFIED STORY</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
