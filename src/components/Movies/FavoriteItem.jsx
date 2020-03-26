import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Star, StarBorder} from "@material-ui/icons";

class FavoriteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  toggleFavorite = () => {
    const {user, session_id, item, getFavoriteMovies, toggleModal} = this.props;

    this.setState({disabled: true});

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
      })
        .then(() => getFavoriteMovies(user, session_id))
        .then(() => this.setState({disabled: false}));
    } else {toggleModal()}
  };

  isFavoriteMovie = () => {
    const {favoriteList, item} = this.props;
    return favoriteList.findIndex(movie => movie.id === item.id) !== -1;
  };

  render() {
    const {disabled} = this.state;

    return (
      <>
        {this.isFavoriteMovie() ?
          <button
            type="button"
            onClick={this.toggleFavorite}
            disabled={disabled}
            className="icon-btn">
            <Star/>
          </button> :
          <button
            type="button"
            onClick={this.toggleFavorite}
            disabled={disabled}
            className="icon-btn">
            <StarBorder/>
          </button>
        }
      </>
    )
  }
}

export default AppContextHOC(FavoriteItem);