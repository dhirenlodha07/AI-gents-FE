import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Phone, ArrowLeft, CheckCircle2, Navigation } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl">
        
        {/* HEADER - Blue Background */}
        <div className="bg-[#005da6] p-5 text-white pt-6 pb-8 rounded-b-[2rem] relative z-20 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate('/success')} className="p-1 hover:bg-white/20 rounded-full transition-colors">
               <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-lg font-bold">Find a Certified Repair Shop</h1>
          </div>
          <p className="text-blue-100 text-xs px-1">Select from our network of trusted garages</p>
        </div>

        {/* MAP SECTION - Custom CSS Map */}
        <div className="h-64 bg-[#f0f9f6] w-full relative overflow-hidden -mt-6 border-b border-gray-200">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#009688 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* "You" Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative z-10"></div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-full absolute -top-4 animate-ping"></div>
                <div className="bg-white px-2 py-0.5 rounded shadow text-[10px] font-bold mt-1 text-gray-700">You</div>
            </div>

            {/* Garage Pins (Visual Only) */}
            <div className="absolute top-1/3 left-1/4 animate-bounce duration-[2000ms]">
                <MapPin size={32} className="text-[#009688] drop-shadow-md fill-white" />
            </div>
            <div className="absolute bottom-1/3 right-1/4 animate-bounce duration-[2500ms]">
                <MapPin size={32} className="text-[#009688] drop-shadow-md fill-white" />
            </div>
             {/* Location Tag */}
            <div className="absolute top-8 left-4 bg-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 text-xs font-bold text-gray-700">
                <MapPin size={12} className="text-red-500" /> Pune, Maharashtra
            </div>
        </div>

        {/* LIST SECTION - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4 -mt-2 relative z-10 rounded-t-2xl pb-40">
            <div className="flex justify-between items-end px-1">
                <h3 className="font-bold text-gray-700">Nearby Garages</h3>
                <span className="text-xs text-gray-400">3 locations</span>
            </div>

            {garages.map((g) => (
                <div 
                    key={g.id}
                    onClick={() => setSelectedId(g.id)}
                    className={`bg-white p-4 rounded-2xl shadow-sm border-2 transition-all cursor-pointer ${
                        selectedId === g.id ? 'border-[#00cba9] ring-1 ring-[#00cba9]' : 'border-transparent hover:border-gray-200'
                    }`}
                >
                    {/* Header: Name & Badge */}
                    <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-gray-800 text-lg">{g.name}</h4>
                            <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-blue-100">Certified</span>
                        </div>
                    </div>

                    {/* Rating & Distance */}
                    <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-bold">{g.rating}</span>
                            <span className="text-gray-400">({g.reviews})</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <div className="flex items-center gap-1 text-gray-500">
                             <Navigation size={12} /> {g.dist}
                        </div>
                    </div>

                    {/* Address */}
                    <p className="text-xs text-gray-400 mb-3 leading-relaxed w-3/4">
                        {g.address}
                    </p>

                    <div className="flex items-center justify-between mt-4">
                         <div className="text-[10px] text-gray-400 font-medium">
                            Open until {g.closes}
                         </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-3">
                        <button 
                            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-colors ${
                                selectedId === g.id 
                                ? 'bg-[#00cba9] text-white shadow-md' 
                                : 'bg-[#00cba9] text-white hover:bg-[#00b596]'
                            }`}
                        >
                            {selectedId === g.id ? 'Garage Selected' : 'Select Garage'}
                        </button>
                        <button className="w-12 h-10 border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50">
                            <Phone size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>

        {/* BOTTOM BAR - Matches "Strict Diagram" Rule */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
             <button 
                onClick={() => selectedId && navigate('/appointment')}
                disabled={!selectedId}
                className={`w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  selectedId ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
                }`}
              >
                Book Appointment
              </button>
              <div className="mt-3 flex justify-center">
                  <div className="h-1 w-1/3 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 w-3/4"></div>
                  </div>
              </div>
        </div>

      </div>
    </div>
  );
};

export default Garages;