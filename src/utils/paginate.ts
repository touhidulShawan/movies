import { Movie } from "./../interfaces/Movie";
import _ from "lodash";

export function paginate(
  items: Movie[],
  pageNumber: number,
  pageSize: number
): Movie[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
