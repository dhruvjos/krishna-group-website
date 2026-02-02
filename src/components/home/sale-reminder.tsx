'use client';

import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface SaleReminderProps {
  timeLeft: number;
  onClick: () => void;
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

export function SaleReminder({ timeLeft, onClick }: SaleReminderProps) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Button
        className="rounded-full h-16 w-auto bg-accent shadow-lg hover:bg-accent/90 transition-transform hover:scale-110 flex items-center gap-3 px-4 py-2"
        onClick={onClick}
      >
        <div className="relative">
          <Star className="h-8 w-8 text-white animate-pulse" />
        </div>
        <div className="flex flex-col items-start text-left text-white">
          <span className="font-bold text-sm leading-tight">Avail the offer now!!</span>
          <span className="text-xs font-mono leading-tight">{formatTime(timeLeft)} left</span>
        </div>
      </Button>
    </div>
  );
}
