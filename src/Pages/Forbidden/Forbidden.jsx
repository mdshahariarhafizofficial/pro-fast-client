import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-4 text-center">
      <FaLock className="text-red-500 text-7xl mb-6" />
      <h1 className="text-5xl font-bold text-error mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        You don't have permission to access this page.
      </p>
      <Link to="/" className="btn btn-primary text-white">
        🔙 Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
