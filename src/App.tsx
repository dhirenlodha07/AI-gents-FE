import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaptureIncident from './pages/CaptureIncident';
import Processing from './pages/Processing';
import Estimate from './pages/Estimate';
import Success from './pages/Success'; // Make sure you create this file!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The Main Dashboard */}
        <Route path="/" element={<Dashboard />} />
        
        {/* Step 1: Camera & Upload */}
        <Route path="/incident" element={<CaptureIncident />} />
        
        {/* Step 2: AI "Thinking" Animation */}
        <Route path="/processing" element={<Processing />} />
        
        {/* Step 3: The Result & Money */}
        <Route path="/estimate" element={<Estimate />} />
        
        {/* Step 4: Final Confirmation */}
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;