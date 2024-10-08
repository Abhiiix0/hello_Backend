import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">404</h1>
      <p className="text-lg sm:text-xl text-gray-600 mt-4">
        Oops! The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
