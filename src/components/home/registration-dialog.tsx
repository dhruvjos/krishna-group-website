
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useFirestore, useUser } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { allCourses } from "@/lib/courses.tsx";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

import type { DialogProps } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { AuthDialog } from "../auth/auth-dialog";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(phoneRegex, 'Invalid phone number'),
  course: z.string({
    required_error: "Please select a course to enroll in.",
  }),
  query: z.string().optional(),
});

interface RegistrationDialogProps extends DialogProps {
  defaultCourse?: string;
  registrationType?: 'whatsapp' | 'firestore';
  offerDetails?: string;
}

export function RegistrationDialog({ defaultCourse, registrationType = 'firestore', offerDetails, ...props }: RegistrationDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      course: defaultCourse || "",
      query: "",
    },
  });

   useEffect(() => {
    if (user) {
      form.setValue("name", user.displayName || "");
      if(user.phoneNumber) {
        form.setValue("phone", user.phoneNumber);
      }
    } else {
        form.reset({ name: "", phone: "", course: defaultCourse || "", query: "" });
    }
  }, [user, form, defaultCourse]);

  useEffect(() => {
    if (defaultCourse) {
      form.setValue("course", defaultCourse);
    }
    if (offerDetails) {
      form.setValue("query", offerDetails);
    }
  }, [defaultCourse, offerDetails, form]);


  const handleWhatsappSubmit = async (values: z.infer<typeof formSchema>) => {
    const businessNumber = "917588165319";
    let message = `Hey There!, I'm ${values.name}, and I am interested in the ${values.course} course.`;
    if (values.query) {
      message += `\n\nMy query is: "${values.query}"`;
    }
    message += `\n\nPlease provide me with more details.`;
    const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: "Redirecting to WhatsApp",
      description: "Please send the pre-filled message to confirm your interest.",
    });
  };

  const handleFirestoreSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Not Logged In",
            description: "You must be logged in to register for a course.",
        });
        return;
    }
    
    const courseId = allCourses.find(c => c.name === values.course)?.slug || 'unknown';

    const registrationData = {
        userId: user.uid,
        courseId: courseId,
        courseName: values.course,
        userName: values.name,
        userPhone: values.phone,
        userQuery: values.query || "",
        registrationDate: serverTimestamp(),
    };

    const courseRegistrationsRef = collection(firestore, 'users', user.uid, 'courseRegistrations');
    
    addDoc(courseRegistrationsRef, registrationData)
      .then(() => {
        toast({
          title: "Registration Successful!",
          description: `You have successfully registered for ${values.course}.`,
        });
      })
      .catch((serverError) => {
        const permissionError = new FirestorePermissionError({
          path: courseRegistrationsRef.path,
          operation: 'create',
          requestResourceData: registrationData,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    const finalRegistrationType = offerDetails ? 'whatsapp' : registrationType;

    if (finalRegistrationType === 'whatsapp') {
      await handleWhatsappSubmit(values);
    } else {
      await handleFirestoreSubmit(values);
    }
    
    props.onOpenChange?.(false);
    form.reset({ name: user?.displayName || "", phone: user?.phoneNumber || "", course: defaultCourse || "", query: offerDetails || "" });
    setIsSubmitting(false);
  }

  const renderContent = () => {
    if (registrationType === 'firestore' && !isUserLoading && !user && !offerDetails) {
      return (
         <div className="py-8 text-center">
            <DialogHeader>
                <DialogTitle className="font-headline text-2xl">Please Log In</DialogTitle>
                <DialogDescription>
                    You need to be logged in to register for a course.
                </DialogDescription>
            </DialogHeader>
            <Button className="mt-6" onClick={() => {
                props.onOpenChange?.(false);
                setAuthDialogOpen(true);
            }}>
                Login / Sign Up
            </Button>
        </div>
      );
    }

    return (
      <>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Register for a Course</DialogTitle>
          <DialogDescription>
            { (registrationType === 'whatsapp' || offerDetails)
              ? "Complete the form below. You'll be redirected to WhatsApp to confirm."
              : "Complete your registration below. Your enrollment will be saved to your profile."
            }
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 12345 67890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={defaultCourse}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a course" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {allCourses.map((course) => (
                        <SelectItem key={course.name} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Query (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ask us anything about the course..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </>
    );
  }

  return (
    <>
      <Dialog {...props}>
        <DialogContent className="sm:max-w-[425px]">
          {renderContent()}
        </DialogContent>
      </Dialog>
      <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />
    </>
  );
}
