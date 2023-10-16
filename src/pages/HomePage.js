import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const baseURL = 'https://api.tvmaze.com';

const HomePage = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch(`
      ${baseURL}/search/shows?q=girls`);
        if (!response.ok) {
          throw new Error('Error');
        }

        const data = await response.json();
        console.log(data);
        setShows(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchShows();
  }, []);
  return (
    <div className="App">
      <ul style={{ padding: 0, marginTop: 40 }}>
        {shows.map(
          ({
            show: {
              id,
              image: { medium },
              name,
              rating,
            },
          }) => {
            return (
              <li key={id} style={{ display: 'flex', marginTop: 20 }}>
                <Link to={`/${id}`}>
                  <img
                    src={`${medium}`}
                    alt={`${name}`}
                    style={{ marginRight: 20 }}
                  />
                  <div>
                    <p>Name: {name}</p>
                    <p>Rating: {rating.average}</p>
                  </div>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};

export default HomePage;
