import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || {});
    setNotifications(storedUser?.notification || []);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, {user?.name} 👋
      </h1>
      <p className="text-gray-600 mb-6">
        You're logged in as <strong>{user?.type}</strong>
      </p>

      <h2 className="text-xl font-semibold mb-4">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No new notifications.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notifications.map((notif, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
            >
              <p className="text-gray-800">{notif.message || notif}</p>
              {notif.date && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(notif.date).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ Show Book Appointment only for users */}
      {user?.type === "user" && (
        <div className="mt-6">
          <Link
            to="/book"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            📅 Book Appointment
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
