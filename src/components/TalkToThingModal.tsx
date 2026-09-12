import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import type { JeevifyIdentity } from '../types';

interface TalkToThingModalProps {
  identity: JeevifyIdentity;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'object';
  text: string;
}

export const TalkToThingModal: React.FC<TalkToThingModalProps> = ({ identity, isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          sender: 'object',
          text: `Hey there! I'm ${identity.humanName} (${identity.occupation}). What's on your mind today?`
        }
      ]);
    }
  }, [isOpen, identity]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const sampleQuestions = [
    `Why do you disappear when I need you?`,
    `What do you do inside the drawer all day?`,
    `What's your biggest complaint about me?`,
    `Are you happy with your job as a ${identity.objectType}?`
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = `As a ${identity.objectType}, I prefer not to comment on active negotiations.`;
      const q = query.toLowerCase();

      if (q.includes('disappear') || q.includes('lost') || q.includes('where')) {
        reply = `I call it strategic relocation! You can usually find me at my home: "${identity.fictionalHome || 'on your study table'}".`;
      } else if (q.includes('wife') || q.includes('marry') || q.includes('married') || q.includes('partner') || q.includes('love')) {
        if (identity.isMarried && identity.currentPartner) {
          reply = `Yes! I am happily married to ${identity.currentPartner.name} (${identity.currentPartner.objectType}). We tied the knot at ${identity.weddingDetails?.venue || 'The Study Table'}! ❤️`;
        } else {
          reply = `I'm currently searching for love in Matrimony Things! Checking compatibility scores daily.`;
        }
      } else if (q.includes('secret') || q.includes('confess')) {
        reply = `One thing I've never told you: "${identity.secret || identity.secretConfession || 'I secretly judge your handwriting!'}" 🤫`;
      } else if (q.includes('drawer') || q.includes('night') || q.includes('do')) {
        reply = `We organize secret table meetings with the mug and paperclips to discuss human habits.`;
      } else if (q.includes('complaint') || q.includes('annoy')) {
        reply = `Honestly? Being dropped on the floor and then blamed for being misplaced.`;
      } else if (q.includes('happy') || q.includes('job') || q.includes('work')) {
        reply = `I am a ${identity.occupation}. It's a tough gig, but someone has to keep this workspace running!`;
      } else if (q.includes('who') || q.includes('name')) {
        reply = `I am ${identity.humanName}, ${identity.oneLinerBio}`;
      } else {
        reply = `That's deep! But as ${identity.humanName}, my primary concern remains ${identity.strengths[0] || 'doing my job'}.`;
      }

      const objMsg: Message = {
        id: `msg-reply-${Date.now()}`,
        sender: 'object',
        text: reply
      };

      setMessages((prev) => [...prev, objMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans-body">
      <div className="relative w-full max-w-lg h-[580px] bg-[#090e24] border border-cyan-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cyan-400">
              <img src={identity.imageUrl} alt={identity.humanName} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white font-outfit">{identity.humanName}</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-cyan-300 font-semibold">{identity.occupation}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Message List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'object' && (
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300 flex-shrink-0 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-cyan-500 text-slate-950 font-semibold rounded-br-none shadow'
                    : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-cyan-300 italic font-mono pl-9">
              <span>{identity.humanName} is typing</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Sample Questions */}
        <div className="p-2.5 bg-slate-950/70 border-t border-slate-800/80">
          <p className="text-[9px] uppercase font-bold text-slate-500 mb-1.5 px-1">Suggested Questions:</p>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {sampleQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-800 transition-all whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Talk to ${identity.humanName}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <button
            onClick={() => handleSendMessage()}
            className="w-9 h-9 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center transition-colors shadow"
          >
            <Send className="w-4 h-4 fill-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
