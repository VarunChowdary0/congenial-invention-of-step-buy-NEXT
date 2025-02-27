import Link from 'next/link';
import React from 'react';

const NotFound:React.FC = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="text-xl text-gray-700 mt-4">Oops! Page not found.</p>
        <Link href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md">Go Home</Link>
      </div>
    );
}

export default NotFound;
  