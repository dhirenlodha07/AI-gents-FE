import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CaptureIncident from './pages/CaptureIncident';
import Processing from './pages/Processing';
import Estimate from './pages/Estimate';
import Success from './pages/Success';
import Garages from './pages/Garages';
import Appointment from './pages/Appointment';       // <--- NEW
import FinalSuccess from './pages/FinalSuccess';     // <--- NEW

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/incident" element={<CaptureIncident />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/estimate" element={<Estimate />} />
        
        {/* The New Strict Flow */}
        <Route path="/success" element={<Success />} />         {/* Step 1 */}
        <Route path="/garages" element={<Garages />} />         {/* Step 2 */}
        <Route path="/appointment" element={<Appointment />} /> {/* Step 3 */}
        <Route path="/final-success" element={<FinalSuccess />} /> {/* Step 4 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;