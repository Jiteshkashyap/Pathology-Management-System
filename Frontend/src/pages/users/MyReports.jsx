import { useEffect, useState } from "react";
import { FileText, Download, Calendar } from "lucide-react";
import {
  getMyReportsAPI,
  getReportDownloadUrlAPI
} from "../../services/apiServices";
import Loader from "../../components/Loader";

const MyReports = () => {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  // FETCH REPORTS
  const fetchReports = async () => {
    try {
      setLoading(true);

      const res = await getMyReportsAPI({
        page: 1,
        limit: 10
      });

      setReports(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);


  // DOWNLOAD
  const handleDownload = async (id) => {

    try {

      setDownloadingId(id);

      const res = await getReportDownloadUrlAPI(id);

      // open download link
      window.open(res.downloadUrl, "_blank");

    } catch (error) {

      console.log(error);

    } finally {

      setDownloadingId(null);

    }

  };


  if (loading) {
    return <Loader/>;
  }


  return (

    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">
          My Reports
        </h1>
        <p className="text-gray-500 mt-2">
          View and download your medical reports
        </p>
      </div>


      {/* LIST */}
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">

        {reports.length === 0 ? (
          <p className="text-gray-500 col-span-2 text-center">
            No reports found
          </p>
        ) : (

          reports.map((report) => (

            <div
              key={report._id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex gap-4"
            >

              {/* ICON */}
              <div className="bg-cyan-100 p-4 rounded-xl h-fit">
                <FileText className="text-cyan-600" size={26} />
              </div>


              {/* CONTENT */}
              <div className="flex-1">

                <h3 className="font-semibold text-lg">
                  {report.patientName}
                </h3>

                <p className="text-sm text-gray-500">
                  Status: {report.overallStatus}
                </p>

                <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                  <Calendar size={14} />
                  {new Date(report.createdAt).toDateString()}
                </div>


                {/* DOWNLOAD */}
                <button
                  onClick={() => handleDownload(report._id)}
                  disabled={!report.pdfKey || downloadingId === report._id}
                  className="mt-4 flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm hover:bg-cyan-700 disabled:opacity-50"
                >

                  <Download size={16} />

                  {downloadingId === report._id
                    ? "Downloading..."
                    : "Download PDF"}

                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

};

export default MyReports;