import React, { useState } from 'react';

import Layout from '../../components/Layout';
import useSWR from 'swr';
import fetcher from '../../utils/fetcher';
import DisplayGrid from '../../components/DisplayGrid';

const Search = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [query, setQuery] = useState('');
  const { data, error, isValidating } = useSWR(
    shouldFetch
      ? `/search/movie?query=${query}&page=1&include_adult=false&`
      : null,
    fetcher
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setShouldFetch(true);
  };
  return (
    <Layout>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={query}
          onChange={(e) => {
            if (shouldFetch) {
              setShouldFetch(false);
            }
            setQuery(e.target.value);
          }}
        />
        <button type='submit'>Search</button>
        {data && Array.isArray(data.results) && (
          <DisplayGrid movies={data.results} />
        )}
      </form>
    </Layout>
  );
};

export default Search;
