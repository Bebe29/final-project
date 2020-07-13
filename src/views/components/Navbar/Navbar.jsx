import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import Logo from "../../../assets/Logo/petshop.png";
import ButtonUI from "../Button/Button";
import Cart from "../../../assets/Icon/cart.png";

import { logoutHandler } from "../../../redux/actions";

const NavbarUI = ({ user, logoutHandler }) => {
  const [dropDownOpen, setOpen] = useState(false);

  const toogle = () => setOpen(!dropDownOpen);

  const onLogout = () => {
    logoutHandler();
  };

  return (
    <Navbar sticky="top" expand="lg" className="navbar-container">
      <div className="logo-container pl-2">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
      </div>
      <div className="menu-container">
        <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
          <ButtonUI type="text">About Us</ButtonUI>
        </Link>
        <Link to="/shop" style={{ textDecoration: "none", color: "inherit" }}>
          <ButtonUI type="text">Shop</ButtonUI>
        </Link>
        {/* <Link to="" style={{ textDecoration: "none", color: "inherit" }}>
          <ButtonUI type="text">Contact Us</ButtonUI>
        </Link> */}
      </div>
      {user.id ? (
        <div className="user-container pr-2">
          <div className="d-flex justify-content-center align-items-center">
            {user.role === "user" ? (
              <>
                <Link
                  to="/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="mr-0 d-flex justify-content-center align-items-center"
                >
                  <img src={Cart} alt="" width="20px" height="20px" />
                  <div className="ml-1 circle-bg">20</div>
                </Link>
              </>
            ) : null}
            <Dropdown isOpen={dropDownOpen} toggle={toogle}>
              <DropdownToggle tag="div">
                <ButtonUI type="user">{`Hi, ${user.username}`}</ButtonUI>
              </DropdownToggle>
              <DropdownMenu right tag="div" className="dropdown-menu">
                {user.role === "user" ? (
                  <>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to="/profile"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Profile
                      </Link>
                    </DropdownItem>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to=""
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Wishlist
                      </Link>
                    </DropdownItem>
                    <DropdownItem tag="div" className="dropdown-item logout">
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                        onClick={onLogout}
                      >
                        Log Out
                      </Link>
                    </DropdownItem>
                  </>
                ) : (
                  <>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to="/admin/members"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        User Member
                      </Link>
                    </DropdownItem>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to="/admin/dashboard"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Products
                      </Link>
                    </DropdownItem>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to="/admin/payments"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Payment
                      </Link>
                    </DropdownItem>
                    <DropdownItem tag="div" className="dropdown-item">
                      <Link
                        to="/admin/reports"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Report
                      </Link>
                    </DropdownItem>
                    <DropdownItem
                      tag="div"
                      className="dropdown-item logout"
                      onClick={onLogout}
                    >
                      <Link
                        to="/"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Log Out
                      </Link>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      ) : (
        <div className="user-container pr-4">
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
        </div>
      )}
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavbarUI);
