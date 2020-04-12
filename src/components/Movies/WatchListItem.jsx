import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Bookmark, BookmarkBorder} from '@material-ui/icons';

class WatchListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleWatchList = () => {
    const {user, session_id, movieId, getWatchListMovies, toggleModal} = this.props;

    if (session_id) {
      this.setState({loading: true});

      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          watchlist: !this.isWatchListMovie()
        }
      })
        .then(() => getWatchListMovies(user, session_id))
        .then(() => this.setState({loading: false}));
    } else {toggleModal()}
  };

  isWatchListMovie = () => {
    const {watchList, movieId} = this.props;
    return watchList.some(movie => movie.id === movieId);
  };

  render() {
    const {loading} = this.state;

    return (
      <>
        {this.isWatchListMovie() ?
          <button
            type="button"
            onClick={this.toggleWatchList}
            disabled={loading}
            className="icon-btn">
            <Bookmark/>
          </button> :
          <button
            type="button"
            onClick={this.toggleWatchList}
            disabled={loading}
            className="icon-btn">
            <BookmarkBorder/>
          </button>
        }
      </>
    )
  }
}

export default AppContextHOC(WatchListItem);