import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, FileText, X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

const CaptureIncident: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  
  // State to store uploaded image previews
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
  });

  // Refs to programmatically open camera or gallery
  const fileInputRefs = {
    front: { camera: useRef<HTMLInputElement>(null), gallery: useRef<HTMLInputElement>(null) },
    back: { camera: useRef<HTMLInputElement>(null), gallery: useRef<HTMLInputElement>(null) },
    side: { camera: useRef<HTMLInputElement>(null), gallery: useRef<HTMLInputElement>(null) },
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, view: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages(prev => ({ ...prev, [view]: imageUrl }));
    }
  };

  const removeImage = (view: string) => {
    setImages(prev => ({ ...prev, [view]: null }));
  };

  // FIXED LOGIC: Requires description > 10 chars AND at least one image uploaded
  const isReady = description.trim().length > 10 && (images.front || images.back || images.side);

  // Photo requirements mapping
  const photoRequirements = [
    { id: 'front', label: 'Front Side', required: false },
    { id: 'back', label: 'Back Side', required: false },
    { id: 'side', label: 'Side View', required: false },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-slate-50 min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* PREMIUM DEEP BLUE HEADER */}
        <div className="bg-[#005da6] p-5 text-white pt-8 pb-10 rounded-b-[2rem] relative z-20 shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full transition-colors -ml-2">
              <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold">Upload Evidence</h1>
          </div>
          <div className="flex items-center justify-between px-1 mt-4">
             <p className="text-blue-100 text-sm font-medium opacity-90">Document the damage</p>
             <span className="text-[10px] font-black bg-blue-800/50 px-2 py-1 rounded-full uppercase tracking-widest text-blue-200">Step 2 of 4</span>
          </div>
          
          {/* Progress Bar in Header */}
          <div className="mt-5 h-1.5 w-full bg-blue-900/50 rounded-full overflow-hidden">
             <div className="h-full bg-orange-500 w-1/2 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></div>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-32 -mt-2 relative z-10">
          
          {/* INCIDENT DESCRIPTION CARD */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 relative">
             <div className="flex items-center gap-2 mb-3">
                <div className="bg-blue-50 p-2 rounded-xl text-[#005da6]">
                   <FileText size={20} />
                </div>
                <h3 className="font-bold text-slate-800">Incident Details</h3>
             </div>
             
             <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe how the damage occurred (e.g., Rear-ended at a traffic light)..."
                className="w-full h-28 bg-slate-50 rounded-2xl p-4 border border-slate-200 outline-none resize-none text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#005da6] focus:ring-2 focus:ring-blue-100 transition-all"
             />
             {description.length > 0 && description.length <= 10 && (
                <p className="text-[10px] text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={12}/> Please provide more detail.</p>
             )}
          </div>

          {/* EVIDENCE PHOTOS SECTION */}
          <div>
             <div className="flex justify-between items-end mb-4 px-2">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Vehicle Photos</h3>
               {/* Helpful hint for the user */}
               {!(images.front || images.back || images.side) && (
                 <span className="text-[10px] font-bold text-red-400">*At least 1 required</span>
               )}
             </div>

             <div className="space-y-4">
               {photoRequirements.map((item) => (
                  <div key={item.id}>
                    {/* Camera Input */}
                    <input 
                      type="file" 
                      accept="image/jpeg, image/png, image/jpg" 
                      capture="environment" 
                      ref={fileInputRefs[item.id as keyof typeof fileInputRefs].camera}
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, item.id)}
                    />
                    
                    {/* Gallery Input */}
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRefs[item.id as keyof typeof fileInputRefs].gallery}
                      className="hidden" 
                      onChange={(e) => handleImageChange(e, item.id)}
                    />

                    {images[item.id] ? (
                      /* IMAGE PREVIEW STATE */
                      <div className="relative rounded-3xl overflow-hidden shadow-md border-2 border-green-500 group h-32">
                         <img 
                           src={images[item.id] as string} 
                           alt={item.label} 
                           className="w-full h-full object-cover cursor-pointer" 
                           onClick={() => fileInputRefs[item.id as keyof typeof fileInputRefs].camera.current?.click()} // Tap to retake
                         />
                         
                         {/* Overlays */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                         
                         <div className="absolute bottom-3 left-3 flex items-center gap-2">
                           <CheckCircle2 size={16} className="text-green-400 fill-white" />
                           <span className="text-white text-xs font-bold drop-shadow-md">{item.label}</span>
                         </div>

                         <button 
                           onClick={(e) => { e.stopPropagation(); removeImage(item.id); }}
                           className="absolute top-3 right-3 bg-red-500/90 text-white p-2 rounded-full backdrop-blur-md hover:bg-red-600 transition-colors shadow-lg"
                         >
                           <X size={16} />
                         </button>
                      </div>
                    ) : (
                      /* EMPTY UPLOAD BOX STATE */
                      <div 
                        onClick={() => fileInputRefs[item.id as keyof typeof fileInputRefs].camera.current?.click()}
                        className="w-full border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all relative overflow-hidden group h-28 bg-blue-50/50 border-blue-200 hover:bg-blue-50 hover:border-[#005da6]/50"
                      >
                         <div className="p-3 rounded-full mb-2 bg-[#005da6] text-white shadow-sm shadow-blue-900/10">
                           <Camera size={20} />
                         </div>
                         
                         <span className="font-bold text-sm text-[#005da6]">
                           Tap to capture {item.label}
                         </span>
                         
                         <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest mt-1">Optional</span>

                         {/* Subtle Gallery Button */}
                         <button 
                           onClick={(e) => { e.stopPropagation(); fileInputRefs[item.id as keyof typeof fileInputRefs].gallery.current?.click(); }}
                           className="absolute bottom-3 right-3 bg-white p-2.5 rounded-xl shadow-sm border border-blue-100 text-blue-400 hover:text-[#005da6] hover:border-blue-300 transition-colors z-10"
                           title="Upload from Gallery"
                         >
                           <Upload size={16} />
                         </button>
                      </div>
                    )}
                  </div>
               ))}
             </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl p-5 border-t border-slate-100 z-30 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
          <button 
            disabled={!isReady}
            onClick={() => navigate('/estimate')}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl ${
              isReady 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:scale-[0.98] shadow-orange-500/25' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles size={20} className={isReady ? 'text-orange-100 animate-pulse' : 'text-slate-300'} />
            Start AI Analysis
          </button>

          {/* Home Bar Indicator */}
          <div className="mt-4 flex justify-center">
              <div className="h-1.5 w-1/3 bg-slate-200 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CaptureIncident;