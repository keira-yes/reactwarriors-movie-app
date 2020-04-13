import React from 'react';
import logo from '../../images/snail.svg';
import User from './User';
import AppContextHOC from "../HOC/AppContextHOC";
import {Link} from "react-router-dom";

const Header = ({user, toggleModal}) => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        <img src={logo} alt="Snail logo"/>
      </Link>
      {user ?
        <User /> :
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={toggleModal}
        >
          Войти
        </button>
      }
    </div>
  </nav>
);

export default AppContextHOC(Header);
