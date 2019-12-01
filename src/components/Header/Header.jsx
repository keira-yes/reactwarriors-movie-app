import React from 'react';
import logo from '../../images/snail.svg';
import Login from './Login/Login';
import User from './User';

export default class Header extends React.Component {

  render() {
  const {user, updateUser} = this.props;

    return (
      <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="Snail logo"/>
          </a>
          {user ? <User user={user}/> : <Login updateUser={updateUser}/>}
        </div>
      </nav>
    )
  }
}
