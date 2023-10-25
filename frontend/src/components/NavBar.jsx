import React from "react";
import icon from "../assets/icon.png";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  return (
    <nav
      className="flex justify-between items-center text-white h-16"
      style={{
        backgroundColor: "rgb(140, 140, 140)",
      }}
    >
      {/* Left section */}

      <div className="flex items-center space-x-4 ml-8">
        {/* Twitter Icon */}
        <a href="https://twitter.com/freedom_praise">
          <FontAwesomeIcon icon={faXTwitter} className="fab fa-twitter" />
        </a>
        {/* GitHub Icon */}
        <a href="https://github.com/freedompraise">
          <FontAwesomeIcon icon={faGithub} className="fab fa-github" />
        </a>
        {/* LinkedIn Icon */}
        <a href="https://linkedin.com/in/praise-dike">
          <FontAwesomeIcon icon={faLinkedin} className="fab fa-linkedin" />
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
      <div className="flex items-center space-x-2 mr-8">
        {/* User Icon */}
        <a href="/account">
          <i className="fas fa-user">
            <FontAwesomeIcon icon={faUser} className="fas fa-user" />
          </i>
          {/* Login */}
          <span>LOGIN</span>
        </a>
        {/* Cart Icon */}
        <div className="flex items-center">
          <i className="fas fa-shopping-cart">
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="fas fa-shopping-cart"
            />
          </i>
          <span className="ml-1">0</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
