import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import css from './ShowDetails.module.css';

import Loader from 'components/Loader';
import TextHelper from 'components/TextHelper';
import Feature from 'components/Feature';

const baseURL = 'https://api.tvmaze.com';

const ShowDetails = () => {
  const { showID } = useParams();
  const [showDetails, setShowDetails] = useState({});
  const location = useLocation();

  const [loadStatus, setLoadStatus] = useState('idle');

  const backLinkLocationRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoadStatus('pending');
        const response = await fetch(`
      ${baseURL}/shows/${showID}`);
        if (!response.ok) {
          return new Error('Something went wrong');
        }
        const data = await response.json();

        setShowDetails(data);
        setLoadStatus('resolved');
      } catch (error) {
        console.log(error);
        setLoadStatus('rejected');
      }
    };
    fetchShowDetails();
  }, [showID]);

  if (!showDetails.name) {
    return;
  }

  const {
    image,
    name,
    genres,
    rating,
    officialSite,
    status,
    schedule: { time, days },
    summary,
  } = showDetails;

  const showImage = image ? image.medium : require('../../assets/skeleton.jpg');
  const showSite = officialSite ? officialSite : 'not available';
  const showTime = time !== '' ? time : 'not available';
  const showRating = rating.average ? rating.average : 'N/A';
  const showDay = days.length > 0 ? days.join(' ') : 'unknown';
  const showGenres = genres.length > 0 ? genres.join(', ') : 'no info';
  const showStatus = status ? status : 'unknown';

  return (
    <div className="container">
      {loadStatus === 'pending' && <Loader />}
      {loadStatus === 'rejected' && (
        <TextHelper text={'Oops, looks like something went wront'} />
      )}
      {loadStatus === 'resolved' && (
        <div style={{ color: 'white' }}>
          <Link to={backLinkLocationRef.current} className={css.goBackLink}>
            Go Back
          </Link>

          <div style={{ display: 'flex' }}>
            <div className={css['image-container']}>
              <img src={showImage} alt={name} className={css.image} />
            </div>

            <div className={css.info}>
              <Feature title={'Name'} value={name} />
              <Feature title={'Rating'} value={showRating} />
              <Feature title={'Genres'} value={showGenres} />
              <p style={{ color: 'orange', fontWeight: 800, marginBottom: 10 }}>
                Link:
                {showSite === 'not available' ? (
                  <span
                    style={{
                      marginLeft: 10,

                      fontWeight: 'normal',
                      color: 'white',
                    }}
                  >
                    {showSite}
                  </span>
                ) : (
                  <a href={`${showSite}`} className={css.info__link}>
                    {showSite}
                  </a>
                )}
              </p>
              <Feature title={'Status'} value={showStatus} />
              <div className={css.info__block}>
                <Feature title={'Time'} value={showTime} />
                <Feature
                  title={'Day'}
                  value={showDay}
                  style={{ marginBottom: 10 }}
                />
              </div>

              <p style={{ color: 'orange', fontWeight: 800, marginBottom: 10 }}>
                Description:
              </p>

              {summary ? (
                <div
                  dangerouslySetInnerHTML={{ __html: summary }}
                  style={{ lineHeight: 1.5 }}
                ></div>
              ) : (
                'no info'
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
