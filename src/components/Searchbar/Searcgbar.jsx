import React from 'react';
import css from './Searchbar.module.css';

const Searcgbar = ({ query, setSearchParams }) => {
  const handleInputChange = e => {
    const { value } = e.target;

    return value !== ''
      ? setSearchParams({ query: value })
      : setSearchParams({});
  };
  return (
    <div className={css.searchbar}>
      <input
        className={css.searchbar__input}
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Breaking Bad"
      />
    </div>
  );
};

export default Searcgbar;
