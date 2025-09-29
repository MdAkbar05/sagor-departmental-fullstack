import axios from "axios";

export const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/users", {
      withCredentials: true, // Ensure cookies are sent
    });

    const users = response.data.payload.users;
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};
