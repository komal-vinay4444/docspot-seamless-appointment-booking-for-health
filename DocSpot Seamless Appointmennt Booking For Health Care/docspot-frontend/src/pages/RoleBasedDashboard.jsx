// src/pages/RoleBasedDashboard.jsx

import React from "react";
import UserDashboard from "./UserDashboard";
import DoctorDashboard from "./DoctorDashboard";
import AdminDashboard from "./AdminDashboard";

const RoleBasedDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.type === "admin") return <AdminDashboard />;
  if (user?.type === "doctor") return <DoctorDashboard />;
  return <UserDashboard />;
};

export default RoleBasedDashboard;
