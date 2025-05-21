"use client"
import { useState, useRef } from "react"
import type React from "react"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  imageUrl: string
  projectUrl: string
  githubUrl?: string
  technologies: string[]
  featured?: boolean
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
  githubUrl,
  technologies,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // 3D tilt effect values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smoother animation with springs
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  // Transform values for the tilt effect
  const rotateX = useTransform(springY, [-100, 100], [10, -10])
  const rotateY = useTransform(springX, [-100, 100], [-10, 10])
  const scale = useTransform(springX, [-100, 0, 100], [0.98, featured ? 1.02 : 1, 0.98])

  // Handle mouse move for the 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    x.set(mouseX)
    y.set(mouseY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`project-card relative ${
        featured ? "w-[350px] h-[450px]" : "w-[300px] h-[400px]"
      } rounded-xl overflow-hidden perspective-1000 cursor-pointer`}
      style={{
        rotateX,
        rotateY,
        scale,
        z: 100,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 150 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gold accent elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl border border-gold-300 z-10">
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"
          style={{
            backgroundImage: "linear-gradient(to right, #D4AF37, #FFF380, #D4AF37)",
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300"
          style={{
            backgroundImage: "linear-gradient(to right, #D4AF37, #FFF380, #D4AF37)",
            boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
          }}
        ></div>
      </div>

      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={imageUrl || "/placeholder.svg?height=450&width=350"}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
            filter: "brightness(0.7)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(0)" }}
        ></div>
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 p-6 flex flex-col justify-between z-20 text-white"
        style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
      >
        <div>
          {featured && (
            <div
              className="mb-3 inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "linear-gradient(to right, #D4AF37, #FFF380, #D4AF37)",
                color: "#000",
                boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
              }}
            >
              Featured Project
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-200 line-clamp-3">{description}</p>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium rounded-full bg-black/30 text-white border border-white/20"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-black/30 text-white border border-white/20">
                +{technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="flex space-x-3">
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
              aria-label={`Visit ${title} project`}
            >
              <ExternalLink className="h-5 w-5 text-white" />
            </a>
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300"
                aria-label={`View ${title} source code`}
              >
                <Github className="h-5 w-5 text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
