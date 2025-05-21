"use client"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"

const Footer = () => {
  return (
    <footer className="bg-[#c7c8c9] text-gray-800 py-6 w-full mt-auto border-t border-gray-300">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
        <div className="flex flex-col items-center sm:items-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium mb-1"
          >
            All rights reserved, &copy; {new Date().getFullYear()} Atilla Colak
          </motion.div>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-0.5 rounded-full bg-red-600"
            style={{ backgroundColor: "#8B0000" }}
          />
        </div>

        <div className="flex items-center space-x-1 sm:space-x-3">
          <motion.a
            href="https://github.com/AtillaColak"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-300"
            whileHover={{ y: -3 }}
            aria-label="GitHub"
          >
            <Github size={20} className="text-gray-700 hover:text-gray-900" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/atilla-colak/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-300"
            whileHover={{ y: -3 }}
            aria-label="LinkedIn"
          >
            <Linkedin size={20} className="text-gray-700 hover:text-gray-900" />
          </motion.a>
          <motion.a
            href="mailto:atilla.colak@outlook.com"
            className="p-2 rounded-full hover:bg-white/50 transition-colors duration-300"
            whileHover={{ y: -3 }}
            aria-label="Email"
          >
            <Mail size={20} className="text-gray-700 hover:text-gray-900" />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
