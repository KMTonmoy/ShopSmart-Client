import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-2xl font-bold mb-4">ShopSmart</h3>
                        <p className="text-sm">
                            Your one-stop online shop for all your needs. We offer a wide variety of products at unbeatable prices, ensuring you get the best value for your money.
                        </p>
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
                        <ul>
                            <li>
                                <Link to="/" className="hover:text-yellow-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/products" className="hover:text-yellow-300">Products</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-yellow-300">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                                <FaTwitter className="w-6 h-6" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                                <FaInstagram className="w-6 h-6" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300">
                                <FaLinkedin className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-gray-400 pt-4 text-center">
                    <p className="text-sm">&copy; 2024 ShopSmart. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
