// src/components/MovieInfoPanel.jsx
export default function MovieInfoPanel({ movie }) {
  return (
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
  );
}
