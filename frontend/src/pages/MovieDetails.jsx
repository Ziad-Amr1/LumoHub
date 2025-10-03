import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Play, Heart, Bookmark, Eye, Share2, Star } from "lucide-react"

// Mock API
const fetchMovieById = async (id) => {
  return {
    id,
    title: "Inception",
    releaseDate: "2010-07-16",
    rating: 8.8,
    runtime: 148,
    genres: ["Action", "Sci-Fi", "Thriller"],
    overview:
      "A thief who steals corporate secrets through the use of dream-sharing technology...",
    poster: "https://www.bing.com/ck/a?!&&p=6cd8596b0753d2ab9b481ed6e4fb62475e2aaff93bb913e124d553b4ff41e6efJmltdHM9MTc1OTQ0OTYwMA&ptn=3&ver=2&hsh=4&fclid=3548b7c4-dc9f-6a09-36fc-a1b6dd3e6bc1&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbmNlcHRpb24rcG9zdGVyJmlkPUVDRDY5RTVCODgyQjZFOTRDRDA1MDI5NUU2RkI4NTkxRjU5NzlBMTEmRk9STT1JQUNGSVI&ntb=1http://www.impawards.com/2010/posters/inception.jpg",
    backdrop: "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
    cast: [
      { id: 1, name: "Leonardo DiCaprio", character: "Cobb", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Joseph Gordon-Levitt", character: "Arthur", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Ellen Page", character: "Ariadne", image: "https://via.placeholder.com/150" },
    ],
  }
}

// Mock API for similar movies
const fetchSimilarMovies = async (id) => {
  return [
    {
      id: "m1",
      title: "Interstellar",
      year: "2014",
      rating: 8.6,
      poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    },
    {
      id: "m2",
      title: "The Dark Knight",
      year: "2008",
      rating: 9.0,
      poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: "m3",
      title: "Tenet",
      year: "2020",
      rating: 7.4,
      poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
    },
    {
      id: "m4",
      title: "Shutter Island",
      year: "2010",
      rating: 8.2,
      poster: "https://image.tmdb.org/t/p/w500/kve20tXwUZpu4GUX8l6X7Z4jmL6.jpg",
    },
  ]
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

  const handleFavorite = () => setIsFavorite(!isFavorite)
  const handleWatchlist = () => setIsWatchlist(!isWatchlist)
  const handleWatched = () => setIsWatched(!isWatched)
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: movie.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied!")
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-gray-500">Loading...</div>
  }

  if (!movie) {
    return <div className="p-10 text-center text-red-500">Movie not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 container mx-auto px-6 py-16">
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
