import { motion } from "framer-motion";
import CountUp from "react-countup";
import doc1img from '../assets/images/doc1.jpg'
import lab2 from '../assets/images/lab2.jpg'
import doc2 from '../assets/images/doc2.avif'
import { useNavigate } from "react-router-dom";

const About =() => {

  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-20 bg-gray-50">

      {/* Page Header */}
      <div className="text-center mb-16">

        <p className="text-sm text-gray-500 mb-4">
          Home / Category / About
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          About
        </h1>

        <p className="text-gray-500 max-w-xl mx-auto mt-4">
          We provide reliable diagnostic services with accurate reports, advanced technology, and patient-focused care.
        </p>

      </div>


      {/* Main About Section */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >

          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Committed to Excellence in Healthcare
          </h2>

          <p className="text-gray-600 mb-4">
                       MediTrust Labs is committed to providing high-quality laboratory testing with precision and reliability. 
            Our advanced diagnostic systems ensure accurate results for better healthcare decisions.
          </p>

          <p className="text-gray-600 mb-8">
            With experienced professionals and modern lab infrastructure, we offer a wide range of tests including blood work, 
            full body checkups, and specialized diagnostics—all accessible online.
          </p>


          {/* Stats */}
          <div className="bg-white rounded-xl shadow p-6 flex gap-10 mb-8">

            <div>
              <h3 className="text-3xl font-bold text-cyan-600">
              <CountUp start={0} end={25} duration={3} separator="," />+
            </h3>
              <p className="text-gray-500 text-sm">
                Years of Experience
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-600">
              <CountUp start={0} end={50000} duration={3} separator="," />+
            </h3>
              <p className="text-gray-500 text-sm">
                Patients Treated
              </p>
            </div>

          </div>


          {/* Buttons */}
          <div className="flex gap-4">

            <button onClick={()=>navigate('/doctor')} className="bg-cyan-600 text-white px-6 py-3 rounded-full font-medium">
              Meet Our Doctors
            </button>

            <button onClick={()=> navigate('/services')} className="border border-cyan-600 text-cyan-600 px-6 py-3 rounded-full font-medium">
              View Our Services
            </button>

          </div>

        </motion.div>


        {/* Right Images */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >

          {/* Big Image */}
          <img
            src={doc2}
            alt="about"
            loading="lazy"
            className="rounded-xl w-full"
          />

          {/* Small Images */}
          <div className="grid grid-cols-2 gap-4">

            <img
              src={lab2}
              alt="room"
              loading="lazy"
              className="rounded-xl"
            />

            <img
              src={doc1img}
              alt="doctor"
              loading="lazy"
              className="rounded-xl"
            />

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default About;