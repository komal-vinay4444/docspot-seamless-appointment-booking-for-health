import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { toast } from "react-toastify";

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  // ✅ Fetch approved doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/doctor/approved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Doctor Fetch Error:", err.message);
        toast.error("❌ Failed to load doctors");
      }
    };

    fetchDoctors();
  }, []);

  // ✅ Handle appointment booking
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        "/appointment/book",
        {
          doctorInfo: doctorId, // should be Doctor._id
          userInfo: user._id,
          date,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("✅ Appointment booked!");
      setDoctorId("");
      setDate("");
    } catch (err) {
      console.error("Booking Error:", err.message);
      toast.error("❌ Booking failed");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-4">📅 Book an Appointment</h2>

        {/* Doctor Selection */}
        <label className="block mb-4">
          Doctor:
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          >
            <option value="">Select a doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.fullname} — {doc.specialization}
              </option>
            ))}
          </select>
        </label>

        {/* Date Selection */}
        <label className="block mb-4">
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded w-full"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
