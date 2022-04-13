import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);
  async function fetchMoviesHandler() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Something went wrong...");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseDate: moviesData.release_date,
        };
      });
      console.log(transformedMovies);
      setMovies(transformedMovies);
      setLoading(false);
      //setMovies(data.results);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !isError && (
          <p>No movies found..</p>
        )}
        {!isLoading && isError && <p>{isError}</p>}
        {isLoading && <p>loading ...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
