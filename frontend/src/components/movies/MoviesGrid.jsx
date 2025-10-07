// src/components/movies/MoviesGrid.jsx
import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useMoviesContext } from "../../context/MoviesContext";
import { Card } from "../ui/card";

export default function MoviesGrid() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const {
    paginatedMovies,
    filteredMovies,
    viewMode,
    gridCols,
    loading,
  } = useMoviesContext();

  if (loading) {
    return (
      <p
        className={`text-center py-12 ${
          isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
        }`}
      >
        Loading movies...
      </p>
    );
  }

  if (!filteredMovies.length) {
    return (
      <p
        className={`text-center py-12 ${
          isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
        }`}
      >
        No movies found.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 transition-all duration-300">
      {viewMode === "grid" ? (
        <div
          className={`grid gap-6 transition-all duration-300 ${
            gridCols === 4
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : gridCols === 5
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
              : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
          }`}
        >
          {paginatedMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link
                to={`/movies/${movie.id}`}
                className={`group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ${
                  isDark ? "bg-dark-bg2" : "bg-light-bg2"
                }`}
              >
                {/* 🎞️ Poster */}
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-4">
                    <span
                      className={`px-4 py-2 text-sm font-medium rounded-md shadow ${
                        isDark
                          ? "bg-dark-primary text-dark-text"
                          : "bg-light-primary text-light-text"
                      }`}
                    >
                      View Details
                    </span>
                  </div>

                  {/* ⭐ Rating */}
                  <span
                    className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-md flex items-center gap-1 ${
                      isDark
                        ? "bg-black/70 text-dark-text"
                        : "bg-white/80 text-light-text"
                    }`}
                  >
                    <Star
                      className={`h-3 w-3 ${
                        isDark ? "text-yellow-400" : "text-yellow-500"
                      }`}
                      fill="currentColor"
                    />
                    {(movie.rating || 0).toFixed(1)}
                  </span>
                </div>

                {/* 🎬 Info */}
                <div className="p-4">
                  <h3
                    className={`text-base font-semibold line-clamp-1 ${
                      isDark ? "text-dark-text" : "text-light-text"
                    }`}
                  >
                    {movie.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDark
                        ? "text-dark-text-secondary"
                        : "text-light-text-secondary"
                    }`}
                  >
                    {movie.releaseDate?.split("-")[0] || "Unknown Year"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 transition-all duration-300">
          {paginatedMovies.map((movie) => (
            <MovieListItem key={movie.id} movie={movie} isDark={isDark} />
          ))}
        </div>
      )}
    </div>
  );
}

// ✅ Reusable List Item (for list view)
function MovieListItem({ movie, isDark }) {
  return (
    <Card
      className={`flex items-center gap-4 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition ${
        isDark ? "bg-dark-bg2" : "bg-light-bg2"
      }`}
    >
<Link
  to={`/movies/${movie.id}`}
  className={`group relative block rounded-xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
    isDark ? "bg-dark-bg2" : "bg-light-bg2"
  }`}
>
  {/* 🎞️ Movie Poster */}
  <div className="relative w-full h-80 overflow-hidden">
    <img
      src={movie.poster || "/placeholder.svg"}
      alt={movie.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />

    {/* 🩶 Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center p-4">
      <span
        className={`px-4 py-2 text-sm font-semibold rounded-lg shadow ${
          isDark
            ? "bg-dark-primary text-dark-text"
            : "bg-light-primary text-light-text"
        }`}
      >
        View Details
      </span>
    </div>

    {/* ⭐ Rating badge */}
    <span
      className={`absolute top-3 left-3 text-xs px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-sm ${
        isDark
          ? "bg-black/70 text-dark-text"
          : "bg-white/80 text-light-text"
      }`}
    >
      <Star
        className={`h-3 w-3 ${
          isDark ? "text-yellow-400" : "text-yellow-500"
        }`}
        fill="currentColor"
      />
      {(movie.rating || 0).toFixed(1)}
    </span>
  </div>

  {/* 🎬 Movie Info */}
  <div className="p-4">
    <h3
      className={`text-base font-semibold mb-1 line-clamp-1 ${
        isDark ? "text-dark-text" : "text-light-text"
      }`}
    >
      {movie.title}
    </h3>
    <div className="flex items-center justify-between text-sm">
      <span
        className={`${
          isDark
            ? "text-dark-text-secondary"
            : "text-light-text-secondary"
        }`}
      >
        {movie.releaseDate?.split("-")[0] || "Unknown"}
      </span>
      <span
        className={`px-2 py-1 rounded-md text-xs font-medium ${
          isDark
            ? "bg-dark-bg text-dark-text-secondary"
            : "bg-light-bg text-light-text-secondary"
        }`}
      >
        {movie.genres?.[0] || "Drama"}
      </span>
    </div>
  </div>
</Link>

    </Card>
  );
}
