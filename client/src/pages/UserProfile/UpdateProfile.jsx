import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdate } from "../../features/authSlice";

const UpdateProfile = () => {
  const { authUser } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setprofile] = useState({});
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    setprofile(JSON.parse(localStorage.getItem("user")));
  }, [authUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name: newName,
      address: newAddress,
      number: newNumber,
    };

    // Remove fields that are empty or null
    if (!newData.name) delete newData.name;
    if (!newData.address) delete newData.address;
    if (!newData.number) delete newData.number;

    try {
      dispatch(handleUpdate({ newData, id: profile.id }));
      setprofile(JSON.parse(localStorage.getItem("user")));
      navigate("/profile-user");
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      // Handle error (e.g., show a message to the user)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Update Profile
        </h2>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Name <span className="text-red-500">change to:</span>
          </label>
          <input
            onChange={(e) => setNewName(e.target.value)}
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder={profile.userName}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Address <span className="text-red-500">change to:</span>
          </label>
          <input
            onChange={(e) => setNewAddress(e.target.value)}
            type="text"
            id="address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder={profile.address}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">change to:</span>
          </label>
          <input
            onChange={(e) => setNewNumber(e.target.value)}
            type="text"
            id="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-500 focus:border-blue-500"
            placeholder={profile.phone}
          />
        </div>

        <div className="mb-6 flex items-center">
          <input
            id="confirm"
            type="checkbox"
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <label
            htmlFor="confirm"
            className="ml-2 text-sm font-medium text-gray-600"
          >
            Are you sure you want to update your account?
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
