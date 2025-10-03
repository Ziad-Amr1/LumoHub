// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, User, Search, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useScrollState } from "../hooks/useScrollState";
import { useMobileMenu } from "../hooks/useMobileMenu";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const links = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "#" },
  { name: "Categories", href: "#" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const scrolled = useScrollState();
  const { open, toggle, close } = useMobileMenu();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // ✅ اغلاق المنيو عند الضغط خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          🎬 MovieHub
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className={`relative transition-colors ${
                  isDark
                    ? "text-dark-text hover:text-dark-primary"
                    : "text-gray-800 hover:text-light-primary"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4 relative">
          <button
            className={`p-2 rounded hidden sm:flex ${
              isDark
                ? "hover:bg-dark-bg1 text-dark-text"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Search size={20} />
          </button>

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

          {/* User Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`p-2 rounded-full overflow-hidden border ${
                isDark
                  ? "border-dark-text/30 hover:bg-dark-bg1"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {user && user.avatar ? (
                <img
                  src={user.avatar}
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

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 rounded ${
              isDark
                ? "hover:bg-dark-bg1 text-dark-text"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            onClick={toggle}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
