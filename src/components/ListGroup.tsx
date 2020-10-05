import * as React from "react";
import { MovieGenre } from "../interfaces/Movie";

interface Props {
  data: MovieGenre[];
  selectedItem: MovieGenre;
  onItemSelect: (genre: MovieGenre) => void;
}

const ListGroup: React.FC<Props> = ({ data, selectedItem, onItemSelect }) => {
  return (
    <ul className="list-group">
      {data.map((g) => (
        <li
          key={g._id}
          className={`list-group-item ${selectedItem === g ? "active" : ""}`}
          onClick={() => onItemSelect(g)}
        >
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
