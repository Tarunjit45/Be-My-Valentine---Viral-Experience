
import React, { useState } from 'react';
import { AppPhase } from './types';
import CursorTrail from './components/CursorTrail';
import Background from './components/Background';
import Envelope from './components/Envelope';
import ValentineGame from './components/ValentineGame';
import SuccessScreen from './components/SuccessScreen';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>(AppPhase.INTRO);

  return (
    <div className="relative min-h-screen text-gray-800 select-none no-select flex flex-col">
      <Background />
      <CursorTrail />
      
      <main className="relative z-10 w-full flex-grow flex flex-col items-center justify-center">
        {phase === AppPhase.INTRO && (
          <div className="animate-in fade-in zoom-in duration-700 w-full px-4">
            <Envelope onOpen={() => setPhase(AppPhase.GAME)} />
          </div>
        )}

        {phase === AppPhase.GAME && (
          <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 w-full h-full">
            <ValentineGame onYes={() => setPhase(AppPhase.SUCCESS)} />
          </div>
        )}

        {phase === AppPhase.SUCCESS && (
          <div className="animate-in zoom-in fade-in duration-1000 w-full px-4 py-8">
            <SuccessScreen />
          </div>
        )}
      </main>

      {/* Persistent Footer Credit */}
      <footer className="relative z-20 w-full py-6 text-center">
        <a 
          href="https://www.instagram.com/tarunjit_biswas?igsh=OHNlY2FzZ2dhNGlh" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full text-pink-600 font-semibold text-sm transition-all hover:bg-pink-100 hover:scale-105 border border-pink-200 shadow-sm"
        >
          Built with 💖 by <span className="font-handwriting text-lg">Tarunjit Biswas</span>
          <span className="text-pink-400">|</span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            Follow
          </span>
        </a>
      </footer>

      <EasterEgg />
    </div>
  );
};

const EasterEgg: React.FC = () => {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setClicks(prev => {
      const next = prev + 1;
      if (next === 3) {
        setShow(true);
        setTimeout(() => setShow(false), 3000);
        return 0;
      }
      return next;
    });
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="fixed bottom-0 right-0 w-20 h-20 z-[100] cursor-pointer opacity-0" 
        title="Hidden Heart"
      />
      {show && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none animate-bounce">
          <div className="bg-white/80 backdrop-blur-md rounded-full p-8 md:p-12 shadow-2xl scale-110 md:scale-150 text-center">
             <div className="text-6xl md:text-8xl">🧸💖🤗</div>
             <p className="text-pink-600 font-handwriting text-xl md:text-2xl mt-4">Extra Big Hug!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
