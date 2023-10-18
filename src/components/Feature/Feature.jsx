import React from 'react';
import css from './Feature.module.css';

const Feature = ({ title, value }) => {
  return (
    <p
      className={css.info__feature}
      style={{ marginBottom: title === 'Day' ? 10 : 10 }}
    >
      {title}: <span className={css.info__description}>{value}</span>
    </p>
  );
};

export default Feature;
