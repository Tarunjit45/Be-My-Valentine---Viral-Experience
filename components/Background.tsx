
import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 bg-gradient-to-br from-pink-50 to-red-50">
      {/* Sparkles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute bg-white rounded-full animate-pulse opacity-40"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}
      
      {/* Floating Balloons */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`balloon-${i}`}
          className="absolute animate-float opacity-30"
          style={{
            top: 70 + Math.random() * 20 + '%',
            left: 5 + i * 12 + '%',
            animationDelay: i * 0.5 + 's',
            animationDuration: 3 + Math.random() * 2 + 's'
          }}
        >
          <div className={`w-16 h-20 rounded-t-full rounded-b-3xl relative ${['bg-pink-300', 'bg-red-300', 'bg-pink-200'][i % 3]}`}>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-6 bg-gray-400 opacity-20" />
            <div className="absolute top-2 right-3 w-4 h-6 bg-white opacity-40 rounded-full rotate-12" />
          </div>
        </div>
      ))}

      {/* Heart Shapes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className="absolute text-4xl opacity-10 animate-bounce"
          style={{
            top: Math.random() * 80 + '%',
            left: Math.random() * 90 + '%',
            animationDuration: 4 + Math.random() * 4 + 's',
            animationDelay: i * 1 + 's',
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default Background;
