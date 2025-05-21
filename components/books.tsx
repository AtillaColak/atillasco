"use client"

import { useState, useEffect } from "react"
import type { book } from "@/Models/books"
import BookCard from "@/components/book-component"
import booksData from "@/Data/books.json"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Books() {
  const [books, setBooks] = useState<book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage, setBooksPerPage] = useState(6)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setIsLoading(true)
        // Simulate loading for smoother transitions
        setTimeout(() => {
          setBooks(booksData)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Failed to load books data:", error)
        setIsLoading(false)
      }
    }

    fetchBooksData()

    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBooksPerPage(2)
      } else if (window.innerWidth < 1024) {
        setBooksPerPage(4)
      } else {
        setBooksPerPage(6)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(books.length / booksPerPage)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-[#c7c8c9] text-gray-800 flex flex-col">
      <div className="min-h-[500px] flex-grow flex flex-col items-center pt-24 md:pt-20 pb-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-2 text-gray-800"
        >
          RabbitHole
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-maroon-600 mb-16 rounded-full"
          style={{ backgroundColor: "#8B0000" }}
        />

        <div className="flex-grow w-full max-w-6xl">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-600"
                style={{ borderColor: "#8B0000" }}
              ></div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
                className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mb-8"
              >
                {currentBooks.length === 0 ? (
                  <p className="col-span-full text-center">No books found</p>
                ) : (
                  currentBooks.map((book, index) => (
                    <motion.div key={book.title} variants={itemVariants}>
                      <BookCard book={book} />
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <div className="flex items-center justify-center mt-8 space-x-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-5 w-5 text-maroon-600" style={{ color: "#8B0000" }} />
          </button>

          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  currentPage === i + 1 ? "bg-maroon-600 text-white" : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                style={{ backgroundColor: currentPage === i + 1 ? "#8B0000" : "" }}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="h-5 w-5 text-maroon-600" style={{ color: "#8B0000" }} />
          </button>
        </div>
      </div>
    </div>
  )
}
