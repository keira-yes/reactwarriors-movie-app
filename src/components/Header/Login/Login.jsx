import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm";

export default class Login extends React.Component {

  render() {
    const {showLoginModal, toggleModal} = this.props;

    return (
      <>
        <Modal isOpen={showLoginModal} toggle={toggleModal}>
          <ModalBody>
            <LoginForm toggleModal={toggleModal}/>
          </ModalBody>
        </Modal>
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