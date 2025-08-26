import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4">
      <div className="container mx-auto">
        <p>&copy; 2025 CronyGlasses</p>
        <ul className="flex justify-center mt-2">
          <li className="mx-2">
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li className="mx-2">
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
