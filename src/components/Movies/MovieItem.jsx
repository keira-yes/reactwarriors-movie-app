import React from 'react';
import FavoriteItem from './FavoriteItem';
import WatchListItem from './WatchListItem';
import {Link} from "react-router-dom";

class MovieItem extends React.Component {

  render() {
    const {item} = this.props;

    return (
      <>
        <div className="card" style={{ width: "100%" }}>
          <img
            className="card-img-top card-img--height"
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
            alt={item.title}
          />
          <div className="card-body">
            <h6 className="card-title"><Link to={`/movie/${item.id}/detail`}>{item.title}</Link></h6>
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <FavoriteItem movieId={item.id}/>
            <WatchListItem movieId={item.id}/>
          </div>
        </div>
      </>
    );
  }
}

export default MovieItem;
