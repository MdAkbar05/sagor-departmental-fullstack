import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider } from "../../firebaseConfig";

const FacebookLogin = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      console.log("User Info:", user);
      // Redirect after login with reload
      window.location.href = "/";
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        alt="Facebook Logo"
        className="w-6 h-6 mr-2"
      />
      Sign in with Facebook
    </button>
  );
};

export default FacebookLogin;
