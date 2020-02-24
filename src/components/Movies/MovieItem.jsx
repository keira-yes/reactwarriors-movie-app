import React from 'react';
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";

class MovieItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteSelected: false,
      watchlistSelected: false
    }
  }

  toggleFavorite = () => {
    const {user, session_id, item} = this.props;
    const {favoriteSelected} = this.state;
    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: !favoriteSelected
      }
    }).then(() => {
      this.setState({
        favoriteSelected: !favoriteSelected
      })
    });
  };

  toggleWatchlistSelected = () => {
    this.setState(prevState => ({
      watchlistSelected: !prevState.watchlistSelected
    }))
  };

  render() {
    const { item } = this.props;
    const { favoriteSelected, watchlistSelected } = this.state;
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
            <h6 className="card-title">{item.title}</h6>
            <div className="card-text">Рейтинг: {item.vote_average}</div>
            <span onClick={this.toggleFavorite}>
              {favoriteSelected ? <Star/> : <StarBorder/>}
            </span>
            <span onClick={this.toggleWatchlistSelected}>
              {watchlistSelected ? <Bookmark/> : <BookmarkBorder/>}
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default AppContextHOC(MovieItem);
