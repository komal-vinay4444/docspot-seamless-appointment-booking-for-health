// src/pages/admin/PendingDoctors.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/axios"; // ✅ Make sure path is correct
import { toast } from "react-toastify";

const PendingDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  const fetchPendingDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/admin/pending-doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.doctors);
    } catch (err) {
      toast.error("❌ Failed to load pending doctors");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");
      setApprovingId(doctorId);
      await API.put(
        `/admin/approve-doctor/${doctorId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Doctor Approved");
      fetchPendingDoctors(); // Refresh after approval
    } catch (err) {
      toast.error("❌ Approval failed");
      console.error(err.message);
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    fetchPendingDoctors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📋 Pending Doctor Approvals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-500">No pending doctor requests.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div key={doc._id} className="bg-white shadow-md p-4 rounded-md border">
              <h3 className="text-lg font-semibold">{doc.fullname}</h3>
              <p><strong>Specialization:</strong> {doc.specialization}</p>
              <p><strong>Experience:</strong> {doc.experience} years</p>
              <p><strong>Fees:</strong> ₹{doc.fees}</p>
              <p><strong>Email:</strong> {doc.email}</p>
              <p><strong>Phone:</strong> {doc.phone}</p>
              <p><strong>Timings:</strong> {doc.timings?.join(", ")}</p>

              <button
                onClick={() => handleApprove(doc._id)}
                disabled={approvingId === doc._id}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >
                {approvingId === doc._id ? "Approving..." : "✅ Approve"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDoctors;
