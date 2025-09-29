const jwt = require("jsonwebtoken");

const createJSONWebToken = (payload, secretKey, expiresIn) => {
  //for must be non empty object chech
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty-object");
  }
  //for must be string secretkey check
  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be a non-empty-String");
  }

  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.log("Fail to sign the JWT", error);
    throw error;
  }
};

module.exports = { createJSONWebToken };
