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

    return (
        <header className="bg-black text-white p-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50">
            <div className="flex items-center space-x-4">
                <button
                    className="transition ease-in-out duration-300 hover:text-hs-third text-hs-base text-l hover:scale-125 ml-4"
                    onClick={handleHome}
                >
                    Are You Not Entertained?
                </button>
            </div>
            <nav className="flex items-center space-x-4">
                <button className="transition ease-in-out duration-300 hover:text-hs-base focus:outline-none" onClick={handleAboutUs}>Books I Read</button>
            </nav>
        </header>
    );
};

export default HeaderNavBar;
