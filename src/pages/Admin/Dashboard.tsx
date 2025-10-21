import React, { useEffect } from 'react';
import AdminDashboardLayout from '../../components/DashboardLayout';




const Dashboard = () => {


  useEffect(() => {
    const userType = localStorage.getItem("userType");
    if (!userType || userType !== "admin") {
      window.location.href = "/";
    }
  }, []);
  return (
    <main className="flex-1 overflow-auto bg-background">
      <AdminDashboardLayout />
    </main>
  );
};

export default Dashboard;
