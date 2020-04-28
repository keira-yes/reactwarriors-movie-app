import React from 'react';
import logo from '../../images/snail.svg';
import User from './User';
import {Link} from "react-router-dom";
import {withAuth} from "../../hoc/withAuth";

const Header = ({auth, authActions}) => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Snail logo"/>
      </Link>
      {auth.user ?
        <User /> :
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={authActions.toggleModal}
        >
          Войти
        </button>
      }
    </div>
  </nav>
);

export default withAuth(Header);
