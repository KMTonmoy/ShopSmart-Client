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
                const response = await fetch('https://y-taupe-chi.vercel.app/carts');
                const data = await response.json();
                const filteredItems = data.filter(item => item.userEmail === userEmail);
                setCartItems(filteredItems);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userEmail]);

    const handleDelete = async (productId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to remove this item from the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`https://y-taupe-chi.vercel.app/carts/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
                    Swal.fire('Deleted!', 'Your item has been removed from the cart.', 'success');
                } else {
                    console.error('Failed to delete the item.');
                }
            } catch (error) {
                console.error('Error deleting cart item:', error);
            }
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    const grandTotal = totalPrice + deliveryCharge;

    const handlePlaceOrder = () => {
        setIsModalOpen(true);
    };

    const handleConfirmOrder = async () => {
        try {
            const response = await fetch(`https://y-taupe-chi.vercel.app/cartss/${userEmail}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setCartItems([]);
                setIsModalOpen(false);

                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully',
                    text: 'Your order has been placed!',
                    confirmButtonText: 'OK',
                });
            } else {
                console.error('Failed to delete cart items.');
            }
        } catch (error) {
            console.error('Error deleting cart items:', error);
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={item._id} className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Product No: {index + 1}</h2>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                            <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">Your cart is empty.</p>
                )}
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

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 w-full max-w-md">
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
