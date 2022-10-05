import React from "react";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="main_footer_container">
      <div>
        <div className="main_footer_logo_text">NO LEAK</div>
        <p>
          <span className="main_footer_copyright">
            Copyright © 2022-present NOLEAK. All rights reserved.
          </span>
        </p>
      </div>

      {/* <p className="main_footer_contact">
        <span>
          <strong>CONTACT</strong>
        </span>
        <br />
        <br />
        <span className="main_footer_hover">NOLEAK@gmail.com</span>
      </p> */}
    </footer>
  );
}

export default Footer;
