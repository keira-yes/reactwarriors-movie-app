import React from 'react';
import logo from '../../images/snail.svg';
import Login from './Login/Login';

export default class Header extends React.Component {

  render() {

    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Snail logo"/>
          </a>
          <Login />
        </div>
      </nav>
    )
  }
}
