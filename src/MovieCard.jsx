import React from "react";

function MovieCard({ movie, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-gray-800 rounded-xl overflow-hidden shadow-md transform transition duration-300 hover:scale-105 hover:border-4 hover:border-yellow-400 w-56"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Image"
        }
        alt={movie.Title}
        className="w-full h-72 object-cover"
      />
      <div className="p-2">
        <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-400">{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;
