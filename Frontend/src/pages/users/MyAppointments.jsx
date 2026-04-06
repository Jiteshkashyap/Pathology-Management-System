import { motion , AnimatePresence } from "framer-motion";
import { Calendar, Clock, FileText, XCircle } from "lucide-react";
import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  setAppointments,
  cancelAppointmentState,
  setAppointmentLoading,
  setAppointmentError
} from "../../redux/appointmentSlice";

import {
  getMyAppointments,
  cancelAppointment
} from "../../services/apiServices";

const MyAppointments = () => {

  const dispatch = useDispatch();
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [searchParams] = useSearchParams();

  const { appointments } = useSelector((state) => state.appointments);

  // ✅ NEW STATE
  const [selectedAppointment, setSelectedAppointment] = useState(null);


  useEffect(() => {

  const fetchAppointments = async () => {
    try {
      dispatch(setAppointmentLoading(true));

      const res = await getMyAppointments();

      dispatch(setAppointments(res.data));

    } catch (error) {
      dispatch(setAppointmentError(error.message));
    }
  };

  const handlePaymentFlow = async () => {
    if (searchParams.get("payment") === "success") {
      setCheckingPayment(true);

      setTimeout(async () => {
        await fetchAppointments();

        toast.success("Payment successful 🎉");

        setCheckingPayment(false);
      }, 1500);

    } else {
      await fetchAppointments();
    }
  };

  handlePaymentFlow();

}, [dispatch]);


  const cancelAppointmentHandler = async (id) => {

    try {

      const res = await cancelAppointment(id);

      dispatch(cancelAppointmentState(res.data));

    } catch (error) {

      dispatch(setAppointmentError(error.message));

    }

  };

if (checkingPayment) {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>

      <p className="mt-4 text-gray-600">
        Confirming your payment...
      </p>
    </div>
  );
}

  return (

    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">

      {/* PAGE HEADER */}
      <div className="text-center mb-14">

        <p className="text-sm text-gray-500 mb-3">
          Home / Category / My Tests
        </p>

        <h1 className="text-4xl font-bold text-slate-800">
          My Test Bookings
        </h1>

        <p className="text-gray-500 mt-3">
          View and manage your booked diagnostic tests
        </p>

      </div>


      {/* DASHBOARD STATS */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 gap-6 mb-12">

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-cyan-600">
            {appointments.filter(a => a.status === "booked").length}
          </h3>
          <p className="text-sm text-gray-500">
            Upcoming Tests
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-green-600">
            {appointments.filter(a => a.status === "completed").length}
          </h3>
          <p className="text-sm text-gray-500">
            Completed
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h3 className="text-2xl font-bold text-red-600">
            {appointments.filter(a => a.status === "cancelled").length}
          </h3>
          <p className="text-sm text-gray-500">
            Cancelled
          </p>
        </div>

      </div>


      {/* BOOKINGS LIST */}
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

        {appointments.map((appt, index) => (

          <motion.div
            key={appt._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition flex gap-4"
          >

            <div className="bg-cyan-100 p-4 rounded-xl h-fit">
              <FileText className="text-cyan-600" size={26} />
            </div>

            <div className="flex-1">

              <div className="flex justify-between items-start">

                <div>
                  <h3 className="font-semibold text-lg">
                    {appt.test?.name || appt.package?.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {appt.test?.category || "Package"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Booking ID: {appt._id}
                  </p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    appt.status === "booked"
                      ? "bg-green-100 text-green-700"
                      : appt.status === "completed"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {appt.status}
                </span>

              </div>


              <div className="flex gap-6 text-sm text-gray-600 mt-4">

                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(appt.appointmentDate).toDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {appt.slotTime}
                </div>

              </div>


              <div className="flex gap-3 mt-6">

                {/* ✅ UPDATED BUTTON */}
                <button
                  onClick={() => setSelectedAppointment(appt)}
                  className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  View Details
                </button>

                {appt.status === "booked" && (
                  <button
                    onClick={() => cancelAppointmentHandler(appt._id)}
                    className="text-sm px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center gap-2"
                  >
                    <XCircle size={16} />
                    Cancel
                  </button>
                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>


      {/* ✅ MODAL */}
     {/* ✅ PREMIUM MODAL */}
<AnimatePresence>
  {selectedAppointment && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
        onClick={() => setSelectedAppointment(null)}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 80 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.85, y: 60 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                   w-[90%] max-w-md z-[60]"
      >
        <div className="relative bg-white/70 backdrop-blur-xl border border-white/30 
                        rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.25)] p-6">

          {/* Close */}
          <button
            onClick={() => setSelectedAppointment(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/60 transition"
          >
            <XCircle size={20} />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Appointment Details
            </h2>
            <p className="text-xs text-gray-500">
              Detailed information about your booking
            </p>
          </div>

          {/* Content */}
          <div className="space-y-4 text-sm">

            {/* Card Item */}
            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Test</span>
              <span className="font-medium text-gray-800">
                {selectedAppointment.tests?.name || selectedAppointment.package?.name}
              </span>
            </div>

            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Category</span>
              <span className="font-medium text-gray-800">
                {selectedAppointment.tests?.category || "Package"}
              </span>
            </div>

            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-medium px-3 py-1 rounded-full text-xs ${
                  selectedAppointment.status === "booked"
                    ? "bg-green-100 text-green-700"
                    : selectedAppointment.status === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {selectedAppointment.status}
              </span>
            </div>

            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-800">
                {new Date(selectedAppointment.appointmentDate).toDateString()}
              </span>
            </div>

            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Time</span>
              <span className="font-medium text-gray-800">
                {selectedAppointment.slotTime}
              </span>
            </div>

            <div className="flex justify-between bg-white/60 p-3 rounded-xl">
              <span className="text-gray-500">Booking ID</span>
              <span className="font-medium text-gray-800 text-xs">
                {selectedAppointment._id}
              </span>
            </div>

            {selectedAppointment.amount && (
              <div className="flex justify-between bg-white/60 p-3 rounded-xl">
                <span className="text-gray-500">Amount</span>
                <span className="font-semibold text-cyan-600">
                  ₹{selectedAppointment.amount}
                </span>
              </div>
            )}

          </div>

        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>

    </div>

  );

};

export default MyAppointments;