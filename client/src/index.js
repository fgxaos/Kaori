import React from "react";
// import { Route } from "react-router";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import About from "./modules/About";
import Account from "./modules/Account";
import Search from "./modules/Search";
import Watching from "./modules/Watching";
import Seen from "./modules/Seen";

import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/about" component={About} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/watching" component={Watching} />
      <Route exact path="/seen" component={Seen}/>
    </Switch>
  </main>
);

ReactDOM.render(
  <div id="root">
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </div>,
  document.getElementById("root")
);
registerServiceWorker();
