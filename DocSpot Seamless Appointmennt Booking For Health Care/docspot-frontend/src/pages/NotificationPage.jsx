import React, { useEffect, useState } from "react";
import API from "../utils/axios";

const NotificationPage = () => {
  const [unseen, setUnseen] = useState([]);
  const [seen, setSeen] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUnseen(res.data.notification || []);       // ✅ unseen queue
      setSeen(res.data.seenNotification || []);
    } catch (error) {
      console.error("Fetch Notification Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete("/notifications/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUnseen([]);
      setSeen([]);
    } catch (err) {
      console.error("Clear Notification Error:", err.message);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">🔔 Notifications</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            {unseen.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-blue-700">🆕 New Notifications</h2>
                <div className="space-y-3 mb-6">
                  {unseen.map((notif, index) => (
                    <div key={index} className="p-4 border-l-4 border-blue-400 bg-blue-50 rounded shadow">
                      <p className="font-medium text-gray-800">{notif.message}</p>
                      {notif.date && (
                        <p className="text-sm text-gray-600 mt-1">{new Date(notif.date).toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {seen.length > 0 && (
              <>
                <h2 className="text-xl font-semibold mb-2 text-green-700">👁️ Seen Notifications</h2>
                <div className="space-y-3">
                  {seen.map((notif, index) => (
                    <div key={index} className="p-4 border border-gray-300 bg-gray-50 rounded shadow">
                      <p className="text-gray-700 font-semibold">{notif.message}</p>
                      {notif.date && (
                        <p className="text-sm text-gray-500 mt-1">{new Date(notif.date).toLocaleString()}</p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {unseen.length === 0 && seen.length === 0 && (
              <p className="text-gray-500">You have no notifications.</p>
            )}

            <button
              onClick={clearAll}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg"
            >
              Clear All
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;