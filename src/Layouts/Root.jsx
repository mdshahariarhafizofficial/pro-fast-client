import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar/Navbar';

const Root = () => {
    return (
        <>
            <header className='md:py-8'>
                <Navbar></Navbar>
            </header>
            <main>
                <div className='md:max-w-11/12 mx-auto'>
                    <Outlet></Outlet>
                </div>
            </main>
            <footer>
                <div className='md:max-w-11/12 mx-auto bg-[#0B0B0B]'>
                    
                </div>
            </footer>
        </>
    );
};

export default Root;