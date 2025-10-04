// src/pages/MoviesGrid.jsx
import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies لما الصفحة تفتح
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${
            import.meta.env.VITE_TMDB_API_KEY
          }&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-muted-foreground">
        Loading movies...
      </p>
    );
  }

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Popular Movies
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className="relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              {/* Poster + Overlay */}
              <div className="relative group">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/placeholder.svg"
                  }
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                {/* Overlay عند Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <span className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow">
                    View Details
                  </span>
                </div>
                {/* Badge للتقييم */}
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {movie.release_date?.split("-")[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
