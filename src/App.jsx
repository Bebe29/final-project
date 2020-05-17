import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./views/screens/Home/Home";
import NavbarUI from "./views/components/Navbar/Navbar";
import Register from "./views/screens/Auth/Register/Register";

class App extends Component {
  render() {
    return (
      <>
        <NavbarUI />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
