import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm";

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      showModal: false
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  };

  render() {
    const {showModal} = this.state;
    const {updateUser, updateSessionId} = this.props;

    return (
      <>
        <Modal isOpen={showModal} toggle={this.toggleModal}>
          <ModalBody>
            <LoginForm
              updateUser={updateUser}
              updateSessionId={updateSessionId}
            />
          </ModalBody>
        </Modal>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={this.toggleModal}
        >
          Войти
        </button>
      </>
    )
  }
}