import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// We will create this page next
const DashboardPlaceholder = () => <div className="p-5 font-bold">Dashboard Coming Soon</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPlaceholder />} />
          <Route path="/incident" element={<div>Camera Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;