import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
    const { signInWithGoogle, signInWithEmailPassword } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            toast.success('Logged in with Google!');
            navigate('/');
        } catch (error) {
            console.error('Google login failed:', error.message);
            toast.error('Failed to log in with Google. Please try again.');
        }
    };

    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailPassword(formData.email, formData.password);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Email/password login failed:', error.message);
            toast.error('Failed to log in. Please check your credentials and try again.');
        }
    };

    return (
        <div className="my-10 flex items-center justify-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-8">Login to Your Account</h2>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-4"
                >
                    <FcGoogle className="mr-2" size={20} />
                    Continue with Google
                </button>

                <div className="relative text-center my-4">
                    <span className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 bg-white px-2 text-gray-500">OR</span>
                    <div className="h-px bg-gray-300"></div>
                </div>

                <form onSubmit={handleEmailPasswordLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
