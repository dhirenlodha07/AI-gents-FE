import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Home } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    // OUTER WRAPPER: Centers the app on the screen
    <div className="min-h-screen bg-gray-100 flex justify-center">
      
      {/* MOBILE CONTAINER: Maintains the phone width & height */}
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-32">
          
          {/* Success Animation Circle */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <Check size={48} className="text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">Claim Submitted!</h1>
          
          <p className="text-gray-500 mb-8">
            Your Claim ID is <span className="font-mono font-bold text-gray-800">#CLM-992</span>. 
            <br />
            <span className="font-bold text-green-600">₹12,900</span> will be credited to your account within 24 hours.
          </p>

          {/* Next Steps Card */}
          <div className="w-full bg-gray-50 rounded-xl p-5 text-left border border-gray-100">
            <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">What happens next?</h3>
            <ul className="text-sm text-gray-500 space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Verification team may call you
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Track status in "My Claims"
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                Funds transferred after approval
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BUTTON - Fixed Position (Strict Layout Rule) */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gray-900 text-white p-4 rounded-xl font-bold text-lg shadow-lg hover:bg-black transition-all active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default Success;