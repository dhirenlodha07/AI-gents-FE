import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Appointment() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safe fallback if no garage was selected
  const garage = location.state?.garage || { name: "Premium Garage", address: "Pune, MH" };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative pb-24">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white rounded-b-3xl shadow-md">
          <h1 className="text-2xl font-bold">Book Slot</h1>
          <p className="text-blue-100 text-sm">Select a time for repair</p>
        </div>

        {/* Garage Details */}
        <div className="p-6">
          <div className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm mb-6">
            <h2 className="font-bold text-lg text-gray-800">{garage.name}</h2>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <MapPin size={16} />
              <span>{garage.address || "Near PICT, Pune"}</span>
            </div>
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="font-bold text-gray-700 mb-2 block">Select Date</label>
            <div className="flex items-center border border-gray-200 rounded-lg p-3 bg-gray-50">
              <Calendar className="text-blue-600 mr-3" size={20} />
              <input type="date" className="bg-transparent w-full outline-none" />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="font-bold text-gray-700 mb-2 block">Available Slots</label>
            <div className="grid grid-cols-3 gap-3">
              {["10:00 AM", "01:00 PM", "04:00 PM"].map(time => (
                <button key={time} className="p-2 border border-blue-200 text-blue-600 rounded-lg text-sm hover:bg-blue-50 font-medium focus:bg-blue-600 focus:text-white transition-colors">
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="fixed bottom-0 w-full max-w-md p-4 bg-white border-t border-gray-100">
          <button
            onClick={() => navigate('/success')}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-blue-700"
          >
            Confirm Booking <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}