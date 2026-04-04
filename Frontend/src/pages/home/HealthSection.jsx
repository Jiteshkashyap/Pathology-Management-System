import { motion } from "framer-motion";
import { HeartPulse, CalendarCheck, Users, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const  HealthPrioritySection =()=> {
  const navigate= useNavigate()
  return (
    <section className="py-24 bg-gray-100">

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">

        <h2 className="text-3xl font-bold text-slate-800">
          Your Health is Our Priority
        </h2>

        <p className="text-gray-500 mt-4">
          Book lab tests online, get accurate reports quickly, and manage your health records securely from anywhere.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">

          <button onClick={()=>navigate('/appointment')} className="bg-cyan-600 text-white px-6 py-3 rounded-full font-medium">
            Book Appointment
          </button>

          <button onClick={()=>navigate('/doctor')} className="border border-cyan-600 text-cyan-600 px-6 py-3 rounded-full font-medium">
            Find a Doctor
          </button>

        </div>

      </div>


      {/* Feature Cards */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 mb-16">

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-xl shadow text-center"
        >

          <div className="flex justify-center mb-4 text-cyan-600">
            <HeartPulse size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            24 / 7 Emergency Care
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            Advanced diagnostic technology ensuring precise and reliable results
          </p>

          <button className="text-cyan-600 text-sm font-medium">
            Learn More →
          </button>

        </motion.div>


        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white p-8 rounded-xl shadow text-center"
        >

          <div className="flex justify-center mb-4 text-cyan-600">
            <CalendarCheck size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Easy Online Booking
          </h3>

          <p className="text-gray-500 text-sm mb-4">
            Schedule tests online with flexible time slots and quick confirmations.
          </p>

          <button className="text-cyan-600 text-sm font-medium">
            Book Now →
          </button>

        </motion.div>


        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white p-8 rounded-xl shadow text-center"
        >

          <div className="flex justify-center mb-4 text-cyan-600">
            <Users size={30} />
          </div>

          <h3 className="font-semibold text-lg mb-3">
            Expert Medical Team
          </h3>

          <p className="text-gray-500 text-sm mb-4">
           Experienced professionals ensuring high-quality diagnostic services.
          </p>

          <button className="text-cyan-600 text-sm font-medium">
            Meet Our Doctors →
          </button>

        </motion.div>

      </div>


      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-6"
      >

        <div className="bg-cyan-700 text-white rounded-xl p-6 flex flex-col md:flex-row justify-between items-center">

          <div className="flex items-center gap-4">

            <div className="bg-white/20 p-3 rounded-full">
              <Phone />
            </div>

            <div>
              <h4 className="font-semibold text-lg">
                Medical Emergency?
              </h4>
              <p className="text-sm text-cyan-100">
                Call our 24/7 emergency hotline for immediate assistance
              </p>
            </div>

          </div>

          <button className="mt-4 md:mt-0 bg-white text-cyan-700 px-6 py-3 rounded-full font-semibold">
            📞 Call (555) 123-4567
          </button>

        </div>

      </motion.div>

    </section>
  );
}

export default HealthPrioritySection;