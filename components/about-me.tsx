"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpotify, faLetterboxd } from "@fortawesome/free-brands-svg-icons"
import { faChessKnight } from "@fortawesome/free-solid-svg-icons"

const AboutMe = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src =
      "https://cdnb.artstation.com/p/assets/images/images/049/129/061/original/peacox-studio-gladiator-idle-animation.gif?1651757410"
    img.onload = () => setIsImageLoaded(true)
  }, [])

  return (
    <div className="w-full py-16 bg-[#c7c8c9] text-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative">
              <div
                className={`w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <img
                  src="https://cdnb.artstation.com/p/assets/images/images/049/129/061/original/peacox-studio-gladiator-idle-animation.gif?1651757410"
                  alt="Gladiator Animation"
                  className="w-full h-full object-cover"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </motion.div>

          {/* Right column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex flex-col items-start"
          >
            <div className="mb-2">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">
                About <span className="text-red-600">Me</span>
              </h1>
            </div>

            <p className="text-lg mb-6 text-gray-600 leading-relaxed">
              Welcome to my personal space! Feel free to explore my
              collections and challenge me to a game.
            </p>

            <div className="mb-8">
              <motion.a
                href="https://lichess.org/@/rafari"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <FontAwesomeIcon icon={faChessKnight} className="w-5 h-5 mr-2" />
                Challenge me on Lichess!
              </motion.a>
            </div>

            <div className="flex space-x-6">
              <motion.a
                href="https://open.spotify.com/user/gs123321?si=7de625a9f3194bf1"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-700 hover:text-green-500"
                whileHover={{ y: -3 }}
              >
                <FontAwesomeIcon icon={faSpotify} size="2x" />
              </motion.a>
              <motion.a
                href="https://letterboxd.com/Att1laTheHun/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-700 hover:text-yellow-500"
                whileHover={{ y: -3 }}
              >
                <FontAwesomeIcon icon={faLetterboxd} size="2x" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AboutMe
