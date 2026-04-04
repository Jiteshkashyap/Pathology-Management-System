import { motion } from "framer-motion";
import labImg from '../../assets/images/lab.webp'
import { HeartPulse, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About =()=> {

  const navigate = useNavigate();
  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >

          <img
            src={labImg}
            alt="hospital"
            loading="lazy"
            className="rounded-xl shadow-lg"
          />

          {/* Experience Badge */}
          <div className="absolute bottom-[-20px] right-10 bg-cyan-600 text-white px-8 py-4 rounded-lg shadow-lg">
            <h3 className="text-3xl font-bold">25+</h3>
            <p className="text-sm">Years of Excellence</p>
          </div>

        </motion.div>


        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          <h2 className="text-3xl font-bold text-slate-800 mb-6">
            Committed to Exceptional Patient Care
          </h2>

          <p className="text-gray-600 mb-6">
            MediTrust Labs is dedicated to providing high-quality diagnostic services with precision and care. 
            We ensure fast, reliable, and secure health reports to help you make informed medical decisions.
          </p>

          <p className="text-gray-600 mb-10">
            With advanced laboratory technology and certified professionals, we offer a wide range of tests, 
            from routine blood work to comprehensive health checkups, all accessible online.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-6 mb-10">

            <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
              <HeartPulse className="text-cyan-600" />
              <div>
                <h4 className="font-semibold">Compassionate Care</h4>
                <p className="text-sm text-gray-500">
                 Focused on convenience, comfort, and accurate results. 
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4">
              <Star className="text-cyan-600" />
              <div>
                <h4 className="font-semibold">Medical Excellence</h4>
                <p className="text-sm text-gray-500">
                  Advanced technology ensuring precise test outcomes.
                </p>
              </div>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button onClick={()=>navigate('/about')} className="bg-cyan-600 text-white px-6 py-3 rounded-lg">
              Learn More About Us
            </button>

            <button onClick={()=> navigate('/doctor')} className="border px-6 py-3 rounded-lg">
              Meet Our Team
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default About;