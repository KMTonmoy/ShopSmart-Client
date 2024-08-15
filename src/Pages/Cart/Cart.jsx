import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;
    const deliveryCharge = 80;

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [otherPhone, setOtherPhone] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch('http://localhost:8000/carts');
                const data = await response.json();
                // Filter items by user email
                const filteredItems = data.filter(item => item.userEmail === userEmail);
                setCartItems(filteredItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userEmail]);

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:8000/carts/${productId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
            } else {
                console.error('Failed to delete the item.');
            }
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = totalPrice + deliveryCharge;

    const handlePlaceOrder = () => {
        setIsModalOpen(true);
    };
    const handleConfirmOrder = async () => {
        try {

            const response = await fetch(`http://localhost:8000/cartss/${userEmail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Clear the cart items in the UI
                setCartItems([]);

                // Close the modal
                setIsModalOpen(false);

                // Show success Swal
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully',
                    text: 'Your order has been placed!',
                    confirmButtonText: 'OK'
                });
            } else {
                console.error('Failed to delete cart items.');
            }
        } catch (error) {
            console.error('Error deleting cart items:', error);
        }
    };


    return (
        <div className="container mx-auto py-12">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="py-2 px-4 border">Product No</th>
                            <th className="py-2 px-4 border">Image</th>
                            <th className="py-2 px-4 border">Name</th>
                            <th className="py-2 px-4 border">Price</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={item.productId} className="text-center">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mx-auto" />
                                    </td>
                                    <td className="py-2 px-4 border">{item.name}</td>
                                    <td className="py-2 px-4 border">${item.price.toFixed(2)}</td>
                                    <td className="py-2 px-4 border">
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">
                                    Your cart is empty.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {cartItems.length > 0 && (
                <div className="mt-8 text-right">
                    <p className="text-lg font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                    <p className="text-lg font-semibold">Delivery Charge: ${deliveryCharge.toFixed(2)}</p>
                    <hr />
                    <p className="text-2xl font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 mt-4"
                    >
                        Place Order
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-96">
                        <h2 className="text-2xl font-bold mb-4">Confirm Order</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2" htmlFor="otherPhone">Other Phone</label>
                            <input
                                type="text"
                                id="otherPhone"
                                value={otherPhone}
                                onChange={(e) => setOtherPhone(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="btn btn-secondary mr-4"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmOrder}
                                className="btn btn-primary"
                            >
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
