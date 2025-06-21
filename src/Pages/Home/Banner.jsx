import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '../../assets/banner/banner1.png';
import slide2 from '../../assets/banner/banner2.png';
import slide3 from '../../assets/banner/banner3.png';

const Banner = () => {
    return (
            <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img className='object-cover' src={slide1} />
                </div>
                <div>
                    <img className='object-cover' src={slide2} />
                </div>
                <div>
                    <img className='object-cover' src={slide3} />
                </div>
            </Carousel>
    );
};

export default Banner;