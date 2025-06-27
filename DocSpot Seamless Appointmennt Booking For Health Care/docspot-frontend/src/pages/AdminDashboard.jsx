import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [doctorRes, userRes] = await Promise.all([
        API.get("/admin/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        API.get("/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setDoctors(doctorRes.data.doctors || []);
      setUsers(userRes.data.users || []);
    } catch (error) {
      console.error("Admin Fetch Error:", error.message);
    }
  };

  const approveDoctor = async (userId) => {
    try {
      await API.put(
        `/admin/approve-doctor/${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Doctor approved successfully ✅");
      fetchData();
    } catch (err) {
      console.error("Approval Error:", err.message);
      toast.error("Failed to approve doctor ❌");
    }
  };

  const changeUserRole = async (userId, newRole) => {
    try {
      const res = await API.put(
        "/admin/change-role",
        { userId, newRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success(res.data.message);
      fetchData();
    } catch (err) {
      toast.error("Failed to change role ❌");
      console.error("Role Change Error:", err.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      await API.delete(`/admin/delete-user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("User deleted successfully ✅");
      fetchData();
    } catch (err) {
      console.error("Delete User Error:", err.message);
      toast.error("Failed to delete user ❌");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        🧑‍💼 Admin Dashboard
      </h1>

      {/* 👨‍⚕️ Doctor Section */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">🩺 Doctors</h3>
        {doctors.length === 0 ? (
          <p className="text-gray-500">No doctors found.</p>
        ) : (
          <ul className="space-y-4">
            {doctors.map((doc) => (
              <li
                key={doc._id}
                className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">
                      {doc.fullname} —{" "}
                      <span className="text-gray-600">
                        {doc.specialization}
                      </span>
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`font-semibold ${
                          doc.status === "approved"
                            ? "text-green-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {doc.status === "pending" && (
                      <button
                        onClick={() => approveDoctor(doc.userId)} // ✅ use userId
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                      >
                        ✅ Approve
                      </button>
                    )}
                    <button
                      onClick={() => changeUserRole(doc.userId, "user")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      🔽 Demote to User
                    </button>
                    <button
                      onClick={() => deleteUser(doc.userId)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* 👥 User Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">👥 Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <li
                key={user._id}
                className="border border-gray-300 p-4 rounded-lg bg-gray-50"
              >
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Type:</strong>{" "}
                  <span className="capitalize">{user.type}</span>
                </p>
                <div className="mt-2 flex gap-2">
                  {user.type === "user" ? (
                    <button
                      onClick={() => changeUserRole(user._id, "doctor")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      ⬆️ Promote to Doctor
                    </button>
                  ) : user.type === "doctor" ? (
                    <button
                      onClick={() => changeUserRole(user._id, "user")}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      🔽 Demote to User
                    </button>
                  ) : (
                    <p className="text-green-600 font-semibold">No action</p>
                  )}
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
