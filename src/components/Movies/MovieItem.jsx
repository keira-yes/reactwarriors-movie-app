import React from 'react';
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons';

export default class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteSelected: false,
      watchlistSelected: false
    }
  }

  toggleFavoriteSelected = () => {
    this.setState(prevState => ({
      favoriteSelected: !prevState.favoriteSelected
    }))
  };

  toggleWatchlistSelected = () => {
    this.setState(prevState => ({
      watchlistSelected: !prevState.watchlistSelected
    }))
  };

  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>
        <img
          className="card-img-top card-img--height"
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
          <span onClick={this.toggleFavoriteSelected}>
            {this.state.favoriteSelected ? <Star/> : <StarBorder/>}
          </span>
          <span onClick={this.toggleWatchlistSelected}>
            {this.state.watchlistSelected ? <Bookmark/> : <BookmarkBorder/>}
          </span>
        </div>
      </div>
    );
  }
}
