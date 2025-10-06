// src/components/MovieHero.jsx
import { Heart, Bookmark, Eye, Share2, Star } from "lucide-react";

export default function MovieHero({
  movie,
  isFavorite,
  isWatchlist,
  isWatched,
  onFavorite,
  onWatchlist,
  onWatched,
  onShare,
}) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      <div className="relative z-10 container mx-auto px-6 py-16 pt-45">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-300">
          <span>{movie.releaseDate.split("-")[0]}</span>
          <span>{movie.runtime} min</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" /> {movie.rating}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {movie.genres.map((g) => (
            <span
              key={g}
              className="px-3 py-1 text-xs bg-purple-600/40 border border-purple-500 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onFavorite} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
            <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-white"}`} />
          </button>
          <button onClick={onWatchlist} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
            <Bookmark className={`w-5 h-5 ${isWatchlist ? "text-yellow-400" : "text-white"}`} />
          </button>
          <button onClick={onWatched} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
            <Eye className={`w-5 h-5 ${isWatched ? "text-green-400" : "text-white"}`} />
          </button>
          <button onClick={onShare} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
