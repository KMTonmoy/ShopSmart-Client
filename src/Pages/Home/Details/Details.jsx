import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

const Details = () => {
    const data = useLoaderData();
    console.log(data)
    const { user } = useContext(AuthContext)
    const userEmail = user?.email

    const price = data?.price || 0;
    const name = data?.name || "Product Name";
    const image = data?.image || "https://via.placeholder.com/300";
    const description = data?.description || "No description available.";
    const category = data?.category || "Category";
    const brand = data?.brand || "Brand";
    const ratings = data?.ratings || 0;
    const createdAt = data?.created_at ? new Date(data.created_at).toLocaleDateString() : "Unknown";
    const productId = data?._id || "unknown-id";
    const productLink = `http://localhost:8000/details/${productId}`;

    const handleAddToCart = async () => {
        try {
            const response = await fetch('http://localhost:8000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId,
                    image,
                    name,
                    description,
                    productLink,
                    userEmail,
                    price
                }),
            });

            if (response.ok) {
                alert('Product added to cart successfully!');
            } else {
                alert('Failed to add product to cart.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the product to the cart.');
        }
    };

    return (
        <section className="py-12 bg-gradient-to-r from-blue-100 to-blue-200">
            <Helmet>
                <title>{name} - Product Details</title>
            </Helmet>
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden h-auto items-center">
                    {/* Product Image */}
                    <div className="md:w-1/2">
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Product Details */}
                    <div className="md:w-1/2 p-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{name}</h1>
                        <p className="text-gray-700 text-lg mb-4">{description}</p>
                        <div className="flex items-center mb-4">
                            <span className="text-2xl font-semibold text-purple-600">${price.toFixed(2)}</span>
                            <span className="ml-4 text-gray-600 text-lg">Category: {category}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className="text-gray-600 text-lg">Brand: {brand}</span>
                            <span className="ml-4 text-yellow-500 text-lg">Rating: {ratings} ★</span>
                        </div>
                        <div className="text-gray-600 text-lg mb-4">
                            <span>Added on: {createdAt}</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <button
                                className='text-lg bg-purple-700 hover:bg-purple-800 text-white p-3 rounded-lg shadow-lg transition duration-300 ease-in-out'
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Details;
