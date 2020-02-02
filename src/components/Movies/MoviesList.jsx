import React from "react";
import MovieItem from "./MovieItem";
import PropTypes from "prop-types";

export const MoviesList = ({movies}) => (
  <>
    {movies.map(movie => {
      return (
        <div key={movie.id} className="col-6 mb-4">
          <MovieItem item={movie}/>
        </div>
      );
    })
    }
  </>
);

MoviesList.defaultProps = {
  movies: []
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired
};

