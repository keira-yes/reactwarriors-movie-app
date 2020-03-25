import React from 'react';
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";

class MovieItem extends React.Component {

  addToFavorite = () => {
    const {user, session_id, item, getFavoriteMovies, toggleModal} = this.props;
    if (session_id) {
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          favorite: true
        }
      }).then(() => getFavoriteMovies(user, session_id));
    } else {toggleModal()}
  };

  removeFromFavorite = () => {
    const {user, session_id, item, getFavoriteMovies} = this.props;
    CallApi.post(`/account/${user.id}/favorite`, {
      params: {
        session_id: session_id
      },
      body: {
        media_type: "movie",
        media_id: item.id,
        favorite: false
      }
    }).then(() => getFavoriteMovies(user, session_id));
  };

  addToWatchList = () => {
    const {user, session_id, item, getWatchListMovies, toggleModal} = this.props;
    if (session_id) {
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          watchlist: true
        }
      }).then(() => getWatchListMovies(user, session_id));
    } else {toggleModal()}
  };

  removeFromWatchList = () => {
    const {user, session_id, item, getWatchListMovies} = this.props;
    if (session_id) {
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          watchlist: false
        }
      }).then(() => getWatchListMovies(user, session_id));
    }
  };

  render() {
    const {item, favoriteList, watchList} = this.props;
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
            {favoriteList.findIndex(movie => movie.id === item.id) === -1 ?
              <span onClick={this.addToFavorite}><StarBorder/></span> :
              <span onClick={this.removeFromFavorite}><Star/></span>
            }
            {watchList.findIndex(movie => movie.id === item.id) === -1 ?
              <span onClick={this.addToWatchList}><BookmarkBorder/></span> :
              <span onClick={this.removeFromWatchList}><Bookmark/></span>
            }
          </div>
        </div>
      </>
    );
  }
}

export default AppContextHOC(MovieItem);
