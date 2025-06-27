import React, { useEffect, useState } from "react";
import API from "../../utils/axios";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (err) {
      toast.error("❌ Failed to fetch users");
    }
  };

  const changeRole = async (userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(
        "/admin/change-role",
        { userId, newRole },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`✅ Role updated to ${newRole}`);
      fetchUsers(); // Refresh user list
    } catch (err) {
      toast.error("❌ Failed to change role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👥 All Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone || "N/A"}</td>
                  <td className="p-3 capitalize">{user.type}</td>
                  <td className="p-3 space-x-2">
                    {user.type === "user" && (
                      <button
                        onClick={() => changeRole(user._id, "doctor")}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Promote to Doctor
                      </button>
                    )}

                    {user.type === "doctor" && (
                      <button
                        onClick={() => changeRole(user._id, "user")}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Demote to User
                      </button>
                    )}

                    {user.type === "admin" && (
                      <span className="text-gray-500 italic">No action</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
