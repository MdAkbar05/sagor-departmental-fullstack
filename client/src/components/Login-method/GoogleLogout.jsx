// src/GoogleLogout.js
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { GrLogout } from "react-icons/gr";

const GoogleLogout = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="ml-4 text-gray-600 hover:text-gray-800"
      >
        <GrLogout size={24} className="text-xl text-red-300" />
      </button>
    </div>
  );
};

export default GoogleLogout;
