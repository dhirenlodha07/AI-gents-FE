import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Camera, FileText, XCircle, RefreshCw, Check, MessageSquare } from 'lucide-react';

const CaptureIncident: React.FC = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  
  // 1. FORM STATE
  const [description, setDescription] = useState(''); 
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
  });

  // 2. FEEDBACK STATE
  const [photoFeedback, setPhotoFeedback] = useState<{ [key: string]: string }>({
    front: '',
    back: '',
    side: '',
  });

  // 3. OVERLAY STATE
  const [activeView, setActiveView] = useState<string | null>(null); 
  const [tempImage, setTempImage] = useState<string | null>(null); 
  const [tempFeedback, setTempFeedback] = useState(''); 

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setTempImage(imageSrc); 
    }
  }, [webcamRef]);

  const handleSave = () => {
    if (tempImage && activeView) {
      setImages(prev => ({ ...prev, [activeView]: tempImage }));
      setPhotoFeedback(prev => ({ ...prev, [activeView]: tempFeedback }));
      setTempImage(null);
      setTempFeedback('');
      setActiveView(null);
    }
  };

  const hasAtLeastOneImage = images.front || images.back || images.side;
  const canAnalyze = hasAtLeastOneImage && description.trim().length > 5;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-gray-50 h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-[#005da6] p-4 shadow-sm flex items-center gap-4 sticky top-0 z-20 text-white rounded-b-2xl">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold">Incident Details</h1>
            <p className="text-[10px] text-blue-200 font-black uppercase tracking-widest">Step 2 of 4</p>
          </div>
        </div>

        {/* FORM CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-40 scrollbar-hide">
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#005da6] h-full w-1/2 transition-all duration-500"></div>
          </div>

          {/* INCIDENT DESCRIPTION BOX */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-[#005da6]" />
              <label className="text-sm font-bold text-gray-800">Incident Description</label>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the incident for the claim record..."
              className="w-full p-4 bg-blue-50/60 hover:bg-blue-50 border border-blue-100 rounded-xl text-sm h-32 focus:bg-white focus:ring-2 focus:ring-[#005da6] focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none"
            />
          </div>

          {/* Photo Slots */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2 px-1">
              <Camera size={14} /> Evidence Photos
            </h3>
            {['front', 'back', 'side'].map((view) => (
              <div key={view} className={`bg-white p-3 rounded-xl border transition-all flex items-center justify-between ${images[view] ? 'border-green-100 shadow-sm' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                    {images[view] ? (
                      <img src={images[view]!} className="w-full h-full object-cover" alt={view} />
                    ) : (
                      <Camera size={20} className="text-gray-300" />
                    )}
                  </div>
                  <div>
                    <span className="capitalize font-bold text-gray-800 block text-sm">{view} View</span>
                    {photoFeedback[view] && (
                      <span className="text-[9px] text-blue-500 font-bold bg-blue-50 px-1 rounded">Feedback Saved</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    images[view] ? 'bg-gray-100 text-gray-600' : 'bg-[#005da6] text-white shadow-md'
                  }`}
                >
                  {images[view] ? 'Retake' : 'Capture'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] rounded-t-3xl">
          <button 
            onClick={() => navigate('/processing', { 
              state: { 
                capturedImages: images, 
                description: description, 
                viewFeedback: photoFeedback 
              } 
            })}
            disabled={!canAnalyze}
            className={`w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              canAnalyze ? 'bg-[#005da6] text-white shadow-xl shadow-blue-500/30' : 'bg-gray-100 text-gray-300'
            }`}
          >
            Start AI Analysis <ChevronRight size={20} />
          </button>
        </div>

        {/* OVERLAY SECTION */}
        {activeView && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
            <div className="p-6 flex justify-between items-center bg-black/60 backdrop-blur-md text-white">
              <button onClick={() => {setActiveView(null); setTempImage(null); setTempFeedback('')}}>
                <XCircle size={28} />
              </button>
              <span className="capitalize font-bold tracking-wide text-xs">Capturing {activeView}</span>
              <div className="w-7"></div>
            </div>

            <div className="flex-1 relative flex items-center justify-center bg-zinc-950">
              {!tempImage ? (
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="w-full h-full object-cover"
                  videoConstraints={{ facingMode: "environment" }}
                  playsInline={true} // <--- FIX: Forces inline playback on mobile
                />
              ) : (
                <img src={tempImage} className="w-full h-full object-contain" alt="Review" />
              )}
            </div>

            <div className="p-8 bg-zinc-950 flex flex-col gap-6 items-center">
              {tempImage && (
                <div className="w-full max-w-xs animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 mb-2 text-white/60">
                    <MessageSquare size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#005da6]">Feedback</span>
                  </div>
                  <input 
                    type="text"
                    value={tempFeedback}
                    onChange={(e) => setTempFeedback(e.target.value)}
                    placeholder="Describe specific details for this photo..."
                    className="w-full bg-white/10 border border-white/20 rounded-xl p-3.5 text-white text-sm outline-none focus:border-[#005da6] transition-all"
                  />
                </div>
              )}

              <div className="flex justify-center items-center gap-12 w-full">
                {!tempImage ? (
                  <button onClick={capture} className="w-20 h-20 bg-white rounded-full border-[6px] border-zinc-800 flex items-center justify-center">
                     <div className="w-16 h-16 bg-white rounded-full border-2 border-zinc-200"></div>
                  </button>
                ) : (
                  <>
                    <button onClick={() => {setTempImage(null); setTempFeedback('')}} className="flex flex-col items-center text-white/70 gap-3">
                      <div className="p-4 bg-zinc-800 rounded-full border border-zinc-700"><RefreshCw size={24} /></div>
                      <span className="text-[10px] font-bold uppercase tracking-tighter">Retake</span>
                    </button>
                    <button onClick={handleSave} className="flex flex-col items-center text-white gap-3">
                      <div className="p-5 bg-[#005da6] rounded-full shadow-2xl shadow-blue-500/40">
                        <Check size={28} strokeWidth={3} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#005da6]">Keep Photo</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptureIncident;