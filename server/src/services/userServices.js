const createError = require("http-errors");
const User = require("../models/users.model");
const { jwt_reset_pass_key, clientURL } = require("../secret");
const emailWithNodeMailer = require("./email");
const { createJSONWebToken } = require("./jsonWebToken");
const jwt = require("jsonwebtoken");

// Forget Passsword services by email
const forgetPasswordByEmail = async (email) => {
  const existUser = await User.exists({ email: email });

  if (!existUser) {
    throw createError(
      404,
      "User with this email does not exist. Please register first."
    );
  }
  //create jwt
  const token = createJSONWebToken({ email }, jwt_reset_pass_key, "10m");
  return token;
  //prepare email
  //   const emailData = {
  //     email,
  //     subject: "Account reset password email",
  //     html: `
  //         <h2> Hello ${existUser.name} !</h2>
  //         <p > Please click here to <a  href="${clientURL}/api/users/verify/${token}" target="_blank"> reset your account</a>  </p>
  //         `,
  //   };

  //send email with nodemailer
  //   try {
  //     await emailWithNodeMailer(emailData);
  //     return token;
  //   } catch (emailError) {
  //     createError(500, "Failed to send reset email", emailError);
  //   }
};

// Reset Password services by token
const resetPassword = async (token, password) => {
  const decoded = jwt.verify(token, jwt_reset_pass_key);
  if (!decoded) {
    throw createError(400, "Invalid token");
  }

  const email = decoded.email;

  const updatedUser = await User.findOneAndUpdate(
    { email: email },
    { password: password },
    { new: true }
  ).select(-password);
  if (!updatedUser) {
    throw createError(404, "Password reset Failed");
  }
  console.log(updatedUser);
  return updatedUser;
};

module.exports = { forgetPasswordByEmail, resetPassword };
