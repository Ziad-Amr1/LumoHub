// src/components/movies/MoviesControls.jsx
import React from "react"
import { LayoutGrid, List, ArrowUpDown, Grid3x3, Columns, } from "lucide-react"
import { useTheme } from "../../context/ThemeContext"
import { useMoviesContext } from "../../context/MoviesContext"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export default function MoviesControls() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const {
    viewMode,
    setViewMode,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    gridCols,
    cycleGridCols,
    filteredMovies,
  } = useMoviesContext()

  // 🔁 تبديل ترتيب الفرز
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  return (
    <div
      className={`max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
        isDark ? "text-dark-text" : "text-light-text"
      }`}
    >
      {/* ✅ عدد النتائج */}
      <div className="flex-1 text-sm">
        <span
          className={`${
            isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
          }`}
        >
          🎞 {filteredMovies.length} movies found
        </span>
      </div>

      {/* ✅ قسم الفرز */}
      <div className="flex items-center gap-2">
        <span
          className={`text-sm ${
            isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
          }`}
        >
          Sort by:
        </span>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger
            className={`w-[150px] h-10 text-sm ${
              isDark
                ? "bg-dark-bg1 border-dark-bg2"
                : "bg-light-bg1 border-light-bg2"
            }`}
          >
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSortOrder}
          title="Toggle sort order"
          className={`rounded-md ${
            isDark ? "hover:bg-dark-bg2/60" : "hover:bg-light-bg2/60"
          }`}
        >
          <ArrowUpDown
            className={`h-4 w-4 ${
              sortOrder === "asc"
                ? isDark
                  ? "text-dark-accent"
                  : "text-light-primary"
                : isDark
                ? "text-dark-primary"
                : "text-light-accent"
            }`}
          />
        </Button>
      </div>

      {/* ✅ قسم التحكم في العرض */}
      <div className="flex items-center gap-2 ml-auto">
        {/* 🔘 تبديل الأعمدة */}
        <Button
          variant="ghost"
          size="icon"
          onClick={cycleGridCols}
          title="Change grid columns"
          className={`rounded-md ${
            isDark ? "hover:bg-dark-bg2/60" : "hover:bg-light-bg2/60"
          }`}
        >
          <Columns
            className={`h-5 w-5 ${
              isDark ? "text-dark-text-secondary" : "text-light-text-secondary"
            }`}
          />
        </Button>

        {/* 🔘 تبديل وضع العرض */}
        <div
          className={`flex items-center rounded-md overflow-hidden border ${
            isDark ? "border-dark-bg2" : "border-light-bg2"
          }`}
        >
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 transition ${
              viewMode === "grid"
                ? isDark
                  ? "bg-dark-bg2"
                  : "bg-light-bg2"
                : "hover:bg-dark-bg2/50"
            }`}
            title="Grid view"
          >
            <LayoutGrid
              className={`h-4 w-4 ${
                viewMode === "grid"
                  ? isDark
                    ? "text-dark-primary"
                    : "text-light-primary"
                  : isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 transition ${
              viewMode === "list"
                ? isDark
                  ? "bg-dark-bg2"
                  : "bg-light-bg2"
                : "hover:bg-dark-bg2/50"
            }`}
            title="List view"
          >
            <List
              className={`h-4 w-4 ${
                viewMode === "list"
                  ? isDark
                    ? "text-dark-primary"
                    : "text-light-primary"
                  : isDark
                  ? "text-dark-text-secondary"
                  : "text-light-text-secondary"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
