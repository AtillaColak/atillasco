import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faLetterboxd } from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  return (
    <div className="mt-6 w-full flex flex-col items-center justify-center bg-gray-950 text-white p-4">
      <h1 className="text-4xl font-bold mb-4 transition-all duration-700 hover:text-hs-secondary">
        About Me
      </h1>
      <div className="w-full max-w-4xl mb-4">
        <div className="relative w-full pb-[56.25%]"> {/* 16:9 aspect ratio */}
          <iframe 
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/W2_J7nvHyD0" 
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
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
          className=" transition-all duration-700 hover:text-green-500"
        >
          <FontAwesomeIcon icon={faSpotify} size="2x" />
        </a>
        <a
          href="https://letterboxd.com/Att1laTheHun/"
          target="_blank"
          rel="noopener noreferrer"
          className=" transition-all duration-700 hover:text-yellow-500"
        >
          <FontAwesomeIcon icon={faLetterboxd} size="2x" />
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
