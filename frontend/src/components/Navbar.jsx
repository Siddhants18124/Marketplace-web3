import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import assets from '../assets/assets';
import React, { useState } from 'react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        // Implement your logout logic here
    };
    return (
        <nav className="relative bg-custom1 shadow">
            <div className="container px-6 py-4 mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="flex items-center justify-between">
                        <Link to="/">
                            <img className="w-auto h-6 sm:h-7" src="https://i.postimg.cc/nrDyf7wJ/logo2.png" alt="" />
                        </Link>

                        {/* Mobile menu button */}
                        <div className="flex lg:hidden">
                            <button type="button" className="text-custom4 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu open: "block", Menu closed: "hidden" */}
                    <div className="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-custom1 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:flex lg:items-center">
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <Link to="/" className="px-3 py-2 mx-3 text-custom4 transition-colors duration-300 transform rounded-md hover:bg-custom2">Home</Link>
                            <Link to="/products" className="px-3 py-2 mx-3 text-custom4 transition-colors duration-300 transform rounded-md hover:bg-custom2">Buy Data</Link>
                            <Link to="/sell" className="px-3 py-2 mx-3 text-custom4 transition-colors duration-300 transform rounded-md hover:bg-custom2">Sell Data</Link>
                        </div>

                        <div className="flex items-center mt-4 lg:mt-0">
                            <button className="hidden mx-4 text-custom4 transition-colors duration-300 transform lg:block hover:text-gray-700 focus:text-gray-700 focus:outline-none" aria-label="show cart">
                                <FaShoppingCart className="w-6 h-6" />
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    className="flex items-center focus:outline-none"
                                    aria-label="toggle profile dropdown"
                                    onClick={toggleDropdown}
                                >
                                    <div className="w-8 h-8 overflow-hidden border-2 border-custom4 rounded-full">
                                        <img src={assets.warrior} alt="avatar" />
                                    </div>
                                    <h3 className="mx-2 text-custom4 lg:hidden">Sid</h3>
                                </button>

                                {isOpen && (
                                    <div className="absolute right-0 mt-2 w-40 bg-custom4 rounded-xl shadow-lg z-10">
                                        <div className="py-1">
                                            <button
                                                className="rounded-xl block px-4 py-2 text-sm text-red-600 hover:bg-gray-300 w-full text-left"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Navbar;
