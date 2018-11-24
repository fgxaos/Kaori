import React from "react";
import { Button, Alert } from "react-bootstrap";

import ConnexionForm from "./seConnecter/components/FormConnexion.js";
import ConnexionWindow from "./seConnecter/SeConnecter.js";

class AlertConnexion extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: true,
      shouldRenderConnexionForm: false
    };
  }

  handleDismiss = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleClick = () => {
    this.setState(prevState => ({
      shouldRenderConnexionForm: !prevState.shouldRenderConnexionForm
    }));
  };

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <h4> Vous n'êtes pas encore connecté !</h4>
          <p>
            <Button bsStyle="danger" onClick={this.handleClick}>
              {" "}
              Connexion{" "}
            </Button>
            <span> ou </span>
            <Button onClick={this.handleDismiss}> Continuer </Button>
            {this.state.shouldRenderConnexionForm && <ConnexionForm />}
          </p>
        </Alert>
      );
    }

    return <Button onClick={this.handleShow}>Show Alert</Button>;
  }
}

export default AlertConnexion;
