import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import BrandCarousel from './BrandCarousel';
import FeatureCards from './FeatureCards';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandCarousel></BrandCarousel>
            <FeatureCards></FeatureCards>
        </>
    );
};

export default Home;