import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    ShopSmart
                </Link>

                {/* Links */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/products" className="text-gray-600 hover:text-gray-800">
                        Products
                    </Link>
                    <Link to="/categories" className="text-gray-600 hover:text-gray-800">
                        Categories
                    </Link>
                    <Link to="/about" className="text-gray-600 hover:text-gray-800">
                        About Us
                    </Link>
                    <Link to="/contact" className="text-gray-600 hover:text-gray-800">
                        Contact
                    </Link>
                </div>

                {/* Authentication and Cart */}
                <div className="flex space-x-4">
                    <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                        <FaShoppingCart className="w-6 h-6" />
                    </Link>
                    <Link to="/login" className="text-gray-600 hover:text-gray-800 flex items-center">
                        <FaSignInAlt className="mr-1" /> Login
                    </Link>
                    <Link to="/profile" className="text-gray-600 hover:text-gray-800 flex items-center">
                        <FaUser className="mr-1" /> Profile
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button className="text-gray-800 focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Link to="/products" className="block text-gray-600 hover:text-gray-800">
                        Products
                    </Link>
                    <Link to="/categories" className="block text-gray-600 hover:text-gray-800">
                        Categories
                    </Link>
                    <Link to="/about" className="block text-gray-600 hover:text-gray-800">
                        About Us
                    </Link>
                    <Link to="/contact" className="block text-gray-600 hover:text-gray-800">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
