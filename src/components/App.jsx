import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { Modal, ModalBody } from "reactstrap";
import Header from './Header/Header';
import LoginForm from "./Header/Login/LoginForm";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {
  updateUser,
  updateSessionId,
  onLogout,
  updateFavoriteMovies,
  updateWatchListMovies,
  toggleModal,
  fetchAuth,
  fetchFavoriteMovies,
  fetchWatchListMovies
} from "../redux/auth/auth.actions";

export const AppContext = React.createContext();

class App extends React.Component {

  componentDidMount() {
    const {session_id, fetchAuth} = this.props;
    if (session_id) {
      fetchAuth(session_id)
    }
  }

  componentDidUpdate(prevProps) {
    const {user, session_id, fetchFavoriteMovies, fetchWatchListMovies} = this.props;
    if (!prevProps.user && user) {
      fetchFavoriteMovies(user, session_id);
      fetchWatchListMovies(user, session_id);
    }
  }

  render() {

    const {
      user,
      session_id,
      updateUser,
      updateSessionId,
      onLogout,
      favoriteList,
      watchList,
      showLoginModal,
      toggleModal
    } = this.props;

    return (
      <Router>
        <AppContext.Provider value={{
          user,
          updateUser,
          session_id,
          updateSessionId,
          onLogout,
          favoriteList,
          getFavoriteMovies: fetchFavoriteMovies,
          watchList,
          getWatchListMovies: fetchWatchListMovies,
          showLoginModal,
          toggleModal
        }}>
          <>
            <Header/>
            <Modal isOpen={showLoginModal} toggle={toggleModal}>
              <ModalBody>
                <LoginForm toggleModal={toggleModal}/>
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

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    session_id: state.auth.session_id,
    favoriteList: state.auth.favoriteList,
    watchList: state.auth.watchList,
    showLoginModal: state.auth.showLoginModal
  }
};

const mapDispatchToProps = {
  updateUser,
  updateSessionId,
  onLogout,
  updateFavoriteMovies,
  updateWatchListMovies,
  toggleModal,
  fetchAuth,
  fetchFavoriteMovies,
  fetchWatchListMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
