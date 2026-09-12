import React, { useState } from 'react';
import { Briefcase, CheckCircle, MapPin, Clock, ThumbsUp, MessageSquare, Share2, GraduationCap, FileText } from 'lucide-react';
import type { JeevifyIdentity, LinkedInPost } from '../types';
import { ObjectResumeModal } from './ObjectResumeModal';

import { ensureCompleteIdentity } from '../services/aiGenerator';

interface LinkedInViewProps {
  identity?: JeevifyIdentity | null;
}

export const LinkedInView: React.FC<LinkedInViewProps> = ({ identity: rawIdentity }) => {
  const identity = ensureCompleteIdentity(rawIdentity);
  const [activeTab, setActiveTab] = useState<'Posts' | 'About' | 'Experience' | 'Skills' | 'Interests'>('Posts');
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [posts, setPosts] = useState<LinkedInPost[]>(identity.linkedIn?.posts || []);
  const [newPostText, setNewPostText] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const toggleConnect = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = () => {
    if (!newPostText.trim()) return;
    const newPost: LinkedInPost = {
      id: `post-${Date.now()}`,
      authorName: identity.humanName,
      authorTitle: identity.occupation,
      authorImage: identity.imageUrl,
      timeAgo: 'Just now',
      content: newPostText,
      imageUrl: identity.imageUrl,
      likes: 1,
      comments: 0,
      shares: 0
    };
    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const linkedIn = identity.linkedIn;

  return (
    <div className="bg-[#f3f6f8] text-[#1a202c] min-h-[calc(100vh-4rem)] p-4 sm:p-6 rounded-3xl space-y-6 animate-fade-in font-sans-body shadow-xl border border-slate-200">
      
      {/* Header Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow">
            in
          </div>
          <div>
            <h1 className="text-lg font-bold font-outfit text-slate-900 leading-tight">
              LinkedIn Things
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Build your professional object identity
            </p>
          </div>
        </div>

        {/* Object Resume Generator Button (Section 34) */}
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md"
        >
          <FileText className="w-4 h-4" />
          <span>OBJECT RESUME</span>
        </button>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-6">
        
        {/* Cover Photo */}
        <div className="relative h-44 sm:h-56 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 overflow-hidden">
          <img
            src={identity.imageUrl}
            alt="Cover"
            className="w-full h-full object-cover opacity-50 blur-sm scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <span className="text-white/80 font-serif italic text-sm sm:text-base">
              "Same {identity.objectType}. Bigger Dreams."
            </span>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 sm:px-8 pb-6 -mt-16 sm:-mt-20 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-xl bg-white">
              <img
                src={identity.imageUrl}
                alt={identity.humanName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsResumeModalOpen(true)}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Resume</span>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900">
                {identity.humanName}
              </h2>
              <CheckCircle className="w-5 h-5 text-blue-600 fill-current" />
            </div>

            <p className="text-base font-semibold text-slate-700">
              {identity.occupation}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {linkedIn?.location || identity.origin}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {linkedIn?.experienceYears || identity.age} yrs experience
              </span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] border border-emerald-300">
                ● Open to Work
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 italic font-serif max-w-2xl bg-slate-50 p-3 rounded-xl border border-slate-200">
            "{linkedIn?.aboutQuote || identity.oneLinerBio}"
          </p>

          {/* Master Rebuild Parody LinkedIn Interactive Action Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => alert(`🎉 You endorsed ${identity.humanName}'s primary skill: "${identity.skills?.[0] || 'Core Duty'}"!`)}
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors"
            >
              👍 ENDORSE SKILL
            </button>

            <button
              onClick={() => alert(`💼 CAREER ADVICE FROM ${identity.humanName.toUpperCase()}:\n\n"${identity.objectQuote || identity.oneLinerBio}"`)}
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors"
            >
              ❓ ASK ABOUT CAREER
            </button>

            <button
              onClick={() => alert(`👥 DESK COLLEAGUES:\n\n1. Coffee Mug (Morning Lead)\n2. Sticky Notes (Task Manager)\n3. Desk Organizer (Operations VP)`)}
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors"
            >
              🤝 MEET COLLEAGUES
            </button>

            <button
              onClick={() => alert(`💰 ${identity.humanName.toUpperCase()}'S MONTHLY COMPENSATION:\n\n"3 cups of spilled tea, 142 paper signatures, and 1 clean wooden surface."`)}
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200 transition-colors"
            >
              💵 WHAT DO YOU EARN?
            </button>
          </div>

        </div>

      </div>

      {/* Main Grid: Left Timeline/Feed + Right Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex items-center gap-1 overflow-x-auto">
            {['Posts', 'About', 'Experience', 'Skills', 'Interests'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Posts' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={identity.imageUrl}
                    alt={identity.humanName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30"
                  />
                  <input
                    type="text"
                    placeholder="Start a post about your object journey..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreatePost()}
                    className="flex-1 bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                  />
                  <button
                    onClick={handleCreatePost}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>

              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorImage}
                        alt={post.authorName}
                        className="w-11 h-11 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                        <p className="text-[11px] text-slate-500">{post.timeAgo}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-sans">
                    {post.content}
                  </p>

                  {post.imageUrl && (
                    <div className="rounded-xl overflow-hidden max-h-80 border border-slate-200">
                      <img src={post.imageUrl} alt="Post media" className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>👍 {post.likes}</span>
                    <div className="flex gap-3">
                      <span>💬 {post.comments} comments</span>
                      <span>🔄 {post.shares} shares</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-600">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="py-2 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Like</span>
                    </button>

                    <button className="py-2 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span>Comment</span>
                    </button>

                    <button className="py-2 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {(activeTab === 'Experience' || activeTab === 'About') && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Experience History</span>
              </h3>

              <div className="space-y-6 pt-2">
                {linkedIn?.experience?.map((exp) => (
                  <div key={exp.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-rose-600 font-bold text-base flex-shrink-0">
                      {exp.logoType === 'mcdonalds' ? 'M' : exp.logoType === 'book' ? '📖' : '💼'}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{exp.role}</h4>
                      <p className="text-xs font-semibold text-blue-600">{exp.company}</p>
                      <p className="text-[11px] text-slate-500">{exp.period} • {exp.location}</p>
                      <p className="text-xs text-slate-600 leading-relaxed pt-1">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === 'Experience' || activeTab === 'About') && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <span>Education</span>
              </h3>

              <div className="space-y-4 pt-1">
                {linkedIn?.education?.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-base flex-shrink-0">
                      🎓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{edu.institution}</h4>
                      <p className="text-xs font-semibold text-blue-600">{edu.degree}</p>
                      <p className="text-[11px] text-slate-500">{edu.period} • {edu.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 font-outfit">
                PEOPLE YOU MAY KNOW
              </h3>
              <button className="text-xs font-bold text-blue-600 hover:underline">See all →</button>
            </div>

            <div className="space-y-3">
              {linkedIn?.peopleYouMayKnow?.map((person) => (
                <div key={person.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{person.name}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{person.role} • {person.connectionDegree}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnect(person.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                      connectedIds.includes(person.id)
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    {connectedIds.includes(person.id) ? 'Connected' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Object Resume Modal */}
      <ObjectResumeModal
        identity={identity}
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

    </div>
  );
};

