import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="min-h-[90vh] flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        {/* 404 Icon or Image */}
        <img
          src="https://i.imgur.com/qIufhof.png"
          alt="404 Not Found"
          className="w-80 h-80 mx-auto"
        />

        {/* 404 Heading */}
        <h1 className="text-6xl font-bold text-gray-800 mt-4">404</h1>

        {/* Error Message */}
        <p className="text-xl text-gray-500 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleGoHome}
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
