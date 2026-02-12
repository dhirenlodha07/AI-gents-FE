import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

const Success: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          {/* Loading/Success Icon */}
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle size={48} className="text-green-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Claim Filed successfully.</h2>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 w-full text-left space-y-3">
             <p className="text-gray-600 text-sm flex gap-2">
               <span className="text-blue-500 font-bold">•</span> Confirmation Email will be sent shortly.
             </p>
             <p className="text-gray-600 text-sm flex gap-2">
               <span className="text-blue-500 font-bold">•</span> Check email for tracking your insurance process timeline/status.
             </p>
          </div>
        </div>

        {/* The "Next" Button as per Diagram */}
        <div className="p-5 border-t border-gray-100">
          <button 
            onClick={() => navigate('/garages')} 
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:bg-blue-700 active:scale-[0.95] transition-all"
          >
            Next <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Success;