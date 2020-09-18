import React, { useState, useEffect } from "react";
import { Movie } from "../interfaces/Movie";
import { getMovies } from "../services/fakeMovieService";
import MovieCounter from "../components/MovieCounter";
import MoviesTable from "../components/MoviesTable";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const allMovies = getMovies();
    setMovies(allMovies);
  }, []);

  function onDeleteHandler(movieID: string) {
    const updateMovies = movies.filter((m) => m._id !== movieID);
    setMovies(updateMovies);
  }

  return (
    <div className="mt-3">
      <MovieCounter count={movies.length} />
      <MoviesTable data={movies} handleDelete={onDeleteHandler} />
    </div>
  );
};

export default Movies;
