import { motion } from "framer-motion";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors } from "../services/apiServices";
import {
  setDoctors,
  setDoctorLoading,
  setDoctorError
} from "../redux/doctorSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Doctors() {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.doctors);
  const navigate = useNavigate()

  const fetchDoctors = async () => {
    try {
      dispatch(setDoctorLoading(true));

      const res = await getDoctors({
        page: 1,
        limit: 8
      });

      dispatch(setDoctors(res.data));

    } catch (err) {
      dispatch(setDoctorError("Failed to fetch doctors"));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="pt-20 md:pt-32 pb-20 bg-gray-50">

      {/* HEADER */}
      <div className="text-center mb-16">
        <p className="text-sm text-gray-500 mb-3">
          Home / Category / Doctors
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Doctors
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
           We provide reliable diagnostic services with accurate reports.
        </p>
      </div>

      {/* LOADER */}
      {loading ? (
        <Loader />
      ) : (
        <motion.div
  variants={container}
  initial="hidden"
  animate="show"
  className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
>

          {doctors.map((doc, i) => (

            <motion.div
              key={doc._id || i}
              variants={card}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300"
            >

              {/* IMAGE */}
              <div className="relative group overflow-hidden">

                <img
                  src={doc.image || "https://via.placeholder.com/300x300"}
                  alt={doc.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300";
                  }}
                  className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* HOVER */}
                <div className="absolute inset-0 bg-cyan-600/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300">

                  <div className="bg-white p-2 rounded-full cursor-pointer">
                    <Linkedin size={18} className="text-cyan-600" />
                  </div>

                  <div className="bg-white p-2 rounded-full cursor-pointer">
                    <Twitter size={18} className="text-cyan-600" />
                  </div>

                  <div className="bg-white p-2 rounded-full cursor-pointer">
                    <Mail size={18} className="text-cyan-600" />
                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6 flex flex-col flex-grow">

                <h3 className="font-semibold text-lg text-center">
                  {doc.name}
                </h3>

                <p className="text-cyan-600 text-sm text-center mt-1">
                  {doc.specialization}
                </p>

                <p className="text-gray-500 text-sm text-center mt-3">
                  {doc.description || "No description available"}
                </p>

                <div className="flex justify-center mt-4">
                  <span className="bg-cyan-50 text-cyan-600 text-xs px-4 py-1 rounded-full">
                    {doc.experience
                      ? `${doc.experience} YEARS EXPERIENCE`
                      : "N/A"}
                  </span>
                </div>

                <div className="mt-auto flex justify-center pt-5">
                  <button onClick={()=> navigate('/appointment')} className="bg-cyan-600 text-white text-sm px-5 py-2 rounded-full hover:bg-cyan-700 transition">
                    Book Appointment
                  </button>
                </div>

              </div>

            </motion.div>

          ))}

        </motion.div>
      )}

    </div>
  );
}