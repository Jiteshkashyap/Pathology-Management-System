import { useEffect, useState } from "react";
import { Calendar, User, Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctors,getTests } from "../../services/apiServices";

import Modal from "../../components/Modal";
import ReportForm from "../../forms/ReportForm";
import toast from "react-hot-toast";

import {
  setAppointmentLoading,
  setAppointmentError,
  cancelAppointmentState,
  setPagination,
  setAdminAppointments
} from "../../redux/appointmentSlice";

import {
  getAllAppointmentsAPI,
  updateAppointmentStatusAPI,
  createReport
} from "../../services/apiServices";

const AllAppointments = () => {

  const dispatch = useDispatch();

  const { appointments, page, totalPages } = useSelector(
    (state) => state.appointments
  );

  const [filters, setFilters] = useState({
    date: "",
    status: ""
  });

  // 🔥 NEW STATE (REPORT MODAL)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctors , setDoctors]=useState([]);
  const [tests , setTests]=useState([]);

  // FETCH
  const fetchAppointments = async () => {
    try {
      dispatch(setAppointmentLoading(true));

      const res = await getAllAppointmentsAPI({
        page,
        limit: 10,
        ...filters
      });

      dispatch(setAdminAppointments(res.data));
      dispatch(setPagination({
        page: res.page,
        totalPages: res.totalPages
      }));

    } catch (err) {
      dispatch(setAppointmentError(err.message));
    }
  };
  const fetchMeta = async () => {
  try {
    const [docRes, testRes] = await Promise.all([
      getDoctors({ page: 1, limit: 1000 }),
      getTests()
    ]);

    setDoctors(docRes.data.data || docRes.data);
    setTests(testRes.data.data || testRes.data);

  } catch (err) {
    console.error("Meta fetch error:", err);
  }
};

  useEffect(() => {
    fetchAppointments();
    fetchMeta();
  }, [page, filters]);


  // UPDATE STATUS
  const updateStatus = async (id, status) => {
  try {
    await updateAppointmentStatusAPI(id, { status });

    // 🔥 FORCE REFRESH FROM SERVER
    fetchAppointments();

  } catch (err) {
    dispatch(setAppointmentError(err.message));
  }
};

  // 🔥 OPEN REPORT MODAL
  const handleCreateReport = (appointment) => {
    setSelectedAppointment(appointment);
    setIsReportModalOpen(true);
  };

  // 🔥 CREATE REPORT FROM APPOINTMENT
  const handleCreateFromAppointment = async (formData) => {
    try {
      await createReport(formData);

      toast.success("Report created successfully");

      setIsReportModalOpen(false);
      setSelectedAppointment(null);

      fetchAppointments();

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };


  return (

    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          All Appointments
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and update appointment status
        </p>
      </div>


      {/* FILTERS */}
      <div className="flex gap-4 flex-wrap bg-white p-4 rounded-xl shadow">

        <input
          type="date"
          className="border p-2 rounded-lg text-sm"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />

        <select
          className="border p-2 rounded-lg text-sm"
          value={filters.status}
          onChange={(e) =>
            setFilters({ ...filters, status: e.target.value })
          }
        >
          <option value="">All Status</option>
          <option value="booked">Booked</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

      </div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Patient</th>
              <th className="p-3 text-left">Test / Package</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Slot</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>

            {appointments.map((appt) => (

              <tr key={appt._id} className="border-t">

                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <div>
                      <p>{appt.patient?.name}</p>
                      <p className="text-xs text-gray-500">
                        {appt.patient?.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3">
  {appt.package?.name
    || (appt.tests?.length
        ? appt.tests.map(t => t.name).join(", ")
        : appt.test?.name || "N/A")}
</td>

                <td className="p-3">
  <div className="flex items-center gap-2">
    <Calendar size={14} />
    {new Date(appt.appointmentDate).toDateString()}
  </div>
</td>

<td className="p-3">
  <div className="flex items-center gap-2">
    <Clock size={14} />
    {appt.slotTime}
  </div>
</td>

                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded bg-gray-100">
                    {appt.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex gap-2">

                    {appt.status === "booked" && (
                      <>
                        <button
                          onClick={() =>
                            updateStatus(appt._id, "completed")
                          }
                          className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(appt._id, "cancelled")
                          }
                          className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* 🔥 CREATE REPORT BUTTON */}
                    {appt.status === "completed" && (
                      <button
                        onClick={() => handleCreateReport(appt)}
                        className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded"
                      >
                        Create Report
                      </button>
                    )}

                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* PAGINATION */}
      <div className="flex justify-center gap-3">

        <button
          disabled={page === 1}
          onClick={() =>
            dispatch(setPagination({ page: page - 1, totalPages }))
          }
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            dispatch(setPagination({ page: page + 1, totalPages }))
          }
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>

      </div>


      {/* 🔥 REPORT MODAL */}
      <Modal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        title="Create Report"
      >
        <ReportForm
          mode="create"
          appointmentData={selectedAppointment}
          onSubmit={handleCreateFromAppointment}
          tests={tests}
          doctors={doctors}
        />
      </Modal>

    </div>
  );
};

export default AllAppointments;