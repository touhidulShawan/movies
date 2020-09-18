import React from "react";

interface Count {
  count: number;
}

const MovieCounter: React.FC<Count> = ({ count }) => {
  // check how many movies are there
  let text = "There are no movies in database.";
  if (count === 1) {
    text = "There are 1 movie in database.";
  } else if (count > 1) {
    text = `There are ${count} movies in database.`;
  }
  return (
    <span
      className={`mt-3 alert d-block ${
        count ? "alert-success" : "alert-danger"
      }`}
    >
      {text}
    </span>
  );
};
export default MovieCounter;
