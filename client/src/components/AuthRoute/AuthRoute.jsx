import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Get user data from LocalStorage
  const getUser = () => {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
  };

  const user = getUser();

  // Define the admin email
  const adminEmail = "samratakbar667466@gmail.com"; // Change to your admin email

  // Check if either user from Google or LocalStorage has the admin email
  const isAdmin = user?.email && user.email === adminEmail;

  useEffect(() => {
    if (!isAdmin) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 2000); // Set a short timeout for the redirect message to appear
      return () => clearTimeout(timer);
    }
  }, [isAdmin]);

  // Show a message while redirecting to the login page
  if (!isAdmin && isRedirecting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Unauthorized Access
          </h1>
          <p className="text-lg text-gray-700">
            Redirecting to the login page...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login page after showing the message
  if (!isAdmin) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the protected component if authenticated
  return children;
};

export default AuthRoute;
