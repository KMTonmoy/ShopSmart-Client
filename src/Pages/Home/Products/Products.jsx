import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 12;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProducts(products);
        } else {
            setFilteredProducts(products.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    }, [searchQuery, products]);

    const fetchProducts = (page) => {
        setLoading(true);
        fetch(`http://localhost:8000/products?page=${page}&limit=${itemsPerPage}`) // Fetch products with pagination
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setFilteredProducts(data.products); // Initialize filteredProducts with all products
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(inputValue);
        setCurrentPage(1); // Reset to the first page when searching
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={inputValue}
                    onChange={handleSearchChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-purple-600 text-white rounded-md"
                >
                    Search
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-4">
                {filteredProducts.map(product => (
                    <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-700 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-purple-600">${product.price}</span>
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/details/${product._id}`}
                                        className="px-4 py-2 bg-purple-600 text-white rounded-md"
                                    >
                                        Details
                                    </Link>
                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-md">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-purple-600 text-white'}`}
                >
                    Previous
                </button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-purple-600 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
