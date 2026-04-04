import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-gray-100 pt-16">

      <div className="border-t mt-12 py-6 text-center text-sm text-gray-500"></div>

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-10">

        {/* Logo + Contact */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            MediTrust Labs
          </h2>

          <p className="text-gray-500 text-sm">
            Sector 17, Chandigarh
          </p>
          <p className="text-gray-500 text-sm">
            Punjab, India - 160017
          </p>

          <p className="mt-3 text-sm">
            <strong>Phone:</strong> +91 98765 43210
          </p>

          <p className="text-sm">
            <strong>Email:</strong> support@meditrustlabs.com
          </p>

          <div className="flex gap-3 mt-4">
            <div className="p-2 border rounded-full hover:bg-cyan-600 hover:text-white transition">
              <Twitter size={16}/>
            </div>
            <div className="p-2 border rounded-full hover:bg-cyan-600 hover:text-white transition">
              <Facebook size={16}/>
            </div>
            <div className="p-2 border rounded-full hover:bg-cyan-600 hover:text-white transition">
              <Instagram size={16}/>
            </div>
            <div className="p-2 border rounded-full hover:bg-cyan-600 hover:text-white transition">
              <Linkedin size={16}/>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li onClick={() => navigate("/")} className="cursor-pointer hover:text-cyan-600">Home</li>
            <li onClick={() => navigate("/appointment")} className="cursor-pointer hover:text-cyan-600">Book Appointment</li>
            <li onClick={() => navigate("/report")} className="cursor-pointer hover:text-cyan-600">My Reports</li>
            <li onClick={() => navigate("/contact")} className="cursor-pointer hover:text-cyan-600">Contact Us</li>
            <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-cyan-600">About Us</li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="font-semibold mb-4">Our Services</h4>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-cyan-600">Blood Tests</li>
            <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-cyan-600">Full Body Checkup</li>
            <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-cyan-600">Sample Collection</li>
            <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-cyan-600">Diagnostic Services</li>
            <li onClick={() => navigate("/services")} className="cursor-pointer hover:text-cyan-600">Online Report Access</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold mb-4">Patient Support</h4>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Track Appointment</li>
            <li>Download Reports</li>
            <li>FAQs</li>
            <li>Help Center</li>
            <li>Privacy & Security</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h4 className="font-semibold mb-4">Our Facilities</h4>

          <ul className="space-y-2 text-gray-500 text-sm">
            <li>Advanced Lab Equipment</li>
            <li>Certified Pathologists</li>
            <li>24/7 Support</li>
            <li>Accurate Reports</li>
            <li>Fast Turnaround</li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t mt-12 py-6 text-center text-sm text-gray-500">
        <p>
          © Copyright <strong>MediTrust Labs</strong>. All Rights Reserved
        </p>

        <p className="mt-1">
          Designed & Developed by <span className="text-cyan-600">Jitesh Kashyap</span>
        </p>
      </div>

    </footer>
  );
}

export default Footer;