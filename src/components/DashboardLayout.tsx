import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import FloatingChatbot from "@/components/FloatingChatbot";
import Navbar from "@/components/Navbar";
import DashboardLayoutContent from "@/components/DashboardContent";

const DashboardLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <Outlet />
        

      </div>
      <FloatingChatbot />
    </div>
  );
};

export default DashboardLayout;
