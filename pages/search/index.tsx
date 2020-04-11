import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';
import useSWR, { mutate } from 'swr';
import { InputGroup, Button, Spinner } from '@blueprintjs/core';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';

import fetcher from '../../utils/fetcher';

import searchImage from '../../assets/search.svg';
import noResultsImage from '../../assets/no_results.svg';

import styles from './search.module.css';

const Search = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [query, setQuery] = useState('');
  const { data } = useSWR(
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
        <form className={styles.Form} onSubmit={handleSubmit}>
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
        </form>
        {data && Array.isArray(data.results) ? (
          data.results.length > 0 ? (
            <DisplayGrid movies={data.results} />
          ) : (
            <img
              className={styles.SearchImage}
              src={noResultsImage}
              alt='no results'
            />
          )
        ) : (
          <img className={styles.SearchImage} src={searchImage} alt='search' />
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

        {!data && shouldFetch && (
          <Spinner className={styles.Loader} intent='primary' />
        )}
      </div>
    </Layout>
  );
};

export default Search;
