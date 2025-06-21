import React from 'react';
import Banner from './Banner';
import HowItWorks from './HowItWorks';
import OurServices from './OurServices';
import BrandCarousel from './BrandCarousel';
import FeatureCards from './FeatureCards';
import HeroPrioritySection from './HeroPrioritySection';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <BrandCarousel></BrandCarousel>
            <FeatureCards></FeatureCards>
            <HeroPrioritySection></HeroPrioritySection>
        </>
    );
};

export default Home;