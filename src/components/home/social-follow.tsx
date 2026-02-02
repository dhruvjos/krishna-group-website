import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

export function SocialFollow() {
    const socialLinks = [
        { 
            icon: Facebook, 
            href: "https://www.facebook.com/KrishnaGroupShrikrishnaCareerAcademyAurangabad?mibextid=wwXIfr&rdid=gNFOnWV9Bj92A3Ge&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FXJipBiV2%2F%3Fmibextid%3DwwXIfr", 
            name: "Facebook",
            hoverClasses: "hover:bg-facebook-blue hover:text-white hover:border-facebook-blue"
        },
        { 
            icon: Instagram, 
            href: "https://www.instagram.com/krishnagroup_/", 
            name: "Instagram",
            hoverClasses: "hover:bg-gradient-to-r from-instagram-orange to-instagram-purple hover:text-white hover:border-transparent"
        },
        { 
            icon: Youtube, 
            href: "https://www.youtube.com/@Krishna-TheLifeCoach", 
            name: "YouTube",
            hoverClasses: "hover:bg-youtube-red hover:text-white hover:border-youtube-red"
        },
    ];

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out delay-100" style={{ backgroundColor: '#f0fff4' }}>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Stay Connected & Inspired
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Follow us on social media for the latest updates, tips, and motivational content to fuel your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
                <Button key={link.name} asChild size="lg" variant="outline" className={`bg-background transition-all duration-300 ${link.hoverClasses}`}>
                    <Link href={link.href} target="_blank" rel="noopener noreferrer">
                        <link.icon className="mr-2 h-5 w-5" />
                        Follow on {link.name}
                    </Link>
                </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
