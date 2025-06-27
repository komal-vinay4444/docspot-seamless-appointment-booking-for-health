import React, { useEffect, useState } from "react";
import API from "../utils/axios";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/doctor/approved", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctors(res.data.doctors || []);
    } catch (error) {
      console.error("Error fetching doctors:", error.message);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👨‍⚕️ Approved Doctors</h2>
      {doctors.length === 0 ? (
        <p>No approved doctors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => (
            <div
              key={doc._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="font-bold text-lg">{doc.fullname}</h3>
              <p><strong>Specialization:</strong> {doc.specialization}</p>
              <p><strong>Experience:</strong> {doc.experience} yrs</p>
              <p><strong>Fees:</strong> ₹{doc.fees}</p>
              <p><strong>Timings:</strong> {doc.timings?.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
