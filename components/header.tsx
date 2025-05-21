"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, Menu, Music, X, BookOpen, Code, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import booksData from "../Data/books.json"
import SpotifyPlayer from "./music-player"
import { motion, AnimatePresence } from "framer-motion"

interface Book {
  title: string
  link: string
  tags: string[]
  thumbnail: string
}

export default function HeaderNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = booksData.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setSearchResults(filteredBooks)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isSearchResultLink = (event.target as Element)?.closest(".search-result-link")

      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !isSearchResultLink) {
        setIsSearchFocused(false)
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("scroll", handleScroll)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMenuOpen])

  const handleHome = () => {
    router.push("/")
    setIsMenuOpen(false)
  }

  const handleMusicPlaylist = () => {
    setIsMusicPlayerVisible(!isMusicPlayerVisible)
    setIsMenuOpen(false)
  }

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false) // Close the menu after selecting an option
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`${scrolled ? "bg-[#c0c0c0] shadow-md" : "bg-[#c0c0c0] d"} text-gray-800 px-4 py-3 flex justify-around items-center fixed top-0 w-full z-50 transition-all duration-300`}
        style={{ backdropFilter: scrolled ? "blur(8px)" : "none" }}
      >
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-white/50 text-gray-800"
            onClick={handleHome}
          >
            <Home className="h-5 w-5" />
          </Button>

          <nav className="hidden md:flex items-center space-x-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full hover:bg-white/50 text-gray-800 border-gray-300">
                  My Stuff
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white border-gray-200 shadow-lg rounded-lg mt-1">
                <DropdownMenuItem
                  onClick={() => scrollToSection("read")}
                  className="text-gray-800 focus:bg-red-50 focus:text-red-800 rounded-md"
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  Stuff I Read
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => scrollToSection("built")}
                  className="text-gray-800 focus:bg-red-50 focus:text-red-800 rounded-md"
                >
                  <Code className="mr-2 h-4 w-4" />
                  Stuff I Built
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              className="rounded-full hover:bg-white/50 text-gray-800 border-gray-300"
              onClick={handleMusicPlaylist}
            >
              <Music className="mr-2 h-4 w-4" />
              My Playlist
            </Button>
          </nav>
        </div>

        <div className="relative flex-grow max-w-md mx-4" ref={searchRef}>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search Summaries..."
              className="pl-10 pr-4 py-2 rounded-full bg-white/70 text-gray-800 placeholder:text-gray-500 border-gray-300 focus:border-red-600 focus:ring-red-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <AnimatePresence>
            {searchResults.length > 0 && isSearchFocused && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-10 max-h-80 overflow-y-auto"
              >
                {searchResults.map((book, index) => (
                  <Link
                    key={index}
                    href={book.link}
                    className="search-result-link flex items-center px-4 py-3 text-sm text-gray-800 hover:bg-red-50 transition duration-150 ease-in-out"
                    target="_blank"
                  >
                    <div className="flex-shrink-0 h-12 w-12 mr-3 overflow-hidden">
                      <img
                        src={book.thumbnail || "/placeholder.svg"}
                        alt={book.title}
                        width={48}
                        height={48}
                        className="rounded-sm object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-medium truncate">{book.title}</h3>
                      <p className="text-xs text-gray-500 truncate">{book.tags[0]}</p>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className="md:hidden p-2 rounded-full hover:bg-white/50 text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black md:hidden z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <motion.div
                ref={sidebarRef}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-64 bg-[#c7c8c9] text-gray-800 p-4 shadow-lg md:hidden z-50"
              >
                <button
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/50 text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>

                <div className="mt-16 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="rounded-lg w-full justify-start hover:bg-red-50 hover:text-red-800 text-gray-800 border-gray-300"
                    onClick={() => scrollToSection("read")}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Stuff I Read
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-lg w-full justify-start hover:bg-red-50 hover:text-red-800 text-gray-800 border-gray-300"
                    onClick={() => scrollToSection("built")}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Stuff I Built
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-lg w-full justify-start hover:bg-red-50 hover:text-red-800 text-gray-800 border-gray-300"
                    onClick={handleMusicPlaylist}
                  >
                    <Music className="mr-2 h-4 w-4" />
                    My Playlist
                  </Button>

                  <div className="border-t border-gray-300 my-2"></div>

                  <Button
                    variant="default"
                    className="rounded-lg w-full justify-start bg-red-600 hover:bg-red-700 text-white"
                    onClick={handleHome}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spotify Player */}
      <SpotifyPlayer isOpen={isMusicPlayerVisible} onClose={() => setIsMusicPlayerVisible(false)} />

      {/* Spacer to prevent content from being hidden under the fixed header */}
      <div className="h-16"></div>
    </>
  )
}
