import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import BookAppointment from "./pages/BookAppointment";
import DoctorRegister from "./pages/DoctorRegister";
import NotificationPage from "./pages/NotificationPage";
import DoctorsList from "./pages/DoctorsList";
import PendingDoctors from "./pages/PendingDoctors";
import UserList from "./pages/admin/UserList";
import AllAppointments from "./pages/admin/AllAppointments"; 
import RoleBasedDashboard from "./pages/RoleBasedDashboard";

// Layout & Context
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import { SidebarProvider } from "./context/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* 🔐 Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Shared Dashboard Routes */}
            <Route
  path="dashboard"
  element={
    <ProtectedRoute>
      <RoleBasedDashboard />
    </ProtectedRoute>
  }
/>

            <Route path="user-dashboard" element={<UserDashboard />} />
            <Route path="doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="notifications" element={<NotificationPage />} />
            <Route
              path="admin/appointments"
              element={
                <ProtectedRoute allowedTypes={["admin"]}>
                  <AllAppointments />
                </ProtectedRoute>
              }
            />

            {/* User-only routes */}
            <Route
              path="book"
              element={
                <ProtectedRoute allowedTypes={["user"]}>
                  <BookAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="doctor-register"
              element={
                <ProtectedRoute allowedTypes={["user"]}>
                  <DoctorRegister />
                </ProtectedRoute>
              }
            />

            {/* Shared for all roles */}
            <Route
              path="doctors"
              element={
                <ProtectedRoute allowedTypes={["user", "doctor", "admin"]}>
                  <DoctorsList />
                </ProtectedRoute>
              }
            />

            {/* Admin-only routes */}
            <Route
              path="admin/pending-doctors"
              element={
                <ProtectedRoute allowedTypes={["admin"]}>
                  <PendingDoctors />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/users"
              element={
                <ProtectedRoute allowedTypes={["admin"]}>
                  <UserList />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Fallback route */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
                404 - Page Not Found
              </div>
            }
          />
        </Routes>

        <ToastContainer position="top-center" autoClose={3000} />
      </Router>
    </SidebarProvider>
  );
}

export default App;
