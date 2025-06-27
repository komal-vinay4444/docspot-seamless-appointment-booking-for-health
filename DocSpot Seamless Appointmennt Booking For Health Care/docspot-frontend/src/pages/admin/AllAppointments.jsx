import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointment/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setAppointments(res.data.appointments || []);
    } catch (error) {
      toast.error("❌ Failed to fetch appointments");
      console.error(error.response?.data || error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/appointment/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(`✅ Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      toast.error("❌ Failed to update status");
    }
  };

  const deleteAppointment = async (id) => {
    try {
      await API.delete(`/appointment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("🗑️ Appointment deleted");
      fetchAppointments();
    } catch (error) {
      toast.error("❌ Failed to delete appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📋 All Appointment Requests</h2>
      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((a) => (
            <div key={a._id} className="bg-white p-4 rounded shadow">
              <p><strong>Doctor:</strong> {a.doctorInfo?.fullname || "Unknown"}</p>
              <p><strong>Patient:</strong> {a.userInfo?.name || "Unknown"}</p>
              <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
              <p><strong>Status:</strong>{" "}
                <span className={
                  a.status === "confirmed"
                    ? "text-green-600 font-semibold"
                    : a.status === "declined"
                    ? "text-red-600 font-semibold"
                    : "text-yellow-600 font-semibold"
                }>
                  {a.status}
                </span>
              </p>

              {a.status === "pending" && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => updateStatus(a._id, "confirmed")}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => updateStatus(a._id, "declined")}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    ❌ Decline
                  </button>
                </div>
              )}

              {/* 🗑️ Delete button always visible */}
              <div className="mt-2">
                <button
                  onClick={() => deleteAppointment(a._id)}
                  className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-800"
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

export default AllAppointments;
