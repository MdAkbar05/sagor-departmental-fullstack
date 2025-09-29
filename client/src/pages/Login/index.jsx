import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../features/authSlice";
import GoogleLogin from "../../components/Login-method/GoogleLogin";

const Login = () => {
  const notify = (msg) => toast(msg);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);

    dispatch(handleLogin(data)).then((res) => {
      if (res.type === "auth/handleLogin/rejected") {
        notify(res.payload);
        setMessage(res.payload);
        setLoading(false);
      } else if (res.type === "auth/handleLogin/fulfilled") {
        navigate("/");
        notify("Logged in successfully");
        setLoading(false);
      }
    });
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg my-6">
      <h2 className="text-3xl font-bold text-center text-red-500 mb-8 ">
        Sign In to Your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div>
          <label className="block text-sm font-semibold text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          <span
            className="absolute right-3 top-10 cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        {message && <p className="text-red-500 text-sm">{message}</p>}

        <div className="flex justify-between items-center">
          <Link
            to="/forget-pass"
            className="text-sm font-semibold text-red-700 hover:text-blue-900"
          >
            Forgot Password?
          </Link>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <button
          className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-black bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => navigate("/register")}
        >
          Don't have an account? Register
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <GoogleLogin />
      </div>
    </div>
  );
};

export default Login;
