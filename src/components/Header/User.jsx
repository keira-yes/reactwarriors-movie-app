import React from 'react';

export default class User extends React.Component {
  render() {
    const {user} = this.props;
    return (
      <img
        className="rounded-circle"
        width="40"
        src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
        alt="User" />
    )
  }
}