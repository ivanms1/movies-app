import useSWR from 'swr';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';

import fetcher from '../../utils/fetcher';

interface DataProps {
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
  const { data, error } = useSWR<DataProps>('/movie/popular?&page=1&', fetcher);
  if (!data || error) {
    return null;
  }
  return (
    <Layout>
      <h1>Popular Movies</h1>
      <div>
        <DisplayGrid movies={data.results} />
      </div>
    </Layout>
  );
};

export default Popular;
