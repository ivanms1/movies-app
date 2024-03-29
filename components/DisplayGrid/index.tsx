import { useState } from 'react';
import { motion } from 'framer-motion';

import MovieModal from '../MovieModal';

import styles from './DisplayGrid.module.css';

export interface MovieProps {
  id: number;
  popularity: number;
  vote_count: number;
  video: boolean;
  poster_path: string;
  backdrop_path: string;
  tagline: string;
  genres: {
    id: number;
    name: string;
  }[];
  title: string;
  vote_average: number;
  overview: string;
  release_date: number;
}

interface DisplayGridProps {
  movies: MovieProps[];
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const DisplayGrid = ({ movies }: any) => {
  const [movieModal, setMovieModal] = useState<{
    movie: MovieProps | null;
    isOpen: boolean;
  }>({ movie: null, isOpen: false });

  return (
    <motion.div
      className={styles.DisplayGrid}
      variants={container}
      initial='hidden'
      animate='visible'
    >
      {movies?.map((movie: any) => (
        <motion.img
          key={movie.id}
          onClick={() =>
            setMovieModal({
              movie,
              isOpen: true,
            })
          }
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.95 }}
          variants={item}
          className={styles.MoviePoster}
          src={
            movie.poster_path
              ? process.env.NEXT_PUBLIC_IMAGE_BASE_URL + movie.poster_path
              : 'https://via.placeholder.com/185x278?text=No+Poster'
          }
          alt={movie.title}
        />
      ))}
      {movieModal.movie && (
        <MovieModal
          isOpen={movieModal.isOpen}
          movieId={movieModal.movie.id}
          onClose={() =>
            setMovieModal({
              ...movieModal,
              isOpen: false,
            })
          }
          onClosed={() =>
            setMovieModal({
              movie: null,
              isOpen: false,
            })
          }
        />
      )}
    </motion.div>
  );
};

export default DisplayGrid;
