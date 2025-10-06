// src/components/SimilarMoviesGrid.jsx
import { Star } from "lucide-react";

export default function SimilarMoviesGrid({ movies, loading, onNavigate }) {
  if (loading) return <div className="text-gray-400">Loading similar movies...</div>;
  if (!movies.length) return <div className="text-gray-400">No similar movies found.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {movies.map((m) => (
        <div
          key={m.id}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
          onClick={() => onNavigate(`/movies/${m.id}`)}
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
  );
}
