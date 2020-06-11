import React, { Component } from "react";
import "./Footer.css";
import Phone from "../../../assets/Icon/phone.png"
import Location from '../../../assets/Icon/location.png'

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="row pr-0 text-center">
          <div className="col-2">Logo</div>
          <div className="col">
            <div className="row subtitle-lg">
            Contact Us
            </div>
            <div>
              <img src={Phone} alt="" style={{width: "15px"}} />
            </div>
          </div>
          <div className="col subtitle-lg">Support</div>
          <div className="col subtitle-lg">Follow Us</div>
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
