import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortOption, setSortOption] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Total number of pages
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const [itemsPerPage] = useState(10); // Number of products per page

    useEffect(() => {
        fetchProducts();
    }, [searchQuery, categoryFilter, sortOption, currentPage]);

    const fetchProducts = async () => {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors
        try {
            const response = await axios.get('FakeProducts.json', {
                params: {
                    search: searchQuery,
                    category: categoryFilter,
                    sort: sortOption,
                    page: currentPage,
                    limit: itemsPerPage,
                },
            });
            if (response.data) {
                setProducts(response.data.products || []); // Default to empty array if no products
                setTotalPages(response.data.totalPages || 1); // Default to 1 page if totalPages is undefined
            }
        } catch (error) {
            setError('Error fetching products. Please try again later.');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on new search
    };

    const handleCategoryChange = (e) => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1); // Reset to the first page on category change
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to the first page on sort change
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border p-2 rounded w-full md:w-1/3"
                />
                <select
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                    className="border p-2 rounded w-full md:w-1/4"
                >
                    <option value="">All Categories</option>
                    <option value="Kitchen Appliances">Kitchen Appliances</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Home Appliances">Home Appliances</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Tools">Tools</option>
                    <option value="Health">Health</option>
                    <option value="Home Security">Home Security</option>
                </select>
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border p-2 rounded w-full md:w-1/4"
                >
                    <option value="">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="date-desc">Newest First</option>
                </select>
            </div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className="border p-4 rounded shadow">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="font-bold mt-2">${product.price}</p>
                            <p className="text-sm text-gray-500">Category: {product.category}</p>
                            <p className="text-sm text-gray-500">Rating: {product.ratings}</p>
                            <p className="text-sm text-gray-500">Added on: {new Date(product.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No products found.</p>
                )}
            </div>
            <div className="flex justify-center">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="border p-2 rounded mx-1"
                >
                    Previous
                </button>
                <span className="mx-2">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="border p-2 rounded mx-1"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
