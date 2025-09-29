import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleRegister } from "../../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      dispatch(handleRegister(formData)).then((res) => {
        if (res.payload.success === false) {
          setError(res.payload.message);
        } else {
          navigate("/verify-user");
        }
        setLoading(false); // Set loading to false after submission completes
      });
    } catch (error) {
      console.error(
        "There was a problem with the registration request:",
        error
      );
      setLoading(false); // Set loading to false on error
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-gray-50 shadow-lg rounded-lg">
      <p className="text-center text-3xl font-bold text-red-500 mb-8">
        Create an Account
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder=" "
            required
          />
          <label className="absolute top-0 left-2 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs">
            Name
          </label>
        </div>

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder=" "
            required
          />
          <label className="absolute top-0 left-2 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs">
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder=" "
            required
          />
          <label className="absolute top-0 left-2 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 top-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12c1.5-3.5 5.5-6 9-6s7.5 2.5 9 6c-1.5 3.5-5.5 6-9 6S4.5 15.5 3 12zM12 14a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.5 4.5L3 6l3 3L6 6l-2.5-2.5zM21 12c-1.5-3.5-5.5-6-9-6s-7.5 2.5-9 6zM12 15a2 2 0 110-4 2 2 0 010 4z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Address Field */}
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder=" "
            required
          />
          <label className="absolute top-0 left-2 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs">
            Address
          </label>
        </div>

        {/* Phone Field */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="peer mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder=" "
            required
          />
          <label className="absolute top-0 left-2 text-gray-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3 peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs">
            Phone
          </label>
        </div>

        {/* Image Upload
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image (Optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
          />
        </div> */}

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Terms Checkbox */}
        <p className="text-sm text-gray-600 flex items-center gap-x-2">
          <input type="checkbox" name="check" id="check" required /> I agree to
          the terms and conditions.
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            loading ? "cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V4a8 8 0 100 16v-2a8 8 0 01-8-8z"
                />
              </svg>
              Registering...
            </span>
          ) : (
            "Register"
          )}
        </button>
        <div className="mt-6">
          <button
            className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
