const express = require("express");
const runValidation = require("../validations");
const { isLoggedIn, isAdmin } = require("../middlewares/Auth");
const {
  handleCreateProduct,
  handleGetProducts,
  handleUpdateProduct,
  handleDeleteProduct,
  handleSearchProducts,
  addReview,
  handleGetProductBySlug,
  handleGetProductsByCategory,
  handleGetProductsByBrand,
} = require("../controllers/productsController");
const { productsProfileUpload } = require("../middlewares/uploadFiles");
const { validateProduct } = require("../validations/products");

const productsRouter = express.Router();
//  /api/categories/

// /api/products/search?query=laptop
productsRouter.get("/search", handleSearchProducts);

productsRouter.get("/", handleGetProducts);
productsRouter.get("/category", handleGetProductsByCategory);
// productsRouter.get("/brand", handleGetProductsByBrand);
productsRouter.get("/:slug", handleGetProductBySlug);
productsRouter.post(
  "/",
  // validateProduct,
  // runValidation,
  productsProfileUpload.single("image"),
  //   isLoggedIn,
  //   isAdmin,
  handleCreateProduct
);
productsRouter.put(
  "/:slug",
  productsProfileUpload.single("image"),
  handleUpdateProduct
);
productsRouter.delete("/:slug", handleDeleteProduct);
productsRouter.post("/:id/reviews", addReview); // Add a review for a product

module.exports = productsRouter;
