// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, User, Search, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Context & hooks
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useScrollState } from "../hooks/useScrollState";
import { useMobileMenu } from "../hooks/useMobileMenu";

/**
 * Navbar component for the app
 * - Responsive with mobile & desktop menus
 * - Supports dark/light theme toggle
 * - Shows user avatar & menu
 * - Includes random movie navigation
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

  // -------------------------
  // Fetch popular movies
  // -------------------------
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

  // -------------------------
  // Navigate to a random movie
  // -------------------------
  const goToRandomMovie = () => {
    if (!movies.length) return;
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    navigate(`/movies/${randomMovie.id}`);
  };

  // -------------------------
  // Close user menu on outside click
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
  // Render JSX
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
        {/* Logo */}
        <Link
          to="/"
          className={`flex items-center gap-2 font-bold text-xl ${
            isDark ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          🎬 LumoHub
        </Link>

        {/* Desktop Links */}
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

        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          {/* Search button */}
          <button
            className={`p-2 rounded hidden sm:flex ${
              isDark ? "hover:bg-dark-bg1 text-dark-text" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Search size={20} />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded ${
              isDark ? "hover:bg-dark-bg1 text-dark-text" : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`p-2 rounded-full overflow-hidden border ${
                isDark ? "border-dark-text/30 hover:bg-dark-bg1" : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
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
                    isDark ? "bg-dark-bg2 text-dark-text" : "bg-white text-gray-800"
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

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded ${
              isDark ? "hover:bg-dark-bg1 text-dark-text" : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
