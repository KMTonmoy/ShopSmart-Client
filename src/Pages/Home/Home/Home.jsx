import React from 'react';
import Banner from '../../../Components/Banner/Banner';
import FAQ from '../../../Components/Faq/Faq';
import Testimonials from '../../../Components/Testimonials/Testimonials';
import Products from '../Products/Products';


const Home = () => {
    return (
        <div>
            <Banner />
            <Products />
            <FAQ />
            <Testimonials />
        </div>
    );
};

export default Home;