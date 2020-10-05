import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../interfaces/Movie";
import Like from "./Like";

interface AllMoviesData {
  data: Movie[];
  onDelete: (movieID: string) => void;
  onLike: (movieID: string) => void;
  onSort: (path: string) => void;
}

const MoviesTable: React.FC<AllMoviesData> = ({
  data,
  onDelete,
  onLike,
  onSort,
}) => {
  const renderMovieData = data.map((m) => (
    <tr key={m._id}>
      <td>
        <Link to={`/movies/${m._id}`}> {m.title}</Link>
      </td>
      <td>{m.genre.name}</td>
      <td>{m.dailyRentalRate}</td>
      <td>{m.numberInStock}</td>
      <td>
        <Like movieID={m._id} isLiked={m.isLiked} likeHandler={onLike} />
      </td>
      <td>
        <button
          className="btn  btn-outline-danger btn-sm text-center"
          onClick={() => onDelete(m._id)}
        >
          <i
            style={{ fontSize: 17 }}
            className="fa fa-trash-o"
            aria-hidden="true"
          ></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <table className={`table w-100 ${data.length === 0 ? "d-none" : ""}`}>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>Title</th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rating</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th>Like</th>
          <th>Take-Action</th>
        </tr>
      </thead>
      <tbody>{renderMovieData}</tbody>
    </table>
  );
};

export default MoviesTable;
