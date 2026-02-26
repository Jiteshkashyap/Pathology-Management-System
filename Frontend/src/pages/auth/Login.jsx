import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/apiServices.js";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/authSlice";

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

      // backend should return user data
      dispatch(setUser(response.user));

      dispatch(setLoading(false));

      // redirect to dashboard
      navigate("/");
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Login failed")
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 to-blue-600">

      {/* Left Branding Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">🧪 Pathology System</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Manage doctors, tests, packages, and reports efficiently with a
          secure diagnostic management system.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Please login to your account
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
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
            <Link to="/register" className="text-blue-600 font-medium">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;