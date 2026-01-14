import React, { useState, useEffect } from 'react';
import { ArrowRight, Timer, Zap } from 'lucide-react';

interface HeroProps {
  onConnect: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onConnect }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-12 relative">
      
      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8 animate-fade-in-up">
        <Zap className="w-4 h-4 fill-current" />
        <span className="text-sm font-bold tracking-wide uppercase">Round 2 Claiming is Live</span>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500 animate-gradient-y">
        The Future of <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary neon-text">Web3 Rewards</span>
      </h1>

      <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
        Claim your NEX allocation instantly. Low gas fees, instant settlement, and secure cross-chain bridging powered by LayerZero.
      </p>

      {/* Timer */}
      <div className="grid grid-cols-4 gap-4 md:gap-8 mb-12 font-mono">
        {[
          { label: 'DAYS', value: timeLeft.days },
          { label: 'HRS', value: timeLeft.hours },
          { label: 'MINS', value: timeLeft.minutes },
          { label: 'SECS', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 min-w-[80px]">
            <span className="text-3xl md:text-4xl font-bold text-white mb-1">{String(item.value).padStart(2, '0')}</span>
            <span className="text-xs text-gray-500 font-bold">{item.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button 
        onClick={onConnect}
        className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-white to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative flex items-center gap-3">
          <span>Claim Airdrop</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>

      <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span>Network Status: Stable</span>
      </div>
    </div>
  );
};