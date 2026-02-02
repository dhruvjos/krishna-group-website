
"use client";

import Link from "next/link";
import {
  ChevronDown,
  Menu,
  User as UserIcon,
  LogOut,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { allCourses } from "@/lib/courses.tsx";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";


export function Header() {
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      user.getIdTokenResult().then((idTokenResult) => {
        setIsAdmin(!!idTokenResult.claims.admin);
      });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "";
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };
  
  const NavMenu = ({isMobile = false}) => {
    const Component = isMobile ? 'div' : 'nav';
    const classNames = isMobile ? 'flex flex-col space-y-2' : 'hidden md:flex items-center space-x-2';
    
    return (
       <Component className={classNames}>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold">Courses <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>All Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {allCourses.map(course => (
                     <DropdownMenuItem key={course.slug} asChild>
                        <Link href={`/courses/${course.slug}`}>{course.name}</Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold">About Us <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem asChild><Link href="/#about-us">Our Vision</Link></DropdownMenuItem>
                <DropdownMenuItem>Faculty</DropdownMenuItem>
                <DropdownMenuItem>Infrastructure</DropdownMenuItem>
                <DropdownMenuItem>Achievements</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold">Admissions <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>How to Apply</DropdownMenuItem>
                <DropdownMenuItem>Fees & Scholarships</DropdownMenuItem>
                <DropdownMenuItem>Eligibility</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold">Campus Life <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Facilities</DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#recent-events">Events</Link></DropdownMenuItem>
                <DropdownMenuItem>Student Stories</DropdownMenuItem>
                 <DropdownMenuItem>Gallery</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-bold">Resources <ChevronDown className="h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem>Blog</DropdownMenuItem>
                <DropdownMenuItem>Webinars</DropdownMenuItem>
                <DropdownMenuItem>Free Materials</DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/#students-report">Career Support</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <Button asChild variant="ghost" className="font-bold"><Link href="/#footer">Contact</Link></Button>
      </Component>
    );
  };


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          
          <div className="flex flex-1 items-center justify-end space-x-4">
            <NavMenu />
            
            <div className="flex items-center space-x-2">
              {isUserLoading ? (
                <Skeleton className="h-10 w-24" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                        <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline">{user.displayName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard">
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setAuthDialogOpen(true)} className="bg-primary text-primary-foreground">Login / Sign Up</Button>
              )}
            </div>

            <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 pt-6">
                 <NavMenu isMobile={true} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      {!user && <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />}
    </>
  );
}
