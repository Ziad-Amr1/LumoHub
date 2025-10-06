// src/components/CastGrid.jsx
export default function CastGrid({ cast }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
      {cast.map((actor) => (
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
  );
}
