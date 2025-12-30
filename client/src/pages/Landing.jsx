import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="
        flex items-center justify-center
        min-h-[calc(100vh-64px)]
        px-4
        bg-gradient-to-b
        from-indigo-50 via-white to-white
        dark:from-slate-950 dark:via-slate-950 dark:to-slate-950
      "
    >
      <div className="max-w-xl text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          FinTrack
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Track expenses, manage budgets, and gain clear insights into your
          personal finances — all in one powerful dashboard.
        </p>

        {/* CTA */}
        {!isAuthenticated ? (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="
                px-7 py-3 rounded-xl
                bg-indigo-600 hover:bg-indigo-700
                text-white font-semibold
                shadow-md hover:shadow-lg
                transition
              "
            >
              Login
            </Link>

            <Link
              to="/register"
              className="
                px-7 py-3 rounded-xl
                bg-white dark:bg-gray-900
                border border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                hover:bg-gray-100 dark:hover:bg-gray-800
                font-semibold
                shadow-sm
                transition
              "
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-8 py-3 rounded-xl
              bg-indigo-600 hover:bg-indigo-700
              text-white font-semibold
              shadow-md hover:shadow-lg
              transition
            "
          >
            Go to Dashboard
          </button>
        )}

        {/* Trust line */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-10">
          Secure • Private • Fast
        </p>
      </div>
    </div>
  );
}

export default Landing;
