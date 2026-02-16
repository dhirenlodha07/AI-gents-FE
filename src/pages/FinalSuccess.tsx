import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CheckCircle2 } from 'lucide-react';

const FinalSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    // 'h-[100dvh]' ensures it fills the exact mobile screen height (no scroll)
    <div className="h-[100dvh] w-full bg-[#005da6] flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
        
        {/* Background Glows (Pointer events none to prevent interference) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>

        {/* Main Content - Centered */}
        <div className="z-10 flex flex-col items-center text-center w-full max-w-xs animate-in zoom-in duration-500">
            
            {/* Success Icon */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-blue-900/40">
                <CheckCircle2 size={48} className="text-[#005da6]" strokeWidth={3} />
            </div>

            <h1 className="text-3xl font-black mb-3 tracking-tight">THANK YOU</h1>
            
            <p className="text-blue-100 text-base mb-10 leading-relaxed opacity-90">
                Your claim process has been initiated successfully.
            </p>

            {/* Info Box - Glassmorphism */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-full mb-8 shadow-lg">
                <p className="text-sm font-medium leading-relaxed text-blue-50">
                    Our team will contact you shortly regarding the vehicle pickup.
                </p>
            </div>
        </div>

        {/* Bottom Button - Pushed to bottom safe area if needed, or kept centered */}
        <div className="z-10 w-full max-w-xs mt-4">
            <button 
                onClick={() => navigate('/')}
                className="w-full bg-white text-[#005da6] font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all active:scale-[0.98]"
            >
                <Home size={20} />
                Go to Dashboard
            </button>
        </div>

    </div>
  );
}

export default FinalSuccess;