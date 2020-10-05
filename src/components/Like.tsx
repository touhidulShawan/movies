import * as React from "react";

interface Props {
  movieID: string;
  isLiked: boolean;
  likeHandler: (id: string) => void;
}

const Like: React.FC<Props> = ({ movieID, isLiked, likeHandler }) => {
  return (
    <span
      style={{ cursor: "pointer", fontSize: 19 }}
      onClick={() => likeHandler(movieID)}
    >
      {isLiked ? (
        <i className="fa fa-heart text-danger" aria-hidden="true"></i>
      ) : (
        <i className="fa fa-heart-o text-danger" aria-hidden="true"></i>
      )}
    </span>
  );
};

export default Like;
