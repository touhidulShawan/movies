import * as React from "react";
import _ from "lodash";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (currentPage: number) => void;
}

const Pagination: React.FC<Props> = (props) => {
  const pageCount: number = Math.ceil(props.itemCount / props.pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${
              page === props.currentPage ? "active" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => props.onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
