import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, TrendingUp, Users, UserCheck, UserX, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

const dailyAttendanceData = [
  { date: "Mon", students: 485, teachers: 28, present: 513, absent: 25 },
  { date: "Tue", students: 492, teachers: 29, present: 521, absent: 17 },
  { date: "Wed", students: 478, teachers: 27, present: 505, absent: 33 },
  { date: "Thu", students: 495, teachers: 30, present: 525, absent: 13 },
  { date: "Fri", students: 488, teachers: 28, present: 516, absent: 22 },
  { date: "Sat", students: 470, teachers: 26, present: 496, absent: 42 },
];

const weeklyTrendData = [
  { week: "Week 1", attendance: 92 },
  { week: "Week 2", attendance: 89 },
  { week: "Week 3", attendance: 94 },
  { week: "Week 4", attendance: 91 },
];

const classWiseData = [
  { class: "Class 10-A", present: 45, absent: 5, percentage: 90 },
  { class: "Class 10-B", present: 42, absent: 8, percentage: 84 },
  { class: "Class 9-A", present: 48, absent: 2, percentage: 96 },
  { class: "Class 11-C", present: 38, absent: 12, percentage: 76 },
];

const overallDistribution = [
  { name: "Present", value: 516, color: "hsl(var(--primary))" },
  { name: "Absent", value: 22, color: "hsl(var(--destructive))" },
  { name: "Late", value: 8, color: "hsl(var(--accent))" },
];

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedType, setSelectedType] = useState("All");

  const todayStats = dailyAttendanceData[dailyAttendanceData.length - 1];
  const totalPresent = todayStats.students + todayStats.teachers;
  const totalExpected = 538;
  const attendanceRate = ((totalPresent / totalExpected) * 100).toFixed(1);

  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Attendance Management</h1>
            <p className="text-muted-foreground mt-1">Track and analyze daily attendance reports</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="Yesterday">Yesterday</SelectItem>
                <SelectItem value="This Week">This Week</SelectItem>
                <SelectItem value="This Month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Users</SelectItem>
                <SelectItem value="Students">Students Only</SelectItem>
                <SelectItem value="Teachers">Teachers Only</SelectItem>
              </SelectContent>
            </Select>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-bold text-foreground">{totalPresent}</p>
                  <p className="text-xs text-primary mt-1">{attendanceRate}% attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <UserX className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Absent Today</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.absent}</p>
                  <p className="text-xs text-destructive mt-1">
                    {((todayStats.absent / totalExpected) * 100).toFixed(1)}% absence
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Students Present</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.students}</p>
                  <p className="text-xs text-muted-foreground mt-1">Out of 500 total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Teachers Present</p>
                  <p className="text-2xl font-bold text-foreground">{todayStats.teachers}</p>
                  <p className="text-xs text-muted-foreground mt-1">Out of 30 total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyAttendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="students" fill="hsl(var(--primary))" name="Students" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="teachers" fill="hsl(var(--accent))" name="Teachers" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={overallDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="hsl(var(--primary))"
                    dataKey="value"
                  >
                    {overallDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="attendance" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="Attendance %"
                    dot={{ fill: "hsl(var(--primary))", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Class-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classWiseData.map((item) => (
                  <div key={item.class}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{item.class}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.present}/{item.present + item.absent} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Attendance;
