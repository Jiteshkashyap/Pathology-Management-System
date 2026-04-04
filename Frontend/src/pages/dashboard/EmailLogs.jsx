import { useEffect, useState } from "react";
import { getEmailLogs } from "../../services/apiServices";
import Pagination from "../../components/Pagination";

const getStatusStyle = (status) => {
  if (status === "success")
    return "bg-green-100 text-green-700";

  if (status === "failed")
    return "bg-red-100 text-red-700";

  return "bg-gray-200 text-gray-800";
};

const getTypeStyle = (type) => {
  if (type === "report")
    return "bg-blue-100 text-blue-700";

  if (type === "appointment")
    return "bg-purple-100 text-purple-700";

  return "bg-gray-100 text-gray-700";
};

const EmailLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getEmailLogs({ page, limit });

        setLogs(res.data);
        setTotalPages(res.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page]);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading email logs...
      </p>
    );

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Email Logs
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          
          {/* Head */}
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Attempts</th>
              <th className="px-6 py-3">Reference</th>
              <th className="px-6 py-3 text-right">Time</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y">
            {logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-50 transition">
                
                {/* Email */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  {log.to}
                </td>

                {/* Type */}
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${getTypeStyle(
                      log.type
                    )}`}
                  >
                    {log.type}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${getStatusStyle(
                      log.status
                    )}`}
                  >
                    {log.status}
                  </span>
                </td>

                {/* Attempts */}
                <td className="px-6 py-4 text-gray-600">
                  {log.attempts}
                </td>

                {/* Reference */}
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {log.referenceId?.slice(-6)}
                </td>

                {/* Time */}
                <td className="px-6 py-4 text-right text-gray-500 text-xs whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default EmailLogs;