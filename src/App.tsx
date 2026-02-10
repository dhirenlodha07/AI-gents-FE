import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CaptureIncident from './pages/CaptureIncident';
import Processing from './pages/Processing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/incident" element={<CaptureIncident />} />
          <Route path="/processing" element={<Processing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;