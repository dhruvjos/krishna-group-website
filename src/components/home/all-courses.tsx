

"use client";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { allCourses } from "@/lib/courses";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { RegistrationDialog } from "./registration-dialog";
import Link from "next/link";
import { Input } from "../ui/input";
import { useSearchParams } from "next/navigation";

export function AllCourses() {
  const [isRegDialogOpen, setRegDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();
  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  const handleEnrollClick = (e: React.MouseEvent, courseName: string) => {
    e.preventDefault();
    setSelectedCourse(courseName);
    setRegDialogOpen(true);
  };

  const filteredCourses = allCourses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section id="all-courses" className="w-full py-16 md:py-24 lg:py-32 animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out delay-200">
        <div className="container mx-auto px-4 md:px-6 z-10 relative pt-12">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Explore All Our Courses
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              From language proficiency to personal growth, we have a course for you.
            </p>
          </div>
          <div className="mx-auto mb-12 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for a course..."
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredCourses.map((course) => (
              <Link key={course.slug} href={`/courses/${course.slug}`} className="flex">
                <Card  className="flex flex-col text-center overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 w-full">
                  <CardContent className="flex flex-1 flex-col items-center justify-center p-6">
                    <course.icon className="h-12 w-12 text-primary" />
                    <p className="mt-4 font-semibold text-lg">{course.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground flex-1">{course.description}</p>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Button onClick={(e) => handleEnrollClick(e, course.name)} className="w-full">
                      Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <RegistrationDialog 
        open={isRegDialogOpen} 
        onOpenChange={setRegDialogOpen} 
        defaultCourse={selectedCourse}
      />
    </>
  );
}
