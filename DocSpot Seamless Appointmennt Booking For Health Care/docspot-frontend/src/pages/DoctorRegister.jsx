import React, { useState } from "react";
import API from "../utils/axios";
import { toast } from "react-toastify";

const DoctorRegister = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      // Prepare parsed data
      const payload = {
        ...form,
        userId: user._id,
        timings: form.timings.split(",").map((t) => t.trim()),
        experience: Number(form.experience.replace(/[^\d]/g, "")), // extract digits only
        fees: Number(form.fees.replace(/,/g, "")), // remove commas
      };

      await API.post("/doctor/register", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("✅ Doctor Registration Submitted");

      setForm({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        specialization: "",
        experience: "",
        fees: "",
        timings: "",
      });
    } catch (error) {
      console.error("Doctor Register Error:", error.message);
      toast.error("❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">🩺 Doctor Registration</h2>

        {Object.keys(form).map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-lg"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          {loading ? "Submitting..." : "Submit for Approval"}
        </button>
      </form>
    </div>
  );
};

export default DoctorRegister;
