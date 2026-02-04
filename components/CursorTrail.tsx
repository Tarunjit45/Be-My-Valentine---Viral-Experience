
import React, { useEffect, useState, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  life: number;
}

const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dist = Math.hypot(e.clientX - lastPos.current.x, e.clientY - lastPos.current.y);
      
      if (dist > 15) {
        const newParticle: Particle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 15 + 10,
          color: ['#FFC0CB', '#FF69B4', '#FF1493', '#FFB6C1'][Math.floor(Math.random() * 4)],
          life: 1.0,
        };
        setParticles((prev) => [...prev.slice(-20), newParticle]);
        lastPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({ ...p, life: p.life - 0.02, y: p.y - 1 }))
          .filter((p) => p.life > 0)
      );
      requestRef.current = requestAnimationFrame(update);
    };
    requestRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            opacity: p.life,
            fontSize: `${p.size}px`,
            color: p.color,
            transform: `translate(-50%, -50%)`,
          }}
        >
          ❤️
        </div>
      ))}
      <div 
        className="fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          left: lastPos.current.x,
          top: lastPos.current.y,
        }}
      >
        <div className="w-8 h-8 bg-pink-400 rounded-full opacity-30 animate-ping absolute"></div>
        <div className="text-2xl">💝</div>
      </div>
    </div>
  );
};

export default CursorTrail;
