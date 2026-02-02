
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function AboutUs() {
  return (
    <section id="about-us" className="w-full py-16 md:py-24 lg:py-32" style={{ backgroundColor: '#e0f7fa' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h2 className="font-headline text-3xl font-bold tracking-tighter transition-colors duration-300 hover:text-primary sm:text-4xl md:text-5xl">
                About Krishna Group
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Krishna Group is a leading educational institution dedicated to providing high-quality training and development programs. Our mission is to empower individuals with the knowledge and skills they need to succeed in their personal and professional lives. We believe in fostering a learning environment that is both nurturing and challenging.
              </p>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                With a team of experienced instructors and a curriculum designed to meet the demands of the modern world, we offer a wide range of courses that cater to diverse needs and aspirations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="#footer">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-80 w-full min-h-[300px] rounded-xl shadow-xl overflow-hidden lg:h-auto">
             <Image
                src="https://picsum.photos/seed/teamwork/800/600"
                alt="Our Team"
                fill
                className="object-cover object-center"
                data-ai-hint="team meeting"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
