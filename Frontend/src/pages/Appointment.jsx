import { motion } from "framer-motion";
import {
  Calendar,
  User,
  CheckCircle,
  HeartPulse,
  Clock,
  Shield,
  Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createCheckoutSession } from "../services/apiServices";

import Loader from "../components/Loader";

import {
  setSlots,
  setAppointmentLoading,
  setAppointmentError,
  addAppointmentState,
} from "../redux/appointmentSlice";

import {
  getAvailableSlots,
  bookAppointment,
  getTests,
  getPackages,
} from "../services/apiServices";

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const steps = [
  {
    number: 1,
    title: "Fill Details",
    desc: "Provide your personal information and select department",
    icon: User,
  },
  {
    number: 2,
    title: "Choose Date",
    desc: "Select your preferred date and time slot",
    icon: Calendar,
  },
  {
    number: 3,
    title: "Confirmation",
    desc: "Receive instant confirmation via email or SMS",
    icon: CheckCircle,
  },
  {
    number: 4,
    title: "Get Treatment",
    desc: "Visit our clinic and receive quality healthcare",
    icon: HeartPulse,
  },
];

const Appointment = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.appointments);

  const [tests, setTests] = useState([]);
  const [packages, setPackages] = useState([]);
  const [slots, setLocalSlots] = useState([]);
  const [testSearch, setTestSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showTestDropdown, setShowTestDropdown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(testSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [testSearch]);

  const filteredTests = tests.filter((t) =>
    t.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const [formData, setFormData] = useState({
    test: [],
    package: "",
    appointmentDate: "",
    slotTime: "",
  });

  const today = new Date().toISOString().split("T")[0];

  // FETCH TESTS & PACKAGES
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [testRes, packageRes] = await Promise.all([
          getTests(),
          getPackages(),
        ]);

        setTests(testRes.data || testRes);
        setPackages(packageRes.data || packageRes);
      } catch (err) {
        toast.error("Failed to load data");
      }
    };

    fetchData();
  }, []);

  // ERROR TOAST
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // DATE CHANGE
  const handleDateChange = async (e) => {
    const date = e.target.value;

    setFormData({
      ...formData,
      appointmentDate: date,
    });

    try {
      dispatch(setAppointmentLoading(true));

      const res = await getAvailableSlots(date);

      setLocalSlots(res.data);
      dispatch(setSlots(res.data));
    } catch (error) {
      dispatch(setAppointmentError(error.message));
      toast.error("Failed to load slots");
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    dispatch(setAppointmentLoading(true));

    const payload = {
      appointmentDate: formData.appointmentDate,
      slotTime: formData.slotTime,
    };

    if (formData.package) {
      payload.package = formData.package;
    } else if (formData.test.length > 0) {
      payload.test = formData.test;
    }

    const res = await createCheckoutSession(payload);

    window.location.href = res.url;

  } catch (error) {
    dispatch(setAppointmentError(error.message));
    toast.error(error.message || "Payment failed");
  }
};

  // LOADER
 if (loading && !formData.appointmentDate) return <Loader />;

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm text-gray-500 mb-3">
          Home / Category / Appointment
        </p>

        <h1 className="text-4xl font-bold text-slate-800">Appointment</h1>

        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </motion.div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* LEFT INFO */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Quick & Easy Online Booking
          </h2>

          <p className="text-gray-600 mb-8">
            Book your appointment in just a few simple steps.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Calendar className="text-cyan-600" />
              <div>
                <h4 className="font-semibold">Flexible Scheduling</h4>
                <p className="text-sm text-gray-500">
                  Choose from available time slots.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Clock className="text-cyan-600" />
              <div>
                <h4 className="font-semibold">Quick Response</h4>
                <p className="text-sm text-gray-500">
                  Confirmation within minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Shield className="text-cyan-600" />
              <div>
                <h4 className="font-semibold">Expert Medical Care</h4>
                <p className="text-sm text-gray-500">
                  Board-certified specialists.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-100 p-4 rounded-lg flex gap-3 items-center">
            <Phone className="text-cyan-600" />

            <div>
              <p className="font-semibold text-sm">Emergency Hotline</p>

              <p className="text-sm text-gray-500">
                Call +1 (555) 911-4567
              </p>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white shadow rounded-xl p-8"
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* TEST (MULTI) */}
            <div className="col-span-1 relative">
              <div
                onClick={() => setShowTestDropdown(true)}
                className="border rounded-lg p-2 bg-gray-50 min-h-[44px] flex flex-wrap gap-1 cursor-text"
              >
                {formData.test.length === 0 && (
                  <span className="text-gray-400 text-sm">
                    Search & select tests...
                  </span>
                )}

                {formData.test.map((id) => {
                  const test = tests.find((t) => t._id === id);

                  return (
                    <span
                      key={id}
                      className="bg-cyan-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1"
                    >
                      {test?.name}

                      <span
                        onClick={(e) => {
                          e.stopPropagation();

                          setFormData({
                            ...formData,
                            test: formData.test.filter((tid) => tid !== id),
                          });
                        }}
                        className="cursor-pointer"
                      >
                        ✕
                      </span>
                    </span>
                  );
                })}
              </div>

              {showTestDropdown && (
                <div className="absolute z-50 mt-1 w-full bg-white border rounded-lg shadow-lg">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search tests..."
                    value={testSearch}
                    onChange={(e) => setTestSearch(e.target.value)}
                    className="w-full px-3 py-2 border-b text-sm outline-none"
                  />

                  <div className="max-h-48 overflow-y-auto">
                    {filteredTests.slice(0, 20).map((test) => {
                      const isSelected = formData.test.includes(test._id);

                      return (
                        <div
                          key={test._id}
                          onClick={() => {
                            let updated;

                            if (isSelected) {
                              updated = formData.test.filter(
                                (id) => id !== test._id
                              );
                            } else {
                              updated = [...formData.test, test._id];
                            }

                            setFormData({
                              ...formData,
                              test: updated,
                              package: "",
                            });
                          }}
                          className={`px-3 py-2 text-sm cursor-pointer flex justify-between
                            ${
                              isSelected
                                ? "bg-cyan-600 text-white"
                                : "hover:bg-gray-100"
                            }`}
                        >
                          {test.name}
                          {isSelected && "✓"}
                        </div>
                      );
                    })}

                    {filteredTests.length === 0 && (
                      <p className="text-center text-gray-400 py-2 text-sm">
                        No tests found
                      </p>
                    )}
                  </div>
                </div>
              )}

              {showTestDropdown && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowTestDropdown(false)}
                />
              )}
            </div>

            {/* PACKAGE */}
            <select
              className="border rounded-lg p-3 text-sm"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  package: e.target.value,
                  test: [],
                })
              }
            >
              <option>Select Package</option>

              {packages?.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              min={today}
              className="border rounded-lg p-3 text-sm"
              onChange={handleDateChange}
            />

            {/* SLOT */}
            <select
              className="border rounded-lg p-3 text-sm"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  slotTime: e.target.value,
                })
              }
            >
              <option>Select Slot</option>

              {slots?.map((slot) => (
                <option
                  key={slot.slot}
                  value={slot.slot}
                  disabled={!slot.available}
                >
                  {slot.slot} {slot.available ? "" : "(Full)"}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Additional notes (optional)"
              className="border rounded-lg p-3 text-sm col-span-2"
              rows="4"
            />

            <button
              type="submit"
              className="bg-cyan-600 text-white py-3 rounded-lg col-span-2 font-semibold hover:bg-cyan-700 transition"
            >
              Book Appointment
            </button>
          </form>
        </motion.div>
      </div>

      {/* STEPS */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-4 gap-10 text-center"
      >
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div key={index} variants={item}>
              <div className="bg-cyan-600 text-white w-10 h-10 flex items-center justify-center rounded-full mx-auto mb-4 font-semibold">
                {step.number}
              </div>

              <div className="flex justify-center mb-3 text-cyan-600">
                <Icon size={32} />
              </div>

              <h4 className="font-semibold mb-2">{step.title}</h4>

              <p className="text-sm text-gray-500">{step.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Appointment;