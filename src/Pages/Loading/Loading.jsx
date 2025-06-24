import React from 'react';
import loader from '../../assets/animations/loading.json'
import Lottie from 'lottie-react';
const Loading = () => {
    return (
        <div className='flex items-center justify-center h-[100vh]'>
            <Lottie animationData={loader} loop={true} style={{width: '150px'}}></Lottie>
        </div>
    );
};

export default Loading;