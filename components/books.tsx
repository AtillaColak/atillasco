'use client'

import { useState, useEffect } from "react"
import { book } from "@/Models/books"
import BookCard from "@/components/book-component"
import booksData from "@/Data/books.json"
import { motion, AnimatePresence } from "framer-motion"

export default function Books() {
  const [books, setBooks] = useState<book[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [booksPerPage, setBooksPerPage] = useState(6)

  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        setBooks(booksData)
      } catch (error) {
        console.error("Failed to load books data:", error)
      }
    }

    fetchBooksData()

    const handleResize = () => {
      setBooksPerPage(window.innerWidth < 768 ? 3 : 6)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(books.length / booksPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="min-h-[650px] bg-black text-white flex flex-col">
      <div className="min-h-[500px] flex-grow flex flex-col items-center pt-24 md:pt-20 pb-16">
        <h1 className="text-2xl font-semibold mb-16">
          Stuff I Read (and my Summaries)
        </h1>
        <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-8"
          >
            {currentBooks.length === 0 ? (
              <p className="col-span-full text-center">No books found</p>
            ) : (
              currentBooks.map((book) => (
                <BookCard key={book.title} book={book} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
        </div>
        <div className="flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentPage === i + 1 ? "bg-red-500" : "bg-white"
              }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}