import { Link, useLocation } from "react-router-dom";
import { FaUserMd, FaFlask, FaBox, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    { path: "/", label: "Dashboard", icon: <FaFileAlt /> },
    { path: "/doctors", label: "Doctors", icon: <FaUserMd /> },
    { path: "/tests", label: "Tests", icon: <FaFlask /> },
    { path: "/packages", label: "Packages", icon: <FaBox /> },
    { path: "/reports", label: "Reports", icon: <FaFileAlt /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white hidden md:flex flex-col shadow-xl">
      <div className="text-2xl font-bold p-6 tracking-wide border-b border-blue-800">
        🧪 Pathology
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? "bg-accent shadow-lg"
                : "hover:bg-blue-800"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;