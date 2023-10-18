import React from 'react';
import css from './ShowList.module.css';
import { useNavigate } from 'react-router-dom';
import TextHelper from 'components/TextHelper';

const ShowList = ({ shows }) => {
  const navigate = useNavigate();

  const navigateToShowDetails = id => {
    navigate(`/${id}`);
  };

  const status = 'resolved';

  return status === 'resolved' && shows.length === 0 ? (
    <TextHelper text={'Sorry, nothing found with this search'} />
  ) : (
    <ul className={css.shows__list}>
      {shows.map(item => {
        const {
          id,
          image,
          name,
          rating: { average },
        } = item.show;

        const showRating = average ? average : 'N/A';
        const showImage = image
          ? image.medium
          : require('../../assets/skeleton.jpg');

        return (
          <li
            key={id}
            className={css.card}
            onClick={() => navigateToShowDetails(id)}
          >
            <div className={css['image-container']}>
              <img src={showImage} alt={name} className={css.image} />
            </div>

            <div className={css.description}>
              <p className={css.description__info}>
                Name:{' '}
                <span style={{ color: 'orange', marginLeft: 10 }}>{name}</span>
              </p>
              <div className={css.description__info}>
                Rating:{' '}
                <div
                  className={css.description__decoration}
                  style={{ width: average ? 25 : 30 }}
                >
                  <p className={css.description__rate}>{showRating}</p>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ShowList;
