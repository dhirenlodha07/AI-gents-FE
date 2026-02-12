import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';

const FinalSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col shadow-2xl">
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h2>
          <p className="text-gray-500 text-sm">Confirmation email sent.</p>
        </div>

        <div className="p-5">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-gray-900 text-white p-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          >
            <Home size={20} /> Back to Home (Thank You)
          </button>
        </div>

      </div>
    </div>
  );
};

export default FinalSuccess;