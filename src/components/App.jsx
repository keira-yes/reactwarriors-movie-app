import React from "react";
import Header from './Header/Header';
import CallApi from "../api/api";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./Header/Login/LoginForm";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {actionCreatorUpdateUser, actionCreatorUpdateSessionId, actionCreatorLogout} from "../";

export const AppContext = React.createContext();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteList: [],
      watchList: [],
      showLoginModal: false
    }
  }

  updateUser = (user) => {
    this.props.store.dispatch(actionCreatorUpdateUser(user))
  };

  updateSessionId = (session_id) => {
    this.props.store.dispatch(actionCreatorUpdateSessionId(session_id))
  };

  onLogout = () => {
    this.setState({
      favoriteList: [],
      watchList: []
    });
    this.props.store.dispatch(actionCreatorLogout())
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
    this.props.store.subscribe(() => {
      console.log('changes', this.props.store.getState())
    });

    const {session_id} = this.props.store.getState();
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
    this.props.store.subscribe(() => {
      console.log('changes after component did update', this.props.store.getState())
    });

    const {user, session_id} = this.props.store.getState();
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

    const {user, session_id} = this.props.store.getState();

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
