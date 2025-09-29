import axios from "axios";

// Ban User
export const handleBanUser = async (email) => {
  try {
    const res = await axios.put(
      `http://localhost:3000/api/users/ban-user/`,
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
