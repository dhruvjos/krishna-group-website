'use client';

import { useMemo } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { collectionGroup, query, orderBy } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { useMemoFirebase } from '@/firebase/provider';

interface RegistrationData {
  id: string;
  courseName: string;
  userName: string;
  userPhone: string;
  userQuery?: string;
  registrationDate: { seconds: number; nanoseconds: number } | null;
}

function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.push('/');
        return;
      }
      user.getIdTokenResult().then((idTokenResult) => {
        const isAdminClaim = !!idTokenResult.claims.admin;
        if (isAdminClaim) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          router.push('/');
        }
      });
    }
  }, [user, isUserLoading, router]);

  const registrationsQuery = useMemoFirebase(() => {
    if (isAdmin) {
      return query(collectionGroup(firestore, 'courseRegistrations'), orderBy('registrationDate', 'desc'));
    }
    return null;
  }, [firestore, isAdmin]);

  const { data: registrations, isLoading, error } = useCollection<RegistrationData>(registrationsQuery);

  if (isUserLoading || isAdmin === null) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-center font-headline text-3xl font-bold">Loading Dashboard...</h1>
        <div className="mt-8 space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-16">Error loading registrations: {error.message}</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
       <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Admin Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
            View and manage all course registrations.
          </p>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>All Course Registrations</CardTitle>
              <CardDescription>A complete list of all user enrollments.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Registered On</TableHead>
                    <TableHead>Query</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading && Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                    </TableRow>
                  ))}
                  {registrations && registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.userName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{reg.courseName}</Badge>
                      </TableCell>
                      <TableCell>{reg.userPhone}</TableCell>
                      <TableCell>
                        {reg.registrationDate
                          ? format(new Date(reg.registrationDate.seconds * 1000), 'PPP p')
                          : 'Date not available'}
                      </TableCell>
                       <TableCell>{reg.userQuery || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
               {registrations && registrations.length === 0 && !isLoading && (
                <div className="py-8 text-center text-muted-foreground">
                  No registrations found yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

    