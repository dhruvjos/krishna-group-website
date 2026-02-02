
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

const studentData = [
  { id: 1, name: "Aarav Sharma", course: "Leadership Excellence", status: "Completed", score: 92, year: 2023 },
  { id: 2, name: "Priya Patel", course: "Global Language Program", status: "Completed", score: 88, year: 2023 },
  { id: 3, name: "Rohan Singh", course: "Career Accelerator", status: "In Progress", score: null, year: 2024 },
  { id: 4, name: "Anika Gupta", course: "Leadership Excellence", status: "Completed", score: 95, year: 2022 },
  { id: 5, name: "Vikram Reddy", course: "Robotics & Tech", status: "Completed", score: 91, year: 2023 },
  { id: 6, name: "Isha Kumar", course: "Aarya Maths", status: "Completed", score: 98, year: 2024 },
  { id: 7, name: "Arjun Verma", course: "Interview Prep", status: "In Progress", score: null, year: 2024 },
  { id: 8, name: "Mira Desai", course: "Global Language Program", status: "Completed", score: 85, year: 2022 },
];

const chartData = [
  { year: 2022, students: 45, averageScore: 88 },
  { year: 2023, students: 62, averageScore: 91 },
  { year: 2024, students: 75, averageScore: 93 },
];

export default function ReportsPage() {
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
            Student Success Analytics
          </h1>
          <p className="mt-4 max-w-3xl text-xl text-muted-foreground">
            A detailed overview of our student performance, enrollment trends, and success metrics over the past few years.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
           <Card>
            <CardHeader>
              <CardTitle>Enrollment Growth</CardTitle>
              <CardDescription>Number of students enrolled per year.</CardDescription>
            </CardHeader>
            <CardContent>
               <ChartContainer config={{
                  students: {
                    label: "Students",
                    color: "hsl(var(--primary))",
                  },
                }} className="h-[250px] w-full">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="students" fill="var(--color-students)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Average Performance</CardTitle>
              <CardDescription>Average course completion score per year.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                  averageScore: {
                    label: "Avg. Score",
                    color: "hsl(var(--accent))",
                  },
                }} className="h-[250px] w-full">
                <BarChart data={chartData} accessibilityLayer>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="averageScore" fill="var(--color-averageScore)" radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Records</CardTitle>
              <CardDescription>A list of recently enrolled students and their current status.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                     <TableHead className="text-right">Year</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentData.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.course}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={student.status === "Completed" ? "default" : "secondary"}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{student.score ?? "N/A"}</TableCell>
                      <TableCell className="text-right">{student.year}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
