// src/pages/Movies.jsx
import React from "react"
import { MoviesProvider } from "../context/MoviesContext"
import MovieHero from "../components/movies/MoviesHero"
import MoviesFilterBar from "../components/movies/MoviesFilterBar"
import MoviesControls from "../components/movies/MoviesControls"
import MoviesGrid from "../components/movies/MoviesGrid"
import MoviesPagination from "../components/movies/MoviesPagination"

export default function Movies() {
  return (
    <MoviesProvider>
      <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
        {/* 🦸‍♀️ Hero Section */}
        <MovieHero />

        {/* 🔍 Filter Bar */}
          <MoviesFilterBar />


        {/* ⚙️ Controls (Sort + View Modes) */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mt-6">
          <MoviesControls />
        </div>

        {/* 🎬 Movies Grid */}
        <div className="flex-grow mt-4">
          <MoviesGrid />
          <MoviesPagination />
        </div>
      </div>
    </MoviesProvider>
  )
}
