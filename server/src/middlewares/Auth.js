const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey, jwtRefreshToken } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw createError(
        401,
        "Your are already logout. Now you can login your account."
      );
    }

    const decoded = jwt.verify(token, jwtRefreshToken);
    if (!decoded) {
      throw createError(402, "Invalid Token. Please login.");
    }
    // set userId in req.body... now I can recieve from body in getUserById controllers

    req.users = decoded.users;
    next();
  } catch (error) {
    return next(error);
  }
};
const isLoggedOut = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (accessToken) {
      const decoded = jwt.verify(accessToken, jwtAccessKey);
      if (decoded) {
        throw createError(
          401,
          "You are already logged in. Please logout first."
        );
      }
    }

    next();
  } catch (error) {
    return next(error);
  }
};
const isAdmin = async (req, res, next) => {
  try {
    const users = req.users;
    if (!users.isAdmin) {
      throw createError(403, "You are not authorized to access this route.");
    }
    next();
  } catch (error) {
    return next(error);
  }
};
const isBanned = async (req, res, next) => {
  try {
    const users = req.users;
    if (users.isBanned) {
      throw createError(403, "You are banned from accessing this route.");
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin, isBanned };
