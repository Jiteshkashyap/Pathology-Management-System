import { Menu, X, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../services/apiServices";
import { logoutUserState } from "../../redux/authSlice";

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logoutUserState());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-center">

      <div className="mt-6 w-[90%] max-w-7xl bg-white text-black rounded-full px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="bg-cyan-600 p-2 rounded text-white">
            🏥
          </div>
          MediTrust
        </Link>


        {/* Desktop Navbar (UNCHANGED) */}
        <nav className="hidden md:flex gap-8 font-medium">

          <Link to="/" className="relative group">
            Home
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          <Link to="/about" className="relative group">
            About
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          <Link to="/department" className="relative group">
            Departments
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          <Link to="/services" className="relative group">
            Services
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          <Link to="/doctor" className="relative group">
            Doctors
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          <Link to="/contact" className="relative group">
            Contact
            <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full hover:text-cyan-600"></span>
          </Link>

          {/* ✅ Added (no style change) */}
          {isAuthenticated && (
            <Link to="/my-appointments" className="relative group">
              My Appointments
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}

        </nav>


        {/* Buttons (UNCHANGED DESIGN) */}
        <div className="hidden md:flex items-center gap-4">

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="border border-cyan-600 text-cyan-600 px-5 py-2 rounded-full font-semibold hover:bg-cyan-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/appointment"
                className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold"
              >
                Appointment
              </Link>
            </>
          ) : (
            <>
              {/* Profile Icon (no design conflict) */}
              <div className="relative">

                <button onClick={() => setDropdown(!dropdown)}>
                  <UserCircle size={28} />
                </button>

                {dropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2 text-sm">

                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setDropdown(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      to="/change-password"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setDropdown(false)}
                    >
                      Change Password
                    </Link>

                    <Link
                      to="/my-reports"
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setDropdown(false)}
                    >
                      My Reports
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 rounded"
                    >
                      Logout
                    </button>

                  </div>
                )}

              </div>

              {/* Appointment button SAME */}
              <Link
                to="/appointment"
                className="bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold"
              >
                Appointment
              </Link>
            </>
          )}

        </div>


        {/* Hamburger */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={28} />
        </button>

      </div>


      {/* Mobile Sidebar */}
      <AnimatePresence>

        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg z-50 p-6"
            >

              <div className="flex justify-end mb-8">
                <button onClick={() => setOpen(false)}>
                  <X size={26} />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg">

                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/department">Departments</Link>
                <Link to="/service">Services</Link>
                <Link to="/doctor">Doctors</Link>
                <Link to="/contact">Contact</Link>

                {/* Added */}
                {isAuthenticated && (
                  <>
                    <Link to="/my-appointments">My Appointments</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/change-password">Change Password</Link>
                    <Link to="/my-reports">My Reports</Link>

                    <button
                      onClick={handleLogout}
                      className="text-left text-red-600"
                    >
                      Logout
                    </button>
                  </>
                )}

                {!isAuthenticated && (
                  <Link to="/login">Login</Link>
                )}

                <Link
                  to="/appointment"
                  className="bg-cyan-600 text-white px-5 py-2 rounded-full text-center"
                >
                  Appointment
                </Link>

              </div>

            </motion.div>
          </>
        )}

      </AnimatePresence>

    </header>
  );
};

export default Navbar;