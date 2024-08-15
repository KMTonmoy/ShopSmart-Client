import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash, FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';

import { imageUpload } from '../../api/utils/index';
import { AuthContext } from '../../providers/AuthProvider';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        createUser,
        signInWithGoogle,
        updateUserProfile,
    } = useContext(AuthContext);

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            Swal.fire({
                title: 'Signup Successful',
                text: 'You have successfully signed up.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setTimeout(() => {
                navigate('/');
            }, 4000);
        } catch (err) {
            Swal.fire({
                title: 'Signup Failed',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const imageUrl = await imageUpload(image);
            await createUser(email, password);
            await updateUserProfile(name, imageUrl);
            Swal.fire({
                title: 'Signup Successful',
                text: 'You have successfully signed up.',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            navigate('/');
        } catch (err) {
            Swal.fire({
                title: 'Signup Failed',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-blue-600">Create an Account</h2>
                <form onSubmit={handleSignup} className="space-y-4 mt-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                        >
                            {showPassword ? (
                                <FaRegEye className='text-xl' />
                            ) : (
                                <FaRegEyeSlash className='text-xl' />
                            )}
                        </button>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Picture
                        </label>
                        <input
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        <FaGoogle className="mr-2" />
                        Sign Up with Google
                    </button>
                </div>
                <div className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Log in here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
