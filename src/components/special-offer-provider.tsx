
'use client';

import { useState, useEffect, ReactNode } from 'react';
import { allCourses, Course } from '@/lib/courses';
import { SpecialOfferDialog } from '@/components/home/special-offer-dialog';
import { SaleReminder } from '@/components/home/sale-reminder';

export function SpecialOfferProvider({ children }: { children: ReactNode }) {
  const [showOffer, setShowOffer] = useState(false);
  const [isOfferDismissed, setIsOfferDismissed] = useState(false);
  const [randomCourse, setRandomCourse] = useState<Course | null>(null);
  const [discount, setDiscount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const lastOfferShown = localStorage.getItem('lastOfferShown');
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (!lastOfferShown || now - parseInt(lastOfferShown, 10) > twentyFourHours) {
        
      const timer = setTimeout(() => {
        const course = allCourses[Math.floor(Math.random() * allCourses.length)];
        const randomDiscount = Math.floor(Math.random() * (40 - 30 + 1)) + 30; // 30-40%
        const randomHours = Math.floor(Math.random() * (18 - 12 + 1)) + 12; // 12-18 hours

        setRandomCourse(course);
        setDiscount(randomDiscount);
        setTimeLeft(randomHours * 3600);
        setShowOffer(true);

        localStorage.setItem('lastOfferShown', now.toString());
      }, 5000); // 5-second delay

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 || !randomCourse) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, randomCourse]);


  const handleOpenChange = (open: boolean) => {
    setShowOffer(open);
    if (!open) {
      setIsOfferDismissed(true);
    }
  };

  return (
    <>
      {children}
      {showOffer && randomCourse && (
        <SpecialOfferDialog
          open={showOffer}
          onOpenChange={handleOpenChange}
          course={randomCourse}
          discount={discount}
          timeLeft={timeLeft}
        />
      )}
      {isOfferDismissed && !showOffer && timeLeft > 0 && randomCourse && (
        <SaleReminder 
          timeLeft={timeLeft}
          onClick={() => setShowOffer(true)}
        />
      )}
    </>
  );
}
