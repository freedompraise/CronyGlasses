import React from "react";
import icon from "../assets/icon.png";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center text-white h-16"
      style={{
        backgroundColor: "rgb(63, 55, 55)",
        height: "70px",
        width: "100%",
      }}
    >
      {/* Left section */}

      <div className="flex items-center space-x-4 ml-8">
        {/* Twitter Icon */}
        <a href="https://twitter.com/freedom_praise">
          <FontAwesomeIcon icon={faXTwitter} classname="fab fa-twitter" />
        </a>
        {/* GitHub Icon */}
        <a href="https://github.com/freedompraise">
          <FontAwesomeIcon icon={faGithub} classname="fab fa-github" />
        </a>
        {/* LinkedIn Icon */}
        <a href="https://linkedin.com/in/praise-dike">
          <FontAwesomeIcon icon={faLinkedin} classname="fab fa-linkedin" />
        </a>
      </div>

      {/* Center section */}
      <div className="flex flex-col items-center">
        {/* Project Icon */}
        <a href="/" className="flex items-center flex-col">
          <img src={icon} alt="Project Icon" className="w-8 h-8 mr-2" />
          <div className="text-xl">CRONYGLASSES</div>
        </a>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4 mr-8">
        {/* User Icon */}
        <i className="fas fa-user">
          <FontAwesomeIcon icon={faUser} classname="fas fa-user" />
        </i>
        {/* Login */}
        <span>Login</span>
        {/* Cart Icon */}
        <div className="flex items-center">
          <i className="fas fa-shopping-cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              classname="fas fa-shopping-cart"
            />
          </i>
          <span className="ml-1">0</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
