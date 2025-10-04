// src/components/movies/MoviesHero.jsx
import React from "react";
import { Button } from "../ui/button";

export default function HeroMovie({ movie }) {
  if (!movie) return null;

  return (
    <div className="relative bg-dark-bg2 text-dark-text mb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col md:flex-row gap-8 items-center">
        {/* Poster */}
        <div className="flex-shrink-0 w-64">
          <img
            src={movie.poster}
            alt={movie.title}
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
          <p className="text-dark-text-secondary">{movie.overview || "No description available."}</p>
          <div className="flex gap-4">
            <Button variant="default">Watch Now</Button>
            <Button variant="secondary">More Info</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
