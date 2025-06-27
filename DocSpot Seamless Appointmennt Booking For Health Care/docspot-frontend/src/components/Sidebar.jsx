// src/components/Sidebar.jsx
import { useSidebar } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();

  return (
    <div
      className={`h-screen bg-white shadow-md transition-all duration-300 
      ${isSidebarOpen ? "w-64" : "w-16"} fixed left-0 top-0 z-40`}
    >
      <button
        onClick={toggleSidebar}
        className="m-2 p-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        {isSidebarOpen ? "⬅" : "➡"}
      </button>

      {isSidebarOpen && (
        <ul className="mt-6 px-4 space-y-2">
          <li>
            <a href="/dashboard" className="text-gray-700 hover:underline">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/notifications" className="text-gray-700 hover:underline">
              Notifications
            </a>
          </li>
          <li>
            <a href="/book" className="text-gray-700 hover:underline">
              Book Appointment
            </a>
          </li>
          <li>
            <a href="/doctor-register" className="text-gray-700 hover:underline">
              Become Doctor
            </a>
          </li>
          <li>
            <a href="/doctors" className="text-gray-700 hover:underline">
              Doctors List
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
