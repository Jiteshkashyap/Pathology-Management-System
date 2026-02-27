import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../services/apiServices";
import {logoutUserState  } from "../redux/authSlice";
import { Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('isLoggedIn')
      dispatch(logoutUserState());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-blue-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4 border-b border-blue-700">
          <h2 className="text-lg font-semibold">Pathology</h2>

          {/* Close button (mobile only) */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-4">
          <Link to="/" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/doctors" className="block hover:text-gray-300">
            Doctors
          </Link>
          <Link to="/tests" className="block hover:text-gray-300">
            Tests
          </Link>
          <Link to="/packages" className="block hover:text-gray-300">
            Packages
          </Link>
          <Link to="/reports" className="block hover:text-gray-300">
            Reports
          </Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 px-3 py-2 rounded w-full text-left"
          >
            Logout
          </button>
        </nav>
      </div>

      
      <div className="flex-1 flex flex-col overflow-hidden">

        <div className="bg-white shadow px-4 py-3 flex items-center justify-between">

         
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            Pathology Dashboard
          </h1>
        </div>

        
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;