import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Bookmark, BookmarkBorder} from '@material-ui/icons';

class WatchListItem extends React.Component {

  toggleWatchList = () => {
    const {user, session_id, item, getWatchListMovies, toggleModal} = this.props;
    if (session_id) {
      CallApi.post(`/account/${user.id}/watchlist`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          watchlist: !this.isWatchListMovie()
        }
      }).then(() => getWatchListMovies(user, session_id));
    } else {toggleModal()}
  };

  isWatchListMovie = () => {
    const {watchList, item} = this.props;
    return watchList.findIndex(movie => movie.id === item.id) !== -1;
  };

  render() {
    return (
      <>
        {this.isWatchListMovie() ?
          <span onClick={this.toggleWatchList}><Bookmark/></span> :
          <span onClick={this.toggleWatchList}><BookmarkBorder/></span>
        }
      </>
    )
  }
}

export default AppContextHOC(WatchListItem);