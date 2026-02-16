import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar as CalendarIcon, ArrowRight, MapPin } from 'lucide-react';

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const garageInfo = location.state?.garage || { name: "Selected Garage", address: "Pune, Maharashtra" };

  // Generate next 14 days for the custom calendar
  const [dates, setDates] = useState<{ day: string, date: number, fullDate: Date }[]>([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const nextDays = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      nextDays.push({
        day: days[d.getDay()],
        date: d.getDate(),
        fullDate: d
      });
    }
    setDates(nextDays);
  }, []);

  // Simplified Slots (5 Total)
  const morningSlots = ['10:00 AM', '11:30 AM'];
  const afternoonSlots = ['02:00 PM', '04:00 PM', '05:30 PM'];

  const handleConfirm = () => {
    if (selectedTime) {
        navigate('/success', { 
            state: { 
                bookingDate: dates[selectedDateIndex].fullDate,
                bookingTime: selectedTime,
                garage: garageInfo
            } 
        });
    }
  };

  const getFormattedDate = () => {
    if (dates.length > 0) {
        const d = dates[selectedDateIndex].fullDate;
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* HEADER - Deep Blue Theme */}
        <div className="bg-[#005da6] p-6 text-white pt-10 pb-12 rounded-b-[2.5rem] relative z-20 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
               <ArrowLeft size={24} className="text-white" />
            </button>
            <h1 className="text-xl font-bold">Schedule Repair</h1>
          </div>

          {/* Garage Info Card */}
          <div className="bg-blue-800/50 p-4 rounded-xl border border-blue-400/30 backdrop-blur-sm flex items-start gap-3 mb-6">
             <div className="bg-white p-2 rounded-lg text-[#005da6]">
                <MapPin size={20} />
             </div>
             <div>
                <h2 className="font-bold text-lg leading-tight">{garageInfo.name}</h2>
                <p className="text-blue-200 text-xs mt-1">{garageInfo.address}</p>
             </div>
          </div>

          {/* FIXED PROGRESS BAR (Updated to Step 4 of 4) */}
          <div className="flex flex-col gap-1.5 px-1">
             <div className="flex justify-between text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                <span>Step 4 of 4</span>
                <span>100%</span>
             </div>
             <div className="h-1.5 w-full bg-blue-900/50 rounded-full overflow-hidden">
                {/* Width set to w-full for 100% */}
                <div className="h-full w-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.6)]"></div>
             </div>
          </div>
        </div>

        {/* CONTENT SCROLL AREA */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-40 -mt-4 relative z-10 bg-white rounded-t-[2rem]">
            
            {/* 1. CUSTOM HORIZONTAL CALENDAR */}
            <div>
                <div className="flex items-center justify-between mb-4 px-1">
                    <div className="flex items-center gap-2">
                        <CalendarIcon size={18} className="text-[#005da6]" />
                        <h3 className="font-bold text-gray-800">Select Date</h3>
                    </div>
                    {/* Selected Date Text Display */}
                    <span className="text-xs font-bold text-[#005da6] bg-blue-50 px-2 py-1 rounded-md">
                        {getFormattedDate()}
                    </span>
                </div>
                
                {/* Horizontal Scroll Container */}
                <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide -mx-2 px-2">
                    {dates.map((item, index) => (
                        <button 
                            key={index}
                            onClick={() => setSelectedDateIndex(index)}
                            className={`flex flex-col items-center justify-center min-w-[4.5rem] h-20 rounded-2xl transition-all border ${
                                selectedDateIndex === index 
                                ? 'bg-[#005da6] border-[#005da6] text-white shadow-lg shadow-blue-500/30 scale-105' 
                                : 'bg-white border-gray-100 text-gray-400 hover:border-blue-200 hover:bg-blue-50'
                            }`}
                        >
                            <span className="text-xs font-medium mb-1">{item.day}</span>
                            <span className={`text-xl font-bold ${selectedDateIndex === index ? 'text-white' : 'text-gray-800'}`}>
                                {item.date}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* 2. TIME SLOTS SECTION */}
            <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                    <Clock size={18} className="text-[#005da6]" />
                    <h3 className="font-bold text-gray-800">Available Slots</h3>
                </div>
                
                <div className="space-y-4">
                    {/* Morning (2 Slots) */}
                    <div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-1 mb-2 block">Morning</span>
                        <div className="grid grid-cols-2 gap-3">
                            {morningSlots.map((slot) => (
                                <button 
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-3.5 px-2 rounded-xl text-sm font-bold transition-all border ${
                                        selectedTime === slot 
                                        ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-md ring-1 ring-orange-200' 
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:text-[#005da6]'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Afternoon (3 Slots) */}
                    <div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-1 mb-2 block">Afternoon</span>
                        <div className="grid grid-cols-3 gap-3">
                            {afternoonSlots.map((slot) => (
                                <button 
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-3.5 px-2 rounded-xl text-sm font-bold transition-all border ${
                                        selectedTime === slot 
                                        ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-md ring-1 ring-orange-200' 
                                        : 'bg-white border-gray-100 text-gray-600 hover:border-blue-200 hover:text-[#005da6]'
                                    }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl p-6 border-t border-gray-100 z-30 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
              <button 
                onClick={handleConfirm}
                disabled={!selectedTime}
                className={`w-full p-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
                  selectedTime 
                  ? 'bg-[#005da6] text-white hover:bg-[#004a85] active:scale-[0.98] shadow-blue-500/20' 
                  : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
              >
                Confirm Appointment <ArrowRight size={20} />
              </button>
              
              {/* Decorative line */}
              <div className="mt-5 flex justify-center">
                  <div className="h-1.5 w-1/3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 w-full"></div>
                  </div>
              </div>
        </div>

      </div>
    </div>
  );
}