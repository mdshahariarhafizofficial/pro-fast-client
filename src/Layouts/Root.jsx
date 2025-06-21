import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const Root = () => {
    return (
        <>
            <header className='md:py-8'>
                <Navbar></Navbar>
            </header>
            <main className='min-h-[calc(100vh-548px)]'>
                <div className='md:max-w-11/12 mx-auto'>
                    <Outlet></Outlet>
                </div>
            </main>
            <footer className='pb-6'>
                <div className='md:max-w-11/12 mx-auto bg-[#0B0B0B] md:rounded-2xl'>
                    <Footer></Footer>
                </div>
            </footer>
        </>
    );
};

export default Root;