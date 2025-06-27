import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">DocSpot</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 bg-blue-50">
        <h2 className="text-4xl font-bold mb-4 text-blue-700">
          Find the Right Doctor, Fast
        </h2>
        <p className="text-lg mb-6 max-w-xl">
          Book appointments with verified doctors, manage your health, and get
          notified instantly — all from one powerful platform.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
          <Link
  to="/login"
  onClick={() => toast.info("Please login to view doctors")}
  className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100"
>
  View Doctors
</Link>

        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-2">🩺</div>
            <h3 className="text-xl font-semibold mb-1">Doctor Directory</h3>
            <p className="text-gray-600">
              Browse verified doctors by specialization, experience, and more.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📅</div>
            <h3 className="text-xl font-semibold mb-1">Easy Appointments</h3>
            <p className="text-gray-600">
              Schedule appointments in a few clicks — anytime, anywhere.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🔔</div>
            <h3 className="text-xl font-semibold mb-1">Instant Notifications</h3>
            <p className="text-gray-600">
              Stay informed with real-time updates and appointment alerts.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-4">
        © {new Date().getFullYear()} DocSpot. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
