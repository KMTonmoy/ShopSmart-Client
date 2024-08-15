import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa';
// import logo from "../../assets/ShopSmart2.png";
import logo from "../../assets/BagLogo.png";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    const handleToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    useEffect(() => {
        localStorage.setItem("theme", theme);
        document.querySelector("html").setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center">
                    <img src={logo} alt="ShopSmart Logo" className="w-10 h-10 mr-2" />
                    <span className="text-white text-2xl font-bold hover:text-yellow-300">
                        ShopSmart
                    </span>
                </Link>

                <div className="lg:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white focus:outline-none"
                    >
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
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            ></path>
                        </svg>
                    </button>
                </div>

                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isOpen ? 'auto' : 0 }}
                    className={`absolute top-16 right-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white lg:relative lg:flex lg:top-auto lg:right-auto lg:bg-transparent lg:text-white items-center lg:shadow-none lg:p-0 ${isOpen ? 'block z-50 w-full' : 'hidden'} lg:block`}
                >
                    <Link to="/products" className="block px-4 py-2 hover:bg-purple-800 lg:hover:bg-transparent">
                        Products
                    </Link>
                    <Link to="/categories" className="block px-4 py-2 hover:bg-indigo-800 lg:hover:bg-transparent">
                        Categories
                    </Link>
                    <Link to="/about" className="block px-4 py-2 hover:bg-blue-800 lg:hover:bg-transparent">
                        About Us
                    </Link>
                    <Link to="/contact" className="block px-4 py-2 hover:bg-purple-800 lg:hover:bg-transparent">
                        Contact
                    </Link>

                    <Link to="/login" className="px-4 py-2 hover:bg-blue-800 lg:hover:bg-transparent flex items-center">
                        <FaSignInAlt className="mr-1" /> Login
                    </Link>
                    <Link to="/profile" className="px-4 py-2 hover:bg-purple-800 lg:hover:bg-transparent flex items-center">
                        <FaUser className="mr-1" /> Profile
                    </Link>
                    <Link to="/cart" className="block px-4 py-2 hover:bg-indigo-800 lg:hover:bg-transparent">
                        <FaShoppingCart className="w-6 h-6" />
                    </Link>
                    <label className="swap swap-rotate ml-3">
                        <input type="checkbox" className="theme-controller" onChange={handleToggle} />
                        <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                        </svg>
                        <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                        </svg>
                    </label>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;
