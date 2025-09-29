import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUserAlt,
  FaMailBulk,
  FaLocationArrow,
  FaEdit,
  FaLockOpen,
  FaCamera,
} from "react-icons/fa";
import useAuth from "../../useAuth";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser } = useSelector((state) => state.authReducer);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    console.log(JSON.parse(localStorage.getItem("user")));
  }, [authUser, location, navigate]);

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 font-serif">
      {user && user.isUser ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header Section */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <img
                  src={user.img}
                  alt={user.userName}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 bg-gray-800 bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition">
                  <FaCamera className="text-white text-sm" />
                </button>
              </div>

              {/* User Basic Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {user.userName}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white">
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    {user.admin ? (
                      <span className="text-sm font-semibold">Admin</span>
                    ) : (
                      <span className="text-sm font-semibold">User</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <span className="text-sm">{user.userType}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Left Column - User Details */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Profile Information
                </h2>

                <div className="space-y-6">
                  {/* User Name */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FaUserAlt className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Username</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.userName}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-green-100 p-3 rounded-full">
                      <FaMailBulk className="text-green-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email Address</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Address */}
                  {user?.address && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-purple-100 p-3 rounded-full">
                        <FaLocationArrow className="text-purple-600 text-lg" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="text-lg font-semibold text-gray-800">
                          {user.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* User Type */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <FaUserAlt className="text-orange-600 text-lg" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Account Type</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {user.admin ? "Administrator" : "Regular User"}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {user.userType === "googleProvider"
                          ? "Connected with Google"
                          : "Email Account"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Actions */}
              <div className="lg:w-1/3">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Profile Actions
                </h2>

                <div className="space-y-4">
                  {user.userType === "googleProvider" ? (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-100 p-2 rounded-full">
                          <FaLockOpen className="text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-800">
                            Google Account
                          </p>
                          <p className="text-sm text-yellow-600 mt-1">
                            Profile changes are managed through Google
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Edit Profile Button */}
                      <Link
                        to="/update-profile"
                        className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition group"
                      >
                        <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition">
                          <FaEdit className="text-blue-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            Edit Profile
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Update your personal information
                          </p>
                        </div>
                      </Link>

                      {/* Change Password Button */}
                      <Link
                        to="/change-pass"
                        className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition group"
                      >
                        <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition">
                          <FaLockOpen className="text-green-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            Change Password
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            Update your account password
                          </p>
                        </div>
                      </Link>
                    </>
                  )}
                </div>

                {/* Stats Section */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Profile Stats
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-800">10</div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">50</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800">20</div>
                      <div className="text-sm text-gray-600">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            You have signed out
          </h2>
          <p className="text-gray-600 mb-4">
            Please login to view your profile
          </p>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Profile;
