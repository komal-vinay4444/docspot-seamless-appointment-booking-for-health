import React, { useEffect, useState } from "react";
import API from "../utils/axios";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // 1. First get the Doctor ID using user._id
      const res = await API.get(`/doctor/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      const doctorId = res.data.doctor?._id;

      // 2. Now fetch appointments with that doctorId
      if (doctorId) {
        const appointmentsRes = await API.get(`/appointment/doctor/${doctorId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAppointments(appointmentsRes.data.appointments || []);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/appointment/status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchAppointments(); // Refresh list after update
    } catch (error) {
      console.error(`Error updating status to ${status}:`, error.message);
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/appointment/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchAppointments(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting appointment:", error.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Doctor Dashboard 🩺 — Dr. {JSON.parse(localStorage.getItem("user"))?.name}
      </h1>
      <p className="text-gray-600 mb-6">
        View and manage your patient appointments below.
      </p>

      <h3 className="text-xl font-semibold mb-4">📅 Appointments</h3>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div
              key={a._id}
              className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded-lg shadow-sm"
            >
              <p>
                <strong className="text-gray-700">Patient:</strong>{" "}
                {a.userInfo?.name || "Unknown"}
              </p>
              <p>
                <strong className="text-gray-700">Date:</strong>{" "}
                {new Date(a.date).toLocaleString()}
              </p>
              <p>
                <strong className="text-gray-700">Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    a.status === "confirmed"
                      ? "text-green-600"
                      : a.status === "declined"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {a.status}
                </span>
              </p>

              {/* Approve/Decline buttons for pending */}
              {a.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(a._id, "confirmed")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "declined")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    ❌ Decline
                  </button>
                </div>
              )}

              {/* Delete Button for all statuses */}
              <div className="mt-3">
                <button
                  onClick={() => deleteAppointment(a._id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
