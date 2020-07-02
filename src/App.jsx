import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import Home from "./views/screens/Home/Home";
import About from "./views/screens/About/About";
import NavbarUI from "./views/components/Navbar/Navbar";
import Register from "./views/screens/Auth/Register/Register";
import Login from "./views/screens/Auth/Login/Login";
import Shop from "./views/screens/Shop/Shop";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";
import { keepLogin, cookieChecker } from "./redux/actions";

const cookieObj = new Cookie();

class App extends Component {
  componentDidMount() {
    let cookieResult = cookieObj.get("authData", { path: "/" });
    if (cookieResult) {
      this.props.keepLogin(cookieResult);
    } else {
      this.props.cookieChecker();
    }
  }

  render() {
    return (
      <>
        <NavbarUI />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="*" component={PageNotFound} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLogin,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
