'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Menu, Music, X, BookOpen } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import booksData from '../Data/books.json'
import SpotifyPlayer from './music-player'

interface Book {
  title: string
  link: string
  tags: string[]
  thumbnail: string
}

export default function HeaderNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Book[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isMusicPlayerVisible, setIsMusicPlayerVisible] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchQuery) {
      const filteredBooks = booksData.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filteredBooks)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click target is a link within the search results
      const isSearchResultLink = (event.target as Element)?.closest('.search-result-link')
      
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !isSearchResultLink) {
        setIsSearchFocused(false)
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  const handleHome = () => {
    router.push("/")
    setIsMenuOpen(false)
  }

  const handleBooks = () => {
    router.push("/books")
    setIsMenuOpen(false)
  }

  const handleMusicPlaylist = () => {
    setIsMusicPlayerVisible(!isMusicPlayerVisible)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="bg-black text-hs-secondary px-4 py-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50">
        <button
          className="ml-2 transition ease-in-out duration-300 hover:text-hs-base text-sm md:text-base"
          onClick={handleHome}
        >
          Home
        </button>
        
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-4">
          <Button
              variant="ghost"
              className="rounded justify-start hover:text-red-800 hover:bg-neutral-800 text-hs-third bg-hs-fourth"
              onClick={handleBooks}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Stuff I read
          </Button>
            
            <Button
              variant="ghost"
              className="rounded hover:text-red-800 hover:bg-neutral-800 text-hs-third bg-hs-fourth"
              onClick={handleMusicPlaylist}
            >
              <Music className="mr-2 h-4 w-4" />
              Music
            </Button>
            
            <div className="relative" ref={searchRef}>
              <Input
                type="search"
                placeholder="Search Summaries..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {searchResults.length > 0 && isSearchFocused && (
                <div className="absolute top-full left-0 w-full mt-2 bg-black rounded-md shadow-lg overflow-hidden z-10 max-h-80 overflow-y-auto">
                  {searchResults.map((book, index) => (
                    <Link key={index} href={book.link} className="search-result-link flex items-center px-4 py-3 text-sm text-white hover:bg-gray-800 transition duration-150 ease-in-out" target="_blank">
                      <div className="flex-shrink-0 h-12 w-12 mr-3 overflow-hidden">
                        <img
                          src={book.thumbnail}
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
                </div>
              )}
            </div>
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div 
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-64 bg-black text-hs-secondary p-4 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden z-50`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          <div className="mt-16 flex flex-col space-y-4">
            <div className="relative" ref={searchRef}>
              <Input
                type="search"
                placeholder="Search Summaries..."
                className="pl-10 pr-4 py-2 rounded-full bg-gray-800 text-white w-full text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            {searchResults.length > 0 && isSearchFocused && (
              <div className="absolute left-4 right-4 bg-black rounded-md shadow-lg max-h-[calc(100vh-200px)] overflow-y-auto z-50">
                {searchResults.map((book, index) => (
                  <Link key={index} href={book.link} className="search-result-link flex items-center px-4 py-3 text-sm text-white hover:bg-gray-800 transition duration-150 ease-in-out" target="_blank">
                    <div className="flex-shrink-0 h-12 w-12 mr-3 overflow-hidden">
                      <img
                        src={book.thumbnail}
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
              </div>
            )}
              <Button
              variant="ghost"
              className="rounded w-full justify-start hover:text-red-800 hover:bg-neutral-800 text-hs-third bg-hs-fourth"
              onClick={handleBooks}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Stuff I read
            </Button>

              <Button
              variant="ghost"
              className="rounded w-full justify-start hover:text-red-800 hover:bg-neutral-800 text-hs-third bg-hs-fourth"
              onClick={handleMusicPlaylist}
            >
              <Music className="mr-2 h-4 w-4" />
              Music
            </Button>
          </div>
        </div>
      </header>
      <SpotifyPlayer isOpen={isMusicPlayerVisible} onClose={() => setIsMusicPlayerVisible(false)} />
    </>
  )
}