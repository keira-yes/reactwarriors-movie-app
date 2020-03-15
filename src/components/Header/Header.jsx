import React from 'react';
import logo from '../../images/snail.svg';
import Login from './Login/Login';
import User from './User';

export const Header = ({user, showModal, toggleModal}) => (
  <nav className="navbar navbar-dark bg-dark">
    <div className="container">
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Snail logo"/>
      </a>
      {user ? <User /> :
        <Login
          toggleModal={toggleModal}
          showModal={showModal}
        />
      }
    </div>
  </nav>
);
