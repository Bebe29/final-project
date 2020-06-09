import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="row pr-0 text-center">
          <div className="col-2">Logo</div>
          <div className="col subtitle-lg">Contact Us</div>
          <div className="col subtitle-lg">Support</div>
          <div className="col">
            <div className="d-flex justify-content-center subtitle-lg">
              Payment Option
            </div>
            <div className="d-flex justify-content-center subtitle-lg">
              Follow Us
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col text-center content-xs">
            © 2020 copyright Petology
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
