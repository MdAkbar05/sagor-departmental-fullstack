const express = require("express");
const {
  getUsers,
  getUserById,
  delteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleBanUser,
  handleUnbanUser,
  handleUpdatePasswords,
  handleForgetPassword,
  handleResetPassword,
} = require("../controllers/user.controller");
const { userProfileUpload } = require("../middlewares/uploadFiles");
const { validateUserRegistration } = require("../validations/auth");
const runValidation = require("../validations");
const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
  isBanned,
} = require("../middlewares/Auth");

const userRouter = express.Router();
// GET: api/users/
userRouter.get("/", isLoggedIn, isAdmin, isBanned, getUsers);
// GET: api/users/:id
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, getUserById);
userRouter.post(
  "/process-register/",
  isLoggedOut,
  userProfileUpload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.get("/verify/", isLoggedOut, activateUserAccount);

userRouter.delete("/:id([0-9a-fA-F]{24})", delteUserById);
userRouter.put(
  "/:id([0-9a-fA-F]{24})",
  userProfileUpload.single("image"),
  updateUserById
);
userRouter.put("/ban-user/", isLoggedIn, isAdmin, handleBanUser);
userRouter.put("/unban-user/", isLoggedIn, isAdmin, handleUnbanUser);
userRouter.put("/update-password/", handleUpdatePasswords);

userRouter.post("/forget-password/", isLoggedOut, handleForgetPassword);
userRouter.put("/reset-password/", handleResetPassword);

module.exports = userRouter;
