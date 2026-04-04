import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";


const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0 },
};

const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-50 via-white to-cyan-100 overflow-hidden">

      {/* LEFT SIDE (SAME DESIGN) */}
     <div className="hidden md:flex w-1/2 flex-col justify-center px-16 relative overflow-hidden">

  {/* 🌫️ Animated Glow */}
  <motion.div
    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 6, repeat: Infinity }}
    className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full blur-3xl"
  />

  <motion.div
    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
    transition={{ duration: 8, repeat: Infinity }}
    className="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"
  />

  <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="relative z-10"
  >

    {/* Badge */}
    <motion.div variants={item} className="inline-block bg-cyan-100 text-cyan-700 text-xs px-4 py-1 rounded-full w-fit mb-6 font-medium">
      MediTrust
    </motion.div>

    {/* Title */}
    <motion.h1 variants={item} className="text-5xl font-bold text-slate-800 leading-tight">
      Welcome 👋
    </motion.h1>

    {/* Subtitle */}
    <motion.p variants={item} className="text-gray-600 text-lg mt-4 max-w-md leading-relaxed">
      Manage appointments, reports and healthcare easily — all in one place.
    </motion.p>

    {/* Features */}
    <div className="mt-10 space-y-5 text-gray-700 text-sm">
      {[
        "Book appointments in seconds",
        "Download reports anytime",
        "Trusted & secure system",
      ].map((text, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ x: 5 }}
          className="flex items-center gap-3 cursor-default"
        >
          <div className="w-3 h-3 bg-cyan-600 rounded-full"></div>
          {text}
        </motion.div>
      ))}
    </div>

    {/* Stats Card */}
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      className="mt-12 bg-white/60 backdrop-blur-md border border-white/40 shadow-md rounded-xl p-5 w-72"
    >
      <p className="text-xs text-gray-500 mb-1">
        Active Users
      </p>

      <p className="text-3xl font-bold text-cyan-600">
        120+
      </p>

      <p className="text-xs text-gray-500 mt-1">
        Patients using MediTrust
      </p>
    </motion.div>

  </motion.div>

</div>

      {/* DIVIDER */}
      <div className="hidden md:flex items-center justify-center">
        <div className="w-[2px] h-[70%] bg-gradient-to-b from-transparent via-cyan-200 to-transparent relative">
          <div className="absolute inset-0 blur-md bg-cyan-200 opacity-40"></div>
        </div>
      </div>

      {/* RIGHT SIDE (ANIMATED) */}
      <div className="flex justify-center items-center w-full md:w-1/2 px-6 relative overflow-hidden">

        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{
              x: location.pathname === "/register" ? 100 : -100,
              opacity: 0
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: location.pathname === "/register" ? -100 : 100,
              opacity: 0
            }}
            transition={{ type: "spring", stiffness: 60 }}
            className="w-full flex justify-center"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>

      </div>

    </div>
  );
};

export default AuthLayout;