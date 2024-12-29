import React from "react";
import { book } from "@/Models/books";
import { useState, useEffect } from "react";

interface BookCardProps {
    book: book;
}
//TODO: still missing responsiveness. especially on the edges of book cards and they get lost in smaller screens behing the header/footers
// for some reason, when I move this to utils and import it from there, it doesn't work. Tailwind caching or compilation issue?
const getTagColor = (tag: string): string => {
    const tagColors: { [key: string]: string } = {
        tech: "bg-blue-700 text-blue-100",
        economics: "bg-green-700 text-green-100",
        history: "bg-purple-700 text-purple-100",
        business: "bg-yellow-700 text-yellow-100",
        marketing: "bg-pink-700 text-pink-100",
        psychology: "bg-teal-700 text-teal-100",
        politics: "bg-rose-700 text-rose-100", 
        finance: "bg-violet-700 text-violet-100",
        statistics: "bg-orange-700 text-orange-100",
        physics: "bg-fuchsia-700 text-fuchsia-100", 
        philosophy : "bg-lime-700 text-lime-100"
    };
    return tagColors[tag.toLowerCase()] || "bg-gray-700 text-gray-100";
};

export default function BookCard({ book }: BookCardProps) {
    const [tagStyles, setTagStyles] = useState<string[]>([]);

    useEffect(() => {
        const styles = book.tags.map(tag => {
            const style = `tag text-sm font-medium px-1 py-1 mr-2 mb-2 rounded-full ${getTagColor(tag)}`;
            return style;
        });
        setTagStyles(styles);
    }, [book.tags]); // This effect will run whenever book.tags changes

    return (
        <a href={book.link} target="_blank" rel="noopener noreferrer" className="book-card w-full flex items-center p-3 mb-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
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
