import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Star, StarBorder} from "@material-ui/icons";

class FavoriteItem extends React.Component {
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

  render() {
    const {item, favoriteList} = this.props;
    return (
      <>
        {favoriteList.findIndex(movie => movie.id === item.id) === -1 ?
          <span onClick={this.addToFavorite}><StarBorder/></span> :
          <span onClick={this.removeFromFavorite}><Star/></span>
        }
      </>
    )
  }
}

export default AppContextHOC(FavoriteItem);