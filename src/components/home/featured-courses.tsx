
"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { RegistrationDialog } from "./registration-dialog";

export function FeaturedCourses() {
  const [isRegDialogOpen, setRegDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const featuredImages = PlaceHolderImages.filter(img => img.id.startsWith('featured-'));

  const featuredCourses = [
    {
      title: "Leadership Excellence Camp",
      description: "An immersive program to cultivate essential leadership qualities, strategic thinking, and effective communication skills for aspiring leaders.",
      image: featuredImages[0],
    },
    {
      title: "Global Language Program",
      description: "Master spoken English and Voice Modulation for proper communication and confidence. Includes IELTS/TOEFL modules.",
      image: featuredImages[1],
    },
    {
      title: "Career Accelerator",
      description: "Get job-ready with our comprehensive interview preparation and corporate skills training.",
      image: featuredImages[2],
    },
  ];

  const handleEnrollClick = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setRegDialogOpen(true);
  };


  return (
    <>
      <section id="featured-courses" className="w-full py-16 md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out" style={{ backgroundColor: '#f0fff4' }}>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Premier Programs &amp; Camps
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Discover our specially crafted programs designed for impactful learning and career growth.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Card key={course.title} className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full">
                    <Image
                      src={course.image.imageUrl}
                      alt={course.image.description}
                      fill
                      className="object-cover object-top"
                      data-ai-hint={course.image.imageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-6">
                  <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{course.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleEnrollClick(course.title)} className="w-full">
                    Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <RegistrationDialog 
        open={isRegDialogOpen} 
        onOpenChange={setRegDialogOpen}
        defaultCourse={selectedCourse}
        registrationType="whatsapp"
      />
    </>
  );
}

    