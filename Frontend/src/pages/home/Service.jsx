import { motion } from "framer-motion";
import { HeartPulse, Brain, Bone, Ambulance } from "lucide-react";

const ServicesSection =()=> {
  return (
    <section className="py-24 bg-gray-50">

      {/* Title */}
      <div className="text-center mb-16">

        <h2 className="text-3xl font-bold text-slate-800">
          Featured Diagnostic Services
        </h2>

        <p className="text-gray-500 mt-3">
          Explore our wide range of lab tests and diagnostic services designed for accurate and timely health insights.
        </p>

      </div>


      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
        >

          <div className="text-cyan-600 mb-4">
            <HeartPulse size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Blood Test Services
          </h3>

          <p className="text-gray-500 mb-5 text-sm">
            Comprehensive blood testing for accurate diagnosis and health monitoring.
          </p>

          <ul className="space-y-2 text-sm text-gray-600 mb-5">
            <li>✔ Complete Blood Count (CBC)</li>
            <li>✔ Lipid Profile & Sugar Tests</li>
            <li>✔ Preventive Health Screening</li>
          </ul>

          <button className="text-cyan-600 text-sm font-medium">
            Learn More →
          </button>

        </motion.div>


        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
        >

          <div className="text-cyan-600 mb-4">
            <Brain size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Neurological Diagnostics
          </h3>

          <p className="text-gray-500 mb-5 text-sm">
            Advanced tests for brain and nervous system-related conditions.
          </p>

          <ul className="space-y-2 text-sm text-gray-600 mb-5">
            <li>✔ Brain Imaging Tests</li>
            <li>✔ EEG & Neurological Screening</li>
            <li>✔ Early Disorder Detection</li>
          </ul>

          <button className="text-cyan-600 text-sm font-medium">
            Learn More →
          </button>

        </motion.div>


        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
        >

          <div className="text-cyan-600 mb-4">
            <Bone size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Bone & Joint Testing
          </h3>

          <p className="text-gray-500 mb-5 text-sm">
            Reliable diagnostic tests for bone health and joint conditions.
          </p>

          <ul className="space-y-2 text-sm text-gray-600 mb-5">
            <li>✔ Vitamin D & Calcium Tests</li>
            <li>✔ Bone Density Screening</li>
            <li>✔ Arthritis & Joint Analysis</li>
          </ul>

          <button className="text-cyan-600 text-sm font-medium">
            Learn More →
          </button>

        </motion.div>


        {/* Card 4 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
        >

          <div className="text-cyan-600 mb-4">
            <Ambulance size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Emergency Diagnostics
          </h3>

          <p className="text-gray-500 mb-5 text-sm">
            Quick and reliable diagnostic services for urgent medical needs.
          </p>

          <ul className="space-y-2 text-sm text-gray-600 mb-5">
            <li>✔ Rapid Test Processing</li>
            <li>✔ Priority Lab Reports</li>
            <li>✔ 24/7 Sample Collection</li>
          </ul>

          <button className="text-cyan-600 text-sm font-medium">
            Learn More →
          </button>

        </motion.div>

      </div>

    </section>
  );
}
export default ServicesSection;