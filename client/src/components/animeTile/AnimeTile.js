import React from "react";
import { Jumbotron, Button, Col, Modal } from "react-bootstrap";

import AnimeDetails from "./components/AnimeDetails";
import axios from "axios";

class AnimeTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      showRemove: false,
      type: this.props.type,
      buttonText: "",
    };
  }

  onHover = () => {
    // When the mouse hovers the picture, the picture should become gray and the title should appear
    // This would be more enjoyable than just a dull button with the title
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  handleCloseRemove = () => {
    this.setState({ showRemove: false });
  };

  handleShowRemove = () => {
    this.setState({ showRemove: true });
  };

  addShow = () => {
    axios
    .get(`/watching/addToWatching/${this.props.anime.numberURL}/${this.props.anime.endingURL}`)
    .then(res => {
      this.setState({ type: "watching" });
      window.location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  removeShow = () => {
    axios
    .get(`/watching/delete/${this.props.anime._id}`)
    .then(res => {
      this.handleCloseRemove();
      window.location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  rewatchShow = () => {
    axios
    .get(`/seen/changeDetails/sendWatching/${this.props.anime._id}`)
    .then(res => {
      this.handleCloseRemove();
      window.location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  render() {
    const type = this.props.type;
    let button, buttonConfirm;

    if(type === "search") {
      button = <Button bsStyle="default" onClick={this.addShow}>Add</Button>
    }
    else if(type === "watching") {
      button = <Button bsStyle="primary" onClick={this.handleShowRemove}>Remove</Button>;
      buttonConfirm = <Button bsStyle="default" onClick={this.removeShow}>Remove</Button>;
    }
    else {
      button = <Button bsStyle="default" onClick={this.handleShowRemove}>Rewatch</Button>
      buttonConfirm = <Button bsStyle="default" onClick={this.rewatchShow}>Rewatch</Button>;
    } // Cas 'else' <=> cas 'seen'


    return (
      <div>
        <Col sm={{size:'auto'}} md={{size: 'auto', offset: 2}}>
        <Jumbotron>
          <img src={this.props.anime.picture} />
          
          <h4>{this.props.anime.title}</h4>
            <Button bsStyle="primary" onClick={this.handleShow}>
              Infos
            </Button>
            {button}

            <div className="static-modal">
              <Modal show={this.state.showRemove} onHide={this.handleCloseRemove} animation={false}>
                <Modal.Dialog>
                  <Modal.Header>
                    <Modal.Title>Confirmation</Modal.Title>
                  </Modal.Header>
                
                  <Modal.Body>Are you sure you want to remove this anime from your '{this.props.type}' list?</Modal.Body>

                  <Modal.Footer>
                    <Button onClick={this.handleCloseRemove}>Cancel</Button>
                    {buttonConfirm}
                  </Modal.Footer>
                </Modal.Dialog>
              </Modal>
            </div>

          <AnimeDetails anime={this.props.anime} show={this.state.show} onClosedModal={this.handleClose} type={this.props.type}/>
        </Jumbotron>
        </Col>
      </div>
    );
  }
}

export default AnimeTile;