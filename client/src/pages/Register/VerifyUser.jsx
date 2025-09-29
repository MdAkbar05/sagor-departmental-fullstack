import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading to true when starting the verification process

    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/verify?otp=${otp}`,
        {
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );
      alert("User was verified successfully");
      navigate("/login"); // Redirect after successful verification
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
    } finally {
      setLoading(false); // Set loading to false after verification process is complete
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
          Verify Your Account
        </h2>
        <form onSubmit={handleClick} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Verification Token
            </label>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? "Verifying..." : "Verify Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
