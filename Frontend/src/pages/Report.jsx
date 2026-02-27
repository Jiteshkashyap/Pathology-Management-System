import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import ReportForm from "../forms/ReportForm";
import {
  getReports,
  createReport,
  updateReportResults,
  getDoctors,
  getTests,
} from "../services/apiServices";
import toast from "react-hot-toast";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [tests, setTests] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [mode, setMode] = useState("create");


  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [reportRes, doctorRes, testRes] = await Promise.all([
        getReports(),
        getDoctors(),
        getTests(),
      ]);

      setReports(reportRes.data);
      setDoctors(doctorRes.data);
      setTests(testRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };


  const handleCreate = async (formData) => {
    try {
      await createReport(formData);
      setIsModalOpen(false);
      fetchAll();
    } catch (error) {
      console.error("Create failed:", error);
    }
  };

  

  const handleUpdateResults = async (formData) => {
  const loadingToast = toast.loading("Updating results...");

  try {
    await updateReportResults(
      selectedReport._id,
      formData
    );

    toast.success("Results updated & email queued");

    setIsModalOpen(false);
    setSelectedReport(null);
    fetchAll();

  } catch (error) {
    toast.error(
      error.response?.data?.message || "Update failed"
    );
  } finally {
    toast.dismiss(loadingToast);
  }
};

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Reports</h2>

        <button
          onClick={() => {
            setMode("create");
            setSelectedReport(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Report
        </button>
      </div>

      

      <table className="w-full text-left">
        <thead>
          <tr className="border-b bg-gray-50 text-sm text-gray-600">
            <th className="py-3 px-2">Patient</th>
            <th>Doctor</th>
            <th>Status</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report._id} className="border-b">
              <td className="py-3 px-2">
                {report.patientName}
              </td>
              <td>{report.doctor?.name}</td>
              <td>{report.overallStatus}</td>

              <td className="text-right">
                <button
                  onClick={() => {
                    setMode("update");
                    setSelectedReport(report);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600"
                >
                  Update Results
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          mode === "create"
            ? "Create Report"
            : "Update Results"
        }
      >
        <ReportForm
          mode={mode}
          initialData={selectedReport}
          doctors={doctors}
          tests={tests}
          onSubmit={
            mode === "create"
              ? handleCreate
              : handleUpdateResults
          }
        />
      </Modal>
    </div>
  );
};

export default Reports;