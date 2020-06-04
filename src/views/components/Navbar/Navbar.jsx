import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";

class NavbarUI extends Component {
  render() {
    return (
      // <>
      //   <Navbar className="navbar-container">
      //     <Navbar.Brand className="mr-auto">
      //       <Link to="/">
      //         <img src={Logo} alt="" className="logo" />
      //       </Link>
      //     </Navbar.Brand>
      //     <Nav className="mr-auto">
      //       <ButtonUI type="text" className="mr-2">
      //         <Link style={{ textDecoration: "none", color: "inherit" }}>
      //           About Us
      //         </Link>
      //       </ButtonUI>
      //       <ButtonUI type="text" className="mr-2">
      //         <Link style={{ textDecoration: "none", color: "inherit" }}>
      //           Shop
      //         </Link>
      //       </ButtonUI>
      //       <ButtonUI type="text" className="mr-2">
      //         <Link style={{ textDecoration: "none", color: "inherit" }}>
      //           Groom
      //         </Link>
      //       </ButtonUI>
      //       <ButtonUI type="text">
      //         <Link style={{ textDecoration: "none", color: "inherit" }}>
      //           Contact Us
      //         </Link>
      //       </ButtonUI>
      //     </Nav>
      //     <Nav>
      //       <ButtonUI type="outline" className="mr-3">
      //         <Link
      //           to="/login"
      //           style={{ textDecoration: "none", color: "inherit" }}
      //         >
      //           Sign In
      //         </Link>
      //       </ButtonUI>
      //       <ButtonUI type="contain">
      //         <Link
      //           to="/register"
      //           style={{ textDecoration: "none", color: "inherit" }}
      //         >
      //           Sign Up
      //         </Link>
      //       </ButtonUI>
      //     </Nav>
      //   </Navbar>
      // </>
      <div className="row navbar-container">
        <div className="col-2">
          <Link to="/">
            <img src={Logo} alt="" className="logo" />
          </Link>
        </div>
        <div className="col-8 d-flex justify-content-center">
          <ButtonUI type="text">
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              About Us
            </Link>
          </ButtonUI>
          <ButtonUI type="text">
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              Shop
            </Link>
          </ButtonUI>
          <ButtonUI type="text">
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              Groom
            </Link>
          </ButtonUI>
          <ButtonUI type="text">
            <Link style={{ textDecoration: "none", color: "inherit" }}>
              Contact Us
            </Link>
          </ButtonUI>
        </div>
        <div className="col-2">
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
      </div>
    );
  }
}

export default NavbarUI;
