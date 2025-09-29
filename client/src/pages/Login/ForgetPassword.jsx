import axios from "axios";
import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    // Perform email validation or submission here
    const data = new FormData();

    if (!isEmailSubmitted) {
      data.append("email", email);
      try {
        const res = await axios.post(
          "http://localhost:3000/api/users/forget-password/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          setToken(res.data.payload);
          alert(res.data.message);
          setIsEmailSubmitted(true);

          console.log(token, password);
        }
      } catch (error) {
        alert("Error with send token in your email accounts" + error.message);
      }
    }
    console.log(token, password);

    if (isEmailSubmitted) {
      data.append("password", password);
      data.append("token", token);
      console.log(data);
      try {
        const res = await axios.put(
          "http://localhost:3000/api/users/reset-password/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(res);
        if (res) {
          alert("Password has been successfully updated!");
          navigate("/login");
        }
      } catch (error) {
        alert("Error with changing password of your accounts" + error.message);
      }
    }

    setIsEmailSubmitted(true);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm">
        <form
          onSubmit={handleEmailSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {!isEmailSubmitted ? (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ) : (
            <div className="mb-4 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full min-h-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <span
                className="absolute right-2 top-9 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <FaEyeSlash /> : <FaRegEye />}
              </span>
            </div>
          )}
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
