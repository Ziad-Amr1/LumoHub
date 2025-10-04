// src/components/SearchSection.jsx
import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";

/**
 * SearchSection component
 * - Search bar with optional filters (genre, year, rating)
 * - Supports dark/light theme
 */
export default function SearchSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State for search input and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  // Filter options
  const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
  const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
  const ratings = ["9+", "8+", "7+", "6+", "5+"];

  // Handle search action
  const handleSearch = () => {
    console.log("Search:", { searchQuery, selectedGenre, selectedYear, selectedRating });
  };

  // Handle clearing filters
  const clearFilters = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedRating("");
  };

  return (
    <section className={`py-12 transition-colors duration-300 ${isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold mb-4 ${isDark ? "text-dark-primary" : "text-light-primary"}`}>
            Find Your Next Favorite Movie
          </h2>
          <p className={`max-w-2xl mx-auto ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
            Search through thousands of movies and discover something new to watch tonight.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`} />
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={`pl-10 h-12 w-full rounded-md border focus:outline-none focus:ring-2 text-base transition-colors duration-300
                  ${isDark
                    ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                    : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                  }`}
              />
            </div>

            <Button
              className={`${isDark ? "bg-dark-primary text-dark-text hover:bg-dark-accent" : "bg-light-primary text-light-text hover:bg-light-accent"} flex items-center justify-center h-12 px-8`}
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className={`flex items-center gap-2 text-sm ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`}>
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Genre Filter */}
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full sm:w-[140px] h-11 rounded-md border focus:ring-2">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {genres.map((genre) => (
                    <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Rating Filter */}
              <Select value={selectedRating} onValueChange={setSelectedRating}>
                <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {ratings.map((rating) => (
                    <SelectItem key={rating} value={rating}>{rating}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {(selectedGenre || selectedYear || selectedRating) && (
              <Button variant="link" className={`${isDark ? "text-dark-accent" : "text-light-accent"} text-sm`} onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
