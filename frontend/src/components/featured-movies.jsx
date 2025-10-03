// src/components/FeaturedMovies.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// مثال: تقدر تستبدله بأي API حقيقي
async function fetchFeaturedMovies() {
  return {
    featured: [
      {
        id: "1",
        title: "The Dark Knight",
        year: "2008",
        genre: "Action, Crime, Drama",
        rating: 9.0,
        posterUrl: "/dark-knight-movie-poster.jpg",
        backdropUrl: "/dark-knight-movie-backdrop.jpg",
      },
      {
        id: "2",
        title: "Inception",
        year: "2010",
        genre: "Action, Sci-Fi, Thriller",
        rating: 8.8,
        posterUrl: "/inception-movie-poster.jpg",
        backdropUrl: "/inception-movie-backdrop.jpg",
      },
    ],
  };
}

export default function FeaturedMovies() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        const data = await fetchFeaturedMovies();
        setFeaturedMovies(data.featured || []);
      } catch (error) {
        console.error("Failed to load featured movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovies();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  if (loading) {
    return (
      <section
        className={`py-16 transition-colors duration-300 ${
          isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div
              className={`h-8 rounded w-64 mb-8 ${
                isDark ? "bg-dark-bg1" : "bg-light-bg1"
              }`}
            ></div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-[2/3] rounded-lg ${
                    isDark ? "bg-dark-bg1" : "bg-light-bg1"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`py-16 transition-colors duration-300 ${
        isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`text-3xl font-bold ${
              isDark ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Featured Movies
          </h2>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={featuredMovies.length <= 1}
              className={`p-2 rounded-md border transition-colors duration-300 disabled:opacity-50
                ${
                  isDark
                    ? "border-dark-bg1 hover:bg-dark-bg1"
                    : "border-light-bg1 hover:bg-light-bg1"
                }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={featuredMovies.length <= 1}
              className={`p-2 rounded-md border transition-colors duration-300 disabled:opacity-50
                ${
                  isDark
                    ? "border-dark-bg1 hover:bg-dark-bg1"
                    : "border-light-bg1 hover:bg-light-bg1"
                }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Slider */}
        {featuredMovies.length > 0 && (
          <div className="relative overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredMovies.map((movie) => (
                <div key={movie.id} className="w-full flex-shrink-0">
                  <div className="relative h-[60vh] rounded-xl overflow-hidden">
                    {/* backdrop */}
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`,
                      }}
                    />
                    {/* gradients */}
                    <div
                      className={`absolute inset-0 ${
                        isDark
                          ? "bg-gradient-to-r from-dark-bg2/90 via-dark-bg2/30 to-transparent"
                          : "bg-gradient-to-r from-light-bg2/90 via-light-bg2/30 to-transparent"
                      }`}
                    />
                    <div
                      className={`absolute inset-0 ${
                        isDark
                          ? "bg-gradient-to-t from-dark-bg2 via-transparent to-transparent"
                          : "bg-gradient-to-t from-light-bg2 via-transparent to-transparent"
                      }`}
                    />

                    {/* content */}
                    <div className="absolute bottom-8 left-8 max-w-md">
                      <h3
                        className={`text-4xl font-bold mb-2 ${
                          isDark ? "text-dark-primary" : "text-light-primary"
                        }`}
                      >
                        {movie.title}
                      </h3>
                      <div
                        className={`flex items-center gap-4 mb-4 ${
                          isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
                        }`}
                      >
                        <span
                          className={`font-semibold ${
                            isDark ? "text-dark-primary" : "text-light-primary"
                          }`}
                        >
                          {movie.rating}
                        </span>
                        <span>{movie.year}</span>
                        <span>{movie.genre}</span>
                      </div>
                      <button
                        className={`px-6 py-3 rounded-md font-medium transition-colors duration-300
                          ${
                            isDark
                              ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
                              : "bg-light-primary text-light-text hover:bg-light-accent"
                          }`}
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
