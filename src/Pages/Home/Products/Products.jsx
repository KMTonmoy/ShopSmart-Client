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
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [sortOption, setSortOption] = useState('');

    const itemsPerPage = 9;

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, products, selectedCategory, selectedBrand, sortOption]);

    const fetchProducts = (page) => {
        setLoading(true);
        fetch(`http://localhost:8000/products?page=${page}&limit=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                const allProducts = data.products;
                setProducts(allProducts);
                setFilteredProducts(allProducts);
                setTotalPages(data.totalPages);

                // Extract unique brands from the products
                const uniqueBrands = Array.from(new Set(allProducts.map(product => product.brand)));
                setBrands(uniqueBrands);

                // Extract unique categories from the products
                const uniqueCategories = Array.from(new Set(allProducts.map(product => product.category)));
                setCategories(uniqueCategories);

                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    };

    const applyFilters = () => {
        let result = products;

        if (searchQuery) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedCategory) {
            result = result.filter(product => product.category === selectedCategory);
        }

        if (selectedBrand) {
            result = result.filter(product => product.brand === selectedBrand);
        }

        // Sorting logic
        if (sortOption === 'priceLowToHigh') {
            result = result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'priceHighToLow') {
            result = result.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'dateNewestFirst') {
            // Sort by newest date first
            result = result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }



        setFilteredProducts(result);
    };



    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        setSearchQuery(inputValue);
        setCurrentPage(1);
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

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setCurrentPage(1); // Reset to the first page when changing category
    };

    const handleBrandChange = (e) => {
        setSelectedBrand(e.target.value);
        setCurrentPage(1); // Reset to the first page when changing brand
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1);
    };

    if (loading) {
        return <div className='flex justify-center my-10'><span className="loading loading-bars loading-lg"></span></div>;
    }

    return (
        <div className="p-4">
            <div className="mb-4 flex flex-col flex-wrap space-y-4">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={inputValue}
                        onChange={handleSearchChange}
                        className="w-[100%]   p-2 border border-gray-300 rounded-l-md"
                    />
                    <button
                        onClick={handleSearch}
                        className="px-4 py-2 bg-purple-600 text-white rounded-r-md"
                    >
                        Search
                    </button>
                </div>

                <div className="flex md:justify-start justify-center flex-wrap gap-4">
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand, index) => (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>

                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="p-2 border border-gray-300 rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="dateNewestFirst">Date: Newest First</option>

                    </select>
                </div>
            </div>


            {filteredProducts.length === 0 ? (
                <div className="my-10">
                    <h2 className="text-2xl text-center">
                        No products found.... Go Next Page
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-4">
                    {filteredProducts.map(product => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <p className="text-gray-700 mb-4">{product.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-purple-600">
                                        ${product.price}
                                    </span>
                                    <div className="flex space-x-2">
                                        <Link
                                            to={`/details/${product._id}`}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-md"
                                        >
                                            Details
                                        </Link>
                                        <button className="px-4 py-2 bg-purple-600 text-white rounded-md">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            <div className="flex justify-center items-center space-x-4">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-purple-600 text-white rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-purple-600 text-white rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
