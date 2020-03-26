import React from 'react';

export default class Login extends React.Component {

  render() {
    const {showLoginModal, toggleModal} = this.props;

    return (
      <>

        <button
          type="button"
          className="btn btn-outline-light"
          onClick={toggleModal}
        >
          Войти
        </button>
      </>
    )
  }
}