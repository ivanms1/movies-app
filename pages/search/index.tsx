import React, { useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Waypoint } from 'react-waypoint';
import { InputGroup, Button, Spinner } from '@blueprintjs/core';

import Layout from '../../components/Layout';
import DisplayGrid from '../../components/DisplayGrid';

import SearchImage from '../../assets/search.svg';

import styles from './search.module.css';

const Search = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [query, setQuery] = useState('');
  const currentPage = useRef(1);

  const { data, fetchNextPage, remove, isLoading } = useInfiniteQuery(
    'search',
    async ({ pageParam = currentPage.current }) => {
      const { data } = await axios.get(
        `/api/search?page=${pageParam}&query=${query}`
      );
      currentPage.current = currentPage.current + 1;
      return data;
    },
    {
      getNextPageParam: (lastPage) => {
        if (!shouldFetch) {
          return undefined;
        }
        if (lastPage?.data?.total_pages === currentPage.current) {
          return undefined;
        }
        return currentPage.current;
      },
      enabled: shouldFetch,
    }
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    remove();
    currentPage.current = 1;
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
        {data?.pages?.map((group, i) => (
          <DisplayGrid key={i} movies={group?.data?.results} />
        ))}
        {!data?.pages?.[0]?.data?.results?.length && (
          <SearchImage className={styles.SearchImage} />
        )}
        <Waypoint onEnter={() => fetchNextPage()} bottomOffset='-50%' />
        {isLoading && <Spinner className={styles.Loader} intent='primary' />}
      </div>
    </Layout>
  );
};

export default Search;
