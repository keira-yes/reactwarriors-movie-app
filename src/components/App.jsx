import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import Header from './Header/Header';
import LoginForm from "./Header/Login/LoginForm";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import {withAuth} from "../hoc/withAuth";

class App extends React.Component {

  componentDidMount() {
    const {auth, authActions} = this.props;
    if (auth.session_id) {
      authActions.fetchAuth(auth.session_id)
    }
  }

  componentDidUpdate(prevProps) {
    const {auth, authActions} = this.props;
    if (!prevProps.auth.user && auth.user) {
      authActions.fetchFavoriteMovies(auth.user, auth.session_id);
      authActions.fetchWatchListMovies(auth.user, auth.session_id);
    }
  }

  render() {
    const {auth, authActions} = this.props;

    return (
      <Router>
        <Header/>
        <Modal isOpen={auth.showLoginModal} toggle={authActions.toggleModal}>
          <ModalBody>
            <LoginForm toggleModal={authActions.toggleModal}/>
          </ModalBody>
        </Modal>
        <Route exact path="/" component={MoviesPage} />
        <Route path="/movie/:movie_id/:tab" component={MoviePage} />
      </Router>
    );
  }
}

export default withAuth(App);
