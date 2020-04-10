import useSWR, { mutate } from 'swr';
import { Waypoint } from 'react-waypoint';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';

import fetcher from '../../utils/fetcher';

import styles from './popular.module.css';
import { useState } from 'react';
import { Toast } from '../../components/Toaster';

interface DataProps {
  page: number;
  total_pages: number;
  results: {
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

const Popular = () => {
  const [error, setError] = useState(null);
  const { data, error: fetchError } = useSWR<DataProps>(
    `/movie/popular?&page=1&`,
    fetcher
  );
  if (!data) {
    return null;
  }

  if (fetchError) {
    Toast?.show({
      message: 'An error ocurred',
      intent: 'danger',
    });
  }
  return (
    <Layout>
      <div className={styles.Popular}>
        <h1 className={styles.Title}>Popular Movies</h1>
        <div className={styles.GridContainer}>
          <DisplayGrid movies={data.results} />
          {data.page <= data.total_pages && (
            <Waypoint
              onEnter={async () => {
                mutate(
                  `/movie/popular?&page=1&`,
                  async (movies: any) => {
                    let newMovies;
                    try {
                      newMovies = await fetcher(
                        `/movie/popular?&page=${movies.page + 1}&`
                      );
                    } catch (error) {
                      Toast?.show({
                        message: 'An error ocurred',
                        intent: 'danger',
                      });
                    }
                    return {
                      ...newMovies,
                      results: [...movies.results, ...newMovies.results],
                    };
                  },
                  false
                );
              }}
              bottomOffset='-50%'
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Popular;
