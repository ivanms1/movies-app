import useSWR from 'swr';

import Layout from '../../components/Layout';

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
  const { data, error } = useSWR<DataProps>('/movie/popular', fetcher);
  if (!data || error) {
    return null;
  }
  return (
    <Layout>
      <h1>Popular Movies</h1>
      <div>
        {data.results.map((movie) => (
          <img
            key={movie.id}
            src={process.env.imageBaseUrl + movie.poster_path}
            alt={movie.title}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Popular;
