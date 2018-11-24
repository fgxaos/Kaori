import React from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from "axios";

// Remplacer "Search" par une image de loupe

class SearchRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "", results: []};
  }

  handleInputChange = evt => {
    this.setState({ value: evt.target.value });
  };

  handleSubmit = () => {
    axios.get(`/extractMAL/searchAnime/${this.state.value}`)
      .then(res => {
        this.setState({ results: res.data });
        this.props.onSearchChange(res.data);
      })
      .catch(function(err) {
        console.log(err);
      });
  }


// If this works, replace "handleSubmit" by "getInfo", it will be more explicit

  render() {
    return (
      <div className="searchBar">
        <form onSubmit={this.handleSubmit}>
           <FormGroup controlId="formInlineName">
             <FormControl
               type="text"
               ref={input => this.search = input}
               value={this.state.value}
               onChange={this.handleInputChange}
               placeholder="Search anime"
             />
           </FormGroup>{" "}
           <Button
             className="search_button"
             onClick={this.handleSubmit}
           >
             Search
           </Button>
        </form>
      </div>
    );
  }
}

export default SearchRequest;

/*
           <Button
             type="submit"
             className="search_button"
           >

*/