// src/context/MovieActionsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CustomToast } from "../components/CustomToast";

// Create context
const MovieActionsContext = createContext();

export function MovieActionsProvider({ children }) {
  // Global states
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [watched, setWatched] = useState([]);

  // Load data from localStorage on start
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    const wl = JSON.parse(localStorage.getItem("watchlist")) || [];
    const wd = JSON.parse(localStorage.getItem("watched")) || [];
    setFavorites(fav);
    setWatchlist(wl);
    setWatched(wd);
  }, []);

  // Save to localStorage when any changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // ========== Actions ==========
  const toggleFavorite = (movieId) => {
    setFavorites((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
    toast(
      <CustomToast
        type="favorite"
        message={
          favorites.includes(movieId)
            ? "Removed from favorites."
            : "Added to favorites!"
        }
      />
    );
  };

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
    toast(
      <CustomToast
        type="watchlist"
        message={
          watchlist.includes(movieId)
            ? "Removed from watchlist."
            : "Added to watchlist!"
        }
      />
    );
  };

  const toggleWatched = (movieId) => {
    setWatched((prev) =>
      prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId]
    );
    toast(
      <CustomToast
        type="watched"
        message={
          watched.includes(movieId)
            ? "Removed watched status."
            : "Marked as watched!"
        }
      />
    );
  };

  return (
    <MovieActionsContext.Provider
      value={{
        favorites,
        watchlist,
        watched,
        toggleFavorite,
        toggleWatchlist,
        toggleWatched,
      }}
    >
      {children}
    </MovieActionsContext.Provider>
  );
}

// Can use hook
export function useMovieActions() {
  return useContext(MovieActionsContext);
}
