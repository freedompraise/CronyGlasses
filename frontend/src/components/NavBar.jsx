import React from "react";
import icon from "../assets/icon.png";
import {
  faXTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../CartContext";

function NavBar() {
  const { totalItems } = useCart();
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
          <FontAwesomeIcon
            icon={faXTwitter}
            className="fab fa-twitter hover:text-black"
          />
        </a>
        {/* GitHub Icon */}
        <a href="https://github.com/freedompraise">
          <FontAwesomeIcon
            icon={faGithub}
            className="fab fa-github hover:text-black"
          />
        </a>
        {/* LinkedIn Icon */}
        <a href="https://linkedin.com/in/praise-dike">
          <FontAwesomeIcon
            icon={faLinkedin}
            className="fab fa-linkedin hover:text-black"
          />
        </a>
      </div>

      {/* Center section */}
      <div className="flex flex-col items-center">
        {/* Project Icon */}
        <a href="/" className="flex items-center flex-col">
          <img
            src={icon}
            alt="Project Icon"
            className="w-auto h-12 mr-2 px-2 "
          />
        </a>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-2 mr-8 ">
        {/* User Icon */}
        <a href="/account" className="hover:text-black">
          <i className="fas fa-user">
            <FontAwesomeIcon icon={faUser} className="fas fa-user" />
          </i>
          {/* Login */}
          <span>LOGIN</span>
        </a>
        {/* Cart Icon */}
        <a href="/cart" className="hover:text-black">
          <div className="flex items-center">
            <i className="fas fa-shopping-cart">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="fas fa-shopping-cart"
              />
            </i>
            <span className="ml-1">{totalItems}</span>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
