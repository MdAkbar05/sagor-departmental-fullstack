const express = require("express");
const {
  handleCreateCategory,
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} = require("../controllers/categoryController");
const { validateCategory } = require("../validations/category");
const runValidation = require("../validations");
const { isLoggedIn, isAdmin } = require("../middlewares/Auth");

const categoryRouter = express.Router();
//  /api/categories/

categoryRouter.post(
  "/",
  validateCategory,
  runValidation,
  isLoggedIn,
  isAdmin,
  handleCreateCategory
);
categoryRouter.get("/", handleGetCategories);
categoryRouter.get("/:slug", handleGetCategory);
categoryRouter.put("/:slug", isLoggedIn, isAdmin, handleUpdateCategory);
categoryRouter.delete("/:slug", isLoggedIn, isAdmin, handleDeleteCategory);

module.exports = categoryRouter;
