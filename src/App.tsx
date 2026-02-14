import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import ALL your pages
import Dashboard from './pages/Dashboard';
import CaptureIncident from './pages/CaptureIncident';
import Processing from './pages/Processing';
import DetectionResults from './pages/DetectionResults';
import EstimatePage from './pages/EstimatePage';
import ConfirmationPage from './pages/ConfirmationPage';
import GarageMap from './pages/Garages';

// --- MAKE SURE THESE ARE IMPORTED ---
import Appointment from './pages/Appointment'; 
import Success from './pages/Success';
import FinalSuccess from './pages/FinalSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/capture" element={<CaptureIncident />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/detection" element={<DetectionResults />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/garages" element={<GarageMap />} />
          
          {/* --- FIX: ADD THESE ROUTES TO PREVENT WHITE SCREEN --- */}
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/final-success" element={<FinalSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;