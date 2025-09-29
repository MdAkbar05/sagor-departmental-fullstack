const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/users.model");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../services/jsonWebToken");
const {
  jwtActivationKey,
  clientURL,
  jwtAccessKey,
  jwtRefreshToken,
} = require("../secret");
const bcrpt = require("bcryptjs");

// /api/auth/login
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //is exits
    const users = await User.findOne({ email: email });

    if (!users) {
      throw createError(
        404,
        "User does not exist with this email. Please register first."
      );
    }
    // compare the password
    const isPassword = await bcrpt.compare(password, users.password);

    if (!isPassword) {
      throw createError(401, "password did not match");
    }
    // isBanned
    if (users.isBanned) {
      throw createError(403, "You are banned. Please contact with authority");
    }

    // Create access token for login
    const accessToken = createJSONWebToken({ users }, jwtAccessKey, "5m");

    res.cookie("accessToken", accessToken, {
      maxAge: 5 * 60 * 1000, // 5min
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    const refreshToken = createJSONWebToken({ users }, jwtRefreshToken, "7d");
    res.cookie("refreshToken", refreshToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7Day
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User loggedin successfully",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};
const clientId =
  "102107721923-16r7gvmjvq0rorbci67nnjtlishjm298.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);
const handleGoogleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });

    const { name, email, picture } = ticket.getPayload();

    // Check if user exists or create a new user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name,
        email,
        image: picture,
      });
      await user.save();
    }

    // Generate JWT or any other authentication token
    const authToken = createJSONWebToken(
      { userId: user._id, email },
      "YOUR_JWT_SECRET",
      "1d"
    );

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      token: authToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to authenticate with Google" });
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};
const handleRefreshToken = async (req, res, next) => {
  try {
    const oldCookies = req.cookies.refreshToken;
    // Verify cookies
    const decodedRefreshToken = jwt.verify(oldCookies, jwtRefreshToken);

    if (!decodedRefreshToken) {
      throw createError(401, "Invalid refresh token");
    }

    // Create access token for login
    const accessToken = createJSONWebToken(
      decodedRefreshToken.users,
      jwtAccessKey,
      "5m"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 5 * 60 * 1000, // 5m
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, {
      statusCode: 200,
      message: "new access token generate successfully",
      payload: {},
    });
  } catch (error) {
    next(error);
  }
};
const handleProtected = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    // Verify cookies
    const decodedToken = jwt.verify(accessToken, jwtAccessKey);

    if (!decodedToken) {
      throw createError(401, "Invalid access token");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Protected Resource accessed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleLogin,
  handleLogout,
  handleRefreshToken,
  handleProtected,
  handleGoogleLogin,
};
