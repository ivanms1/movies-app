import fetch from 'node-fetch';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import { Spinner } from '@blueprintjs/core';

import Layout from '../../components/Layout';

import styles from './movie.module.css';

interface movieProps {
  movie: {
    id: number;
    popularity: number;
    vote_count: number;
    tagline: string;
    video: boolean;
    poster_path: string;
    backdrop_path: string;
    genres: {
      id: number;
      name: string;
    }[];
    title: string;
    vote_average: number;
    overview: string;
    release_date: number;
  };
}

const getUserScoreColor = (score: number) => {
  if (score < 6) return 'danger';
  if (score < 8) return 'warning';
  return 'success';
};

const movie = ({ movie }: movieProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  console.log(movie);
  return (
    <div
      style={{
        backgroundImage: `url(${
          process.env.imageBackdropBaseUrl + movie.backdrop_path
        })`,
      }}
      className={styles.Container}
    >
      <Layout>
        <button onClick={() => router.back()}>Go Back</button>
        <div>
          <h1>
            {movie.title} ({format(new Date(movie.release_date), 'yyyy')})
          </h1>
          <div>
            <span>{format(new Date(movie.release_date), 'dd/MM/yyyy')}</span> *{' '}
            <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
          </div>
          <div>
            <span>{movie.vote_average * 10}</span>
            <Spinner
              value={movie.vote_average / 10}
              intent={getUserScoreColor(movie.vote_average)}
            />
          </div>
          <span>{movie.tagline}</span>
          <p>{movie.overview}</p>
        </div>
      </Layout>
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '1' } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `${process.env.fetchBaseUrl}/movie/${params.id}?api_key=${process.env.apiKey}`
  );
  const movie = await res.json();
  return { props: { movie } };
}

export default movie;
