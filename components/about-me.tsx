import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faLetterboxd } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  return (
    <div className="mt-6 w-full flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 transition-all duration-700 hover:text-hs-secondary">
        About Me
      </h1>
      <div className="w-full flex justify-center items-center mb-4">
        <div
          className="w-[300px] h-[300px] overflow-hidden rounded-lg flex justify-center items-center bg-black"
        >
          <img
            src="https://cdnb.artstation.com/p/assets/images/images/049/129/061/original/peacox-studio-gladiator-idle-animation.gif?1651757410"
            alt="GIF Animation"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <p className="text-lg max-w-md text-center">
        <a
          href="https://lichess.org/@/atillasc"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-all duration-700 hover:text-red-500"
        >
          Challenge me on Lichess!
        </a>
      </p>
      <div className="flex space-x-4 mt-6">
        <a
          href="https://open.spotify.com/user/gs123321?si=7de625a9f3194bf1"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-700 hover:text-green-500"
        >
          <FontAwesomeIcon icon={faSpotify} size="2x" />
        </a>
        <a
          href="https://letterboxd.com/Att1laTheHun/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-all duration-700 hover:text-yellow-500"
        >
          <FontAwesomeIcon icon={faLetterboxd} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
