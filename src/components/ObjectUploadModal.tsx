import React, { useState, useRef } from 'react';
import { X, Upload, Type, Sparkles, RefreshCw, ArrowRight, Camera as CameraIcon } from 'lucide-react';
import { analyzeAndJeevifyObject, generateIdentityFromRules, fileToDataUrl } from '../services/aiGenerator';
import type { JeevifyIdentity } from '../types';

interface ObjectUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (identity: JeevifyIdentity) => void;
  initialObjectType?: string;
}

export const ObjectUploadModal: React.FC<ObjectUploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialObjectType = ''
}) => {
  const [step, setStep] = useState<'input' | 'hero-revealed' | 'jeevifying'>('input');
  const [activeTab, setActiveTab] = useState<'upload' | 'camera' | 'type'>('upload');
  const [textInput, setTextInput] = useState(initialObjectType);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Intelligence Discovery State
  const [pendingIdentity, setPendingIdentity] = useState<JeevifyIdentity | null>(null);
  const [confidenceScore, setConfidenceScore] = useState<number>(0.95);
  const [customTypeEdit, setCustomTypeEdit] = useState('');
  const [isEditingType, setIsEditingType] = useState(false);

  // Jeevifying animation state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepLogs, setStepLogs] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const [analysisFailed, setAnalysisFailed] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = async (file: File) => {
    setSelectedFile(file);
    const dataUrl = await fileToDataUrl(file);
    setPreviewUrl(dataUrl);
    processObject(file, textInput);
  };

  const startWebcam = async () => {
    try {
      setActiveTab('camera');
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Webcam permission denied or unavailable:', err);
      alert('Camera access unavailable. Please choose Upload Image or Type Object option.');
      setActiveTab('upload');
    }
  };

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t: MediaStreamTrack) => t.stop());
      mediaStreamRef.current = null;
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'captured_object.jpg', { type: 'image/jpeg' });
          setSelectedFile(file);
          const dataUrl = await fileToDataUrl(file);
          setPreviewUrl(dataUrl);
          stopWebcam();
          processObject(file, textInput);
        }
      }, 'image/jpeg');
    }
  };

  const processObject = async (file?: File | null, typedText?: string) => {
    try {
      const result = await analyzeAndJeevifyObject(file || selectedFile, typedText || textInput);
      if (result.failed || !result.identity) {
        setAnalysisFailed(true);
        setPendingIdentity(null);
      } else {
        setAnalysisFailed(false);
        setPendingIdentity(result.identity);
        setConfidenceScore(result.confidence);
        setCustomTypeEdit(result.detectedType);
        setStep('hero-revealed');
      }
    } catch (err) {
      console.error('Error analyzing object:', err);
      setAnalysisFailed(true);
    }
  };

  const handleUpdateCustomType = () => {
    if (!customTypeEdit.trim()) return;
    const newIdentity = generateIdentityFromRules(customTypeEdit, previewUrl || undefined);
    setPendingIdentity(newIdentity);
    setIsEditingType(false);
  };

  const handleStartJeevifying = () => {
    if (!pendingIdentity) return;
    setStep('jeevifying');
    setCurrentStepIndex(0);

    const steps = [
      'IDENTIFYING...',
      'WE FOUND A',
      `${pendingIdentity.objectType.toUpperCase()}.`,
      "BUT THAT'S JUST WHAT IT IS.",
      "LET'S FIND OUT WHO IT IS...",
      `MEET ${pendingIdentity.humanName.toUpperCase()}. ${pendingIdentity.occupation}.`,
      'JEEVIFICATION COMPLETE!'
    ];
    setStepLogs(steps);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev: number) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 600);

    setTimeout(() => {
      onSuccess(pendingIdentity);
      handleClose();
    }, steps.length * 600 + 200);
  };

  const handleClose = () => {
    stopWebcam();
    setStep('input');
    setSelectedFile(null);
    setPreviewUrl(null);
    setPendingIdentity(null);
    setIsEditingType(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#030712]/90 backdrop-blur-xl animate-fade-in font-sans-body">
      <div className="relative w-full max-w-2xl bg-[#090d1a] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-10 text-slate-100 overflow-hidden">
        
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800/80 transition-colors z-30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================ */}
        {/* STEP 1: INITIAL DISCOVERY STATE ("WHAT SHOULD WE GIVE A LIFE TO?") */}
        {/* ============================================================ */}
        {step === 'input' && !analysisFailed && (
          <div className="space-y-8 py-2">
            
            <div className="space-y-2 text-center max-w-md mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif-heading text-white tracking-tight leading-tight uppercase">
                SHOW ME SOMETHING.
              </h2>
              <p className="text-xs sm:text-sm text-cyan-300/80 font-serif italic">
                Anything around you.
              </p>
            </div>

            {/* Input Options Switcher (Restrained Editorial Tabs) */}
            <div className="flex justify-center border-b border-slate-800 pb-3 gap-6 text-xs font-semibold">
              <button
                onClick={() => { stopWebcam(); setActiveTab('upload'); }}
                className={`pb-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'upload' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>DROP A PHOTO</span>
              </button>

              <button
                onClick={startWebcam}
                className={`pb-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'camera' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <CameraIcon className="w-3.5 h-3.5" />
                <span>TAKE A PHOTO</span>
              </button>

              <button
                onClick={() => { stopWebcam(); setActiveTab('type'); }}
                className={`pb-2 transition-all flex items-center gap-1.5 ${
                  activeTab === 'type' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>TYPE A THING</span>
              </button>
            </div>

            {/* TAB CONTENT: UPLOAD */}
            {activeTab === 'upload' && (
              <div className="space-y-4">
                <label className="border border-slate-800 hover:border-cyan-500/50 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer bg-slate-900/30 hover:bg-slate-900/80 transition-all text-center group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
                    className="hidden"
                  />
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform border border-cyan-500/20">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-200">
                      Drop an object photo here
                    </p>
                    <p className="text-xs text-slate-500">
                      or click to browse from device
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* TAB CONTENT: CAMERA */}
            {activeTab === 'camera' && (
              <div className="space-y-4 text-center">
                <div className="relative w-full h-64 bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={capturePhoto}
                  className="px-8 py-3 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg hover:bg-cyan-300 transition-all"
                >
                  Capture Object Photo
                </button>
              </div>
            )}

            {/* TAB CONTENT: TYPE */}
            {activeTab === 'type' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="e.g. charger, stapler, shoe, laptop, spoon, potato, coconut..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && processObject(null, textInput)}
                    className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl px-5 py-4 text-base focus:outline-none focus:border-cyan-400 text-white placeholder-slate-600"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">Quick Pick:</span>
                  {['Stapler', 'Charger', 'Shoe', 'Laptop', 'Chair', 'Bottle', 'Spoon', 'Coconut'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setTextInput(item);
                        processObject(null, item);
                      }}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => processObject(null, textInput)}
                  className="w-full py-4 rounded-2xl font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-xl transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>ANALYZE OBJECT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

        {/* ============================================================ */}
        {/* FAILURE / AMBIGUOUS VISION STATE (Section 4 Requirement) */}
        {/* ============================================================ */}
        {analysisFailed && (
          <div className="space-y-6 py-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <RefreshCw className="w-8 h-8" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <h3 className="text-2xl font-extrabold font-serif-heading text-amber-300">
                WE COULDN'T IDENTIFY THIS THING YET.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-serif leading-relaxed">
                Our vision model was unsure about this photo. Tell us what it is or try another clear photo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setAnalysisFailed(false);
                  setStep('input');
                  setActiveTab('upload');
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs shadow-lg transition-all"
              >
                TRY AGAIN WITH ANOTHER PHOTO
              </button>

              <button
                onClick={() => {
                  setAnalysisFailed(false);
                  setStep('input');
                  setActiveTab('type');
                }}
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-all"
              >
                TELL US WHAT IT IS
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 2: HERO REVEALED DISCOVERY STATE ("WE FOUND A [CHARGER]") */}
        {/* ============================================================ */}
        {step === 'hero-revealed' && pendingIdentity && (
          <div className="space-y-6 py-2 animate-fade-in">
            
            {/* Discovery Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  OBJECT DISCOVERY • CONFIDENCE {Math.round(confidenceScore * 100)}%
                </span>
              </div>

              {!isEditingType ? (
                <button
                  onClick={() => setIsEditingType(true)}
                  className="text-xs text-slate-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
                >
                  <span>THAT'S NOT IT?</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customTypeEdit}
                    onChange={(e) => setCustomTypeEdit(e.target.value)}
                    className="bg-slate-900 border border-slate-700 px-2.5 py-1 text-xs text-white rounded-lg"
                  />
                  <button
                    onClick={handleUpdateCustomType}
                    className="px-2.5 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>

            {/* HERO OBJECT PORTRAIT DISPLAY (Section 2 & 13) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Hero Image Container */}
              <div className="sm:col-span-5 relative group">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-950">
                  <img
                    src={pendingIdentity.imageUrl}
                    alt={pendingIdentity.objectType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                      JEEVIFY ID: {pendingIdentity.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Object Intelligence & First Impression Stack */}
              <div className="sm:col-span-7 space-y-4">
                
                <div className="space-y-1">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400">
                    WE FOUND A
                  </span>
                  <h2 className="text-3xl font-extrabold font-serif-heading text-white">
                    {pendingIdentity.objectType.toUpperCase()}
                  </h2>
                  <p className="text-xs font-bold text-slate-300 font-serif italic">
                    "{pendingIdentity.firstImpression}"
                  </p>
                </div>

                {/* Funny Observation */}
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">OBSERVATION</span>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {pendingIdentity.funnyObservation}
                  </p>
                </div>

                {/* Profession & Currently Status Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[9px] font-mono text-cyan-400 uppercase font-bold">PROFESSION</span>
                    <p className="font-bold text-slate-200 truncate">{pendingIdentity.occupation}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-[9px] font-mono text-amber-400 uppercase font-bold">CURRENTLY</span>
                    <p className="font-bold text-slate-200 truncate">{pendingIdentity.currently}</p>
                  </div>
                </div>

                {/* Signature Quote */}
                <p className="text-xs italic font-serif text-slate-400 border-l-2 border-cyan-400 pl-3">
                  "{pendingIdentity.objectQuote}"
                </p>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleStartJeevifying}
                className="flex-1 py-4 px-6 rounded-2xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 shadow-xl active:scale-95 transition-all text-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4.5 h-4.5 fill-slate-950" />
                <span>GIVE IT A LIFE</span>
              </button>

              <button
                onClick={() => {
                  setStep('input');
                  setActiveTab('type');
                }}
                className="py-4 px-5 rounded-2xl font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>CHANGE OBJECT</span>
              </button>
            </div>

          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 3: CINEMATIC "JEEVIFYING..." EXPERIENCE (Section 18) */}
        {/* ============================================================ */}
        {step === 'jeevifying' && pendingIdentity && (
          <div className="py-12 text-center space-y-8 animate-fade-in">
            
            {/* Visual Hero Centerpiece */}
            <div className="relative w-44 h-44 mx-auto">
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping" />
              <div className="relative w-full h-full rounded-full border-4 border-cyan-400/50 border-t-cyan-400 animate-spin p-1.5">
                <img
                  src={pendingIdentity.imageUrl}
                  alt={pendingIdentity.objectType}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <div className="space-y-3 max-w-sm mx-auto">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                JEEVIFYING IN PROGRESS
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold font-serif-heading text-white">
                {pendingIdentity.objectType.toUpperCase()}
              </h3>
              <p className="text-xs font-mono font-bold text-cyan-300 min-h-[1.5rem] transition-all">
                {stepLogs[currentStepIndex]}
              </p>
            </div>

            {/* Cinematic Progress Bar */}
            <div className="w-64 mx-auto bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / stepLogs.length) * 100}%` }}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
