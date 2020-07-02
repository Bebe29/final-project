import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
import Cart from "../../../assets/Icon/cart.png";
import Navbar from "react-bootstrap/Navbar";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const NavbarUI = ({ user }) => {
  const [dropDownOpen, setOpen] = useState(false);

  const toogle = () => setOpen(!dropDownOpen);

  return (
    <Navbar sticky="top" expand="lg" className="row navbar-container">
      <div className="col-2 d-flex justify-content-start pl-2">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
      </div>
      <div className="col-8 d-flex justify-content-center">
        <div className="d-flex flex-row">
          <Link
            to="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ButtonUI type="text">About Us</ButtonUI>
          </Link>
          <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
            <ButtonUI type="text">Shop</ButtonUI>
          </Link>
          <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
            <ButtonUI type="text">Contact Us</ButtonUI>
          </Link>
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end pr-4">
        {user.id ? (
          <div className="d-flex justify-content-center align-items-center">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
              className="mr-0 d-flex justify-content-center align-items-center"
            >
              <img src={Cart} alt="" width="20px" height="20px" />
              <div className="ml-1 circle-bg">20</div>
            </Link>
            <Dropdown isOpen={dropDownOpen} toggle={toogle}>
              <DropdownToggle tag="div">
                <ButtonUI type="user">{`Hi, ${user.username}`}</ButtonUI>
              </DropdownToggle>
              <DropdownMenu right tag="div" className="dropdown-menu">
                <DropdownItem tag="div" className="dropdown-item">
                  Profile
                </DropdownItem>
                <DropdownItem tag="div" className="dropdown-item">
                  Wishlist
                </DropdownItem>
                <DropdownItem tag="div" className="dropdown-item">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        ) : (
          <div className="row">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ButtonUI type="outline" className="mr-3">
                Sign In
              </ButtonUI>
            </Link>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ButtonUI type="contain">Sign Up</ButtonUI>
            </Link>
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
