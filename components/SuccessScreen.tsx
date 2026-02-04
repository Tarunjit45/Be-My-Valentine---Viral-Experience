
import React, { useState, useEffect, useRef } from 'react';
import { COMPLIMENTS, QUIZ_OPTIONS } from '../constants';

const SuccessScreen: React.FC = () => {
  const [partnerName, setPartnerName] = useState('');
  const [complimentIndex, setComplimentIndex] = useState(0);
  const [quizSelection, setQuizSelection] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore - confetti is from script tag
    if (window.confetti) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        const particleCount = 50 * (timeLeft / duration);
        // @ts-ignore
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        // @ts-ignore
        window.confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
    }
  }, []);

  const nextCompliment = () => {
    setComplimentIndex((prev) => (prev + 1) % COMPLIMENTS.length);
  };

  const handleScreenshot = () => {
    if (!cardRef.current) return;
    setIsCapturing(true);
    // Give state a moment to settle
    setTimeout(async () => {
      try {
        // @ts-ignore - html2canvas from script tag
        const canvas = await window.html2canvas(cardRef.current, {
          scale: window.devicePixelRatio || 2,
          backgroundColor: '#FFF5F5',
          logging: false,
          useCORS: true,
          onclone: (clonedDoc: any) => {
            // Ensure fonts or styles are maintained in clone
            const element = clonedDoc.getElementById('valentine-card');
            if (element) {
              element.style.borderRadius = '2.5rem';
              element.style.border = '8px solid #FCE7F3'; // pink-100
            }
          }
        });
        const link = document.createElement('a');
        link.download = `valentine-${partnerName || 'love'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error("Screenshot failed", err);
      } finally {
        setIsCapturing(false);
      }
    }, 100);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        id="valentine-card"
        ref={cardRef}
        className={`w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-8 flex flex-col items-center text-center border-8 border-pink-100 relative ${isCapturing ? 'border-none shadow-none' : ''}`}
      >
        {/* Kawaii Blushing Face */}
        <div className="relative mb-6">
          <div className="text-7xl md:text-8xl animate-bounce">
            🥰
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 md:w-32 h-24 md:h-32 bg-pink-200 rounded-full -z-10 blur-2xl opacity-50 animate-pulse"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-handwriting text-pink-600 mb-2">Yay! You said Yes! 💖</h2>
        <p className="text-gray-500 mb-6 italic text-sm md:text-base">You've officially made my heart melt...</p>

        {/* Personalized Name Generator */}
        <div className={`w-full mb-6 ${isCapturing ? 'hidden' : ''}`}>
          <label className="block text-pink-400 text-xs font-bold mb-2 uppercase tracking-wider">Your partner's name:</label>
          <input 
            type="text" 
            placeholder="Type here..." 
            className="w-full px-4 py-3 border-2 border-pink-100 rounded-full focus:outline-none focus:border-pink-300 text-center text-lg text-pink-600 placeholder-pink-200 bg-pink-50/30"
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
          />
        </div>

        {partnerName && (
          <div className="mb-6 animate-in slide-in-from-bottom duration-500">
             <p className="text-xl md:text-2xl font-handwriting text-pink-500">
               Tarunjit Biswas loves {partnerName} 💕
             </p>
             <div className="flex justify-center gap-1 mt-2">
               {[...Array(5)].map((_, i) => <span key={i} className="text-xl animate-pulse" style={{ animationDelay: `${i*0.2}s` }}>❤️</span>)}
             </div>
          </div>
        )}

        {/* Compliment Generator */}
        <div 
          className="bg-pink-50 p-5 md:p-6 rounded-3xl w-full mb-6 cursor-pointer hover:bg-pink-100 transition-colors transform hover:scale-105 active:scale-95 border-2 border-dashed border-pink-200"
          onClick={nextCompliment}
        >
          <p className="text-pink-600 text-base md:text-lg font-medium leading-relaxed">
            {COMPLIMENTS[complimentIndex].text}
          </p>
          <p className="text-xs text-pink-300 mt-2">(Tap for a new one! ✨)</p>
        </div>

        {/* Mini Quiz */}
        <div className="w-full mb-6 text-left">
          <p className="text-center font-bold text-pink-400 text-sm mb-4">How much do you love me?</p>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            {QUIZ_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setQuizSelection(opt.value)}
                className={`py-2 px-2 rounded-2xl border-2 text-xs md:text-sm transition-all ${quizSelection === opt.value ? 'bg-pink-500 text-white border-pink-500 shadow-md scale-105' : 'bg-white text-pink-400 border-pink-50 hover:border-pink-200'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {quizSelection && (
            <p className="text-center mt-4 text-pink-500 font-handwriting text-lg md:text-xl animate-bounce">
              Me too! 💝 {quizSelection === 'infinity' ? '♾️' : '✨'}
            </p>
          )}
        </div>

        {/* Screenshot / Instagram Story Button */}
        {!isCapturing && (
          <div className="flex flex-col gap-3 w-full mt-2">
            <button 
              onClick={handleScreenshot}
              className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-3 px-4 md:px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Take a Valentine Screenshot 📸
            </button>
            <p className="text-[10px] md:text-xs text-pink-300 font-medium uppercase tracking-tight">#BeMyValentine #YesOnlyChallenge</p>
          </div>
        )}

        {/* Small credit inside the card for screenshot */}
        {isCapturing && (
          <div className="mt-4 text-[10px] text-pink-300 italic">
            Created by Tarunjit Biswas
          </div>
        )}
      </div>

      <div className="mt-8 text-pink-400 font-medium flex gap-2 items-center text-sm">
        <span>Click anywhere for sparks!</span>
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default SuccessScreen;
