import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { User, Users, Phone, Mail, MapPin, Calendar, GraduationCap, TrendingUp, DollarSign, CheckCircle, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StudentData {
  id: string;
  name: string;
  class: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  bloodGroup: string;
  fatherName: string;
  fatherPhone: string;
  fatherOccupation: string;
  motherName: string;
  motherPhone: string;
  motherOccupation: string;
  guardian?: string;
  guardianPhone?: string;
  admissionDate: string;
  rollNumber: string;
  section: string;
  status: string;
}

interface PerformanceData {
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface AttendanceData {
  month: string;
  present: number;
  total: number;
}

interface FeeData {
  month: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  dueDate: string;
}

interface StudentDetailViewProps {
  student: StudentData;
}

const mockPerformance: PerformanceData[] = [
  { subject: "Mathematics", marks: 85, maxMarks: 100, grade: "A" },
  { subject: "Science", marks: 78, maxMarks: 100, grade: "B+" },
  { subject: "English", marks: 92, maxMarks: 100, grade: "A+" },
  { subject: "Hindi", marks: 88, maxMarks: 100, grade: "A" },
  { subject: "Social Studies", marks: 75, maxMarks: 100, grade: "B+" },
];

const mockAttendance: AttendanceData[] = [
  { month: "January", present: 22, total: 24 },
  { month: "February", present: 20, total: 22 },
  { month: "March", present: 23, total: 25 },
  { month: "April", present: 21, total: 23 },
];

const mockFees: FeeData[] = [
  { month: "January", amount: 5000, status: "Paid", dueDate: "2024-01-10" },
  { month: "February", amount: 5000, status: "Paid", dueDate: "2024-02-10" },
  { month: "March", amount: 5000, status: "Paid", dueDate: "2024-03-10" },
  { month: "April", amount: 5000, status: "Pending", dueDate: "2024-04-10" },
];

const StudentDetailView = ({ student }: StudentDetailViewProps) => {
  const totalAttendance = mockAttendance.reduce((acc, curr) => ({
    present: acc.present + curr.present,
    total: acc.total + curr.total
  }), { present: 0, total: 0 });
  
  const attendancePercentage = Math.round((totalAttendance.present / totalAttendance.total) * 100);
  
  const averageMarks = Math.round(
    mockPerformance.reduce((acc, curr) => acc + (curr.marks / curr.maxMarks) * 100, 0) / mockPerformance.length
  );

  return (
    <ScrollArea className="h-[80vh]">
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
            <p className="text-muted-foreground">Roll No: {student.rollNumber} | Class: {student.class}</p>
          </div>
          <Badge variant={student.status === "Active" ? "default" : "secondary"}>
            {student.status}
          </Badge>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="fees">Fees</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground">Student ID</Label>
                    <p className="text-foreground font-medium mt-1">{student.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="text-foreground font-medium mt-1">{student.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.dob}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Blood Group</Label>
                    <p className="text-foreground font-medium mt-1">{student.bloodGroup}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.address}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Admission Date
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.admissionDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Section</Label>
                    <p className="text-foreground font-medium mt-1">{student.section}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="parents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Father's Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="text-foreground font-medium mt-1">{student.fatherName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Occupation</Label>
                    <p className="text-foreground font-medium mt-1">{student.fatherOccupation}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.fatherPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Mother's Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="text-foreground font-medium mt-1">{student.motherName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Occupation</Label>
                    <p className="text-foreground font-medium mt-1">{student.motherOccupation}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <p className="text-foreground font-medium mt-1">{student.motherPhone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {student.guardian && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Guardian's Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-muted-foreground">Name</Label>
                      <p className="text-foreground font-medium mt-1">{student.guardian}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone
                      </Label>
                      <p className="text-foreground font-medium mt-1">{student.guardianPhone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                      <p className="text-2xl font-bold text-foreground">{averageMarks}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Grade</p>
                      <p className="text-2xl font-bold text-foreground">A</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-secondary-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Class Rank</p>
                      <p className="text-2xl font-bold text-foreground">3/45</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPerformance.map((perf) => {
                    const percentage = (perf.marks / perf.maxMarks) * 100;
                    return (
                      <div key={perf.subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{perf.subject}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {perf.marks}/{perf.maxMarks}
                            </span>
                            <Badge>{perf.grade}</Badge>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CheckCircle className="w-10 h-10 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Attendance</p>
                    <p className="text-3xl font-bold text-foreground">{attendancePercentage}%</p>
                    <p className="text-sm text-muted-foreground">
                      {totalAttendance.present} out of {totalAttendance.total} days
                    </p>
                  </div>
                </div>
                <Progress value={attendancePercentage} className="h-3" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAttendance.map((att) => {
                    const percentage = Math.round((att.present / att.total) * 100);
                    return (
                      <div key={att.month} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-foreground">{att.month}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {att.present}/{att.total} days
                            </span>
                            <span className="font-semibold text-foreground min-w-[50px] text-right">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Fees</p>
                      <p className="text-2xl font-bold text-foreground">₹20,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Paid</p>
                      <p className="text-2xl font-bold text-foreground">₹15,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Fee Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockFees.map((fee) => (
                    <div key={fee.month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{fee.month} 2024</p>
                        <p className="text-sm text-muted-foreground">Due: {fee.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-foreground">₹{fee.amount}</p>
                        <Badge variant={
                          fee.status === "Paid" ? "default" : 
                          fee.status === "Pending" ? "secondary" : 
                          "destructive"
                        }>
                          {fee.status === "Paid" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {fee.status === "Overdue" && <XCircle className="w-3 h-3 mr-1" />}
                          {fee.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default StudentDetailView;
