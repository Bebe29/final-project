import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";

import Home from "./views/screens/Home/Home";
import NavbarUI from "./views/components/Navbar/Navbar";
import Register from "./views/screens/Auth/Register/Register";
import Login from "./views/screens/Auth/Login/Login";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";

class App extends Component {
  render() {
    return (
      <>
        <NavbarUI />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

export default withRouter(App);
