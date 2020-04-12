import React from 'react';
import AppContextHOC from "../HOC/AppContextHOC";
import CallApi from "./../../api/api";
import {Star, StarBorder} from "@material-ui/icons";

class FavoriteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleFavorite = () => {
    const {user, session_id, movieId, getFavoriteMovies, toggleModal} = this.props;

    if (session_id) {
      this.setState({loading: true});

      CallApi.post(`/account/${user.id}/favorite`, {
        params: {
          session_id: session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite: !this.isFavoriteMovie()
        }
      })
        .then(() => getFavoriteMovies(user, session_id))
        .then(() => this.setState({loading: false}));
    } else {toggleModal()}
  };

  isFavoriteMovie = () => {
    const {favoriteList, movieId} = this.props;
    return favoriteList.some(movie => movie.id === +movieId);
  };

  render() {
    const {loading} = this.state;
    return (
      <button
        type="button"
        onClick={this.toggleFavorite}
        disabled={loading}
        className="icon-btn">
        {this.isFavoriteMovie() ? <Star/> : <StarBorder/>}
      </button>
    )
  }
}

export default AppContextHOC(FavoriteItem);