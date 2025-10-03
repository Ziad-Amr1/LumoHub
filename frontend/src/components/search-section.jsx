// src/components/SearchSection.jsx
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function SearchSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const ratings = ["9+", "8+", "7+", "6+", "5+"];

  const handleSearch = () => {
    console.log("Search:", { searchQuery, selectedGenre, selectedYear, selectedRating });
  };

  return (
    <section
      className={`py-12 transition-colors duration-300 ${
        isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2
            className={`text-3xl font-bold mb-4 ${
              isDark ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Find Your Next Favorite Movie
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          >
            Search through thousands of movies and discover something new to watch tonight.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
                }`}
              />
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={`pl-10 h-12 w-full rounded-md border focus:outline-none focus:ring-2 text-base transition-colors duration-300
                  ${
                    isDark
                      ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                      : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                  }`}
              />
            </div>
            <button
              onClick={handleSearch}
              className={`flex items-center justify-center h-12 px-8 rounded-md font-medium transition-colors duration-300
                ${
                  isDark
                    ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
                    : "bg-light-primary text-light-text hover:bg-light-accent"
                }`}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div
              className={`flex items-center gap-2 text-sm ${
                isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className={`w-full sm:w-[140px] h-11 rounded-md px-3 border focus:outline-none focus:ring-2 transition-colors duration-300
                  ${
                    isDark
                      ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                      : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                  }`}
              >
                <option value="">Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre.toLowerCase()}>
                    {genre}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className={`w-full sm:w-[120px] h-11 rounded-md px-3 border focus:outline-none focus:ring-2 transition-colors duration-300
                  ${
                    isDark
                      ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                      : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                  }`}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className={`w-full sm:w-[120px] h-11 rounded-md px-3 border focus:outline-none focus:ring-2 transition-colors duration-300
                  ${
                    isDark
                      ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                      : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                  }`}
              >
                <option value="">Rating</option>
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
            </div>

            {(selectedGenre || selectedYear || selectedRating) && (
              <button
                onClick={() => {
                  setSelectedGenre("");
                  setSelectedYear("");
                  setSelectedRating("");
                }}
                className={`text-sm hover:underline transition ${
                  isDark ? "text-dark-accent" : "text-light-accent"
                }`}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
