import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/AuthProvider';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { user } = useContext(AuthContext);
    const userName = user?.displayName || '';

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = () => {
        fetch('https://y-taupe-chi.vercel.app/testimonials')
            .then((response) => response.json())
            .then((data) => setTestimonials(data))
            .catch((error) => {
                console.error('Error fetching the testimonials:', error);
            });
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        const newTestimonial = {
            quote: newComment,
            name: userName,
        };

        fetch('https://y-taupe-chi.vercel.app/testimonial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTestimonial),
        })
            .then((response) => response.json())
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your comment has been added.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });

                fetchTestimonials();
                setNewComment('');
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    const handleTestimonialPrompt = () => {
        Swal.fire({
            title: 'Attention Required',
            text: 'Please log in to proceed.',
            icon: 'error',
            confirmButtonText: 'OK',
        });
    };

    return (
        <div>
            <section className="mb-16">
                <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>

                <div className="text-center mb-8">
                    {user ? (
                        <button
                            onClick={() => document.getElementById('commentForm').classList.toggle('hidden')}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Your Comment
                        </button>
                    ) : (
                        <button
                            onClick={handleTestimonialPrompt}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add Your Comment
                        </button>
                    )}
                </div>

                {user && (
                    <div id="commentForm" className="hidden mb-12">
                        <div className="flex flex-col items-center">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Your comment"
                                className="p-4 w-1/2 border rounded-lg mb-4"
                            />
                            <input
                                type="text"
                                value={userName}
                                readOnly
                                className="p-4 w-1/2 border rounded-lg mb-4 text-gray-600"
                            />
                            <button
                                onClick={handleAddComment}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}

                <Swiper
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    className="rounded-lg "
                >
                    {testimonials.map((testimonial, index) => (
                        index % 3 === 0 && (
                            <SwiperSlide key={testimonial._id}>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="p-6 flex justify-center "
                                >
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                                        {testimonials.slice(index, index + 3).map((t) => (
                                            <div key={t._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-md mb-5">
                                                <p className="text-lg italic text-gray-700">"{t.quote}"</p>
                                                <h3 className="text-xl font-semibold mt-4">- {t.name}</h3>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        )
                    ))}
                </Swiper>
            </section>
        </div>
    );
};

export default Testimonials;
