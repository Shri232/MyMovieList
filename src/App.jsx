import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard"; // Import the card component

const API_KEY = "fc5da5fc"; // Your OMDb API key

function App() {
  const [discoverMovies, setDiscoverMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const randomKeywords = ["love", "war", "man", "king", "city", "star", "dream", "game", "the"];

  async function fetchMovies(searchTerm, setter) {
    try {
      let allMovies = [];
      for (let page = 1; page <= 3; page++) {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${page}`
        );
        const data = await response.json();
        if (data.Search) {
          allMovies = [...allMovies, ...data.Search];
        } else {
          break;
        }
      }
      setter(allMovies);
    } catch (err) {
      console.log("Error fetching data", err);
    }
  }

  async function fetchMovieDetails(imdbID) {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`
      );
      const data = await response.json();
      setSelectedMovie(data);
    } catch (err) {
      console.log("Error fetching details", err);
    }
  }

  useEffect(() => {
    const random = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
    fetchMovies(random, setDiscoverMovies);
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white p-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-3 mb-6">
        <h2 className="text-2xl font-bold">MyMovieLists!</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Movie Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="m-2 p-2 rounded-xl text-black bg-white placeholder-gray-500 w-64"
          />
          <button
            className="border-2 p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
            onClick={() => fetchMovies(searchTerm, setDiscoverMovies)}
          >
            Search
          </button>
        </div>
      </div>

      {/* Movies Grid */}
      <h3 className="text-xl font-semibold mb-3">Discover Cinema</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {discoverMovies.length > 0 ? (
          discoverMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => fetchMovieDetails(movie.imdbID)}
            />
          ))
        ) : (
          <p className="text-gray-400">No movies found.</p>
        )}
      </div>

    
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-2/3 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedMovie(null)}
                className="text-white text-xl font-bold hover:text-red-500"
              >
                ✖
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={
                  selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={selectedMovie.Title}
                className="w-64 h-auto rounded-lg"
              />
              <div>
                <h2 className="text-3xl font-bold mb-2">{selectedMovie.Title}</h2>
                <p className="text-gray-400 mb-2">{selectedMovie.Released}</p>
                <p><span className="font-semibold">Genre:</span> {selectedMovie.Genre}</p>
                <p><span className="font-semibold">Director:</span> {selectedMovie.Director}</p>
                <p><span className="font-semibold">Actors:</span> {selectedMovie.Actors}</p>
                <p><span className="font-semibold">Language:</span> {selectedMovie.Language}</p>
                <p><span className="font-semibold">IMDB Rating:</span> ⭐ {selectedMovie.imdbRating}</p>
                <p className="mt-3 text-gray-300">{selectedMovie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
