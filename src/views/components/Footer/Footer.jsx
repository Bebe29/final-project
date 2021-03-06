import React from "react";
import "./Footer.css";

import Phone from "../../../assets/Icon/phone.png";
import Location from "../../../assets/Icon/location.png";
import Email from "../../../assets/Icon/email.png";
import Insta from "../../../assets/Icon/insta.png";
import Facebook from "../../../assets/Icon/facebook.png";

const Footer = () => {
  return (
    <div className="row">
      <div className="col pr-0">
        <footer className="footer-container">
          <div className="row">
            <div className="col footer-contact-container">
              <div className="subtitle-lg">Contact Us</div>
              <div className="footer-contact-container-content">
                <div className="footer-contact-content content-md">
                  <img src={Location} alt="" width="10px" />
                  <div className="ml-2">{`Jln. Boulevard BSD Timur, Serpong, Tangerang Selatan`}</div>
                </div>
                <div className="footer-contact-content content-md p-2">
                  <img src={Phone} alt="" width="13px" />
                  <div className="ml-2">{`081234567890`}</div>
                </div>
                <div className="footer-contact-content content-md">
                  <img src={Email} alt="" width="13px" />
                  <div className="ml-2">{`petology@gmail.com`}</div>
                </div>
              </div>
            </div>
            <div className="col footer-follow-container">
              <div className="subtitle-lg">Follow Us</div>
              <div className="footer-follow-container-icon">
                <a
                  href="https://www.instagram.com/?hl=id"
                  style={{ margin: "0px 10px" }}
                >
                  <img src={Insta} alt="" style={{ width: "25px" }} />
                </a>
                <a
                  href="https://id-id.facebook.com/"
                  style={{ margin: "0px 10px" }}
                >
                  <img src={Facebook} alt="" style={{ width: "25px" }} />
                </a>
              </div>
            </div>
          </div>
          <div className="row copyright">
            <div className="col content-xs">© 2020 copyright Petology</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
