import React, { useState } from 'react';

const faqData = [
    {
        question: 'How do I create a new account?',
        answer: 'To create a new account, click on the "Sign Up" button at the top right corner of the homepage. Fill in your details including email, password, and any other required information. You’ll receive a confirmation email to activate your account.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. You can select your preferred payment method during the checkout process.',
    },
    {
        question: 'How can I track my order?',
        answer: 'Once your order has shipped, you will receive a tracking number via email. You can use this tracking number on our website under the "Order Tracking" section to check the status of your delivery.',
    },
    {
        question: 'Can I update my account information?',
        answer: 'Yes, you can update your account information by logging into your account and navigating to the "Account Settings" section. Here, you can change your personal details, password, and other preferences.',
    },
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2">
                    <img src='https://t4.ftcdn.net/jpg/01/28/17/47/360_F_128174778_0XvhB1qi70yXNOPuUFzBNT85xKaWnVde.jpg' alt="FAQ" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
                <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
                    <h2 className="text-3xl font-bold text-center lg:text-left mb-8">Frequently Asked Questions</h2>
                    <div className="max-w-2xl mx-auto">
                        {faqData.map((item, index) => (
                            <div key={index} className="mb-6">
                                <button
                                    className="w-full text-left flex items-center justify-between py-4 px-6 rounded-lg shadow-md focus:outline-none"
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span className="text-lg font-medium">{item.question}</span>
                                    <span>{activeIndex === index ? '-' : '+'}</span>
                                </button>
                                {activeIndex === index && (
                                    <div className="mt-4 px-6 text-gray-700">
                                        <p>{item.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
