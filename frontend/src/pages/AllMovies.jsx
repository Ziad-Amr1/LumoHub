// src/pages/AllMovies.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Filter,
  Columns,
  MoreVertical,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import SearchSection from "../components/search-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // view / sort / grid density / dropdown state
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [sortBy, setSortBy] = useState("title");
  const [gridCols, setGridCols] = useState(6); // 4 | 5 | 6 for lg breakpoint
  const [moreOpen, setMoreOpen] = useState(false);

  const searchRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=${page}`
        );
        const data = await res.json();
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  // Scroll to search/filters section (used by Filter button)
  const handleOpenFilters = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cycle grid density 4 -> 5 -> 6 -> 4 ...
  const cycleGridCols = () => {
    setGridCols((prev) => {
      if (prev === 6) return 4;
      if (prev === 4) return 5;
      return 6;
    });
  };

  // Map gridCols to actual tailwind classes (be explicit so tailwind doesn't purge)
  const gridClassMap = {
    4: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8",
    5: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8",
    6: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8",
  };

  // Sorting local copy
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return (
          parseInt(b.release_date?.split("-")[0] || "0", 10) -
          parseInt(a.release_date?.split("-")[0] || "0", 10)
        );
      case "rating":
        return (b.vote_average || 0) - (a.vote_average || 0);
      default:
        return 0;
    }
  });

  const MovieListItem = ({ movie }) => (
    <div className="flex gap-4 p-4 bg-dark-bg2 rounded-lg hover:bg-dark-bg2/80 transition-colors">
      <div className="w-24 h-36 flex-shrink-0">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.svg"
          }
          alt={movie.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-dark-text mb-2">{movie.title}</h3>
        <div className="flex items-center gap-4 text-sm text-dark-text-secondary mb-2">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span className="flex items-center gap-1">
            <span className="text-dark-accent">★</span>
            {(movie.vote_average || 0).toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-dark-text-secondary line-clamp-2">{movie.overview}</p>
      </div>
    </div>
  );

  if (loading) {
    return <p className="text-center py-10 text-dark-text-secondary">Loading movies...</p>;
  }

  return (
    <section className="bg-dark-bg1 text-dark-text min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-dark-bg2 to-dark-bg1 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 w-full">
          {movies[0] && (
            <Card className="overflow-hidden rounded-2xl shadow-2xl w-full md:w-1/3 relative">
              <img
                src={
                  movies[0].poster_path
                    ? `https://image.tmdb.org/t/p/w500${movies[0].poster_path}`
                    : "/placeholder.svg"
                }
                alt={movies[0].title}
                className="w-full h-[650px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </Card>
          )}

          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-dark-primary">
              {movies[0]?.title}
            </h1>
            <p className="text-lg md:text-xl text-dark-text-secondary mb-8 max-w-2xl line-clamp-5">
              {movies[0]?.overview}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <span className="flex items-center gap-2 text-dark-accent font-semibold text-lg">
                <Star className="h-6 w-6 fill-current" />
                {(movies[0]?.vote_average || 0).toFixed(1)}
              </span>
              <span className="text-dark-text-secondary text-lg">
                {movies[0]?.release_date?.split("-")[0]}
              </span>
            </div>
            <div className="flex gap-6">
              <Button
                asChild
                size="lg"
                className="bg-dark-primary text-dark-text text-lg px-6 py-4 hover:opacity-90"
              >
                <Link to={`/movies/${movies[0]?.id}`}>🎬 Watch Now</Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="text-lg px-6 py-4 border-dark-text-secondary text-dark-text-secondary hover:text-dark-text hover:border-dark-text"
              >
                <Link to="/all-movies">Browse More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div ref={searchRef}>
        <SearchSection />
      </div>

      {/* Controls (count | sort | icons right) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 flex items-center gap-4">
        {/* left: results count */}
        <div className="flex-1">
          <span className="text-sm text-dark-text-secondary">
            {movies.length} movies found
          </span>
        </div>

        {/* middle: sort (kept small) */}
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

        {/* right: icon controls */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Filter button - scrolls to SearchSection */}
          <button
            aria-label="Open filters"
            onClick={handleOpenFilters}
            className="p-2 rounded-md hover:bg-dark-bg2/60 transition"
            title="Filters"
          >
            <Filter className="h-5 w-5 text-dark-text-secondary" />
          </button>

          {/* Columns / density toggle */}
          <button
            aria-label="Change grid density"
            onClick={cycleGridCols}
            className="p-2 rounded-md hover:bg-dark-bg2/60 transition"
            title={`Grid: ${gridCols} cols`}
          >
            <Columns className="h-5 w-5 text-dark-text-secondary" />
          </button>

          {/* View toggle (grid / list) */}
          <div className="flex items-center rounded-md overflow-hidden border border-dark-bg2">
            <button
              aria-label="Grid view"
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "bg-dark-bg2" : "hover:bg-dark-bg2/60"} transition`}
              title="Grid view"
            >
              <Grid className={`h-4 w-4 ${viewMode === "grid" ? "text-dark-primary" : "text-dark-text-secondary"}`} />
            </button>
            <button
              aria-label="List view"
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "bg-dark-bg2" : "hover:bg-dark-bg2/60"} transition`}
              title="List view"
            >
              <List className={`h-4 w-4 ${viewMode === "list" ? "text-dark-primary" : "text-dark-text-secondary"}`} />
            </button>
          </div>

          {/* More (dropdown) */}
          <div className="relative">
            <button
              aria-haspopup="true"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-dark-bg2/60 transition"
              title="More"
            >
              <MoreVertical className="h-5 w-5 text-dark-text-secondary" />
            </button>

            {moreOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-bg2 border border-dark-bg1 rounded-md shadow-lg z-40">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-dark-bg1 transition"
                  onClick={() => {
                    setMoreOpen(false);
                    // example action: export list (implement)
                    alert("Exporting movies... (implement your export)");
                  }}
                >
                  Export list
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-dark-bg1 transition"
                  onClick={() => {
                    setMoreOpen(false);
                    // example action: open settings
                    alert("Open settings (implement)");
                  }}
                >
                  Settings
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid / List */}
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
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.svg"
                    }
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
                    {(movie.vote_average || 0).toFixed(1)}
                  </span>
                </div>

                <div className="p-4">
                  <h3 className="text-base font-semibold text-dark-text line-clamp-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-dark-text-secondary">
                    {movie.release_date?.split("-")[0]}
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

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-dark-bg2 text-dark-text hover:bg-dark-primary/70 rounded-lg"
          >
            <ChevronLeft className="h-4 w-4 mr-2" /> Previous
          </Button>

          <span className="text-dark-text-secondary">
            Page {page} of {totalPages}
          </span>

          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-dark-bg2 text-dark-text hover:bg-dark-primary/70 rounded-lg"
          >
            Next <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
