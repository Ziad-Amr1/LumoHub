// src/components/SearchSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import moviesData from "../data/moviesData.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef(null);

  // تحديث النتائج
  useEffect(() => {
    if (!searchQuery) return setResults([]);
    const filtered = moviesData
      .filter((m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 10);
    setResults(filtered);
    setShowDropdown(Boolean(filtered.length));
  }, [searchQuery]);

  // إغلاق الـ dropdown عند الضغط خارج أو scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleClickOutside);
    };
  }, []);

  // وظيفة لتقسيم النص وإضافة highlight
  const highlightText = (text) => {
    const index = text.toLowerCase().indexOf(searchQuery.toLowerCase());
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + searchQuery.length);
    const after = text.slice(index + searchQuery.length);

    return (
      <>
        {before}
        <span className="bg-yellow-400/40 rounded">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section className={`py-12 ${isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"}`}>
      <div className="max-w-4xl mx-auto relative" ref={containerRef}>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? "text-dark-text-secondary" : "text-light-text-secondary"}`} />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => results.length && setShowDropdown(true)}
            className={`pl-12 h-14 w-full rounded-xl border shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-300 text-base ${
              isDark
                ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
                : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
            }`}
          />
        </div>

        {/* Dropdown results with framer-motion */}
        <AnimatePresence>
          {showDropdown && results.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className={`absolute z-30 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border shadow-lg ${
                isDark ? "bg-dark-bg1 border-dark-bg2" : "bg-light-bg1 border-light-bg2"
              }`}
            >
              {results.map((movie) => (
                <li key={movie.id} className="p-3 hover:bg-gray-600 transition-colors cursor-pointer">
                  <Link to={`/movie/${movie.id}`} className="flex items-center gap-3">
                    <img src={movie.poster} alt={movie.title} className="w-10 h-14 object-cover rounded" />
                    <span>{highlightText(movie.title)}</span>
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
































// ================ Old SearchSection Component =================
// import React, { useState } from "react";
// import { Search, Filter } from "lucide-react";
// import { useTheme } from "../context/ThemeContext";
// import { Button } from "../components/ui/button";
// import {
// Select,
// SelectContent,
// SelectItem,
// SelectTrigger,
// SelectValue,
// } from "../components/ui/select";

// /**
//  * SearchSection component
//  * - Search bar with optional filters (genre, year, rating)
//  * - Supports dark/light theme
// * - update search query and filters
//  */
// export default function SearchSection({ onFiltersChange }) {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   // State for search input and filters
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedGenre, setSelectedGenre] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [selectedRating, setSelectedRating] = useState("");

//   // Filter options
//   const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];
//   const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018"];
//   const ratings = ["9+", "8+", "7+", "6+", "5+"];

//   // Handle search action
//   const handleSearch = () => {
//     const filters = { searchQuery, selectedGenre, selectedYear, selectedRating };
//     console.log("Search:", filters);
//     if (onFiltersChange) onFiltersChange(filters);
//   };

//   // Handle clearing filters
//   const clearFilters = () => {
//     setSelectedGenre("");
//     setSelectedYear("");
//     setSelectedRating("");
// setSearchQuery("");
//     if (onFiltersChange) {
//       onFiltersChange({
//         searchQuery: "",
//         selectedGenre: "",
//         selectedYear: "",
//         selectedRating: "",
//       });
//     }
//   };

//   return (
//     <section
// className={`py-12 transition-colors duration-300 ${
// isDark ? "bg-dark-bg2 text-dark-text" : "bg-light-bg2 text-light-text"
// }`}
// >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Title */}
//         <div className="text-center mb-8">
//           <h2
// className={`text-3xl font-bold mb-4 ${
// isDark ? "text-dark-primary" : "text-light-primary"
// }`}
// >
//             Find Your Next Favorite Movie
//           </h2>
//           <p
// className={`max-w-2xl mx-auto ${
// isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
// }`}
// >
//             Search through thousands of movies and discover something new to watch tonight.
//           </p>
//         </div>

//         <div className="max-w-4xl mx-auto">
//           {/* Search Bar */}
//           <div className="flex flex-col lg:flex-row gap-4 mb-6">
//             <div className="flex-1 relative">
//               <Search
// className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
// isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
// }`}
// />
//               <input
//                 type="text"
//                 placeholder="Search for movies..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                 className={`pl-10 h-12 w-full rounded-md border focus:outline-none focus:ring-2 text-base transition-colors duration-300
//                   ${
// isDark
//                     ? "bg-dark-bg1 text-dark-text border-dark-bg2 focus:ring-dark-primary"
//                     : "bg-light-bg1 text-light-text border-light-bg2 focus:ring-light-primary"
//                   }`}
//               />
//             </div>

//             <Button
//               className={`${
// isDark
// ? "bg-dark-primary text-dark-text hover:bg-dark-accent"
// : "bg-light-primary text-light-text hover:bg-light-accent"
// } flex items-center justify-center h-12 px-8`}
//               onClick={handleSearch}
//             >
//               <Search className="mr-2 h-5 w-5" /> Search
//             </Button>
//           </div>

//           {/* Filters */}
//           <div className="flex flex-col sm:flex-row gap-4 items-center">
//             <div
// className={`flex items-center gap-2 text-sm ${
// isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
// }`}
// >
//               <Filter className="h-4 w-4" />
//               <span>Filter by:</span>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               {/* Genre Filter */}
//               <Select
// value={selectedGenre}
// onValueChange={(val) => {
// setSelectedGenre(val);
//                   if (onFiltersChange)
//                     onFiltersChange({ searchQuery, selectedGenre: val, selectedYear, selectedRating });
//                 }}
// >
//                 <SelectTrigger className="w-full sm:w-[140px] h-11 rounded-md border focus:ring-2">
//                   <SelectValue placeholder="Genre" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   {genres.map((genre) => (
//                     <SelectItem key={genre} value={genre.toLowerCase()}>
// {genre}
// </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Year Filter */}
//               <Select
// value={selectedYear}
// onValueChange={(val) => {
// setSelectedYear(val);
//                   if (onFiltersChange)
//                     onFiltersChange({ searchQuery, selectedGenre, selectedYear: val, selectedRating });
//                 }}
// >
//                 <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
//                   <SelectValue placeholder="Year" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   {years.map((year) => (
//                     <SelectItem key={year} value={year}>
// {year}
// </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>

//               {/* Rating Filter */}
//               <Select
// value={selectedRating}
// onValueChange={(val) => {
// setSelectedRating(val);
//                   if (onFiltersChange)
//                     onFiltersChange({ searchQuery, selectedGenre, selectedYear, selectedRating: val });
//                 }}
// >
//                 <SelectTrigger className="w-full sm:w-[120px] h-11 rounded-md border focus:ring-2">
//                   <SelectValue placeholder="Rating" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   {ratings.map((rating) => (
//                     <SelectItem key={rating} value={rating}>
// {rating}
// </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Clear Filters Button */}
//             {(selectedGenre || selectedYear || selectedRating || searchQuery) && (
//               <Button
// variant="link"
// className={`${
// isDark ? "text-dark-accent" : "text-light-accent"
// } text-sm`}
// onClick={clearFilters}
// >
//                 Clear Filters
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
