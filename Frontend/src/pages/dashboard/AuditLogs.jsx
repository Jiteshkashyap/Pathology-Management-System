import { useEffect, useState } from "react";
import { getAuditLogs } from "../../services/apiServices";
import Pagination from "../../components/Pagination";

const getActionStyle = (action) => {
  if (!action) return "bg-gray-100 text-gray-700";

  if (action.includes("DELETE"))
    return "bg-red-50 text-red-600";

  if (action.includes("CREATE"))
    return "bg-green-50 text-green-600";

  if (action.includes("UPDATE"))
    return "bg-amber-50 text-amber-600";

  if (action.includes("REPORT"))
    return "bg-blue-50 text-blue-600";

  return "bg-gray-100 text-gray-700";
};

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAuditLogs({ page, limit });

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

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">
        Loading audit logs...
      </p>
    );
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Audit Logs
        </h2>
      </div>

      {/* Timeline */}
      <div>
        {logs.map((log, index) => (
          <div
            key={log._id}
            className="flex gap-4 px-6 py-5 hover:bg-gray-50/70 transition"
          >
            {/* Timeline */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-gray-600 border-2 border-white shadow-sm mt-2"></div>
              {index !== logs.length - 1 && (
                <div className="w-px flex-1 bg-gray-400 mt-1"></div>
              )}
            </div>

            {/* Content (FULL WIDTH FIX) */}
            <div className="flex-1 grid grid-cols-[1fr_auto] gap-4 items-start">
              
              {/* Left (Main Info) */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  
                  {/* Action */}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-medium ${getActionStyle(
                      log.action
                    )}`}
                  >
                    {log.action}
                  </span>

                  {/* User */}
                  <span className="text-sm font-semibold text-gray-900">
                    {log.performedBy?.name || "Unknown"}
                  </span>

                  {/* Extra context (fills space nicely) */}
                  <span className="text-sm text-gray-500">
                    performed this action
                  </span>
                </div>

                {/* Email */}
                <p className="text-xs text-gray-500 mt-0.5">
                  {log.performedBy?.email}
                </p>
              </div>

              {/* Right (Time aligned properly) */}
              <div className="text-xs text-gray-500 font-medium whitespace-nowrap text-right">
                {new Date(log.createdAt).toLocaleString()}
              </div>

            </div>
          </div>
        ))}
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

export default AuditLogs;