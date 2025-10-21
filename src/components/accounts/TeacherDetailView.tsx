import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, MapPin, Calendar, BookOpen, Users, Award, Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TeacherData {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  qualification: string;
  experience: string;
  joiningDate: string;
  employeeId: string;
  department: string;
  status: string;
}

interface ClassData {
  class: string;
  section: string;
  subject: string;
  students: number;
}

interface PerformanceMetric {
  metric: string;
  value: string;
  status: "Excellent" | "Good" | "Average";
}

interface TeacherDetailViewProps {
  teacher: TeacherData;
}

const mockClasses: ClassData[] = [
  { class: "Class 10", section: "A", subject: "Mathematics", students: 45 },
  { class: "Class 10", section: "B", subject: "Mathematics", students: 42 },
  { class: "Class 9", section: "A", subject: "Mathematics", students: 48 },
  { class: "Class 9", section: "C", subject: "Mathematics", students: 40 },
];

const mockPerformance: PerformanceMetric[] = [
  { metric: "Student Average Score", value: "82%", status: "Excellent" },
  { metric: "Class Pass Rate", value: "95%", status: "Excellent" },
  { metric: "Student Satisfaction", value: "4.5/5", status: "Good" },
  { metric: "Attendance Rate", value: "96%", status: "Excellent" },
];

const mockSchedule = [
  { day: "Monday", time: "9:00 AM - 10:00 AM", class: "Class 10-A", subject: "Mathematics" },
  { day: "Monday", time: "10:15 AM - 11:15 AM", class: "Class 10-B", subject: "Mathematics" },
  { day: "Tuesday", time: "9:00 AM - 10:00 AM", class: "Class 9-A", subject: "Mathematics" },
  { day: "Tuesday", time: "11:30 AM - 12:30 PM", class: "Class 9-C", subject: "Mathematics" },
  { day: "Wednesday", time: "9:00 AM - 10:00 AM", class: "Class 10-A", subject: "Mathematics" },
];

const TeacherDetailView = ({ teacher }: TeacherDetailViewProps) => {
  const totalStudents = mockClasses.reduce((acc, curr) => acc + curr.students, 0);

  return (
    <ScrollArea className="h-[80vh]">
      <div className="space-y-6 p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{teacher.name}</h2>
            <p className="text-muted-foreground">
              {teacher.subject} Teacher | Employee ID: {teacher.employeeId}
            </p>
          </div>
          <Badge variant={teacher.status === "Active" ? "default" : "secondary"}>
            {teacher.status}
          </Badge>
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
                    <Label className="text-muted-foreground">Employee ID</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.id}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Full Name</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date of Birth
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.dob}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.email}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.phone}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Department</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.department}</p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Professional Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Subject Specialization
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.subject}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Qualification</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.qualification}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Experience</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.experience}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Joining Date
                    </Label>
                    <p className="text-foreground font-medium mt-1">{teacher.joiningDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Department</Label>
                    <p className="text-foreground font-medium mt-1">{teacher.department}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Employment Type</Label>
                    <p className="text-foreground font-medium mt-1">Full Time</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications & Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-foreground">M.Sc. Mathematics</p>
                    <p className="text-sm text-muted-foreground">Delhi University - 2015</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-foreground">B.Ed (Bachelor of Education)</p>
                    <p className="text-sm text-muted-foreground">NCERT - 2017</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-foreground">Advanced Teaching Methods Certificate</p>
                    <p className="text-sm text-muted-foreground">Teaching Excellence Institute - 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Classes</p>
                      <p className="text-2xl font-bold text-foreground">{mockClasses.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Clock className="w-8 h-8 text-secondary-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Weekly Hours</p>
                      <p className="text-2xl font-bold text-foreground">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Assigned Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class</TableHead>
                        <TableHead>Section</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Students</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockClasses.map((cls, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{cls.class}</TableCell>
                          <TableCell>{cls.section}</TableCell>
                          <TableCell>{cls.subject}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{cls.students} students</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Teaching Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {mockPerformance.map((metric) => (
                    <div key={metric.metric} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{metric.metric}</p>
                        <Badge variant={
                          metric.status === "Excellent" ? "default" : 
                          metric.status === "Good" ? "secondary" : 
                          "outline"
                        }>
                          {metric.status}
                        </Badge>
                      </div>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Best Teacher Award 2023</p>
                        <p className="text-sm text-muted-foreground">
                          Recognized for outstanding teaching performance
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">100% Pass Rate Achievement</p>
                        <p className="text-sm text-muted-foreground">
                          All students passed with distinction in Mathematics
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-secondary-foreground mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Student Excellence Mentor</p>
                        <p className="text-sm text-muted-foreground">
                          Mentored 5 students to state-level competition
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Day</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Subject</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSchedule.map((schedule, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{schedule.day}</TableCell>
                          <TableCell>{schedule.time}</TableCell>
                          <TableCell>{schedule.class}</TableCell>
                          <TableCell>{schedule.subject}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-foreground">Monday - Friday</span>
                    <span className="text-muted-foreground">2:00 PM - 3:30 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-foreground">Saturday</span>
                    <span className="text-muted-foreground">10:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
};

export default TeacherDetailView;
