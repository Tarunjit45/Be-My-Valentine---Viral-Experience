
import React, { useState, useEffect, useRef } from 'react';
import { NO_MESSAGES } from '../constants';

interface ValentineGameProps {
  onYes: () => void;
}

const ValentineGame: React.FC<ValentineGameProps> = ({ onYes }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ top: '50%', left: 'calc(50% + 80px)' });
  const [showCheekyPopup, setShowCheekyPopup] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (window.innerWidth < 768) return; // Don't run away on mobile hover as there is no hover
    if (noCount >= 7) return; 
    moveNoButton();
  };

  const handleNoClick = () => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    
    if (newCount === 3) {
      setShowCheekyPopup(true);
    }
    
    moveNoButton();
  };

  const moveNoButton = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const padding = 60; // Extra padding for mobile buttons
    const x = Math.random() * (rect.width - 2 * padding) + padding;
    const y = Math.random() * (rect.height - 2 * padding) + padding;
    setNoPosition({ top: `${y}px`, left: `${x}px` });
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden p-6">
      <div className="text-center mb-10 z-10 animate-float max-w-sm">
        <h1 className="text-4xl md:text-6xl font-handwriting text-pink-600 mb-6 drop-shadow-sm px-2">
          Will you be my Valentine? 💖
        </h1>
        <div className="flex justify-center text-7xl md:text-8xl mb-4">
          {noCount < 3 ? '🥺' : noCount < 6 ? '😤' : '😡'}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center z-10 w-full">
        {/* YES BUTTON */}
        <button
          onClick={onYes}
          className="group relative w-full max-w-[200px] md:w-auto px-12 py-4 bg-pink-500 text-white rounded-full text-2xl font-bold shadow-lg transform transition-all hover:scale-110 active:scale-95 hover:bg-pink-600 ring-4 ring-pink-200"
          style={{
            animation: 'pulse 1.5s infinite'
          }}
        >
          <span className="flex items-center justify-center gap-2">
            YES! <span className="group-hover:animate-bounce">💖</span>
          </span>
          <style>{`
            @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.7); }
              70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(236, 72, 153, 0); }
              100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(236, 72, 153, 0); }
            }
          `}</style>
        </button>

        {/* NO BUTTON */}
        <button
          onMouseEnter={handleNoHover}
          onClick={handleNoClick}
          className={`px-8 py-3 bg-white text-pink-500 rounded-full text-xl font-medium border-2 border-pink-200 shadow-md transition-all duration-300 transform ${noCount >= 3 ? 'scale-75 opacity-50' : ''}`}
          style={{
            position: noCount > 0 ? 'absolute' : 'static',
            top: noCount > 0 ? noPosition.top : 'auto',
            left: noCount > 0 ? noPosition.left : 'auto',
            zIndex: 20
          }}
        >
          {NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)]}
        </button>
      </div>

      {showCheekyPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] animate-in fade-in duration-300 p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm text-center shadow-2xl transform animate-bounce">
            <h2 className="text-3xl font-handwriting text-pink-500 mb-4">Stop teasing me! 😳</h2>
            <p className="text-gray-600 mb-6 text-lg">You know you want to... Just say YES already! 💕</p>
            <button 
              onClick={() => setShowCheekyPopup(false)}
              className="w-full px-6 py-3 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-colors"
            >
              Okay fine! 😊
            </button>
          </div>
        </div>
      )}

      {noCount > 5 && (
        <p className="mt-12 text-pink-400 font-medium italic z-10 text-center text-sm md:text-base">Persistence is key, but love is better! 😉</p>
      )}
    </div>
  );
};

export default ValentineGame;
