import React from "react";
import "./Footer.css";
import playstore from "../../../images/playstore.png";
import appstore from "../../../images/Appstore.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooetr">
        <h4>Download Our App</h4>
        <p>Download Our App for Android and IOS mobile Phones</p>
        <img src={playstore} alt="playstore" />
        <img src={appstore} alt="appstore" />
      </div>
      <div className="middleFooetr">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Coppyrights 2022 &copy; Debdut</p>
      </div>
      <div className="rightFooetr">
        <h4>Follow Us</h4>
        <a href="https://Github.com/">Github</a>
        <a href="https://facebook.com">Facebook</a>
        <a href="https://debdutchowdhury.netlify.com">Portfolio</a>
      </div>
    </footer>
  );
};

export default Footer;
