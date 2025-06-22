import React from 'react';
// import { FcGoogle } from 'react-icons/fc';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import logo from '../assets/logoblack.png'

const AuthLayout = () => {
    return (
    <div className="relative min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white py-20 md:py-0">

      {/* Left: Login Form */}
      <div className="flex flex-col justify-center lg:px-20">
        <Outlet></Outlet>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex items-center justify-center bg-lime-50">
        <img
          src={authImage} // 🔁 Replace with your actual image path
          alt="Delivery Illustration"
          className=""
        />
      </div>
        {/* Logo */}
        <div className="absolute top-10 left-6 md:left-10 mb-10">
            <img src={logo} alt="" />
        </div>
</div>
    );
};

export default AuthLayout;