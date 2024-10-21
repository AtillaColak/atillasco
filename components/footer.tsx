import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 w-full mt-auto">
      <div className="container mx-auto flex flex-col sm:flex-row justify-center items-center p-4 space-y-4 sm:space-y-0">
        <div className="text-sm sm:mr-16 text-hs-secondary text-center sm:text-left">
          All rights reserved, &copy; 2024 Atilla Colak. 
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/AtillaColak"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/atilla-colak/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400"
          >
            <FaLinkedin size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;