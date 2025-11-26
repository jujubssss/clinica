import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  MdDashboard,
  MdExitToApp,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaUserPlus, FaListAlt, FaCalendarCheck } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const { theme } = useContext(ThemeContext);

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { path: "/dashboard", label: "Início", icon: <MdDashboard size={20} /> },
    { path: "/prontuarios", label: "Prontuários", icon: <FaListAlt size={18} /> },
    { path: "/pacientes", label: "Pacientes", icon: <FaUserPlus size={18} /> },
    { path: "/consultas", label: "Consultas", icon: <FaCalendarCheck size={18} /> },
    { path: "/exames", label: "Exames", icon: <FaListAlt size={18} /> },
  ];

  const isDark = theme === "dark";

  return (
    <aside
      className={`
        h-screen flex flex-col justify-between transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"}
        ${isDark ? "bg-gray-800 text-gray-200 border-r border-gray-700" : "bg-cyan-800 text-white"}
      `}
    >
      {/* Topo */}
      <div
        className={`
          p-4 flex items-center justify-between border-b
          ${isDark ? "border-gray-700" : "border-cyan-700"}
        `}
      >
        {!isCollapsed && (
          <h1 className="text-lg font-bold tracking-wide">Clínica+</h1>
        )}
        <button
          onClick={toggleMenu}
          className="hover:opacity-80 transition"
        >
          {isCollapsed ? <MdMenu size={24} /> : <MdClose size={24} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3 p-2 rounded-md transition-all
                    ${isActive
                      ? isDark
                        ? "bg-gray-700 text-cyan-300"
                        : "bg-cyan-600 text-white"
                      : isDark
                        ? "hover:bg-gray-700 hover:text-cyan-300 text-gray-200"
                        : "hover:text-cyan-300"
                    }
                  `}
                >
                  {item.icon}
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Botão Sair */}
      <div
        className={`
          p-4 border-t 
          ${isDark ? "border-gray-700" : "border-cyan-700"}
        `}
      >
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 w-full transition
            ${isDark
              ? "text-red-300 hover:text-red-500"
              : "text-red-300 hover:text-red-500"
            }
          `}
        >
          <MdExitToApp size={20} />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default SideMenu;
