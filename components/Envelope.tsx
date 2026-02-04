
import React, { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div 
        className={`relative w-80 h-56 transition-all duration-700 cursor-pointer transform hover:scale-105 ${isOpening ? 'scale-110 opacity-0 translate-y-[-100px]' : ''}`}
        onClick={handleOpen}
      >
        {/* Envelope Body */}
        <div className="absolute inset-0 bg-pink-100 rounded-lg shadow-xl border-2 border-pink-200" />
        
        {/* Flap */}
        <div 
          className={`absolute top-0 left-0 right-0 h-28 bg-pink-200 origin-top transition-transform duration-700 rounded-t-lg shadow-md z-20 ${isOpening ? 'rotate-x-180 -scale-y-100' : ''}`}
          style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
        />

        {/* Heart Seal */}
        {!isOpening && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-5xl animate-bounce">
            ❤️
          </div>
        )}

        {/* Letter Inside */}
        <div className="absolute bottom-2 left-4 right-4 h-32 bg-white rounded-md shadow-inner flex items-center justify-center z-10 p-4 border border-gray-100">
           <span className="text-pink-500 font-bold text-lg text-center">A secret Valentine awaits...</span>
        </div>
      </div>
      
      {!isOpening && (
        <p className="mt-8 text-pink-600 font-medium animate-pulse text-xl font-handwriting">Click to open your surprise!</p>
      )}
    </div>
  );
};

export default Envelope;
