"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HeaderNavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const handleHome = () => {
      router.push("/");
    };

    const handleAboutUs = () => {
        router.push("/books");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleYouTube = () => {
        window.open('https://www.youtube.com/watch?v=gPpG0kStC4o', '_blank');
    };

    return (
        <header className="bg-black text-white px-2  py-4 md:p-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50">
            <div className="flex items-center space-x-4 flex-grow">
                <button
                    className="transition ease-in-out duration-300 hover:text-hs-third text-hs-base text-sm md:text-base md:hover:scale-125 ml-0 md:ml-4"
                    onClick={handleHome}
                >
                    Are You Not Entertained?
                </button>
            </div>
            <nav className="flex items-center space-x-4 ml-auto">
                <button
                    className="transition ease-in-out duration-300 bg-hs-base text-black px-4 py-2 rounded-lg hover:bg-hs-secondary hover:text-hs-third text-sm md:text-base"
                    onClick={handleYouTube}
                >
                    Video of the Week
                </button>

                <button   
                    className="transition ease-in-out duration-300 hover:text-hs-base focus:outline-none text-sm md:text-base"
                    onClick={handleAboutUs}
                >
                    Books I Read
                </button>
            </nav>
        </header>
    );
};

export default HeaderNavBar;
