import React from "react";
import { ListGroup, ListGroupItem, Checkbox } from "react-bootstrap";
import axios from "axios";

class EpisodesCheck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        listNameEpisodes : [],
        listWatchProgress: [],
    }
  }

  componentDidMount() {
      this.setState({listWatchProgress: this.props.anime.episodeSeen});
      axios.get(`extractMAL/searchAnime/${this.props.numberURL}/${this.props.endingURL}/episodesNames`)
        .then(res => {
            this.setState({listNameEpisodes : res.data});
            // Then we'll have to update the results in the parent component (animeDetails)
        })
        .catch(function(err) {
            console.log(err);
        });
  }

  handleCheck = (event) => {
      let index = event.target.value;
      let listNewWatch = this.state.listWatchProgress;
      listNewWatch[index] = !this.state.listWatchProgress[index];
      this.setState({listWatchProgress: listNewWatch});

      // Fix for axios POST : normal syntax doesn't work, so had to add the 'params' variable
      const params = new URLSearchParams();
      params.append('listProgress', this.state.listWatchProgress);
      axios.post(`watching/changeDetails/${this.props.anime._id}`, params)
      // And now, we update the value of each episode seen (later, we can replace this by a 'Save changes' button, to save only once)
      .then(res => {
        console.log("Success!");
      })
      .catch(function(err) {
          console.log(err);
      });
  };

  render() {
    return (
    <div className="anime-details-episodes">
        <ListGroup>
            {this.state.listNameEpisodes.map((episode, index) => (
                <ListGroupItem header={episode.episodeTitle}>
                    {episode.aired}
                    <input
                        className="episode_checkbox"
                        type="checkbox"
                        value={index}
                        onChange={this.handleCheck}
                        checked={this.state.listWatchProgress[index]}                        
                    />
                </ListGroupItem>
            ))}
        </ListGroup>
    </div>
    );
  }
}

export default EpisodesCheck;
