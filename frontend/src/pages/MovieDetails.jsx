// src/pages/MovieDetails.jsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Play, Heart, Bookmark, Eye, Share2, Star } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { CustomToast } from "../components/CustomToast"
import  moviesData  from "../data/moviesData"   // import data

// ==================== Functions Mock API ====================

// fetch movie by id
const fetchMovieById = async (id) => {
  return moviesData.find((m) => m.id === Number(id))
}

// fetch similar movies (mock logic)
const fetchSimilarMovies = async (id) => {
  const movie = moviesData.find((m) => m.id === Number(id))
  if (!movie) return []

  // Simple mock: return random 4 movies excluding current movie
  return moviesData
    .filter((m) => m.id !== Number(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map((m) => ({
      id: m.id,
      title: m.title,
      year: m.releaseDate.split("-")[0],
      rating: m.rating,
      poster: m.poster
    }))
}

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingSimilar, setLoadingSimilar] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isWatchlist, setIsWatchlist] = useState(false)
  const [isWatched, setIsWatched] = useState(false)

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true)
      try {
        const data = await fetchMovieById(id)
        setMovie(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    const loadSimilar = async () => {
      setLoadingSimilar(true)
      try {
        const data = await fetchSimilarMovies(id)
        setSimilarMovies(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoadingSimilar(false)
      }
    }
    loadMovie()
    loadSimilar()
  }, [id])

  // ==================== Handlers with Toast ====================
  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast(<CustomToast 
            type="favorite" 
            message={!isFavorite ? "Done! Added to favorites." : "Done! Removed from favorites."}
          />)
  }

  const handleWatchlist = () => {
    setIsWatchlist(!isWatchlist)
    toast(<CustomToast 
            type="watchlist" 
            message={!isWatchlist ? "Done! Added to watchlist." : "Done! Removed from watchlist."}
          />)
  }

  const handleWatched = () => {
    setIsWatched(!isWatched)
    toast(<CustomToast 
            type="watched" 
            message={!isWatched ? "Done! Watched." : "Done! Removed watched status."}
          />)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: movie.title, url: window.location.href })
      toast(<CustomToast type="share" message="Done! Shared movie." />)
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast(<CustomToast type="share" message="Done! Copied movie link." />)
    }
  }

  // ==================== Loading / Error ====================
  if (loading) return <div className="p-10 text-center text-gray-500">Loading...</div>
  if (!movie) return <div className="p-10 text-center text-red-500">Movie not found</div>

  // ==================== Render ====================
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* ToastContainer Center */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />

      {/* Hero */}
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
            <button onClick={handleFavorite} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
              <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500" : "text-white"}`} />
            </button>
            <button onClick={handleWatchlist} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
              <Bookmark className={`w-5 h-5 ${isWatchlist ? "text-yellow-400" : "text-white"}`} />
            </button>
            <button onClick={handleWatched} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
              <Eye className={`w-5 h-5 ${isWatched ? "text-green-400" : "text-white"}`} />
            </button>
            <button onClick={handleShare} className="p-3 rounded-full bg-gray-800 hover:bg-gray-700">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left - Details */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-300 mb-8">{movie.overview}</p>

          <h2 className="text-xl font-semibold mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
            {movie.cast.map((actor) => (
              <div key={actor.id} className="text-center">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
                <p className="mt-2 text-sm font-medium">{actor.name}</p>
                <p className="text-xs text-gray-400">{actor.character}</p>
              </div>
            ))}
          </div>

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
          {loadingSimilar ? (
            <div className="text-gray-400">Loading similar movies...</div>
          ) : similarMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {similarMovies.map((m) => (
                <div
                  key={m.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/movies/${m.id}`)}
                >
                  <img src={m.poster} alt={m.title} className="w-full h-60 object-cover" />
                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">{m.title}</h3>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                      <span>{m.year}</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" /> {m.rating}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-400">No similar movies found.</div>
          )}
        </div>

        {/* Right - Poster & Info */}
        <div className="space-y-4">
          <img src={movie.poster} alt={movie.title} className="w-full rounded-lg shadow-lg" />
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Movie Info</h3>
            <p><span className="font-medium">Release:</span> {movie.releaseDate}</p>
            <p><span className="font-medium">Runtime:</span> {movie.runtime} min</p>
            <p><span className="font-medium">Rating:</span> {movie.rating}</p>
            <p><span className="font-medium">Genres:</span> {movie.genres.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
