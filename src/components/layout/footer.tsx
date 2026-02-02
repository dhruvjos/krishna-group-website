import Link from "next/link";
import { Facebook, Instagram, Youtube, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { allCourses } from "@/lib/courses.tsx";

export function Footer() {
  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/KrishnaGroupShrikrishnaCareerAcademyAurangabad?mibextid=wwXIfr&rdid=gNFOnWV9Bj92A3Ge&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FXJipBiV2%2F%3Fmibextid%3DwwXIfr", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/krishnagroup_/", name: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@Krishna-TheLifeCoach", name: "YouTube" },
  ];

  return (
    <footer id="footer" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex flex-col items-start">
          <Logo />
          <p className="mt-4 text-sm text-muted-foreground">
            Empowering individuals with skills for a brighter future. Join us to unlock your potential.
          </p>
          <div className="mt-6 flex gap-4">
            {socialLinks.map((link) => (
              <Button key={link.name} variant="ghost" size="icon" asChild>
                <Link href={link.href} aria-label={link.name} target="_blank">
                  <link.icon className="h-5 w-5" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-2">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-headline font-semibold text-foreground">Courses</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {allCourses.slice(0, 7).map((course) => (
                <li key={course.name}>
                  <Link href="#all-courses" className="text-muted-foreground transition hover:text-foreground">
                    {course.name}
                  </Link>
                </li>
              ))}
               <li>
                  <Link href="#all-courses" className="text-muted-foreground transition hover:text-foreground">
                    ... and more
                  </Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-headline font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#about-us" className="text-muted-foreground transition hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground transition hover:text-foreground">Careers</Link></li>
              <li><Link href="#footer" className="text-muted-foreground transition hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-headline font-semibold text-foreground">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:krishnagroup.89@gmail.com">krishnagroup.89@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+917588165319">+91 75881 65319</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40 py-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Krishna Group. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
