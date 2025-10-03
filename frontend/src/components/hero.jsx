// src/components/HeroSection.jsx
import React from "react";
import { Play, Plus } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      className={`relative h-screen flex items-end justify-center sm:justify-start overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-dark-bg1 text-dark-text" : "bg-light-bg1 text-light-text"
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/dark-knight-movie-backdrop.jpg"
          alt="Featured Movie Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradients */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-r from-dark-bg1/95 via-dark-bg1/70 to-transparent"
              : "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
          }`}
        />
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-t from-dark-bg1 via-transparent to-transparent"
              : "bg-gradient-to-t from-black/80 via-transparent to-transparent"
          }`}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pb-10 sm:pb-16 lg:pb-20 w-full">
        <motion.div
          className="max-w-2xl mx-auto sm:mx-0 text-center sm:text-left"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.25 },
            },
          }}
        >
          {/* Title */}
          <motion.h1
            variants={fadeUp}
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${
              isDark ? "text-dark-primary" : "text-dark-primary"
            }`}
          >
            The Dark Knight
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className={`text-base sm:text-lg md:text-xl mb-6 leading-relaxed ${
              isDark ? "text-dark-text-secondary" : "text-dark-text-secondary"
            }`}
          >
            When the menace known as the Joker wreaks havoc and chaos on the
            people of Gotham, Batman must accept one of the greatest
            psychological and physical tests of his ability to fight injustice.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
          >
            <button
              className={`flex items-center justify-center px-6 py-3 rounded-xl font-semibold shadow-md transition transform hover:scale-105 ${
                isDark
                  ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
                  : "bg-dark-primary text-white hover:bg-light-accent"
              }`}
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Now
            </button>
            <button
              className={`flex items-center justify-center px-6 py-3 rounded-xl border shadow-sm transition hover:scale-105 ${
                isDark
                  ? "border-dark-text-secondary text-dark-text hover:bg-dark-bg2"
                  : "border-dark-text-secondary text-white hover:bg-light-bg2/70"
              }`}
            >
              <Plus className="mr-2 h-5 w-5" />
              Add to Watchlist
            </button>
          </motion.div>

          {/* Extra Info */}
          <motion.div
            variants={fadeUp}
            className={`flex flex-wrap justify-center sm:justify-start gap-6 mt-6 text-sm ${
              isDark ? "text-dark-text-secondary" : "text-dark-text-secondary"
            }`}
          >
            <span className="flex items-center gap-2">
              <span
                className={`font-bold ${
                  isDark ? "text-dark-primary" : "text-light-primary"
                }`}
              >
                9.0
              </span>
              IMDb Rating
            </span>
            <span>2008</span>
            <span>152 min</span>
            <span>Action, Crime, Drama</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
