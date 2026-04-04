import { motion } from "framer-motion";
import { CheckCircle, FlaskConical, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const TestDetails =()=> {
  return (
    <div className="pt-32 pb-20 bg-gray-50">

      {/* HEADER */}
      <div className="text-center mb-16">

        <p className="text-sm text-gray-500 mb-2">
          Home / Category / Test Details
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Test Details
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Learn more about this diagnostic test and how it helps
          evaluate your health.
        </p>

      </div>


      {/* MAIN TEST SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">


        {/* IMAGE */}
        <motion.img
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          src="https://images.unsplash.com/photo-1582719471384-894fbb16e074"
          className="rounded-xl shadow-lg w-full"
          loading="lazy"
        />


        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >

          <h2 className="text-3xl font-semibold mb-4">
            Complete Blood Count (CBC)
          </h2>

          <p className="text-cyan-600 font-medium mb-4">
            A routine blood test used to evaluate overall health.
          </p>

          <p className="text-gray-600 mb-6">
            The Complete Blood Count (CBC) test measures different
            components of your blood including red blood cells,
            white blood cells, hemoglobin and platelets.
          </p>


          {/* PARAMETERS */}
          <h4 className="font-semibold mb-3">
            Test Parameters Include:
          </h4>

          <ul className="space-y-2 text-gray-600">

            <li className="flex gap-2 items-center">
              <CheckCircle size={16} className="text-cyan-600"/>
              Hemoglobin Level
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle size={16} className="text-cyan-600"/>
              Red Blood Cell Count
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle size={16} className="text-cyan-600"/>
              White Blood Cell Count
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle size={16} className="text-cyan-600"/>
              Platelet Count
            </li>

            <li className="flex gap-2 items-center">
              <CheckCircle size={16} className="text-cyan-600"/>
              Hematocrit
            </li>

          </ul>


          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">

            <Link
              to="/appointment"
              className="bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-cyan-700 transition"
            >
              Book Test
            </Link>

            <button className="border border-gray-300 px-6 py-3 rounded-full">
              Learn More
            </button>

          </div>

        </motion.div>

      </div>



      {/* RELATED TESTS */}
      <div className="max-w-7xl mx-auto px-6 mt-20">

        <h3 className="text-2xl font-semibold text-center mb-12">
          Related Tests
        </h3>


        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >

            <FlaskConical className="mx-auto text-cyan-600 mb-3"/>

            <h4 className="font-semibold">
              Lipid Profile
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              Evaluates cholesterol and heart health.
            </p>

            <button className="mt-4 text-cyan-600 text-sm">
              View Test →
            </button>

          </motion.div>


          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >

            <ShieldCheck className="mx-auto text-cyan-600 mb-3"/>

            <h4 className="font-semibold">
              Liver Function Test
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              Checks liver enzymes and protein levels.
            </p>

            <button className="mt-4 text-cyan-600 text-sm">
              View Test →
            </button>

          </motion.div>


          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >

            <FlaskConical className="mx-auto text-cyan-600 mb-3"/>

            <h4 className="font-semibold">
              Thyroid Profile
            </h4>

            <p className="text-sm text-gray-500 mt-2">
              Measures thyroid hormone levels.
            </p>

            <button className="mt-4 text-cyan-600 text-sm">
              View Test →
            </button>

          </motion.div>

        </div>

      </div>



      {/* BOOK TEST CTA */}
      <div className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-8">

        {/* Info */}
        <div className="bg-cyan-50 p-8 rounded-xl">

          <h3 className="text-xl font-semibold mb-4">
            Ready to Book Your Test?
          </h3>

          <p className="text-gray-600 mb-6">
            Our lab specialists are available Monday to Saturday.
          </p>

          <div className="space-y-3 text-sm text-gray-600">

            <p>🕘 Office Hours: 8AM – 6PM</p>
            <p>📞 Emergency Line: +1 (555) 123-4567</p>
            <p>📍 Lab Location: New York Medical Center</p>

          </div>

        </div>


        {/* Booking */}
        <div className="bg-white p-8 rounded-xl shadow text-center">

          <h3 className="text-lg font-semibold mb-4">
            Book Your Test
          </h3>

          <Link
            to="/appointment"
            className="bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold"
          >
            Book Test
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Or call us at <span className="text-cyan-600">(555) 123-4567</span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default TestDetails;