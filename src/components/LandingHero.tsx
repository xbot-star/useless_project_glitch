import React, { useState } from 'react';
import { Sparkles, ArrowRight, Dices, MousePointerClick } from 'lucide-react';
import { HIGH_QUALITY_OBJECT_IMAGES } from '../data/presetObjects';

interface LandingHeroProps {
  onStart: () => void;
  onSelectQuickObject?: (objectType: string) => void;
}

interface FloatingObjectItem {
  id: string;
  name: string;
  imageUrl: string;
  hint: string;
  posClass: string;
  animClass: string;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onStart, onSelectQuickObject }) => {
  const [activeHoverHint, setActiveHoverHint] = useState<string | null>(null);

  const randomObjects = [
    'Stapler', 'Charger', 'Shoe', 'Laptop', 'Chair', 'Bottle', 'Spoon', 'Coconut', 'Remote', 'Toothbrush', 'Electric Kettle', 'Umbrella', 'Potato'
  ];

  const handleRandomThing = () => {
    const randomIndex = Math.floor(Math.random() * randomObjects.length);
    const chosen = randomObjects[randomIndex];
    onSelectQuickObject?.(chosen);
  };

  const floatingObjects: FloatingObjectItem[] = [
    {
      id: 'pen',
      name: 'Ballpoint Pen',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.pen,
      hint: 'Currently overworked. Leaks under pressure.',
      posClass: 'top-12 left-6 sm:left-16 w-20 h-20 sm:w-28 sm:h-28',
      animClass: 'animate-float-slow'
    },
    {
      id: 'laptop',
      name: 'Laptop',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.laptop,
      hint: 'Running 47 tabs & endless dreams.',
      posClass: 'top-28 left-4 sm:left-36 w-28 h-28 sm:w-44 sm:h-44',
      animClass: 'animate-float-reverse'
    },
    {
      id: 'chair',
      name: 'Office Chair',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.chair,
      hint: 'Supports everyone. Emotionally unavailable.',
      posClass: 'bottom-20 left-6 sm:left-24 w-28 h-28 sm:w-40 sm:h-40',
      animClass: 'animate-float-slow'
    },
    {
      id: 'watch',
      name: 'Watch',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.watch,
      hint: 'Counting down until Friday 5:00 PM.',
      posClass: 'top-40 left-1/3 w-16 h-16 sm:w-24 sm:h-24',
      animClass: 'animate-float-reverse'
    },
    {
      id: 'shoe',
      name: 'Sneaker',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.shoe,
      hint: 'Ready to run from responsibilities.',
      posClass: 'top-16 right-8 sm:right-24 w-24 h-24 sm:w-36 sm:h-36',
      animClass: 'animate-float-slow'
    },
    {
      id: 'charger',
      name: 'Charger',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.charger,
      hint: 'Vibrating with emergency energy.',
      posClass: 'bottom-28 right-8 sm:right-32 w-20 h-20 sm:w-32 sm:h-32',
      animClass: 'animate-float-reverse'
    },
    {
      id: 'coffee',
      name: 'Coffee Mug',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.coffee,
      hint: 'Holding sanity together since 8 AM.',
      posClass: 'top-44 right-1/4 w-20 h-20 sm:w-28 sm:h-28',
      animClass: 'animate-float-slow'
    },
    {
      id: 'backpack',
      name: 'Backpack',
      imageUrl: HIGH_QUALITY_OBJECT_IMAGES.backpack,
      hint: 'Carrying the weight of unanswered texts.',
      posClass: 'bottom-16 right-4 sm:right-16 w-24 h-24 sm:w-36 sm:h-36',
      animClass: 'animate-float-reverse'
    }
  ];

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-[#fcfbf7] text-[#1a1a1a] flex flex-col items-center justify-center px-4 overflow-hidden py-12 font-sans-body">
      
      {/* Background Gold Celestial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[480px] sm:w-[580px] sm:h-[720px] rounded-t-full bg-gradient-to-b from-[#f5e6a3]/30 via-[#d4af37]/10 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      </div>

      {/* Floating 3D Objects Layer with Gold Framing */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
        {floatingObjects.map((obj) => (
          <div
            key={obj.id}
            className={`absolute ${obj.posClass} ${obj.animClass} pointer-events-auto transition-transform duration-300 hover:scale-110 group cursor-pointer z-20`}
            onMouseEnter={() => setActiveHoverHint(obj.hint)}
            onMouseLeave={() => setActiveHoverHint(null)}
            onClick={() => onSelectQuickObject?.(obj.name)}
          >
            <div className="w-full h-full rounded-2xl p-1 bg-gradient-to-br from-white via-[#f5e6a3]/40 to-[#d4af37]/20 shadow-xl backdrop-blur-sm border border-[#b8860b]/30 group-hover:border-[#d4af37] transition-all">
              <img
                src={obj.imageUrl}
                alt={obj.name}
                className="w-full h-full object-cover rounded-xl shadow-md group-hover:rotate-3 transition-transform"
              />
            </div>

            {/* Hover Identity Hint Badge */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-30">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1a1a1a] text-[#f5e6a3] border border-[#d4af37]/50 shadow-xl">
                {obj.name}: "{obj.hint}"
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Central Hero Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f3efe6] border border-[#b8860b]/40 text-[#8c6512] text-xs font-bold tracking-widest uppercase shadow-sm font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#b8860b] animate-pulse" />
          <span>THE WORLD OF NON-LIVING THINGS</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-serif-heading leading-tight text-[#0f0f0f]">
          WHAT IF <br />
          YOUR THINGS <br />
          <span className="text-gold-gradient italic font-normal">WERE ALIVE?</span>
        </h1>

        {/* Supporting Text */}
        <p className="text-[#3a3a3a] text-base sm:text-lg max-w-xl mx-auto font-sans leading-relaxed font-medium">
          “You've spent years with them. Maybe it's time you finally met them.”
        </p>

        {/* Main CTAs: GIVE SOMETHING A LIFE & SURPRISE ME */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 rounded-full font-extrabold text-base tracking-wide bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#b8860b] text-[#1a1a1a] shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-[#b8860b]/40"
          >
            <Sparkles className="w-5 h-5 fill-[#1a1a1a]" />
            <span>GIVE SOMETHING A LIFE</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleRandomThing}
            className="px-6 py-4 rounded-full font-bold text-sm tracking-wide bg-white hover:bg-[#f8f6f0] text-[#1a1a1a] border border-[#b8860b]/40 hover:border-[#d4af37] transition-all flex items-center gap-2 shadow-md"
          >
            <Dices className="w-4 h-4 text-[#b8860b]" />
            <span>SURPRISE ME</span>
          </button>
        </div>

        {/* Dynamic Hover Status Banner */}
        <div className="h-6">
          {activeHoverHint ? (
            <p className="text-xs text-[#8c6512] font-bold font-mono animate-fade-in">
              💡 {activeHoverHint}
            </p>
          ) : (
            <p className="text-xs text-[#6a6a6a] flex items-center justify-center gap-1 font-mono">
              <MousePointerClick className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Hover over any floating object above to see its hidden life hint</span>
            </p>
          )}
        </div>

        {/* Quick Pick Popular Objects Bar */}
        <div className="pt-8 border-t border-[#b8860b]/20 max-w-2xl mx-auto">
          <p className="text-[10px] font-mono font-bold text-[#8c6512] uppercase tracking-widest mb-3">
            OR JEEVIFY A POPULAR OBJECT INSTANTLY
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: '🔌 Charger', type: 'Charger' },
              { label: '📎 Stapler', type: 'Stapler' },
              { label: '👟 Shoe', type: 'Shoe' },
              { label: '💻 Laptop', type: 'Laptop' },
              { label: '🥔 Potato', type: 'Potato' },
              { label: '🥥 Coconut', type: 'Coconut' },
              { label: '📺 Remote', type: 'Remote' },
              { label: '🍼 Bottle', type: 'Bottle' }
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => onSelectQuickObject?.(item.type)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-[#f3efe6] text-[#1a1a1a] hover:text-[#8c6512] border border-[#b8860b]/30 hover:border-[#d4af37] transition-all shadow-sm"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
