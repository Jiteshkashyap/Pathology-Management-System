import { motion } from "framer-motion";
import { HeartPulse, Brain, Bone, Baby, Shield, Ambulance } from "lucide-react";
import ortho from '../../assets/images/otho.jpg'
import cardio from "../../assets/images/cardio.webp"
import derma from "../../assets/images/derma.jpg"
import pediatrics from "../../assets/images/pediatrics.webp"
import neuro from "../../assets/images/neuro.avif"
import emergency from "../../assets/images/emergency.jpg"

const departments = [
  {
    title: "Cardiology",
    img: cardio,
    icon: <HeartPulse />,
    desc: "Comprehensive cardiovascular care with advanced diagnostic techniques."
  },
  {
    title: "Neurology",
    img: neuro,
    icon: <Brain />,
    desc: "Expert neurological care specializing in brain disorders."
  },
  {
    title: "Orthopedics",
    img: ortho,
    icon: <Bone />,
    desc: "Advanced musculoskeletal care focusing on bones and joints."
  },
  {
    title: "Pediatrics",
    img: pediatrics,
    icon: <Baby />,
    desc: "Specialized healthcare for children from infancy."
  },
  {
    title: "Oncology",
    img: derma,
    icon: <Shield />,
    desc: "Comprehensive cancer care with advanced treatments."
  },
  {
    title: "Emergency Care",
    img: emergency,
    icon: <Ambulance />,
    desc: "Round-the-clock emergency medical services."
  }
];

const DepartmentsSection =()=> {
  return (
    <section className="py-24 bg-gray-100">

      {/* Title */}
      <div className="text-center mb-16">

        <h2 className="text-3xl font-bold text-slate-800">
          Featured Departments
        </h2>

        <p className="text-gray-500 mt-3">
          Explore a wide range of lab tests and diagnostic services designed for accurate and timely health insights.
        </p>

      </div>


      {/* Cards */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {departments.map((dep, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* Image */}
            <img
              src={dep.img}
              alt={dep.title}
              loading="lazy"
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-6">

              <div className="text-cyan-600 mb-3">
                {dep.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {dep.title}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {dep.desc}
              </p>

              <button className="text-cyan-600 text-sm font-medium">
                Learn More →
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

export default DepartmentsSection;