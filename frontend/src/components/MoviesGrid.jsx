// src/components/MoviesGrid.jsx
import React from "react";
import { Star } from "lucide-react";

const sampleMovies = [
  {
    id: 1,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    poster: "/dark-knight-movie-backdrop.jpg",
  },
  {
    id: 2,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    poster: "/inception-movie-poster.png",
  },
  {
    id: 3,
    title: "Interstellar",
    year: 2014,
    rating: 8.6,
    poster: "/interstellar-movie-poster.jpg",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    poster: "/matrix-movie-poster.png",
  },
];

export default function MoviesGrid({ movies = sampleMovies }) {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Popular Movies
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              {/* Poster + Overlay */}
              <div className="relative group">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                />
                {/* Overlay عند Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md shadow">
                    View Details
                  </button>
                </div>
                {/* Badge للتقييم */}
                <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-yellow-400" />
                  {movie.rating}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {movie.title}
                </h3>
                <p className="text-sm text-muted-foreground">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
