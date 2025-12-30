import { NavLink, useNavigate } from "react-router-dom";
import CurrencySelector from "./CurrencySelector";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-indigo-600 text-white shadow"
         : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800"
     }`;

  return (
    <nav
      className="
        sticky top-0 z-50
        flex items-center justify-between px-6 py-4
        bg-white/90 dark:bg-gray-900
        backdrop-blur
        border-b border-gray-200 dark:border-gray-800
      "
    >
      {/* Left */}
      <div className="flex items-center gap-6">
        <h1
          className="
            text-xl font-bold
            text-gray-900 dark:text-white
            cursor-pointer
          "
          onClick={() => navigate("/")}
        >
          FinTrack
        </h1>

        {isAuthenticated && (
          <>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/analytics" className={linkClass}>
              Analytics
            </NavLink>
          </>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {isAuthenticated && <CurrencySelector />}

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="
            px-3 py-1.5 rounded-lg
            border border-gray-300 dark:border-gray-700
            text-gray-800 dark:text-gray-100
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition
          "
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="
              px-4 py-1.5 rounded-lg
              bg-red-500 hover:bg-red-600
              text-white text-sm font-medium
              shadow-sm
              transition
            "
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
