import React from 'react';
import CallApi from "./../../api/api";
import {Bookmark, BookmarkBorder} from '@material-ui/icons';
import {withAuth} from "../../hoc/withAuth";
import * as authActions from "../../redux/auth/auth.actions";

class WatchListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  toggleWatchList = () => {
    const {auth, authActions, movieId} = this.props;

    if (auth.session_id) {
      this.setState({loading: true});

      CallApi.post(`/account/${auth.user.id}/watchlist`, {
        params: {
          session_id: auth.session_id
        },
        body: {
          media_type: "movie",
          media_id: movieId,
          watchlist: !this.isWatchListMovie()
        }
      })
        .then(() => authActions.fetchWatchListMovies(auth.user, auth.session_id))
        .then(() => this.setState({loading: false}));
    } else {authActions.toggleModal()}
  };

  isWatchListMovie = () => {
    const {auth, movieId} = this.props;
    return auth.watchList.some(movie => Number(movie.id) === Number(movieId));
  };

  render() {
    const {loading} = this.state;

    return (
      <button
        type="button"
        onClick={this.toggleWatchList}
        disabled={loading}
        className="icon-btn">
        {this.isWatchListMovie() ? <Bookmark/> : <BookmarkBorder/>}
      </button>
    )
  }
}

export default withAuth(WatchListItem);