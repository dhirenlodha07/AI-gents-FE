import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertTriangle, IndianRupee, ChevronDown, ChevronUp, FileCheck } from 'lucide-react';

const Estimate: React.FC = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header - Identical Position to Previous Pages */}
        <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => navigate('/incident')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Claim Estimate</h1>
            <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
              <CheckCircle size={12} /> AI Analysis Complete
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 pb-40 scrollbar-hide bg-gray-50">
          
          {/* Total Payout Card */}
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 mb-6 relative overflow-hidden">
             {/* Decorative Background Circles */}
             <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
             
            <p className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Total Estimated Payout</p>
            <h2 className="text-4xl font-bold flex items-center gap-1 my-2">
              <IndianRupee size={32} /> 12,900
            </h2>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-sm text-blue-100">
              <span className="opacity-80">Repair Cost:</span>
              <span className="font-mono">₹13,900</span>
            </div>
            <div className="flex justify-between text-sm text-blue-100 mt-1">
              <span className="opacity-80">Deductible:</span>
              <span className="font-mono text-red-200">- ₹1,000</span>
            </div>
          </div>

          {/* Breakdown Section */}
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
            <AlertTriangle size={16} className="text-orange-500" />
            Detected Damages
          </h3>
          
          <div className="space-y-3">
            {/* Item 1 */}
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Front Bumper</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Moderate</span>
                  <span className="text-xs text-gray-400">• Repair</span>
                </div>
              </div>
              <p className="font-bold text-gray-700">₹4,500</p>
            </div>

            {/* Item 2 */}
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Right Headlight</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Severe</span>
                  <span className="text-xs text-gray-400">• Replace</span>
                </div>
              </div>
              <p className="font-bold text-gray-700">₹8,200</p>
            </div>
            
             {/* Item 3 */}
            <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-800">Fender Liner</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">Low</span>
                  <span className="text-xs text-gray-400">• Paint</span>
                </div>
              </div>
              <p className="font-bold text-gray-700">₹1,200</p>
            </div>
          </div>

          {/* T&C Toggle */}
          <button onClick={() => setExpanded(!expanded)} className="w-full mt-6 flex justify-between items-center text-xs text-gray-400 p-2 hover:bg-gray-100 rounded transition-colors">
            <span>View Terms & Conditions</span>
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {expanded && (
            <p className="text-xs text-gray-400 p-2 leading-relaxed bg-gray-100 rounded mt-1">
              * This estimate is generated by AI based on visual evidence. Final payout is subject to physical verification by the garage. Deductibles apply as per policy #MH12-8821.
            </p>
          )}
        </div>

        {/* BOTTOM BUTTON - Fixed Position (Same as Camera Page) */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button 
            className="w-full bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl font-bold text-lg shadow-lg shadow-green-600/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
            onClick={() => alert("Claim Submitted! (We will build Success screen next)")}
          >
            <FileCheck size={20} />
            Accept & Submit Claim
          </button>
        </div>

      </div>
    </div>
  );
};

export default Estimate;