import useSWR, { mutate } from 'swr';
import { Waypoint } from 'react-waypoint';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';

import fetcher from '../../utils/fetcher';

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
  const { data, error } = useSWR<DataProps>(`/movie/popular?&page=1&`, fetcher);
  if (!data || error) {
    return null;
  }
  return (
    <Layout>
      <h1>Popular Movies</h1>
      <div>
        <DisplayGrid movies={data.results} />
        {data.page <= data.total_pages && (
          <Waypoint
            onEnter={async () => {
              mutate(
                `/movie/popular?&page=1&`,
                async (movies: any) => {
                  const newMovies = await fetcher(
                    `/movie/popular?&page=${movies.page + 1}&`
                  );
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
    </Layout>
  );
};

export default Popular;
