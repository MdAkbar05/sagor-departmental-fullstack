import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const AuthUser = ({ children }) => {
  const location = useLocation();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Get user data from localStorage
  const getUser = () => {
    const userJSON = localStorage.getItem("user");
    return userJSON ? JSON.parse(userJSON) : null;
  };

  const user = getUser();

  useEffect(() => {
    if (!user?.isUser) {
      setIsRedirecting(true);
      const timer = setTimeout(() => {
        setIsRedirecting(false);
      }, 4000); // Set a 4s timeout for the message

      // Clean up the timer to avoid memory leaks
      return () => clearTimeout(timer);
    }
  }, [user]);

  // Show a message while redirecting to the login page
  if (isRedirecting) {
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

  // Redirect to login page after showing the message for 4 seconds
  if (!user?.isUser && !isRedirecting) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Render the protected component if authenticated
  return children;
};

export default AuthUser;
