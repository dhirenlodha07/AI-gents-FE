import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowLeft, Navigation, CheckCircle2 } from 'lucide-react';

const Garages: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const garages = [
    { 
      id: 1, 
      name: "Sai Service Station", 
      address: "J.M. Road, Deccan Gymkhana, Pune", 
      rating: 4.8, 
      reviews: 342, 
      dist: "2.3 km",
      closes: "7:00 PM"
    },
    { 
      id: 2, 
      name: "Autovista Repairs", 
      address: "Nagar Road, Viman Nagar, Pune", 
      rating: 4.9, 
      reviews: 527, 
      dist: "3.8 km",
      closes: "8:00 PM"
    },
    { 
      id: 3, 
      name: "Mechanix Pro", 
      address: "Baner - Pashan Link Rd, Pune", 
      rating: 4.5, 
      reviews: 128, 
      dist: "5.1 km",
      closes: "9:00 PM"
    },
  ];

  const handleBooking = () => {
    if (selectedId) {
      const selectedGarage = garages.find(g => g.id === selectedId);
      navigate('/appointment', { state: { garage: selectedGarage } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl">
        
        {/* HEADER */}
        <div className="bg-[#005da6] p-5 text-white pt-6 pb-8 rounded-b-[2rem] relative z-20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/confirmation')} className="p-1 hover:bg-white/20 rounded-full transition-colors">
               <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-lg font-bold">Find a Certified Repair Shop</h1>
          </div>
          <p className="text-blue-100 text-xs px-1">Select from our network of trusted garages</p>
        </div>

        {/* MAP SECTION */}
        <div className="h-64 bg-blue-50/40 w-full relative overflow-hidden -mt-6 border-b border-gray-100 group">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#005da6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Center "Your Location" Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                <div className="w-12 h-12 bg-orange-500/20 rounded-full absolute -top-4 animate-ping"></div>
                <div className="bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold mt-1 text-gray-700 whitespace-nowrap">Your Location</div>
            </div>

            {/* PIN 1: Left */}
            <button 
              onClick={() => setSelectedId(1)}
              className={`absolute top-1/3 left-1/4 transition-transform hover:scale-110 ${selectedId === 1 ? 'scale-125 z-20' : 'animate-bounce duration-[2000ms]'}`}
            >
                <MapPin size={32} className={`${selectedId === 1 ? 'text-orange-500' : 'text-[#005da6]'} drop-shadow-md fill-white`} />
            </button>
            
            {/* PIN 2: Bottom Right */}
            <button 
              onClick={() => setSelectedId(2)}
              className={`absolute bottom-1/3 right-1/4 transition-transform hover:scale-110 ${selectedId === 2 ? 'scale-125 z-20' : 'animate-bounce duration-[2500ms]'}`}
            >
                <MapPin size={32} className={`${selectedId === 2 ? 'text-orange-500' : 'text-[#005da6]'} drop-shadow-md fill-white`} />
            </button>

            {/* PIN 3: Top Right (NEW ADDITION) */}
            <button 
              onClick={() => setSelectedId(3)}
              className={`absolute top-1/4 right-1/3 transition-transform hover:scale-110 ${selectedId === 3 ? 'scale-125 z-20' : 'animate-bounce duration-[2200ms]'}`}
            >
                <MapPin size={32} className={`${selectedId === 3 ? 'text-orange-500' : 'text-[#005da6]'} drop-shadow-md fill-white`} />
            </button>

            <div className="absolute top-8 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-xs font-bold text-gray-700">
                <MapPin size={12} className="text-[#005da6]" /> Pune, Maharashtra
            </div>
        </div>

        {/* LIST SECTION */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4 -mt-2 relative z-10 rounded-t-2xl pb-44">
            <div className="flex justify-between items-end px-1 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-2 z-10">
                <h3 className="font-bold text-gray-700">Nearby Garages</h3>
                <span className="text-xs text-gray-400">3 locations found</span>
            </div>

            {garages.map((g) => (
                <div 
                    key={g.id}
                    onClick={() => setSelectedId(g.id)}
                    className={`p-4 rounded-2xl shadow-sm border-2 transition-all cursor-pointer relative overflow-hidden ${
                        selectedId === g.id 
                        ? 'bg-blue-50 border-[#005da6] shadow-md ring-1 ring-blue-100 scale-[1.01]' 
                        : 'bg-white border-transparent hover:border-gray-200'
                    }`}
                >
                    {selectedId === g.id && (
                      <div className="absolute top-0 right-0 bg-[#005da6] p-1.5 rounded-bl-xl shadow-sm z-10">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg">{g.name}</h4>
                            <span className="bg-white text-[#005da6] text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">Certified</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-gray-800">{g.rating}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1 text-gray-500">
                             <Navigation size={12} /> {g.dist}
                        </div>
                    </div>

                    <p className="text-xs text-gray-400 mb-4 leading-relaxed w-3/4">{g.address}</p>

                    <div className="flex gap-3">
                        <button 
                            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                                selectedId === g.id 
                                ? 'bg-[#005da6] text-white shadow-md' 
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                        >
                            {selectedId === g.id ? 'Selected' : 'Select Garage'}
                        </button>
                        <button className="w-12 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-[#005da6] bg-white hover:bg-blue-50 transition-colors">
                            <Phone size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30 shadow-[0_-8px_20px_rgba(0,0,0,0.05)] rounded-t-[2rem]">
              <button 
                onClick={handleBooking}
                disabled={!selectedId}
                className={`w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                  selectedId 
                  ? 'bg-gray-900 text-white hover:bg-black active:scale-[0.98]' 
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Book Appointment
              </button>
              
              <div className="mt-4 flex justify-center">
                  <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-3/4 animate-pulse"></div>
                  </div>
              </div>
        </div>

      </div>
    </div>
  );
};

export default Garages;