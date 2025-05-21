"use client"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"

// Example project data - replace with your actual data
const projectsData = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform with payment processing and inventory management.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    projectUrl: "https://example.com/project1",
    githubUrl: "https://github.com/yourusername/project1",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: 2,
    title: "AI Content Generator",
    description: "An AI-powered application that generates marketing content based on user prompts.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    projectUrl: "https://example.com/project2",
    githubUrl: "https://github.com/yourusername/project2",
    technologies: ["Python", "TensorFlow", "OpenAI", "Flask"],
  },
  {
    id: 3,
    title: "Fitness Tracking App",
    description: "Mobile application for tracking workouts, nutrition, and progress with social features.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    projectUrl: "https://example.com/project3",
    technologies: ["React Native", "Firebase", "Redux", "GraphQL"],
  },
  {
    id: 4,
    title: "Smart Home Dashboard",
    description: "IoT dashboard for monitoring and controlling smart home devices with automation rules.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    projectUrl: "https://example.com/project4",
    githubUrl: "https://github.com/yourusername/project4",
    technologies: ["Vue.js", "MQTT", "Node-RED", "Express"],
  },
  {
    id: 5,
    title: "Financial Analytics Tool",
    description: "Data visualization platform for financial analysis with predictive modeling capabilities.",
    imageUrl: "/placeholder.svg?height=400&width=600",
    projectUrl: "https://example.com/project5",
    technologies: ["D3.js", "Python", "Pandas", "FastAPI"],
  },
]

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  // Set up auto-scrolling
  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(loadingTimer)
  }, [])

  // Handle auto-scrolling
  useEffect(() => {
    if (isLoading) return

    const startAutoScroll = () => {
      autoScrollRef.current = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length)
        }
      }, 4000) // Change slide every 4 seconds
    }

    startAutoScroll()

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isHovered, isLoading])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projectsData.length) % projectsData.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="w-full py-16 bg-[#c5c5c5]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Projects
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-1 rounded-full"
              style={{
                backgroundImage: "linear-gradient(to right, #D4AF37, #FFF380, #D4AF37)",
                boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
              }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{
                borderColor: "#D4AF37",
              }}
            ></div>
          </div>
        ) : (
          <div
            className="relative overflow-hidden rounded-xl shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Gold accent border */}
            <div
              className="absolute inset-0 z-10 pointer-events-none rounded-xl"
              style={{ border: "1px solid rgba(212, 175, 55, 0.5)" }}
            ></div>

            {/* Carousel */}
            <div className="relative h-[400px] md:h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    {/* Project image */}
                    <img
                      src={projectsData[currentIndex].imageUrl || "/placeholder.svg"}
                      alt={projectsData[currentIndex].title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

                    {/* Project content */}
                    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12 text-white max-w-2xl">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold mb-4"
                      >
                        {projectsData[currentIndex].title}
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-gray-200 mb-6 text-sm md:text-base"
                      >
                        {projectsData[currentIndex].description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap gap-2 mb-6"
                      >
                        {projectsData[currentIndex].technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium rounded-full"
                            style={{
                              background:
                                "linear-gradient(to right, rgba(212, 175, 55, 0.8), rgba(255, 243, 128, 0.8))",
                              color: "#000",
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex space-x-4"
                      >
                        <a
                          href={projectsData[currentIndex].projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300"
                          style={{
                            background: "linear-gradient(to right, #D4AF37, #FFF380)",
                            color: "#000",
                            boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
                          }}
                        >
                          <span>View Project</span>
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                        {projectsData[currentIndex].githubUrl && (
                          <a
                            href={projectsData[currentIndex].githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors duration-300"
                          >
                            <span>Source Code</span>
                            <Github className="ml-2 h-4 w-4" />
                          </a>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-300 z-20"
                aria-label="Previous project"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-300 z-20"
                aria-label="Next project"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? "w-8" : "bg-white/50 hover:bg-white/80"
                  }`}
                  style={
                    currentIndex === index
                      ? {
                          backgroundImage: "linear-gradient(to right, #D4AF37, #FFF380)",
                          boxShadow: "0 0 5px rgba(212, 175, 55, 0.5)",
                        }
                      : {}
                  }
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
