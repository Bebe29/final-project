import React, { Component } from "react";
import "./Footer.css";

import Logo from "../../../assets/Logo/logo.png";
import Phone from "../../../assets/Icon/phone.png";
import Location from "../../../assets/Icon/location.png";
import Email from "../../../assets/Icon/email.png";
import Insta from "../../../assets/Icon/insta.png";
import Facebook from "../../../assets/Icon/facebook.png";

class Footer extends Component {
  render() {
    return (
      <footer className="footer-container">
        <div className="row">
          <div className="col">
            <img src={Logo} alt="" style={{ width: "40%" }} />
          </div>
          <div className="col">
            <div className="row subtitle-lg">Contact Us</div>
            <div className="row">
              <div className="col">
                <img src={Location} alt="" style={{ width: "15px" }} />
              </div>
              <div className="col">Jakarta</div>
            </div>
            <div className="row">
              <div className="col">
                <img src={Phone} alt="" style={{ width: "15px" }} />
              </div>
              <div className="col">08924809812049</div>
            </div>
            <div className="row">
              <div className="col">
                <img src={Email} alt="" style={{ width: "15px" }} />
              </div>
              <div className="col">Petology@gmail.com</div>
            </div>
          </div>
          {/* <div className="col subtitle-lg">Support</div> */}
          <div className="col">
            <div className="row subtitle-lg">Follow Us</div>
            <div className="row">
              <div className="col">
                <a href="https://www.instagram.com/?hl=id">
                  <img src={Insta} alt="" style={{ width: "15px" }} />
                </a>
              </div>
              <div className="col">
                <a href="https://id-id.facebook.com/">
                  <img src={Facebook} alt="" style={{ width: "15px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row copyright">
          <div className="col content-xs">© 2020 copyright Petology</div>
        </div>
      </footer>
    );
  }
}

export default Footer;
