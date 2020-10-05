import * as React from "react";

interface SearchQuery {
  searchQuery: string;
  onChangeHandler: (query: string) => void;
}
const SearchBox: React.FC<SearchQuery> = (props) => {
  return (
    <div className="form-group">
      <input
        className="form-control"
        type="search"
        name="searchBox"
        value={props.searchQuery}
        placeholder="Search..."
        onChange={(evt) => props.onChangeHandler(evt.currentTarget.value)}
      />
    </div>
  );
};
export default SearchBox;
