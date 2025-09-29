const express = require("express");

const {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtected,
  handleGoogleLogin,
} = require("../controllers/auth.controller");

const { isLoggedOut, isLoggedIn } = require("../middlewares/Auth");

const authRouter = express.Router();
// GET: api/auth/

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/google-login", isLoggedOut, handleGoogleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);
authRouter.get("/refresh-token", handleRefreshToken);
authRouter.get("/protected", handleProtected);

module.exports = authRouter;
