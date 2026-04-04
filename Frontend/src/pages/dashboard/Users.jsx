import { useEffect, useState } from "react";
import { getUsers } from "../../services/apiServices";
import Pagination from "../../components/Pagination";

const getRoleStyle = (role) => {
  switch (role) {
    case "admin":
      return "bg-gray-900 text-white";
    case "technician":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // ✅ FIXED

  const usersPerPage = 10;

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getUsers({
          page,
          limit: usersPerPage,
        });

        console.log(res); // debug

        setUsers(res.data);          // ✅ matches backend
        setTotalPages(res.totalPages); // ✅ from backend

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
        Loading users...
      </p>
    );
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Users</h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                
                <td className="px-6 py-4 font-medium text-gray-900">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize ${getRoleStyle(user.role)}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <button className="text-gray-500 hover:text-gray-900 text-sm">
                    View
                  </button>
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

export default Users;