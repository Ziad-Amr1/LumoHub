// src/components/PopularMovies.jsx
import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button"; 
import moviesData from "../data/moviesData";

/**
 * PopularMovies Component
 */
export default function PopularMovies() {
  // Get first 6 movies from moviesData
  const movies = moviesData.slice(0, 6);

  return (
    <section className="py-12 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-dark-primary mb-6">Popular Movies</h2>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <Link
              to={`/movie/${movie.id}`} 
              key={movie.id}
              className="relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              {/* Movie Poster with hover overlay */}
              <div className="relative group">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="px-4 py-2 rounded-md"
                  >
                    View Details
                  </Button>
                </div>

                {/* Rating Badge */}
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  {movie.rating}
                </span>
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(movie.releaseDate).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
