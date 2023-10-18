import React from 'react';
import css from './TextHelper.module.css';

const TextHelper = ({ text }) => {
  return (
    <div className={css.shows}>
      <p className={css.helpers}>{text}</p>
    </div>
  );
};

export default TextHelper;
