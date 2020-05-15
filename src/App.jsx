import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./views/screens/Home/Home";
import NavbarUI from "./views/components/Navbar/Navbar";

class App extends Component {
  render() {
    return (
      <>
        <NavbarUI />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </>
      // <div>
      //   <h1>Hello</h1>
      //   <h2>Hello</h2>
      //   <h3>Hello</h3>
      //   <h4>Hello</h4>
      //   <h5>Hello</h5>
      //   <h6>Hello</h6>
      // </div>
    );
  }
}

export default withRouter(App);
