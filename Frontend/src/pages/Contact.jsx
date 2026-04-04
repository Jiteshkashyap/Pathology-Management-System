import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Linkedin } from "lucide-react";

const Contact =()=> {
  return (
    <div className="pt-32 pb-20 bg-gray-50">

      {/* Header */}
      <div className="text-center mb-16">

        <p className="text-sm text-gray-500 mb-3">
          Home / Category / Contact
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          Contact
        </h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
           We provide reliable diagnostic services with accurate reports.
        </p>

      </div>


      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">

        {/* LEFT CONTACT CARD */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-gradient-to-b from-cyan-600 to-cyan-700 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-between"
        >

          <div>

            <h2 className="text-xl font-semibold mb-6">
              Contact Information
            </h2>

            <p className="text-sm mb-8 text-cyan-100">
              Dignissimos deleniti accusamus numquam voluptatem.
            </p>


            <div className="space-y-5">

              <div className="flex gap-4 items-start bg-white/10 p-4 rounded-lg">
                <MapPin />
                <div>
                  <h4 className="font-semibold">Our Location</h4>
                  <p className="text-sm text-cyan-100">
                    4952 Hilltop Dr, Anytown
                  </p>
                </div>
              </div>


              <div className="flex gap-4 items-start bg-white/10 p-4 rounded-lg">
                <Mail />
                <div>
                  <h4 className="font-semibold">Email Us</h4>
                  <p className="text-sm text-cyan-100">
                    info@example.com
                  </p>
                </div>
              </div>


              <div className="flex gap-4 items-start bg-white/10 p-4 rounded-lg">
                <Phone />
                <div>
                  <h4 className="font-semibold">Call Us</h4>
                  <p className="text-sm text-cyan-100">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>


              <div className="flex gap-4 items-start bg-white/10 p-4 rounded-lg">
                <Clock />
                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-sm text-cyan-100">
                    Monday-Saturday: 9AM-7PM
                  </p>
                </div>
              </div>

            </div>

          </div>


          {/* Social Icons */}
          <div className="mt-10">

            <h4 className="mb-3 font-semibold">Follow Us</h4>

            <div className="flex gap-3">

              <div className="bg-white/20 p-2 rounded-full">
                <Facebook size={16} />
              </div>

              <div className="bg-white/20 p-2 rounded-full">
                <Instagram size={16} />
              </div>

              <div className="bg-white/20 p-2 rounded-full">
                <Linkedin size={16} />
              </div>

            </div>

          </div>

        </motion.div>


        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-3 space-y-6"
        >

          {/* GOOGLE MAP */}
          <iframe
            className="w-full h-[300px] rounded-xl border"
            loading="lazy"
            src="https://maps.google.com/maps?q=Jersey%20City&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>


          {/* CONTACT FORM */}
          <div className="bg-white p-8 rounded-xl shadow-lg">

            <h3 className="text-xl font-semibold mb-4">
              Send Us a Message
            </h3>

            <p className="text-sm text-gray-500 mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>


            <form className="space-y-4">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />

              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              ></textarea>


              <button
                type="submit"
                className="w-full bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition"
              >
                Send Message
              </button>

            </form>

          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Contact;