import React, { useState } from 'react';

import Layout from '../../components/Layout';
import useSWR, { mutate } from 'swr';
import fetcher from '../../utils/fetcher';
import DisplayGrid from '../../components/DisplayGrid';
import { InputGroup, Button, Spinner } from '@blueprintjs/core';

import styles from './search.module.css';
import { Waypoint } from 'react-waypoint';

const Search = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [query, setQuery] = useState('');
  const { data, isValidating } = useSWR(
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
      <div className={styles.SearchContainer}>
        <h1>Search Movies</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.SearchBar}>
            <InputGroup
              value={query}
              className={styles.SearchInput}
              onChange={(e: any) => {
                if (shouldFetch) {
                  setShouldFetch(false);
                }
                setQuery(e.target.value);
              }}
              placeholder='Search for your favorite movies'
              leftIcon='film'
            />
            <Button type='submit' intent='primary'>
              Search
            </Button>
          </div>
          {data && Array.isArray(data.results) && (
            <DisplayGrid movies={data.results} />
          )}
          {data && data.page <= data.total_pages && (
            <Waypoint
              onEnter={async () => {
                mutate(
                  `/search/movie?query=${query}&page=1&include_adult=false&`,
                  async (movies: any) => {
                    const newMovies = await fetcher(
                      `/search/movie?query=${query}&page=${
                        movies.page + 1
                      }&include_adult=false&`
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
        </form>
        {!data && shouldFetch && (
          <Spinner className={styles.Loader} intent='primary' />
        )}
      </div>
    </Layout>
  );
};

export default Search;
