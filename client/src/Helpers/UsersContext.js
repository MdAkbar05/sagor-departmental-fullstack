// import React, { createContext, useState } from "react";

// // Create a context
// const AuthContext = createContext();

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   // Fetch profile from localStorage and handle null case
//   const storedUser = localStorage.getItem("user");
//   const profile = storedUser ? JSON.parse(storedUser) : null;

//   // Initialize state
//   const [user, setUser] = useState(profile ? profile.isUser : false);
//   const [email, setEmail] = useState(profile ? profile.email : "");
//   const [userName, setUserName] = useState(profile ? profile.userName : "");
//   const [img, setImg] = useState(profile ? profile.img : "");
//   const [address, setAddress] = useState(profile ? profile.address : "");
//   const [phone, setPhone] = useState(profile ? profile.phone : null);
//   const [userID, setID] = useState(profile ? profile.id : "");
//   const [isAdmin, setIsAdmin] = useState(profile ? profile.isAdmin : null);
//   const [isBanned, setIsBanned] = useState(profile ? profile.isBanned : null);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         setUser,
//         userName,
//         setUserName,
//         img,
//         setImg,
//         email,
//         setEmail,
//         address,
//         setAddress,
//         userID,
//         setID,
//         isAdmin,
//         setIsAdmin,
//         isBanned,
//         setIsBanned,
//         phone,
//         setPhone,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
