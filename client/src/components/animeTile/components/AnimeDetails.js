import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import EpisodesCheck from "./episodesCheck";

class AnimeDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => {
    this.setState({show: false});
    this.props.onClosedModal();
  }

  sendWatchingSeen = () => {
    axios
    .post(`/watching/changeDetails/sendSeen/${this.props.anime._id}`)
    .then(res => {
      this.handleClose();
      window.location.reload();
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    let buttonSend;
    if(this.props.type === "watching") {
      buttonSend = <Button bsStyle="primary" onClick={this.sendWatchingSeen}>Seen</Button>;
    }

    return (
    <div className="anime-details">
      <Modal show={this.props.show} onHide={this.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h1>{this.props.anime.title}</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Synopsis</h4>
          <p>{this.props.anime.synopsis}</p>
          <p>Premiered: {this.props.anime.premiered}</p>
          <p>Status: {this.props.anime.status}</p>
          <p>Studios: {this.props.anime.studios}</p>
          <p>Genres: {this.props.anime.genres}</p>
          <p>Rating: {this.props.anime.rating}</p>
          <p>Ranked: {this.props.anime.ranked}</p>
          <p>Popularity: {this.props.anime.popularity}</p>
          <p>Nature: {this.props.anime.nature}</p>
          <p>Score: {this.props.anime.score}</p>
          <h4>Episodes : </h4>
          <p><EpisodesCheck anime={this.props.anime} numberURL={this.props.anime.numberURL} endingURL={this.props.anime.endingURL}/></p>
        </Modal.Body>
        <Modal.Footer>
          {buttonSend}
          <Button onClick={this.handleClose}>Fermer </Button>
        </Modal.Footer>
      </Modal>
    </div>
    );
  }
}

export default AnimeDetails;