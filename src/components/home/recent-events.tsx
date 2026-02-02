
"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

export function RecentEvents() {
  const events = [
    {
      id: 'event-1',
      imageUrl: 'https://picsum.photos/seed/event1/360/540',
      imageHint: 'students award',
      reelUrl: "https://www.instagram.com/reel/DPv70xLjFCk/",
    },
    {
      id: 'event-2',
      imageUrl: 'https://picsum.photos/seed/event2/360/540',
      imageHint: 'conference presentation',
      reelUrl: "https://www.instagram.com/reel/DPBZwBVjH6j/",
    },
    {
      id: 'event-3',
      imageUrl: 'https://picsum.photos/seed/event3/360/540',
      imageHint: 'group activity',
      reelUrl: "https://www.instagram.com/reel/DL7nOOnSfeJ/",
    },
    {
      id: 'event-4',
      imageUrl: 'https://picsum.photos/seed/event4/360/540',
      imageHint: 'public speaking',
      reelUrl: "https://www.instagram.com/reel/DPv70xLjFCk/",
    },
    {
      id: 'event-5',
      imageUrl: 'https://picsum.photos/seed/event5/360/540',
      imageHint: 'workshop learning',
      reelUrl: "https://www.instagram.com/reel/DPBZwBVjH6j/",
    }
  ];

  return (
    <section id="recent-events" className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter transition-colors duration-300 hover:text-primary sm:text-4xl md:text-5xl">
            Recent Events
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            See what we've been up to. Click to watch the reels.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 flex justify-center">
                <Card className="overflow-hidden group">
                  <CardContent className="p-0 relative">
                    <Link href={event.reelUrl} target="_blank" rel="noopener noreferrer">
                      <Image
                        src={event.imageUrl}
                        alt="Recent Event Thumbnail"
                        width={360}
                        height={540}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={event.imageHint}
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <PlayCircle className="h-16 w-16 text-white" />
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
