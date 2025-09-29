const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../models/users.model");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { deleteUserImage } = require("../services/deleteImage");
const { createJSONWebToken } = require("../services/jsonWebToken");
const {
  jwtActivationKey,
  clientURL,
  jwt_reset_pass_key,
} = require("../secret");
const emailWithNodeMailer = require("../services/email");
const runValidation = require("../validations");
const path = require("node:path");
const {
  forgetPasswordByEmail,
  resetPassword,
} = require("../services/userServices");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const filter = {
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };
    // For not return Password
    const options = { password: 0 };

    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!users || users.length === 0) throw createError(404, "No user found");

    return successResponse(res, {
      statusCode: 200,
      message: "Users were return successfully.",
      payload: {
        users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(createError(404, "Routes not found"));
  }
};

const getUserById = async (req, res, next) => {
  try {
    // console.log(req.users);
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 201,
      message: "User were return successfully.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const imgPath = req.file ? req.file.filename : "default.png";

    console.log(req.file);

    const image = `/images/users/${imgPath}`;

    //user exist check
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        "User with this email already exists. Please sign with new email."
      );
    }

    // Function to generate a 6-digit OTP
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    };
    const otp = generateOTP();

    //create jwt
    const token = {
      user: {
        name,
        email,
        password,
        address,
        phone,
        image,
      },
      OTP: otp,
    };
    console.log(token);

    //prepare email
    const emailData = {
      email,
      subject: "Your OTP Code for Account Activation",
      html: `
      <h2>Hello ${name}!</h2>
      <p>Your OTP code for account activation is: <strong>${otp}</strong></p>
      <p>This code is valid for the next 10 minutes.</p>
    `,
    };
    // send email with nodemailer
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification"));
    }

    const userToken = createJSONWebToken(token, jwtActivationKey, "10m");

    // Set the OTP token in a cookie
    res.cookie("userToken", userToken, {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 60 * 1000,
    });

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process.`,
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

const activateUserAccount = async (req, res, next) => {
  try {
    const otp = req.query.otp;
    console.log(otp);
    // Check if the OTP sent in the request matches the one stored in the cookie
    const userToken = req.cookies.userToken;
    if (!userToken) {
      res.status(404).json({ message: "OTP has expired" });
    }
    const { user, OTP } = jwt.verify(userToken, jwtActivationKey);

    // Check if the OTP matches and hasn't expired
    if (OTP !== otp) {
      return res.status(401).json({ message: "Did not match OTP code" });
    }

    // If OTP is valid, activate the user
    const newUser = new User(user);
    await newUser.save();
    console.log("reached");
    res.clearCookie("userToken");

    return successResponse(res, {
      statusCode: 200,
      message: "User verified and account activated successfully.",
      payload: { newUser },
    });
  } catch (error) {
    next(error);
  }
};

const delteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    // const user = await findWithId(User, id, options);

    const user = await User.findByIdAndDelete({ _id: id, isAdmin: false });
    const userImagePath = user.image;
    deleteUserImage(userImagePath);
    if (!user) {
      throw createError(404, "User not found");
    }

    return successResponse(res, {
      statusCode: 201,
      message: "User were delete successfully.",
      // payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const UserId = req.params.id;
    const user = await User.findOne({ _id: UserId });
    const updateOption = { new: true, contex: "query" };
    let updates = {};

    const allowedField = ["name", "address", "phone"];

    for (const key in req.body) {
      if (allowedField.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const img = req.file ? req.file : null;
    if (img) {
      if (img.size > 1024 * 1024 * 2) {
        throw createError(400, "Product image size should not exceed 2MB.");
      }
    }

    const originalname = req.file ? req.file.originalname : null;

    const image =
      !originalname === null ? `/images/users/${originalname}` : null;
    if (image) {
      deleteUserImage(user.image);
      updates.image = image;
    }

    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      updates,
      updateOption
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User with this Id does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User was update successfully.",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleBanUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    console.log(email);
    const user = await User.findOneAndUpdate(
      { email },
      { isBanned: true },
      { new: true }
    ).select("-password");
    if (!user) {
      throw createError(404, "User with this Id does not exist");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "User was banned successfully.",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const handleUnbanUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await User.findOneAndUpdate(
      { email },
      { isBanned: false },
      { new: true }
    ).select("-password");
    if (!user) {
      throw createError(404, "User with this Id does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User was unbanned successfully.",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePasswords = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;
    console.log(req.body);
    // Check is empty old Pass
    if (oldPassword === "") {
      throw createError(400, "Old password field cannot be empty");
    }

    // check is newpasss empty
    if (newPassword === "") {
      throw createError(400, "New password field cannot be empty");
    }

    // check is empty email
    if (email === "") {
      throw createError(400, "Email field cannot be empty");
    }
    // Check new pass and confirm pass
    if (newPassword !== confirmPassword) {
      throw createError(
        400,
        "New password and Confirm password does not match"
      );
    }
    // const userId = req.params.id;
    const users = await User.findOne({ email: email });
    // const user = await User.findById({ _id: userId });

    // compare the password
    const isPassword = await bcrypt.compare(oldPassword, users.password);
    if (!isPassword) {
      throw createError(400, "Old password is incorrect");
    }

    // Update the user's password in the database
    users.password = newPassword;
    await users.save();

    return successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully.",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await forgetPasswordByEmail(email);
    console.log(token);

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your reset password process.`,
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const updatedUser = await resetPassword(token, password);
    if (!updatedUser) {
      throw createError(404, "User with this token does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User account password reset successfully",
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
