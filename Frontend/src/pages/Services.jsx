import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTests, getPackages } from "../services/apiServices";
import ServiceCard from "../components/ServiceCard";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 }
  }
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Services = () => {

  const [activeTab, setActiveTab] = useState("tests");
  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH DATA
  useEffect(() => {

    const fetchData = async () => {
      try {
          setLoading(true)
        const [testRes, packageRes] = await Promise.all([
          getTests(),
          getPackages()
        ]);

        setTests(testRes.data);
        setPackages(packageRes.data);
        

      } catch (error) {
        console.log(error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchData();

  }, []);

  return (

    <>
    
    <div className="pt-32 pb-20 bg-gray-50">

      {/* Header (UNCHANGED) */}
      <div className="text-center mb-14">
        <p className="text-sm text-gray-500 mb-2">
          Home / Category / Services
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Services
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
           We provide reliable diagnostic services with accurate reports.
        </p>
      </div>


      {/* CATEGORY BUTTONS (MODIFIED TEXT ONLY) */}
      <div className="flex justify-center gap-4 mb-14 flex-wrap">

        <button
          onClick={() => setActiveTab("tests")}
          className={`px-5 py-2 rounded-full text-sm ${
            activeTab === "tests"
              ? "bg-cyan-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          Tests
        </button>

        <button
          onClick={() => setActiveTab("packages")}
          className={`px-5 py-2 rounded-full text-sm ${
            activeTab === "packages"
              ? "bg-cyan-600 text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          Packages
        </button>

      </div>


      {/* GRID (REUSED DESIGN) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8"
      >

        {loading ? (

  <div className="col-span-2 flex justify-center items-center py-20">
    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>

) : (

  (activeTab === "tests" ? tests : packages).map((item) => (
    <motion.div key={item._id} variants={card}>
      <ServiceCard
        item={item}
        type={activeTab === "tests" ? "test" : "package"}
      />
    </motion.div>
  ))

)}

      </motion.div>


      {/* CTA (UNCHANGED) */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto mt-20 px-8 py-12 bg-white border border-cyan-200 rounded-2xl shadow-sm text-center"
      >

        <div className="flex justify-center mb-4">
          <div className="bg-cyan-100 w-14 h-14 rounded-full flex items-center justify-center">
            <CalendarCheck className="text-cyan-600" size={28} />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Ready to Schedule Your Appointment?
        </h3>

        <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
          Duis aute irure dolor in reprehenderit.
        </p>

        <div className="flex justify-center gap-4">

          <Link
            to={"/appointment"}
            className="bg-cyan-600 text-white px-6 py-2 rounded-full text-sm hover:bg-cyan-700 transition"
          >
            Book Now
          </Link>

          <Link
            to={"/contact"}
            className="border border-gray-300 px-6 py-2 rounded-full text-sm hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>

        </div>

      </motion.div>

    </div>
    </>
  );
};

export default Services;