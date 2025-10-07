import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useMoviesContext } from "../../context/MoviesContext";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function MoviesFilterBar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { filters, setFilters, movies } = useMoviesContext();
  const [localSearch, setLocalSearch] = useState(filters.searchQuery || "");
  const [isGenresOpen, setIsGenresOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");
  const dropdownRef = useRef(null);

  const { genres, years, ratings } = useMemo(() => {
    const allGenres = new Set();
    const allYears = new Set();
    const allRatings = new Set();

    movies.forEach((movie) => {
      movie.genres?.forEach((g) => allGenres.add(g.trim()));
      const year = movie.releaseDate?.split("-")[0];
      if (year) allYears.add(year);
      if (movie.rating) allRatings.add(Math.floor(movie.rating));
    });

    return {
      genres: Array.from(allGenres).sort(),
      years: Array.from(allYears).sort((a, b) => b - a),
      ratings: Array.from(allRatings)
        .filter((r) => r >= 5)
        .sort((a, b) => b - a)
        .map((r) => `${r}+`),
    };
  }, [movies]);

  const handleSearch = () => {
    setFilters({
      ...filters,
      searchQuery: localSearch,
    });
  };

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      selectedGenres: [],
      selectedYear: "",
      selectedRating: "",
    });
    setLocalSearch("");
    setGenreSearch("");
  };

  const toggleGenre = (genre) => {
    const lower = genre.toLowerCase();
    const isSelected = filters.selectedGenres.includes(lower);
    const updated = isSelected
      ? filters.selectedGenres.filter((g) => g !== lower)
      : [...filters.selectedGenres, lower];
    setFilters({ ...filters, selectedGenres: updated });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsGenresOpen(false);
        setGenreSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter genres for search
  const displayedGenres = genres.filter((g) =>
    g.toLowerCase().includes(genreSearch.toLowerCase())
  );

  return (
    <section
      className={`w-full py-16 transition-colors duration-300 relative z-10 ${
        isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2
            className={`text-3xl font-bold mb-3 ${
              isDark ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            Find Your Next Favorite Movie
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              isDark
                ? "text-dark-text-secondary"
                : "text-light-text-secondary"
            }`}
          >
            Search through thousands of movies and discover something new to watch tonight.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                  isDark
                    ? "text-dark-text-secondary"
                    : "text-light-text-secondary"
                }`}
              />
              <input
                type="text"
                placeholder="Search for movies..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className={`pl-10 h-12 w-full rounded-md border focus:outline-none focus:ring-2 text-base transition-colors duration-300 ${
                  isDark
                    ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                    : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
                }`}
              />
            </div>

            <Button
              className={`${
                isDark
                  ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
                  : "bg-light-primary text-light-text hover:bg-light-accent"
              } flex items-center justify-center h-12 px-8`}
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center"
          >
            <div
              className={`flex items-center gap-2 text-sm ${
                isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            >
              <Filter className="h-4 w-4" />
              <span>Filter by:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-1 items-start sm:items-center">
            {/* Genres Dropdown */}
            <div className="relative w-full sm:w-[220px]" ref={dropdownRef}>
            <Button
                variant="outline"
                className={`w-full justify-between h-11 ${
                isDark
                    ? "bg-dark-bg1 border-dark-bg2 text-dark-text"
                    : "bg-light-bg1 border-light-bg2 text-light-text"
                }`}
                onClick={() => setIsGenresOpen((prev) => !prev)}
            >
                {filters.selectedGenres.length > 0
                ? `${filters.selectedGenres.length} selected`
                : "Select Genres"}
                <ChevronDown
                className={`h-4 w-4 ml-2 transition-transform ${
                    isGenresOpen ? "rotate-180" : ""
                }`}
                />
            </Button>

            {isGenresOpen && (
                <div
                className={`absolute top-12 left-0 w-full rounded-md shadow-lg max-h-80 overflow-y-auto z-50 border scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb ${
                    isDark
                    ? "bg-dark-bg1 border-dark-bg2 scrollbar-thumb-dark-primary scrollbar-track-dark-bg2"
                    : "bg-light-bg1 border-light-bg2 scrollbar-thumb-light-primary scrollbar-track-light-bg2"
                }`}
                style={{ maxHeight: "80vh", minWidth: "220px", scrollbarWidth: "thin" }}
                >
                {/* Search inside dropdown */}
                <input
                    type="text"
                    placeholder="Search genres..."
                    value={genreSearch}
                    onChange={(e) => setGenreSearch(e.target.value)}
                    className={`w-full px-3 py-2 border-b focus:outline-none focus:ring-1 rounded-t-md ${
                    isDark
                        ? "bg-dark-bg1 border-dark-bg2 text-dark-text focus:ring-dark-primary"
                        : "bg-light-bg1 border-light-bg2 text-light-text focus:ring-light-primary"
                    }`}
                />

                <div className="grid grid-cols-2 gap-1 p-2">
                    {displayedGenres.map((g) => {
                    const selected = filters.selectedGenres.includes(g.toLowerCase());
                    return (
                        <div
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={`px-2 py-1 text-sm cursor-pointer flex items-center justify-between rounded-md transition-colors duration-200 ${
                            selected
                            ? isDark
                                ? "bg-dark-primary/60 text-dark-text"
                                : "bg-light-primary/60 text-light-text"
                            : isDark
                            ? "hover:bg-dark-bg2 text-dark-text-secondary"
                            : "hover:bg-light-bg2 text-light-text-secondary"
                        }`}
                        >
                        <span style={{userSelect: "none"}} className="truncate">{g}</span>
                        {selected && <Check className="h-4 w-4 opacity-80" />}
                        </div>
                    );
                    })}
                </div>
                </div>
            )}
            </div>


              {/* Year & Rating */}
              <div className="flex gap-2 w-full sm:w-auto">
                <Select
                  value={filters.selectedYear}
                  onValueChange={(val) =>
                    setFilters({ ...filters, selectedYear: val })
                  }
                >
                  <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={filters.selectedRating}
                  onValueChange={(val) =>
                    setFilters({ ...filters, selectedRating: val })
                  }
                >
                  <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {ratings.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Clear Button */}
            {(filters.selectedGenres.length > 0 ||
              filters.selectedYear ||
              filters.selectedRating ||
              filters.searchQuery) && (
              <Button
                variant="link"
                className={`${
                  isDark ? "text-dark-accent" : "text-light-accent"
                } text-sm`}
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
