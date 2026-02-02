
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedCourses } from "@/components/home/featured-courses";
import { AllCourses } from "@/components/home/all-courses";
import { AboutUs } from "@/components/home/about-us";
import { RecentEvents } from "@/components/home/recent-events";
import { MotivationalQuote } from "@/components/home/motivational-quote";
import { SocialFollow } from "@/components/home/social-follow";
import { AppPromo } from "@/components/home/app-promo";
import { StudentsReport } from "@/components/home/students-report";
import { StudentTestimonials } from "@/components/home/student-testimonials";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="relative">
        <div className="scroll-animated"><HeroSection /></div>
        <div 
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><AllCourses /></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-96"
          style={{
            background: 'linear-gradient(to bottom, transparent, #f0fff4)'
          }}
        />
      </div>
      
      <div className="relative">
        <div className="scroll-animated -mt-24"><FeaturedCourses /></div>
         <div 
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, hsl(var(--background)))'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><MotivationalQuote /></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-96"
          style={{
            background: 'linear-gradient(to bottom, transparent, #e0f7fa)'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><AboutUs /></div>
         <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, #f0fff4)'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><StudentsReport /></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, #e0f7fa)'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><RecentEvents /></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, #f0fff4)'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><SocialFollow /></div>
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: 'linear-gradient(to bottom, transparent, #e0f7fa)'
          }}
        />
      </div>

      <div className="relative">
        <div className="scroll-animated -mt-24"><StudentTestimonials /></div>
        <div
            className="absolute bottom-0 left-0 right-0 h-64"
            style={{
                background: 'linear-gradient(to bottom, transparent, hsl(var(--secondary)))'
            }}
        />
      </div>

      <div className="scroll-animated -mt-24"><AppPromo /></div>
    </div>
  );
}
