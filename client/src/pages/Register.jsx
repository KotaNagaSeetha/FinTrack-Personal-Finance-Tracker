import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register({ name, email, password });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm
          bg-white dark:bg-gray-900
          border border-gray-200 dark:border-gray-800
          rounded-2xl p-8 shadow-xl
        "
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          Create account
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Start tracking your finances with FinTrack
        </p>

        <input
          placeholder="Full Name"
          className="
            w-full mb-3 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="
            w-full mb-3 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="
            w-full mb-4 px-3 py-2 rounded-lg
            bg-gray-100 dark:bg-gray-800
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="
            w-full py-2.5 rounded-lg
            bg-indigo-600 hover:bg-indigo-700
            text-white font-semibold
            transition disabled:opacity-50
          "
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
