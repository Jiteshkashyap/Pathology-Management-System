import { motion } from "framer-motion";
import { useState } from "react";
import { changePassword } from "../../services/apiServices";
import toast from "react-hot-toast"; // ✅ added

const ChangePassword = () => {

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false); // ✅ added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match"); // ✅ changed
      return;
    }

    try {
      setLoading(true); // ✅ start loading

      const res = await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword
      });

      console.log(res);

      toast.success("Password updated successfully"); // ✅ changed

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong"); // ✅ changed
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (

    <div className="pt-32 pb-20 bg-gradient-to-br from-cyan-50 via-white to-slate-100 min-h-screen">

      {/* HEADER */}
      <div className="text-center mb-16">

        <p className="text-sm text-gray-500 mb-2">
          Home / Profile / Change Password
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Change Password
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Update your account password to keep your account secure.
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
            src="https://images.unsplash.com/photo-1556157382-97eda2d62296"
            alt="password"
            className="w-full max-w-sm rounded-2xl shadow-xl"
          />

          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-semibold text-slate-700 mb-2">
              🔒 Security Tips
            </h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Use at least 8 characters</li>
              <li>• Include numbers & symbols</li>
              <li>• Avoid common passwords</li>
              <li>• Do not reuse old passwords</li>
            </ul>
          </div>

        </motion.div>


        {/* RIGHT SIDE FORM */}
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
              Update Your Password
            </h2>

            {/* CURRENT PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
                required
              />
            </div>

            {/* NEW PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
                required
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 transition"
                required
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading} // ✅ disable while loading
              className="w-full bg-cyan-600 text-white py-3 rounded-full font-semibold hover:bg-cyan-700 transition shadow-md disabled:opacity-70"
            >
              {loading ? "Updating..." : "Update Password"} {/* ✅ loader text */}
            </button>

          </form>

        </motion.div>

      </div>

    </div>

  );
};

export default ChangePassword;