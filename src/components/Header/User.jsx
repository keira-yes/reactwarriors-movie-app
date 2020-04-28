import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CallApi from "../../api/api";
import {withAuth} from "../../hoc/withAuth";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    }
  }

  toggleDropdownOpen = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  };

  handleLogout = () => {
    const {auth, authActions} = this.props;
    CallApi.delete("/authentication/session", {
      body: {
        session_id: auth.session_id
      }
    }).then(() => {
      authActions.onLogout()
    })
  };

  render() {
    const {dropdownOpen} = this.state;
    const {auth} = this.props;
    return (
      <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropdownOpen}>
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
          <img
            className="rounded-circle"
            width="40"
            src={`https://secure.gravatar.com/avatar/${auth.user.avatar.gravatar.hash}.jpg?s=64`}
            alt="User" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogout}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default withAuth(User);