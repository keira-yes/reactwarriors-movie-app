import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Star, StarBorder} from "@material-ui/icons";

class FavoriteItem extends React.Component {

  toggleFavorite = () => {
    const {user, session_id, item, getFavoriteMovies, toggleModal} = this.props;
    if (session_id) {
      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: item.id,
          favorite: !this.isFavoriteMovie()
        }
      }).then(() => getFavoriteMovies(user, session_id));
    } else {toggleModal()}
  };

  isFavoriteMovie = () => {
    const {favoriteList, item} = this.props;
    return favoriteList.findIndex(movie => movie.id === item.id) !== -1;
  };

  render() {
    return (
      <>
        {this.isFavoriteMovie() ?
          <span onClick={this.toggleFavorite}><Star/></span> :
          <span onClick={this.toggleFavorite}><StarBorder/></span>
        }
      </>
    )
  }
}

export default AppContextHOC(FavoriteItem);