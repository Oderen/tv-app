import React, { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import _ from 'lodash';

import Loader from 'components/Loader';
import Searchbar from '../components/Searchbar';
import TextHelper from 'components/TextHelper';
import ShowList from 'components/ShowList';
import { useSearchParams } from 'react-router-dom';

const baseURL = 'https://api.tvmaze.com';

const HomePage = () => {
  const timeOut = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState('idle');

  const fetchShows = useCallback(async query => {
    try {
      setStatus('pending');
      const response = await fetch(`
      ${baseURL}/search/shows?q=${query}`);
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      setShows(data);
      setStatus('resolved');
    } catch (error) {
      console.log(error);
      setStatus('rejected');
    }
  }, []);

  useEffect(() => {
    clearTimeout(timeOut.current);
    if (query.trim().length < 2) return;
    timeOut.current = setTimeout(() => fetchShows(query), 500);
  }, [query, fetchShows]);

  const shouldRenderHelperText = query.trim().length < 2;

  return (
    <>
      <div className="container">
        <Searchbar query={query} setSearchParams={setSearchParams} />

        {status === 'rejected' && (
          <TextHelper text={'Oops, looks like something went wront'} />
        )}

        {status === 'pending' ? (
          <Loader />
        ) : (
          <>
            {shouldRenderHelperText ? (
              <TextHelper text={"Type the show's name"} />
            ) : (
              <ShowList shows={shows} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
