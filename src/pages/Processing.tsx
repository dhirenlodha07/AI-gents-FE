import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Processing: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      // For now, just go back home or to estimate
      navigate('/'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-white">
      <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
      <h2 className="text-2xl font-bold text-gray-800">Analyzing Damage...</h2>
      <p className="text-gray-500 text-sm mt-2">AI is scanning your vehicle.</p>
    </div>
  );
};

export default Processing;