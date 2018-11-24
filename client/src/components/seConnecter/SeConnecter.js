import React from "react";
import { Modal, Button, Popover, OverlayTrigger } from "react-bootstrap";

import ConnexionForm from "./components/FormConnexion.js";

class ConnexionWindow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  // Rajouter une image dans le <Modal.Body>
  render() {
    const popover = (
      <Popover id="modal-popover" title="Pourquoi se  connecter ?">
        Pour avoir accès à de nombreux services !
      </Popover>
    );

    return (
      <div>
        <p>Vous n'êtes pas encore connecté !</p>

        <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
          Se connecter
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <OverlayTrigger overlay={popover}>
                <a href="#popover">Connexion</a>
              </OverlayTrigger>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ConnexionForm />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ConnexionWindow;
