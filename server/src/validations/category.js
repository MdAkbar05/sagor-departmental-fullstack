const { body } = require("express-validator");

const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 51 })
    .withMessage("Category name should be at least 3-51 character long"),
];

module.exports = { validateCategory };
