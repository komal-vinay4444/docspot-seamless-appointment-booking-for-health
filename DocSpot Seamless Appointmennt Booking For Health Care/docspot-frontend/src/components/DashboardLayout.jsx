import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

const DashboardLayout = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex bg-gray-100 transition-all duration-300">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md transition-all duration-300 p-4 relative`}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Logo */}
        <div
          className={`text-xl font-bold text-blue-600 mb-6 ${
            isSidebarOpen ? "text-left" : "text-center"
          }`}
        >
          {isSidebarOpen ? "DocSpot" : "D"}
        </div>

        {/* Navigation */}
        <nav className="space-y-4 text-gray-700">
          <Link to="/dashboard" className="block hover:text-blue-600">
            {isSidebarOpen ? "🏠 Home" : "🏠"}
          </Link>
          <Link to="/notifications" className="block hover:text-blue-600">
            {isSidebarOpen ? "🔔 Notifications" : "🔔"}
          </Link>
          <Link to="/doctors" className="block hover:text-blue-600">
            {isSidebarOpen ? "👨‍⚕️ Doctors List" : "👨‍⚕️"}
          </Link>

          {/* User-only links */}
          {user?.type === "user" && (
            <>
              <Link to="/book" className="block hover:text-blue-600">
                {isSidebarOpen ? "📅 Book Appointment" : "📅"}
              </Link>
              <Link to="/doctor-register" className="block hover:text-blue-600">
                {isSidebarOpen ? "🩺 Become a Doctor" : "🩺"}
              </Link>
            </>
          )}

          {/* Admin-only links */}
          {user?.type === "admin" && (
            <>
              <Link to="/admin/pending-doctors" className="block hover:text-blue-600">
                {isSidebarOpen ? "🕐 Pending Approvals" : "🕐"}
              </Link>
              <Link to="/admin/users" className="block hover:text-blue-600">
                {isSidebarOpen ? "👥 User List" : "👥"}
              </Link>
              <Link to="/admin/appointments" className="block hover:text-blue-600">
                {isSidebarOpen ? "📅 Manage Appointments" : "📅"}
              </Link>
            </>
          )}

          {/* Doctor-only links */}
          {user?.type === "doctor" && (
            <>
              <Link to="/dashboard" className="block hover:text-blue-600">
                {isSidebarOpen ? "📅 My Appointments" : "📅"}
              </Link>
            </>
          )}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="block text-red-500 hover:underline"
          >
            {isSidebarOpen ? "🚪 Logout" : "🚪"}
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
