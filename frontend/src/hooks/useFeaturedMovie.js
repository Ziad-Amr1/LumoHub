// src/hooks/useFeaturedMovie.js
import { useState, useEffect } from "react";

/**
 * Custom hook to fetch featured movie data
 * Fetches movie from TMDB popular movies list
 */
export const useFeaturedMovie = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=en-US&page=1`
        );
        const data = await res.json();
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        setMovie(randomMovie);
      } catch (error) {
        console.error("Error fetching featured movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, []);

  return { movie, loading };
};
