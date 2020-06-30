import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
import Navbar from "react-bootstrap/Navbar";

const NavbarUI = ({ user }) => {
  return (
    <Navbar sticky="top" expand="lg" className="row navbar-container">
      <div className="col-2 d-flex justify-content-start pl-2">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
      </div>
      <div className="col-8 d-flex justify-content-center">
        <div className="d-flex flex-row">
          <ButtonUI type="text">
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              About Us
            </Link>
          </ButtonUI>
          <ButtonUI type="text">
            <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
              Shop
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
        {user.id ? (
          <div className="d-flex justify-content-center align-items-center">
            {/* <ButtonUI type="outline" className="mr-3">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign In
              </Link>
            </ButtonUI> */}
            {/* <ButtonUI type="text">{user.username}</ButtonUI> */}
            <div className="" style={{ color: "white" }}>
              {`Hi, ${user.username}`}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NavbarUI);
