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
                <Outlet></Outlet>
            </main>
            <footer>

            </footer>
        </>
    );
};

export default Root;