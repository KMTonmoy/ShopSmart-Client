import React from 'react';
import Banner from '../../../Components/Banner/Banner';
import FAQ from '../../../Components/Faq/Faq';
import Testimonials from '../../../Components/Testimonials/Testimonials';
import Products from '../Products/Products';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home || SmartShop</title>

            </Helmet>
            <Banner />
            <Products />
            <FAQ />
            <Testimonials />
        </div>
    );
};

export default Home;