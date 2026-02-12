import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';

const Appointment: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col shadow-2xl">
        
        <div className="flex-1 p-6 flex flex-col justify-center text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full mx-auto flex items-center justify-center mb-6">
            <Clock size={40} className="text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Garage Appointment</h2>
          <p className="text-gray-500 mb-8">Confirm your slot details</p>
          
          <div className="bg-gray-50 p-4 rounded-xl text-left border border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Garage</p>
            <p className="font-bold text-gray-800 mb-3">Sai Service Center</p>
            <p className="text-sm text-gray-500 mb-1">Date & Time</p>
            <p className="font-bold text-gray-800">Tomorrow, 10:00 AM</p>
          </div>
        </div>

        {/* STRICT DIAGRAM BUTTONS */}
        <div className="p-5 space-y-3">
          <button 
            onClick={() => navigate('/final-success')}
            className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold text-lg shadow-lg"
          >
            Proceed
          </button>
          
          <button 
            onClick={() => navigate('/garages')}
            className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl font-bold text-lg"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default Appointment;