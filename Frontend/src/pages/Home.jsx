import Hero from "../pages/home/Hero"
import { lazy, Suspense, useState } from "react";
import { Bot } from "lucide-react";
import HealthAIModal from "../components/HealthAIModal";
import { motion } from "framer-motion";

const AboutSection = lazy(() => import("../pages/home/About"));
const DepartmentsSection = lazy(() => import("../pages/home/Departments"));
const ServiceSection = lazy(() => import("../pages/home/Service"));
const HealthPrioritySection = lazy(() => import("../pages/home/HealthSection"));
const FindDoctorSection = lazy(()=> import("../pages/home/FindDoctors"))

const Home =()=> {

  const [openAI, setOpenAI] = useState(false);

  return (
    <>

      <Hero />

      {/* AI Assistant Button */}
      <button
  onClick={() => setOpenAI(true)}
  className="fixed bottom-8 right-8 z-50 group"
>
  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 
                  flex items-center justify-center text-white shadow-xl
                  group-hover:scale-110 transition-all duration-300">

    <motion.div
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <Bot size={28} />
    </motion.div>

  </div>

  {/* pulse ring */}
  <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-30 animate-ping" />
</button>
      <HealthAIModal open={openAI} close={() => setOpenAI(false)} />


      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>

        <AboutSection />
        <DepartmentsSection />
        <FindDoctorSection/>
        <ServiceSection />
        <HealthPrioritySection />

      </Suspense>


      

    </>
  );
}
export default Home;