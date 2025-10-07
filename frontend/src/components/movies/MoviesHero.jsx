import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useMoviesContext } from "../../context/MoviesContext"

export default function MovieHero() {
  const { movies, selectMovieById } = useMoviesContext()
  const featured = movies[0]

  if (!featured) return null

  const handleSelect = () => {
    selectMovieById(featured.id)
  }

  return (
    <div className="relative min-h-[90vh] flex items-center bg-dark-bg1 text-dark-text overflow-hidden">
      {/* 🖼 الخلفية */}
      {featured.backdrop && (
        <div className="absolute inset-0">
          <img
            src={featured.backdrop}
            alt={featured.title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg1 via-dark-bg1/80 to-transparent" />
        </div>
      )}

      {/* 💬 المحتوى */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 w-full py-20">
        {/* 🎞 البوستر */}
        <Card className="overflow-hidden rounded-2xl shadow-2xl w-full md:w-1/3 relative">
          <img
            src={featured.poster || "/placeholder.svg"}
            alt={featured.title}
            className="w-full h-[550px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </Card>

        {/* 🧾 المعلومات */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-dark-primary drop-shadow-lg">
            {featured.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-dark-accent font-semibold text-lg">
              <Star className="h-6 w-6 fill-current" />
              {(featured.rating || 0).toFixed(1)}
            </span>
            <span className="text-dark-text-secondary text-lg">
              {featured.releaseDate?.split("-")[0]}
            </span>
            <span className="text-dark-text-secondary text-sm border px-2 py-1 rounded-md">
              {featured.genres?.join(" / ")}
            </span>
            <span className="text-dark-text-secondary text-sm">
              ⏱ {featured.runtime} min
            </span>
          </div>

          <p className="text-lg md:text-xl text-dark-text-secondary mb-8 max-w-2xl leading-relaxed">
            {featured.overview}
          </p>

          <div className="flex flex-wrap gap-6">
            <Button
              asChild
              size="lg"
              onClick={handleSelect}
              className="bg-dark-primary text-dark-text text-lg px-6 py-4 hover:opacity-90 transition"
            >
              <Link to={`/movies/${featured.id}`}>🎬 Watch Now</Link>
            </Button>

            {featured.trailer && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-6 py-4 border-dark-text-secondary text-dark-text-secondary hover:text-dark-text hover:border-dark-text"
              >
                <a href={featured.trailer} target="_blank" rel="noreferrer">
                  ▶ Watch Trailer
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
