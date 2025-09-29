const express = require("express");
const {
  seedUser,
  seedProducts,
} = require("../controllers/seedUser.controller");
const { productsProfileUpload } = require("../middlewares/uploadFiles");
const seedRouter = express.Router();

seedRouter.get("/users", seedUser);
seedRouter.get(
  "/products",
  productsProfileUpload.single("image"),
  seedProducts
);

module.exports = seedRouter;
