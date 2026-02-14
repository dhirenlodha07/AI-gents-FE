import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Car, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

// --- 1. IMPORT YOUR IMAGE HERE ---
// Make sure the image file is saved at this path in your project
import evidenceBumper from '../assets/evidence-bumper.jpg'; 

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPayout = "12,500";
  const vehicleNumber = "MH-12-DE-1443";

  // --- 2. UPDATE IMAGE LOGIC ---
  // Retrieve captured image passed from previous screens, OR use your new hardcoded image as the default.
  const passedImage = location.state?.image;
  
  // This ensures your new image is always "Evidence 0" unless a real photo was taken in the flow
  const displayImages = passedImage ? [passedImage] : [evidenceBumper];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/garages'); 
    }, 1500);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 max-w-md mx-auto w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#005da6] mb-4"></div>
        <h2 className="text-lg font-bold text-gray-800 animate-pulse">Saving Details...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center w-full">
      <div className="w-full max-w-md relative bg-slate-50 min-h-screen pb-32">
        
        {/* HEADER */}
        <div className="bg-[#005da6] pt-12 pb-24 px-6 rounded-b-[3rem] shadow-xl text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={20} className="text-blue-200" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-200">Step 3 of 4</span>
          </div>
          <h1 className="text-3xl font-bold">Review Claim</h1>
          <p className="text-blue-100 text-xs mt-1">Verify your information before finding a garage.</p>
        </div>

        {/* CONTENT STACK */}
        <div className="px-4 -mt-16 space-y-4 relative z-10">

          {/* 1. SUMMARY CARD */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#005da6]"></div>
            <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-wider mb-4">Vehicle & Policy Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-[#005da6]">
                  <Car size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Vehicle Number</p>
                  <p className="font-bold text-gray-800 font-mono text-lg">{vehicleNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-orange-50 p-3 rounded-xl text-orange-600">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Incident Date</p>
                  <p className="font-bold text-gray-800 text-base">14 Feb 2026, 04:10 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500">Approved Payout</span>
              <span className="text-2xl font-black text-[#16a34a]">₹ {totalPayout}</span>
            </div>
          </div>

          {/* 2. EVIDENCE CARD */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Photo Evidence</h3>
               <span className="bg-blue-50 text-[#005da6] text-[10px] px-2 py-1 rounded-full font-black">
                 {displayImages.length} Captured
               </span>
            </div>
            
            {/* 3. IMAGE GRID - Your image will appear here */}
            <div className="grid grid-cols-2 gap-3">
              {displayImages.map((img: string, idx: number) => (
                <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-100 bg-gray-900 group">
                  <img src={img} alt={`Evidence ${idx}`} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
                    <CheckCircle size={12} className="text-[#005da6]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="fixed bottom-0 w-full max-w-md p-5 bg-white/90 backdrop-blur-md border-t border-gray-100 z-50 rounded-t-[2rem]">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#005da6] hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Confirm & Find Garage
            <ArrowRight size={20} />
          </button>
          
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-3/4"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}