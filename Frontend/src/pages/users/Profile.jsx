import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../services/apiServices";
import { setUser } from "../../redux/authSlice";
import toast from "react-hot-toast"; // ✅ added

const Profile = () => {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false); // ✅ added

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: ""
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        age: user.age || ""
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // ✅ start loading

      const res = await updateProfile({
        name: form.name,
        phone: form.phone,
        age: form.age
      });

      dispatch(setUser({
        ...user,
        name: res.data.name,
        phone: res.data.phone,
        age: res.data.age
      }));

      toast.success("Profile updated successfully"); // ✅ toast

    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed"); // ✅ toast
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (

    <div className="pt-32 pb-20 bg-gradient-to-br from-cyan-50 via-white to-slate-100 min-h-screen">

      {/* HEADER */}
      <div className="text-center mb-16">
        <p className="text-sm text-gray-500 mb-2">
          Home / Profile
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Update Profile
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Update your personal details and keep your account information accurate.
        </p>
      </div>


      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
            alt="profile"
            className="w-full max-w-sm rounded-2xl shadow-xl"
          />

          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-semibold text-slate-700 mb-2">
              👤 Profile Info
            </h3>

            <div className="text-sm text-gray-500 space-y-1">
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone || "N/A"}</p>
              <p><strong>Age:</strong> {user?.age || "N/A"}</p>
            </div>
          </div>

        </motion.div>


        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl border space-y-6"
          >

            <h2 className="text-xl font-semibold text-slate-700">
              Edit Your Details
            </h2>

            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                disabled
                className="w-full mt-1 border rounded-lg p-3 text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
              />
            </div>

            {/* AGE */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading} // ✅ disable
              className="w-full bg-cyan-600 text-white py-3 rounded-full font-semibold hover:bg-cyan-700 transition shadow-md disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Profile"} {/* ✅ loader text */}
            </button>

          </form>

        </motion.div>

      </div>

    </div>

  );
};

export default Profile;