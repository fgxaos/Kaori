import React from "react";
import axios from "axios";

import { Grid, Row } from "react-bootstrap";

import AnimeTile from "../components/animeTile/AnimeTile";

class Seen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listAnimes: [],
      activeTile: null,
    };
  }

  componentDidMount() {
    axios
      .get("/seen")
      .then(res => {
        this.setState({ listAnimes: res.data });
        let provShow = [];
        for (var i = 0; i < this.state.listAnimes.length(); i++) {
          provShow.push(false);
        }
        this.setState({ show: provShow });
      })
      .catch(function(err) {
        console.log(err);
      });
  }


  render() {
    return (
      <div className="watching">
        <h1>Seen</h1>
        <p>
          <Grid>
            <Row>
              {this.state.listAnimes.map(anime => (
            <AnimeTile key={anime._id} anime={anime} onClick={this.activeTile === anime._id} type="seen"/>
          ))}
            </Row>
          </Grid>
        </p>
      </div>
    );
  }
}

export default Seen;
