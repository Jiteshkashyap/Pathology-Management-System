import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/apiServices.js";
import {
  setLoading,
  setUser,
  setError,
  clearError,
} from "../../redux/authSlice";

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
    };

    try {
      const response = await registerUser(formData);

      // backend should return user info
      dispatch(setUser(response.user));

      dispatch(setLoading(false));

      // redirect to dashboard
      navigate("/");
    } catch (err) {
      dispatch(
        setError(err.response?.data?.message || "Registration failed")
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-900 to-blue-600">

      {/* Left Branding Section */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">🧪 Pathology System</h1>
        <p className="text-lg text-blue-100 text-center max-w-md">
          Create your admin or technician account to manage lab operations
          securely and efficiently.
        </p>
      </div>

      {/* Right Form Section */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-gray-100">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Create Account ✨
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Register as Admin or Technician
          </p>

          <form className="space-y-5" onSubmit={handleRegister}>

            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter full name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Role</label>
              <select
                name="role"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Technician">Technician</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              disabled={loading}
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
            <Link to="/login" className="text-blue-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;