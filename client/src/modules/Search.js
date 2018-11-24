import React from "react";
import {Grid, Row} from "react-bootstrap";

import AnimeTile from "../components/animeTile/AnimeTile";
import SearchBar from "../components/searchPage/SearchBar";
//import SearchResults from "../components/searchResults/SearchResults";

class Search extends React.Component {
  // Perhaps add an "add/remove" button on the Anime Tile

  constructor(props) {
    super(props);

    this.state = {
      listAnimesSearch: [],
      activeTile: null
    };
  }

  componentDidMount() {
  }

  handleSearchChange = (listAnimes) => {
    this.setState({listAnimesSearch: listAnimes});
  }

  render() {
    return (
      <div className="search">
        <h1>Search</h1>
        <div className="searchBar">
          <SearchBar onSearchChange={this.handleSearchChange}/>
        </div>
        <div className="searchResult">
          <p>
            <Grid>
              <Row>
              {this.state.listAnimesSearch.map(anime => (
              <AnimeTile key={anime._id} anime={anime} onClick={this.activeTile === anime._id} type="search"/>
            ))}
              </Row>
            </Grid>

          </p>
        </div>
      </div>
    );
  }
}

export default Search;
