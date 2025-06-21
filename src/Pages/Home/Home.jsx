import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import BrandCarousel from './BrandCarousel';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandCarousel></BrandCarousel>
        </>
    );
};

export default Home;