import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scan, CheckCircle2, Loader2, BrainCircuit } from 'lucide-react';

const Processing: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps = [
    "Uploading secure images...",
    "Scanning for exterior damage...",
    "Identifying vehicle parts...",
    "Calculating repair costs...",
    "Finalizing assessment..."
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);

    const redirectTimer = setTimeout(() => {
      navigate('/estimate');
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(redirectTimer);
    };
  }, [navigate, steps.length]);

  return (
    // DARK THEME for "High Tech" feel, but same Mobile Layout Dimensions
    <div className="min-h-screen bg-gray-900 flex justify-center">
      <div className="w-full max-w-md h-[100dvh] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gray-900 shadow-2xl">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>

        {/* Scanner Animation */}
        <div className="relative z-10 mb-10">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-ping"></div>
          <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-full border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
            <Scan size={64} className="text-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Text */}
        <h2 className="text-2xl font-bold text-white mb-2 relative z-10 flex items-center justify-center gap-2">
          <BrainCircuit size={24} className="text-blue-500" />
          AI Analysis
        </h2>
        
        <div className="h-8 mb-10 relative z-10">
          <p key={step} className="text-blue-300 animate-in fade-in slide-in-from-bottom-2 duration-300 font-mono text-sm">
            {steps[step]}
          </p>
        </div>

        {/* Steps Visualizer */}
        <div className="w-full max-w-xs space-y-4 relative z-10 pl-8">
          {steps.map((s, i) => (
            <div key={i} className={`flex items-center gap-4 text-sm transition-all duration-500 ${i <= step ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              {i < step ? (
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
              ) : i === step ? (
                <Loader2 size={18} className="text-blue-400 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-gray-700 shrink-0 ml-0.5" />
              )}
              <span className={i === step ? 'text-white font-medium' : 'text-gray-600'}>{s}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Processing;