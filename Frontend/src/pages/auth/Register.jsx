import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/apiServices.js";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/authSlice";
import { motion } from "framer-motion";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleRegister = async (e) => {
    e.preventDefault();

    dispatch(clearError());
    dispatch(setLoading(true));

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.role.value,
      phone: e.target.phone.value,
      age: e.target.age.value,
    };

    try {
      const response = await registerUser(formData);

      dispatch(setUser(response.user));
      dispatch(setLoading(false));

      navigate("/login");
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Registration failed")
      );
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="w-full max-w-md p-10 rounded-2xl 
        backdrop-blur-lg bg-white/80 border border-white/40 
        shadow-xl"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Create Account ✨
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Register as Admin or Technician
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>
          
          {/* COMMON INPUT STYLE */}
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Enter full name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
            { label: "Password", name: "password", type: "password", placeholder: "Create password" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
                bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 
                transition"
                required
              />
            </div>
          ))}

          {/* EXTRA FIELDS (CLEAN GROUP, NO BORDER LINE) */}
          <div className="space-y-4 mt-2">

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
                bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 
                transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Age</label>
              <input
                name="age"
                type="number"
                placeholder="Enter age"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
                bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 
                transition"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Role</label>
              <select
                name="role"
                className="w-full mt-1 px-4 py-3 border border-gray-200 rounded-xl 
                bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 
                transition"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="technician">Technician</option>
                <option value="patient">Patient</option>
              </select>
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-600 text-white py-3 rounded-xl 
            font-semibold tracking-wide 
            hover:bg-cyan-700 transition shadow-md hover:shadow-lg disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-600 font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </>
  );
};

export default Register;