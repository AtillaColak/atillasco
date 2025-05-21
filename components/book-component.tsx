"use client"
import type { book } from "@/Models/books"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface BookCardProps {
  book: book
}

// Updated tag colors for light theme with maroon accents
const getTagColor = (tag: string): string => {
  const tagColors: { [key: string]: string } = {
    tech: "bg-blue-100 text-blue-800 border border-blue-300",
    economics: "bg-green-100 text-green-800 border border-green-300",
    history: "bg-purple-100 text-purple-800 border border-purple-300",
    business: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    marketing: "bg-pink-100 text-pink-800 border border-pink-300",
    psychology: "bg-teal-100 text-teal-800 border border-teal-300",
    politics: "bg-rose-100 text-rose-800 border border-rose-300",
    finance: "bg-violet-100 text-violet-800 border border-violet-300",
    statistics: "bg-orange-100 text-orange-800 border border-orange-300",
    physics: "bg-fuchsia-100 text-fuchsia-800 border border-fuchsia-300",
    philosophy: "bg-lime-100 text-lime-800 border border-lime-300",
  }
  return tagColors[tag.toLowerCase()] || "bg-gray-100 text-gray-800 border border-gray-300"
}

export default function BookCard({ book }: BookCardProps) {
  const [tagStyles, setTagStyles] = useState<string[]>([])

  useEffect(() => {
    const styles = book.tags.map((tag) => {
      const style = `tag text-xs font-medium px-2 py-1 mr-2 mb-2 rounded-full ${getTagColor(tag)}`
      return style
    })
    setTagStyles(styles)
  }, [book.tags])

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <a
        href={book.link}
        target="_blank"
        rel="noopener noreferrer"
        className="book-card w-full flex flex-col sm:flex-row items-center p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-maroon-600"
        style={{ borderLeftColor: "#8B0000" }}
      >
        <div className="book-thumbnail-container relative mb-4 sm:mb-0 sm:mr-4">
          <img
            src={book.thumbnail || "/placeholder.svg"}
            alt={book.title}
            className="book-thumbnail w-32 h-44 sm:w-24 sm:h-32 object-cover rounded-md shadow-md"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="book-details flex flex-col w-full">
          <h3 className="book-title text-xl font-semibold text-gray-800 mb-2">{book.title}</h3>
          <div className="book-tags flex flex-wrap">
            {book.tags.map((tag, index) => (
              <span key={index} className={tagStyles[index]}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  )
}
