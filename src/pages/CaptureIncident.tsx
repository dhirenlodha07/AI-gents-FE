import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Camera, FileText } from 'lucide-react';
import ImageUploadBox from '../components/ImageUploadBox';

const CaptureIncident: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    front: null,
    back: null,
    side: null,
  });

  const handleImageCapture = (view: string, imageSrc: string) => {
    setImages(prev => ({ ...prev, [view]: imageSrc }));
  };

  // Logic: User needs at least 1 photo OR a description to proceed
  const canAnalyze = (images.front || images.back || images.side) && description.length > 0;

  return (
    // OUTER WRAPPER: Centers the app on your laptop screen like a phone
    <div className="min-h-screen bg-gray-100 flex justify-center">
      
      {/* PHONE FRAME: Constraints width to look like a mobile app */}
      <div className="w-full max-w-md bg-gray-50 h-[100dvh] flex flex-col relative shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-20">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Upload Evidence</h1>
            <p className="text-xs text-gray-500">Step 2 of 4</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide pb-40">
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-1/2"></div>
          </div>

          {/* RESTORED: Description Box */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={18} className="text-blue-600" />
              <label className="text-sm font-bold text-gray-800">What happened?</label>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. I was rear-ended at a traffic signal..."
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
              rows={4}
            />
          </div>

          {/* Camera Section */}
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Camera size={18} className="text-blue-600" />
              Photos (At least 1 required)
            </h3>
            
            <div className="space-y-4">
              <ImageUploadBox 
                label="Front View" 
                image={images.front} 
                onCapture={(img) => handleImageCapture('front', img)} 
              />
              <ImageUploadBox 
                label="Back View (Optional)" 
                image={images.back} 
                onCapture={(img) => handleImageCapture('back', img)} 
              />
              <ImageUploadBox 
                label="Side View (Optional)" 
                image={images.side} 
                onCapture={(img) => handleImageCapture('side', img)} 
              />
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="absolute bottom-0 w-full bg-white p-5 border-t border-gray-100 z-30">
          <button 
            onClick={() => navigate('/processing')}
            disabled={!canAnalyze}
            className={`
              w-full p-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${canAnalyze 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 active:scale-[0.98]' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {canAnalyze ? 'Analyze Damage' : 'Add Photo & Description'}
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default CaptureIncident;