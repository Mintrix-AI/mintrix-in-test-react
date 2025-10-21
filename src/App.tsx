import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import StudentDashboard from "./pages/Students/Dashboard";
import ChatPage from "./pages/ChatPage";
import LessonPlan from "./pages/LessonPlan";
import Accounts from "./pages/Accounts";
import Timetable from "./pages/Timetable";
import Attendance from "./pages/Attendance";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./Context/AuthContext";
import DashboardContent from "./components/DashboardContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* LOGIN */}
            <Route path="/" element={<Login />} />

            {/* ADMIN DASHBOARD WITH NESTED ROUTES */}
            <Route path="/dashboard/admin" element={<AdminDashboard />}>

              <Route path="chat" element={<ChatPage />} />
              <Route path="lesson-plan" element={<LessonPlan />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="attendance" element={<Attendance />} />
            </Route>

            {/* OTHER ROLES */}
            <Route path="/dashboard/teacher" element={<TeacherDashboard />} >
              <Route path="home" element={<DashboardContent />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="lesson-plan" element={<LessonPlan />} />
              <Route path="timetable" element={<Timetable />} />
              <Route path="attendance" element={<Attendance />} />

            </Route>
            <Route path="/dashboard/student" element={<StudentDashboard />} />

            {/* NOT FOUND */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
