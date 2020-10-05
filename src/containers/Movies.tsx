import React, { useState, useEffect } from "react";
import { Movie, MovieGenre, Sorting } from "../interfaces/Movie";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import MovieCounter from "../components/MovieCounter";
import MoviesTable from "../components/MoviesTable";
import Pagination from "../components/Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "../components/ListGroup";
import { Link } from "react-router-dom";
import SearchBox from "../components/SearchBox";

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<MovieGenre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<MovieGenre>({
    _id: "",
    name: "",
  });
  const [pageSize] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<Sorting>({
    path: "title",
    order: "asc",
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const allMovies = getMovies();
    const movieGenre = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const movies = allMovies.map((movie) => {
      return { ...movie, isLiked: false };
    });
    setMovies(movies);
    setGenre(movieGenre);
  }, []);

  let filteredMovies = movies;
  if (searchQuery) {
    filteredMovies = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  } else if (selectedGenre && selectedGenre._id) {
    movies.filter((movie) => movie.genre._id === selectedGenre._id);
  }

  const sortedMovies = _.orderBy(
    filteredMovies,
    [sortColumn.path],
    [sortColumn.order]
  );

  const allMovies = paginate(sortedMovies, currentPage, pageSize);

  // movie delete handler
  function handleDelete(movieID: string) {
    const updateMovies = movies.filter((m) => m._id !== movieID);
    setMovies(updateMovies);
  }
  // movie like handler
  function handleLike(movieID: string) {
    const allMovies = [...movies];
    const index = allMovies.findIndex((m) => m._id === movieID);
    allMovies[index].isLiked = !allMovies[index].isLiked;
    setMovies(allMovies);
  }
  // handle page change for pagination
  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  // handle item select on listgroup genre
  function handleItemSelect(genre: MovieGenre) {
    setSelectedGenre(genre);
    setSearchQuery("");
    setCurrentPage(1);
  }

  function handleSort(path: string) {
    const copySortColumn = { ...sortColumn };
    if (copySortColumn.path === path) {
      copySortColumn.order = copySortColumn.order === "asc" ? "desc" : "asc";
    } else {
      copySortColumn.path = path;
      copySortColumn.order = "asc";
    }
    setSortColumn(copySortColumn);
  }

  function handleSearchChange(query: string) {
    setSearchQuery(query);
    setSelectedGenre({ _id: null, name: null });
    setCurrentPage(1);
  }

  return (
    <>
      <div className="row mt-4">
        <div className="col-3">
          <ListGroup
            data={genre}
            selectedItem={selectedGenre}
            onItemSelect={handleItemSelect}
          />
        </div>
        <div className="col">
          <button className="btn btn-primary mb-2">
            <Link
              style={{ textDecoration: "none", color: "#fff" }}
              to="/movies/new"
            >
              New Movie
            </Link>
          </button>
          <SearchBox
            searchQuery={searchQuery}
            onChangeHandler={handleSearchChange}
          />
          <div>
            <MovieCounter count={movies.length} />
            <MoviesTable
              data={allMovies}
              onDelete={handleDelete}
              onLike={handleLike}
              onSort={handleSort}
            />
          </div>
          <Pagination
            itemCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
