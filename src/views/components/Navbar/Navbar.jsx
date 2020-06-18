import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
import Navbar from "react-bootstrap/Navbar";

class NavbarUI extends Component {
  render() {
    return (
      <Navbar sticky="top" expand="lg" className="row navbar-container">
        <div className="col-2 d-flex justify-content-start pl-2">
          <Link to="/">
            <img src={Logo} alt="" className="logo" />
          </Link>
        </div>
        <div className="col-8 d-flex justify-content-center">
          <div className="row">
            <ButtonUI type="text">
              <a
                href="#about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About Us
              </a>
            </ButtonUI>
            <ButtonUI type="text">
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                Shop
              </Link>
            </ButtonUI>
            <ButtonUI type="text">
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                Groom
              </Link>
            </ButtonUI>
            <ButtonUI type="text">
              <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
                Contact Us
              </Link>
            </ButtonUI>
          </div>
        </div>
        <div className="col-2 d-flex justify-content-end pr-4">
          <div className="row">
            <ButtonUI type="outline" className="mr-3">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign In
              </Link>
            </ButtonUI>
            <ButtonUI type="contain">
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign Up
              </Link>
            </ButtonUI>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default NavbarUI;
