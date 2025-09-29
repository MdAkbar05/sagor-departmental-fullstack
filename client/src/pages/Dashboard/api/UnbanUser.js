import axios from "axios";

export const handleUnbanUser = async (email) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/users/unban-user/`,
      { email: email },
      {
        withCredentials: true, // Ensure cookies are sent
      }
    );
    return res;
  } catch (error) {
    console.log(error.message);
  }
};
