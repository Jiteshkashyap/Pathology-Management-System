import { Link, useLocation } from "react-router-dom";
import {
  FaUserMd,
  FaFlask,
  FaBox,
  FaFileAlt,
  FaUsers,
  FaClipboardList,
  FaEnvelope
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { path: "/dashboard", label: "Dashboard", icon: <FaFileAlt /> },
    { path: "/dashboard/doctors", label: "Doctors", icon: <FaUserMd /> },
    { path: "/dashboard/tests", label: "Tests", icon: <FaFlask /> },
    { path: "/dashboard/packages", label: "Packages", icon: <FaBox /> },
    { path: "/dashboard/reports", label: "Reports", icon: <FaFileAlt /> },
    { path: "/dashboard/users", label: "Users", icon: <FaUsers /> },
    { path: "/dashboard/auditLogs", label: "Audit Logs", icon: <FaClipboardList /> },
    { path: "/dashboard/emailLogs", label: "Email Logs", icon: <FaEnvelope /> },
  ];

  return (
    <div className="w-64 min-h-screen hidden md:flex flex-col 
    bg-white/70 backdrop-blur-lg border-r border-gray-200 shadow-lg">

      {/* LOGO */}
      <div className="text-xl font-bold p-6 border-b flex items-center gap-2 text-slate-800">
        <span className="bg-cyan-600 text-white p-2 rounded">🧪</span>
        MediTrust
      </div>

      {/* MENU */}
      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => {

          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
              
              ${isActive
                ? "bg-cyan-600 text-white shadow-md"
                : "text-gray-600 hover:bg-cyan-50 hover:text-cyan-600"}
              
              `}
            >
              <span className={`text-lg ${isActive ? "text-white" : "text-cyan-600"}`}>
                {item.icon}
              </span>

              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* FOOTER */}
      <div className="p-4 border-t text-xs text-gray-500 text-center">
        © 2026 MediTrust
      </div>

    </div>
  );
};

export default Sidebar;