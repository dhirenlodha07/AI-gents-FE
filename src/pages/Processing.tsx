import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, BrainCircuit, Server, CheckCircle2 } from 'lucide-react';

export default function Processing() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing AI Models...");

  useEffect(() => {
    // 1. Progress Bar Animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2; // Speed of progress
      });
    }, 60);

    // 2. Status Text Updates (Simulating AI steps)
    setTimeout(() => setStatus("Scanning Image Geometry..."), 1000);
    setTimeout(() => setStatus("Identifying Vehicle Parts..."), 2000);
    setTimeout(() => setStatus("Detecting Surface Damage..."), 3000);
    setTimeout(() => setStatus("Finalizing Analysis..."), 4000);

    // 3. Navigation to Next Page
    const redirectTimer = setTimeout(() => {
      navigate('/detection'); // <--- Navigates to the new Detection Page
    }, 4500);

    return () => {
      clearInterval(interval);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
      
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        
        {/* Animated Icon Scanner */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse"></div>
          <div className="bg-gray-800 p-6 rounded-2xl border border-blue-500/50 shadow-2xl relative overflow-hidden">
            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-400 shadow-[0_0_15px_rgba(59,130,246,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
            
            <Scan size={64} className="text-blue-400" />
          </div>
        </div>

        {/* Status Text */}
        <h2 className="text-2xl font-bold mb-2 animate-pulse">{progress < 100 ? "Processing..." : "Complete!"}</h2>
        <p className="text-blue-200 text-sm mb-8 h-6">{status}</p>

        {/* Progress Bar Container */}
        <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden border border-gray-700 mb-4 relative">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer Effect on Bar */}
            <div className="absolute top-0 right-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-[shimmer_1s_infinite]"></div>
          </div>
        </div>

        {/* Percentage */}
        <div className="w-full flex justify-between text-xs text-gray-500 font-mono">
          <span>AI-GENTS CLOUD</span>
          <span>{progress}%</span>
        </div>

        {/* AI Steps (Visual Decoration) */}
        <div className="mt-12 grid grid-cols-3 gap-4 w-full opacity-50">
          <div className={`flex flex-col items-center gap-2 transition-colors ${progress > 30 ? 'text-blue-400' : 'text-gray-600'}`}>
            <Server size={20} />
            <span className="text-[10px]">UPLOAD</span>
          </div>
          <div className={`flex flex-col items-center gap-2 transition-colors ${progress > 60 ? 'text-blue-400' : 'text-gray-600'}`}>
            <BrainCircuit size={20} />
            <span className="text-[10px]">ANALYZE</span>
          </div>
          <div className={`flex flex-col items-center gap-2 transition-colors ${progress > 90 ? 'text-blue-400' : 'text-gray-600'}`}>
            <CheckCircle2 size={20} />
            <span className="text-[10px]">RESULT</span>
          </div>
        </div>

      </div>

      {/* CSS for Keyframe Animations (Add to your global CSS or keep here for simplicity) */}
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}