
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

export function StudentsReport() {
  return (
    <section id="students-report" className="w-full py-16 md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out delay-100" style={{ backgroundColor: '#f0fff4' }}>
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Student Success Reports
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Explore the achievements and statistics of our students. See the impact of our courses.
          </p>
          <Button asChild size="lg">
            <Link href="/reports">
              <TrendingUp className="mr-2 h-5 w-5" />
              View Student Reports
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
