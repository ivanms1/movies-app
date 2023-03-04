import { useRef } from 'react';
import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Waypoint } from 'react-waypoint';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';
import { Toast } from '../../components/Toaster';

import styles from './popular.module.css';

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
    tagline: string;
    genres: {
      id: number;
      name: string;
    }[];
  }[];
}

const Popular = () => {
  const currentPage = useRef(1);
  const { data, error, fetchNextPage } = useInfiniteQuery<{ data: DataProps }>(
    ['popular'],
    async ({ pageParam = currentPage.current }) => {
      const { data } = await axios.get(`/api/popular?page=${pageParam}`);
      currentPage.current = currentPage.current + 1;

      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.total_pages === currentPage.current) {
          return undefined;
        }
        return currentPage.current;
      },
    }
  );

  if (!data) {
    return null;
  }

  if (error) {
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
          {data?.pages?.map((group, i) => (
            <DisplayGrid key={i} movies={group?.data?.results} />
          ))}

          <Waypoint onEnter={() => fetchNextPage()} bottomOffset='-20%' />
        </div>
      </div>
    </Layout>
  );
};

export default Popular;
