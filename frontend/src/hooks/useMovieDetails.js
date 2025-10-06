// src/hooks/useMovieDetails.js
import { useEffect, useState } from "react";
import moviesData from "../data/moviesData";

const fetchMovieById = async (id) =>
  moviesData.find((m) => m.id === Number(id));

const fetchSimilarMovies = async (id) => {
  const movie = moviesData.find((m) => m.id === Number(id));
  if (!movie) return [];

  return moviesData
    .filter((m) => m.id !== Number(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map((m) => ({
      id: m.id,
      title: m.title,
      year: m.releaseDate.split("-")[0],
      rating: m.rating,
      poster: m.poster,
    }));
};

export function useMovieDetails(id) {
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchMovieById(id);
      setMovie(data);
      setLoading(false);
    };
    const loadSimilar = async () => {
      setLoadingSimilar(true);
      const data = await fetchSimilarMovies(id);
      setSimilarMovies(data);
      setLoadingSimilar(false);
    };
    loadData();
    loadSimilar();
  }, [id]);

  return { movie, similarMovies, loading, loadingSimilar };
}
