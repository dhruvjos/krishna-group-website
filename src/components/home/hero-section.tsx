
"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useUser } from "@/firebase";

const heroSlides = [
  {
    id: "hero-1",
    description: "A modern classroom with an instructor teaching engaged students.",
    imageUrl: "https://i.postimg.cc/ZK35DqHp/Gemini-Generated-Image-zh9i38zh9i38zh9i-1.png",
    imageHint: "classroom teaching",
    headline: "Transform Your Future at Krishna Group",
    subheadline: "Premium Education | Expert Faculty | 100% Placement Support",
  },
  {
    id: "hero-2",
    description: "A professional corporate training session in a modern conference room.",
    imageUrl: "https://i.postimg.cc/52V2cMkJ/Gemini-Generated-Image-zh9i38zh9i38zh9i-2.png",
    imageHint: "corporate training",
    headline: "Achieve Career Excellence with Expert Training",
    subheadline: "Develop in-demand skills for the modern workforce.",
  },
  {
    id: "hero-3",
    description: "Students in graduation gowns celebrating their achievement at a ceremony.",
    imageUrl: "https://i.postimg.cc/q7BBRxTb/Gemini-Generated-Image-zh9i38zh9i38zh9i-3.png",
    imageHint: "student graduation",
    headline: "Your Success Story Starts Here",
    subheadline: "Guidance and support for every step of your journey.",
  },
   {
    id: "hero-4",
    description: "A one-on-one mentoring session between an instructor and a student in a bright library.",
    imageUrl: "https://i.postimg.cc/KY9Gg3cy/Gemini-Generated-Image-zh9i38zh9i38zh9i.png",
    imageHint: "student mentoring",
    headline: "Personalized Guidance for Your Goals",
    subheadline: "Benefit from one-on-one attention and expert mentorship.",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000); // Change slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  const handleBookDemo = () => {
    const businessNumber = "917588165319";
    const userName = user?.displayName || "a potential student";
    const message = `Hi Krishna Group! I'm ${userName} and I'm interested in booking a free demo to learn more about your courses. Please let me know the next steps.`;
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === activeSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.imageUrl}
            alt={slide.description}
            fill
            className={cn(
              "object-cover transition-transform duration-[8000ms] ease-linear",
              index === activeSlide ? "scale-110" : "scale-100"
            )}
            data-ai-hint={slide.imageHint}
            priority={index === 0}
          />
        </div>
      ))}
       <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/20 to-black/60" />
      <div className="container relative z-10 flex h-full items-center justify-start text-left">
        <div className="max-w-2xl text-white pl-0 md:pl-20">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight drop-shadow-lg sm:text-5xl md:text-6xl" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.7)'}}>
            {heroSlides[activeSlide].headline}
          </h1>
          <p className="mt-4 text-lg text-primary-foreground/90 md:text-xl" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.5)'}}>
            {heroSlides[activeSlide].subheadline}
          </p>
          <div className="mt-8 flex flex-col items-start justify-start gap-4 sm:flex-row">
            <Button size="lg" className="transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <a href="#all-courses">Explore Courses</a>
            </Button>
            <Button size="lg" onClick={handleBookDemo} variant="secondary" className="transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg bg-accent text-accent-foreground hover:bg-accent/90">
              Book Free Demo
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
              <Badge variant="secondary" className="text-base py-2 px-4 bg-white/10 backdrop-blur-sm border-white/20">5000+ Students Enrolled</Badge>
              <Badge variant="secondary" className="text-base py-2 px-4 bg-white/10 backdrop-blur-sm border-white/20">98% Satisfaction Rate</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
