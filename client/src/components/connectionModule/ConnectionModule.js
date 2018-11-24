import React from "react";

import { Modal } from "react-bootstrap";

class ConnectionModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonText: "Login",
            show: false
        }
    }
    
    handleClose = () => {
        this.setState({show: false});
    };

    handleShow = () => {
        this.setState({show: true});
    };

    handleLog = () => {
        if(this.state.buttonText === "Login") {
            this.setState({buttonText: "Logout"});
        }
        else {
            this.setState({buttonText: "Login"});
        }
    }

    render() {
        return(
            <div id="connection-module">
            <Button bsStyle="primary" onClick={this.handleLog}>
                {this.state.buttonText}
            </Button>

            <div className="static-modal" id="connection-module-modal">
              <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                
                  <Modal.Body>Are you sure you want to remove this anime from your 'watching' list?</Modal.Body>

                  <Modal.Footer>
                    <Button onClick={this.handleCloseRemove}>Cancel</Button>
                    <Button bsStyle="default" onClick={this.removeShow}>Remove</Button>
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </div>
            </div>
        )
    }
};

export default ConnectionModule;