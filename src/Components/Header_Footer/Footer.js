import React from "react";
import { CityLogo } from "../ui/icons";

const Footer = props => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <CityLogo width="7rem" height="7rem" link={true} linkTo="/" />
        </div>
        <div className="footer__txt">
          <small>Manchester city 2020.All right reserved</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
