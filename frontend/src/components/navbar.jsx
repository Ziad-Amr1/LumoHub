// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, User, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// 🟢 استخدام الداتا المحلية بدل API
import moviesData from "../data/moviesData.jsx";

// Context & hooks
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useScrollState } from "../hooks/useScrollState";
import { useMobileMenu } from "../hooks/useMobileMenu";
import { useProfile } from "../context/ProfileContext.jsx"

/**
 * Navbar component for the app
 * - Responsive with mobile & desktop menus
 * - Supports dark/light theme toggle
 * - Shows user avatar & menu
 * - Includes random movie navigation (محلي مؤقتًا)
 */
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const { user, logout } = useAuth();
  const scrolled = useScrollState();
  const { open: mobileOpen, toggle: toggleMobileMenu } = useMobileMenu();

  const [menuOpen, setMenuOpen] = useState(false); // user menu state
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const { profile } = useProfile();

  // ------------------------------------
  // 🟢 بديل مؤقت: تحميل الأفلام من ملف محلي
  // ------------------------------------
  useEffect(() => {
    setMovies(moviesData);
  }, []);

  // ------------------------------------
  // ❌ الجزء الأصلي (تم تعليقه مؤقتًا)
  // ------------------------------------
  /*
  useEffect(() => {
    async function fetchMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);
  */

  // -------------------------
  // 🟣 الانتقال لفيلم عشوائي
  // -------------------------
  const goToRandomMovie = () => {
    if (!movies.length) return;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    navigate(`/movies/${randomMovie.id}`);
  };

  // -------------------------
  // إغلاق منيو المستخدم عند الضغط بالخارج
  // -------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // -------------------------
  // JSX Rendering
  // -------------------------
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? isDark
            ? "bg-dark-bg2/80 shadow-md backdrop-blur"
            : "bg-white/90 shadow-md backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* شعار الموقع */}
        <Link
          to="/"
          className={`flex items-center gap-2 font-bold text-xl ${
            isDark ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          🎬 LumoHub
        </Link>

        {/* روابط سطح المكتب */}
        <ul className="hidden md:flex gap-8 font-medium">
          {["Home", "Movies"].map((text) => (
            <li key={text}>
              <Link
                to={text === "Home" ? "/" : "/movies"}
                className={`relative transition-colors ${
                  isDark
                    ? "text-dark-text hover:text-dark-primary"
                    : "text-gray-800 hover:text-light-primary"
                }`}
              >
                {text}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={goToRandomMovie}
              className={`relative transition-colors ${
                isDark
                  ? "text-dark-text hover:text-dark-primary"
                  : "text-gray-800 hover:text-light-primary"
              }`}
            >
              Random
            </button>
          </li>
        </ul>

        {/* عناصر التحكم */}
        <div className="flex items-center gap-4 relative">
          {/* بحث */}
          <button
            className={`p-2 rounded hidden sm:flex ${
              isDark
                ? "hover:bg-dark-bg1 text-dark-text"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Search size={20} />
          </button>

          {/* Toggle Theme */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              isDark
                ? "hover:bg-dark-bg1 text-dark-text"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Profile Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`p-2 rounded-full overflow-hidden border ${
                isDark
                  ? "border-dark-text/30 hover:bg-dark-bg1"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {user && profile?.avatar ? (
                <img
                  src={profile.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User size={20} />
              )}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${
                    isDark
                      ? "bg-dark-bg2 text-dark-text"
                      : "bg-white text-gray-800"
                  }`}
                >
                  <ul className="flex flex-col">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setMenuOpen(false)}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg1"
                        >
                          Profile
                        </Link>
                        <button
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-dark-bg1"
                        >
                          <LogOut size={18} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setMenuOpen(false)}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg1"
                        >
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          onClick={() => setMenuOpen(false)}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-dark-bg1"
                        >
                          Create Account
                        </Link>
                      </>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* قائمة الهاتف */}
          <button
            className={`md:hidden p-2 rounded ${
              isDark
                ? "hover:bg-dark-bg1 text-dark-text"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-dark-bg2 shadow-md md:hidden"
            >
              <ul className="flex flex-col p-4 gap-2">
                <li>
                  <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                </li>
                <li>
                  <Link to="/movies" onClick={toggleMobileMenu}>Movies</Link>
                </li>
                <li>
                  <button onClick={() => { goToRandomMovie(); toggleMobileMenu(); }}>Random</button>
                </li>
                {user ? (
                  <>
                    <li>
                      <Link to="/profile" onClick={toggleMobileMenu}>Profile</Link>
                    </li>
                    <li>
                      <button onClick={() => { logout(); toggleMobileMenu(); }}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login" onClick={toggleMobileMenu}>Log in</Link>
                    </li>
                    <li>
                      <Link to="/signup" onClick={toggleMobileMenu}>Create Account</Link>
                    </li>
                  </>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </div>
    </nav>
  );
}
