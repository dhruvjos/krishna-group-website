
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Course } from '@/lib/courses';
import Image from 'next/image';
import { ArrowRight, Clock, Tag, Zap } from 'lucide-react';
import { RegistrationDialog } from './registration-dialog';

interface SpecialOfferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: Course;
  discount: number;
  timeLeft: number;
}

export function SpecialOfferDialog({ open, onOpenChange, course, discount, timeLeft }: SpecialOfferDialogProps) {
  const [isRegDialogOpen, setRegDialogOpen] = useState(false);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const offerDetails = `I'm interested in the special ${discount}% discount offer for the ${course.name} course!`;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg p-0 overflow-hidden border-accent shadow-2xl">
          <div className="relative h-48 w-full">
            <Image
              src={`https://picsum.photos/seed/${course.slug}/800/400`}
              alt={course.name}
              fill
              className="object-cover"
              data-ai-hint="course promotion"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
                <DialogTitle className="text-3xl font-extrabold tracking-tight drop-shadow-lg">{course.name}</DialogTitle>
                <DialogDescription className="text-lg text-white/90 drop-shadow-md">{course.description}</DialogDescription>
            </div>
          </div>
          
          <div className="p-6 bg-background">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-accent flex items-center justify-center gap-2">
                    <Zap className="h-7 w-7" />
                    Limited Time Flash Sale!
                </h3>
                <p className="text-muted-foreground mt-1">This special offer is just for today!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
                <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold">
                        <Tag className="h-5 w-5" />
                        <span className="text-lg">Discount</span>
                    </div>
                    <p className="text-3xl font-extrabold text-primary">{discount}% OFF</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex items-center justify-center gap-2 text-primary font-bold">
                        <Clock className="h-5 w-5" />
                        <span className="text-lg">Time Left</span>
                    </div>
                    <p className="text-3xl font-extrabold text-primary tabular-nums">{formatTime(timeLeft)}</p>
                </div>
            </div>

            <Button size="lg" className="w-full text-lg py-7 transition-transform hover:scale-105" onClick={() => setRegDialogOpen(true)}>
              Claim My {discount}% Discount <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
             <p className="text-center text-xs text-muted-foreground mt-3">Offer expires soon. Don't miss out!</p>
          </div>
        </DialogContent>
      </Dialog>
      <RegistrationDialog 
        open={isRegDialogOpen} 
        onOpenChange={setRegDialogOpen} 
        defaultCourse={course.name}
        offerDetails={offerDetails}
      />
    </>
  );
}
