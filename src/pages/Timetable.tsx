import { useState } from "react";
import { Calendar, Clock, Download, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const timeSlots = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 01:00",
  "01:00 - 02:00",
  "02:00 - 03:00",
  "03:00 - 04:00"
];

const staticTimetable: Record<string, Record<string, { subject: string; teacher: string; room: string } | null>> = {
  "Class 10-A": {
    "Monday-08:00 - 09:00": { subject: "Mathematics", teacher: "Dr. Rajesh Verma", room: "Room 101" },
    "Monday-09:00 - 10:00": { subject: "English", teacher: "Mrs. Sunita Singh", room: "Room 102" },
    "Monday-10:00 - 11:00": { subject: "Science", teacher: "Mr. Anil Joshi", room: "Lab 1" },
    "Monday-11:00 - 12:00": { subject: "History", teacher: "Dr. Rajesh Verma", room: "Room 103" },
    "Monday-12:00 - 01:00": null,
    "Monday-01:00 - 02:00": { subject: "Physical Education", teacher: "Mrs. Sunita Singh", room: "Ground" },
    "Monday-02:00 - 03:00": { subject: "Computer Science", teacher: "Mr. Anil Joshi", room: "Lab 2" },
    "Tuesday-08:00 - 09:00": { subject: "Science", teacher: "Mr. Anil Joshi", room: "Lab 1" },
    "Tuesday-09:00 - 10:00": { subject: "Mathematics", teacher: "Dr. Rajesh Verma", room: "Room 101" },
    "Tuesday-10:00 - 11:00": { subject: "English", teacher: "Mrs. Sunita Singh", room: "Room 102" },
    "Tuesday-11:00 - 12:00": { subject: "Geography", teacher: "Dr. Rajesh Verma", room: "Room 103" },
    "Tuesday-12:00 - 01:00": null,
    "Tuesday-01:00 - 02:00": { subject: "Hindi", teacher: "Mrs. Sunita Singh", room: "Room 104" },
    "Tuesday-02:00 - 03:00": { subject: "Art", teacher: "Mr. Anil Joshi", room: "Art Room" },
    "Wednesday-08:00 - 09:00": { subject: "Mathematics", teacher: "Dr. Rajesh Verma", room: "Room 101" },
    "Wednesday-09:00 - 10:00": { subject: "Science", teacher: "Mr. Anil Joshi", room: "Lab 1" },
    "Wednesday-10:00 - 11:00": { subject: "English", teacher: "Mrs. Sunita Singh", room: "Room 102" },
    "Wednesday-11:00 - 12:00": { subject: "Social Studies", teacher: "Dr. Rajesh Verma", room: "Room 103" },
    "Wednesday-12:00 - 01:00": null,
    "Wednesday-01:00 - 02:00": { subject: "Computer Science", teacher: "Mr. Anil Joshi", room: "Lab 2" },
    "Wednesday-02:00 - 03:00": { subject: "Music", teacher: "Mrs. Sunita Singh", room: "Music Room" },
  },
  "Class 10-B": {
    "Monday-08:00 - 09:00": { subject: "English", teacher: "Mrs. Sunita Singh", room: "Room 102" },
    "Monday-09:00 - 10:00": { subject: "Mathematics", teacher: "Dr. Rajesh Verma", room: "Room 101" },
    "Monday-10:00 - 11:00": { subject: "Hindi", teacher: "Mrs. Sunita Singh", room: "Room 104" },
    "Monday-11:00 - 12:00": { subject: "Science", teacher: "Mr. Anil Joshi", room: "Lab 1" },
    "Monday-12:00 - 01:00": null,
    "Monday-01:00 - 02:00": { subject: "History", teacher: "Dr. Rajesh Verma", room: "Room 103" },
    "Monday-02:00 - 03:00": { subject: "Physical Education", teacher: "Mrs. Sunita Singh", room: "Ground" },
  }
};

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState("Class 10-A");
  const [selectedSection, setSelectedSection] = useState("All");

  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Timetable Management</h1>
            <p className="text-muted-foreground mt-1">View and manage weekly timetables for all classes</p>
          </div>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Timetable
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-bold text-foreground">24</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Daily Periods</p>
                  <p className="text-2xl font-bold text-foreground">7</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <Filter className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Working Days</p>
                  <p className="text-2xl font-bold text-foreground">6</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Weekly Schedule</CardTitle>
              <div className="flex gap-3">
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 10-A">Class 10-A</SelectItem>
                    <SelectItem value="Class 10-B">Class 10-B</SelectItem>
                    <SelectItem value="Class 9-A">Class 9-A</SelectItem>
                    <SelectItem value="Class 11-C">Class 11-C</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSection} onValueChange={setSelectedSection}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Sections</SelectItem>
                    <SelectItem value="Section A">Section A</SelectItem>
                    <SelectItem value="Section B">Section B</SelectItem>
                    <SelectItem value="Section C">Section C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left text-sm font-medium text-muted-foreground bg-muted/50 sticky left-0">
                      Time
                    </th>
                    {daysOfWeek.map((day) => (
                      <th key={day} className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted/50 min-w-[180px]">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time} className="border-b border-border">
                      <td className="p-3 text-sm font-medium text-foreground bg-muted/30 sticky left-0">
                        {time}
                      </td>
                      {daysOfWeek.map((day) => {
                        const key = `${day}-${time}`;
                        const period = staticTimetable[selectedClass]?.[key];
                        
                        return (
                          <td key={day} className="p-2">
                            {period ? (
                              <div className="bg-card border border-border rounded-lg p-3 hover:shadow-md transition-shadow">
                                <p className="font-semibold text-sm text-foreground mb-1">
                                  {period.subject}
                                </p>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {period.teacher}
                                </p>
                                <Badge variant="outline" className="text-xs">
                                  {period.room}
                                </Badge>
                              </div>
                            ) : time.includes("12:00") ? (
                              <div className="bg-secondary/50 rounded-lg p-3 text-center">
                                <p className="text-xs font-medium text-muted-foreground">
                                  Lunch Break
                                </p>
                              </div>
                            ) : (
                              <div className="bg-muted/20 rounded-lg p-3 text-center">
                                <p className="text-xs text-muted-foreground">Free</p>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Timetable;
