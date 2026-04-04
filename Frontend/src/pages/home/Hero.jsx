import { motion } from "framer-motion";
import heroImage from "../../assets/images/Hero.jpg";
import { HeartPulse, Stethoscope, Pill } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero =()=> {

  const navigate = useNavigate();
  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative w-full max-w-7xl mx-auto px-6 pt-32 text-white ">

        <motion.div
       initial={{ opacity: 0, x: -150, scale: 0.95 }}
       animate={{ opacity: 1, x: 0, scale: 1 }}
       transition={{
       duration: 0.8,
       delay: 0.4,
       ease: [0.25, 0.1, 0.25, 1]
       }}
      className="max-w-2xl"
>
          <span className="bg-cyan-600 px-4 py-2 rounded-full text-sm">
            Leading Healthcare Specialists
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Advanced Medical Care for Your Family's Health
          </h1>

          <p className="mt-6 text-gray-200">
            Book lab tests online, get fast and accurate results, and manage your health reports securely from anywhere.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">

            <button onClick={()=>navigate('/appointment')} className="bg-cyan-600 px-6 py-3 rounded-full font-semibold">
              Book Appointment
            </button>

            <button onClick={()=>navigate('/services')} className="border border-cyan-400 px-6 py-3 rounded-full">
              Explore Services
            </button>

          </div>

          {/* Info */}
          <div className="flex gap-12 mt-10">

            <div>
              <p className="text-gray-300 text-sm">Support Helpline</p>
              <p className="font-semibold">+91 98765 43210</p>
            </div>

            <div>
              <p className="text-gray-300 text-sm">Working Hours</p>
              <p className="font-semibold">Mon-Fri: 8AM-8PM</p>
            </div>

          </div>

        </motion.div>

       <motion.div
  initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.6 }}
  className="w-full px-6 mt-20"
>
  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 bg-cyan-900/70 backdrop-blur-md p-8 rounded-2xl mb-10">

    {/* Card 1 */}
    <div className="flex gap-4 text-white">
      <HeartPulse className="text-cyan-400" size={32} />
      <div>
        <h3 className="font-semibold text-lg">Blood Testing</h3>
        <p className="text-gray-300 text-sm">Comprehensive blood analysis with accurate results.</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="flex gap-4 text-white">
      <Stethoscope className="text-cyan-400" size={32} />
      <div>
        <h3 className="font-semibold text-lg">Health Checkups</h3>
        <p className="text-gray-300 text-sm">Full body checkups for preventive healthcare.</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex gap-4 text-white">
      <Pill className="text-cyan-400" size={32} />
      <div>
        <h3 className="font-semibold text-lg">Lab Diagnostics</h3>
        <p className="text-gray-300 text-sm">Advanced diagnostic services with fast turnaround.</p>
      </div>
    </div>

  </div>
</motion.div>

      </div>
    </section>
  );
}

export default Hero;