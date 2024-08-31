/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import HeaderNavBar from "@/components/header";
import Footer from "@/components/footer";
import AuthorizedLayout from "@/components/authorized-layout";
import { book } from "@/Models/books";
import BookCard from "@/components/book-component";
import booksData from "@/Data/books.json";

export default function Books() {
    const [books, setBooks] = useState<book[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Define an async function to fetch the data
    const fetchBooksData = async () => {
      try {
        // Since booksData is imported, you can directly set it
        setBooks(booksData);
      } catch (error) {
        console.error("Failed to load books data:", error);
      }
    };

    fetchBooksData(); // Call the async function
  }, []); // Empty dependency array to run effect only once


  return (
    <AuthorizedLayout>
        <HeaderNavBar />
        <div className="h-full w-full flex flex-col items-center justify-center">
                {books.length === 0 ? (
                    <p>No books found</p>
                ) : (
                    <div className="book-list w-full max-w-2xl">
                        {books.map((book) => (
                            <BookCard key={book.title} book={book} />
                        ))}
                    </div>
                )}
            </div>
        <Footer />
    </AuthorizedLayout>
    );
}
