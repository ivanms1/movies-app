export interface MovieProps {
  id: number;
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  backdrop_path: string;
  genre_ids: number[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: number;
  tagline: string;
  genres: {
    id: number;
    name: string;
  }[];
}

export interface DataProps {
  page: number;
  total_pages: number;
  results: MovieProps[];
}
