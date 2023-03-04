import { useRef } from 'react';
import axios from 'axios';
import {
  useInfiniteQuery,
  useQuery,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { Waypoint } from 'react-waypoint';

import instance from '../../utils/axiosInstance';

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
  const currentPage = useRef(2);
  const { data: initialData } = useQuery(['initial-popular'], async () => {
    currentPage.current = currentPage.current + 1;
    const { data } = await axios.get(
      `/api/popular?page=${currentPage.current}`
    );

    return data;
  });
  const { data, error, fetchNextPage } = useInfiniteQuery<{ data: DataProps }>(
    ['popular'],
    async ({ pageParam = currentPage.current }) => {
      const { data } = await axios.get(`/api/popular?page=${pageParam}`);
      currentPage.current = currentPage.current + 1;

      return data;
    },
    {
      enabled: currentPage.current !== 1,
      getNextPageParam: (lastPage) => {
        if (lastPage?.data?.total_pages === currentPage.current) {
          return undefined;
        }
        return currentPage.current;
      },
    }
  );

  if (error) {
    Toast?.show({
      message: 'An error ocurred',
      intent: 'danger',
    });
  }

  const pages = [
    {
      data: initialData.data,
    },
    ...(data?.pages ?? []).slice(1),
  ];

  return (
    <Layout
      seo={{
        title: 'Popular Movies',
        description: 'Popular Movies',
        openGraph: {
          title: 'Popular Movies',
          description: 'Popular Movies',
          images: [
            {
              url:
                process.env.NEXT_PUBLIC_IMAGE_BASE_URL +
                pages[0]?.data?.results[0]?.backdrop_path,
            },
          ],
        },
      }}
    >
      <div className={styles.Popular}>
        <h1 className={styles.Title}>Popular Movies</h1>
        <div className={styles.GridContainer}>
          {pages?.map((group, i) => (
            <DisplayGrid key={i} movies={group?.data?.results} />
          ))}

          <Waypoint onEnter={() => fetchNextPage()} bottomOffset='-20%' />
        </div>
      </div>
    </Layout>
  );
};

export default Popular;

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['initial-popular'], async () => {
    const { data } = await instance.get(
      `/movie/popular?page=1&api_key=${process.env.API_KEY}`
    );

    return { data };
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
