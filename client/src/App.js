import React from "react";
import logo from "./logo.svg";
import "./App.css";

import AlertConnexion from "./components/ConnexionInitiale.js";
import TabsSections from "./components/sections/Sections.js";
import KaoriNavBar from "./components/kaoriNavBar/KaoriNavBar.js";

// Si l'utilisateur est connecté, afficher les menus "Watching" et "Seen"
// Sinon, laisser les champs vides jusqu'à ce que l'utilisateur se connecte

class App extends React.Component {
  state = {
    response: "", 
    sectionKey: 1,
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSectionChange = (section) => {
    this.setState({sectionKey: section});
  }

  render() {
    const isLoggedIn = this.state.response.user;
    let alert;
    if (isLoggedIn === "?") {
      alert = <AlertConnexion />;
    } else {
      alert = <p> Bienvenue {this.state.response.user} ! </p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Kaori</h1>
        </header>
        <div className="AlerteConnexion">{alert}</div>
        <p className="App-intro">{this.state.response.message}</p>
        <TabsSections onSectionChange={this.handleSectionChange}/>
      </div>
    );
  }
}

// Display the search bar only for : Search, Watching, Seen
// It has a different role in Search and in Watching/Seen (search on the internet or in the DB)

export default App;
