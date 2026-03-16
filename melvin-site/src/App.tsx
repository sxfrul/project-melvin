import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import DiseaseDetection from './pages/DiseaseDetection';
import GrowthTracker from './pages/GrowthTracker';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="disease-detection" element={<DiseaseDetection />} />
          <Route path="growth-tracker" element={<GrowthTracker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;