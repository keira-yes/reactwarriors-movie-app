import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalBody } from "reactstrap";
import Header from './Header/Header';
import CallApi from "../api/api";
import LoginForm from "./Header/Login/LoginForm";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {updateUser, updateSessionId, onLogout} from "../actions/actions";

export const AppContext = React.createContext();

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteList: [],
      watchList: [],
      showLoginModal: false
    }
  }

  onLogoutFavoriteWatchlist = () => {
    this.setState({
      favoriteList: [],
      watchList: []
    });
  };

  toggleModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
  };

  getFavoriteMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/favorite/movies`, {
      params: {
        session_id: session_id
      }
    }).then(data => {
      this.setState({favoriteList: data.results});
    })
  };

  getWatchListMovies = (user, session_id) => {
    CallApi.get(`/account/${user.id}/watchlist/movies`, {
      params: {
        session_id: session_id
      }
    }).then(data => {
      this.setState({watchList: data.results});
    })
  };

  componentDidMount() {
    const {session_id, updateUser} = this.props;
    if(session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      })
        .then(user => {
          updateUser(user);
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {user, session_id} = this.props;
    // if (!prevState.user && user) {
    //   this.getFavoriteMovies(user, session_id);
    //   this.getWatchListMovies(user, session_id);
    // }
  }

  render() {
    const {
      favoriteList,
      watchList,
      showLoginModal
    } = this.state;

    const {user, session_id, updateUser, updateSessionId, onLogout} = this.props;

    return (
      <Router>
        <AppContext.Provider value={{
          user: user,
          updateUser,
          session_id: session_id,
          updateSessionId,
          onLogout,
          favoriteList: favoriteList,
          getFavoriteMovies: this.getFavoriteMovies,
          watchList: watchList,
          getWatchListMovies: this.getWatchListMovies,
          showLoginModal: showLoginModal,
          toggleModal: this.toggleModal
        }}>
          <>
            <Header/>
            <Modal isOpen={showLoginModal} toggle={this.toggleModal}>
              <ModalBody>
                <LoginForm toggleModal={this.toggleModal}/>
              </ModalBody>
            </Modal>
            <Route exact path="/" component={MoviesPage} />
            <Route path="/movie/:movie_id/:tab" component={MoviePage} />
          </>
        </AppContext.Provider>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id
  }
};

const mapDispatchToProps = {
  updateUser,
  updateSessionId,
  onLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
