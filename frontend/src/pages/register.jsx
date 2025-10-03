// src/pages/register.jsx
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const { theme } = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();

  const isDark = theme === "dark";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = register(name, email, password);
      setLoading(false);

      if (success) {
        navigate("/profile");
      } else {
        setError("Registration failed. Try again.");
      }
    }, 1000);
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
        isDark ? "bg-dark-bg1 text-dark-text" : "bg-light-bg1 text-light-text"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          isDark ? "bg-dark-bg2" : "bg-light-bg2"
        }`}
      >
        <h1
          className={`text-3xl font-bold mb-6 text-center ${
            isDark ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          Create Account ✨
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={`w-full pl-10 p-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-bg1 border-dark-bg2 focus:ring-dark-primary text-dark-text"
                    : "bg-light-bg1 border-light-bg2 focus:ring-light-primary text-light-text"
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className={`w-full pl-10 p-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-bg1 border-dark-bg2 focus:ring-dark-primary text-dark-text"
                    : "bg-light-bg1 border-light-bg2 focus:ring-light-primary text-light-text"
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 p-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-bg1 border-dark-bg2 focus:ring-dark-primary text-dark-text"
                    : "bg-light-bg1 border-light-bg2 focus:ring-light-primary text-light-text"
                }`}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 p-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-bg1 border-dark-bg2 focus:ring-dark-primary text-dark-text"
                    : "bg-light-bg1 border-light-bg2 focus:ring-light-primary text-light-text"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg flex justify-center items-center gap-2 transition ${
              isDark
                ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
                : "bg-light-primary text-light-text hover:bg-light-accent"
            } ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p
          className={`mt-6 text-center text-sm ${
            isDark
              ? "text-dark-text-secondary"
              : "text-light-text-secondary"
          }`}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className={`hover:underline ${
              isDark ? "text-dark-accent" : "text-light-accent"
            }`}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
