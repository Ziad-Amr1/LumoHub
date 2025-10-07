// src/components/MovieHero.jsx
import { Heart, Bookmark, Eye, Share2, Star, Clock, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
  const navigate = useNavigate();

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {/* 🎬 Backdrop */}
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* 🔙 Back Button (fixed top-left) */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-25 left-4 z-50 flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded-lg hover:bg-black/90 transition border-1 border-white"
      >
        ← Back
      </button>

      {/* 📦 Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 py-16 pt-45 text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 🎥 Title */}
        <h1 className="text-4xl font-bold mb-3">{movie.title}</h1>

        {/* 🗓️ Info */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {movie.releaseDate.split("-")[0]}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> {movie.runtime} min
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" /> {movie.rating}
          </span>
        </div>

        {/* 🎭 Genres */}
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

        {/* ❤️ Watch Buttons */}
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
      </motion.div>
    </div>
  );
}
