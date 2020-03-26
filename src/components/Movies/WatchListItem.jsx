import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Bookmark, BookmarkBorder, Star, StarBorder} from '@material-ui/icons';

class WatchListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  toggleWatchList = () => {
    const {user, session_id, item, getWatchListMovies, toggleModal} = this.props;

    if (session_id) {
      this.setState({disabled: true});

      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          watchlist: !this.isWatchListMovie()
        }
      })
        .then(() => getWatchListMovies(user, session_id))
        .then(() => this.setState({disabled: false}));
    } else {toggleModal()}
  };

  isWatchListMovie = () => {
    const {watchList, item} = this.props;
    return watchList.findIndex(movie => movie.id === item.id) !== -1;
  };

  render() {
    const {disabled} = this.state;

    return (
      <>
        {this.isWatchListMovie() ?
          <button
            type="button"
            onClick={this.toggleWatchList}
            disabled={disabled}
            className="icon-btn">
            <Bookmark/>
          </button> :
          <button
            type="button"
            onClick={this.toggleWatchList}
            disabled={disabled}
            className="icon-btn">
            <BookmarkBorder/>
          </button>
        }
      </>
    )
  }
}

export default AppContextHOC(WatchListItem);