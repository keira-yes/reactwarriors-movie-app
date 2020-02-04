import React from 'react';
import {AppContext} from '../App';

class User extends React.Component {
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

const UserContainer = (props) => {
  return (
    <AppContext.Consumer>
      {context => {
        return <User user={context.user} {...props} />
      }}
    </AppContext.Consumer>
  )
};

UserContainer.displayName = "UserContainer";
export default UserContainer;