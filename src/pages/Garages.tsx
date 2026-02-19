import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Star, Phone, ArrowLeft, Navigation, CheckCircle2, Crosshair } from 'lucide-react';

// --- ICONS ---
const garageIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const userIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// --- HELPER TO RE-CENTER MAP ---
function RecenterAutomatically({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
}

// --- DISTANCE CALCULATION FUNCTION (Haversine Formula) ---
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d.toFixed(1); // Return string with 1 decimal place
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

// --- GARAGE DATA ---
const garages = [
  { id: 1, name: "Ganesh Car Garage", address: "Behind Petrol Pump, Dhankawadi, Pune", rating: 4.9, reviews: 120, lat: 18.4685, lng: 73.8552 },
  { id: 2, name: "Shilimkar Auto Garage", address: "Bharati Vidyapeeth Road, Katraj, Pune", rating: 4.2, reviews: 85, lat: 18.4582, lng: 73.8525 },
  { id: 3, name: "Balaji Garage", address: "Agam Mandir Road, Katraj, Pune", rating: 4.7, reviews: 219, lat: 18.4554, lng: 73.8488 },
  { id: 4, name: "Shreenath Krupa Motors", address: "Pune Satara Road, Dhankawadi, Pune", rating: 4.9, reviews: 156, lat: 18.4750, lng: 73.8580 },
  { id: 5, name: "Radha Automobile", address: "Balaji Nagar, Dhankawadi, Pune", rating: 4.8, reviews: 92, lat: 18.4650, lng: 73.8555 },
];

const Garages: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  // Default Center: Katraj / Dhankawadi area
  const [position, setPosition] = useState<{lat: number, lng: number}>({ 
    lat: 18.4650, 
    lng: 73.8520 
  });
  const [locationError, setLocationError] = useState('');
  const [userLocationFound, setUserLocationFound] = useState(false);

  // Get User Location Function
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setUserLocationFound(true);
          setLocationError('');
        },
        () => {
          setLocationError('Location access denied.');
        }
      );
    } else {
      setLocationError('Geolocation not supported.');
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleBooking = () => {
    if (selectedId) {
      const selectedGarage = garages.find(g => g.id === selectedId);
      navigate('/appointment', { state: { garage: selectedGarage } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
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
        <div className="h-64 w-full relative -mt-6 border-b border-gray-100 z-10">
            <MapContainer 
                center={[position.lat, position.lng]} 
                zoom={14} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; OSM'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterAutomatically lat={position.lat} lng={position.lng} />

                {/* Show User Marker only if found */}
                {userLocationFound && (
                    <Marker position={[position.lat, position.lng]} icon={userIcon}>
                        <Popup>Your Location</Popup>
                    </Marker>
                )}

                {garages.map((garage) => (
                    <Marker 
                        key={garage.id} 
                        position={[garage.lat, garage.lng]} 
                        icon={garageIcon}
                        eventHandlers={{ click: () => setSelectedId(garage.id) }}
                    />
                ))}
            </MapContainer>

            <button 
              onClick={getUserLocation}
              className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg text-[#005da6] z-[400] active:scale-95 transition-transform"
            >
              <Crosshair size={20} />
            </button>
        </div>

        {/* LIST SECTION */}
        <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-4 relative z-10 pb-44">
            
            {locationError && (
              <div className="bg-red-50 text-red-500 text-xs p-3 rounded-xl border border-red-100 mb-2">
                {locationError} - Distances may be inaccurate.
              </div>
            )}

            <div className="flex justify-between items-end px-1 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-2 z-10">
                {/* REVERTED TO GENERIC HEADER */}
                <h3 className="font-bold text-gray-700">Nearby Garages</h3>
                <span className="text-xs text-gray-400">{garages.length} locations found</span>
            </div>

            {garages.map((g) => {
                // CALCULATE REAL DISTANCE HERE
                const distance = userLocationFound 
                    ? `${getDistance(position.lat, position.lng, g.lat, g.lng)} km` 
                    : 'Calculating...';

                return (
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
                            
                            {/* DYNAMIC DISTANCE DISPLAY */}
                            <div className="flex items-center gap-1 text-[#005da6] font-bold bg-blue-50 px-2 py-0.5 rounded-md">
                                 <Navigation size={12} /> {distance}
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
                );
            })}
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