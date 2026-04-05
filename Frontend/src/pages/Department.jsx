import { motion } from "framer-motion";
import { HeartPulse, Brain, Bone, ShieldPlus, Baby } from "lucide-react";
import doc3 from "../assets/images/doc3.webp"
import ortho from '../assets/images/otho.jpg'
import cardio from "../assets/images/cardio.webp"//fix isuues
import derma from "../assets/images/derma.jpg"
import pediatrics from "../assets/images/pediatrics.webp"

const departments = [
  {
    title: "Cardiology",
    subtitle: "Heart & Vascular Care",
    icon: HeartPulse,
    img:cardio,
    points: [
      "Advanced Cardiac Surgery",
      "Interventional Cardiology",
      "Heart Rhythm Care"
    ]
  },
  {
    title: "Orthopedics",
    subtitle: "Bone & Joint Care",
    icon: Bone,
    img: ortho,
    points: [
      "Joint Replacement",
      "Sports Medicine",
      "Spine Surgery"
    ]
  },
  {
    title: "Dermatology",
    subtitle: "Skin Health Experts",
    icon: ShieldPlus,
    img: derma,
    points: [
      "Cosmetic Dermatology",
      "Skin Cancer Treatment",
      "Laser Therapy"
    ]
  },
  {
    title: "Pediatrics",
    subtitle: "Children's Health",
    icon: Baby,
    img: pediatrics,
    points: [
      "Newborn Care",
      "Child Development",
      "Vaccination Programs"
    ]
  }
];

const Departments =()=> {
  return (
    <div className="pt-32 pb-20 bg-gray-50">

      {/* Header */}
      <div className="text-center mb-16">

        <p className="text-sm text-gray-500 mb-2">
          Home / Category / Departments
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Departments
        </h1>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
           We provide reliable diagnostic services with accurate reports.
        </p>

      </div>


      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 items-start">


        {/* LEFT COLUMN */}
        <div className="space-y-8">

          {departments.slice(0,2).map((dept, i) => {
            const Icon = dept.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >

                <div className="flex items-center gap-3 mb-4">

                  <div className="bg-cyan-100 w-10 h-10 flex items-center justify-center rounded-full">
                    <Icon size={20} className="text-cyan-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{dept.title}</h3>
                    <p className="text-xs text-gray-500">{dept.subtitle}</p>
                  </div>

                </div>

                <img
                  alt='Loading image'
                  src={dept.img}
                  loading="lazy"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />

                <ul className="text-sm text-gray-600 space-y-2">

                  {dept.points.map((p,index)=>(
                    <li key={index}>• {p}</li>
                  ))}

                </ul>

                <button className="mt-4 border border-cyan-600 text-cyan-600 px-4 py-1 rounded-full text-sm hover:bg-cyan-600 hover:text-white transition">
                  Learn More
                </button>

              </motion.div>
            );
          })}

        </div>


        {/* CENTER FEATURED CARD */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-b from-white to-gray-100 p-8 rounded-2xl shadow-lg text-center"
        >

          <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            FEATURED
          </span>

          <div className="flex justify-center my-6">

            <div className="bg-cyan-600 w-14 h-14 rounded-full flex items-center justify-center">
              <Brain className="text-white" />
            </div>

          </div>

          <h3 className="text-xl font-semibold">
            Neurology
          </h3>

          <p className="text-cyan-600 text-sm mb-4">
            Brain & Nervous System
          </p>

          <img
            src={doc3}
            loading="lazy"
            className="w-full h-40 object-cover rounded-lg mb-5"
          />

          <p className="text-gray-500 text-sm mb-6">
            Excepteur sint occaecat cupidatat non proident sunt in culpa.
          </p>

          <button className="bg-cyan-600 text-white px-6 py-2 rounded-full hover:bg-cyan-700 transition">
            Explore Department
          </button>

        </motion.div>


        {/* RIGHT COLUMN */}
        <div className="space-y-8">

          {departments.slice(2).map((dept, i) => {
            const Icon = dept.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition"
              >

                <div className="flex items-center gap-3 mb-4">

                  <div className="bg-cyan-100 w-10 h-10 flex items-center justify-center rounded-full">
                    <Icon size={20} className="text-cyan-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{dept.title}</h3>
                    <p className="text-xs text-gray-500">{dept.subtitle}</p>
                  </div>

                </div>

                <img
                  src={dept.img}
                  loading="lazy"
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />

                <ul className="text-sm text-gray-600 space-y-2">

                  {dept.points.map((p,index)=>(
                    <li key={index}>• {p}</li>
                  ))}

                </ul>

                <button className="mt-4 border border-cyan-600 text-cyan-600 px-4 py-1 rounded-full text-sm hover:bg-cyan-600 hover:text-white transition">
                  Learn More
                </button>

              </motion.div>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Departments;