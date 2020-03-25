import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Bookmark, BookmarkBorder, Star, StarBorder} from '@material-ui/icons';

class WatchListItem extends React.Component {
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
    const {item, watchList} = this.props;
    return (
      <>
        {watchList.findIndex(movie => movie.id === item.id) === -1 ?
          <span onClick={this.addToWatchList}><BookmarkBorder/></span> :
          <span onClick={this.removeFromWatchList}><Bookmark/></span>
        }
      </>
    )
  }
}

export default AppContextHOC(WatchListItem);