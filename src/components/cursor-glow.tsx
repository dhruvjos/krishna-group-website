"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer') {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="cursor-glow-div"
      className={cn(
        'pointer-events-none fixed inset-0 z-50 hidden transition-opacity duration-300 lg:block',
        { 'opacity-0': isPointer }
      )}
      style={{
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
      } as React.CSSProperties}
    />
  );
}
