// src/pages/MovieDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MovieHero from "../components/MovieDetails/MovieHero";
import CastGrid from "../components/MovieDetails/CastGrid";
import SimilarMoviesGrid from "../components/MovieDetails/SimilarMoviesGrid";
import MovieInfoPanel from "../components/MovieDetails/MovieInfoPanel";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { useMovieActions } from "../context/MovieActionsContext";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, similarMovies, loading, loadingSimilar } = useMovieDetails(id);
  const { favorites, watchlist, watched, toggleFavorite, toggleWatchlist, toggleWatched } =
    useMovieActions();

  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>;
  if (!movie) return <div className="p-10 text-center text-red-500">Movie not found</div>;

  const isFavorite = favorites.includes(Number(id));
  const isWatchlist = watchlist.includes(Number(id));
  const isWatched = watched.includes(Number(id));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: movie.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="dark" />

      <MovieHero
        movie={movie}
        isFavorite={isFavorite}
        isWatchlist={isWatchlist}
        isWatched={isWatched}
        onFavorite={() => toggleFavorite(movie.id)}
        onWatchlist={() => toggleWatchlist(movie.id)}
        onWatched={() => toggleWatched(movie.id)}
        onShare={handleShare}
      />

      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300 mb-8">{movie.overview}</p>

          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <CastGrid cast={movie.cast} />

          <h2 className="text-xl font-semibold mb-4">Trailer</h2>
          <div className="aspect-video w-full mb-12">
            <iframe
              src={movie.trailer}
              title="Trailer"
              className="w-full h-full rounded-lg"
              allowFullScreen
            ></iframe>
          </div>

          <h2 className="text-xl font-semibold mb-6">Similar Movies</h2>
          <SimilarMoviesGrid
            movies={similarMovies}
            loading={loadingSimilar}
            onNavigate={navigate}
          />
        </div>

        <MovieInfoPanel movie={movie} />
      </div>
    </div>
  );
}
