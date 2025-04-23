
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/features/language';

interface Ticket {
  id: number;
  left: number;
  size: number;
  opacity: number;
  animationDuration: number;
  delay: number;
  rotation: number;
  textRotation: number;
}

export function FallingTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const { currentLanguage } = useLanguage();

  // Get the appropriate text based on the current language
  const getTicketText = () => {
    switch (currentLanguage.code) {
      case 'lv':
        return 'BIĻETE';
      case 'en':
        return 'TICKET';
      case 'ru':
        return 'БИЛЕТ';
      default:
        return 'BIĻETE';
    }
  };

  useEffect(() => {
    // Create tickets for animation
    const ticketCount = 15;
    const newTickets: Ticket[] = [];
    
    for (let i = 0; i < ticketCount; i++) {
      newTickets.push({
        id: i,
        left: Math.random() * 100, // Random horizontal position (%)
        size: Math.random() * 20 + 20, // Random size between 20px and 40px
        opacity: Math.random() * 0.5 + 0.3, // Random opacity
        animationDuration: Math.random() * 8 + 10, // Animation duration 10-18s
        delay: Math.random() * 15, // Random delay
        rotation: Math.random() * 360, // Random ticket rotation
        textRotation: 90 // Fixed 90-degree rotation
      });
    }

    setTickets(newTickets);
  }, []);

  const ticketText = getTicketText();

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="absolute animate-fall"
          style={{
            left: `${ticket.left}%`,
            width: `${ticket.size}px`,
            height: `${ticket.size * 1.6}px`, 
            opacity: ticket.opacity,
            animation: `fall ${ticket.animationDuration}s linear ${ticket.delay}s infinite`,
            transform: `rotate(${ticket.rotation}deg)`,
          }}
        >
          <div className="w-full h-full bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-300/30 flex items-center justify-center overflow-hidden">
            <div 
              className="text-[10px] font-bold text-orange-600 font-playfair" 
              style={{ transform: `rotate(${ticket.textRotation}deg)` }}
            >
              {ticketText}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
