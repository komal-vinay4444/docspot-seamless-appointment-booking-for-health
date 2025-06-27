import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/axios";
// import DashboardLayout from "../components/DashboardLayout";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    setNotifications(storedUser?.notification || []);
  }, []);

  const clearNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("/notifications/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedUser = { ...user, notification: [] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNotifications([]);
    } catch (error) {
      console.error("Clear Notification Error:", error.message);
    }
  };

  return (
    <div>
    <h1 className="text-2xl font-semibold text-gray-800 mb-4">
      Welcome, {user?.name} 👋
    </h1>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">🔔 Notifications</h2>

        {notifications.length === 0 ? (
          <p className="text-gray-500">No new notifications.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {notifications.map((note, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 p-4 rounded-md shadow"
                >
                  <p className="text-blue-800">{note.message || note}</p>
                  {note.date && (
                    <p className="text-sm text-blue-500 mt-1">
                      {new Date(note.date).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={clearNotifications}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear All Notifications
            </button>
          </>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/book"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            📅 Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
