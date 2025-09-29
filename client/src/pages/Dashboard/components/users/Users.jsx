import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  banUser,
  unBanUser,
  deleteUser,
} from "../../../../features/usersSlice";

export const Users = () => {
  const [toastMSG, setToastMSG] = useState("");
  const dispatch = useDispatch();
  const { users, error, isLoading } = useSelector(
    (state) => state.usersReducer
  );

  // Fetching users
  useEffect(() => {
    dispatch(getUsers()).then(() => {
      setToastMSG("Users loaded successfully");
    });
  }, [dispatch]);

  // Ban User
  const handleBan = (email) => {
    dispatch(banUser(email)).then(() => {
      setToastMSG("User has been banned");
      dispatch(getUsers());
    });
  };

  // Unban User
  const handleUnBan = (email) => {
    dispatch(unBanUser(email)).then(() => {
      setToastMSG("User has been unbanned");
      dispatch(getUsers());
    });
  };

  // Delete User
  const handleDelete = async (id) => {
    dispatch(deleteUser(id)).then(() => {
      setToastMSG("User has been deleted");
      dispatch(getUsers());
    });
  };

  // Clear toast message after 5 seconds
  setTimeout(() => {
    setToastMSG("");
  }, 5000);

  return (
    <>
      <main className="sm:p-2 md:p-4 lg:p-6 flex flex-col items-center gap-8 w-full">
        {isLoading && (
          <h2 className="text-3xl mt-4 font-medium animate-bounce">
            Loading Users...
          </h2>
        )}

        {/* All User List */}
        <div className="w-full max-w-7xl px-4">
          <h2 className="text-primary text-3xl font-semibold mb-4">
            All Users List
          </h2>

          <table className="w-full bg-white border border-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-sm py-3 px-4 border-b">Image</th>
                <th className="text-sm py-3 px-4 border-b">Name</th>
                <th className="text-sm py-3 px-4 border-b">Email</th>
                <th className="text-sm py-3 px-4 border-b">Address</th>
                <th className="text-sm py-3 px-4 border-b">Phone</th>
                <th className="text-sm py-3 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll">
              {users &&
                users
                  .filter((user) => !user.isBanned && !user.isAdmin)
                  .map((user) => (
                    <tr key={user._id} className="text-left">
                      <td className="py-3 px-4 border-b">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mx-auto"
                        />
                      </td>
                      <td className="text-sm py-3 px-4 border-b">
                        {user.name}
                      </td>
                      <td className="text-sm py-3 px-4 border-b">
                        {user.email}
                      </td>
                      <td className="text-sm py-3 px-4 border-b">
                        {user.address}
                      </td>
                      <td className="text-sm py-3 px-4 border-b">
                        {user.phone}
                      </td>
                      <td className="text-sm px-4 border-b space-x-2">
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleBan(user.email)}
                          className="text-sm px-4 py-2 bg-yellow-500 text-white rounded-lg"
                        >
                          Ban
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Banned User List */}
        <div className="w-full max-w-7xl px-4">
          <h2 className="text-primary text-3xl font-semibold mb-4">
            Banned Users List
          </h2>

          <table className="w-full bg-white border border-gray-200 text-center">
            {isLoading ? (
              <p className="text-center mt-8 w-full text-base">
                Loading Banned Users...
              </p>
            ) : (
              <>
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-sm py-3 px-4 border-b">Image</th>
                    <th className="text-sm py-3 px-4 border-b">Name</th>
                    <th className="text-sm py-3 px-4 border-b">Email</th>
                    <th className="text-sm py-3 px-4 border-b">Address</th>
                    <th className="text-sm py-3 px-4 border-b">Phone</th>
                    <th className="text-sm py-3 px-4 border-b">Action</th>
                  </tr>
                </thead>

                <tbody className="overflow-y-scroll">
                  {users &&
                    users
                      .filter((user) => user.isBanned)
                      .map((user) => (
                        <tr key={user._id} className="text-left bg-red-200">
                          <td className="py-3 px-4 border-b">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-10 h-10 rounded-full mx-auto"
                            />
                          </td>
                          <td className="text-sm py-3 px-4 border-b">
                            {user.name}
                          </td>
                          <td className="text-sm py-3 px-4 border-b">
                            {user.email}
                          </td>
                          <td className="text-sm py-3 px-4 border-b">
                            {user.address}
                          </td>
                          <td className="text-sm py-3 px-4 border-b">
                            {user.phone}
                          </td>
                          <td className="text-sm px-4 border-b space-x-2">
                            <button
                              onClick={() => handleDelete(user._id)}
                              className="text-sm px-4 py-2 bg-red-500 text-white rounded-lg"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleUnBan(user.email)}
                              className="text-sm px-4 py-2 bg-green-500 text-white rounded-lg"
                            >
                              Unban
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </main>

      {/* Toast message */}
      {toastMSG && (
        <div className="fixed top-4 right-4 bg-green-200 text-green-700 px-4 py-2 rounded-md shadow-md text-sm">
          {toastMSG}
        </div>
      )}
    </>
  );
};

export default Users;
