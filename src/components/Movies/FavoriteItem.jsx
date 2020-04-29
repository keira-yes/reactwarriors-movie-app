import React from 'react';
import CallApi from "./../../api/api";
import {Star, StarBorder} from "@material-ui/icons";
import {withAuth} from "../../hoc/withAuth";

class FavoriteItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleFavorite = () => {
    const {auth, authActions, movieId} = this.props;

    if (auth.session_id) {
      this.setState({loading: true});

      CallApi.post(`/account/${auth.user.id}/favorite`, {
        params: {
          session_id: auth.session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          favorite: !this.isFavoriteMovie()
        }
      })
        .then(() => authActions.fetchFavoriteMovies(auth.user, auth.session_id))
        .then(() => this.setState({loading: false}));
    } else {authActions.toggleModal()}
  };

  isFavoriteMovie = () => {
    const {auth, movieId} = this.props;
    return auth.favoriteList.some(movie => Number(movie.id) === Number(movieId));
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

export default withAuth(FavoriteItem);