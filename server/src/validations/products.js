const { body } = require("express-validator");

const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Product name should be between 2 and 150 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Product name should only contain alphabets"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description name is required")
    .isLength({ min: 2 })
    .withMessage("Description name should be minimum 2 characters"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be a positive integer"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value) => value > 0)
    .withMessage("Price must be greater than 0"),
  body("category").trim().notEmpty().withMessage("Category is required"),
];

module.exports = { validateProduct };
