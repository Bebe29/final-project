import React, { Component } from "react";
import "./Navbar.css";
// import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
// import { Navbar, NavbarBrand } from "reactstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavbarUI extends Component {
  render() {
    return (
      // <div className="d-flex navbar-container">
      //   <div className="d-flex">
      //     <img src={Logo} alt="" className="logo" />
      //   </div>
      //   <div className="d-flex">
      //     <ButtonUI>Sign In</ButtonUI>
      //     <ButtonUI>Sign Up</ButtonUI>
      //   </div>
      // </div>

      <>
        <Navbar className="navbar-container">
          <Navbar.Brand className="mr-auto">
            <img src={Logo} alt="" className="logo" />
          </Navbar.Brand>
          <Nav>
            <ButtonUI type="outline" className="mr-3">
              Sign In
            </ButtonUI>
            <ButtonUI>Sign Up</ButtonUI>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default NavbarUI;
