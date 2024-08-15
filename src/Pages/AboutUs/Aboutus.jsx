import { motion } from 'framer-motion';
import React from 'react';

const About = () => {
    return (
        <section className="py-12  ">
            <div className="container mx-auto px-4">
                <motion.h1
                    className="text-4xl font-bold text-center mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About SmartShop
                </motion.h1>
                <div className="flex flex-col md:flex-row items-center justify-center">
                    {/* SideImage Starts Here */}
                    <motion.div
                        className="md:w-1/2 mb-8 md:mb-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <img
                            src="https://media.licdn.com/dms/image/D4D12AQFn6xt73BZBCg/article-cover_image-shrink_600_2000/0/1658305855779?e=2147483647&v=beta&t=ikZnplg-Z7JXqSLBi1ncNq-fJghAddXVWdmEM3FHNcI"
                            alt="About SmartShop"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    </motion.div>
                    {/* SideImage Ends Here */}
                    {/* About Page Info Starts Here */}
                    <motion.div
                        className="md:w-1/2 md:pl-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                        <p className="text-gray-700 mb-4">
                            At SmartShop, our vision is to revolutionize the online shopping experience by offering a wide range of high-quality products at unbeatable prices. We aim to provide a seamless and enjoyable shopping experience for every customer.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                        <p className="text-gray-700 mb-4">
                            SmartShop was founded in [Year] with the goal of creating an online shopping destination where customers can find everything they need in one place. Since our launch, we have grown rapidly and continue to expand our product offerings to meet the diverse needs of our customers.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
                        <p className="text-gray-700 mb-4">
                            We take pride in offering exceptional customer service, fast shipping, and a user-friendly shopping experience. Our dedicated team works tirelessly to ensure that every customer is satisfied with their purchase. At SmartShop, your satisfaction is our top priority.
                        </p>
                        <h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
                        <p className="text-gray-700">
                            Our team is made up of passionate individuals who are committed to providing the best online shopping experience. From our customer service representatives to our logistics team, every member plays a vital role in ensuring that you have a positive shopping experience with us.
                        </p>
                    </motion.div>
                    {/* SideImage Ends Here */}

                </div>
            </div>
        </section>
    );
};

export default About;
