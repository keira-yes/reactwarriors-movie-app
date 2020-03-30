import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import FavoriteItem from './FavoriteItem';
import WatchListItem from './WatchListItem';
import {Link} from "react-router-dom";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);
  }

  convertString = (str) => {
    return str.toLowerCase().split(':').join('').replace(/ /g, '_');
  };

  render() {
    const {item} = this.props;
    const movie_name_url = this.convertString(item.original_title);

    return (
      <>
        <div className="card" style={{ width: "100%" }}>
          <img
            className="card-img-top card-img--height"
            src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
            alt=""
          />
          <div className="card-body">
            <h6 className="card-title"><Link to={`/movie/${item.id}/${movie_name_url}`}>{item.title}</Link></h6>
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <FavoriteItem item={item}/>
            <WatchListItem item={item}/>
          </div>
        </div>
      </>
    );
  }
}

export default AppContextHOC(MovieItem);
