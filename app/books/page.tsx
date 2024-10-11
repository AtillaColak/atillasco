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

  useEffect(() => {
      const fetchBooksData = async () => {
          try {
              setBooks(booksData);
          } catch (error) {
              console.error("Failed to load books data:", error);
          }
      };

      fetchBooksData();
  }, []);

  return (
      <AuthorizedLayout>
          <HeaderNavBar />
          <div className="h-full w-full bg-black text-white flex flex-col items-center justify-center pt-24 md:pt-20 overflow-y-auto"> {/* Added pt-20 and overflow-y-auto */}
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
