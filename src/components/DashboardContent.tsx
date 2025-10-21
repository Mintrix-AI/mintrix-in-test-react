import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  MessageSquare,
  LogOut,
  UserCheck,
  BookOpen
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const DashboardContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const stats = [
    { title: "Total Students", value: "2,847", icon: Users, change: "+12%", color: "text-blue-600" },
    { title: "Fee Collection", value: "₹24.5L", icon: DollarSign, change: "+8%", color: "text-green-600" },
    { title: "Attendance Rate", value: "94.2%", icon: UserCheck, change: "+2%", color: "text-purple-600" },
    { title: "Active Teachers", value: "187", icon: BookOpen, change: "+5", color: "text-orange-600" },
  ];

  const upcomingEvents = [
    { title: "Annual Sports Day", date: "Oct 15, 2025", type: "Event" },
    { title: "Parent-Teacher Meeting", date: "Oct 20, 2025", type: "Meeting" },
    { title: "Mid-term Exams", date: "Oct 25, 2025", type: "Exam" },
  ];

  const recentQueries = [
    { parent: "Mrs. Sharma", query: "Fee payment issue", time: "2h ago", status: "Pending" },
    { parent: "Mr. Kumar", query: "Transport route change", time: "5h ago", status: "Resolved" },
    { parent: "Mrs. Patel", query: "Admission inquiry", time: "1d ago", status: "Pending" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Administrator</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Admission Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Admission Trends
              </CardTitle>
              <CardDescription>Monthly admission statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["January", "February", "March", "April"].map((month, i) => (
                  <div key={month} className="flex items-center justify-between">
                    <span className="text-sm">{month}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${60 + i * 10}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {180 + i * 20}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teacher KPI */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Teacher Performance
              </CardTitle>
              <CardDescription>Top performing teachers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Dr. Mehta", "Prof. Singh", "Mrs. Gupta", "Mr. Verma"].map((teacher, i) => (
                  <div key={teacher} className="flex items-center justify-between">
                    <span className="text-sm">{teacher}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600 rounded-full" 
                          style={{ width: `${95 - i * 3}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">
                        {95 - i * 3}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Events and Queries Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.title} className="flex items-start justify-between pb-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {event.type}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Parent Queries */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Parent Queries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQueries.map((query) => (
                  <div key={query.query} className="flex items-start justify-between pb-3 border-b last:border-0">
                    <div className="flex-1">
                      <p className="font-medium">{query.parent}</p>
                      <p className="text-sm text-muted-foreground">{query.query}</p>
                      <p className="text-xs text-muted-foreground mt-1">{query.time}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      query.status === "Resolved" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {query.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DashboardContent;
