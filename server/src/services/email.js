const nodemailer = require("nodemailer");
const { smtpUser, smtpPass } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const emailWithNodeMailer = async (emaildata) => {
  try {
    const mailOptions = {
      from: smtpUser,
      to: emaildata.email,
      subject: emaildata.subject,
      html: emaildata.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent : %s", info.response);
  } catch (error) {
    console.error("Error occured while sending email:", error);
    throw error;
  }
};

module.exports = emailWithNodeMailer;
