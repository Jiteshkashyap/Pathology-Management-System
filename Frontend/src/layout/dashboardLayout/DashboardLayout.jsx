import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../services/apiServices";
import { logoutUserState } from "../../redux/authSlice";
import { Menu, X, Bell } from "lucide-react";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("isLoggedIn");
      dispatch(logoutUserState());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded transition ${
      isActive ? "bg-blue-700 text-white" : "hover:text-gray-300"
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* ================= SIDEBAR ================= */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 
        bg-gradient-to-b from-cyan-700 to-cyan-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-cyan-600">
          <h2 className="text-lg font-semibold tracking-wide">
            MediTrust Admin
          </h2>

          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <NavLink to="" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="doctors" className={linkClass}>
            Doctors
          </NavLink>

          <NavLink to="tests" className={linkClass}>
            Tests
          </NavLink>

          <NavLink to="packages" className={linkClass}>
            Packages
          </NavLink>

          <NavLink to="reports" className={linkClass}>
            Reports
          </NavLink>

          <NavLink to="all-appointments" className={linkClass}>
            Appointments
          </NavLink>

          <NavLink to="users" className={linkClass}>
            Users
          </NavLink>

          <NavLink to="auditLogs" className={linkClass}>
            Audit Logs
          </NavLink>

          <NavLink to="emailLogs" className={linkClass}>
            Email Logs
          </NavLink>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 px-3 py-2 rounded w-full text-left"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* ================= HEADER ================= */}
        <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
          
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu size={22} />
            </button>

            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-lg font-semibold text-gray-900"
            >
              Pathology Dashboard
            </motion.h1>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">
            
            {/* Notification */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;