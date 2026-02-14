import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function FinalSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-600 flex justify-center w-full">
      <div className="w-full max-w-md flex flex-col items-center justify-center p-8 text-center text-white">
        
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">THANK YOU</h1>
        <p className="text-blue-100 mb-12 text-lg">Your claim process has been initiated successfully.</p>
        
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/20">
          <p className="text-sm text-blue-50">Our team will contact you shortly regarding the vehicle pickup.</p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="w-full bg-white text-blue-600 font-bold py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <Home size={20} /> Go to Dashboard
        </button>

      </div>
    </div>
  );
}