/*
import React from "react";

// Fonction pour récupérer URL de mangoDB
import getDbConnectionString from "../../../config/index";

class GuestBook extends Component {
  constructor(props) {
    super(props);

    this.handleAnimeDetails = this.handleAnimeDetails.bind(this);

    this.state = { AnimeDetails: "" };
  }
  handleAnimeDetails(event) {
    this.setState({ AnimeDetails: event.target.value });
  }

  addToWatchingAnime = event => {
    event.preventDefault();
    this.setState({
      AnimeDetails: event.target.value
    });
  };
  /*
  axios.post(getDbConnectionString(), { AnimeDetails: this.state.AnimeDetails })
    .then(response => {
        console.log(response, 'Anime added!');
    })
    .catch(err => {
        console.log(err, 'Anime not added, try again');
    });
    this.setState({
        AnimeDetails: ""
    });
  
}
*/
