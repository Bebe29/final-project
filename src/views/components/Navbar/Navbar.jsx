import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

class NavbarUI extends Component {
  render() {
    return (
      <>
        <Navbar className="navbar-container">
          <Navbar.Brand className="mr-auto">
            <Link to="/">
              <img src={Logo} alt="" className="logo" />
            </Link>
          </Navbar.Brand>
          <Nav>
            <ButtonUI type="outline" className="mr-3">
              Sign In
            </ButtonUI>
            <ButtonUI type="contain">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign Up
              </Link>
            </ButtonUI>
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default NavbarUI;
