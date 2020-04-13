import React from "react";
import Header from './Header/Header';
import CallApi from "../api/api";
import Cookies from 'universal-cookie';
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./Header/Login/LoginForm";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      session_id: cookies.get("session_id") || null,
      favoriteList: [],
      watchList: [],
      showLoginModal: false
    }
  }

  updateUser = (user) => {
    this.setState({
      user
    })
  };

  updateSessionId = (session_id) => {
    cookies.set('session_id', session_id, {
      path: '/',
      maxAge: 2592000
    });
    this.setState({
      session_id
    })
  };

  onLogout = () => {
    cookies.remove('session_id');
    this.setState({
      user: null,
      session_id: null,
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
    const {session_id} = this.state;
    if(session_id) {
      CallApi.get("/account", {
        params: {
          session_id: session_id
        }
      })
        .then(user => {
          this.updateUser(user);
        })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {user, session_id} = this.state;
    if (!prevState.user && user) {
      this.getFavoriteMovies(user, session_id);
      this.getWatchListMovies(user, session_id);
    }
  }

  render() {
    const {
      user,
      session_id,
      favoriteList,
      watchList,
      showLoginModal
    } = this.state;

    return (
      <Router>
        <AppContext.Provider value={{
          user: user,
          updateUser: this.updateUser,
          session_id: session_id,
          updateSessionId: this.updateSessionId,
          onLogout: this.onLogout,
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
