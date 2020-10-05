export interface Movie {
  _id: string;
  title: string;
  genre: { _id: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishDate?: string;
  isLiked: boolean;
}

export interface MovieGenre {
  _id: string | null;
  name: string | null;
}

export interface Sorting {
  path: string;
  order: "asc" | "desc";
}
