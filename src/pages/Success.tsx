import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, ArrowRight, Mail, ShieldCheck } from 'lucide-react';

export default function Success() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 max-w-md mx-auto w-full">
        <Loader2 size={48} className="text-[#005da6] animate-spin mb-4" />
        <h2 className="text-xl font-bold text-gray-700">Filing your claim...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* HEADER - Brand Blue */}
        <div className="bg-[#005da6] p-8 text-white pt-16 pb-20 rounded-b-[3rem] relative z-20 shadow-lg flex flex-col items-center text-center">
          <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-6 animate-in zoom-in duration-500">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold">Claim Filed Successfully!</h1>
          <p className="text-blue-100 text-sm mt-2 opacity-90">Your digital claim has been registered with the provider.</p>
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 px-6 -mt-10 relative z-30 space-y-4">
          
          {/* Confirmation Card - UPDATED TO LIGHT GREEN */}
          <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-100 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="flex items-start gap-4 mb-6">
              {/* Updated Icon Theme to Green */}
              <div className="bg-green-100 p-2 rounded-lg">
                <Mail size={20} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Confirmation Email Sent</h3>
                <p className="text-xs text-gray-500 mt-1">A summary of your claim has been sent to your registered email.</p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-green-100">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium uppercase tracking-wider">Reference ID</span>
                <span className="font-mono font-bold text-gray-700">#CLM-2026-8842</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400 font-medium uppercase tracking-wider">Status</span>
                {/* Updated Status Text to Green */}
                <span className="text-green-600 font-black uppercase">Active Analysis</span>
              </div>
            </div>
          </div>

          {/* Timeline Note - Kept Blue for consistency with bottom bar */}
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 flex gap-3 items-center">
             <CheckCircle2 size={18} className="text-[#005da6] flex-shrink-0" />
             <p className="text-[11px] text-[#005da6] font-medium leading-tight">
               You can track your insurance process timeline and real-time status updates directly from your dashboard.
             </p>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="p-6 bg-white border-t border-gray-100">
          <button 
            onClick={() => navigate('/final-success')}
            className="w-full bg-[#005da6] hover:bg-[#004a85] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Finish <ArrowRight size={20} />
          </button>
          
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-400 w-full"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}