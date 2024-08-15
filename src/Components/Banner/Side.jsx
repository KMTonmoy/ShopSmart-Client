import { Link } from 'react-router-dom';

const Slide = ({ image }) => {
    return (
        <div
            className='relative w-full bg-center bg-cover h-[400px] md:h-[38rem]'
            style={{ backgroundImage: `url(${image})` }}
            aria-hidden="true"
        >
            <div className='absolute inset-0 bg-gray-900/40 flex items-center justify-center'>
                <div className='text-center px-5'>
                    <div className='mt-6'>
                        <Link
                            to='/products'
                            className='inline-block px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md transition duration-300 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 absolute bottom-5 left-5'
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slide;
