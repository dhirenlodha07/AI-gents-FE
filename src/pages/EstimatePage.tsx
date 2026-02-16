import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, FileCheck, X, LogOut } from 'lucide-react';

const EstimatePage: React.FC = () => {
  const navigate = useNavigate();
  const [showQuitModal, setShowQuitModal] = useState(false);

  // DATA SYNCED TO TOTAL 12,500
  const damages = [
    { 
      name: "Front Bumper Replacement", 
      price: "4,500", 
      status: "SEVERE", 
      match: "98% match", 
      color: "red" 
    },
    { 
      name: "Headlight Assembly (L)", 
      price: "6,000", 
      status: "MODERATE", 
      match: "92% match", 
      color: "orange" 
    },
    { 
      name: "Bonnet Repair", 
      price: "3,000", 
      status: "MINOR", 
      match: "88% match", 
      color: "blue" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* HEADER */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-white sticky top-0 z-20">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800">Claim Estimate</h1>
            <div className="flex items-center justify-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-wider">
              <CheckCircle2 size={12} /> AI Analysis Complete
            </div>
          </div>
          <div className="w-10"></div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-48 scrollbar-hide">
          
          {/* TOTAL PAYOUT CARD */}
          <div className="bg-gradient-to-br from-[#2563eb] to-[#1e40af] rounded-3xl p-6 text-white shadow-xl shadow-blue-200">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Total Estimated Payout</p>
            <h2 className="text-4xl font-black mb-6">₹ 12,500</h2>
            
            <div className="space-y-2 pt-4 border-t border-white/20">
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Repair Cost:</span>
                <span className="font-bold font-mono text-base">₹ 13,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="opacity-70">Deductible:</span>
                <span className="font-bold font-mono text-base">- ₹ 1,000</span>
              </div>
            </div>
          </div>

          {/* IDENTIFIED DAMAGES SECTION */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-1">
              <AlertTriangle size={16} className="text-orange-500" />
              <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Identified Damages</h3>
            </div>

            {damages.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                  <span className="font-bold text-gray-800 text-lg font-mono">₹ {item.price}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider
                    ${item.color === 'red' ? 'bg-red-50 text-red-600' : 
                      item.color === 'orange' ? 'bg-orange-50 text-orange-600' : 
                      'bg-blue-50 text-blue-600'}`}
                  >
                    {item.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">• {item.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="absolute bottom-0 w-full bg-white px-5 py-4 border-t border-gray-100 z-30 shadow-[0_-10px_20px_rgba(0,0,0,0.03)] rounded-t-3xl">
          <div className="flex flex-col gap-3">
            {/* Proceed Button */}
            <button 
              onClick={() => navigate('/confirmation')}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-lg transition-all active:scale-[0.98]"
            >
              <FileCheck size={20} />
              Accept & Submit Claim
            </button>

            {/* Quit Button - Triggers Modal */}
            <button 
              onClick={() => setShowQuitModal(true)}
              className="w-full bg-white border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              Quit
            </button>
          </div>
          
          <div className="mt-4 flex justify-center pb-2">
            <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 w-full"></div>
            </div>
          </div>
        </div>

        {/* --- CONFIRMATION MODAL --- */}
        {showQuitModal && (
          <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <LogOut size={24} className="text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">Exit Claim Process?</h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                You are about to discard this estimate. Your progress will be lost and you will need to start over.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowQuitModal(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-200 transition-colors"
                >
                  Yes, Quit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EstimatePage;