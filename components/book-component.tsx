import React from "react";
import { book } from "@/Models/books";
import { useState, useEffect } from "react";

interface BookCardProps {
    book: book;
}

// for some reason, when I move this to utils and import it from there, it doesn't work. Tailwind caching or compilation issue?
const getTagColor = (tag: string): string => {
    const tagColors: { [key: string]: string } = {
        tech: "bg-blue-200 text-blue-800",
        economics: "bg-green-200 text-green-800",
        history: "bg-purple-200 text-purple-800",
        business: "bg-yellow-200 text-yellow-800",
        marketing: "bg-pink-200 text-pink-800",
        psychology: "bg-teal-200 text-teal-800",
        // TODO: Add more tag-color mappings -> POLITICS, FINANCE, STATISTICS
    };
    return tagColors[tag] || "bg-gray-200 text-gray-800"; // Default color if no match is found
};


export default function BookCard({ book }: BookCardProps) {
    const [tagStyles, setTagStyles] = useState<string[]>([]);

    useEffect(() => {
        const styles = book.tags.map(tag => {
            const style = `tag text-sm font-medium px-2 py-1 mr-2 mb-2 rounded-full ${getTagColor(tag)}`;
            return style;
        });
        setTagStyles(styles);
    }, [book.tags]); // This effect will run whenever book.tags changes

    return (
        <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-card w-full flex items-center p-4 mb-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
            <img src={book.thumbnail} alt={book.title} className="book-thumbnail w-24 h-32 object-cover rounded-md mr-4" />
            <div className="book-details flex flex-col">
                <h3 className="book-title text-xl font-semibold">{book.title}</h3>
                <div className="book-tags mt-2">
                    {book.tags.map((tag, index) => (
                        <span 
                            key={index} 
                            className={tagStyles[index]}
                            >{tag}
                        </span>
                    ))}
                </div>
            </div>
        </a>
    );
};
