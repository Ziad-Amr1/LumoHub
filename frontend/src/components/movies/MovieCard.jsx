// src/components/movies/MovieCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="relative bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
    >
      {/* Poster */}
      <div className="relative group">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="text-white text-sm font-medium">View Details</span>
        </div>

        {/* Rating Badge */}
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
    </Link>
  );
}
