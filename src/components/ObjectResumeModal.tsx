import React from 'react';
import { X, Printer, Briefcase, GraduationCap, Award, Star } from 'lucide-react';
import type { JeevifyIdentity } from '../types';

interface ObjectResumeModalProps {
  identity: JeevifyIdentity;
  isOpen: boolean;
  onClose: () => void;
}

export const ObjectResumeModal: React.FC<ObjectResumeModalProps> = ({ identity, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-sans-body">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 overflow-y-auto border border-slate-200">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              CV
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-900 font-outfit">
              JEEVIFY OBJECT RESUME
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1.5 border border-blue-200 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="space-y-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 print:bg-white print:p-0 print:border-none">
          
          {/* Header section */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-300 pb-4">
            <div className="flex items-center gap-4">
              <img
                src={identity.imageUrl}
                alt={identity.humanName}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-blue-600 shadow"
              />
              <div>
                <h1 className="text-2xl font-extrabold font-outfit text-slate-900">{identity.humanName}</h1>
                <p className="text-sm font-bold text-blue-600">{identity.occupation}</p>
                <p className="text-xs text-slate-500 font-mono">ID: {identity.id} • {identity.origin}</p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500 space-y-1">
              <p><strong className="text-slate-800">Status:</strong> {identity.status}</p>
              <p><strong className="text-slate-800">Social Role:</strong> {identity.socialStatus}</p>
              <p><strong className="text-slate-800">Age:</strong> {identity.age} Years</p>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1.5">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Professional Summary</h2>
            <p className="text-xs text-slate-700 italic font-serif leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
              "{identity.oneLinerBio}"
            </p>
          </div>

          {/* Core Competencies & Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-700">Core Competencies & Skills</h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {identity.skills?.map((sk) => (
                <div key={sk} className="p-2 rounded-lg bg-white border border-slate-200 font-medium flex items-center justify-between">
                  <span>{sk}</span>
                  <Star className="w-3 h-3 text-amber-500 fill-current" />
                </div>
              ))}
            </div>
          </div>

          {/* Experience History */}
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Work Experience</span>
            </h2>
            <div className="space-y-3">
              {identity.linkedIn?.experience?.map((exp) => (
                <div key={exp.id} className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{exp.role}</span>
                    <span className="text-blue-600">{exp.period}</span>
                  </div>
                  <p className="text-slate-600 font-semibold">{exp.company} • {exp.location}</p>
                  <p className="text-slate-600 leading-relaxed pt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
              <span>Education & Credentials</span>
            </h2>
            <div className="space-y-2">
              {identity.linkedIn?.education?.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900">{edu.institution}</h4>
                    <p className="text-blue-600 font-semibold">{edu.degree}</p>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements & Moments */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <h2 className="text-xs font-extrabold uppercase tracking-widest text-blue-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Notable Achievements</span>
            </h2>
            <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
              <li>{identity.jeevifyMoments?.biggestAchievement || 'Successfully delivered daily duties under immense stress.'}</li>
              <li>{identity.strengths?.[0] || 'Never failed during an emergency call.'}</li>
              <li>Maintained 100% attendance across all household duties.</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
