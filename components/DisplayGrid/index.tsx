import styles from './DisplayGrid.module.css';

interface DisplayGridProps {
  movies: {
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
  }[];
}

const DisplayGrid = ({ movies }: DisplayGridProps) => {
  return (
    <div className={styles.DisplayGrid}>
      {movies.map((movie) => (
        <img
          key={movie.id}
          className={styles.MoviePoster}
          src={
            movie.poster_path
              ? process.env.imageBaseUrl + movie.poster_path
              : 'https://via.placeholder.com/185x278?text=No+Poster'
          }
          alt={movie.title}
        />
      ))}
    </div>
  );
};

export default DisplayGrid;
