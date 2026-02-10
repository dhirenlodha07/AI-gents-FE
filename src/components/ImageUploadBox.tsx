import React, { useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploadBoxProps {
  label: string;
  image: string | null;
  onCapture: (imageSrc: string) => void;
}

const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({ label, image, onCapture }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // This function triggers the hidden file input
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop the click from bubbling up to the parent
    onCapture(''); // Clear the image
  };

  return (
    <div 
      onClick={handleClick}
      className={`
        relative w-full h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all
        ${image 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-blue-400'
        }
      `}
    >
      {/* Hidden Input Field - The Real Worker */}
      <input 
        type="file" 
        accept="image/*" 
        capture="environment" // Tries to open rear camera on mobile, falls back to gallery on laptop
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden" 
      />

      {image ? (
        // State 1: Image Uploaded
        <div className="relative w-full h-full p-2">
          <img 
            src={image} 
            alt="Uploaded" 
            className="w-full h-full object-cover rounded-lg" 
          />
          <button 
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
            {label}
          </div>
        </div>
      ) : (
        // State 2: Empty Box
        <div className="text-center p-4">
          <div className="bg-white p-3 rounded-full inline-block shadow-sm mb-2">
            <Camera className="text-blue-500" size={24} />
          </div>
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          <p className="text-xs text-gray-400 mt-1">Tap to capture or upload</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadBox;