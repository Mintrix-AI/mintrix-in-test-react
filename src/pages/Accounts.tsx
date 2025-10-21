import { useState } from "react";
import { Users, GraduationCap, Briefcase, UserCog, Download, Plus, Eye, Pencil, Trash2, FileText, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import StudentDetailView from "@/components/accounts/StudentDetailView";
import TeacherDetailView from "@/components/accounts/TeacherDetailView";

type UserType = "all" | "students" | "teachers" | "staff";

const staticStudents = [
  { 
    id: "S001", name: "Rahul Sharma", class: "Class 10-A", email: "rahul.sharma@school.com", 
    phone: "+91 9876543210", joinDate: "2024-04-15", status: "Active", dob: "2008-05-15",
    address: "123 MG Road, Delhi", bloodGroup: "O+", fatherName: "Mr. Vijay Sharma",
    fatherPhone: "+91 9876543220", fatherOccupation: "Business", motherName: "Mrs. Sunita Sharma",
    motherPhone: "+91 9876543221", motherOccupation: "Teacher", admissionDate: "2024-04-15",
    rollNumber: "001", section: "A"
  },
  { 
    id: "S002", name: "Priya Patel", class: "Class 10-B", email: "priya.patel@school.com", 
    phone: "+91 9876543211", joinDate: "2024-04-16", status: "Active", dob: "2008-08-22",
    address: "456 Park Street, Mumbai", bloodGroup: "A+", fatherName: "Mr. Ramesh Patel",
    fatherPhone: "+91 9876543222", fatherOccupation: "Engineer", motherName: "Mrs. Kavita Patel",
    motherPhone: "+91 9876543223", motherOccupation: "Doctor", admissionDate: "2024-04-16",
    rollNumber: "002", section: "B"
  },
  { 
    id: "S003", name: "Amit Kumar", class: "Class 9-A", email: "amit.kumar@school.com", 
    phone: "+91 9876543212", joinDate: "2024-04-17", status: "Active", dob: "2009-03-10",
    address: "789 Lake View, Bangalore", bloodGroup: "B+", fatherName: "Mr. Suresh Kumar",
    fatherPhone: "+91 9876543224", fatherOccupation: "CA", motherName: "Mrs. Anjali Kumar",
    motherPhone: "+91 9876543225", motherOccupation: "Homemaker", admissionDate: "2024-04-17",
    rollNumber: "003", section: "A"
  },
  { 
    id: "S004", name: "Sneha Gupta", class: "Class 11-C", email: "sneha.gupta@school.com", 
    phone: "+91 9876543213", joinDate: "2024-04-18", status: "Inactive", dob: "2007-11-30",
    address: "321 Gandhi Nagar, Pune", bloodGroup: "AB+", fatherName: "Mr. Anil Gupta",
    fatherPhone: "+91 9876543226", fatherOccupation: "Lawyer", motherName: "Mrs. Meera Gupta",
    motherPhone: "+91 9876543227", motherOccupation: "Architect", admissionDate: "2024-04-18",
    rollNumber: "004", section: "C"
  },
];

const staticTeachers = [
  { 
    id: "T001", name: "Dr. Rajesh Verma", subject: "Mathematics", email: "rajesh.verma@school.com", 
    phone: "+91 9876543214", joinDate: "2020-01-10", status: "Active", dob: "1985-06-15",
    address: "45 Teachers Colony, Delhi", qualification: "M.Sc. Mathematics, B.Ed",
    experience: "8 years", employeeId: "EMP001", department: "Science"
  },
  { 
    id: "T002", name: "Mrs. Sunita Singh", subject: "English", email: "sunita.singh@school.com", 
    phone: "+91 9876543215", joinDate: "2019-06-15", status: "Active", dob: "1982-09-20",
    address: "78 Model Town, Mumbai", qualification: "M.A. English, B.Ed",
    experience: "10 years", employeeId: "EMP002", department: "Languages"
  },
  { 
    id: "T003", name: "Mr. Anil Joshi", subject: "Science", email: "anil.joshi@school.com", 
    phone: "+91 9876543216", joinDate: "2021-03-20", status: "Active", dob: "1988-02-10",
    address: "90 Green Park, Bangalore", qualification: "M.Sc. Physics, B.Ed",
    experience: "6 years", employeeId: "EMP003", department: "Science"
  },
];

const staticStaff = [
  { id: "ST001", name: "Mohan Lal", role: "Librarian", email: "mohan.lal@school.com", phone: "+91 9876543217", joinDate: "2018-09-01", status: "Active" },
  { id: "ST002", name: "Geeta Devi", role: "Office Administrator", email: "geeta.devi@school.com", phone: "+91 9876543218", joinDate: "2017-04-12", status: "Active" },
  { id: "ST003", name: "Ram Kumar", role: "Lab Assistant", email: "ram.kumar@school.com", phone: "+91 9876543219", joinDate: "2022-01-05", status: "Active" },
];

const Accounts = () => {
  const [selectedType, setSelectedType] = useState<UserType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [classFilter, setClassFilter] = useState<string>("all");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();

  const stats = [
    { title: "Total Students", value: staticStudents.length, icon: GraduationCap, color: "text-primary" },
    { title: "Total Teachers", value: staticTeachers.length, icon: Briefcase, color: "text-accent" },
    { title: "Total Staff", value: staticStaff.length, icon: UserCog, color: "text-secondary-foreground" },
    { title: "Total Users", value: staticStudents.length + staticTeachers.length + staticStaff.length, icon: Users, color: "text-foreground" },
  ];

  const getAllUsers = () => {
    const allUsers = [
      ...staticStudents.map(s => ({ ...s, type: "Student" as const, extraInfo: s.class })),
      ...staticTeachers.map(t => ({ ...t, type: "Teacher" as const, extraInfo: t.subject })),
      ...staticStaff.map(st => ({ ...st, type: "Staff" as const, extraInfo: st.role }))
    ];
    return allUsers.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesClass = classFilter === "all" || (u.type === "Student" && "class" in u && u.class.includes(classFilter));
      const matchesSubject = subjectFilter === "all" || (u.type === "Teacher" && "subject" in u && u.subject === subjectFilter);
      
      const joinDateObj = new Date(u.joinDate);
      const matchesDateFrom = !dateFrom || joinDateObj >= dateFrom;
      const matchesDateTo = !dateTo || joinDateObj <= dateTo;
      
      return matchesSearch && matchesClass && matchesSubject && matchesDateFrom && matchesDateTo;
    });
  };

  const getFilteredUsers = () => {
    if (selectedType === "students") {
      return staticStudents.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = classFilter === "all" || s.class.includes(classFilter);
        
        const joinDateObj = new Date(s.joinDate);
        const matchesDateFrom = !dateFrom || joinDateObj >= dateFrom;
        const matchesDateTo = !dateTo || joinDateObj <= dateTo;
        
        return matchesSearch && matchesClass && matchesDateFrom && matchesDateTo;
      }).map(s => ({ ...s, type: "Student", extraInfo: s.class }));
    }
    if (selectedType === "teachers") {
      return staticTeachers.filter(t => {
        const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSubject = subjectFilter === "all" || t.subject === subjectFilter;
        
        const joinDateObj = new Date(t.joinDate);
        const matchesDateFrom = !dateFrom || joinDateObj >= dateFrom;
        const matchesDateTo = !dateTo || joinDateObj <= dateTo;
        
        return matchesSearch && matchesSubject && matchesDateFrom && matchesDateTo;
      }).map(t => ({ ...t, type: "Teacher", extraInfo: t.subject }));
    }
    if (selectedType === "staff") {
      return staticStaff.filter(st => {
        const matchesSearch = st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          st.id.toLowerCase().includes(searchQuery.toLowerCase());
        
        const joinDateObj = new Date(st.joinDate);
        const matchesDateFrom = !dateFrom || joinDateObj >= dateFrom;
        const matchesDateTo = !dateTo || joinDateObj <= dateTo;
        
        return matchesSearch && matchesDateFrom && matchesDateTo;
      }).map(st => ({ ...st, type: "Staff", extraInfo: st.role }));
    }
    return getAllUsers();
  };

  const users = getFilteredUsers();

  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounts Management</h1>
            <p className="text-muted-foreground mt-1">Manage students, teachers, and staff accounts</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New User
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Directory</CardTitle>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedType} onValueChange={(value) => setSelectedType(value as UserType)}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="students">Students Only</SelectItem>
                    <SelectItem value="teachers">Teachers Only</SelectItem>
                    <SelectItem value="staff">Staff Only</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="w-4 h-4" />
                      Advanced Filters
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-3">Filter Options</h4>
                      </div>
                      
                      {(selectedType === "all" || selectedType === "students") && (
                        <div>
                          <Label className="text-sm">Class</Label>
                          <Select value={classFilter} onValueChange={setClassFilter}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Classes</SelectItem>
                              <SelectItem value="Class 9">Class 9</SelectItem>
                              <SelectItem value="Class 10">Class 10</SelectItem>
                              <SelectItem value="Class 11">Class 11</SelectItem>
                              <SelectItem value="Class 12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {(selectedType === "all" || selectedType === "teachers") && (
                        <div>
                          <Label className="text-sm">Subject</Label>
                          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Subjects</SelectItem>
                              <SelectItem value="Mathematics">Mathematics</SelectItem>
                              <SelectItem value="Science">Science</SelectItem>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Hindi">Hindi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div>
                        <Label className="text-sm">Join Date From</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                              {dateFrom ? dateFrom.toLocaleDateString() : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateFrom}
                              onSelect={setDateFrom}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div>
                        <Label className="text-sm">Join Date To</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full mt-1 justify-start text-left font-normal">
                              {dateTo ? dateTo.toLocaleDateString() : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={dateTo}
                              onSelect={setDateTo}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setClassFilter("all");
                          setSubjectFilter("all");
                          setDateFrom(undefined);
                          setDateTo(undefined);
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Badge variant={user.type === "Student" ? "default" : user.type === "Teacher" ? "secondary" : "outline"}>
                          {user.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{user.extraInfo}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-muted-foreground">{user.phone}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>
                                  {selectedUser?.type === "Student" ? "Student Profile" : 
                                   selectedUser?.type === "Teacher" ? "Teacher Profile" : "Staff Profile"}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedUser && (
                                <>
                                  {selectedUser.type === "Student" && <StudentDetailView student={selectedUser} />}
                                  {selectedUser.type === "Teacher" && <TeacherDetailView teacher={selectedUser} />}
                                  {selectedUser.type === "Staff" && (
                                    <div className="space-y-4 p-6">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label>ID</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.id}</p>
                                        </div>
                                        <div>
                                          <Label>Name</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.name}</p>
                                        </div>
                                        <div>
                                          <Label>Role</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.role}</p>
                                        </div>
                                        <div>
                                          <Label>Status</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.status}</p>
                                        </div>
                                        <div>
                                          <Label>Email</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.email}</p>
                                        </div>
                                        <div>
                                          <Label>Phone</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.phone}</p>
                                        </div>
                                        <div>
                                          <Label>Join Date</Label>
                                          <p className="text-sm text-foreground mt-1">{selectedUser.joinDate}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="icon">
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Accounts;
