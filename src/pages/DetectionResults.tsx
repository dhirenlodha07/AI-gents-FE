import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertCircle, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import analyzedCar from '../assets/analyzed-car.jpg'; 

export default function DetectionResults() {
  const navigate = useNavigate();

  const detections = [
    { 
      part: "Front Bumper", 
      severity: "SEVERE", 
      match: "98% MATCH", 
      color: "red",
      description: "Deep dent detected on left side."
    },
    { 
      part: "Left Headlight", 
      severity: "MODERATE", 
      match: "92% MATCH", 
      color: "orange",
      description: "Cracked lens cover visible."
    },
    { 
      part: "Bonnet", 
      severity: "MINOR SCRATCH", 
      match: "88% MATCH", 
      color: "blue",
      description: "Surface level abrasion."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="p-5 flex items-center gap-3 bg-white sticky top-0 z-20 shadow-sm">
          <div className="bg-blue-50 p-2 rounded-full">
            <Search size={22} className="text-[#005da6]" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">AI Analysis Complete</h1>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32 scrollbar-hide">
          
          {/* IMAGE CARD */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 relative group">
            <div className="relative aspect-video bg-gray-900">
              <img 
                src={analyzedCar} 
                alt="Analyzed Damage" 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              />
              {/* Overlay Bounding Boxes (Simulated) */}
              <div className="absolute top-1/2 left-1/4 w-24 h-24 border-2 border-red-500 rounded-lg bg-red-500/10"></div>
              <div className="absolute top-1/3 left-1/2 w-16 h-12 border-2 border-orange-400 rounded-lg bg-orange-400/10"></div>
            </div>
            
            <div className="bg-gray-900 px-5 py-3 flex justify-between items-center">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Model: YOLOv8-Damage</span>
              <span className="text-[10px] font-bold text-green-400 uppercase">Confidence: 94%</span>
            </div>
          </div>

          {/* COLORED DAMAGE LIST */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Identified Damages</h3>
            
            {detections.map((item, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border flex items-start justify-between transition-all hover:scale-[1.02] cursor-default
                  ${item.color === 'red' ? 'bg-red-50 border-red-100' : 
                    item.color === 'orange' ? 'bg-orange-50 border-orange-100' : 
                    'bg-blue-50 border-blue-100'
                  }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon with specific color */}
                  <div className={`mt-1 p-1.5 rounded-full ${
                    item.color === 'red' ? 'bg-red-100 text-red-600' : 
                    item.color === 'orange' ? 'bg-orange-100 text-orange-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {item.color === 'red' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 text-base">{item.part}</h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] font-black uppercase tracking-wider ${
                        item.color === 'red' ? 'text-red-600' : 
                        item.color === 'orange' ? 'text-orange-600' : 
                        'text-blue-600'
                      }`}>
                        {item.severity}
                      </span>
                      <span className="text-[10px] text-gray-400 font-bold">• {item.match}</span>
                    </div>
                  </div>
                </div>

                {/* Color Indicator Dot */}
                <div className={`w-3 h-3 rounded-full mt-2 shadow-sm ${
                    item.color === 'red' ? 'bg-red-500' : 
                    item.color === 'orange' ? 'bg-orange-400' : 
                    'bg-blue-400'
                }`}></div>
              </div>
            ))}
          </div>

          {/* INFO BOX */}
          <div className="bg-gray-100 p-4 rounded-xl flex gap-3 items-start opacity-70">
            <Info size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              These damages have been automatically detected by AI. You can review the cost breakdown in the next step.
            </p>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md p-5 border-t border-gray-100 z-30 rounded-t-[2rem]">
          <button
            onClick={() => navigate('/estimate')}
            className="w-full bg-[#005da6] hover:bg-black text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Generate Cost Estimate
            <ArrowRight size={20} />
          </button>
          
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-1/2"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}