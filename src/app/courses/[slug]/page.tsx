
"use client";

import { allCourses, Course } from "@/lib/courses";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Home, PlayCircle } from "lucide-react";
import { RegistrationDialog } from "@/components/home/registration-dialog";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = allCourses.find((c) => c.slug === params.slug);

  if (!course) {
    notFound();
  }
  
  return <CourseDetailClient course={course} />;
}


function CourseDetailClient({ course }: { course: Course }) {
  const [isRegDialogOpen, setRegDialogOpen] = useState(false);
  const { details } = course;

  return (
    <>
      <div className="w-full bg-slate-50 py-12 md:py-20">
        <div className="mx-auto my-5 max-w-6xl px-4">
            <div className="mb-8">
                <Button asChild variant="outline" className="bg-white hover:bg-slate-100">
                <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>
                </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Left Column - Video and Key Info */}
                <div className="lg:col-span-3">
                    <div className="relative aspect-video w-full rounded-xl shadow-lg overflow-hidden group mb-6">
                        <Image
                            src="https://picsum.photos/seed/course-video/1280/720"
                            alt={`Promotional video for ${course.name}`}
                            fill
                            className="object-cover"
                            data-ai-hint="course video"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                             <PlayCircle className="h-20 w-20 text-white/80 transform transition-transform group-hover:scale-110" />
                        </div>
                    </div>
                     <Card className="bg-white shadow-lg rounded-xl">
                        <CardHeader>
                            <div className="border-l-4 border-primary pl-4">
                                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                                    {course.name}
                                </h1>
                                {details && (
                                <p className="mt-1 text-lg text-slate-600">
                                    {details.title}
                                </p>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 text-base">{course.description}</p>
                            {details && (
                                <div className="mt-6 flex flex-wrap gap-4 text-sm">
                                {details.duration && <div className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">Duration: {details.duration}</div>}
                                {details.price && <div className="rounded-full bg-accent/10 px-3 py-1 font-medium text-accent-foreground">Price: {details.price}</div>}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Details and Enrollment */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24">
                        {details ? (
                            <div className="space-y-6">
                               <Card className="bg-white shadow-lg rounded-xl">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl font-bold text-slate-800">Course Overview</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-slate-600">{details.description}</p>
                                    </CardContent>
                                </Card>

                                {details.features && details.features.length > 0 && (
                                    <Card className="bg-white shadow-lg rounded-xl">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-xl font-bold text-slate-800">What You'll Learn</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-3 text-slate-600">
                                        {details.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                                            <span>{feature}</span>
                                            </li>
                                        ))}
                                        </ul>
                                    </CardContent>
                                    </Card>
                                )}
                                
                                {details.note && (
                                    <Card className="bg-blue-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="font-headline text-lg font-bold text-blue-800">Important Note</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-blue-700 italic">"{details.note}"</p>
                                    </CardContent>
                                    </Card>
                                )}

                            </div>
                        ) : (
                            <Card className="bg-white shadow-lg rounded-xl">
                                <CardContent className="pt-6">
                                <p className="text-center text-slate-500">More details about this course are coming soon. Please check back later or contact us for more information.</p>
                                </CardContent>
                            </Card>
                        )}
                        <Button size="lg" onClick={() => setRegDialogOpen(true)} className="w-full mt-8 text-lg py-6 transition-transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                            Enroll in {course.name} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <RegistrationDialog 
        open={isRegDialogOpen} 
        onOpenChange={setRegDialogOpen} 
        defaultCourse={course.name}
      />
    </>
  );
}
