import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

const baseURL = 'https://api.tvmaze.com';

const ShowDetails = () => {
  const { showID } = useParams();
  const [showDetails, setShowDetails] = useState({});
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(`
      ${baseURL}/shows/${showID}`);
        if (!response.ok) {
          return new Error('Something went wrong');
        }
        const data = await response.json();

        setShowDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShowDetails();
  }, [showID]);

  console.log('showDetails', showDetails);

  if (!showDetails.name) {
    return;
  }

  const {
    image: { medium },
    name,
    genres,
    rating,
    officialSite,
    status,
    schedule,
    summary,
  } = showDetails;

  return (
    <>
      <Link to={backLinkLocationRef.current}>Go Back</Link>
      <div style={{ display: 'flex' }}>
        <img
          src={`${medium}`}
          alt={`${name}`}
          style={{ display: 'block', width: 200, height: 300, marginRight: 20 }}
        />
        <div>
          <p>Name: {name}</p>
          <p>Rating: {rating.average}</p>
          <p>Genres: {genres}</p>
          <p>Link: {officialSite}</p>
          <p>Status: {status}</p>
          <p>
            Schedule: time: {schedule.time} | days: {schedule.days[0]}
          </p>
          <>{summary}</>
        </div>
      </div>
    </>
  );
};

export default ShowDetails;
