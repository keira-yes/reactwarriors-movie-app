import React from 'react';
import FavoriteItem from "../../Movies/FavoriteItem";
import WatchListItem from "../../Movies/WatchListItem";

class MovieInfo extends React.Component {

  getReleaseYear = (date) => {
    return new Date(date).getFullYear();
  };

  render() {
    const {
      movieDetail: {
        id,
        poster_path,
        title,
        release_date,
        vote_average,
        budget,
        genres,
        overview
      }
    } = this.props;

    return (
      <>
        <div className="col-4">
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title}/>
        </div>
        <div className="col-8">
          <h1>{title} {release_date && `(${this.getReleaseYear(release_date)})`}</h1>
          <ul className="list-group list-group-horizontal-sm mt-3">
            <li className="list-group-item list-group-item-secondary">рейтинг {vote_average}</li>
            <li className="list-group-item list-group-item-success">бюджет ${budget}</li>
            <li className="list-group-item list-group-item-danger">
              {genres && genres.map(item => <span key={item.id} className="list-item">{item.name}</span>)}
            </li>
          </ul>
          <div className="mt-4">{overview}</div>
          <div className="mt-4">
            <FavoriteItem movieId={id}/>
            <WatchListItem movieId={id}/>
          </div>
        </div>
      </>
    )
  }
}

export default MovieInfo;