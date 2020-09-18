import React from "react";
import { Movie } from "../interfaces/Movie";

interface AllMoviesData {
  data: Movie[];
  handleDelete: (movieID: string) => void;
}

const MoviesTable: React.FC<AllMoviesData> = ({ data, handleDelete }) => {
  const renderMovieData = data.map((m) => (
    <tr key={m._id}>
      <td>{m.title}</td>
      <td>{m.genre.name}</td>
      <td>{m.dailyRentalRate}</td>
      <td>{m.numberInStock}</td>
      <td>
        <button
          className="btn  btn-outline-danger btn-sm text-center"
          onClick={() => handleDelete(m._id)}
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
          <th>Title</th>
          <th>Genre</th>
          <th>Rating</th>
          <th>Stock</th>
          <th>Take-Action</th>
        </tr>
      </thead>
      <tbody>{renderMovieData}</tbody>
    </table>
  );
};

export default MoviesTable;
