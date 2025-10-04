import React, { useEffect, useRef, useState } from "react";
import {
  Star,
  Grid,
  List,
  Filter,
  Columns,
  ChevronLeft,
  ChevronRight,
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
import moviesData from "../data/moviesData.jsx";

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("title");
  const [gridCols, setGridCols] = useState(6);
  const [page, setPage] = useState(1);             
  const [moviesPerPage] = useState(12);            
  const searchRef = useRef(null);

  const [filters, setFilters] = useState({
    searchQuery: "",
    selectedGenre: "",
    selectedYear: "",
    selectedRating: "",
  });

  //  Fetch movies (simulated with local data here)
  useEffect(() => {
    setLoading(true);
    try {
      setMovies(moviesData);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOpenFilters = () => {
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const cycleGridCols = () => {
    setGridCols((prev) => {
      if (prev === 6) return 4;
      if (prev === 4) return 5;
      return 6;
    });
  };

  const gridClassMap = {
    4: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-8",
    5: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8",
    6: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8",
  };

  // rendering sorted movies
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "year":
        return (
          parseInt(b.releaseDate?.split("-")[0] || "0", 10) -
          parseInt(a.releaseDate?.split("-")[0] || "0", 10)
        );
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  // filtering based on search and filters
  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const paginatedMovies = sortedMovies.slice(startIndex, endIndex);

  // Movie List Item Component
  const MovieListItem = ({ movie }) => (
    <div className="flex gap-4 p-4 bg-dark-bg2 rounded-lg hover:bg-dark-bg2/80 transition-colors">
      <div className="w-24 h-36 flex-shrink-0">
        <img
          src={movie.poster || "/placeholder.svg"}
          alt={movie.title}
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-dark-text mb-2">
          {movie.title}
        </h3>
        <div className="flex items-center gap-4 text-sm text-dark-text-secondary mb-2">
          <span>{movie.releaseDate?.split("-")[0]}</span>
          <span className="flex items-center gap-1">
            <span className="text-dark-accent">★</span>
            {(movie.rating || 0).toFixed(1)}
          </span>
        </div>
        <p className="text-sm text-dark-text-secondary line-clamp-2">
          {movie.overview}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <p className="text-center py-10 text-dark-text-secondary">
        Loading movies...
      </p>
    );
  }

  return (
    <section className="bg-dark-bg1 text-dark-text min-h-screen">
      {/*  Hero Section */}
      <div className="relative min-h-[90vh] flex items-center bg-dark-bg1 text-dark-text overflow-hidden">

        {/* backdrop image */}
        {movies[0]?.backdrop && (
          <div className="absolute inset-0">
            <img
              src={movies[0].backdrop}
              alt={movies[0].title}
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-bg1 via-dark-bg1/80 to-transparent" />
          </div>
        )}

        {/* content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 w-full py-20">
          
          {/* poster */}
          {movies[0] && (
            <Card className="overflow-hidden rounded-2xl shadow-2xl w-full md:w-1/3 relative">
              <img
                src={movies[0].poster || "/placeholder.svg"}
                alt={movies[0].title}
                className="w-full h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </Card>
          )}

          {/* info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-dark-primary drop-shadow-lg">
              {movies[0]?.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="flex items-center gap-2 text-dark-accent font-semibold text-lg">
                <Star className="h-6 w-6 fill-current" />
                {(movies[0]?.rating || 0).toFixed(1)}
              </span>
              <span className="text-dark-text-secondary text-lg">
                {movies[0]?.releaseDate?.split("-")[0]}
              </span>
              <span className="text-dark-text-secondary text-sm border px-2 py-1 rounded-md">
                {movies[0]?.genres?.join(" / ")}
              </span>
              <span className="text-dark-text-secondary text-sm">
                ⏱ {movies[0]?.runtime} min
              </span>
            </div>

            <p className="text-lg md:text-xl text-dark-text-secondary mb-8 max-w-2xl leading-relaxed">
              {movies[0]?.overview}
            </p>

            <div className="flex flex-wrap gap-6">
              <Button
                asChild
                size="lg"
                className="bg-dark-primary text-dark-text text-lg px-6 py-4 hover:opacity-90 transition"
              >
                <Link to={`/movies/${movies[0]?.id}`}>🎬 Watch Now</Link>
              </Button>
              {movies[0]?.trailer && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-6 py-4 border-dark-text-secondary text-dark-text-secondary hover:text-dark-text hover:border-dark-text"
                >
                  <a href={movies[0].trailer} target="_blank" rel="noreferrer">
                    ▶ Watch Trailer
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>


      {/*  Search Section */}
      <div ref={searchRef}>
        <SearchSection onFiltersChange={setFilters} />
      </div>

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
            {paginatedMovies.map((movie) => (
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
            {paginatedMovies.map((movie) => (
              <MovieListItem key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

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
    </section>
  );
}