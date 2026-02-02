
"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    name: "Priya Sharma",
    course: "Leadership Excellence",
    review: "The leadership camp was a transformative experience. I gained so much confidence and learned practical skills that I use every day at my job. The instructors were phenomenal!",
    image: "https://picsum.photos/seed/student1/100/100",
    imageHint: "female student portrait",
    rating: 5,
  },
  {
    name: "Rohan Mehra",
    course: "Career Accelerator",
    review: "I landed my dream job just weeks after completing this program. The mock interviews and resume workshops were incredibly helpful. Highly recommended for any recent graduate.",
    image: "https://picsum.photos/seed/student2/100/100",
    imageHint: "male student portrait",
    rating: 5,
  },
  {
    name: "Anika Verma",
    course: "Global Language Program",
    review: "I've always been hesitant to speak English, but this course changed everything. The focus on practical conversation made me comfortable and fluent. Thank you, Krishna Group!",
    image: "https://picsum.photos/seed/student3/100/100",
    imageHint: "female student smiling",
    rating: 5,
  },
  {
    name: "Sameer Khan",
    course: "Aarya Maths",
    review: "Maths used to be my weakest subject, but the unique teaching methods here made it my favorite. I topped my class this year, and it's all thanks to the excellent coaching.",
    image: "https://picsum.photos/seed/student4/100/100",
    imageHint: "male student glasses",
    rating: 4,
  },
  {
    name: "Isha Singh",
    course: "Corporate Skills",
    review: "The corporate skills module is a must for anyone entering the professional world. From email etiquette to presentation skills, I feel so much more prepared for my career.",
    image: "https://picsum.photos/seed/student5/100/100",
    imageHint: "female corporate portrait",
    rating: 5,
  },
];

export function StudentTestimonials() {
  return (
    <section id="testimonials" className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Success Stories from Our Students
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Hear what our students have to say about their journey with Krishna Group.
          </p>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4">
                  <Card className="h-full bg-card shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="flex flex-col items-center text-center p-8">
                       <Image
                        src={testimonial.image}
                        alt={`Photo of ${testimonial.name}`}
                        width={80}
                        height={80}
                        className="rounded-full mb-4 border-4 border-primary/20"
                        data-ai-hint={testimonial.imageHint}
                      />
                      <p className="text-lg font-semibold font-headline">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground mb-4">{testimonial.course}</p>
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonial.rating ? "text-accent fill-accent" : "text-muted-foreground/50"}`}
                          />
                        ))}
                      </div>
                      <blockquote className="text-foreground/80 italic">
                        "{testimonial.review}"
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-[-50px]" />
          <CarouselNext className="mr-[-50px]" />
        </Carousel>
      </div>
    </section>
  );
}
