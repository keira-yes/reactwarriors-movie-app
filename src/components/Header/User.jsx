import React from 'react';
import AppContextHOC from "./../HOC/AppContextHOC";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CallApi from "../../api/api";

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
    CallApi.delete("/authentication/session", {
      body: {
        session_id: this.props.session_id
      }
    }).then(() => {
      this.props.onLogout()
    })
  };

  render() {
    const {dropdownOpen} = this.state;
    const {user} = this.props;
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
            src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64`}
            alt="User" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={this.handleLogout}>Выйти</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default AppContextHOC(User);