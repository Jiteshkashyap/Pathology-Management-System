import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { getDoctors } from "../../services/apiServices";
import {
  setDoctors,
  setDoctorLoading,
  setDoctorError
} from "../../redux/doctorSlice";

import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const FindDoctor = () => {
  const dispatch = useDispatch();
  const { doctors, loading } = useSelector((state) => state.doctors);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const navigate = useNavigate()

  // 🔥 DEBOUNCE STATE
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedDept, setDebouncedDept] = useState("All");

  // 🔥 DEBOUNCE EFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setDebouncedDept(department);
    }, 400);

    return () => clearTimeout(timer);
  }, [search, department]);

  // 🔥 FETCH WITH DEBOUNCE + LIMIT
  const fetchDoctors = async () => {
    try {
      dispatch(setDoctorLoading(true));

      const res = await getDoctors({
        page: 1,
        limit: 6,
        specialization:
          debouncedDept !== "All"
            ? debouncedDept
            : debouncedSearch // fallback to search
      });

      dispatch(setDoctors(res.data));

    } catch (err) {
      dispatch(setDoctorError("Failed to fetch doctors"));
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [debouncedSearch, debouncedDept]);

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-800">
          Find A Doctor
        </h1>

        <p className="text-gray-500 mt-3">
          Our experienced doctors and certified specialists ensure accurate diagnosis and reliable healthcare services.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="bg-white p-4 rounded-xl shadow flex gap-4">

          <input
            type="text"
            placeholder="Doctor name or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 text-sm"
          />

          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border rounded-lg px-4 py-2 text-sm"
          >
            <option>All</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
            <option>Orthopedics</option>
            <option>Dermatology</option>
            <option>Oncology</option>
          </select>

          <button className="bg-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700">
            <Search size={16} />
            Search Doctor
          </button>

        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          {doctors.map((doc, index) => (

            <motion.div
              key={doc._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative">
                <img
                  src={doc.image || "https://via.placeholder.com/300"}
                  alt={doc.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                  className="w-full h-56 object-cover"
                />

                <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full text-white bg-green-500">
                  AVAILABLE
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h3 className="font-semibold text-lg">
                  {doc.name}
                </h3>

                <p className="text-cyan-600 text-sm">
                  {doc.specialization}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                  {doc.experience
                    ? `${doc.experience} years experience`
                    : "N/A"}
                </p>

                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  {"★★★★★"}
                  <span className="text-gray-500 text-sm ml-1">
                    (4.8)
                  </span>
                </div>

                <div className="flex gap-3 mt-4">
                  <button className="flex-1 border border-cyan-600 text-cyan-600 text-sm py-2 rounded-lg hover:bg-cyan-50">
                    View Profile
                  </button>

                  <button onClick={()=>navigate('/appointment')} className="flex-1 bg-cyan-600 text-white text-sm py-2 rounded-lg hover:bg-cyan-700">
                    Book Appointment
                  </button>
                </div>
              </div>

            </motion.div>

          ))}

        </div>
      )}

    </div>
  );
};

export default FindDoctor;