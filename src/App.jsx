import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { Switch, Route, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";

import { keepLogin, cookieChecker } from "./redux/actions";

import Loading from "./assets/LoadingGif/lagif-grande.gif";
import Home from "./views/screens/Home/Home";
import About from "./views/screens/About/About";
import NavbarUI from "./views/components/Navbar/Navbar";
import Register from "./views/screens/Auth/Register/Register";
import Login from "./views/screens/Auth/Login/Login";
import Shop from "./views/screens/Shop/Shop";
import PageNotFound from "./views/screens/PageNotFound/PageNotFound";
import UserMember from "./views/screens/Admin/UserMember/UserMember";
import Dashboard from "./views/screens/Admin/Dashboard/Dashboard";
import Report from "./views/screens/Admin/Report/Report";
import Payment from "./views/screens/Admin/Payment/Payment";
import ProductDetail from "./views/screens/Product/ProductDetail";
import VerifyAccount from "./views/screens/User/VerifyAccount/VerifyAccount";
import Profile from "./views/screens/User/Profile/Profile";
import ForgotPassword from "./views/screens/ForgotPassword/ForgotPassword";
import ResetPassword from "./views/screens/ForgotPassword/ResetPassword";

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

  renderAdminRoute = () => {
    if (this.props.user.role === "admin")
      return (
        <>
          <Route exact path="/admin/members" component={UserMember} />
          <Route exact path="/admin/dashboard" component={Dashboard} />
          <Route exact path="/admin/payments" component={Payment} />
          <Route exact path="/admin/reports" component={Report} />
        </>
      );
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <NavbarUI />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/product/:productId" component={ProductDetail} />
            <Route exact path="/verify/:username" component={VerifyAccount} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/forgot" component={ForgotPassword} />
            <Route exact path="/forgot/:username" component={ResetPassword} />
            {this.renderAdminRoute()}
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </>
      );
    } else {
      return (
        <div className="loading h-100">
          <img src={Loading} alt="" />
        </div>
      );
    }
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
