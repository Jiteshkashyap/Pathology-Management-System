import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/apiServices.js";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/authSlice";
import { motion } from "framer-motion";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(clearError());
    dispatch(setLoading(true));

    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await loginUser(formData);
      

      dispatch(setUser(response.user));
      dispatch(setLoading(false));

      if (response.user.role === "patient") {
         navigate("/");
      }  else {
       navigate("/dashboard");
      }
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Login failed")
      );
    }
  };

  return (
    <>

 


  {/* RIGHT SIDE */}
 

    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}   // ✨ subtle lift
      className="w-full max-w-md p-8 rounded-2xl 
      backdrop-blur-lg bg-white/70 border border-white/40 
      shadow-xl"
    >

      <h2 className="text-2xl font-bold text-slate-800 mb-2">
        Welcome Back 👋
      </h2>

      <p className="text-gray-500 text-sm mb-6">
        Please login to your account
      </p>

      <form className="space-y-5" onSubmit={handleLogin}>

        {/* EMAIL */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <label className="text-sm text-gray-600">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full mt-1 px-4 py-2 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-cyan-600 
            focus:border-transparent transition shadow-sm hover:shadow-md"
            required
          />
        </motion.div>

        {/* PASSWORD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <label className="text-sm text-gray-600">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full mt-1 px-4 py-2 border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-cyan-600 
            focus:border-transparent transition shadow-sm hover:shadow-md"
            required
          />
        </motion.div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-600 text-white py-2 rounded-lg 
          hover:bg-cyan-700 transition duration-300 shadow-md hover:shadow-lg"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center">
            {error}
          </p>
        )}

      </form>

      <p className="text-sm text-gray-500 mt-6 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-cyan-600 font-medium">
          Register
        </Link>
      </p>

    </motion.div>



</>
  );
};

export default Login;