import React from 'react';
import PropTypes from 'prop-types';

export const Genres = ({genres, onChangeGenres, isChecked}) => (
  <div>
    <h6>Жанры:</h6>
    {genres.map(item => {
      return(
        <div className="form-check" key={item.id}>
          <input
            className="form-check-input"
            type="checkbox"
            name="with_genres"
            value={item.id}
            id={item.id}
            onChange={onChangeGenres}
            checked={isChecked}
          />
          <label className="form-check-label" htmlFor={item.id}>
            {item.name}
          </label>
        </div>
      )
    })}
  </div>
);

Genres.defaultProps = {
  genres: []
};

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func.isRequired,
  isChecked: PropTypes.func
};