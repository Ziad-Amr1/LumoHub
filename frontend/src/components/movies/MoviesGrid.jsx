import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import SearchSection from "../search-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import moviesData from "../../data/moviesData";


export default function MoviesGrid({ viewMode = "grid" }) {
  if (!moviesData || moviesData.length === 0) {
    return <p className="text-center text-muted-foreground">No movies found.</p>;
  }

  return (
{/*  Controls */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center gap-4">
        <div className="flex-1">
          <span className="text-sm text-dark-text-secondary">
            {movies.length} movies found
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="year">Newest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={handleOpenFilters}
            className="p-2 rounded-md hover:bg-dark-bg2/60 transition"
            title="Filters"
          >
            <Filter className="h-5 w-5 text-dark-text-secondary" />
          </button>

          <button
            onClick={cycleGridCols}
            className="p-2 rounded-md hover:bg-dark-bg2/60 transition"
            title={`Grid: ${gridCols} cols`}
          >
            <Columns className="h-5 w-5 text-dark-text-secondary" />
          </button>

          <div className="flex items-center rounded-md overflow-hidden border border-dark-bg2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid" ? "bg-dark-bg2" : "hover:bg-dark-bg2/60"
              } transition`}
              title="Grid view"
            >
              <Grid
                className={`h-4 w-4 ${
                  viewMode === "grid"
                    ? "text-dark-primary"
                    : "text-dark-text-secondary"
                }`}
              />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list" ? "bg-dark-bg2" : "hover:bg-dark-bg2/60"
              } transition`}
              title="List view"
            >
              <List
                className={`h-4 w-4 ${
                  viewMode === "list"
                    ? "text-dark-primary"
                    : "text-dark-text-secondary"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/*  Movies Grid / List */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        {viewMode === "grid" ? (
          <div className={gridClassMap[gridCols]}>
            {sortedMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="group relative bg-dark-bg2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center p-4">
                    <span className="px-4 py-2 bg-dark-primary text-dark-text rounded-md shadow-md text-sm font-medium">
                      View Details
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 bg-black/70 text-dark-text text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <Star className="h-3 w-3 fill-current text-dark-accent" />
                    {(movie.rating || 0).toFixed(1)}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-dark-text line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-dark-text-secondary">
                    {movie.releaseDate?.split("-")[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMovies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
  );
}

